// Raw records -> clean domain entities. This is the ONLY place that knows the
// shape of the raw data files; swap it out when the backend lands.
import type { EditionConfig, TaskConfig, RawContestant } from "@/data/editions";
import type { Edition } from "@/domain/edition";
import type { Task } from "@/domain/task";
import type { Contestant, ContestantStatus, ContestVenue } from "@/domain/contestant";
import type { MedalBands, ScoreMedalThresholds } from "@/domain/medal";
import { medalForRank, medalForScore } from "@/domain/medal";
import { assignCompetitionRanks, normalizeScore } from "@/domain/ranking";
import { slugify } from "@/lib/utils";

function deriveStatus(raw: RawContestant): ContestantStatus {
  if (/\(Guest\)/i.test(raw.country)) return "guest";
  if (raw.isUnofficial || raw.country === "Unofficial") return "unofficial";
  return "official";
}

/**
 * The country a contestant represents, as a clean identity. Guest status is
 * captured separately (see deriveStatus), so it is stripped from the name here
 * — "Pakistan (Guest)" and a future official "Pakistan" resolve to one country.
 * Unofficial/blank entries carry no country.
 */
function deriveCountryName(raw: RawContestant): string {
  if (raw.isUnofficial || raw.country === "Unofficial") return "";
  return raw.country.replace(/\s*\(Guest\)\s*$/i, "").trim();
}

/** Default venue from the edition format string (overridable per contestant). */
export function defaultVenueFromFormat(format: string): ContestVenue {
  if (/hybrid/i.test(format)) return "onsite"; // hybrid editions must set venue per row
  return /online/i.test(format) ? "online" : "onsite";
}

function mapTask(config: TaskConfig): Task {
  return {
    slug: config.slug,
    name: config.name,
    short: config.short,
    day: config.day,
    maxScore: config.maxScore,
    pdf: config.pdf,
  };
}

function scoresFromRaw(raw: RawContestant, tasks: TaskConfig[]): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const t of tasks) {
    scores[t.slug] = normalizeScore(Number(raw.scores[t.slug]) || 0);
  }
  return scores;
}

function medalForContestant(
  rank: number,
  total: number,
  status: ContestantStatus,
  bands: MedalBands,
  scoreThresholds?: ScoreMedalThresholds,
) {
  if (scoreThresholds) return medalForScore(total, scoreThresholds, status);
  return medalForRank(rank, bands, status);
}

function mapContestantBase(
  raw: RawContestant,
  tasks: TaskConfig[],
  days: number[],
  defaultVenue: ContestVenue,
): Omit<Contestant, "rank" | "medal"> & { rank?: number } {
  const status = deriveStatus(raw);
  const scores = scoresFromRaw(raw, tasks);

  const dayTotals = days.map((day) => ({
    day,
    total: normalizeScore(
      tasks.filter((t) => t.day === day).reduce((sum, t) => sum + (scores[t.slug] ?? 0), 0),
    ),
  }));

  const total = normalizeScore(Object.values(scores).reduce((sum, v) => sum + v, 0));
  const firstName = raw.firstName.trim();
  const lastName = raw.lastName.trim();
  const fullName = `${firstName} ${lastName}`.trim();

  return {
    slug: slugify(fullName || firstName || lastName || "contestant"),
    firstName,
    lastName,
    fullName,
    rank: raw.rank,
    countryName: deriveCountryName(raw),
    status,
    venue: raw.venue ?? defaultVenue,
    scores,
    dayTotals,
    total,
    specialAward: raw.specialAward,
  };
}

export function mapEdition(config: EditionConfig): Edition {
  // Derive the contest days from the task configuration — no fixed day count.
  const days = [...new Set(config.tasks.map((t) => t.day))].sort((a, b) => a - b);
  const defaultVenue = defaultVenueFromFormat(config.format);

  let bases = config.results.map((r) => mapContestantBase(r, config.tasks, days, defaultVenue));

  // Injectable ranking: compute once here, never in the UI.
  if (config.assignCompetitionRanks) {
    bases = assignCompetitionRanks(
      bases.map((c) => ({ ...c, sortName: c.fullName })),
    ).map((ranked) => {
      const { sortName, ...rest } = ranked;
      void sortName;
      return rest;
    });
  }

  const contestants: Contestant[] = bases.map((c) => {
    const rank = c.rank;
    if (rank == null || !Number.isFinite(rank)) {
      throw new Error(
        `Missing rank for contestant "${c.fullName}" in ${config.name}. ` +
          `Set raw ranks or enable assignCompetitionRanks.`,
      );
    }
    return {
      slug: c.slug,
      firstName: c.firstName,
      lastName: c.lastName,
      fullName: c.fullName,
      rank,
      countryName: c.countryName,
      status: c.status,
      venue: c.venue,
      scores: c.scores,
      dayTotals: c.dayTotals,
      total: c.total,
      specialAward: c.specialAward,
      medal: medalForContestant(
        rank,
        c.total,
        c.status,
        config.bands,
        config.scoreThresholds,
      ),
    };
  });

  // Keep scoreboard order stable: competition rank, then name within a tie.
  contestants.sort(
    (a, b) => a.rank - b.rank || a.fullName.localeCompare(b.fullName, undefined, { sensitivity: "base" }),
  );

  return {
    year: config.year,
    slug: config.slug,
    name: config.name,
    host: config.host,
    city: config.city,
    country: config.country,
    format: config.format,
    dates: config.dates,
    website: config.website,
    bands: config.bands,
    days,
    tasks: config.tasks.map(mapTask),
    contestants,
    administration: config.administration ?? [],
  };
}

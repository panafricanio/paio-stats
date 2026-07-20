// Raw records -> clean domain entities. This is the ONLY place that knows the
// shape of the raw data files; swap it out when the backend lands.
import type { ContestantResult } from "@/data/results";
import type { EditionConfig, TaskConfig } from "@/data/edition-configs";
import type { Edition } from "@/domain/edition";
import type { Task } from "@/domain/task";
import type { Contestant, ContestantStatus } from "@/domain/contestant";
import type { MedalBands } from "@/domain/medal";
import { medalForRank } from "@/domain/medal";
import { slugify } from "@/lib/utils";

function deriveStatus(raw: ContestantResult): ContestantStatus {
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
function deriveCountryName(raw: ContestantResult): string {
  if (raw.country === "Unofficial") return "";
  return raw.country.replace(/\s*\(Guest\)\s*$/i, "").trim();
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

function mapContestant(
  raw: ContestantResult,
  tasks: TaskConfig[],
  bands: MedalBands,
  days: number[],
): Contestant {
  const status = deriveStatus(raw);

  // Per-task scores are the single source of truth; every total is derived.
  const scores: Record<string, number> = {};
  for (const t of tasks) scores[t.slug] = Number(raw[t.rawKey]) || 0;

  const dayTotals = days.map((day) => ({
    day,
    total: tasks
      .filter((t) => t.day === day)
      .reduce((sum, t) => sum + (scores[t.slug] ?? 0), 0),
  }));

  const total = Object.values(scores).reduce((sum, v) => sum + v, 0);

  return {
    slug: slugify(`${raw.firstName} ${raw.lastName}`),
    firstName: raw.firstName,
    lastName: raw.lastName,
    fullName: `${raw.firstName} ${raw.lastName}`.trim(),
    rank: raw.rank,
    countryName: deriveCountryName(raw),
    status,
    scores,
    dayTotals,
    total,
    medal: medalForRank(raw.rank, bands, status),
    specialAward: raw.specialAward,
  };
}

export function mapEdition(config: EditionConfig): Edition {
  // Derive the contest days from the task configuration — no fixed day count.
  const days = [...new Set(config.tasks.map((t) => t.day))].sort((a, b) => a - b);

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
    contestants: config.results.map((r) => mapContestant(r, config.tasks, config.bands, days)),
    administration: config.administration ?? [],
  };
}

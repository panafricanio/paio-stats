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
  if (raw.country === "Pakistan (Guest)") return "guest";
  if (raw.isUnofficial || raw.country === "Unofficial") return "unofficial";
  return "official";
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
): Contestant {
  const status = deriveStatus(raw);
  const scores: Record<string, number> = {};
  for (const t of tasks) scores[t.slug] = Number(raw[t.rawKey]) || 0;

  return {
    slug: slugify(`${raw.firstName} ${raw.lastName}`),
    firstName: raw.firstName,
    lastName: raw.lastName,
    fullName: `${raw.firstName} ${raw.lastName}`.trim(),
    rank: raw.rank,
    countryName: raw.country,
    status,
    scores,
    day1Total: raw.day1Total,
    day2Total: raw.day2Total,
    total: raw.globalTotal,
    medal: medalForRank(raw.rank, bands, status),
    specialAward: raw.specialAward,
  };
}

export function mapEdition(config: EditionConfig): Edition {
  return {
    year: config.year,
    slug: config.slug,
    name: config.name,
    host: config.host,
    city: config.city,
    country: config.country,
    format: config.format,
    dates: config.dates,
    bands: config.bands,
    tasks: config.tasks.map(mapTask),
    contestants: config.results.map((r) => mapContestant(r, config.tasks, config.bands)),
  };
}

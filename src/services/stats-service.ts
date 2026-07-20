// Application service: the single API the UI consumes. It orchestrates the
// data-access port + pure domain functions into ready-to-render view models,
// so pages stay thin and business logic stays out of React.
import type { StatsDataSource } from "./ports";
import type { Edition } from "@/domain/edition";
import type { Country, CountryAggregate } from "@/domain/country";
import type { Contestant } from "@/domain/contestant";
import type { Task, TaskStat } from "@/domain/task";
import type { MedalTally } from "@/domain/medal";
import type {
  DistributionBar,
  ScoreBucket,
  MedalThreshold,
  Delegation,
} from "@/domain/aggregation";
import {
  aggregateCountries,
  computeTaskStats,
  distributeTaskScores,
  editionDelegations,
  medalThresholds,
  tallyMedals,
} from "@/domain/aggregation";

/* ---- View models (the service's contract with the UI) ---- */

export interface EditionSummary {
  participants: number;
  countriesCount: number;
  tasksCount: number;
  official: MedalTally;
  guest: MedalTally;
  totalMedals: number;
}

/** One row of the editions listing table (mirrors the IOI olympiads table). */
export interface EditionRow {
  number: number; // olympiad number (chronological, oldest = 1)
  year: number;
  slug: string;
  name: string;
  dates: string;
  host: string;
  hostCode: string | null; // country slug for linking, if known
  hostFlag: string;
  city: string;
  contestants: number;
  countries: number;
}

export interface ScoreRow {
  rank: number;
  slug: string;
  fullName: string;
  countryName: string;
  countryFlag: string;
  countryCode: string | null;
  status: Contestant["status"];
  medal: Contestant["medal"];
  specialAward?: string;
  scores: Record<string, number>;
  day1Total: number;
  day2Total: number;
  total: number;
}

/** Everything the tabbed olympiad detail needs, in one bundle. */
export interface EditionDetail {
  edition: Edition;
  summary: EditionSummary;
  thresholds: MedalThreshold[];
  maxScore: number;
  hostCountry: Country | null;
  rows: ScoreRow[];
  delegations: Delegation[];
  taskStats: TaskStat[];
}

export interface CountryDetail {
  country: Country;
  aggregate: CountryAggregate | null;
  contestants: Contestant[];
}

export interface ContestantAppearance {
  edition: Edition;
  contestant: Contestant;
}

export interface EditionTaskStats {
  edition: Edition;
  stats: TaskStat[];
}

export interface TaskDetail {
  edition: Edition;
  task: Task;
  stat: TaskStat;
  distribution: DistributionBar[];
  topScorers: { contestant: Contestant; score: number }[];
}

const SCORE_BUCKETS: ScoreBucket[] = [
  { label: "0", min: 0, max: 0 },
  { label: "1–25", min: 1, max: 25 },
  { label: "26–50", min: 26, max: 50 },
  { label: "51–75", min: 51, max: 75 },
  { label: "76–99", min: 76, max: 99 },
  { label: "100", min: 100, max: Infinity },
];

export class StatsService {
  constructor(private readonly source: StatsDataSource) {}

  /* ---- Editions ---- */

  listEditions(): Promise<Edition[]> {
    return this.source.getEditions();
  }

  async getEdition(slug: string): Promise<Edition | null> {
    const editions = await this.source.getEditions();
    return editions.find((e) => e.slug === slug) ?? null;
  }

  async getLatestEdition(): Promise<Edition> {
    const editions = await this.source.getEditions();
    return editions[0];
  }

  async listEditionRows(): Promise<EditionRow[]> {
    const [editions, byName] = await Promise.all([
      this.source.getEditions(),
      this.countriesByName(),
    ]);
    const total = editions.length;
    // `editions` is sorted newest-first, so the oldest gets olympiad number 1.
    return editions.map((edition, i) => {
      const host = byName.get(edition.host);
      const summary = this.summarize(edition, byName);
      return {
        number: total - i,
        year: edition.year,
        slug: edition.slug,
        name: edition.name,
        dates: edition.dates,
        host: edition.host,
        hostCode: host?.code ?? null,
        hostFlag: host?.flag ?? "",
        city: edition.city,
        contestants: summary.participants,
        countries: summary.countriesCount,
      };
    });
  }

  async getEditionSlugs(): Promise<string[]> {
    const editions = await this.source.getEditions();
    return editions.map((e) => e.slug);
  }

  async getEditionDetail(slug: string): Promise<EditionDetail | null> {
    const edition = await this.getEdition(slug);
    if (!edition) return null;
    const byName = await this.countriesByName();
    return {
      edition,
      summary: this.summarize(edition, byName),
      thresholds: medalThresholds(edition),
      maxScore: edition.tasks.reduce((sum, t) => sum + t.maxScore, 0),
      hostCountry: byName.get(edition.host) ?? null,
      rows: edition.contestants.map((c) => this.toRow(c, byName)),
      delegations: editionDelegations(edition, byName),
      taskStats: computeTaskStats(edition),
    };
  }

  /* ---- Countries ---- */

  listCountries(): Promise<Country[]> {
    return this.source.getCountries();
  }

  async getCountryAggregates(editionSlug?: string): Promise<CountryAggregate[]> {
    const edition = editionSlug
      ? await this.getEdition(editionSlug)
      : await this.getLatestEdition();
    if (!edition) return [];
    return aggregateCountries(edition, await this.countriesByName());
  }

  async getCountryDetail(code: string, editionSlug?: string): Promise<CountryDetail | null> {
    const [countries, edition] = await Promise.all([
      this.source.getCountries(),
      editionSlug ? this.getEdition(editionSlug) : this.getLatestEdition(),
    ]);
    const country = countries.find((c) => c.code === code);
    if (!country || !edition) return null;

    const aggregate =
      aggregateCountries(edition, await this.countriesByName()).find(
        (a) => a.country.code === code,
      ) ?? null;
    const contestants = edition.contestants
      .filter((c) => c.countryName === country.name)
      .sort((a, b) => a.rank - b.rank);

    return { country, aggregate, contestants };
  }

  /* ---- Contestants ---- */

  async getContestantAppearances(slug: string): Promise<ContestantAppearance[]> {
    const editions = await this.source.getEditions();
    const appearances: ContestantAppearance[] = [];
    for (const edition of editions) {
      for (const contestant of edition.contestants) {
        if (contestant.slug === slug) appearances.push({ edition, contestant });
      }
    }
    return appearances.sort((a, b) => b.edition.year - a.edition.year);
  }

  async getAllContestantSlugs(): Promise<string[]> {
    const editions = await this.source.getEditions();
    const slugs = new Set<string>();
    for (const e of editions) for (const c of e.contestants) slugs.add(c.slug);
    return [...slugs];
  }

  /* ---- Tasks ---- */

  async listEditionTaskStats(): Promise<EditionTaskStats[]> {
    const editions = await this.source.getEditions();
    return editions.map((edition) => ({
      edition,
      stats: computeTaskStats(edition),
    }));
  }

  async getTaskParams(): Promise<{ year: string; task: string }[]> {
    const editions = await this.source.getEditions();
    return editions.flatMap((e) => e.tasks.map((t) => ({ year: e.slug, task: t.slug })));
  }

  async getTaskDetail(editionSlug: string, taskSlug: string): Promise<TaskDetail | null> {
    const edition = await this.getEdition(editionSlug);
    if (!edition) return null;
    const task = edition.tasks.find((t) => t.slug === taskSlug);
    if (!task) return null;

    const stat = computeTaskStats(edition).find((s) => s.task.slug === taskSlug)!;
    const distribution = distributeTaskScores(edition, taskSlug, SCORE_BUCKETS);
    const topScorers = edition.contestants
      .filter((c) => c.status !== "unofficial" && (c.scores[taskSlug] ?? 0) > 0)
      .map((contestant) => ({ contestant, score: contestant.scores[taskSlug] ?? 0 }))
      .sort((a, b) => b.score - a.score || a.contestant.rank - b.contestant.rank)
      .slice(0, 10);

    return { edition, task, stat, distribution, topScorers };
  }

  /* ---- internals ---- */

  private async countriesByName(): Promise<Map<string, Country>> {
    const countries = await this.source.getCountries();
    return new Map(countries.map((c) => [c.name, c]));
  }

  private summarize(edition: Edition, byName: Map<string, Country>): EditionSummary {
    const official = tallyMedals(edition, "official");
    const guest = tallyMedals(edition, "guest");
    return {
      participants: edition.contestants.filter((c) => c.status !== "unofficial").length,
      countriesCount: aggregateCountries(edition, byName).length,
      tasksCount: edition.tasks.length,
      official,
      guest,
      totalMedals: official.gold + official.silver + official.bronze,
    };
  }

  private toRow(c: Contestant, byName: Map<string, Country>): ScoreRow {
    return {
      rank: c.rank,
      slug: c.slug,
      fullName: c.fullName,
      countryName: c.countryName,
      countryFlag: byName.get(c.countryName)?.flag ?? "",
      countryCode: byName.get(c.countryName)?.code ?? null,
      status: c.status,
      medal: c.medal,
      specialAward: c.specialAward,
      scores: c.scores,
      day1Total: c.day1Total,
      day2Total: c.day2Total,
      total: c.total,
    };
  }
}

// Application service: the single API the UI consumes. It orchestrates the
// data-access port + pure domain functions into ready-to-render view models,
// so pages stay thin and business logic stays out of React.
import type { StatsDataSource } from "./ports";
import type { Edition, Official } from "@/domain/edition";
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
  dayTotals: Contestant["dayTotals"];
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

/** One row of the countries ranking table. */
export interface CountryRow {
  country: Country;
  guest: boolean; // guest teams are shown but ranked below official teams
  hosted: number[]; // years this country hosted
  participants: number;
  gold: number;
  silver: number;
  bronze: number;
  hm: number;
  totalMedals: number;
  bestRank: number;
}

export interface CountryEditionResults {
  edition: Edition;
  rows: ScoreRow[];
}

export interface CountryDelegationEntry {
  edition: Edition;
  contestants: Contestant[];
  gold: number;
  silver: number;
  bronze: number;
  hm: number;
  bestRank: number;
}

/** Everything the tabbed country detail needs, in one bundle. */
export interface CountryDetail {
  country: Country;
  firstYear: number | null;
  editionsParticipated: number;
  contestantsCount: number;
  performance: MedalTally;
  bestRank: number | null;
  hosted: number[];
  results: CountryEditionResults[];
  delegations: CountryDelegationEntry[];
  people: Official[];
}

export interface ContestantAppearance {
  edition: Edition;
  contestant: Contestant;
}

export interface ContestantParticipation {
  edition: Edition;
  contestant: Contestant;
  fieldSize: number; // ranked contestants in that edition (for "rank / N")
  countryFlag: string;
}

/** Everything the contestant profile page needs. */
export interface ContestantProfile {
  slug: string;
  fullName: string;
  country: Country | null;
  status: Contestant["status"];
  medalTally: MedalTally;
  bestRank: number;
  totalScore: number;
  participations: ContestantParticipation[]; // newest first
}

/** One contestant's all-time medal record for the Hall of Fame. */
export interface HallOfFameRow {
  rank: number;
  slug: string;
  fullName: string;
  countryName: string;
  countryFlag: string;
  countryCode: string | null;
  status: Contestant["status"];
  participations: number;
  gold: number;
  silver: number;
  bronze: number;
  totalMedals: number;
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

  /** Rows for the countries ranking table, aggregated across all editions. */
  async listCountryRows(): Promise<CountryRow[]> {
    const [editions, byName] = await Promise.all([
      this.source.getEditions(),
      this.countriesByName(),
    ]);

    const map = new Map<string, CountryRow>();
    for (const edition of editions) {
      for (const c of edition.contestants) {
        if (c.status === "unofficial") continue; // only unofficial entries are dropped
        const country = byName.get(c.countryName);
        if (!country) continue;
        let row = map.get(country.code);
        if (!row) {
          row = {
            country,
            guest: c.status === "guest",
            hosted: [],
            participants: 0,
            gold: 0,
            silver: 0,
            bronze: 0,
            hm: 0,
            totalMedals: 0,
            bestRank: Infinity,
          };
          map.set(country.code, row);
        }
        row.participants++;
        row.bestRank = Math.min(row.bestRank, c.rank);
        if (c.medal === "GOLD") row.gold++;
        else if (c.medal === "SILVER") row.silver++;
        else if (c.medal === "BRONZE") row.bronze++;
        else if (c.medal === "HM") row.hm++;
      }
    }
    for (const edition of editions) {
      const host = byName.get(edition.host);
      if (host && map.has(host.code)) map.get(host.code)!.hosted.push(edition.year);
    }
    for (const row of map.values()) {
      row.totalMedals = row.gold + row.silver + row.bronze;
      row.hosted.sort((a, b) => a - b);
    }

    return [...map.values()].sort(
      (a, b) =>
        Number(a.guest) - Number(b.guest) || // official teams first, guests below
        b.gold - a.gold ||
        b.silver - a.silver ||
        b.bronze - a.bronze ||
        b.hm - a.hm ||
        a.bestRank - b.bestRank ||
        a.country.name.localeCompare(b.country.name),
    );
  }

  async getCountryDetail(code: string): Promise<CountryDetail | null> {
    const [countries, editions, byName] = await Promise.all([
      this.source.getCountries(),
      this.source.getEditions(),
      this.countriesByName(),
    ]);
    const country = countries.find((c) => c.code === code);
    if (!country) return null;

    const participated = editions
      .filter((e) => e.contestants.some((c) => c.countryName === country.name))
      .sort((a, b) => a.year - b.year);

    const performance: MedalTally = { gold: 0, silver: 0, bronze: 0, hm: 0 };
    let contestantsCount = 0;
    let bestRank = Infinity;
    const results: CountryEditionResults[] = [];
    const delegations: CountryDelegationEntry[] = [];

    for (const edition of participated) {
      const members = edition.contestants
        .filter((c) => c.countryName === country.name)
        .sort((a, b) => a.rank - b.rank);
      contestantsCount += members.length;

      const del: CountryDelegationEntry = {
        edition,
        contestants: members,
        gold: 0,
        silver: 0,
        bronze: 0,
        hm: 0,
        bestRank: Infinity,
      };
      for (const c of members) {
        bestRank = Math.min(bestRank, c.rank);
        del.bestRank = Math.min(del.bestRank, c.rank);
        if (c.medal === "GOLD") {
          performance.gold += 1;
          del.gold += 1;
        } else if (c.medal === "SILVER") {
          performance.silver += 1;
          del.silver += 1;
        } else if (c.medal === "BRONZE") {
          performance.bronze += 1;
          del.bronze += 1;
        } else if (c.medal === "HM") {
          performance.hm += 1;
          del.hm += 1;
        }
      }
      results.push({ edition, rows: members.map((c) => this.toRow(c, byName)) });
      delegations.push(del);
    }

    return {
      country,
      firstYear: participated.length ? participated[0].year : null,
      editionsParticipated: participated.length,
      contestantsCount,
      performance,
      bestRank: bestRank === Infinity ? null : bestRank,
      hosted: editions.filter((e) => e.host === country.name).map((e) => e.year).sort((a, b) => a - b),
      results: results.slice().sort((a, b) => b.edition.year - a.edition.year),
      delegations: delegations.slice().sort((a, b) => b.edition.year - a.edition.year),
      people: this.peopleForCountry(participated, country),
    };
  }

  /**
   * People tied to a country. Matching is EXACT (never substring, which would
   * make "Niger" match "Nigeria" or "Mali" match "Somalia"):
   *  - a Team Leader whose role names exactly this country, and
   *  - for the host country, its Host Committee and Coaches.
   * Deduped by name, merging roles.
   */
  private peopleForCountry(editions: Edition[], country: Country): Official[] {
    const cleanRole = (r: string) => r.replace(/\s*\(Guest\)\s*$/i, "").trim();
    const byName = new Map<string, Official>();

    for (const edition of editions) {
      const isHost = edition.host === country.name;
      for (const group of edition.administration) {
        for (const member of group.members) {
          const isLeader =
            group.title === "Team Leaders" &&
            member.roles.some((r) => cleanRole(r) === country.name);
          const isHostStaff =
            isHost && (group.title === "Host Committee" || group.title === "Coaches");
          if (!isLeader && !isHostStaff) continue;

          const existing = byName.get(member.name);
          if (existing) {
            for (const r of member.roles) if (!existing.roles.includes(r)) existing.roles.push(r);
            if (!existing.image && member.image) existing.image = member.image;
          } else {
            byName.set(member.name, {
              name: member.name,
              roles: [...member.roles],
              image: member.image,
            });
          }
        }
      }
    }
    return [...byName.values()];
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

  async getContestantProfile(slug: string): Promise<ContestantProfile | null> {
    const [editions, byName] = await Promise.all([
      this.source.getEditions(),
      this.countriesByName(),
    ]);

    const participations: ContestantParticipation[] = [];
    const medalTally: MedalTally = { gold: 0, silver: 0, bronze: 0, hm: 0 };
    let bestRank = Infinity;
    let totalScore = 0;

    for (const edition of editions) {
      for (const contestant of edition.contestants) {
        if (contestant.slug !== slug) continue;
        participations.push({
          edition,
          contestant,
          fieldSize: edition.contestants.filter((c) => c.status !== "unofficial").length,
          countryFlag: byName.get(contestant.countryName)?.flag ?? "",
        });
        bestRank = Math.min(bestRank, contestant.rank);
        totalScore += contestant.total;
        if (contestant.medal === "GOLD") medalTally.gold++;
        else if (contestant.medal === "SILVER") medalTally.silver++;
        else if (contestant.medal === "BRONZE") medalTally.bronze++;
        else if (contestant.medal === "HM") medalTally.hm++;
      }
    }

    if (participations.length === 0) return null;
    participations.sort((a, b) => b.edition.year - a.edition.year);
    const latest = participations[0].contestant;

    return {
      slug,
      fullName: latest.fullName,
      country: byName.get(latest.countryName) ?? null,
      status: latest.status,
      medalTally,
      bestRank,
      totalScore,
      participations,
    };
  }

  /**
   * All-time contestant ranking, modelled after the IOI Hall of Fame.
   * Medals are compared lexicographically (gold, then silver, then bronze),
   * and equal medal records share a competition rank.
   */
  async listHallOfFameRows(): Promise<HallOfFameRow[]> {
    const [editions, byName] = await Promise.all([
      this.source.getEditions(),
      this.countriesByName(),
    ]);

    const bySlug = new Map<string, Omit<HallOfFameRow, "rank">>();

    for (const edition of editions) {
      for (const contestant of edition.contestants) {
        const existing = bySlug.get(contestant.slug);
        const country = byName.get(contestant.countryName);
        const row = existing ?? {
          slug: contestant.slug,
          fullName: contestant.fullName,
          countryName: contestant.countryName,
          countryFlag: country?.flag ?? "",
          countryCode: country?.code ?? null,
          status: contestant.status,
          participations: 0,
          gold: 0,
          silver: 0,
          bronze: 0,
          totalMedals: 0,
        };

        row.participations++;
        if (contestant.medal === "GOLD") row.gold++;
        else if (contestant.medal === "SILVER") row.silver++;
        else if (contestant.medal === "BRONZE") row.bronze++;

        // Editions are newest-first, so the first appearance supplies the
        // current profile context when a contestant changes team or status.
        if (!existing) bySlug.set(contestant.slug, row);
      }
    }

    const sorted = [...bySlug.values()]
      .map((row) => ({
        ...row,
        totalMedals: row.gold + row.silver + row.bronze,
      }))
      .sort(
        (a, b) =>
          b.gold - a.gold ||
          b.silver - a.silver ||
          b.bronze - a.bronze ||
          a.fullName.localeCompare(b.fullName),
      );

    let rank = 0;
    let previousMedals = "";

    return sorted.map((row, index) => {
      const medals = `${row.gold}:${row.silver}:${row.bronze}`;
      if (medals !== previousMedals) {
        rank = index + 1;
        previousMedals = medals;
      }
      return { rank, ...row };
    });
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
      dayTotals: c.dayTotals,
      total: c.total,
    };
  }
}

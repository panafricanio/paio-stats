// Pure, framework-free aggregations. Every "stats" number the site shows is
// derived here from domain entities — no data-source or React concerns.
import type { Edition } from "./edition";
import type { Country, CountryAggregate } from "./country";
import type { TaskStat } from "./task";
import type { MedalTally, MedalType } from "./medal";
import type { Contestant, ContestantStatus } from "./contestant";

const MEDAL_ORDER: MedalType[] = ["GOLD", "SILVER", "BRONZE", "HM"];

export interface MedalThreshold {
  medal: MedalType;
  cutoff: number; // lowest total score that still earned this medal
  count: number; // number awarded
}

/** Score cut-off and count for each medal (IOI-style thresholds). */
export function medalThresholds(edition: Edition): MedalThreshold[] {
  const thresholds: MedalThreshold[] = [];
  for (const medal of MEDAL_ORDER) {
    // Official awards only, to stay consistent with the medal summary tiles.
    // Guest medals are recognised individually but reported separately.
    const holders = edition.contestants.filter(
      (c) => c.status === "official" && c.medal === medal,
    );
    if (holders.length === 0) continue;
    thresholds.push({
      medal,
      cutoff: Math.min(...holders.map((c) => c.total)),
      count: holders.length,
    });
  }
  return thresholds;
}

export function tallyMedals(
  edition: Edition,
  status: ContestantStatus = "official",
): MedalTally {
  const tally: MedalTally = { gold: 0, silver: 0, bronze: 0, hm: 0 };
  for (const c of edition.contestants) {
    if (c.status !== status || !c.medal) continue;
    if (c.medal === "GOLD") tally.gold++;
    else if (c.medal === "SILVER") tally.silver++;
    else if (c.medal === "BRONZE") tally.bronze++;
    else tally.hm++;
  }
  return tally;
}

export interface Delegation {
  country: Country;
  guest: boolean;
  participants: number;
  gold: number;
  silver: number;
  bronze: number;
  hm: number;
  bestRank: number;
  contestants: Contestant[];
}

/**
 * Country delegations at one edition — every team present (official + guest),
 * each with its contestants and medal count. Unofficial entries are excluded.
 */
export function editionDelegations(
  edition: Edition,
  countriesByName: Map<string, Country>,
): Delegation[] {
  const map = new Map<string, Delegation>();

  for (const c of edition.contestants) {
    if (c.status === "unofficial") continue;
    const country = countriesByName.get(c.countryName);
    if (!country) continue;

    let d = map.get(country.code);
    if (!d) {
      d = {
        country,
        guest: c.status === "guest" || !!country.guest,
        participants: 0,
        gold: 0,
        silver: 0,
        bronze: 0,
        hm: 0,
        bestRank: Infinity,
        contestants: [],
      };
      map.set(country.code, d);
    }
    d.participants++;
    d.bestRank = Math.min(d.bestRank, c.rank);
    d.contestants.push(c);
    if (c.medal === "GOLD") d.gold++;
    else if (c.medal === "SILVER") d.silver++;
    else if (c.medal === "BRONZE") d.bronze++;
    else if (c.medal === "HM") d.hm++;
  }

  for (const d of map.values()) d.contestants.sort((a, b) => a.rank - b.rank);

  return [...map.values()].sort(
    (a, b) =>
      Number(a.guest) - Number(b.guest) ||
      b.gold - a.gold ||
      b.silver - a.silver ||
      b.bronze - a.bronze ||
      b.hm - a.hm ||
      a.bestRank - b.bestRank ||
      a.country.name.localeCompare(b.country.name),
  );
}

/** Aggregate official contestants by country and rank the medal table. */
export function aggregateCountries(
  edition: Edition,
  countriesByName: Map<string, Country>,
): CountryAggregate[] {
  const map = new Map<string, CountryAggregate>();

  for (const c of edition.contestants) {
    if (c.status !== "official") continue;
    const country = countriesByName.get(c.countryName);
    if (!country) continue;

    let agg = map.get(country.code);
    if (!agg) {
      agg = {
        country,
        participants: 0,
        gold: 0,
        silver: 0,
        bronze: 0,
        hm: 0,
        totalMedals: 0,
        bestRank: Infinity,
      };
      map.set(country.code, agg);
    }
    agg.participants++;
    agg.bestRank = Math.min(agg.bestRank, c.rank);
    if (c.medal === "GOLD") agg.gold++;
    else if (c.medal === "SILVER") agg.silver++;
    else if (c.medal === "BRONZE") agg.bronze++;
    else if (c.medal === "HM") agg.hm++;
  }

  for (const agg of map.values()) {
    agg.totalMedals = agg.gold + agg.silver + agg.bronze;
  }

  return [...map.values()].sort(compareCountryAggregate);
}

/** Medal-table ordering: gold, then silver, then bronze, then HM, then best rank. */
export function compareCountryAggregate(a: CountryAggregate, b: CountryAggregate): number {
  return (
    b.gold - a.gold ||
    b.silver - a.silver ||
    b.bronze - a.bronze ||
    b.hm - a.hm ||
    a.bestRank - b.bestRank ||
    a.country.name.localeCompare(b.country.name)
  );
}

export interface ScoreBucket {
  label: string;
  min: number;
  max: number;
}

export interface DistributionBar {
  label: string;
  count: number;
}

/** Count contestants whose score on a task falls into each bucket. */
export function distributeTaskScores(
  edition: Edition,
  taskSlug: string,
  buckets: ScoreBucket[],
): DistributionBar[] {
  const ranked = edition.contestants.filter((c) => c.status !== "unofficial");
  return buckets.map((b) => ({
    label: b.label,
    count: ranked.filter((c) => {
      const s = c.scores[taskSlug] ?? 0;
      return s >= b.min && s <= b.max;
    }).length,
  }));
}

/** Per-task difficulty statistics over ranked (non-unofficial) contestants. */
export function computeTaskStats(edition: Edition): TaskStat[] {
  const ranked = edition.contestants.filter((c) => c.status !== "unofficial");
  const n = ranked.length || 1;

  return edition.tasks.map((task) => {
    const scores = ranked.map((c) => c.scores[task.slug] ?? 0);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / n;
    const fullSolves = scores.filter((s) => s >= task.maxScore).length;
    return {
      task,
      participants: n,
      attempted: scores.filter((s) => s > 0).length,
      avg,
      avgPct: (avg / task.maxScore) * 100,
      fullSolves,
      fullPct: (fullSolves / n) * 100,
    };
  });
}

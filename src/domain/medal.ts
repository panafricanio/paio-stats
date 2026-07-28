// Medal domain: the value type, the ranking bands, the tally, and the rules that
// turn a rank or a score into a medal. Business rules live with the type they govern.
import type { ContestantStatus } from "./contestant";

export type MedalType = "GOLD" | "SILVER" | "BRONZE" | "HM";

export interface MedalBands {
  gold: [number, number];
  silver: [number, number];
  bronze: [number, number];
  hm: [number, number];
}

/** Minimum total score that earns each medal (PAIO score-threshold editions). */
export interface ScoreMedalThresholds {
  gold: number;
  silver: number;
  bronze: number;
  hm: number;
}

export interface MedalTally {
  gold: number;
  silver: number;
  bronze: number;
  hm: number;
}

const ORDER: { type: MedalType; key: keyof MedalBands }[] = [
  { type: "GOLD", key: "gold" },
  { type: "SILVER", key: "silver" },
  { type: "BRONZE", key: "bronze" },
  { type: "HM", key: "hm" },
];

/** Rank-band awards (e.g. PAIO 2025). */
export function medalForRank(
  rank: number,
  bands: MedalBands,
  status: ContestantStatus,
): MedalType | null {
  if (status === "unofficial") return null;
  for (const { type, key } of ORDER) {
    const [lo, hi] = bands[key];
    if (rank >= lo && rank <= hi) return type;
  }
  return null;
}

/**
 * Score-threshold awards (e.g. PAIO 2026).
 * Unofficial contestants never receive medals. Guests use the same thresholds.
 */
export function medalForScore(
  total: number,
  thresholds: ScoreMedalThresholds,
  status: ContestantStatus,
): MedalType | null {
  if (status === "unofficial") return null;
  if (total >= thresholds.gold) return "GOLD";
  if (total >= thresholds.silver) return "SILVER";
  if (total >= thresholds.bronze) return "BRONZE";
  if (total >= thresholds.hm) return "HM";
  return null;
}

export const MEDAL_LABELS: Record<MedalType, string> = {
  GOLD: "Gold",
  SILVER: "Silver",
  BRONZE: "Bronze",
  HM: "HM",
};

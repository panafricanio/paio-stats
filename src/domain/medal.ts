// Medal domain: the value type, the ranking bands, the tally, and the rule that
// turns a rank into a medal. Business rule lives with the type it governs.
import type { ContestantStatus } from "./contestant";

export type MedalType = "GOLD" | "SILVER" | "BRONZE" | "HM";

export interface MedalBands {
  gold: [number, number];
  silver: [number, number];
  bronze: [number, number];
  hm: [number, number];
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

/** The single source of truth for who earns which medal. */
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

export const MEDAL_LABELS: Record<MedalType, string> = {
  GOLD: "Gold",
  SILVER: "Silver",
  BRONZE: "Bronze",
  HM: "HM",
};

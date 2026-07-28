// Shared static-data shapes for every PAIO edition. Per-year folders supply
// concrete configs + results; the domain mapper never sees year-specific fields.
import type { MedalBands, ScoreMedalThresholds } from "@/domain/medal";
import type { AdministrationGroup } from "@/domain/edition";

/** Raw contestant row as stored in an edition’s results file. */
export interface RawContestant {
  /**
   * Optional when the edition sets `assignCompetitionRanks`. The mapper then
   * fills ranks once from totals (competition ranking).
   */
  rank?: number;
  firstName: string;
  lastName: string;
  country: string;
  /** Per-task scores keyed by task slug. */
  scores: Record<string, number>;
  isUnofficial?: boolean;
  /**
   * Optional override. When omitted, the edition’s format decides
   * (online competition → online, otherwise onsite).
   */
  venue?: "online" | "onsite";
  specialAward?: string;
}

export interface TaskConfig {
  slug: string;
  name: string;
  short: string;
  day: number; // 1-based contest day; any number of days is supported
  maxScore: number;
  pdf?: string;
}

export interface EditionConfig {
  year: number;
  slug: string;
  name: string;
  host: string;
  city: string;
  country: string;
  format: string;
  dates: string;
  website?: string;
  /**
   * Rank → medal bands. Used when `scoreThresholds` is absent (e.g. PAIO 2025).
   * Placeholder zeros are fine when score thresholds drive awards.
   */
  bands: MedalBands;
  /**
   * Score → medal floors. When set, awards use totals instead of rank bands
   * (e.g. PAIO 2026: gold ≥ 412, …).
   */
  scoreThresholds?: ScoreMedalThresholds;
  /**
   * When true, ignore raw `rank` and assign competition ranks once at map time
   * (same total → same rank; next rank skips).
   */
  assignCompetitionRanks?: boolean;
  tasks: TaskConfig[];
  results: RawContestant[];
  administration?: AdministrationGroup[];
}

// Shared static-data shapes for every PAIO edition. Per-year folders supply
// concrete configs + results; the domain mapper never sees year-specific fields.
import type { MedalBands } from "@/domain/medal";
import type { AdministrationGroup } from "@/domain/edition";

/** Raw contestant row as stored in an edition’s results file. */
export interface RawContestant {
  rank: number;
  firstName: string;
  lastName: string;
  country: string;
  /** Per-task scores keyed by task slug. */
  scores: Record<string, number>;
  isUnofficial?: boolean;
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
  bands: MedalBands;
  tasks: TaskConfig[];
  results: RawContestant[];
  administration?: AdministrationGroup[];
}

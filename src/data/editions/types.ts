// Shared static-data shapes for every PAIO edition. Per-year folders supply
// concrete configs + results; the domain mapper never sees year-specific fields.
import type { MedalBands } from "@/domain/medal";
import type { AdministrationGroup, Official } from "@/domain/edition";

/** Raw contestant row as stored in an edition’s results file. */
export interface RawContestant {
  rank: number;
  firstName: string;
  lastName: string;
  country: string;
  /** Optional portrait path under /public (e.g. /images/editions/2026/…). */
  image?: string;
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
  bands: MedalBands;
  tasks: TaskConfig[];
  results: RawContestant[];
  administration?: AdministrationGroup[];
  /** National team leaders — not part of the Administration tab. */
  teamLeaders?: Official[];
  /** National deputy leaders — not part of the Administration tab. */
  deputyLeaders?: Official[];
}

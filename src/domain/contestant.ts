// Contestant domain entity.
import type { MedalType } from "./medal";

export type ContestantStatus = "official" | "guest" | "unofficial";

/** How a contestant sat the contest for this edition. */
export type ContestVenue = "online" | "onsite";

/** A contestant's total for one contest day. */
export interface DayTotal {
  day: number;
  total: number;
}

export interface Contestant {
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  rank: number;
  countryName: string;
  status: ContestantStatus;
  /** Online vs on-site participation for this edition. */
  venue: ContestVenue;
  /** Score per task, keyed by task slug. */
  scores: Record<string, number>;
  /** Per-day totals, derived from scores + each task's day. Any number of days. */
  dayTotals: DayTotal[];
  total: number;
  medal: MedalType | null;
  specialAward?: string;
}

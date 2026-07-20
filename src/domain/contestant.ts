// Contestant domain entity.
import type { MedalType } from "./medal";

export type ContestantStatus = "official" | "guest" | "unofficial";

export interface Contestant {
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  rank: number;
  countryName: string;
  status: ContestantStatus;
  /** Score per task, keyed by task slug. */
  scores: Record<string, number>;
  day1Total: number;
  day2Total: number;
  total: number;
  medal: MedalType | null;
  specialAward?: string;
}

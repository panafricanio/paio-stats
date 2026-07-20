// Edition (olympiad) domain entity — the aggregate root tying tasks + contestants.
import type { MedalBands } from "./medal";
import type { Task } from "./task";
import type { Contestant } from "./contestant";

/** An organiser/official of an edition (for the Administration tab). */
export interface Official {
  role: string;
  name: string;
  country?: string;
}

export interface Edition {
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
  tasks: Task[];
  contestants: Contestant[];
  officials: Official[];
}

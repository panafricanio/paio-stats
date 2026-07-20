// Edition (olympiad) domain entity — the aggregate root tying tasks + contestants.
import type { MedalBands } from "./medal";
import type { Task } from "./task";
import type { Contestant } from "./contestant";

/** A person on an edition's organising side (Administration tab). */
export interface Official {
  name: string;
  roles: string[];
  image?: string;
}

/** A titled group of officials (e.g. "Team Leaders", "Coaches"). */
export interface AdministrationGroup {
  title: string;
  members: Official[];
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
  /** Distinct contest days present in this edition, ascending (derived from tasks). */
  days: number[];
  tasks: Task[];
  contestants: Contestant[];
  administration: AdministrationGroup[];
}

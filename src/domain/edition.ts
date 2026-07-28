// Edition (olympiad) domain entity — the aggregate root tying tasks + contestants.
import type { MedalBands } from "./medal";
import type { Task } from "./task";
import type { Contestant } from "./contestant";

/** A person on an edition's organising side (Administration tab). */
export interface Official {
  name: string;
  /**
   * Role(s) in the PAIO organisation for this edition (IOI-style), e.g.
   * "Chairman", "IC member", "ISC member" — not employer or biography.
   * For national team/deputy leaders, roles carry the country name used for matching.
   */
  roles: string[];
  image?: string;
}

/** A titled group of officials (e.g. "International Committee"). */
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
  /** Organising committees shown on the Administration tab. */
  administration: AdministrationGroup[];
  /** National team leaders for this edition (Delegations / country people). */
  teamLeaders: Official[];
  /** National deputy leaders for this edition (Delegations / country people). */
  deputyLeaders: Official[];
}

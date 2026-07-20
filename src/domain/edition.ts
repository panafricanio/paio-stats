// Edition (olympiad) domain entity — the aggregate root tying tasks + contestants.
import type { MedalBands } from "./medal";
import type { Task } from "./task";
import type { Contestant } from "./contestant";

export interface Edition {
  year: number;
  slug: string;
  name: string;
  host: string;
  city: string;
  country: string;
  format: string;
  dates: string;
  bands: MedalBands;
  tasks: Task[];
  contestants: Contestant[];
}

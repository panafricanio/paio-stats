import type { EditionConfig, TaskConfig } from "../types";
import { administration } from "./administration";
import { deputyLeaders } from "./deputy-leaders";
import { results } from "./results";
import { teamLeaders } from "./team-leaders";

const tasks: TaskConfig[] = [
  { slug: "vials", name: "Vials", short: "Vials", day: 1, maxScore: 100 },
  { slug: "detour", name: "Detour", short: "Detour", day: 1, maxScore: 100 },
  { slug: "lanterns", name: "Lanterns", short: "Lant", day: 1, maxScore: 100 },
  { slug: "walks", name: "Walks", short: "Walks", day: 1, maxScore: 100 },
  { slug: "imigongo", name: "Imigongo", short: "Imig", day: 2, maxScore: 100 },
  { slug: "elevator", name: "Elevator", short: "Elev", day: 2, maxScore: 100 },
  { slug: "alchemy", name: "Alchemy", short: "Alch", day: 2, maxScore: 100 },
  { slug: "islands", name: "Islands", short: "Isl", day: 2, maxScore: 100 },
];

/**
 * PAIO 2026 — Kigali hybrid (on-site + online).
 * Medal bands are the shared rank-band model, derived from the published score
 * cut-offs (Gold ≥412, Silver ≥136, Bronze ≥84, HM ≥6) so awards stay consistent
 * with medalForRank used by every edition.
 */
export const paio2026: EditionConfig = {
  year: 2026,
  slug: "2026",
  name: "PAIO 2026",
  host: "Rwanda",
  city: "Kigali",
  country: "Rwanda",
  format: "Hybrid competition",
  dates: "July 23–30, 2026",
  website: "https://2026.panafricanio.com/",
  bands: {
    gold: [1, 27],
    silver: [28, 50],
    bronze: [52, 57],
    hm: [58, 72],
  },
  tasks,
  results,
  administration,
  teamLeaders,
  deputyLeaders,
};

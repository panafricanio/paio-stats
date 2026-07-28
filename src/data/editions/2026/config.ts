import type { EditionConfig, TaskConfig } from "../types";
import { results } from "./results";

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

/** PAIO 2026 — Kigali hybrid (on-site + online). */
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
  // Rank bands unused when scoreThresholds are set.
  bands: {
    gold: [0, 0],
    silver: [0, 0],
    bronze: [0, 0],
    hm: [0, 0],
  },
  scoreThresholds: {
    gold: 412,
    silver: 136,
    bronze: 84,
    hm: 6,
  },
  assignCompetitionRanks: true,
  tasks,
  results,
};

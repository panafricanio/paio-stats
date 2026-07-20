// Raw edition configuration (the "database" for now). Add one entry per PAIO.
// `rawKey` links a task to its column on the raw ContestantResult record; the
// service maps this config into clean domain entities.
import type { ContestantResult } from "./results";
import { resultsData } from "./results";
import type { MedalBands } from "@/domain/medal";
import type { Official } from "@/domain/edition";

export interface TaskConfig {
  rawKey: keyof ContestantResult;
  slug: string;
  name: string;
  short: string;
  day: 1 | 2;
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
  results: ContestantResult[];
  officials?: Official[];
}

const paio2025Tasks: TaskConfig[] = [
  { rawKey: "cards", slug: "cards", name: "Cards", short: "Cards", day: 1, maxScore: 100 },
  { rawKey: "gcd", slug: "gcd", name: "GCD", short: "GCD", day: 1, maxScore: 100 },
  { rawKey: "rooks", slug: "rooks", name: "Rooks", short: "Rooks", day: 1, maxScore: 100 },
  { rawKey: "xor", slug: "xor", name: "XOR", short: "XOR", day: 1, maxScore: 100 },
  { rawKey: "adventure", slug: "adventure", name: "Adventure", short: "Adv", day: 2, maxScore: 100 },
  { rawKey: "cake", slug: "cake", name: "Cake", short: "Cake", day: 2, maxScore: 100 },
  { rawKey: "exhibition", slug: "exhibition", name: "Exhibition", short: "Exh", day: 2, maxScore: 100 },
  { rawKey: "towers", slug: "towers", name: "Towers", short: "Towers", day: 2, maxScore: 100 },
];

export const editionConfigs: EditionConfig[] = [
  {
    year: 2025,
    slug: "2025",
    name: "PAIO 2025",
    host: "Rwanda",
    city: "Online",
    country: "Rwanda",
    format: "Online competition",
    dates: "September 12–14, 2025",
    bands: {
      gold: [1, 9],
      silver: [10, 21],
      bronze: [22, 36],
      hm: [37, 41],
    },
    tasks: paio2025Tasks,
    results: resultsData,
  },
];

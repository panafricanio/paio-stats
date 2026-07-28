import type { EditionConfig, TaskConfig } from "../types";
import { results } from "./results";
import { administration } from "./administration";
import { teamLeaders } from "./team-leaders";
import { deputyLeaders } from "./deputy-leaders";

const tasks: TaskConfig[] = [
  { slug: "cards", name: "Cards", short: "Cards", day: 1, maxScore: 100, pdf: "/tasks/2025/cards.pdf" },
  { slug: "gcd", name: "GCD", short: "GCD", day: 1, maxScore: 100, pdf: "/tasks/2025/gcd.pdf" },
  { slug: "rooks", name: "Rooks", short: "Rooks", day: 1, maxScore: 100, pdf: "/tasks/2025/rooks.pdf" },
  { slug: "xor", name: "XOR", short: "XOR", day: 1, maxScore: 100, pdf: "/tasks/2025/xor.pdf" },
  { slug: "adventure", name: "Adventure", short: "Adv", day: 2, maxScore: 100, pdf: "/tasks/2025/adventure.pdf" },
  { slug: "cake", name: "Cake", short: "Cake", day: 2, maxScore: 100, pdf: "/tasks/2025/cake.pdf" },
  { slug: "exhibition", name: "Exhibition", short: "Exh", day: 2, maxScore: 100, pdf: "/tasks/2025/exhibition.pdf" },
  { slug: "towers", name: "Towers", short: "Towers", day: 2, maxScore: 100, pdf: "/tasks/2025/towers.pdf" },
];

/** PAIO 2025 — one plugged-in edition in the multi-year archive. */
export const paio2025: EditionConfig = {
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
  tasks,
  results,
  administration,
  teamLeaders,
  deputyLeaders,
};

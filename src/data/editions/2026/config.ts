import type { EditionConfig } from "../types";

/**
 * PAIO 2026 — announced edition. Results and tasks are filled in after the
 * contest; until then the overview shows host/dates and editions list shows TBA.
 */
export const paio2026: EditionConfig = {
  year: 2026,
  slug: "2026",
  name: "PAIO 2026",
  host: "Rwanda",
  city: "Kigali",
  country: "Rwanda",
  format: "In-person competition",
  dates: "July 23–30, 2026",
  website: "https://2026.panafricanio.com/",
  bands: {
    gold: [0, 0],
    silver: [0, 0],
    bronze: [0, 0],
    hm: [0, 0],
  },
  tasks: [],
  results: [],
};

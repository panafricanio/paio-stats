// PAIO 2026 administration groups. Each committee lives in its own module;
// this file only composes display order for the Administration tab.
import type { AdministrationGroup } from "@/domain/edition";
import { deputyLeaders } from "./deputy-leaders";
import { internationalCommittee } from "./international-committee";
import { scientificCommittee } from "./scientific-committee";
import { teamLeaders } from "./team-leaders";
import { technicalCommittee } from "./technical-committee";

export const administration: AdministrationGroup[] = [
  { title: "International Committee", members: internationalCommittee },
  { title: "International Scientific Committee", members: scientificCommittee },
  { title: "International Technical Committee", members: technicalCommittee },
  { title: "Team Leaders", members: teamLeaders },
  { title: "Deputy Leaders", members: deputyLeaders },
];

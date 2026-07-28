// PAIO 2026 administration groups (committees only). Team/Deputy leaders live
// beside the edition as delegation data, not on the Administration tab.
import type { AdministrationGroup } from "@/domain/edition";
import { internationalCommittee } from "./international-committee";
import { scientificCommittee } from "./scientific-committee";
import { technicalCommittee } from "./technical-committee";

export const administration: AdministrationGroup[] = [
  { title: "International Committee", members: internationalCommittee },
  { title: "International Scientific Committee", members: scientificCommittee },
  { title: "International Technical Committee", members: technicalCommittee },
];

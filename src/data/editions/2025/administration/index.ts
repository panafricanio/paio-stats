// PAIO 2025 administration — same IC → ISC → ITC shape as every other edition.
import { composeAdministration } from "../../compose-administration";
import { internationalCommittee } from "./international-committee";
import { scientificCommittee } from "./scientific-committee";
import { technicalCommittee } from "./technical-committee";

export const administration = composeAdministration({
  international: internationalCommittee,
  scientific: scientificCommittee,
  technical: technicalCommittee,
});

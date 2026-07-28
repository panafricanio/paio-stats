// PAIO 2026 administration — shared IC → ISC → ITC → HTC shape.
import { composeAdministration } from "../../compose-administration";
import { hostTechnicalCommittee } from "./host-technical-committee";
import { internationalCommittee } from "./international-committee";
import { internationalScientificCommittee } from "./international-scientific-committee";
import { internationalTechnicalCommittee } from "./international-technical-committee";

export const administration = composeAdministration({
  internationalCommittee,
  internationalScientificCommittee,
  internationalTechnicalCommittee,
  hostTechnicalCommittee,
});

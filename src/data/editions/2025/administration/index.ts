// PAIO 2025 administration — shared catalog; only populated committees appear.
import { composeAdministration } from "../../compose-administration";
import { hostCommittee } from "./host-committee";
import { hostTechnicalCommittee } from "./host-technical-committee";
import { internationalCommittee } from "./international-committee";
import { internationalScientificCommittee } from "./international-scientific-committee";
import { internationalTechnicalCommittee } from "./international-technical-committee";

export const administration = composeAdministration({
  ic: internationalCommittee,
  isc: internationalScientificCommittee,
  itc: internationalTechnicalCommittee,
  hc: hostCommittee,
  htc: hostTechnicalCommittee,
});

import type { AdministrationGroup, Official } from "@/domain/edition";

/**
 * Canonical Administration section titles for every edition.
 * Full names with abbreviations — never short informal labels alone.
 */
export const ADMINISTRATION_TITLES = {
  internationalCommittee: "International Committee (IC)",
  internationalScientificCommittee: "International Scientific Committee (ISC)",
  internationalTechnicalCommittee: "International Technical Committee (ITC)",
  hostTechnicalCommittee: "Host Technical Committee (HTC)",
} as const;

export type AdministrationCommittees = {
  internationalCommittee: Official[];
  internationalScientificCommittee: Official[];
  internationalTechnicalCommittee: Official[];
  hostTechnicalCommittee: Official[];
};

/**
 * Build Administration groups in a fixed order shared by every edition.
 * Only member rosters change per year; empty committees are omitted.
 */
export function composeAdministration(
  committees: AdministrationCommittees,
): AdministrationGroup[] {
  return [
    {
      title: ADMINISTRATION_TITLES.internationalCommittee,
      members: committees.internationalCommittee,
    },
    {
      title: ADMINISTRATION_TITLES.internationalScientificCommittee,
      members: committees.internationalScientificCommittee,
    },
    {
      title: ADMINISTRATION_TITLES.internationalTechnicalCommittee,
      members: committees.internationalTechnicalCommittee,
    },
    {
      title: ADMINISTRATION_TITLES.hostTechnicalCommittee,
      members: committees.hostTechnicalCommittee,
    },
  ].filter((group) => group.members.length > 0);
}

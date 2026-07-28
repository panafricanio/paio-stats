import type { AdministrationGroup, Official } from "@/domain/edition";

/** Canonical Administration section titles — same for every edition (IOI-style). */
export const ADMINISTRATION_TITLES = {
  international: "International Committee",
  scientific: "International Scientific Committee",
  technical: "International Technical Committee",
} as const;

/**
 * Build the Administration tab groups in a fixed order shared by every edition.
 * Only data (members) varies per year; empty committees are omitted.
 */
export function composeAdministration(committees: {
  international: Official[];
  scientific: Official[];
  technical: Official[];
}): AdministrationGroup[] {
  return [
    { title: ADMINISTRATION_TITLES.international, members: committees.international },
    { title: ADMINISTRATION_TITLES.scientific, members: committees.scientific },
    { title: ADMINISTRATION_TITLES.technical, members: committees.technical },
  ].filter((group) => group.members.length > 0);
}

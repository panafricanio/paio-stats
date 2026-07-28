import type { AdministrationGroup, Official } from "@/domain/edition";

/**
 * Ordered catalog of Administration sections every edition may populate.
 * Add new committees here once — editions only supply member data.
 * Titles always use the full name with abbreviation.
 */
export const ADMINISTRATION_SECTION_CATALOG = [
  { id: "ic", title: "International Committee (IC)" },
  { id: "isc", title: "International Scientific Committee (ISC)" },
  { id: "itc", title: "International Technical Committee (ITC)" },
  { id: "hc", title: "Host Committee (HC)" },
  { id: "htc", title: "Host Technical Committee (HTC)" },
] as const;

export type AdministrationSectionId = (typeof ADMINISTRATION_SECTION_CATALOG)[number]["id"];

export const ADMINISTRATION_TITLES = Object.fromEntries(
  ADMINISTRATION_SECTION_CATALOG.map((section) => [section.id, section.title]),
) as Record<AdministrationSectionId, string>;

/**
 * Build Administration groups in catalog order.
 * Editions pass whatever committees they have; empty sections are omitted.
 */
export function composeAdministration(
  membersBySection: Partial<Record<AdministrationSectionId, Official[]>>,
): AdministrationGroup[] {
  return ADMINISTRATION_SECTION_CATALOG.map((section) => ({
    title: section.title,
    members: membersBySection[section.id] ?? [],
  })).filter((group) => group.members.length > 0);
}

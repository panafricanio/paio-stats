// The data-access seam. Pages and the application service depend on this
// interface, never on a concrete source. Swap the static implementation for an
// API/DB one later without touching a single page. Methods are async so that
// future remote implementations need no signature changes.
import type { Edition } from "@/domain/edition";
import type { Country } from "@/domain/country";

export interface StatsDataSource {
  getEditions(): Promise<Edition[]>;
  getCountries(): Promise<Country[]>;
}

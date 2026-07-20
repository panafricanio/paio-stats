// Static implementation of the data-access port: reads the raw data modules and
// maps them into domain entities. The one place that touches `@/data`.
import type { StatsDataSource } from "../ports";
import type { Edition } from "@/domain/edition";
import type { Country } from "@/domain/country";
import { editionConfigs } from "@/data/edition-configs";
import { countryRecords } from "@/data/countries";
import { mapEdition } from "./mappers";

export class StaticDataSource implements StatsDataSource {
  private editions: Edition[] = editionConfigs
    .map(mapEdition)
    .sort((a, b) => b.year - a.year);

  async getEditions(): Promise<Edition[]> {
    return this.editions;
  }

  async getCountries(): Promise<Country[]> {
    return countryRecords;
  }
}

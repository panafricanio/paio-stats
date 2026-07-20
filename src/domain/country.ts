// Country domain: the entity and its medal-table aggregate.

export interface Country {
  name: string;
  code: string; // URL slug, e.g. "egypt"
  flag: string;
  guest?: boolean;
}

export interface CountryAggregate {
  country: Country;
  participants: number;
  gold: number;
  silver: number;
  bronze: number;
  hm: number;
  totalMedals: number;
  bestRank: number;
}

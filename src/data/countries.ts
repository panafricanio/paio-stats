// Raw country reference data (the "database table" for now).
// `name` must match the country string used in the raw results.
import type { Country } from "@/domain/country";

export const countryRecords: Country[] = [
  { name: "Algeria", code: "algeria", flag: "🇩🇿" },
  { name: "Djibouti", code: "djibouti", flag: "🇩🇯" },
  { name: "Egypt", code: "egypt", flag: "🇪🇬" },
  { name: "Ghana", code: "ghana", flag: "🇬🇭" },
  { name: "Kenya", code: "kenya", flag: "🇰🇪" },
  { name: "Libya", code: "libya", flag: "🇱🇾" },
  { name: "Mali", code: "mali", flag: "🇲🇱" },
  { name: "Morocco", code: "morocco", flag: "🇲🇦" },
  { name: "Nigeria", code: "nigeria", flag: "🇳🇬" },
  { name: "Rwanda", code: "rwanda", flag: "🇷🇼" },
  { name: "South Africa", code: "south-africa", flag: "🇿🇦" },
  { name: "Tunisia", code: "tunisia", flag: "🇹🇳" },
  { name: "Zimbabwe", code: "zimbabwe", flag: "🇿🇼" },
  { name: "Pakistan (Guest)", code: "pakistan", flag: "🇵🇰", guest: true },
];

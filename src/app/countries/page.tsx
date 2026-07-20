import type { Metadata } from "next";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import CountriesTable from "@/features/countries/CountriesTable";

export const metadata: Metadata = {
  title: "Countries",
  description: "Country medal rankings for the Pan-African Informatics Olympiad.",
};

export default async function CountriesPage() {
  const aggregates = await statsService.getCountryAggregates();

  return (
    <div>
      <PageHeader
        title="Countries"
        subtitle="National teams ranked by medals — first by gold, then silver, then bronze, then best individual rank."
      />
      <div className="container py-10">
        <CountriesTable aggregates={aggregates} />
        <p className="mt-4 text-sm text-muted-foreground">
          Medal totals count gold, silver and bronze. Guest teams are excluded from country rankings.
        </p>
      </div>
    </div>
  );
}

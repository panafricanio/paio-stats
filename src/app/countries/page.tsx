import type { Metadata } from "next";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import CountriesTable from "@/features/countries/CountriesTable";

export const metadata: Metadata = {
  title: "Countries",
  description: "Country medal rankings for the Pan-African Informatics Olympiad.",
};

export default async function CountriesPage() {
  const rows = await statsService.listCountryRows();

  return (
    <div>
      <PageHeader
        title="Countries"
        subtitle="Ranked by gold, then silver, then bronze. Guest teams appear below official teams."
      />
      <div className="container py-10">
        <CountriesTable rows={rows} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import CountriesRankingView from "@/features/countries/CountriesRankingView";

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
        subtitle="Ranked by gold, then silver, then bronze. Official and guest teams are listed separately."
      />
      <div className="container py-10">
        <CountriesRankingView
          rows={rows}
          officialCaption="PAIO official country ranking by gold, then silver, then bronze."
          guestsCaption="PAIO guest country ranking by gold, then silver, then bronze."
        />
      </div>
    </div>
  );
}

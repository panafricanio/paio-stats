import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { statsService } from "@/services";
import CountriesTable from "@/features/countries/CountriesTable";

export async function generateStaticParams() {
  return (await statsService.getEditionSlugs()).map((year) => ({ year }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  const edition = await statsService.getEdition(year);
  return { title: edition ? `${edition.name} · Country metrics` : "Country metrics" };
}

export default async function EditionCountriesPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const edition = await statsService.getEdition(year);
  if (!edition) notFound();

  const rows = await statsService.listEditionCountryRows(year);

  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Country metrics for this edition have not been published yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {rows.length} national team{rows.length === 1 ? "" : "s"} at {edition.name}, ordered by gold,
        then silver, then bronze. Guest teams are listed below official teams.
      </p>
      <CountriesTable
        rows={rows}
        showHosted={false}
        caption={`${edition.name} country metrics by gold, then silver, then bronze.`}
      />
    </div>
  );
}

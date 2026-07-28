import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { statsService } from "@/services";
import CountriesRankingView from "@/features/countries/CountriesRankingView";

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
  return { title: edition ? `${edition.name} · Countries` : "Countries" };
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
  const officialCount = rows.filter((r) => !r.guest).length;
  const guestCount = rows.filter((r) => r.guest).length;

  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Country standings for this edition have not been published yet.
      </p>
    );
  }

  const teamLabel =
    guestCount > 0
      ? `${officialCount} official and ${guestCount} guest team${guestCount === 1 ? "" : "s"}`
      : `${rows.length} national team${rows.length === 1 ? "" : "s"}`;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {teamLabel} at {edition.name}, ordered by total marks
        {guestCount > 0 ? ". Official and guest teams are listed separately" : ""}.
      </p>
      <CountriesRankingView
        rows={rows}
        showHosted={false}
        showMarks
        officialCaption={`${edition.name} official country standings by total marks.`}
        guestsCaption={`${edition.name} guest country standings by total marks.`}
      />
    </div>
  );
}

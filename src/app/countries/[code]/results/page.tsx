import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { statsService } from "@/services";
import { getCountryByCode } from "@/data/countries";
import EditionScoreboard from "@/features/editions/EditionScoreboard";

export async function generateStaticParams() {
  const countries = await statsService.listCountries();
  return countries.map((c) => ({ code: c.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const country = getCountryByCode(code);
  return { title: country ? `${country.name} · Results` : "Results" };
}

export default async function CountryResultsPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const detail = await statsService.getCountryDetail(code);
  if (!detail) notFound();

  if (detail.results.length === 0) {
    return <p className="text-muted-foreground">No results recorded for {detail.country.name}.</p>;
  }

  return (
    <div className="space-y-10">
      {detail.results.map(({ edition, rows }) => (
        <section key={edition.slug}>
          <h2 className="mb-4 font-display text-2xl">{edition.name}</h2>
          <EditionScoreboard
            rows={rows}
            days={edition.days}
            showCountryFilter={false}
            tasks={edition.tasks.map((t) => ({
              slug: t.slug,
              short: t.short,
              name: t.name,
              day: t.day,
            }))}
          />
        </section>
      ))}
    </div>
  );
}

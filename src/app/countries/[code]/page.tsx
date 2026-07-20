import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import StatGrid from "@/components/ui/StatGrid";
import CountryContestantsTable from "@/features/countries/CountryContestantsTable";

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
  const detail = await statsService.getCountryDetail(code);
  return { title: detail ? detail.country.name : "Country" };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const detail = await statsService.getCountryDetail(code);
  if (!detail) notFound();

  const { country, contestants } = detail;
  const count = (m: string) => contestants.filter((c) => c.medal === m).length;
  const bestRank = contestants.length ? Math.min(...contestants.map((c) => c.rank)) : "—";

  return (
    <div>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl">{country.flag}</span>
            {country.name}
          </span>
        }
        subtitle="Participation in the latest edition."
      >
        <Link
          href="/countries"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All countries
        </Link>
      </PageHeader>

      <div className="container space-y-10 py-10">
        <StatGrid
          cols={5}
          stats={[
            { value: contestants.length, label: "Contestants" },
            { value: count("GOLD"), label: "Gold", accent: "text-gold" },
            { value: count("SILVER"), label: "Silver", accent: "text-silver" },
            { value: count("BRONZE"), label: "Bronze", accent: "text-bronze" },
            { value: bestRank, label: "Best rank" },
          ]}
        />

        <section>
          <h2 className="mb-4 font-display text-2xl">Contestants</h2>
          <CountryContestantsTable contestants={contestants} />
        </section>
      </div>
    </div>
  );
}

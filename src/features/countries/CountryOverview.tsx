import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StatGrid from "@/components/ui/StatGrid";
import type { CountryDetail } from "@/services";

export default function CountryOverview({ detail }: { detail: CountryDetail }) {
  const { country, firstYear, editionsParticipated, contestantsCount, performance, bestRank, hosted } =
    detail;

  if (editionsParticipated === 0) {
    return (
      <p className="text-muted-foreground">
        {country.name} has not taken part in any recorded edition yet.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 font-display text-2xl">Participation</h2>
        <StatGrid
          stats={[
            { value: firstYear ?? "—", label: "First edition" },
            { value: editionsParticipated, label: "Editions" },
            { value: contestantsCount, label: "Contestants" },
            { value: bestRank ? `#${bestRank}` : "—", label: "Best rank" },
          ]}
        />
        {hosted.length > 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            Hosted the PAIO in {hosted.join(", ")}.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl">Performance</h2>
        <StatGrid
          stats={[
            { value: performance.gold, label: "Gold", accent: "text-gold-foreground" },
            { value: performance.silver, label: "Silver", accent: "text-silver-foreground" },
            { value: performance.bronze, label: "Bronze", accent: "text-bronze-foreground" },
            { value: performance.hm, label: "Honorable mentions", accent: "text-hm-foreground" },
          ]}
        />
      </section>

      <Link
        href={`/countries/${country.code}/results`}
        className="inline-flex min-h-11 items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
      >
        View results <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StatGrid from "@/components/ui/StatGrid";
import MedalBadge from "@/components/ui/MedalBadge";
import type { CountryDetail } from "@/services";
import type { MedalType } from "@/domain/medal";

const MEDAL_SORT: Record<MedalType, number> = {
  GOLD: 0,
  SILVER: 1,
  BRONZE: 2,
  HM: 3,
};

export default function CountryOverview({ detail }: { detail: CountryDetail }) {
  const { country, firstYear, editionsParticipated, contestantsCount, performance, hosted, results } =
    detail;

  if (editionsParticipated === 0 && hosted.length === 0) {
    return (
      <p className="text-muted-foreground">
        {country.name} has not taken part in any recorded edition yet.
      </p>
    );
  }

  const medalists = results
    .flatMap(({ edition, rows }) =>
      rows
        .filter((r) => r.medal)
        .map((r) => ({
          slug: r.slug,
          fullName: r.fullName,
          medal: r.medal!,
          rank: r.rank,
          editionName: edition.name,
          editionSlug: edition.slug,
        })),
    )
    .sort(
      (a, b) =>
        MEDAL_SORT[a.medal] - MEDAL_SORT[b.medal] || a.rank - b.rank || a.fullName.localeCompare(b.fullName),
    );

  const bestRank = results
    .flatMap(({ rows }) => rows.filter((r) => r.status !== "unofficial").map((r) => r.rank))
    .reduce<number | null>((best, rank) => (best === null || rank < best ? rank : best), null);

  const totalMedals = performance.gold + performance.silver + performance.bronze;

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 font-display text-2xl">Participation</h2>
        <StatGrid
          stats={[
            { value: firstYear ?? "—", label: "First edition" },
            { value: editionsParticipated, label: "Editions" },
            { value: contestantsCount, label: "Contestants" },
            ...(bestRank !== null ? [{ value: bestRank, label: "Best rank" }] : []),
          ]}
          cols={bestRank !== null ? 4 : 3}
        />
        {hosted.length > 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            Hosted the PAIO in {hosted.join(", ")}.
          </p>
        )}
      </section>

      {editionsParticipated > 0 && (
        <section className="space-y-6">
          <h2 className="mb-4 font-display text-2xl">Performance</h2>
          <StatGrid
            stats={[
              // Use accent tokens (text-gold etc.), not *-foreground — those are for
              // text sitting on bright medal surfaces and vanish on dark backgrounds.
              { value: performance.gold, label: "Gold", accent: "text-gold" },
              { value: performance.silver, label: "Silver", accent: "text-silver" },
              { value: performance.bronze, label: "Bronze", accent: "text-bronze" },
              { value: performance.hm, label: "Honorable mentions", accent: "text-hm" },
            ]}
          />

          {medalists.length > 0 ? (
            <div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Medalists
              </h3>
              <ul className="divide-y divide-border rounded-lg border border-border">
                {medalists.map((m) => (
                  <li
                    key={`${m.editionSlug}-${m.slug}-${m.rank}`}
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <Link
                        href={`/contestants/${m.slug}`}
                        className="font-medium hover:underline"
                      >
                        {m.fullName}
                      </Link>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        <Link href={`/olympiads/${m.editionSlug}`} className="hover:underline">
                          {m.editionName}
                        </Link>
                        <span className="mx-1.5 text-border">·</span>
                        <span className="tnum">Rank #{m.rank}</span>
                      </p>
                    </div>
                    <MedalBadge medal={m.medal} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            totalMedals === 0 &&
            performance.hm === 0 && (
              <p className="text-sm text-muted-foreground">
                No medals or honourable mentions recorded for {country.name} yet.
              </p>
            )
          )}
        </section>
      )}

      {editionsParticipated > 0 && (
        <Link
          href={`/countries/${country.code}/results`}
          className="inline-flex min-h-11 items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
        >
          View results <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

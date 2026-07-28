import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StatGrid from "@/components/ui/StatGrid";
import MedalBadge from "@/components/ui/MedalBadge";
import MedalTallyStats, { tallyFromMedals } from "@/components/ui/MedalTallyStats";
import type { CountryDetail } from "@/services";
import type { MedalType } from "@/domain/medal";

const MEDAL_SORT: Record<MedalType, number> = {
  GOLD: 0,
  SILVER: 1,
  BRONZE: 2,
  HM: 3,
};

export default function CountryOverview({ detail }: { detail: CountryDetail }) {
  const { country, firstYear, editionsParticipated, contestantsCount, hosted, results } = detail;

  if (editionsParticipated === 0 && hosted.length === 0) {
    return (
      <p className="text-muted-foreground">
        {country.name} has not taken part in any recorded edition yet.
      </p>
    );
  }

  const competedYears = new Set(results.map(({ edition }) => edition.year));
  const hostedWithoutResults = hosted.filter((year) => !competedYears.has(year));

  // Single source of truth: medalists drive the Performance totals (never a separate counter).
  const medalists = results
    .flatMap(({ edition, rows }) => {
      const fieldSize = edition.contestants.filter((c) => c.status !== "unofficial").length;
      return rows
        .filter((r) => r.medal && r.status !== "unofficial")
        .map((r) => ({
          slug: r.slug,
          fullName: r.fullName,
          medal: r.medal!,
          rank: r.rank,
          fieldSize,
          editionName: edition.name,
          editionSlug: edition.slug,
        }));
    })
    .sort(
      (a, b) =>
        MEDAL_SORT[a.medal] - MEDAL_SORT[b.medal] ||
        a.rank - b.rank ||
        a.fullName.localeCompare(b.fullName),
    );

  const performance = tallyFromMedals(medalists.map((m) => m.medal));
  const hasAwards =
    performance.gold + performance.silver + performance.bronze + performance.hm > 0;

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-1 font-display text-2xl">Participation</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Based on published contest results
          {hosted.length > 0 ? "; hosting is listed separately below" : ""}.
        </p>
        {editionsParticipated > 0 ? (
          <StatGrid
            cols={3}
            stats={[
              { value: firstYear ?? "—", label: "First participation" },
              { value: editionsParticipated, label: "Years participated" },
              { value: contestantsCount, label: "Contestants participated" },
            ]}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            No contest results are published for {country.name} yet.
          </p>
        )}
        {hosted.length > 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            Host country for {hosted.join(", ")}
            {hostedWithoutResults.length > 0 && (
              <>
                {" "}
                ({hostedWithoutResults.join(", ")}{" "}
                {hostedWithoutResults.length === 1 ? "has" : "have"} no published results yet)
              </>
            )}
            .
          </p>
        )}
      </section>

      {editionsParticipated > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="mb-1 font-display text-2xl">Performance</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Official medals only. Place is the contestant&apos;s rank in the full edition field, not
              within the national team.
            </p>
          </div>

          <MedalTallyStats tally={performance} />

          {hasAwards ? (
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
                        <span className="tnum">
                          #{m.rank}
                          <span className="text-muted-foreground/80"> / {m.fieldSize}</span>
                        </span>
                      </p>
                    </div>
                    <MedalBadge medal={m.medal} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No medals or honourable mentions recorded for {country.name} yet.
            </p>
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

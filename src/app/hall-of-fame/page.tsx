import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import HallOfFameTable from "@/features/hall-of-fame/HallOfFameTable";
import { statsService } from "@/services";

export const metadata: Metadata = {
  title: "Hall of Fame",
  description: "All-time contestant medal rankings for the Pan-African Informatics Olympiad.",
};

export default async function HallOfFamePage() {
  const [rows, editions] = await Promise.all([
    statsService.listHallOfFameRows(),
    statsService.listEditions(),
  ]);
  const editionsWithResults = editions.filter((e) => e.contestants.length > 0);
  const latestYear = editionsWithResults[0]?.year;

  return (
    <div>
      <PageHeader
        title="Hall of Fame"
        subtitle={
          <>
            Ordered by gold, then silver, then bronze. Tied medal records share the same rank.
            {latestYear && (
              <span className="mt-2 block text-sm">Through PAIO {latestYear}.</span>
            )}
          </>
        }
      />
      <div className="container py-10">
        <div className="mb-4 flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {rows.length} contestants across {editionsWithResults.length} edition
            {editionsWithResults.length === 1 ? "" : "s"}
          </p>
          <p>Guest medals count; unofficial awards and Honourable Mentions do not.</p>
        </div>
        {latestYear ? (
          <HallOfFameTable rows={rows} latestYear={latestYear} />
        ) : (
          <p className="rounded-lg border border-border px-4 py-8 text-center text-muted-foreground">
            Hall of Fame results will appear when the first edition is published.
          </p>
        )}
      </div>
    </div>
  );
}

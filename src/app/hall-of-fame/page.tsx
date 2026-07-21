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
  const latestYear = editions[0]?.year;

  return (
    <div>
      <PageHeader
        title="Hall of Fame"
        subtitle={
          <>
            All-time PAIO contestant rankings. Gold medals take priority, followed by silver and
            bronze; tied medal records share the same rank.
            {latestYear && (
              <span className="mt-2 block text-sm">Results are current through PAIO {latestYear}.</span>
            )}
          </>
        }
      />
      <div className="container py-10">
        <div className="mb-4 flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {rows.length} contestants across {editions.length} edition
            {editions.length === 1 ? "" : "s"}
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

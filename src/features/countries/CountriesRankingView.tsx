import CountriesTable from "@/features/countries/CountriesTable";
import type { CountryRow } from "@/services";

/**
 * Country standings: Official and Guests in separate tables (same rule as Results).
 * Each table keeps its own ranking; empty Guests is omitted.
 */
export default function CountriesRankingView({
  rows,
  showHosted = true,
  showMarks = false,
  officialCaption,
  guestsCaption,
}: {
  rows: CountryRow[];
  showHosted?: boolean;
  showMarks?: boolean;
  officialCaption: string;
  guestsCaption: string;
}) {
  const official = rows.filter((r) => !r.guest);
  const guests = rows.filter((r) => r.guest);
  const split = guests.length > 0;

  if (!split) {
    return (
      <CountriesTable
        rows={official}
        showHosted={showHosted}
        showMarks={showMarks}
        showGuestBadge={false}
        caption={officialCaption}
      />
    );
  }

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="font-display text-2xl tracking-tight">
          Official <span className="tnum text-muted-foreground">({official.length})</span>
        </h2>
        <CountriesTable
          rows={official}
          showHosted={showHosted}
          showMarks={showMarks}
          showGuestBadge={false}
          caption={officialCaption}
        />
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl tracking-tight">
          Guests <span className="tnum text-muted-foreground">({guests.length})</span>
        </h2>
        <CountriesTable
          rows={guests}
          showHosted={showHosted}
          showMarks={showMarks}
          showGuestBadge={false}
          caption={guestsCaption}
        />
      </section>
    </div>
  );
}

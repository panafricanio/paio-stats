import Link from "next/link";
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import MedalBadge from "@/components/ui/MedalBadge";
import { Badge } from "@/components/ui/badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ContestantScoreTable from "@/features/contestants/ContestantScoreTable";
import type { ContestantProfile, ContestantParticipation } from "@/services";
import type { MedalType } from "@/domain/medal";

const chipClass: Record<MedalType, string> = {
  GOLD: "border-gold/40 text-gold",
  SILVER: "border-silver/40 text-silver",
  BRONZE: "border-bronze/40 text-bronze",
  HM: "border-hm/40 text-hm",
};

export default function ContestantProfileView({ profile }: { profile: ContestantProfile }) {
  const { fullName, country, status, medalTally, participations } = profile;

  const chips = (
    [
      ["GOLD", "Gold", medalTally.gold],
      ["SILVER", "Silver", medalTally.silver],
      ["BRONZE", "Bronze", medalTally.bronze],
      ["HM", "HM", medalTally.hm],
    ] as const
  ).filter(([, , n]) => n > 0);

  const columns: Column<ContestantParticipation>[] = [
    {
      id: "year",
      header: "Edition",
      cellClassName: "font-medium",
      cell: (p) => (
        <Link href={`/olympiads/${p.edition.slug}/results`} className="hover:underline">
          {p.edition.name}
        </Link>
      ),
    },
    {
      id: "country",
      header: "Country",
      cellClassName: "text-muted-foreground",
      cell: (p) => (
        <span>
          {p.countryFlag && <span className="mr-1">{p.countryFlag}</span>}
          {p.contestant.countryName || "—"}
        </span>
      ),
    },
    { id: "total", header: "Total", align: "center", numeric: true, cellClassName: "font-semibold", cell: (p) => p.contestant.total },
    {
      id: "rank",
      header: "Rank",
      align: "center",
      numeric: true,
      cell: (p) => (
        <span>
          #{p.contestant.rank}
          <span className="text-muted-foreground"> / {p.fieldSize}</span>
        </span>
      ),
    },
    {
      id: "award",
      header: "Award",
      align: "center",
      cell: (p) =>
        p.contestant.medal ? (
          <MedalBadge medal={p.contestant.medal} />
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
  ];

  return (
    <div>
      {/* Photo-forward header */}
      <div className="border-b border-border bg-secondary/40">
        <div className="container flex flex-col items-center gap-6 py-12 text-center sm:flex-row sm:text-left">
          <Avatar
            name={fullName}
            className="h-28 w-28 text-3xl ring-1 ring-border sm:h-32 sm:w-32"
          />
          <div>
            <h1 className="font-display">{fullName}</h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-muted-foreground sm:justify-start">
              {country && (
                <Link href={`/countries/${country.code}`} className="hover:text-foreground">
                  <span className="mr-1">{country.flag}</span>
                  {country.name}
                </Link>
              )}
              {status === "guest" && (
                <Badge variant="outline" className="border-chart-5/30 text-chart-5">
                  Guest
                </Badge>
              )}
              {status === "unofficial" && <Badge variant="secondary">Unofficial</Badge>}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {chips.length > 0 ? (
                chips.map(([type, label, n]) => (
                  <span
                    key={type}
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                      chipClass[type],
                    )}
                  >
                    {n} {label}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No medals</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container space-y-10 py-10">
        {/* Participations */}
        <section>
          <h2 className="mb-4 font-display text-2xl">
            {participations.length > 1 ? "Participations" : "Participation"}
          </h2>
          <DataTable
            columns={columns}
            rows={participations}
            getRowKey={(p) => p.edition.slug}
          />
        </section>

        {/* Per-edition task breakdown */}
        {participations.map((p) => (
          <section key={p.edition.slug}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl">{p.edition.name} — task scores</h2>
              {p.contestant.medal && <MedalBadge medal={p.contestant.medal} />}
            </div>
            <ContestantScoreTable edition={p.edition} contestant={p.contestant} />
          </section>
        ))}
      </div>
    </div>
  );
}

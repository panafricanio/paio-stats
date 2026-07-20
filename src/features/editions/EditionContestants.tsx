import Link from "next/link";
import DataTable, { type Column } from "@/components/ui/DataTable";
import MedalBadge from "@/components/ui/MedalBadge";
import { Badge } from "@/components/ui/badge";
import type { ScoreRow } from "@/services";

export default function EditionContestants({ rows }: { rows: ScoreRow[] }) {
  const sorted = [...rows].sort((a, b) => a.fullName.localeCompare(b.fullName));

  const columns: Column<ScoreRow>[] = [
    {
      id: "name",
      header: "Contestant",
      cellClassName: "whitespace-nowrap",
      cell: (r) => (
        <span className="flex items-center gap-2">
          <Link href={`/contestants/${r.slug}`} className="font-medium hover:underline">
            {r.fullName}
          </Link>
          {r.status === "guest" && (
            <Badge variant="outline" className="border-chart-5/30 py-0 text-[10px] text-chart-5">
              Guest
            </Badge>
          )}
          {r.status === "unofficial" && (
            <Badge variant="secondary" className="py-0 text-[10px] text-muted-foreground">
              Unofficial
            </Badge>
          )}
        </span>
      ),
    },
    {
      id: "country",
      header: "Country",
      cellClassName: "whitespace-nowrap text-muted-foreground",
      cell: (r) =>
        r.countryName ? (
          <span>
            <span className="mr-1">{r.countryFlag}</span>
            {r.countryCode ? (
              <Link href={`/countries/${r.countryCode}`} className="hover:underline">
                {r.countryName.replace(" (Guest)", "")}
              </Link>
            ) : (
              r.countryName.replace(" (Guest)", "")
            )}
          </span>
        ) : (
          <span className="text-muted-foreground/50">—</span>
        ),
    },
    { id: "rank", header: "Rank", align: "center", numeric: true, cell: (r) => r.rank },
    { id: "total", header: "Total", align: "center", numeric: true, cellClassName: "font-semibold", cell: (r) => r.total },
    {
      id: "medal",
      header: "Medal",
      align: "center",
      cell: (r) => (r.medal ? <MedalBadge medal={r.medal} /> : <span className="text-muted-foreground">—</span>),
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {sorted.length} contestants, listed alphabetically.
      </p>
      <DataTable columns={columns} rows={sorted} getRowKey={(r) => `${r.slug}-${r.rank}`} />
    </div>
  );
}

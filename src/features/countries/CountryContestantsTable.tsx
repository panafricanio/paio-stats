import Link from "next/link";
import DataTable, { type Column } from "@/components/ui/DataTable";
import MedalBadge from "@/components/ui/MedalBadge";
import type { Contestant } from "@/domain/contestant";
import { formatScore } from "@/lib/utils";

export default function CountryContestantsTable({
  contestants,
  fieldSize,
}: {
  contestants: Contestant[];
  /** Ranked field size for the edition (for “#rank / N”). */
  fieldSize: number;
}) {
  const columns: Column<Contestant>[] = [
    {
      id: "rank",
      header: "Place",
      numeric: true,
      cellClassName: "font-medium",
      cell: (c) => (
        <span className="tnum">
          #{c.rank}
          <span className="font-normal text-muted-foreground"> / {fieldSize}</span>
        </span>
      ),
    },
    {
      id: "name",
      header: "Contestant",
      cell: (c) => (
        <Link href={`/contestants/${c.slug}`} className="font-medium hover:underline">
          {c.fullName}
        </Link>
      ),
    },
    {
      id: "total",
      header: "Total",
      align: "center",
      numeric: true,
      cellClassName: "font-bold",
      cell: (c) => formatScore(c.total),
    },
    {
      id: "medal",
      header: "Medal",
      align: "center",
      cell: (c) =>
        c.medal ? <MedalBadge medal={c.medal} /> : <span className="text-muted-foreground">—</span>,
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={contestants}
      getRowKey={(c) => `${c.slug}-${c.rank}`}
      caption="Contestants representing this country. Place is olympiad rank in the full field."
    />
  );
}

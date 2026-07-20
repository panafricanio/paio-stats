import Link from "next/link";
import DataTable, { type Column } from "@/components/ui/DataTable";
import MedalBadge from "@/components/ui/MedalBadge";
import type { Contestant } from "@/domain/contestant";

export default function CountryContestantsTable({ contestants }: { contestants: Contestant[] }) {
  const columns: Column<Contestant>[] = [
    { id: "rank", header: "Rank", numeric: true, cellClassName: "font-medium", cell: (c) => c.rank },
    {
      id: "name",
      header: "Contestant",
      cell: (c) => (
        <Link href={`/contestants/${c.slug}`} className="font-medium hover:underline">
          {c.fullName}
        </Link>
      ),
    },
    { id: "day1", header: "Day 1", align: "center", numeric: true, cell: (c) => c.day1Total },
    { id: "day2", header: "Day 2", align: "center", numeric: true, cell: (c) => c.day2Total },
    { id: "total", header: "Total", align: "center", numeric: true, cellClassName: "font-bold", cell: (c) => c.total },
    {
      id: "medal",
      header: "Medal",
      align: "center",
      cell: (c) => (c.medal ? <MedalBadge medal={c.medal} /> : <span className="text-muted-foreground">—</span>),
    },
  ];

  return (
    <DataTable columns={columns} rows={contestants} getRowKey={(c) => `${c.slug}-${c.rank}`} />
  );
}

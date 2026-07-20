import Link from "next/link";
import DataTable, { type Column } from "@/components/ui/DataTable";
import type { CountryAggregate } from "@/domain/country";

const dash = (n: number) => (n ? n : "—");

export default function CountriesTable({ aggregates }: { aggregates: CountryAggregate[] }) {
  const columns: Column<CountryAggregate>[] = [
    { id: "pos", header: "#", numeric: true, cellClassName: "text-muted-foreground", cell: (_r, i) => i + 1 },
    {
      id: "country",
      header: "Country",
      cell: (a) => (
        <Link
          href={`/countries/${a.country.code}`}
          className="inline-flex items-center gap-2 font-medium hover:underline"
        >
          <span className="text-lg">{a.country.flag}</span>
          {a.country.name}
        </Link>
      ),
    },
    { id: "participants", header: "Contestants", align: "center", numeric: true, cell: (a) => a.participants },
    { id: "gold", header: "Gold", align: "center", numeric: true, headerClassName: "text-gold", cellClassName: "font-semibold", cell: (a) => dash(a.gold) },
    { id: "silver", header: "Silver", align: "center", numeric: true, headerClassName: "text-silver", cellClassName: "font-semibold", cell: (a) => dash(a.silver) },
    { id: "bronze", header: "Bronze", align: "center", numeric: true, headerClassName: "text-bronze", cellClassName: "font-semibold", cell: (a) => dash(a.bronze) },
    { id: "hm", header: "HM", align: "center", numeric: true, cellClassName: "text-muted-foreground", cell: (a) => dash(a.hm) },
    { id: "medals", header: "Medals", align: "center", numeric: true, cellClassName: "font-bold", cell: (a) => dash(a.totalMedals) },
    { id: "best", header: "Best rank", align: "center", numeric: true, cellClassName: "text-muted-foreground", cell: (a) => a.bestRank },
  ];

  return (
    <DataTable
      columns={columns}
      rows={aggregates}
      getRowKey={(a) => a.country.code}
      emptyMessage="No countries yet."
    />
  );
}

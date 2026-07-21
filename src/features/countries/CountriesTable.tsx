"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DataTable, { type Column } from "@/components/ui/DataTable";
import SortableTableButton from "@/components/ui/SortableTableButton";
import { Badge } from "@/components/ui/badge";
import type { CountryRow } from "@/services";

type SortKey = "country" | "participants" | "gold" | "silver" | "bronze" | "hm" | "total" | "best";
type SortDir = "asc" | "desc";

const dash = (n: number) => (n ? n : "—");

function valueOf(r: CountryRow, key: SortKey): number {
  switch (key) {
    case "participants":
      return r.participants;
    case "gold":
      return r.gold;
    case "silver":
      return r.silver;
    case "bronze":
      return r.bronze;
    case "hm":
      return r.hm;
    case "total":
      return r.totalMedals;
    case "best":
      return r.bestRank;
    default:
      return 0;
  }
}

export default function CountriesTable({ rows }: { rows: CountryRow[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir } | null>(null);

  const sorted = useMemo(() => {
    if (!sort) return rows; // default: service ranking (guests last)
    const factor = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      if (sort.key === "country") return a.country.name.localeCompare(b.country.name) * factor;
      return (valueOf(a, sort.key) - valueOf(b, sort.key)) * factor || a.country.name.localeCompare(b.country.name);
    });
  }, [rows, sort]);

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev?.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "country" || key === "best" ? "asc" : "desc" },
    );
  }

  const ariaSort = (key: SortKey): "none" | "ascending" | "descending" =>
    sort?.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none";

  const sh = (label: string, key: SortKey, align: "left" | "center" = "left") => (
    <SortableTableButton
      label={label}
      active={sort?.key === key}
      dir={sort?.dir ?? "asc"}
      align={align}
      onClick={() => toggleSort(key)}
    />
  );

  const columns: Column<CountryRow>[] = [
    {
      id: "country",
      header: sh("Country", "country"),
      sortDirection: ariaSort("country"),
      cell: (r) => (
        <span className="flex items-center gap-2">
          <Link
            href={`/countries/${r.country.code}`}
            className="inline-flex items-center gap-2 font-medium hover:underline"
          >
            <span className="text-lg">{r.country.flag}</span>
            {r.country.name.replace(" (Guest)", "")}
          </Link>
          {r.guest && (
            <Badge variant="outline" className="border-chart-5/30 py-0 text-[10px] text-chart-5">
              Guest
            </Badge>
          )}
        </span>
      ),
    },
    {
      id: "hosted",
      header: "Hosted",
      cellClassName: "text-muted-foreground",
      cell: (r) => (r.hosted.length ? r.hosted.join(", ") : "—"),
    },
    { id: "participants", header: sh("Contestants", "participants", "center"), sortDirection: ariaSort("participants"), align: "center", numeric: true, cell: (r) => r.participants },
    { id: "gold", header: sh("Gold", "gold", "center"), sortDirection: ariaSort("gold"), align: "center", numeric: true, cellClassName: "font-semibold", cell: (r) => dash(r.gold) },
    { id: "silver", header: sh("Silver", "silver", "center"), sortDirection: ariaSort("silver"), align: "center", numeric: true, cellClassName: "font-semibold", cell: (r) => dash(r.silver) },
    { id: "bronze", header: sh("Bronze", "bronze", "center"), sortDirection: ariaSort("bronze"), align: "center", numeric: true, cellClassName: "font-semibold", cell: (r) => dash(r.bronze) },
    { id: "hm", header: sh("HM", "hm", "center"), sortDirection: ariaSort("hm"), align: "center", numeric: true, cellClassName: "text-muted-foreground", cell: (r) => dash(r.hm) },
    { id: "total", header: sh("Medals", "total", "center"), sortDirection: ariaSort("total"), align: "center", numeric: true, cellClassName: "font-bold", cell: (r) => dash(r.totalMedals) },
    { id: "best", header: sh("Best rank", "best", "center"), sortDirection: ariaSort("best"), align: "center", numeric: true, cellClassName: "text-muted-foreground", cell: (r) => r.bestRank },
  ];

  return (
    <DataTable
      columns={columns}
      rows={sorted}
      getRowKey={(r) => r.country.code}
      minWidth="820px"
      caption="PAIO country ranking by official medals and best individual rank."
    />
  );
}

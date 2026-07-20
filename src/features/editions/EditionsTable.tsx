"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { EditionRow } from "@/services";

type SortKey = "year" | "contestants" | "countries";
type SortDir = "asc" | "desc";

export default function EditionsTable({ rows }: { rows: EditionRow[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "year",
    dir: "desc",
  });

  const sorted = useMemo(() => {
    const factor = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => (a[sort.key] - b[sort.key]) * factor);
  }, [rows, sort]);

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" },
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table minWidth="720px">
        <TableHeader>
          <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
            <TableHead className="w-16 text-center text-primary-foreground">No.</TableHead>
            <SortableHead label="Year" active={sort.key === "year"} dir={sort.dir} onClick={() => toggleSort("year")} />
            <TableHead className="text-primary-foreground">Dates</TableHead>
            <TableHead className="text-primary-foreground">Host</TableHead>
            <TableHead className="text-primary-foreground">City</TableHead>
            <SortableHead
              label="Contestants"
              align="center"
              active={sort.key === "contestants"}
              dir={sort.dir}
              onClick={() => toggleSort("contestants")}
            />
            <SortableHead
              label="Countries"
              align="center"
              active={sort.key === "countries"}
              dir={sort.dir}
              onClick={() => toggleSort("countries")}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((e) => (
            <TableRow key={e.slug}>
              <TableCell className="text-center tnum text-muted-foreground">
                <Link href={`/olympiads/${e.slug}`} className="hover:underline">
                  {e.number}
                </Link>
              </TableCell>
              <TableCell className="tnum font-semibold">
                <Link href={`/olympiads/${e.slug}`} className="hover:underline">
                  {e.year}
                </Link>
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">{e.dates}</TableCell>
              <TableCell className="whitespace-nowrap">
                {e.hostFlag && <span className="mr-1.5">{e.hostFlag}</span>}
                {e.hostCode ? (
                  <Link href={`/countries/${e.hostCode}`} className="hover:underline">
                    {e.host}
                  </Link>
                ) : (
                  e.host
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">{e.city}</TableCell>
              <TableCell className="text-center tnum">{e.contestants}</TableCell>
              <TableCell className="text-center tnum">{e.countries}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SortableHead({
  label,
  active,
  dir,
  onClick,
  align = "left",
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  align?: "left" | "center";
}) {
  const Icon = !active ? ChevronsUpDown : dir === "asc" ? ChevronUp : ChevronDown;
  return (
    <TableHead className={cn("text-primary-foreground", align === "center" && "text-center")}>
      <button
        type="button"
        onClick={onClick}
        aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
        className={cn(
          "inline-flex items-center gap-1 font-semibold transition-opacity hover:opacity-80",
          align === "center" && "mx-auto",
        )}
      >
        {label}
        <Icon className={cn("h-3.5 w-3.5", !active && "opacity-50")} />
      </button>
    </TableHead>
  );
}

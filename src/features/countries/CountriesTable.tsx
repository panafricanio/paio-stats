"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SortableTableButton from "@/components/ui/SortableTableButton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { CountryRow } from "@/services";

type SortKey = "country" | "participants" | "gold" | "silver" | "bronze" | "hm" | "total";
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
        : { key, dir: key === "country" ? "asc" : "desc" },
    );
  }

  const ariaSort = (key: SortKey): "none" | "ascending" | "descending" =>
    sort?.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none";

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table minWidth="640px">
        <TableCaption className="sr-only">
          PAIO country ranking by gold, then silver, then bronze.
        </TableCaption>
        <TableHeader>
          {/* Explicit th backgrounds: tr bg is unreliable with rowspan. */}
          <TableRow className="border-border bg-primary text-primary-foreground hover:bg-primary">
            <TableHead
              rowSpan={2}
              scope="col"
              aria-sort={ariaSort("country")}
              className="bg-primary py-0 text-primary-foreground"
            >
              <SortableTableButton
                label="Country"
                active={sort?.key === "country"}
                dir={sort?.dir ?? "asc"}
                onClick={() => toggleSort("country")}
              />
            </TableHead>
            <TableHead
              rowSpan={2}
              scope="col"
              className="bg-primary text-primary-foreground"
            >
              Hosted
            </TableHead>
            <TableHead
              rowSpan={2}
              scope="col"
              aria-sort={ariaSort("participants")}
              className="bg-primary py-0 text-center text-primary-foreground"
            >
              <SortableTableButton
                label="Contestants"
                active={sort?.key === "participants"}
                dir={sort?.dir ?? "asc"}
                align="center"
                onClick={() => toggleSort("participants")}
              />
            </TableHead>
            <TableHead
              colSpan={5}
              scope="colgroup"
              className="border-b border-primary-foreground/20 bg-primary text-center text-primary-foreground"
            >
              Medals
            </TableHead>
          </TableRow>
          <TableRow className="border-border bg-primary text-primary-foreground hover:bg-primary">
            <MedalSortHead
              label="Gold"
              short="G"
              markerClassName="bg-gold"
              active={sort?.key === "gold"}
              dir={sort?.dir ?? "asc"}
              ariaSort={ariaSort("gold")}
              onClick={() => toggleSort("gold")}
            />
            <MedalSortHead
              label="Silver"
              short="S"
              markerClassName="bg-silver"
              active={sort?.key === "silver"}
              dir={sort?.dir ?? "asc"}
              ariaSort={ariaSort("silver")}
              onClick={() => toggleSort("silver")}
            />
            <MedalSortHead
              label="Bronze"
              short="B"
              markerClassName="bg-bronze"
              active={sort?.key === "bronze"}
              dir={sort?.dir ?? "asc"}
              ariaSort={ariaSort("bronze")}
              onClick={() => toggleSort("bronze")}
            />
            <MedalSortHead
              label="Honourable mention"
              short="HM"
              markerClassName="bg-hm"
              active={sort?.key === "hm"}
              dir={sort?.dir ?? "asc"}
              ariaSort={ariaSort("hm")}
              onClick={() => toggleSort("hm")}
            />
            <TableHead
              scope="col"
              aria-sort={ariaSort("total")}
              className="w-20 bg-primary py-0 text-center text-primary-foreground"
            >
              <SortableTableButton
                label="Total"
                active={sort?.key === "total"}
                dir={sort?.dir ?? "asc"}
                align="center"
                onClick={() => toggleSort("total")}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((r) => (
            <TableRow key={r.country.code}>
              <TableCell>
                <span className="flex items-center gap-2">
                  <Link
                    href={`/countries/${r.country.code}`}
                    className="inline-flex items-center gap-2 font-medium hover:underline"
                  >
                    <span className="text-base leading-none">{r.country.flag}</span>
                    {r.country.name.replace(" (Guest)", "")}
                  </Link>
                  {r.guest && (
                    <Badge variant="outline" className="border-chart-5/30 py-0 text-[10px] text-chart-5">
                      Guest
                    </Badge>
                  )}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {r.hosted.length ? r.hosted.join(", ") : "—"}
              </TableCell>
              <TableCell className="text-center tnum">{r.participants}</TableCell>
              <MedalCell
                count={r.gold}
                surfaceClassName="bg-gold-surface"
                foregroundClassName="text-gold-foreground"
              />
              <MedalCell
                count={r.silver}
                surfaceClassName="bg-silver-surface"
                foregroundClassName="text-silver-foreground"
              />
              <MedalCell
                count={r.bronze}
                surfaceClassName="bg-bronze-surface"
                foregroundClassName="text-bronze-foreground"
              />
              <MedalCell
                count={r.hm}
                surfaceClassName="bg-hm-surface"
                foregroundClassName="text-hm-foreground"
              />
              <TableCell className="text-center font-bold tnum">{dash(r.totalMedals)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/** Hall-of-Fame medal subheader + sort control (primary bar, accent markers — not surface fills). */
function MedalSortHead({
  label,
  short,
  markerClassName,
  active,
  dir,
  ariaSort,
  onClick,
}: {
  label: string;
  short: string;
  markerClassName: string;
  active: boolean;
  dir: SortDir;
  ariaSort: "none" | "ascending" | "descending";
  onClick: () => void;
}) {
  return (
    <TableHead
      scope="col"
      aria-sort={ariaSort}
      title={label}
      className="w-16 bg-primary py-0 text-center text-primary-foreground"
    >
      <span className="inline-flex items-center justify-center gap-1.5">
        <span
          className={cn("h-2 w-2 rounded-full ring-1 ring-primary-foreground/20", markerClassName)}
          aria-hidden="true"
        />
        <SortableTableButton
          label={short}
          aria-label={`Sort by ${label}`}
          active={active}
          dir={dir}
          align="center"
          onClick={onClick}
        />
      </span>
    </TableHead>
  );
}

/** IOI-style column fill using design-system medal surface tokens. */
function MedalCell({
  count,
  surfaceClassName,
  foregroundClassName,
}: {
  count: number;
  surfaceClassName: string;
  foregroundClassName: string;
}) {
  return (
    <TableCell
      className={cn(
        "text-center font-semibold tnum",
        surfaceClassName,
        foregroundClassName,
        count === 0 && "opacity-55",
      )}
    >
      {dash(count)}
    </TableCell>
  );
}

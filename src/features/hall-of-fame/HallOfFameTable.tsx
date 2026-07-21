"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import SortableTableButton from "@/components/ui/SortableTableButton";
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
import type { HallOfFameRow } from "@/services";

type SortKey = "rank" | "participations" | "total";
type SortDir = "asc" | "desc";

export default function HallOfFameTable({
  rows,
  latestYear,
}: {
  rows: HallOfFameRow[];
  latestYear: number;
}) {
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "rank",
    dir: "asc",
  });

  const sorted = useMemo(() => {
    const factor = sort.dir === "asc" ? 1 : -1;

    return [...rows].sort((a, b) => {
      const difference =
        sort.key === "rank"
          ? a.rank - b.rank
          : sort.key === "participations"
            ? a.participations - b.participations
            : a.totalMedals - b.totalMedals;

      return difference * factor || a.rank - b.rank || a.fullName.localeCompare(b.fullName);
    });
  }, [rows, sort]);

  function toggleSort(key: SortKey) {
    setSort((previous) =>
      previous.key === key
        ? { key, dir: previous.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "rank" ? "asc" : "desc" },
    );
  }

  const ariaSort = (key: SortKey) =>
    sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none";

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table minWidth="720px">
        <TableCaption className="sr-only">
          All-time PAIO contestant ranking through {latestYear}. Canonical rank is determined by
          gold medals, then silver medals, then bronze medals.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
            <TableHead
              rowSpan={2}
              scope="col"
              aria-sort={ariaSort("rank")}
              className="w-20 py-0 text-center text-primary-foreground"
            >
              <SortableTableButton
                label="Rank"
                active={sort.key === "rank"}
                dir={sort.dir}
                align="center"
                onClick={() => toggleSort("rank")}
              />
            </TableHead>
            <TableHead rowSpan={2} scope="col" className="text-primary-foreground">
              Contestant
            </TableHead>
            <TableHead
              rowSpan={2}
              scope="col"
              aria-sort={ariaSort("participations")}
              className="w-40 py-0 text-center text-primary-foreground"
            >
              <SortableTableButton
                label="Participations"
                detail={`Through ${latestYear}`}
                active={sort.key === "participations"}
                dir={sort.dir}
                align="center"
                onClick={() => toggleSort("participations")}
              />
            </TableHead>
            <TableHead
              colSpan={4}
              scope="colgroup"
              className="border-b border-primary-foreground/20 text-center text-primary-foreground"
            >
              Medals
            </TableHead>
          </TableRow>
          <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
            <MedalHead short="G" label="Gold" markerClassName="bg-gold" />
            <MedalHead short="S" label="Silver" markerClassName="bg-silver" />
            <MedalHead short="B" label="Bronze" markerClassName="bg-bronze" />
            <TableHead
              scope="col"
              aria-sort={ariaSort("total")}
              className="w-24 py-0 text-center text-primary-foreground"
            >
              <SortableTableButton
                label="Total"
                active={sort.key === "total"}
                dir={sort.dir}
                align="center"
                onClick={() => toggleSort("total")}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row) => (
            <TableRow key={row.slug}>
              <TableCell className="text-center text-base font-semibold tnum">{row.rank}</TableCell>
              <TableCell>
                <div className="flex min-w-64 items-center justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/contestants/${row.slug}`}
                      className="font-semibold underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {row.fullName}
                    </Link>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {row.countryCode ? (
                        <Link
                          href={`/countries/${row.countryCode}`}
                          className="underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {row.countryFlag && <span className="mr-1">{row.countryFlag}</span>}
                          {row.countryName}
                        </Link>
                      ) : row.status === "unofficial" ? (
                        "No country delegation"
                      ) : (
                        "Country not recorded"
                      )}
                    </div>
                  </div>
                  {row.status === "guest" && (
                    <Badge variant="outline" className="shrink-0 border-chart-5/30 text-chart-5">
                      Guest
                    </Badge>
                  )}
                  {row.status === "unofficial" && (
                    <Badge variant="secondary" className="shrink-0">
                      Unofficial
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center font-medium tnum">{row.participations}</TableCell>
              <MedalCell count={row.gold} />
              <MedalCell count={row.silver} />
              <MedalCell count={row.bronze} />
              <TableCell className="text-center font-bold tnum">{row.totalMedals}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MedalHead({
  short,
  label,
  markerClassName,
}: {
  short: string;
  label: string;
  markerClassName: string;
}) {
  return (
    <TableHead scope="col" className="w-16 text-center text-primary-foreground" title={label}>
      <span className="inline-flex items-center gap-1.5" aria-hidden="true">
        <span className={cn("h-2 w-2 rounded-full ring-1 ring-primary-foreground/20", markerClassName)} />
        {short}
      </span>
      <span className="sr-only">{label}</span>
    </TableHead>
  );
}

function MedalCell({ count }: { count: number }) {
  return (
    <TableCell className={cn("text-center font-semibold tnum", count === 0 && "text-muted-foreground")}>
      {count}
    </TableCell>
  );
}

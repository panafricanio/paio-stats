"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DataTable, { type Column } from "@/components/ui/DataTable";
import SortableTableButton from "@/components/ui/SortableTableButton";
import MedalBadge from "@/components/ui/MedalBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { ScoreRow } from "@/services";
import type { MedalType } from "@/domain/medal";

export interface ScoreboardTask {
  slug: string;
  short: string;
  name: string;
  day: number;
}

const medalRowClass: Record<MedalType, string> = {
  GOLD: "bg-gold-surface hover:bg-gold-surface/80",
  SILVER: "bg-silver-surface hover:bg-silver-surface/80",
  BRONZE: "bg-bronze-surface hover:bg-bronze-surface/80",
  HM: "bg-hm-surface hover:bg-hm-surface/80",
};

// Sort keys: "rank" | "total" | "day-<n>" | <task slug>
type SortState = { key: string; dir: "asc" | "desc" };

function dayTotalOf(r: ScoreRow, day: number): number {
  return r.dayTotals.find((d) => d.day === day)?.total ?? 0;
}

function valueOf(r: ScoreRow, key: string): number {
  if (key === "rank") return r.rank;
  if (key === "total") return r.total;
  if (key.startsWith("day-")) return dayTotalOf(r, Number(key.slice(4)));
  return r.scores[key] ?? 0;
}

export default function EditionScoreboard({
  rows,
  tasks,
  days,
  showCountryFilter = true,
}: {
  rows: ScoreRow[];
  tasks: ScoreboardTask[];
  days: number[];
  showCountryFilter?: boolean;
}) {
  const multiDay = days.length > 1;
  const [country, setCountry] = useState("all");
  const [day, setDay] = useState<string>("all"); // "all" | String(day)
  const [sort, setSort] = useState<SortState>({ key: "rank", dir: "asc" });

  const countries = useMemo(
    () => Array.from(new Set(rows.map((r) => r.countryName).filter(Boolean))).sort(),
    [rows],
  );

  const rowsForView = useMemo(() => {
    const filtered = rows.filter((r) => country === "all" || r.countryName === country);
    const factor = sort.dir === "asc" ? 1 : -1;
    return [...filtered].sort(
      (a, b) => (valueOf(a, sort.key) - valueOf(b, sort.key)) * factor || a.rank - b.rank,
    );
  }, [rows, country, sort]);

  function toggleSort(key: string) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "rank" ? "asc" : "desc" },
    );
  }

  const ariaSort = (key: string): "none" | "ascending" | "descending" =>
    sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none";

  const sortHeader = (label: string, key: string, align: "left" | "center" = "left") => (
    <SortableTableButton
      label={label}
      active={sort.key === key}
      dir={sort.dir}
      align={align}
      onClick={() => toggleSort(key)}
    />
  );

  const selectedDays = day === "all" ? days : [Number(day)];
  const visibleTasks = tasks.filter((t) => selectedDays.includes(t.day));

  const columns: Column<ScoreRow>[] = [
    {
      id: "rank",
      header: sortHeader("Rank", "rank"),
      sortDirection: ariaSort("rank"),
      numeric: true,
      cellClassName: "font-medium",
      cell: (r) => r.rank,
    },
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
    ...visibleTasks.map<Column<ScoreRow>>((t) => ({
      id: t.slug,
      header: sortHeader(t.short, t.slug, "center"),
      sortDirection: ariaSort(t.slug),
      align: "center",
      numeric: true,
      cell: (r) => r.scores[t.slug] ?? 0,
    })),
  ];

  // Per-day total columns only make sense when the edition spans multiple days.
  if (multiDay) {
    for (const d of selectedDays) {
      columns.push({
        id: `day-${d}`,
        header: sortHeader(`Day ${d}`, `day-${d}`, "center"),
        sortDirection: ariaSort(`day-${d}`),
        align: "center",
        numeric: true,
        cellClassName: "bg-muted/40 font-semibold",
        cell: (r) => dayTotalOf(r, d),
      });
    }
  }

  columns.push(
    {
      id: "total",
      header: sortHeader("Total", "total", "center"),
      sortDirection: ariaSort("total"),
      align: "center",
      numeric: true,
      cellClassName: "bg-muted/60 font-bold",
      cell: (r) => r.total,
    },
    {
      id: "award",
      header: "Award",
      align: "center",
      cell: (r) => (
        <span className="flex flex-col items-center gap-1">
          {r.medal && <MedalBadge medal={r.medal} />}
          {r.specialAward && (
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {r.specialAward}
            </span>
          )}
        </span>
      ),
    },
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-end gap-3">
        {multiDay && (
          <div
            className="inline-flex rounded-md border border-border p-0.5"
            role="group"
            aria-label="Filter results by day"
          >
            <Button
              size="sm"
              variant={day === "all" ? "default" : "ghost"}
              aria-pressed={day === "all"}
              onClick={() => setDay("all")}
              className={cn(day !== "all" && "text-muted-foreground")}
            >
              All days
            </Button>
            {days.map((d) => (
              <Button
                key={d}
                size="sm"
                variant={day === String(d) ? "default" : "ghost"}
                aria-pressed={day === String(d)}
                onClick={() => setDay(String(d))}
                className={cn(day !== String(d) && "text-muted-foreground")}
              >
                Day {d}
              </Button>
            ))}
          </div>
        )}
        {showCountryFilter && (
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-[200px]" aria-label="Filter results by country">
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <DataTable
        columns={columns}
        rows={rowsForView}
        getRowKey={(r) => `${r.slug}-${r.rank}`}
        minWidth="960px"
        caption="PAIO edition scoreboard. Sort by rank, task score, day total, or overall total."
        rowClassName={(r) =>
          r.status === "unofficial"
            ? "opacity-70"
            : r.medal
              ? medalRowClass[r.medal]
              : undefined
        }
      />

      <p className="text-right text-xs text-muted-foreground" aria-live="polite">
        {rowsForView.length} contestant{rowsForView.length === 1 ? "" : "s"} shown
      </p>
    </div>
  );
}

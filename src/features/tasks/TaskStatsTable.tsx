"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import DataTable, { type Column } from "@/components/ui/DataTable";
import type { TaskStat } from "@/domain/task";

interface Row extends TaskStat {
  number: number; // task number within the edition (1-based)
}

type SortKey = "number" | "day" | "avg" | "avgPct" | "full" | "fullPct";
type SortDir = "asc" | "desc";

function valueOf(r: Row, key: SortKey): number {
  switch (key) {
    case "number":
      return r.number;
    case "day":
      return r.task.day;
    case "avg":
      return r.avg;
    case "avgPct":
      return r.avgPct;
    case "full":
      return r.fullSolves;
    case "fullPct":
      return r.fullPct;
  }
}

export default function TaskStatsTable({
  editionSlug,
  stats,
}: {
  editionSlug: string;
  stats: TaskStat[];
}) {
  const rows0 = useMemo<Row[]>(() => stats.map((s, i) => ({ ...s, number: i + 1 })), [stats]);
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "number", dir: "asc" });

  const rows = useMemo(() => {
    const factor = sort.dir === "asc" ? 1 : -1;
    return [...rows0].sort((a, b) => (valueOf(a, sort.key) - valueOf(b, sort.key)) * factor || a.number - b.number);
  }, [rows0, sort]);

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "number" || key === "day" ? "asc" : "desc" },
    );
  }

  const sh = (label: string, key: SortKey, align: "left" | "center" = "center") => (
    <SortHeader
      label={label}
      active={sort.key === key}
      dir={sort.dir}
      align={align}
      onClick={() => toggleSort(key)}
    />
  );

  const columns: Column<Row>[] = [
    { id: "number", header: sh("#", "number"), align: "center", numeric: true, cellClassName: "text-muted-foreground", cell: (r) => r.number },
    {
      id: "task",
      header: "Task",
      cellClassName: "font-medium",
      cell: (r) => (
        <Link href={`/tasks/${editionSlug}/${r.task.slug}`} className="hover:underline">
          {r.task.name}
        </Link>
      ),
    },
    { id: "day", header: sh("Day", "day"), align: "center", cellClassName: "text-muted-foreground", cell: (r) => r.task.day },
    { id: "max", header: "Max", align: "center", numeric: true, cellClassName: "text-muted-foreground", cell: (r) => r.task.maxScore },
    { id: "avg", header: sh("Avg", "avg"), align: "center", numeric: true, cell: (r) => r.avg.toFixed(1) },
    { id: "avgPct", header: sh("Avg %", "avgPct"), align: "center", numeric: true, cell: (r) => `${r.avgPct.toFixed(1)}%` },
    { id: "full", header: sh("Full solves", "full"), align: "center", numeric: true, cell: (r) => r.fullSolves },
    { id: "fullPct", header: sh("Full %", "fullPct"), align: "center", numeric: true, cell: (r) => `${r.fullPct.toFixed(1)}%` },
  ];

  return <DataTable columns={columns} rows={rows} getRowKey={(r) => r.task.slug} minWidth="720px" />;
}

function SortHeader({
  label,
  active,
  dir,
  onClick,
  align,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  align: "left" | "center";
}) {
  const Icon = !active ? ChevronsUpDown : dir === "asc" ? ChevronUp : ChevronDown;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 font-semibold transition-opacity hover:opacity-80",
        align === "center" && "mx-auto",
      )}
    >
      {label}
      <Icon className={cn("h-3.5 w-3.5", !active && "opacity-50")} />
    </button>
  );
}

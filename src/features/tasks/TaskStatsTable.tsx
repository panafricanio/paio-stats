"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DataTable, { type Column } from "@/components/ui/DataTable";
import SortableTableButton from "@/components/ui/SortableTableButton";
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

  const ariaSort = (key: SortKey): "none" | "ascending" | "descending" =>
    sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none";

  const sh = (label: string, key: SortKey, align: "left" | "center" = "center") => (
    <SortableTableButton
      label={label}
      active={sort.key === key}
      dir={sort.dir}
      align={align}
      onClick={() => toggleSort(key)}
    />
  );

  const columns: Column<Row>[] = [
    {
      id: "number",
      header: sh("Number", "number"),
      sortDirection: ariaSort("number"),
      align: "center",
      numeric: true,
      cellClassName: "text-muted-foreground",
      cell: (r) => r.number,
    },
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
    {
      id: "day",
      header: sh("Day", "day"),
      sortDirection: ariaSort("day"),
      align: "center",
      cellClassName: "text-muted-foreground",
      cell: (r) => r.task.day,
    },
    {
      id: "max",
      header: "Max",
      align: "center",
      numeric: true,
      cellClassName: "text-muted-foreground",
      cell: (r) => r.task.maxScore,
    },
    {
      id: "avg",
      header: sh("Average score", "avg"),
      sortDirection: ariaSort("avg"),
      align: "center",
      numeric: true,
      cell: (r) => r.avg.toFixed(1),
    },
    {
      id: "avgPct",
      header: sh("Average percentage", "avgPct"),
      sortDirection: ariaSort("avgPct"),
      align: "center",
      numeric: true,
      cell: (r) => `${r.avgPct.toFixed(1)}%`,
    },
    {
      id: "full",
      header: sh("Full solves", "full"),
      sortDirection: ariaSort("full"),
      align: "center",
      numeric: true,
      cell: (r) => r.fullSolves,
    },
    {
      id: "fullPct",
      header: sh("Full-solve percentage", "fullPct"),
      sortDirection: ariaSort("fullPct"),
      align: "center",
      numeric: true,
      cell: (r) => `${r.fullPct.toFixed(1)}%`,
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowKey={(r) => r.task.slug}
      minWidth="720px"
      caption="Task statistics for this PAIO edition."
    />
  );
}

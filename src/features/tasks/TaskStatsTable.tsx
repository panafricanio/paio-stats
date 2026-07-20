import Link from "next/link";
import DataTable, { type Column } from "@/components/ui/DataTable";
import type { TaskStat } from "@/domain/task";

export default function TaskStatsTable({
  editionSlug,
  stats,
}: {
  editionSlug: string;
  stats: TaskStat[];
}) {
  const columns: Column<TaskStat>[] = [
    {
      id: "task",
      header: "Task",
      cellClassName: "font-medium",
      cell: (s) => (
        <Link href={`/tasks/${editionSlug}/${s.task.slug}`} className="hover:underline">
          {s.task.name}
        </Link>
      ),
    },
    { id: "day", header: "Day", align: "center", cellClassName: "text-muted-foreground", cell: (s) => s.task.day },
    { id: "max", header: "Max", align: "center", numeric: true, cellClassName: "text-muted-foreground", cell: (s) => s.task.maxScore },
    { id: "avg", header: "Avg", align: "center", numeric: true, cell: (s) => s.avg.toFixed(1) },
    { id: "avgpct", header: "Avg %", align: "center", numeric: true, cell: (s) => `${s.avgPct.toFixed(1)}%` },
    { id: "full", header: "Full solves", align: "center", numeric: true, cell: (s) => s.fullSolves },
    { id: "fullpct", header: "Full %", align: "center", numeric: true, cell: (s) => `${s.fullPct.toFixed(1)}%` },
  ];

  return <DataTable columns={columns} rows={stats} getRowKey={(s) => s.task.slug} />;
}

import Link from "next/link";
import DataTable, { type Column } from "@/components/ui/DataTable";
import Bar from "@/components/ui/Bar";
import type { Edition } from "@/domain/edition";
import type { Contestant } from "@/domain/contestant";
import type { Task } from "@/domain/task";

interface Row {
  task: Task;
  score: number;
}

export default function ContestantScoreTable({
  edition,
  contestant,
}: {
  edition: Edition;
  contestant: Contestant;
}) {
  const rows: Row[] = edition.tasks.map((task) => ({
    task,
    score: contestant.scores[task.slug] ?? 0,
  }));

  const columns: Column<Row>[] = [
    {
      id: "task",
      header: "Task",
      cellClassName: "font-medium",
      cell: (r) => (
        <Link href={`/tasks/${edition.slug}/${r.task.slug}`} className="hover:underline">
          {r.task.name}
        </Link>
      ),
    },
    { id: "day", header: "Day", align: "center", cellClassName: "text-muted-foreground", cell: (r) => r.task.day },
    {
      id: "score",
      header: "Score",
      align: "center",
      numeric: true,
      cellClassName: "font-semibold",
      cell: (r) => (
        <>
          {r.score}
          <span className="text-muted-foreground"> / {r.task.maxScore}</span>
        </>
      ),
    },
    {
      id: "bar",
      header: "Result",
      cell: (r) => (
        <div className="max-w-[200px]">
          <Bar pct={(r.score / r.task.maxScore) * 100} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowKey={(r) => r.task.slug}
      caption={`${contestant.fullName}'s task scores at ${edition.name}.`}
    />
  );
}

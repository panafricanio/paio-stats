import Link from "next/link";
import DataTable, { type Column } from "@/components/ui/DataTable";
import StatGrid from "@/components/ui/StatGrid";
import type { TaskDetail } from "@/services";

type Scorer = TaskDetail["topScorers"][number];

export default function TaskDetailView({ detail }: { detail: TaskDetail }) {
  const { edition, stat, distribution, topScorers } = detail;
  const maxBar = Math.max(1, ...distribution.map((b) => b.count));

  const scorerColumns: Column<Scorer>[] = [
    {
      id: "name",
      header: "Contestant",
      cellClassName: "font-medium",
      cell: ({ contestant }) => (
        <Link href={`/contestants/${contestant.slug}`} className="hover:underline">
          {contestant.fullName}
        </Link>
      ),
    },
    {
      id: "country",
      header: "Country",
      cellClassName: "text-muted-foreground",
      cell: ({ contestant }) => contestant.countryName.replace(" (Guest)", "") || "—",
    },
    { id: "score", header: "Score", align: "center", numeric: true, cellClassName: "font-semibold", cell: (s) => s.score },
  ];

  return (
    <div className="space-y-10">
      <StatGrid
        stats={[
          { value: stat.avg.toFixed(1), label: "Average score" },
          { value: `${stat.avgPct.toFixed(1)}%`, label: "Average %" },
          { value: stat.fullSolves, label: "Full solves" },
          { value: `${stat.fullPct.toFixed(1)}%`, label: "Full-solve rate" },
        ]}
      />

      <section>
        <h2 className="mb-4 font-display text-2xl">Score distribution</h2>
        <div className="space-y-2 rounded-lg border border-border p-6">
          {distribution.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <div className="w-16 shrink-0 text-right text-sm tnum text-muted-foreground">{b.label}</div>
              <div className="flex-1">
                <div
                  className="h-6 rounded bg-chart-1 transition-all"
                  style={{ width: `${(b.count / maxBar) * 100}%`, minWidth: b.count ? "1.5rem" : 0 }}
                />
              </div>
              <div className="w-8 text-sm tnum">{b.count}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl">Top scorers</h2>
        <DataTable
          columns={scorerColumns}
          rows={topScorers}
          getRowKey={(s) => s.contestant.slug}
          emptyMessage="No scores recorded."
        />
      </section>
      <p className="text-sm text-muted-foreground">
        Statistics computed over {stat.participants} ranked contestants at {edition.name}.
      </p>
    </div>
  );
}

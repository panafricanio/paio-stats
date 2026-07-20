import type { Metadata } from "next";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import TaskStatsTable from "@/features/tasks/TaskStatsTable";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Every PAIO task with average scores, full-solve rates and difficulty.",
};

export default async function TasksPage() {
  const items = await statsService.listEditionTaskStats();

  return (
    <div>
      <PageHeader
        title="Tasks"
        subtitle="Every problem, with its average score and full-solve rate. Lower averages and fewer full solves mean a harder task."
      />
      <div className="container space-y-10 py-10">
        {items.map(({ edition, stats }) => (
          <section key={edition.slug}>
            <h2 className="mb-4 font-display text-2xl">{edition.name}</h2>
            <TaskStatsTable editionSlug={edition.slug} stats={stats} />
          </section>
        ))}
      </div>
    </div>
  );
}

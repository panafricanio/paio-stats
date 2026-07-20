import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { statsService } from "@/services";
import TaskStatsTable from "@/features/tasks/TaskStatsTable";

export async function generateStaticParams() {
  return (await statsService.getEditionSlugs()).map((year) => ({ year }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  const edition = await statsService.getEdition(year);
  return { title: edition ? `${edition.name} · Tasks` : "Tasks" };
}

export default async function EditionTasksPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const detail = await statsService.getEditionDetail(year);
  if (!detail) notFound();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {detail.taskStats.length} tasks over 2 days. Select a task for its score distribution.
      </p>
      <TaskStatsTable editionSlug={detail.edition.slug} stats={detail.taskStats} />
    </div>
  );
}

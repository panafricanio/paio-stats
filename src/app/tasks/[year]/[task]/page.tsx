import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import TaskDetailView from "@/features/tasks/TaskDetailView";

export async function generateStaticParams() {
  return statsService.getTaskParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; task: string }>;
}): Promise<Metadata> {
  const { year, task } = await params;
  const detail = await statsService.getTaskDetail(year, task);
  return { title: detail ? `${detail.task.name} · ${detail.edition.name}` : "Task" };
}

export default async function TaskPage({
  params,
}: {
  params: Promise<{ year: string; task: string }>;
}) {
  const { year, task } = await params;
  const detail = await statsService.getTaskDetail(year, task);
  if (!detail) notFound();

  return (
    <div>
      <PageHeader
        title={detail.task.name}
        subtitle={`${detail.edition.name} · Day ${detail.task.day} · max ${detail.task.maxScore} points`}
      >
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All tasks
        </Link>
      </PageHeader>

      <div className="container py-10">
        <TaskDetailView detail={detail} />
      </div>
    </div>
  );
}

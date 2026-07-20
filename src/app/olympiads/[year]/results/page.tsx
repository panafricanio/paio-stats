import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { statsService } from "@/services";
import EditionScoreboard from "@/features/editions/EditionScoreboard";

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
  return { title: edition ? `${edition.name} · Results` : "Results" };
}

export default async function EditionResultsPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const detail = await statsService.getEditionDetail(year);
  if (!detail) notFound();

  const scoreboardTasks = detail.edition.tasks.map((t) => ({
    slug: t.slug,
    short: t.short,
    name: t.name,
    day: t.day,
  }));

  return (
    <EditionScoreboard rows={detail.rows} tasks={scoreboardTasks} days={detail.edition.days} />
  );
}

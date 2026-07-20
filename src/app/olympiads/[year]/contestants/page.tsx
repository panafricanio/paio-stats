import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { statsService } from "@/services";
import EditionContestants from "@/features/editions/EditionContestants";

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
  return { title: edition ? `${edition.name} · Contestants` : "Contestants" };
}

export default async function EditionContestantsPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const detail = await statsService.getEditionDetail(year);
  if (!detail) notFound();
  return <EditionContestants rows={detail.rows} />;
}

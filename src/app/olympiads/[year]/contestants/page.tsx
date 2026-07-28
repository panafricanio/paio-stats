import { notFound, redirect } from "next/navigation";
import { statsService } from "@/services";

export async function generateStaticParams() {
  return (await statsService.getEditionSlugs()).map((year) => ({ year }));
}

/** Contestants tab removed — Results is the single people + scores view. */
export default async function EditionContestantsRedirect({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const edition = await statsService.getEdition(year);
  if (!edition) notFound();
  if (edition.contestants.length === 0) redirect(`/olympiads/${year}`);
  redirect(`/olympiads/${year}/results`);
}

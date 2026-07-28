import { notFound, redirect } from "next/navigation";
import { statsService } from "@/services";

export async function generateStaticParams() {
  return (await statsService.getEditionSlugs()).map((year) => ({ year }));
}

/**
 * Edition “Contestants” list tab removed (Results covers the scoreboard).
 * Individual contestant profiles remain at `/contestants/[slug]`.
 */
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

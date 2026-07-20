import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { statsService } from "@/services";
import ContestantProfileView from "@/features/contestants/ContestantProfileView";

export async function generateStaticParams() {
  const slugs = await statsService.getAllContestantSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = await statsService.getContestantProfile(slug);
  return { title: profile ? profile.fullName : "Contestant" };
}

export default async function ContestantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await statsService.getContestantProfile(slug);
  if (!profile) notFound();
  return <ContestantProfileView profile={profile} />;
}

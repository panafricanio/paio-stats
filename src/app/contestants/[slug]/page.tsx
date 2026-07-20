import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import StatGrid from "@/components/ui/StatGrid";
import MedalBadge from "@/components/ui/MedalBadge";
import ContestantScoreTable from "@/features/contestants/ContestantScoreTable";
import { MEDAL_LABELS } from "@/domain/medal";

const medalAccent: Record<string, string> = {
  GOLD: "text-gold",
  SILVER: "text-silver",
  BRONZE: "text-bronze",
  HM: "text-hm",
};

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
  const appearances = await statsService.getContestantAppearances(slug);
  return { title: appearances.length ? appearances[0].contestant.fullName : "Contestant" };
}

export default async function ContestantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const appearances = await statsService.getContestantAppearances(slug);
  if (appearances.length === 0) notFound();

  const { contestant, edition } = appearances[0];

  return (
    <div>
      <PageHeader
        title={contestant.fullName}
        subtitle={
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {contestant.countryName && (
              <span>{contestant.countryName.replace(" (Guest)", "")}</span>
            )}
            {contestant.status === "guest" && <span className="text-chart-5">Guest contestant</span>}
            {contestant.status === "unofficial" && <span>Unofficial contestant</span>}
          </span>
        }
      >
        <Link
          href={`/olympiads/${edition.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {edition.name} scoreboard
        </Link>
      </PageHeader>

      <div className="container space-y-10 py-10">
        <StatGrid
          stats={[
            { value: `#${contestant.rank}`, label: `Rank at ${edition.name}` },
            { value: contestant.total, label: "Total score" },
            {
              value: contestant.medal ? MEDAL_LABELS[contestant.medal] : "—",
              label: "Medal",
              accent: contestant.medal ? medalAccent[contestant.medal] : undefined,
            },
            { value: `${contestant.day1Total} / ${contestant.day2Total}`, label: "Day 1 / Day 2" },
          ]}
        />

        {appearances.map(({ edition: e, contestant: c }) => (
          <section key={e.slug}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl">{e.name}</h2>
              {c.medal && <MedalBadge medal={c.medal} />}
            </div>
            <ContestantScoreTable edition={e} contestant={c} />
          </section>
        ))}
      </div>
    </div>
  );
}

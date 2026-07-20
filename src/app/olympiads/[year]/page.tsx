import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import StatGrid from "@/components/ui/StatGrid";
import EditionScoreboard from "@/features/editions/EditionScoreboard";

export async function generateStaticParams() {
  const editions = await statsService.listEditions();
  return editions.map((e) => ({ year: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  const edition = await statsService.getEdition(year);
  return { title: edition ? `${edition.name} results` : "Edition" };
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const view = await statsService.getEditionView(year);
  if (!view) notFound();

  const { edition, summary, rows } = view;
  const scoreboardTasks = edition.tasks.map((t) => ({
    slug: t.slug,
    short: t.short,
    name: t.name,
    day: t.day,
  }));

  return (
    <div>
      <PageHeader
        title={`${edition.name} Results`}
        subtitle={
          <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {edition.dates}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {edition.host} · {edition.city}
            </span>
            <span>{edition.format}</span>
          </span>
        }
      />

      <div className="container space-y-10 py-10">
        <div className="space-y-3">
          <StatGrid
            stats={[
              { value: summary.participants, label: "Contestants" },
              { value: summary.countriesCount, label: "Countries" },
              { value: summary.tasksCount, label: "Tasks" },
              { value: summary.totalMedals, label: "Medals" },
            ]}
          />
          <StatGrid
            stats={[
              { value: summary.official.gold, label: "Gold", accent: "text-gold" },
              { value: summary.official.silver, label: "Silver", accent: "text-silver" },
              { value: summary.official.bronze, label: "Bronze", accent: "text-bronze" },
              { value: summary.official.hm, label: "Honorable mentions", accent: "text-hm" },
            ]}
          />
        </div>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl">Scoreboard</h2>
            <Link
              href="/countries"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              By country <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <EditionScoreboard rows={rows} tasks={scoreboardTasks} />
          {summary.guest.gold + summary.guest.silver + summary.guest.bronze > 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              Guest contestants earned {summary.guest.gold} gold, {summary.guest.silver} silver and{" "}
              {summary.guest.bronze} bronze; guest results do not count toward country totals.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

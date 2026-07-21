import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StatGrid from "@/components/ui/StatGrid";
import MedalThresholds from "@/features/editions/MedalThresholds";
import type { EditionDetail } from "@/services";

export default function EditionOverview({ detail }: { detail: EditionDetail }) {
  const { edition, summary, thresholds, maxScore, hostCountry, rows } = detail;

  const official = rows.filter((r) => r.status === "official").length;
  const guests = rows.filter((r) => r.status === "guest").length;
  const unofficial = rows.filter((r) => r.status === "unofficial").length;

  const info: { label: string; value: React.ReactNode }[] = [
    {
      label: "Host",
      value: hostCountry ? (
        <Link href={`/countries/${hostCountry.code}`} className="hover:underline">
          {hostCountry.flag} {edition.host}
        </Link>
      ) : (
        edition.host
      ),
    },
    { label: "City", value: edition.city },
    { label: "Dates", value: edition.dates },
    { label: "Format", value: edition.format },
    {
      label: "Contestants",
      value: (
        <>
          {summary.participants}
          {(guests > 0 || unofficial > 0) && (
            <span className="text-muted-foreground">
              {" "}
              ({official} official
              {guests > 0 && `, ${guests} guest`}
              {unofficial > 0 && `, ${unofficial} unofficial`})
            </span>
          )}
        </>
      ),
    },
    { label: "Countries", value: summary.countriesCount },
    {
      label: "Tasks",
      value: `${summary.tasksCount} over ${edition.days.length} day${edition.days.length === 1 ? "" : "s"}`,
    },
  ];

  if (edition.website) {
    info.push({
      label: "Website",
      value: (
        <a
          href={edition.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          Official website <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ),
    });
  }

  const scoreBreakdown = edition.tasks.map((t) => t.maxScore).join(" + ");

  return (
    <div className="space-y-10">
      {/* General information */}
      <section>
        <h2 className="mb-4 font-display text-2xl">General information</h2>
        <Card>
          <CardContent className="p-0">
            <dl className="divide-y divide-border">
              {info.map((row) => (
                <div key={row.label} className="grid grid-cols-3 gap-4 px-5 py-3">
                  <dt className="text-sm font-medium text-muted-foreground">{row.label}</dt>
                  <dd className="col-span-2 text-sm">{row.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </section>

      {/* Awards */}
      <section className="space-y-6">
        <div>
          <h2 className="mb-1 font-display text-2xl">Awards</h2>
          <p className="text-sm text-muted-foreground">
            Maximum possible score: {scoreBreakdown} = <span className="font-semibold text-foreground">{maxScore}</span>
          </p>
        </div>
        <StatGrid
          stats={[
            { value: summary.official.gold, label: "Gold", accent: "text-gold-foreground" },
            { value: summary.official.silver, label: "Silver", accent: "text-silver-foreground" },
            { value: summary.official.bronze, label: "Bronze", accent: "text-bronze-foreground" },
            { value: summary.official.hm, label: "Honorable mentions", accent: "text-hm-foreground" },
          ]}
        />
        <MedalThresholds thresholds={thresholds} maxScore={maxScore} />
        {summary.guest.gold + summary.guest.silver + summary.guest.bronze > 0 && (
          <p className="text-sm text-muted-foreground">
            Guest contestants additionally earned {summary.guest.gold} gold, {summary.guest.silver}{" "}
            silver and {summary.guest.bronze} bronze; guest results are recognised individually but do
            not count toward country rankings.
          </p>
        )}
      </section>

      {/* Jump links */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/olympiads/${edition.slug}/results`}
          className="inline-flex min-h-11 items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
        >
          View full results <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={`/olympiads/${edition.slug}/tasks`}
          className="inline-flex min-h-11 items-center gap-1 rounded-md border border-border px-4 py-2 text-sm font-medium outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
        >
          Tasks
        </Link>
      </div>
    </div>
  );
}

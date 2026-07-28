import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MedalTallyStats from "@/components/ui/MedalTallyStats";
import MedalThresholds from "@/features/editions/MedalThresholds";
import type { EditionDetail } from "@/services";

export default function EditionOverview({ detail }: { detail: EditionDetail }) {
  const { edition, summary, thresholds, maxScore, hostCountry, rows } = detail;
  const hasResults = rows.length > 0;
  const hasTasks = edition.tasks.length > 0;

  const official = rows.filter((r) => r.status === "official").length;
  const guests = rows.filter((r) => r.status === "guest").length;
  const unofficial = rows.filter((r) => r.status === "unofficial").length;

  const contestantBreakdown =
    hasResults && (guests > 0 || unofficial > 0)
      ? [
          `${official} official`,
          guests > 0 ? `${guests} guest` : null,
          unofficial > 0 ? `${unofficial} unofficial` : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : null;

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
      value: hasResults ? (
        <>
          {summary.participants}
          {contestantBreakdown && (
            <span className="text-muted-foreground"> ({contestantBreakdown})</span>
          )}
        </>
      ) : (
        <span className="text-muted-foreground">TBA</span>
      ),
    },
    {
      label: "Countries",
      value: hasResults ? summary.countriesCount : <span className="text-muted-foreground">TBA</span>,
    },
    {
      label: "Tasks",
      value: hasTasks ? (
        `${summary.tasksCount} over ${edition.days.length} day${edition.days.length === 1 ? "" : "s"}`
      ) : (
        <span className="text-muted-foreground">TBA</span>
      ),
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

      {!hasResults && (
        <p className="text-sm text-muted-foreground">No results published yet.</p>
      )}

      {hasResults && (
        <section className="space-y-6">
          <div>
            <h2 className="mb-1 font-display text-2xl">Awards</h2>
            <p className="text-sm text-muted-foreground">
              Maximum possible score: {scoreBreakdown} ={" "}
              <span className="font-semibold text-foreground">{maxScore}</span>
            </p>
          </div>
          <MedalTallyStats tally={summary.official} />
          <MedalThresholds thresholds={thresholds} maxScore={maxScore} />
        </section>
      )}
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Edition } from "@/domain/edition";

const archiveSections = [
  {
    href: "/olympiads",
    title: "Editions",
    description: "Scoreboards, medals, hosts, and per-task results.",
  },
  {
    href: "/countries",
    title: "Countries",
    description: "Participation histories and all-time medal standings.",
  },
  {
    href: "/tasks",
    title: "Tasks",
    description: "Averages, full-solve rates, and score distributions.",
  },
  {
    href: "/hall-of-fame",
    title: "Hall of Fame",
    description: "All-time contestant records by gold, silver, then bronze.",
  },
] as const;

export default function HomeView({ editions }: { editions: Edition[] }) {
  const latest = editions[0];
  const latestWithResults = editions.find((e) => e.contestants.length > 0);
  const count = editions.length;

  return (
    <div>
      <section className="border-b border-border">
        <div className="container py-16 md:py-24 [&>*]:max-w-4xl">
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            Pan-African Informatics Olympiad
          </span>
          <h1 className="mt-6 font-display leading-[1.05]">PAIO Statistics</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Official PAIO results: medals, task scores, country standings, and contestant histories.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/olympiads">
                Browse editions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {latest && (
              <Button asChild variant="outline">
                <Link href={`/olympiads/${latest.slug}`}>Latest: {latest.name}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Sections
            </p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">Browse the archive</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Editions, countries, tasks, and all-time contestant records.
            </p>
          </div>
          <nav className="border-t border-border" aria-label="Statistics sections">
            {archiveSections.map((section, index) => (
              <Link
                key={section.href}
                href={section.href}
                className="group grid min-h-24 grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-4 outline-none transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <span className="self-start pt-1 text-xs font-semibold tnum text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold">{section.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="border-t border-border">
        <div className="container">
          <div className="mx-auto max-w-5xl divide-y divide-border">
            <GuideSection title="About this site">
              <p>
                Compiled from official PAIO results. Open to browse; no account required. Currently{" "}
                {count} edition{count === 1 ? "" : "s"}
                {": "}
                {editions.map((e, i) => (
                  <span key={e.slug}>
                    {i > 0 && ", "}
                    <Link
                      href={`/olympiads/${e.slug}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {e.name}
                    </Link>
                  </span>
                ))}
                .
              </p>
            </GuideSection>

            <GuideSection title="Data and accuracy">
              <p>
                Recent editions use the official final standings. Missing earlier data may be added
                over time. Results data belongs to the PAIO.
              </p>
            </GuideSection>

            <GuideSection title="How medals are awarded">
              <p>
                Medals follow each edition&apos;s rank cut-offs (typically{" "}
                <span className="font-medium text-gold">Gold</span>,{" "}
                <span className="font-medium text-silver">Silver</span>, and{" "}
                <span className="font-medium text-bronze">Bronze</span> in roughly the top half, with{" "}
                <span className="font-medium text-hm">Honourable Mentions</span> below). Exact bands
                vary by year
                {latestWithResults && (
                  <>
                    {" — "}
                    see{" "}
                    <Link
                      href={`/olympiads/${latestWithResults.slug}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {latestWithResults.name}
                    </Link>
                  </>
                )}
                .
              </p>
            </GuideSection>

            <GuideSection title="Countries">
              <p>
                All-time country standings are ordered by gold, then silver, then bronze. Within an
                edition, countries are ordered by total marks. Official and guest countries appear in
                separate tables. Only official team medals count toward country medal totals.
              </p>
            </GuideSection>

            <GuideSection title="Contestant status">
              <p>
                Official boards are split by On-site and Online when both exist. Guests and Unofficial
                each appear in one table for the edition.
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <span className="font-medium text-foreground">Official:</span> team members; medals
                  count for the contestant and their country.
                </li>
                <li>
                  <span className="font-medium text-foreground">Guest:</span> invited teams; medals
                  count for the contestant, not country standings.
                </li>
                <li>
                  <span className="font-medium text-foreground">Unofficial:</span> shown for the
                  record; not ranked for medals.
                </li>
              </ul>
            </GuideSection>

            <GuideSection title="Corrections and contributions">
              <p>
                Report errors or missing edition results to the PAIO organising committee. Corrections
                are checked before publication.
              </p>
            </GuideSection>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 py-10 md:grid-cols-3 md:gap-10 md:py-12">
      <h2 className="font-display text-xl md:text-2xl">{title}</h2>
      <div className="text-muted-foreground md:col-span-2 [&_a]:underline-offset-2">{children}</div>
    </section>
  );
}

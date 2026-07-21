import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Edition } from "@/domain/edition";

const archiveSections = [
  {
    href: "/olympiads",
    title: "Editions",
    description: "Full scoreboards, medal counts, hosts, and per-task results.",
  },
  {
    href: "/countries",
    title: "Countries",
    description: "National participation histories and official medal standings.",
  },
  {
    href: "/tasks",
    title: "Tasks",
    description: "Problem statistics, score distributions, and full-solve rates.",
  },
  {
    href: "/hall-of-fame",
    title: "Hall of Fame",
    description: "All-time contestant records ordered by gold, silver, then bronze.",
  },
] as const;

export default function HomeView({ editions }: { editions: Edition[] }) {
  const latest = editions[0];
  const count = editions.length;
  const b = latest.bands;

  return (
    <div>
      {/* Hero / intro */}
      <section className="border-b border-border">
        <div className="container py-16 md:py-24 [&>*]:max-w-4xl">
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            Pan-African Informatics Olympiad
          </span>
          <h1 className="mt-6 font-display leading-[1.05]">PAIO Statistics</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Explore the connected record of PAIO editions, medals, task scores, country standings,
            and contestant histories.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/olympiads/${latest.slug}`}>
                Explore {latest.name} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/olympiads">All editions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Archive index */}
      <section className="container py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Archive index
            </p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">Follow the record</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Start with an edition, country, task, or all-time contestant record. Each entry links
              back to its supporting results.
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

      {/* Guidance / notes */}
      <div className="border-t border-border">
        <div className="container">
          <div className="mx-auto max-w-5xl divide-y divide-border">
            <GuideSection title="About this site">
              <p>
                The results shown here are compiled from the official PAIO results. Browsing is open to
                everyone and requires no account. The site currently covers {count}{" "}
                edition{count === 1 ? "" : "s"}
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
                . Further editions will be added as they take place.
              </p>
            </GuideSection>

            <GuideSection title="Data and accuracy">
              <p>
                Results for recent editions are taken from the official final standings and are
                considered complete. Where earlier or partial data is missing, it may be filled in over
                time. The underlying results data belongs to the PAIO.
              </p>
            </GuideSection>

            <GuideSection title="How medals are awarded">
              <p>
                Medals are determined by a contestant&apos;s final rank, using the medal cut-offs set for
                that edition. At {latest.name}, the top {b.gold[1]} ranked contestants receive{" "}
                <span className="font-medium text-gold-foreground">Gold</span>, ranks {b.silver[0]}–
                {b.silver[1]} <span className="font-medium text-silver-foreground">Silver</span>, ranks{" "}
                {b.bronze[0]}–{b.bronze[1]}{" "}
                <span className="font-medium text-bronze-foreground">Bronze</span>, and ranks {b.hm[0]}–
                {b.hm[1]} an <span className="font-medium text-hm-foreground">Honourable Mention</span>.
              </p>
            </GuideSection>

            <GuideSection title="Countries">
              <p>
                A country is a state taking part in the PAIO with an official team. In the country
                rankings, teams are ordered first by gold medals, then silver, then bronze, and finally
                by their best individual rank. A contestant&apos;s medals count towards their country&apos;s
                totals only when they compete as an official team member.
              </p>
            </GuideSection>

            <GuideSection title="Contestant status">
              <p>
                Contestants appear in one of three statuses, which affects how their results are counted:
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <span className="font-medium text-foreground">Official:</span> full team members.
                  Their medals count towards both the contestant and their country.
                </li>
                <li>
                  <span className="font-medium text-foreground">Guest:</span> invited teams competing
                  outside the official standings. Their medals are recognised for the contestant but do
                  not count towards country rankings.
                </li>
                <li>
                  <span className="font-medium text-foreground">Unofficial:</span> additional participants
                  shown for completeness, who are not ranked for medals.
                </li>
              </ul>
            </GuideSection>

            <GuideSection title="Corrections and contributions">
              <p>
                Spotted a mistake, or have results for a missing edition? Reach out to the PAIO
                organising committee so the data can be reviewed and updated. All corrections are checked
                before they are published.
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

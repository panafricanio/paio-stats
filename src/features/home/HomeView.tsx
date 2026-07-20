import Link from "next/link";
import { ArrowRight, Trophy, Globe, ListChecks, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Edition } from "@/domain/edition";

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
            This is the Pan-African Informatics Olympiad statistics website. It collects the results
            of every PAIO — editions, medals, per-task scores, country standings and individual
            contestant histories — in one browsable place. Use the sections below to explore, and see
            the notes further down for how the data is organised.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/olympiads/${latest.slug}`}>
                {latest.name} results <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/olympiads">All editions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What you'll find here */}
      <section className="container py-14 md:py-20">
        <h2 className="font-display text-2xl md:text-3xl">What you&apos;ll find here</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          The statistics are organised into four connected sections.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <GuideCard
            href="/olympiads"
            icon={<Trophy className="h-5 w-5" />}
            title="Editions"
            desc="Each PAIO with its full scoreboard, medal counts and per-task scores for every contestant."
          />
          <GuideCard
            href="/countries"
            icon={<Globe className="h-5 w-5" />}
            title="Countries"
            desc="National teams ranked by the medals their contestants have earned across editions."
          />
          <GuideCard
            href="/tasks"
            icon={<ListChecks className="h-5 w-5" />}
            title="Tasks"
            desc="Every problem with its average score, full-solve rate and score distribution."
          />
          <GuideCard
            href={`/olympiads/${latest.slug}`}
            icon={<Users className="h-5 w-5" />}
            title="Contestants"
            desc="Individual pages — reachable from any table — with each contestant's scores and medals."
          />
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
                  <Link href={`/olympiads/${e.slug}`} className="font-medium text-foreground hover:underline">
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
              <span className="font-medium text-gold">Gold</span>, ranks {b.silver[0]}–{b.silver[1]}{" "}
              <span className="font-medium text-silver">Silver</span>, ranks {b.bronze[0]}–{b.bronze[1]}{" "}
              <span className="font-medium text-bronze">Bronze</span>, and ranks {b.hm[0]}–{b.hm[1]} an{" "}
              <span className="font-medium text-hm">Honourable Mention</span>.
            </p>
          </GuideSection>

          <GuideSection title="Countries">
            <p>
              A country is a state taking part in the PAIO with an official team. In the country
              rankings, teams are ordered first by gold medals, then silver, then bronze, and finally
              by their best individual rank. A contestant&apos;s medals count towards their
              country&apos;s totals only when they compete as an official team member.
            </p>
          </GuideSection>

          <GuideSection title="Contestant status">
            <p>Contestants appear in one of three statuses, which affects how their results are counted:</p>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="font-medium text-foreground">Official</span> — full team members.
                Their medals count towards both the contestant and their country.
              </li>
              <li>
                <span className="font-medium text-foreground">Guest</span> — invited teams competing
                outside the official standings. Their medals are recognised for the contestant but do
                not count towards country rankings.
              </li>
              <li>
                <span className="font-medium text-foreground">Unofficial</span> — additional
                participants shown for completeness, who are not ranked for medals.
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

function GuideCard({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="flex h-full flex-col p-6 transition-colors hover:border-foreground/30 hover:bg-accent/40">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          {icon}
        </div>
        <h3 className="mb-2 flex items-center gap-1 text-lg font-semibold">
          {title}
          <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </Card>
    </Link>
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

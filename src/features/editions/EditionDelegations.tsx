import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MedalBadge from "@/components/ui/MedalBadge";
import DelegationLeaders from "@/components/ui/DelegationLeaders";
import type { Delegation } from "@/domain";

export default function EditionDelegations({
  delegations,
  fieldSize,
}: {
  delegations: Delegation[];
  /** Ranked olympiad field size for place context (#rank / N). */
  fieldSize: number;
}) {
  if (delegations.length === 0) {
    return <p className="text-muted-foreground">No delegations recorded for this edition.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {delegations.length} delegation{delegations.length === 1 ? "" : "s"} took part, ordered by
        gold, then silver, then bronze. Places are olympiad ranks in a field of {fieldSize}.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {delegations.map((d) => (
          <Card key={d.country.code}>
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <Link
                  href={`/countries/${d.country.code}`}
                  className="flex min-w-0 items-center gap-2.5 font-display text-xl font-semibold tracking-tight hover:underline"
                >
                  <span className="text-2xl leading-none" aria-hidden>
                    {d.country.flag}
                  </span>
                  <span className="truncate">{d.country.name.replace(" (Guest)", "")}</span>
                </Link>
                {d.guest && (
                  <Badge variant="outline" className="shrink-0 border-chart-5/30 text-chart-5">
                    Guest
                  </Badge>
                )}
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>
                  {d.participants} contestant{d.participants === 1 ? "" : "s"}
                </span>
                {d.gold > 0 && <span className="text-gold">{d.gold} gold</span>}
                {d.silver > 0 && <span className="text-silver">{d.silver} silver</span>}
                {d.bronze > 0 && <span className="text-bronze">{d.bronze} bronze</span>}
                {d.hm > 0 && <span className="text-hm">{d.hm} HM</span>}
              </div>

              <section className="mt-5 border-t border-border pt-4">
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Leaders
                </h3>
                <DelegationLeaders teamLeader={d.teamLeader} deputyLeader={d.deputyLeader} />
              </section>

              <section className="mt-5 border-t border-border pt-4">
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Team
                </h3>
                <ul className="space-y-2">
                  {d.contestants.map((c) => (
                    <li key={c.slug} className="flex items-center justify-between gap-3 text-sm">
                      <Link
                        href={`/contestants/${c.slug}`}
                        className="min-w-0 truncate font-medium hover:underline"
                      >
                        <span className="mr-2 tnum font-normal text-muted-foreground">
                          #{c.rank}
                          <span className="text-muted-foreground/80">/{fieldSize}</span>
                        </span>
                        {c.fullName}
                      </Link>
                      {c.medal && <MedalBadge medal={c.medal} />}
                    </li>
                  ))}
                </ul>
              </section>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

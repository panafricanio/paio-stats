import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MedalBadge from "@/components/ui/MedalBadge";
import type { Delegation } from "@/domain";

export default function EditionDelegations({
  delegations,
}: {
  delegations: Delegation[];
}) {
  if (delegations.length === 0) {
    return <p className="text-muted-foreground">No delegations recorded for this edition.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {delegations.length} delegation{delegations.length === 1 ? "" : "s"} took part, ordered by
        medals won.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {delegations.map((d) => (
          <Card key={d.country.code}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <Link
                  href={`/countries/${d.country.code}`}
                  className="flex items-center gap-2 font-display text-lg font-semibold hover:underline"
                >
                  <span className="text-xl">{d.country.flag}</span>
                  {d.country.name.replace(" (Guest)", "")}
                </Link>
                {d.guest && (
                  <Badge variant="outline" className="border-chart-5/30 text-chart-5">
                    Guest
                  </Badge>
                )}
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>{d.participants} contestants</span>
                {d.gold > 0 && <span className="text-gold-foreground">{d.gold} gold</span>}
                {d.silver > 0 && <span className="text-silver-foreground">{d.silver} silver</span>}
                {d.bronze > 0 && <span className="text-bronze-foreground">{d.bronze} bronze</span>}
                {d.hm > 0 && <span className="text-hm-foreground">{d.hm} HM</span>}
              </div>

              <ul className="mt-4 space-y-1.5">
                {d.contestants.map((c) => (
                  <li key={c.slug} className="flex items-center justify-between gap-2 text-sm">
                    <Link href={`/contestants/${c.slug}`} className="hover:underline">
                      <span className="mr-2 tnum text-muted-foreground">#{c.rank}</span>
                      {c.fullName}
                    </Link>
                    {c.medal && <MedalBadge medal={c.medal} />}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

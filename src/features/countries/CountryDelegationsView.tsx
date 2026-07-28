import CountryContestantsTable from "./CountryContestantsTable";
import DelegationLeaders from "@/components/ui/DelegationLeaders";
import type { CountryDelegationEntry } from "@/services";

export default function CountryDelegationsView({
  delegations,
}: {
  delegations: CountryDelegationEntry[];
}) {
  if (delegations.length === 0) {
    return <p className="text-muted-foreground">No delegation recorded.</p>;
  }

  return (
    <div className="space-y-12">
      {delegations.map((d) => (
        <section key={d.edition.slug} className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-border pb-4">
            <h2 className="font-display text-2xl tracking-tight">{d.edition.name}</h2>
            <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
              <span>
                {d.contestants.length} contestant{d.contestants.length === 1 ? "" : "s"}
              </span>
              {d.gold > 0 && <span className="text-gold">{d.gold} gold</span>}
              {d.silver > 0 && <span className="text-silver">{d.silver} silver</span>}
              {d.bronze > 0 && <span className="text-bronze">{d.bronze} bronze</span>}
              {d.hm > 0 && <span className="text-hm">{d.hm} HM</span>}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Leaders
            </h3>
            <DelegationLeaders teamLeader={d.teamLeader} deputyLeader={d.deputyLeader} />
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Team
            </h3>
            <CountryContestantsTable contestants={d.contestants} />
          </div>
        </section>
      ))}
    </div>
  );
}

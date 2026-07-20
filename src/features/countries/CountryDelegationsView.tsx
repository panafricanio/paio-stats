import CountryContestantsTable from "./CountryContestantsTable";
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
    <div className="space-y-10">
      {delegations.map((d) => (
        <section key={d.edition.slug}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-2xl">{d.edition.name}</h2>
            <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
              <span>{d.contestants.length} contestants</span>
              {d.gold > 0 && <span className="text-gold">{d.gold} gold</span>}
              {d.silver > 0 && <span className="text-silver">{d.silver} silver</span>}
              {d.bronze > 0 && <span className="text-bronze">{d.bronze} bronze</span>}
              {d.hm > 0 && <span className="text-hm">{d.hm} HM</span>}
            </div>
          </div>
          <CountryContestantsTable contestants={d.contestants} />
        </section>
      ))}
    </div>
  );
}

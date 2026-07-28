import { cn } from "@/lib/utils";
import type { MedalTally } from "@/domain/medal";

const cells: {
  key: keyof MedalTally;
  label: string;
  surface: string;
  foreground: string;
}[] = [
  {
    key: "gold",
    label: "Gold",
    surface: "bg-gold-surface",
    foreground: "text-gold-foreground",
  },
  {
    key: "silver",
    label: "Silver",
    surface: "bg-silver-surface",
    foreground: "text-silver-foreground",
  },
  {
    key: "bronze",
    label: "Bronze",
    surface: "bg-bronze-surface",
    foreground: "text-bronze-foreground",
  },
  {
    key: "hm",
    label: "Honourable mentions",
    surface: "bg-hm-surface",
    foreground: "text-hm-foreground",
  },
];

/**
 * Medal totals on IOI-style surfaces so counts stay readable in light and dark mode.
 * Never use plain text-gold/text-bronze on the page background for these figures.
 */
export default function MedalTallyStats({
  tally,
  className,
}: {
  tally: MedalTally;
  className?: string;
}) {
  return (
    <dl className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {cells.map((cell) => (
        <div
          key={cell.key}
          className={cn(
            "flex items-baseline justify-between gap-3 rounded-md px-4 py-3",
            cell.surface,
            cell.foreground,
          )}
        >
          <dt className="text-sm font-medium opacity-80">{cell.label}</dt>
          <dd className="font-display text-2xl font-semibold tnum">{tally[cell.key]}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Build a tally from a list of medal awards — keeps totals aligned with medalist lists. */
export function tallyFromMedals(medals: Array<"GOLD" | "SILVER" | "BRONZE" | "HM" | null | undefined>): MedalTally {
  const tally: MedalTally = { gold: 0, silver: 0, bronze: 0, hm: 0 };
  for (const medal of medals) {
    if (medal === "GOLD") tally.gold += 1;
    else if (medal === "SILVER") tally.silver += 1;
    else if (medal === "BRONZE") tally.bronze += 1;
    else if (medal === "HM") tally.hm += 1;
  }
  return tally;
}

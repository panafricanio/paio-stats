import { cn } from "@/lib/utils";
import StatTile, { type Stat } from "./StatTile";

/** DRY grid of stat tiles — reused on home, edition, country, task pages. */
export default function StatGrid({
  stats,
  cols = 4,
  className,
}: {
  stats: Stat[];
  cols?: 3 | 4 | 5;
  className?: string;
}) {
  const colClass = {
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
  }[cols];

  return (
    <div className={cn("grid grid-cols-2 gap-3", colClass, className)}>
      {stats.map((s) => (
        <StatTile key={s.label} {...s} />
      ))}
    </div>
  );
}

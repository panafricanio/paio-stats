import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Stat {
  value: ReactNode;
  label: string;
  accent?: string;
}

/** Compact record summary used on edition, country, and task pages. */
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
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-2 lg:grid-cols-5",
  }[cols];

  return (
    <dl className={cn("grid gap-x-8 border-t border-border", colClass, className)}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex min-w-0 items-baseline justify-between gap-4 border-b border-border py-3"
        >
          <dt className="text-sm text-muted-foreground">{s.label}</dt>
          <dd className={cn("shrink-0 font-display text-xl font-semibold tnum", s.accent)}>
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

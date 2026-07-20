import { cn } from "@/lib/utils";

/** A single horizontal bar (score progress, distribution row). */
export default function Bar({
  pct,
  className,
  trackClassName,
  minWidth,
}: {
  pct: number;
  className?: string;
  trackClassName?: string;
  minWidth?: string;
}) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", trackClassName)}>
      <div
        className={cn("h-full rounded-full bg-chart-1", className)}
        style={{ width: `${Math.max(0, Math.min(100, pct))}%`, minWidth }}
      />
    </div>
  );
}

import { cn } from "@/lib/utils";
import type { Official } from "@/domain";

function LeaderSlot({
  role,
  person,
}: {
  role: string;
  person: Official | null;
}) {
  return (
    <div className="min-w-0">
      <p
        className={cn(
          "font-display text-lg font-semibold leading-snug tracking-tight",
          !person && "font-normal text-muted-foreground/70",
        )}
      >
        {person?.name ?? "—"}
      </p>
      <p className="mt-0.5 text-sm text-muted-foreground">{role}</p>
    </div>
  );
}

/** Compact IOI-style Team / Deputy Leader pair for delegation views. */
export default function DelegationLeaders({
  teamLeader,
  deputyLeader,
  className,
}: {
  teamLeader: Official | null;
  deputyLeader: Official | null;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8", className)}>
      <LeaderSlot role="Team leader" person={teamLeader} />
      <LeaderSlot role="Deputy leader" person={deputyLeader} />
    </div>
  );
}

import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import type { Official } from "@/domain";

function LeaderSlot({
  role,
  person,
}: {
  role: string;
  person: Official | null;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border border-border px-4 py-4",
        !person && "opacity-70",
      )}
    >
      <Avatar
        src={person?.image}
        name={person?.name ?? role}
        sizes="72px"
        className="h-16 w-16 text-lg ring-1 ring-border sm:h-20 sm:w-20 sm:text-xl"
      />
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
    </div>
  );
}

/** Team / Deputy Leader pair with photos (initials when no image). */
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
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4", className)}>
      <LeaderSlot role="Team leader" person={teamLeader} />
      <LeaderSlot role="Deputy leader" person={deputyLeader} />
    </div>
  );
}

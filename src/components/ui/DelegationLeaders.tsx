import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import type { Official } from "@/domain";

function LeaderSlot({ role, person }: { role: string; person: Official }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border px-4 py-4">
      <Avatar
        src={person.image}
        name={person.name}
        sizes="72px"
        className="h-16 w-16 text-lg ring-1 ring-border sm:h-20 sm:w-20 sm:text-xl"
      />
      <div className="min-w-0">
        <p className="font-display text-lg font-semibold leading-snug tracking-tight">
          {person.name}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

/** Team / Deputy Leader slots — only renders people who are recorded. */
export default function DelegationLeaders({
  teamLeader,
  deputyLeader,
  className,
}: {
  teamLeader: Official | null;
  deputyLeader: Official | null;
  className?: string;
}) {
  if (!teamLeader && !deputyLeader) return null;

  const both = Boolean(teamLeader && deputyLeader);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:gap-4",
        both && "sm:grid-cols-2",
        className,
      )}
    >
      {teamLeader && <LeaderSlot role="Team Leader" person={teamLeader} />}
      {deputyLeader && <LeaderSlot role="Deputy Leader" person={deputyLeader} />}
    </div>
  );
}

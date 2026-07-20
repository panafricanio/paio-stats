import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { AdministrationGroup, Official } from "@/domain/edition";

function initials(name: string): string {
  const parts = name.replace(/\(.*?\)/g, "").trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function EditionAdministration({
  groups,
  editionName,
}: {
  groups: AdministrationGroup[];
  editionName: string;
}) {
  const total = groups.reduce((n, g) => n + g.members.length, 0);

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
        <Users className="mb-3 h-8 w-8 text-muted-foreground" />
        <h2 className="font-display text-xl">Administration not recorded</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The organising committee and officials for {editionName} have not been added yet. This
          section will populate once that data is available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <p className="text-sm text-muted-foreground">
        The people who organised {editionName} — {total} across {groups.length} groups.
      </p>
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="mb-4 font-display text-2xl">{group.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.members.map((m, i) => (
              <MemberCard key={`${m.name}-${i}`} member={m} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function MemberCard({ member }: { member: Official }) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
          {initials(member.name)}
        </span>
        <div className="min-w-0">
          <div className="font-medium leading-tight">{member.name}</div>
          <ul className="mt-1 space-y-0.5">
            {member.roles.map((role, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {role}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

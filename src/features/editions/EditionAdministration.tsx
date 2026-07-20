import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Avatar from "@/components/ui/Avatar";
import type { AdministrationGroup, Official } from "@/domain/edition";

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
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <Avatar
          src={member.image}
          name={member.name}
          className="h-32 w-32 text-3xl ring-1 ring-border sm:h-36 sm:w-36"
        />
        <div className="mt-4 font-display text-lg font-semibold leading-tight">{member.name}</div>
        <ul className="mt-1.5 space-y-0.5">
          {member.roles.map((role, i) => (
            <li key={i} className="text-sm text-muted-foreground">
              {role}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

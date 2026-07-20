import { Card, CardContent } from "@/components/ui/card";
import Avatar from "@/components/ui/Avatar";
import type { Official } from "@/domain/edition";

/** Photo-forward person card (Administration + country People). */
export default function MemberCard({ member }: { member: Official }) {
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

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Avatar from "@/components/ui/Avatar";
import MedalBadge from "@/components/ui/MedalBadge";
import type { Contestant } from "@/domain/contestant";

/** Photo-forward contestant cards for country / edition delegation team lists. */
export default function DelegationTeamCards({
  contestants,
  fieldSize,
}: {
  contestants: Contestant[];
  fieldSize: number;
}) {
  if (contestants.length === 0) {
    return <p className="text-sm text-muted-foreground">No contestants recorded.</p>;
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {contestants.map((c) => (
        <li key={`${c.slug}-${c.rank}`}>
          <Card className="h-full overflow-hidden">
            <CardContent className="flex h-full flex-col items-center p-5 text-center">
              <Avatar
                name={c.fullName}
                sizes="(max-width: 639px) 96px, 112px"
                className="h-24 w-24 text-2xl ring-1 ring-border sm:h-28 sm:w-28"
              />
              <Link
                href={`/contestants/${c.slug}`}
                className="mt-4 font-display text-base font-semibold leading-tight tracking-tight hover:underline"
              >
                {c.fullName}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground tnum">
                #{c.rank}
                <span className="text-muted-foreground/80"> / {fieldSize}</span>
              </p>
              <div className="mt-3 min-h-6">
                {c.medal ? (
                  <MedalBadge medal={c.medal} />
                ) : (
                  <span className="text-xs text-muted-foreground">No medal</span>
                )}
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

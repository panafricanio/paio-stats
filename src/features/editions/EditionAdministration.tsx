import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Official } from "@/domain/edition";

export default function EditionAdministration({
  officials,
  editionName,
}: {
  officials: Official[];
  editionName: string;
}) {
  if (officials.length === 0) {
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
    <div className="space-y-4">
      <h2 className="font-display text-2xl">Organising committee</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {officials.map((o, i) => (
          <Card key={`${o.role}-${o.name}-${i}`}>
            <CardContent className="p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {o.role}
              </div>
              <div className="mt-1 font-medium">{o.name}</div>
              {o.country && <div className="text-sm text-muted-foreground">{o.country}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

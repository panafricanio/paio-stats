import { Users } from "lucide-react";
import MemberCard from "@/components/ui/MemberCard";
import type { Official } from "@/domain/edition";

export default function CountryPeople({
  people,
  countryName,
}: {
  people: Official[];
  countryName: string;
}) {
  if (people.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
        <Users className="mb-3 h-8 w-8 text-muted-foreground" />
        <h2 className="font-display text-xl">No people recorded</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Team leaders and coaches for {countryName} have not been added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {people.length} {people.length === 1 ? "person" : "people"} associated with {countryName}.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((m, i) => (
          <MemberCard key={`${m.name}-${i}`} member={m} />
        ))}
      </div>
    </div>
  );
}

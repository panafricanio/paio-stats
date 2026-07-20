import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface Stat {
  value: React.ReactNode;
  label: string;
  accent?: string; // tailwind text color class for the value
}

export default function StatTile({ value, label, accent, className }: Stat & { className?: string }) {
  return (
    <Card className={cn("text-center", className)}>
      <CardContent className="p-4">
        <div className={cn("font-display text-2xl font-bold tnum md:text-3xl", accent)}>{value}</div>
        <div className="mt-1 text-xs text-muted-foreground md:text-sm">{label}</div>
      </CardContent>
    </Card>
  );
}

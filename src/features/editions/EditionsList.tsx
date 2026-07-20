import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { EditionListItem } from "@/services";

function Metric({ value, label, accent }: { value: number; label: string; accent?: string }) {
  return (
    <div>
      <div className={`font-display text-xl font-bold tnum ${accent ?? ""}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export default function EditionsList({ items }: { items: EditionListItem[] }) {
  return (
    <div className="grid gap-4">
      {items.map(({ edition, summary }) => (
        <Link key={edition.slug} href={`/olympiads/${edition.slug}`} className="group">
          <Card className="flex flex-col gap-4 p-6 transition-colors hover:border-foreground/30 hover:bg-accent/40 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl font-bold">{edition.year}</span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                  {edition.name}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {edition.dates}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {edition.host} · {edition.city}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex gap-4 text-center">
                <Metric value={summary.participants} label="Contestants" />
                <Metric value={summary.countriesCount} label="Countries" />
                <Metric value={summary.official.gold} label="Gold" accent="text-gold" />
                <Metric value={summary.official.silver} label="Silver" accent="text-silver" />
                <Metric value={summary.official.bronze} label="Bronze" accent="text-bronze" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

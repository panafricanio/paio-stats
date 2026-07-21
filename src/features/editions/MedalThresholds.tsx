import { Card, CardContent } from "@/components/ui/card";
import { MEDAL_LABELS, type MedalType } from "@/domain/medal";
import type { MedalThreshold } from "@/domain";

const accent: Record<MedalType, string> = {
  GOLD: "text-gold-foreground",
  SILVER: "text-silver-foreground",
  BRONZE: "text-bronze-foreground",
  HM: "text-hm-foreground",
};

export default function MedalThresholds({
  thresholds,
  maxScore,
}: {
  thresholds: MedalThreshold[];
  maxScore: number;
}) {
  if (thresholds.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 font-display text-2xl">Medal thresholds</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {thresholds.map((t) => (
          <Card key={t.medal}>
            <CardContent className="p-4">
              <div className={`text-sm font-semibold ${accent[t.medal]}`}>
                {MEDAL_LABELS[t.medal]}
              </div>
              <div className="mt-1 font-display text-2xl font-bold tnum">
                ≥ {t.cutoff}
                <span className="ml-1 text-sm font-normal text-muted-foreground">/ {maxScore}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{t.count} awarded</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        The lowest total score that earned each medal. Awards follow each edition&apos;s rank cut-offs.
      </p>
    </section>
  );
}

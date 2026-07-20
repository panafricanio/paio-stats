import { Badge } from "@/components/ui/badge";
import { MEDAL_LABELS, type MedalType } from "@/domain/medal";

const variantByMedal: Record<MedalType, "gold" | "silver" | "bronze" | "hm"> = {
  GOLD: "gold",
  SILVER: "silver",
  BRONZE: "bronze",
  HM: "hm",
};

export default function MedalBadge({ medal, className }: { medal: MedalType; className?: string }) {
  return (
    <Badge variant={variantByMedal[medal]} className={className}>
      {MEDAL_LABELS[medal]}
    </Badge>
  );
}

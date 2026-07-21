import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortDir = "asc" | "desc";

export default function SortableTableButton({
  label,
  detail,
  active,
  dir,
  align = "left",
  onClick,
}: {
  label: string;
  detail?: string;
  active: boolean;
  dir: SortDir;
  align?: "left" | "center";
  onClick: () => void;
}) {
  const Icon = !active ? ChevronsUpDown : dir === "asc" ? ChevronUp : ChevronDown;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Sort by ${label}`}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-sm font-semibold outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary-foreground/70",
        align === "center" && "mx-auto",
      )}
    >
      <span>
        <span className="block">{label}</span>
        {detail && <span className="block text-[10px] font-normal opacity-70">{detail}</span>}
      </span>
      <Icon aria-hidden="true" className={cn("h-3.5 w-3.5 shrink-0", !active && "opacity-50")} />
    </button>
  );
}

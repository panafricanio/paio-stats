import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { width: 90, height: 60, imageClassName: "h-8 w-auto", labelClassName: "text-base" },
  md: {
    width: 120,
    height: 80,
    imageClassName: "h-10 w-auto md:h-12",
    labelClassName: "text-lg",
  },
} as const;

type PaioLogoProps = {
  size?: keyof typeof sizes;
  /** When true, wraps the mark in a link to `/`. */
  href?: string | false;
  showWordmark?: boolean;
  priority?: boolean;
  className?: string;
};

/**
 * Shared PAIO brand mark (+ optional “Stats” wordmark).
 * Single source for the official logo asset and dark-mode invert.
 */
export default function PaioLogo({
  size = "md",
  href = "/",
  showWordmark = true,
  priority = false,
  className,
}: PaioLogoProps) {
  const s = sizes[size];

  const mark = (
    <>
      <Image
        src="/paio-logo.png"
        alt={showWordmark ? "" : "PAIO"}
        width={s.width}
        height={s.height}
        priority={priority}
        className={cn("dark:invert", s.imageClassName)}
      />
      {showWordmark && (
        <span
          className={cn(
            "font-display font-semibold tracking-tight text-foreground",
            s.labelClassName,
          )}
        >
          Stats
        </span>
      )}
    </>
  );

  const shellClassName = cn(
    "inline-flex min-h-11 items-center gap-2.5 rounded-md",
    className,
  );

  if (href === false) {
    return <span className={shellClassName}>{mark}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="PAIO Stats home"
      className={cn(shellClassName, "outline-none focus-visible:ring-2 focus-visible:ring-ring")}
    >
      {mark}
    </Link>
  );
}

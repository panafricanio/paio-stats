import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PAIO_OFFICIAL_URL } from "@/lib/site";

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
  /**
   * When false, neither the mark nor the wordmark is linked.
   * Otherwise the logo mark links to the official PAIO site and “Stats”
   * links to the stats home (`/`).
   */
  linked?: boolean;
  showWordmark?: boolean;
  priority?: boolean;
  className?: string;
};

/**
 * Shared PAIO brand mark (+ optional “Stats” wordmark).
 * Logo → official PAIO site; “Stats” → this archive’s home page.
 */
export default function PaioLogo({
  size = "md",
  linked = true,
  showWordmark = true,
  priority = false,
  className,
}: PaioLogoProps) {
  const s = sizes[size];

  const image = (
    <Image
      src="/paio-logo.png"
      alt={showWordmark ? "" : "PAIO"}
      width={s.width}
      height={s.height}
      priority={priority}
      className={cn("dark:invert", s.imageClassName)}
    />
  );

  const wordmark = showWordmark ? (
    <span
      className={cn(
        "font-display font-semibold tracking-tight text-foreground",
        s.labelClassName,
      )}
    >
      Stats
    </span>
  ) : null;

  const shellClassName = cn(
    "inline-flex min-h-11 items-center gap-2.5 rounded-md",
    className,
  );

  if (!linked) {
    return (
      <span className={shellClassName}>
        {image}
        {wordmark}
      </span>
    );
  }

  const focusRing =
    "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <span className={shellClassName}>
      <a
        href={PAIO_OFFICIAL_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="PAIO official website"
        className={cn("inline-flex items-center", focusRing)}
      >
        {image}
      </a>
      {wordmark && (
        <Link href="/" aria-label="PAIO Stats home" className={cn("inline-flex items-center", focusRing)}>
          {wordmark}
        </Link>
      )}
    </span>
  );
}

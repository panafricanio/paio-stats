import Link from "next/link";
import Image from "next/image";
import { primaryNavigation } from "./navigation";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground md:flex-row">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="PAIO Stats home"
          >
            <Image
              src="/paio-logo.png"
              alt=""
              width={90}
              height={60}
              className="h-8 w-auto dark:invert"
            />
            <span className="font-display font-semibold text-foreground">Stats</span>
          </Link>
          <p className="text-center sm:text-left">
            Pan-African Informatics Olympiad statistics.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

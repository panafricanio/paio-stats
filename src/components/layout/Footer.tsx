import Link from "next/link";
import { primaryNavigation } from "./navigation";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground md:flex-row">
        <p>
          PAIO Stats — Pan-African Informatics Olympiad statistics.
        </p>
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

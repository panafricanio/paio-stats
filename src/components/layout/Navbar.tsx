"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { primaryNavigation } from "./navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex min-h-11 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Image
            src="/paio-logo.png"
            alt="PAIO"
            width={48}
            height={32}
            priority
            className="h-8 w-auto dark:invert"
          />
          <span className="font-display text-lg font-semibold text-muted-foreground">Stats</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {primaryNavigation.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                isActive(l.href) ? "bg-accent text-foreground" : "text-muted-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="primary-mobile-navigation"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="primary-mobile-navigation" className="border-t border-border md:hidden">
          <div className="container flex flex-col py-2">
            {primaryNavigation.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive(l.href) ? "bg-accent text-foreground" : "text-muted-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CountryTabs({ code }: { code: string }) {
  const pathname = usePathname();
  const base = `/countries/${code}`;

  const tabs = [
    { label: "Overview", href: base },
    { label: "Results", href: `${base}/results` },
    { label: "Delegations", href: `${base}/delegations` },
    { label: "People", href: `${base}/people` },
  ];

  const isActive = (href: string) =>
    href === base ? pathname === base : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="flex gap-1 overflow-x-auto" aria-label="Country sections">
      {tabs.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={isActive(t.href) ? "page" : undefined}
          className={cn(
            "-mb-px whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors",
            isActive(t.href)
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

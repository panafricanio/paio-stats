"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function initials(name: string): string {
  const parts = name.replace(/\(.*?\)/g, "").trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/** Photo avatar that falls back to initials when there's no image or it fails to load. */
export default function Avatar({
  src,
  name,
  className,
  sizes = "144px",
}: {
  src?: string;
  name: string;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <span
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-sm font-semibold text-secondary-foreground",
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={sizes}
          quality={80}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}

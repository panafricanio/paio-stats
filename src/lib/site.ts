/**
 * Canonical public site URL for metadata, sitemap, and structured data.
 * Prefer NEXT_PUBLIC_SITE_URL in production; fall back to Vercel / localhost.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit.endsWith("/") ? explicit.slice(0, -1) : explicit);

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return new URL(`https://${vercel.replace(/^https?:\/\//, "")}`);

  return new URL("http://localhost:3000");
}

export const SITE_NAME = "PAIO Stats";
export const SITE_DESCRIPTION =
  "Statistics for the Pan-African Informatics Olympiad: editions, countries, tasks, contestants, and all-time medal records.";

/** Official PAIO organisation website (not this stats archive). */
export const PAIO_OFFICIAL_URL = "https://www.panafricanio.com/";

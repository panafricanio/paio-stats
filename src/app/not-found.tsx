import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-32 text-center">
      <p className="font-display text-6xl font-bold">404</p>
      <h1 className="mt-4 text-2xl">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        That page doesn&apos;t exist — it may have moved or never been part of the stats.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
      >
        Back home
      </Link>
    </div>
  );
}

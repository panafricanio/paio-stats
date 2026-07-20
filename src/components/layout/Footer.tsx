import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground md:flex-row">
        <p>
          PAIO Stats — Pan-African Informatics Olympiad statistics.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/olympiads" className="hover:text-foreground">
            Editions
          </Link>
          <Link href="/countries" className="hover:text-foreground">
            Countries
          </Link>
          <Link href="/tasks" className="hover:text-foreground">
            Tasks
          </Link>
        </div>
      </div>
    </footer>
  );
}

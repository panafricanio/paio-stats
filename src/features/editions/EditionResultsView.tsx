import EditionScoreboard, { type ScoreboardTask } from "@/features/editions/EditionScoreboard";
import type { ScoreRow } from "@/services";
import { cn } from "@/lib/utils";

/**
 * Results layout: Official / Guests / Unofficial as separate tables.
 * Online vs on-site is a Venue column inside each table, not a top-level section split.
 */
const SECTIONS = [
  {
    id: "official",
    title: "Official Contestants",
    navLabel: "Official",
    description: "Official team members. Medals count toward country rankings.",
    filter: (r: ScoreRow) => r.status === "official",
  },
  {
    id: "guests",
    title: "Guests",
    navLabel: "Guests",
    description: "Invited teams recognised individually; medals do not count toward country rankings.",
    filter: (r: ScoreRow) => r.status === "guest",
  },
  {
    id: "unofficial",
    title: "Unofficial Contestants",
    navLabel: "Unofficial",
    description: "Additional participants shown for completeness; not ranked for medals.",
    filter: (r: ScoreRow) => r.status === "unofficial",
  },
] as const;

export default function EditionResultsView({
  rows,
  tasks,
  days,
  idPrefix = "",
}: {
  rows: ScoreRow[];
  tasks: ScoreboardTask[];
  days: number[];
  /** Prefix section ids when multiple result views share a page (e.g. country results). */
  idPrefix?: string;
}) {
  const sections = SECTIONS.map((section) => ({
    ...section,
    anchor: `${idPrefix}${section.id}`,
    rows: rows.filter(section.filter).sort((a, b) => a.rank - b.rank),
  })).filter((section) => section.rows.length > 0);

  if (sections.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Results for this edition have not been published yet.
      </p>
    );
  }

  const showJumpNav = sections.length > 1;

  return (
    <div className="space-y-10">
      {showJumpNav && (
        <nav
          aria-label="Jump to scoreboard"
          className={cn(
            "sticky top-28 z-30 -mx-4 border-b border-border/70 bg-background/90 px-4 py-2.5 backdrop-blur",
            "supports-[backdrop-filter]:bg-background/80 sm:-mx-0 sm:px-0",
          )}
        >
          <ul className="flex flex-wrap items-baseline gap-x-1 gap-y-2 text-sm">
            {sections.map((section, index) => (
              <li key={section.id} className="flex items-baseline">
                {index > 0 && (
                  <span className="mx-2.5 text-border select-none" aria-hidden>
                    ·
                  </span>
                )}
                <a
                  href={`#${section.anchor}`}
                  className="group inline-flex items-baseline gap-1.5 rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="font-medium underline-offset-4 group-hover:underline group-focus-visible:underline">
                    {section.navLabel}
                  </span>
                  <span className="tnum text-xs text-muted-foreground/80">
                    {section.rows.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {sections.map((section) => (
        <section key={section.id} id={section.anchor} className="scroll-mt-36 space-y-4">
          <div>
            <h2 className="font-display text-2xl tracking-tight">{section.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {section.description}{" "}
              <span className="tnum">
                ({section.rows.length} contestant{section.rows.length === 1 ? "" : "s"})
              </span>
            </p>
          </div>
          <EditionScoreboard
            rows={section.rows}
            tasks={tasks}
            days={days}
            showStatusBadges={false}
            showVenueColumn
            caption={`${section.title} scoreboard for this PAIO edition.`}
          />
        </section>
      ))}
    </div>
  );
}

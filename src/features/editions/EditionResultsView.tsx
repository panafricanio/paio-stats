import EditionScoreboard, { type ScoreboardTask } from "@/features/editions/EditionScoreboard";
import type { ScoreRow } from "@/services";
import { cn } from "@/lib/utils";

/**
 * Results layout (committee priority):
 * - On-site and Online are separate boards on the same page (never mixed in one table).
 * - On-site comes first when both exist.
 * - Official / Guests / Unofficial nest under each venue.
 * - Ranks are shown as published in the data (no recalculation).
 * - Single-venue editions skip the venue chrome and only show status boards.
 */

const VENUES = [
  {
    id: "onsite",
    title: "On-site",
    navLabel: "On-site",
    description: "Contestants who competed in person.",
    venue: "onsite" as const,
  },
  {
    id: "online",
    title: "Online",
    navLabel: "Online",
    description: "Contestants who competed online.",
    venue: "online" as const,
  },
] as const;

const STATUSES = [
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

type JumpItem = { id: string; anchor: string; navLabel: string; count: number };

function JumpNav({ items }: { items: JumpItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Jump to scoreboard"
      className={cn(
        "sticky top-28 z-30 -mx-4 border-b border-border/70 bg-background/90 px-4 py-2.5 backdrop-blur",
        "supports-[backdrop-filter]:bg-background/80 sm:-mx-0 sm:px-0",
      )}
    >
      <ul className="flex flex-wrap items-baseline gap-x-1 gap-y-2 text-sm">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-baseline">
            {index > 0 && (
              <span className="mx-2.5 text-border select-none" aria-hidden>
                ·
              </span>
            )}
            <a
              href={`#${item.anchor}`}
              className="group inline-flex items-baseline gap-1.5 rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="font-medium underline-offset-4 group-hover:underline group-focus-visible:underline">
                {item.navLabel}
              </span>
              <span className="tnum text-xs text-muted-foreground/80">{item.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function StatusBoard({
  title,
  description,
  anchor,
  headingLevel,
  rows,
  tasks,
  days,
}: {
  title: string;
  description: string;
  anchor: string;
  headingLevel: "h2" | "h3";
  rows: ScoreRow[];
  tasks: ScoreboardTask[];
  days: number[];
}) {
  const Heading = headingLevel;

  return (
    <section id={anchor} className="scroll-mt-36 space-y-4">
      <div>
        <Heading
          className={
            headingLevel === "h2"
              ? "font-display text-2xl tracking-tight"
              : "font-display text-xl tracking-tight"
          }
        >
          {title}
        </Heading>
        <p className="mt-1 text-sm text-muted-foreground">
          {description}{" "}
          <span className="tnum">
            ({rows.length} contestant{rows.length === 1 ? "" : "s"})
          </span>
        </p>
      </div>
      <EditionScoreboard
        rows={rows}
        tasks={tasks}
        days={days}
        showStatusBadges={false}
        caption={`${title} scoreboard for this PAIO edition.`}
      />
    </section>
  );
}

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
  const venueChapters = VENUES.map((venue) => {
    const venueRows = rows.filter((r) => r.venue === venue.venue);
    const statuses = STATUSES.map((status) => {
      const statusRows = venueRows.filter(status.filter).sort((a, b) => a.rank - b.rank);
      return {
        ...status,
        anchor: `${idPrefix}${venue.id}-${status.id}`,
        rows: statusRows,
      };
    }).filter((status) => status.rows.length > 0);

    return {
      ...venue,
      anchor: `${idPrefix}${venue.id}`,
      count: venueRows.length,
      statuses,
    };
  }).filter((chapter) => chapter.statuses.length > 0);

  if (venueChapters.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Results for this edition have not been published yet.
      </p>
    );
  }

  const multiVenue = venueChapters.length > 1;

  const jumpItems: JumpItem[] = multiVenue
    ? venueChapters.map((chapter) => ({
        id: chapter.id,
        anchor: chapter.anchor,
        navLabel: chapter.navLabel,
        count: chapter.count,
      }))
    : venueChapters[0].statuses.map((status) => ({
        id: status.id,
        anchor: status.anchor,
        navLabel: status.navLabel,
        count: status.rows.length,
      }));

  return (
    <div className="space-y-10">
      <JumpNav items={jumpItems} />

      {multiVenue
        ? venueChapters.map((chapter) => (
            <section key={chapter.id} id={chapter.anchor} className="scroll-mt-36 space-y-8">
              <div className="border-b border-border pb-4">
                <h2 className="font-display text-3xl tracking-tight">{chapter.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {chapter.description}{" "}
                  <span className="tnum">
                    ({chapter.count} contestant{chapter.count === 1 ? "" : "s"})
                  </span>
                </p>
              </div>
              <div className="space-y-10">
                {chapter.statuses.map((status) => (
                  <StatusBoard
                    key={status.id}
                    title={status.title}
                    description={status.description}
                    anchor={status.anchor}
                    headingLevel="h3"
                    rows={status.rows}
                    tasks={tasks}
                    days={days}
                  />
                ))}
              </div>
            </section>
          ))
        : venueChapters[0].statuses.map((status) => (
            <StatusBoard
              key={status.id}
              title={status.title}
              description={status.description}
              anchor={status.anchor}
              headingLevel="h2"
              rows={status.rows}
              tasks={tasks}
              days={days}
            />
          ))}
    </div>
  );
}

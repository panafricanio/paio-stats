import EditionScoreboard, { type ScoreboardTask } from "@/features/editions/EditionScoreboard";
import type { ScoreRow } from "@/services";
import { cn } from "@/lib/utils";

/**
 * Results layout:
 * - Official contestants: On-site and Online stay separate (On-site first).
 * - Guests and Unofficial: one table each for the whole edition.
 * - Ranks are shown as published in the data (no recalculation).
 * - Single-venue editions skip the venue chrome and show Official, then Guests, then Unofficial.
 */

const VENUES = [
  {
    id: "onsite",
    title: "On-site",
    navLabel: "On-site",
    venue: "onsite" as const,
  },
  {
    id: "online",
    title: "Online",
    navLabel: "Online",
    venue: "online" as const,
  },
] as const;

const MERGED_STATUSES = [
  {
    id: "guests",
    title: "Guests",
    navLabel: "Guests",
    filter: (r: ScoreRow) => r.status === "guest",
  },
  {
    id: "unofficial",
    title: "Unofficial",
    navLabel: "Unofficial",
    filter: (r: ScoreRow) => r.status === "unofficial",
  },
] as const;

type JumpItem = { id: string; anchor: string; navLabel: string; count: number };

function spansBothVenues(rows: ScoreRow[]): boolean {
  const venues = new Set(rows.map((r) => r.venue));
  return venues.has("onsite") && venues.has("online");
}

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
  anchor,
  headingLevel,
  rows,
  tasks,
  days,
  showVenue = false,
}: {
  title: string;
  anchor: string;
  headingLevel: "h2" | "h3";
  rows: ScoreRow[];
  tasks: ScoreboardTask[];
  days: number[];
  showVenue?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <section id={anchor} className="scroll-mt-36 space-y-3">
      <Heading
        className={
          headingLevel === "h2"
            ? "font-display text-2xl tracking-tight"
            : "font-display text-xl tracking-tight"
        }
      >
        {title}{" "}
        <span className="tnum text-muted-foreground">({rows.length})</span>
      </Heading>
      <EditionScoreboard
        rows={rows}
        tasks={tasks}
        days={days}
        showStatusBadges={false}
        showVenue={showVenue}
        caption={title}
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
    const officialRows = rows
      .filter((r) => r.venue === venue.venue && r.status === "official")
      .sort((a, b) => a.rank - b.rank);

    return {
      ...venue,
      anchor: `${idPrefix}${venue.id}`,
      rows: officialRows,
    };
  }).filter((chapter) => chapter.rows.length > 0);

  const mergedBoards = MERGED_STATUSES.map((status) => {
    const statusRows = rows.filter(status.filter).sort((a, b) => a.rank - b.rank);
    return {
      ...status,
      anchor: `${idPrefix}${status.id}`,
      rows: statusRows,
      showVenue: spansBothVenues(statusRows),
    };
  }).filter((board) => board.rows.length > 0);

  if (venueChapters.length === 0 && mergedBoards.length === 0) {
    return <p className="text-sm text-muted-foreground">No results published yet.</p>;
  }

  const multiVenue = venueChapters.length > 1;

  const jumpItems: JumpItem[] = multiVenue
    ? [
        ...venueChapters.map((chapter) => ({
          id: chapter.id,
          anchor: chapter.anchor,
          navLabel: chapter.navLabel,
          count: chapter.rows.length,
        })),
        ...mergedBoards.map((board) => ({
          id: board.id,
          anchor: board.anchor,
          navLabel: board.navLabel,
          count: board.rows.length,
        })),
      ]
    : [
        ...(venueChapters[0]
          ? [
              {
                id: "official",
                anchor: `${idPrefix}official`,
                navLabel: "Official",
                count: venueChapters[0].rows.length,
              },
            ]
          : []),
        ...mergedBoards.map((board) => ({
          id: board.id,
          anchor: board.anchor,
          navLabel: board.navLabel,
          count: board.rows.length,
        })),
      ];

  return (
    <div className="space-y-8">
      <JumpNav items={jumpItems} />

      {multiVenue
        ? venueChapters.map((chapter) => (
            <section key={chapter.id} id={chapter.anchor} className="scroll-mt-36 space-y-3">
              <h2 className="font-display text-2xl tracking-tight">
                {chapter.title}{" "}
                <span className="tnum text-muted-foreground">({chapter.rows.length})</span>
              </h2>
              <EditionScoreboard
                rows={chapter.rows}
                tasks={tasks}
                days={days}
                showStatusBadges={false}
                caption={chapter.title}
              />
            </section>
          ))
        : venueChapters[0] && (
            <StatusBoard
              title="Official"
              anchor={`${idPrefix}official`}
              headingLevel="h2"
              rows={venueChapters[0].rows}
              tasks={tasks}
              days={days}
            />
          )}

      {mergedBoards.map((board) => (
        <StatusBoard
          key={board.id}
          title={board.title}
          anchor={board.anchor}
          headingLevel="h2"
          rows={board.rows}
          tasks={tasks}
          days={days}
          showVenue={board.showVenue}
        />
      ))}
    </div>
  );
}

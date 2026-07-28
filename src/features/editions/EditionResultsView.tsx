import EditionScoreboard, { type ScoreboardTask } from "@/features/editions/EditionScoreboard";
import type { ScoreRow } from "@/services";

/**
 * PAMO-style results layout: Official / Guests / Unofficial as separate tables.
 * Online vs on-site is a Venue column inside each table (like PAMO’s PAMOG column),
 * not a top-level section split.
 */
const SECTIONS = [
  {
    id: "official",
    title: "Official Contestants",
    description: "Official team members. Medals count toward country rankings.",
    filter: (r: ScoreRow) => r.status === "official",
  },
  {
    id: "guests",
    title: "Guests",
    description: "Invited teams recognised individually; medals do not count toward country rankings.",
    filter: (r: ScoreRow) => r.status === "guest",
  },
  {
    id: "unofficial",
    title: "Unofficial Contestants",
    description: "Additional participants shown for completeness; not ranked for medals.",
    filter: (r: ScoreRow) => r.status === "unofficial",
  },
] as const;

export default function EditionResultsView({
  rows,
  tasks,
  days,
}: {
  rows: ScoreRow[];
  tasks: ScoreboardTask[];
  days: number[];
}) {
  const sections = SECTIONS.map((section) => ({
    ...section,
    rows: rows.filter(section.filter).sort((a, b) => a.rank - b.rank),
  })).filter((section) => section.rows.length > 0);

  if (sections.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Results for this edition have not been published yet.
      </p>
    );
  }

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.id} className="space-y-4">
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

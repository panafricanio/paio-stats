import EditionScoreboard, { type ScoreboardTask } from "@/features/editions/EditionScoreboard";
import type { ScoreRow } from "@/services";

const SECTIONS = [
  {
    id: "online",
    title: "Online",
    description: "Official contestants who competed online.",
    filter: (r: ScoreRow) => r.status === "official" && r.venue === "online",
    showStatusBadges: false,
  },
  {
    id: "onsite",
    title: "On-site",
    description: "Official contestants who competed in person.",
    filter: (r: ScoreRow) => r.status === "official" && r.venue === "onsite",
    showStatusBadges: false,
  },
  {
    id: "guests",
    title: "Guests",
    description: "Invited teams recognised individually; medals do not count toward country rankings.",
    filter: (r: ScoreRow) => r.status === "guest",
    showStatusBadges: false,
  },
  {
    id: "unofficial",
    title: "Unofficial",
    description: "Additional participants shown for completeness; not ranked for medals.",
    filter: (r: ScoreRow) => r.status === "unofficial",
    showStatusBadges: false,
  },
] as const;

/**
 * Edition results split into Online / On-site / Guests / Unofficial scoreboards.
 * Empty sections are omitted so a fully online edition only shows Online (+ guests/unofficial).
 */
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
      <p className="text-sm text-muted-foreground">
        Results are grouped by participation mode and status. Places are ranks in the full edition
        field
        {sections.length > 1 ? "; each group is listed separately below" : ""}.
      </p>

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
            showStatusBadges={section.showStatusBadges}
            caption={`${section.title} scoreboard for this PAIO edition.`}
          />
        </section>
      ))}
    </div>
  );
}

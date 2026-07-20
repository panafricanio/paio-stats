import type { Metadata } from "next";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import EditionsTable from "@/features/editions/EditionsTable";

export const metadata: Metadata = {
  title: "Editions",
  description: "All editions of the Pan-African Informatics Olympiad.",
};

export default async function OlympiadsPage() {
  const rows = await statsService.listEditionRows();

  return (
    <div>
      <PageHeader
        title="Editions"
        subtitle="Every edition of the Pan-African Informatics Olympiad. Select a year for its full scoreboard, medals and per-task scores."
      />
      <div className="container py-10">
        <EditionsTable rows={rows} />
      </div>
    </div>
  );
}

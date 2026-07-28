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
        subtitle="Every PAIO edition with its scoreboard, medals, and task scores."
      />
      <div className="container py-10">
        <EditionsTable rows={rows} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import EditionsList from "@/features/editions/EditionsList";

export const metadata: Metadata = {
  title: "Editions",
  description: "All editions of the Pan-African Informatics Olympiad.",
};

export default async function OlympiadsPage() {
  const items = await statsService.listEditionItems();

  return (
    <div>
      <PageHeader
        title="Editions"
        subtitle="Every edition of the Pan-African Informatics Olympiad. Select one for the full scoreboard, medals and per-task scores."
      />
      <div className="container py-10">
        <EditionsList items={items} />
      </div>
    </div>
  );
}

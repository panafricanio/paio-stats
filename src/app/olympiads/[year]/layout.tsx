import { notFound } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";
import { statsService } from "@/services";
import PageHeader from "@/components/ui/PageHeader";
import EditionTabs from "@/features/editions/EditionTabs";

export default async function EditionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const edition = await statsService.getEdition(year);
  if (!edition) notFound();

  return (
    <div>
      <PageHeader
        title={edition.name}
        subtitle={
          <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {edition.dates}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {edition.host} · {edition.city}
            </span>
            <span>{edition.format}</span>
          </span>
        }
      />
      <div className="sticky top-16 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="container">
          <EditionTabs slug={year} />
        </div>
      </div>
      <div className="container py-10">{children}</div>
    </div>
  );
}

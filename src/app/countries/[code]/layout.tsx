import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import PageHeader from "@/components/ui/PageHeader";
import CountryTabs from "@/features/countries/CountryTabs";

export default async function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const country = getCountryByCode(code);
  if (!country) notFound();

  return (
    <div>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl">{country.flag}</span>
            {country.name}
          </span>
        }
      />
      <div className="sticky top-16 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="container">
          <CountryTabs code={code} />
        </div>
      </div>
      <div className="container py-10">{children}</div>
    </div>
  );
}

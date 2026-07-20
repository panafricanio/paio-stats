import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { statsService } from "@/services";
import { getCountryByCode } from "@/data/countries";
import CountryPeople from "@/features/countries/CountryPeople";

export async function generateStaticParams() {
  const countries = await statsService.listCountries();
  return countries.map((c) => ({ code: c.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const country = getCountryByCode(code);
  return { title: country ? `${country.name} · People` : "People" };
}

export default async function CountryPeoplePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const detail = await statsService.getCountryDetail(code);
  if (!detail) notFound();
  return <CountryPeople people={detail.people} countryName={detail.country.name} />;
}

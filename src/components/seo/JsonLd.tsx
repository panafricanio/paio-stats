import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

/** WebSite + Organization JSON-LD so search engines can identify the site. */
export default function JsonLd() {
  const base = getSiteUrl().origin;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "Pan-African Informatics Olympiad",
        alternateName: "PAIO",
        url: base,
        logo: `${base}/paio-logo.png`,
        description: SITE_DESCRIPTION,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

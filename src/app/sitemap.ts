import type { MetadataRoute } from "next";
import { statsService } from "@/services";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().origin;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/olympiads`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/countries`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tasks`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/hall-of-fame`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const [editions, countries, contestantSlugs, taskParams] = await Promise.all([
    statsService.listEditions(),
    statsService.listCountries(),
    statsService.getAllContestantSlugs(),
    statsService.getTaskParams(),
  ]);

  const editionRoutes: MetadataRoute.Sitemap = editions.flatMap((edition) => {
    const root = `${base}/olympiads/${edition.slug}`;
    const routes: MetadataRoute.Sitemap = [
      { url: root, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
      { url: `${root}/administration`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    ];
    if (edition.contestants.length > 0) {
      routes.push(
        { url: `${root}/results`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${root}/delegations`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${root}/countries`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
      );
    }
    if (edition.tasks.length > 0) {
      routes.push({
        url: `${root}/tasks`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    return routes;
  });

  const countryRoutes: MetadataRoute.Sitemap = countries.flatMap((c) => {
    const root = `${base}/countries/${c.code}`;
    return [
      { url: root, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
      { url: `${root}/results`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
      { url: `${root}/delegations`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
      { url: `${root}/people`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    ];
  });

  const taskRoutes: MetadataRoute.Sitemap = taskParams.map(({ year, task }) => ({
    url: `${base}/tasks/${year}/${task}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const contestantRoutes: MetadataRoute.Sitemap = contestantSlugs.map((slug) => ({
    url: `${base}/contestants/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...editionRoutes, ...countryRoutes, ...taskRoutes, ...contestantRoutes];
}

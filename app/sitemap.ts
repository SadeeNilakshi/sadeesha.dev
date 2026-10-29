import type { MetadataRoute } from "next";
import { caseStudies } from "./data/caseStudies";
import { site } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Only published case studies (drafts never reach search engines)
    ...caseStudies
      .filter((cs) => cs.published)
      .map((cs) => ({
        url: `${site.url}/work/${cs.slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.8,
      })),
  ];
}

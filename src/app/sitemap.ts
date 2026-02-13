import type { MetadataRoute } from "next";

import { milemendContent } from "@/content/milemend";

const siteUrl = "https://www.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/platform", "/solutions", "/resources", "/company/about", "/contact"];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const resourceEntries: MetadataRoute.Sitemap = milemendContent.resourcesPage.items.map((item) => ({
    url: `${siteUrl}/resources/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...resourceEntries];
}


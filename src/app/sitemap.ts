import type { MetadataRoute } from "next";
import { getAllContent, hrefFor } from "@/lib/content";
import { toolLinks } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "http://localhost:3000";
  const staticRoutes = [
    "",
    "/learn",
    "/scenarios",
    "/denials",
    "/ecw",
    "/tools",
    "/references",
    "/references/insurance-phones",
    "/references/tfl-sheet",
    "/references/medicare-phones-forms",
    ...toolLinks.map((t) => t.href),
  ];

  const contentRoutes = getAllContent().map((item) => hrefFor(item));

  return [...staticRoutes, ...contentRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}

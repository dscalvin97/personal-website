import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://calvin.makes.fyi";
  const routes = ["/", "/developer/", "/studio/", "/craft/", "/templates/"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
  }));
}

// Required under output:"export" (build-time check in Next 16).
export const dynamic = "force-static";

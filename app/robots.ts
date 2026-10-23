import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://calvin.makes.fyi/sitemap.xml",
  };
}

// Required under output:"export" (build-time check in Next 16).
export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://therusticroast.ca";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/checkout", "/order-confirmation"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

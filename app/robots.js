import { site } from "../lib/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/publish"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

import { site } from "../lib/site";

export default function sitemap() {
  return ["", "/catalog", "/contact", "/legal", "/privacy", "/terms"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
  }));
}

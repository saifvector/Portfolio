import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  if (!base) return [];
  const paths = ["", "/projects", "/about", "/contact", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((p) => ({ url: `${base}${p}` }));
}

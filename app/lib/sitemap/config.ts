import path from "node:path";
import type { MetadataRoute } from "next";

export type SitemapEntry = MetadataRoute.Sitemap[number];
export type SitemapEntryDefaults = Pick<
  SitemapEntry,
  "changeFrequency" | "priority"
>;

export type StaticRoute = {
  pathname: string;
  lastModified: Date;
};

export const APP_DIRECTORY = path.join(process.cwd(), "app");

export const PAGE_FILE_NAMES = new Set([
  "page.js",
  "page.jsx",
  "page.md",
  "page.mdx",
  "page.ts",
  "page.tsx",
]);

export const DEFAULT_STATIC_ROUTE_DEFAULTS = {
  changeFrequency: "monthly",
  priority: 0.6,
} satisfies SitemapEntryDefaults;

export const POST_ROUTE_DEFAULTS = {
  changeFrequency: "monthly",
  priority: 0.7,
} satisfies SitemapEntryDefaults;

import { siteConfig, siteRoutes } from "@/app/config";
import type { PostSummary } from "@/app/lib/posts";
import {
  DEFAULT_STATIC_ROUTE_DEFAULTS,
  POST_ROUTE_DEFAULTS,
  type SitemapEntry,
  type SitemapEntryDefaults,
  type StaticRoute,
} from "@/app/lib/sitemap/config";

function getSiteRoute(pathname: string) {
  return siteRoutes.find((route) => route.href === pathname);
}

export function createUrl(pathname: string) {
  return new URL(pathname, siteConfig.url).toString();
}

export function getStaticRouteDefaults(pathname: string): SitemapEntryDefaults {
  const sitemap = getSiteRoute(pathname)?.sitemap;

  return {
    changeFrequency:
      sitemap?.changeFrequency ?? DEFAULT_STATIC_ROUTE_DEFAULTS.changeFrequency,
    priority: sitemap?.priority ?? DEFAULT_STATIC_ROUTE_DEFAULTS.priority,
  };
}

function isRouteUpdatedByPosts(pathname: string) {
  return getSiteRoute(pathname)?.sitemap?.updatedByPosts === true;
}

export function getLatestDate(dateA: Date, dateB?: string) {
  if (!dateB) {
    return dateA;
  }

  const parsedDateB = new Date(dateB);

  if (Number.isNaN(parsedDateB.valueOf())) {
    return dateA;
  }

  return parsedDateB > dateA ? parsedDateB : dateA;
}

export function createStaticSitemapEntries(
  staticRoutes: StaticRoute[],
  latestPostDate?: string,
): SitemapEntry[] {
  return staticRoutes
    .map((route): SitemapEntry => ({
      url: createUrl(route.pathname),
      lastModified: isRouteUpdatedByPosts(route.pathname)
        ? getLatestDate(route.lastModified, latestPostDate)
        : route.lastModified,
      ...getStaticRouteDefaults(route.pathname),
    }))
    .sort((routeA, routeB) => routeA.url.localeCompare(routeB.url));
}

export function createPostSitemapEntries(posts: PostSummary[]): SitemapEntry[] {
  return posts.map(
    (post): SitemapEntry => ({
      url: createUrl(`/posts/${post.slug}`),
      lastModified: post.updatedAt ?? post.publishedAt,
      ...POST_ROUTE_DEFAULTS,
    }),
  );
}

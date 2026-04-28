import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import {
  APP_DIRECTORY,
  PAGE_FILE_NAMES,
  type StaticRoute,
} from "@/app/lib/sitemap/config";

function isPageFile(fileName: string) {
  return PAGE_FILE_NAMES.has(fileName);
}

function normalizeRouteSegment(segment: string) {
  if (
    segment.startsWith(".") ||
    segment.startsWith("_") ||
    segment.startsWith("@") ||
    segment.startsWith("[")
  ) {
    return null;
  }

  if (segment.startsWith("(") && segment.endsWith(")")) {
    return "";
  }

  return segment;
}

function createPathname(segments: string[]) {
  return segments.length > 0 ? `/${segments.join("/")}` : "/";
}

export async function getStaticRoutes(
  directory = APP_DIRECTORY,
  segments: string[] = [],
): Promise<StaticRoute[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const pageEntry = entries.find(
    (entry) => entry.isFile() && isPageFile(entry.name),
  );
  const routes: StaticRoute[] = [];

  if (pageEntry) {
    const pageStats = await stat(path.join(directory, pageEntry.name));

    routes.push({
      pathname: createPathname(segments),
      lastModified: pageStats.mtime,
    });
  }

  const childRoutes = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const routeSegment = normalizeRouteSegment(entry.name);

        if (routeSegment === null) {
          return [];
        }

        const nextSegments =
          routeSegment.length > 0 ? [...segments, routeSegment] : segments;

        return getStaticRoutes(path.join(directory, entry.name), nextSegments);
      }),
  );

  return [...routes, ...childRoutes.flat()];
}

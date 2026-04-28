import type { MetadataRoute } from "next";
import { getPostLastModified, getPosts } from "@/app/lib/posts";
import { getStaticRoutes } from "@/app/lib/sitemap/scanner";
import {
  createPostSitemapEntries,
  createStaticSitemapEntries,
} from "@/app/lib/sitemap/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, staticRoutes] = await Promise.all([
    getPosts(),
    getStaticRoutes(),
  ]);
  const latestPostDate = posts.reduce<string | undefined>((latestDate, post) => {
    const postDate = getPostLastModified(post);

    if (!latestDate) {
      return postDate;
    }

    return new Date(postDate) > new Date(latestDate) ? postDate : latestDate;
  }, undefined);

  const pageEntries = createStaticSitemapEntries(staticRoutes, latestPostDate);
  const postEntries = createPostSitemapEntries(posts);

  return [...pageEntries, ...postEntries];
}

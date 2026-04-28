import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  cover?: string;
};

type PostModule = {
  metadata: Omit<PostSummary, "slug">;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

const postDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(date: string) {
  return postDateFormatter.format(new Date(date));
}

export function getPostLastModified(post: PostSummary) {
  return post.updatedAt ?? post.publishedAt;
}

async function importPostModule(slug: string): Promise<PostModule> {
  return import(`@/content/posts/${slug}.mdx`) as Promise<PostModule>;
}

export const getPosts = cache(async (): Promise<PostSummary[]> => {
  const entries = await readdir(postsDirectory, { withFileTypes: true });
  const slugs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const postModule = await importPostModule(slug);

      return {
        slug,
        ...postModule.metadata,
      };
    }),
  );

  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export const getPostBySlug = cache(async (slug: string) => {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
});

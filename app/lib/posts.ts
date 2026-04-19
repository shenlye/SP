import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  dateTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  coverImageAlt?: string;
};

type PostModule = {
  metadata: Omit<PostSummary, "slug">;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

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

  return posts.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
});

export const getPostBySlug = cache(async (slug: string) => {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
});

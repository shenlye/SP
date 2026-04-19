import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/app/components/article-card";
import { getPosts } from "@/app/lib/posts";

export const metadata: Metadata = {
  title: "Posts | Save Point",
  description: "Notes on building this site, shaping the UI, and keeping the stack readable.",
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        <Link
          href="/"
          className="font-mono text-xs text-muted transition-colors duration-200 hover:text-foreground"
        >
          Back Home
        </Link>

        <div className="mt-6 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-muted">
            Archive
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            Posts
          </h1>
          <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
            Long-form notes, setup decisions, and the small implementation details
            I want to be able to find again later.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </main>
  );
}

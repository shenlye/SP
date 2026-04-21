import type { Metadata } from "next";
import { ArticleCard } from "@/app/components/article-card";
import { CityParallaxPage } from "@/app/components/city-parallax-page";
import { getPosts } from "@/app/lib/posts";

export const metadata: Metadata = {
  title: "Posts | Save Point",
  description: "Notes on building this site, shaping the UI, and keeping the stack readable.",
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CityParallaxPage
        title="Posts"
        description="Long-form notes about the site, interface experiments, and the implementation details I want to keep close at hand."
        meta={`${posts.length} archived notes`}
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        <div className="space-y-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </main>
  );
}

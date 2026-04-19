import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/app/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Save Point",
    };
  }

  return {
    title: `${post.title} | Save Point`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <Link
          href="/posts"
          className="font-mono text-xs text-muted transition-colors duration-200 hover:text-foreground"
        >
          Back to posts
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]  text-muted">
            <span className="border border-border px-2 py-1 text-foreground ">
              {post.category}
            </span>
            <time dateTime={post.dateTime}>{post.date}</time>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl font-semibold leading-tight tracking-[-0.05em]">
            {post.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {post.description}
          </p>
        </header>

        <div className="mt-10">
          <Post />
        </div>
      </div>
    </main>
  );
}

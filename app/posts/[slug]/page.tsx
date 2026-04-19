import type { Metadata } from "next";
import Image from "next/image";
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
  const postMeta = (
    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted">
      <span className="border border-border px-2 py-1 text-foreground">
        {post.category}
      </span>
      <time dateTime={post.dateTime}>{post.date}</time>
    </div>
  );

  const postHeading = (
    <>
      {postMeta}
      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl md:text-5xl">
        {post.title}
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
        {post.description}
      </p>
    </>
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-6 pt-12 sm:px-8 sm:pt-16">
        <Link
          href="/posts"
          className="font-mono text-xs text-muted transition-colors duration-200 hover:text-foreground"
        >
          Back to posts
        </Link>
      </div>

      {post.coverImage ? (
        <header className="relative mt-8 w-full overflow-hidden border-y border-border">
          <div className="relative aspect-21/9 w-full min-h-[50svh] sm:min-h-80">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto w-full max-w-5xl px-6 pb-4 sm:px-8 sm:pb-8">
                <div className="max-w-3xl bg-background/88 p-4 backdrop-blur-sm sm:p-6">
                  {postHeading}
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <div className="mx-auto w-full max-w-5xl px-6 pt-8 sm:px-8">
          <header className="border-b border-border pb-8">
            {postHeading}
          </header>
        </div>
      )}

      <article className="mx-auto w-full max-w-5xl px-6 pb-12 pt-10 sm:px-8 sm:pb-16">
        <div className="mx-auto w-full max-w-3xl">
          <Post />
        </div>
      </article>
    </main>
  );
}

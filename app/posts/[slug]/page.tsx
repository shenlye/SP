import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatPostDate, getPostBySlug, getPosts } from "@/app/lib/posts";

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
    <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted sm:text-[11px]">
      <span className="px-2 py-0.5 text-brand">
        {post.category}
      </span>
      <time dateTime={post.publishedAt} className="px-1 py-0.5">
        {formatPostDate(post.publishedAt)}
      </time>
      {post.updatedAt ? (
        <time dateTime={post.updatedAt} className="px-1 py-0.5">
          Updated {formatPostDate(post.updatedAt)}
        </time>
      ) : null}
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-6 pt-6 sm:px-8 sm:pt-8">
        <header className="mx-auto max-w-3xl border-b border-border pb-8">
          {postMeta}
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {post.cover ? (
            <div className="mt-7 border border-border bg-surface p-2">
              <div className="relative aspect-video max-h-92 w-full overflow-hidden bg-background/40">
                <Image
                  src={post.cover}
                  alt=""
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 48rem, calc(100vw - 3rem)"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </header>
      </div>

      <article className="mx-auto w-full max-w-5xl px-6 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-9">
        <div className="mx-auto w-full max-w-185">
          <Post />
        </div>
      </article>
    </main>
  );
}

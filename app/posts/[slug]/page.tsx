import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted sm:text-[11px]">
      <span className="px-2 py-0.5 text-foreground">
        {post.category}
      </span>
      <time dateTime={post.dateTime} className="px-1 py-0.5">
        {post.date}
      </time>
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {post.coverImage ? (
        <div className="mx-auto w-full max-w-5xl sm:px-8 sm:pt-8">
          <header className="mx-auto w-full max-w-3xl">
            <div className="relative overflow-hidden border border-border bg-surface">
              <div className="relative aspect-16/10 max-h-84 w-full sm:aspect-video sm:max-h-96">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt ?? post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48rem, 100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/68 via-black/18 to-transparent" />

                <div className="absolute inset-x-0 top-0 p-3">
                  <div className="[&_span]:text-white [&_time]:text-white/88 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                    {postMeta}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 py-2 px-4">
                  <h1
                    className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.05em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:text-4xl md:text-5xl"
                  >
                    {post.title}
                  </h1>
                </div>
              </div>
            </div>

          </header>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-5xl px-6 pt-6 sm:px-8 sm:pt-8">
          <header className="mx-auto max-w-3xl border-b border-border pb-7">
            {postMeta}
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
          </header>
        </div>
      )}

      <article className="mx-auto w-full max-w-5xl px-6 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-9">
        <div className="mx-auto w-full max-w-3xl">
          <Post />
        </div>
      </article>
    </main>
  );
}

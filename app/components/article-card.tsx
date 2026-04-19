import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { PostSummary } from "@/app/lib/posts";

type ArticleCardProps = PostSummary & {
  className?: string;
};

export function ArticleCard({
  slug,
  title,
  excerpt,
  date,
  dateTime,
  category,
  tags,
  coverImage,
  coverImageAlt,
  className,
}: ArticleCardProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      className={clsx(
        "group relative block w-full border-2 border-black bg-surface transition-colors duration-200 hover:border-white",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1  bg-[linear-gradient(90deg,#6FFDC4,#FFFA6D)] transition-colors duration-200 " />

      <div className="relative z-10 grid grid-cols-1 overflow-hidden bg-surface md:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="order-2 min-w-0 p-4 md:order-1 md:p-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-muted sm:text-[11px]">
              <span className="border border-black px-2 py-1 text-foreground transition-colors duration-200 group-hover:border-white">
                {category}
              </span>
              <time dateTime={dateTime}>{date}</time>
            </div>

            <h3 className="mt-3 max-w-2xl text-base font-semibold leading-snug text-foreground sm:text-xl">
              {title}
            </h3>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
            {excerpt}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px]  text-muted sm:text-xs">
            {tags.map((tag) => (
              <span key={tag} className="border border-border px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="order-1 border-b-2 border-black bg-black/3 transition-colors duration-200 group-hover:border-white dark:bg-white/4 md:order-2 md:border-b-0 md:border-l-2">
          <div className="aspect-video p-4 md:h-full md:min-h-50 md:aspect-auto">
            <div className="relative h-full w-full overflow-hidden border border-black/15 bg-background/35 transition-colors duration-200 group-hover:border-white/55 dark:border-white/20 dark:bg-white/3">
              {coverImage ? (
                <Image
                  src={coverImage}
                  alt={coverImageAlt ?? title}
                  fill
                  sizes="(min-width: 768px) 24rem, 100vw"
                  className="object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { Icon } from "@iconify/react";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "./button";
import { formatPostDate, type PostSummary } from "@/app/lib/posts";

type ArticleCardProps = PostSummary & {
  className?: string;
};

export function ArticleCard({
  slug,
  title,
  description,
  publishedAt,
  updatedAt,
  category,
  tags,
  cover,
  className,
}: ArticleCardProps) {
  return (
    <Button
      href={`/posts/${slug}`}
      wrapperClassName={clsx("block w-full", className)}
      baseClassName="bg-border/80"
      baseOverlayClassName="bg-[linear-gradient(90deg,#6FFDC4,#FFFA6D)] opacity-0 transition-opacity duration-200 group-hover/pressable:opacity-100"
      className="group block w-full border border-border/80 bg-surface text-left transition-colors duration-200"
    >
      <div className="flex flex-col overflow-hidden bg-surface min-[760px]:min-h-48 min-[760px]:max-h-56 min-[760px]:flex-row">
        <div className="border-b border-border/80 bg-black/3 transition-colors duration-200 dark:bg-white/4 min-[760px]:flex-[0.95_1_17rem] min-[760px]:border-r min-[760px]:border-b-0">
          <div className="relative h-48 w-full overflow-hidden bg-background/35 transition-colors duration-200 dark:bg-white/3 min-[760px]:h-full">
            {cover ? (
              <Image
                src={cover}
                alt=""
                fill
                sizes="(min-width: 1200px) 17rem, (min-width: 760px) 32vw, 100vw"
                className="object-cover"
              />
            ) : null}
          </div>
        </div>

        <div className="min-w-0 min-[760px]:flex-[1.15_1_22rem] min-[760px]:overflow-hidden">
          <div className="flex h-full min-w-0 flex-col p-4 min-[760px]:p-4">
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted sm:text-[11px]">
              <span className="inline-flex items-center gap-1.5 py-1">
                <Icon
                  icon="solar:widget-5-bold"
                  className="h-3 w-3 shrink-0 text-foreground/80"
                />
                {category}
              </span>
              <time
                dateTime={publishedAt}
                className="inline-flex items-center gap-1.5 py-1"
              >
                <Icon
                  icon="solar:calendar-bold"
                  className="h-3 w-3 shrink-0 text-foreground/80"
                />
                {formatPostDate(publishedAt)}
              </time>
              {updatedAt ? (
                <time
                  dateTime={updatedAt}
                  className="inline-flex items-center gap-1.5 py-1"
                >
                  <Icon
                    icon="solar:refresh-bold"
                    className="h-3 w-3 shrink-0 text-foreground/80"
                  />
                  Updated {formatPostDate(updatedAt)}
                </time>
              ) : null}
            </div>

            <h3 className="mt-2 max-w-2xl text-base font-semibold leading-snug text-foreground min-[760px]:line-clamp-2 sm:text-xl">
              {title}
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted min-[760px]:line-clamp-2 line-clamp-3 sm:text-[15px] sm:leading-7">
              {description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 overflow-hidden text-[10px] text-muted min-[760px]:mt-auto sm:text-[11px]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 py-1"
                >
                  <Icon
                    icon="solar:tag-bold"
                    className="h-3 w-3 shrink-0 text-foreground/80"
                  />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
}

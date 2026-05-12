import clsx from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import { Alert } from "@/app/components/mdx/alert";
import { Mermaid } from "@/app/components/mdx/mermaid";

function MdxLink({
  className,
  href,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const linkClassName = clsx(
    "font-medium text-brand-strong underline decoration-brand/60 underline-offset-4 transition-colors duration-200 hover:text-brand",
    className,
  );

  if (!href) {
    return <a className={linkClassName} {...props} />;
  }

  if (href.startsWith("/")) {
    return <Link href={href} className={linkClassName} {...props} />;
  }

  return (
    <a
      href={href}
      className={linkClassName}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    />
  );
}

const components: MDXComponents = {
  Mermaid,
  Alert,
  h1: ({ className, ...props }) => (
    <h1
      className={clsx(
        "text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={clsx(
        "mt-10 text-[1.4rem] font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-[1.7rem]",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={clsx(
        "mt-8 text-lg font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-[1.35rem]",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={clsx(
        "mt-4 text-sm leading-7 text-foreground-soft sm:text-base",
        className,
      )}
      {...props}
    />
  ),
  a: MdxLink,
  ul: ({ className, ...props }) => (
    <ul
      className={clsx(
        "mt-4 list-disc space-y-2.5 pl-5 text-sm leading-7 text-foreground-soft marker:text-muted sm:text-base",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={clsx(
        "mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-7 text-foreground-soft marker:text-muted sm:text-base",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={clsx("pl-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={clsx(
        "mt-6 border-l-2 border-border pl-4 text-sm leading-7 text-muted sm:text-base",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={clsx("my-8 border-border", className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre className={clsx("", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={clsx(
        className
          ? "font-mono text-[0.92em]"
          : "rounded bg-brand-soft/60 px-1.5 py-0.5 font-mono text-[0.92em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={clsx("font-semibold text-foreground", className)} {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

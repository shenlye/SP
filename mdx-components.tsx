import clsx from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

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
  h1: ({ className, ...props }) => (
    <h1
      className={clsx(
        "text-3xl sm:text-4xl font-semibold leading-tight tracking-[-0.04em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={clsx(
        "mt-12 text-2xl font-semibold leading-tight text-foreground sm:text-3xl",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={clsx(
        "mt-10 text-xl font-semibold leading-tight text-foreground sm:text-2xl",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={clsx(
        "mt-5 text-base leading-8 text-muted sm:text-[17px]",
        className,
      )}
      {...props}
    />
  ),
  a: MdxLink,
  ul: ({ className, ...props }) => (
    <ul
      className={clsx(
        "mt-5 list-disc space-y-3 pl-6 text-base leading-8 text-muted marker:text-brand sm:text-[17px]",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={clsx(
        "mt-5 list-decimal space-y-3 pl-6 text-base leading-8 text-muted marker:text-brand sm:text-[17px]",
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
        "mt-8 border-l-4 border-brand pl-4 text-base leading-8 text-foreground sm:text-[17px]",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={clsx("my-10 border-border", className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre className={clsx("", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={clsx(
        className
          ? "font-mono text-[0.92em]"
          : "rounded bg-background px-1.5 py-0.5 font-mono text-[0.92em] text-foreground",
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

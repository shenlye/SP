"use client";

import { Button } from "./button";

export type SiteNavItem = {
  label: string;
  href: string;
};

export const siteNavItems: SiteNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Posts", href: "/posts" },
  { label: "Links", href: "/Links" },
];

function isNavItemActive(pathname: string, href: string) {
  const normalizedPathname = pathname.toLowerCase();
  const normalizedHref = href.toLowerCase();

  if (normalizedHref === "/") {
    return normalizedPathname === "/";
  }

  return (
    normalizedPathname === normalizedHref ||
    normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}

function ActiveIndicator({ className }: { className: string }) {
  return <span aria-hidden="true" className={className} />;
}

function getDesktopNavButtonProps(isActive: boolean) {
  return {
    baseClassName: isActive
      ? "bg-brand"
      : "bg-border/80 transition-colors duration-150 group-hover/pressable:bg-muted",
    className: [
      "relative inline-flex items-center justify-center whitespace-nowrap border bg-surface px-3 py-1.5 text-[0.76rem] uppercase font-medium tracking-[0.14em]",
      isActive
        ? "border-brand/45 bg-brand-soft/70 text-brand-strong"
        : "border-border/80 text-foreground",
    ].join(" "),
  };
}

function getMobileNavButtonProps(isActive: boolean) {
  return {
    baseClassName: isActive
      ? "bg-brand"
      : "bg-border/80 transition-colors duration-150 group-hover/pressable:bg-muted",
    className: [
      "relative block border bg-surface pl-7 pr-4 py-4",
      isActive
        ? "border-brand/45 bg-brand-soft/70 text-brand-strong"
        : "border-border/80 text-foreground",
    ].join(" "),
  };
}

export function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Primary" className="flex items-center gap-3 sm:gap-4">
      {siteNavItems.map((item) => {
        const isActive = isNavItemActive(pathname, item.href);
        const buttonProps = getDesktopNavButtonProps(isActive);

        return (
          <Button
            key={item.label}
            href={item.href}
            wrapperClassName="inline-flex shrink-0"
            baseClassName={buttonProps.baseClassName}
            aria-current={isActive ? "page" : undefined}
            className={buttonProps.className}
          >
            {isActive ? (
              <ActiveIndicator className="absolute top-1/2 -left-3 h-0.5 w-0.5 -translate-y-1/2 bg-brand [box-shadow:2px_-2px_0_0_var(--color-brand),2px_0_0_0_var(--color-brand),2px_2px_0_0_var(--color-brand),4px_0_0_0_var(--color-brand)]" />
            ) : null}
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}

export function MobileNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <nav
      id="mobile-site-menu"
      aria-label="Mobile Primary"
      className="mt-8 flex flex-col gap-4"
    >
      {siteNavItems.map((item, index) => {
        const isActive = isNavItemActive(pathname, item.href);
        const buttonProps = getMobileNavButtonProps(isActive);
        const routeLabel =
          item.href === "/" ? "Root" : item.href.replace("/", "").toUpperCase();

        return (
          <Button
            key={item.label}
            href={item.href}
            wrapperClassName="block w-full"
            baseClassName={buttonProps.baseClassName}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`${buttonProps.className} w-full`}
          >
            {isActive ? (
              <ActiveIndicator className="absolute top-1/2 left-2 h-0.5 w-0.5 -translate-y-1/2 bg-brand [box-shadow:2px_-2px_0_0_var(--color-brand),2px_0_0_0_var(--color-brand),2px_2px_0_0_var(--color-brand),4px_0_0_0_var(--color-brand)]" />
            ) : null}

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
                  {String(index + 1).padStart(2, "0")} / {routeLabel}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                  {item.label}
                </p>
              </div>

              {isActive ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-strong">
                  Current
                </span>
              ) : null}
            </div>
          </Button>
        );
      })}
    </nav>
  );
}

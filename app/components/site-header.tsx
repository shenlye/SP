"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/app/config";
import { Button } from "./button";
import { DynamicIsland } from "./dynamic-island/center";
import { useCloseOnEscape, useHeaderVisibility } from "./site-header-hooks";
import { DesktopNav, MobileNav } from "./site-header-nav";
import { ThemeToggle } from "./theme-toggle";

function BrandLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex min-w-0 items-center gap-3"
    >
      <span className="flex h-11 w-11 shrink-0 overflow-hidden border border-border/80 bg-surface [box-shadow:2px_2px_0_0_var(--color-brand)]">
        <Image
          src="/avatar.png"
          alt="SavePoint avatar"
          width={44}
          height={44}
          className="h-full w-full object-cover"
        />
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="font-display text-2xl leading-none text-foreground">
          {siteConfig.title}
        </span>
        <span className="font-medium font-display text-sm uppercase tracking-[0.2em] text-muted">
          Frontend Developer
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isVisible = useHeaderVisibility();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useCloseOnEscape(isMenuOpen, closeMenu);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-border/70 bg-surface/80 backdrop-blur transition-transform duration-300 ${
          isVisible || isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto relative flex w-full max-w-5xl items-center justify-between px-6 py-3 sm:px-8">
          <DynamicIsland className="absolute top-full right-6 mt-3" />
          <BrandLink />

          <div className="hidden items-center gap-4 sm:flex sm:gap-6">
            <DesktopNav pathname={pathname} />

            <ThemeToggle variant="header" />
          </div>

          <Button
            wrapperClassName="inline-flex shrink-0 sm:hidden"
            baseClassName="bg-brand transition-colors duration-200 group-hover/pressable:bg-brand-strong"
            aria-controls="mobile-site-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="gap-3 border border-border/80 bg-surface px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-foreground"
          >
            <span aria-hidden="true" className="flex flex-col gap-0.75">
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
            </span>
            {isMenuOpen ? "Close" : "Menu"}
          </Button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-60 sm:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-background/96 backdrop-blur-xl transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-soft),transparent_35%)] transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative mx-auto flex min-h-svh w-full max-w-5xl flex-col px-6 py-3 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <BrandLink onClick={closeMenu} />

            <Button
              wrapperClassName="inline-flex shrink-0"
              baseClassName="bg-brand transition-colors duration-200 group-hover/pressable:bg-brand-strong"
              onClick={closeMenu}
              className="gap-3 border border-brand/40 bg-brand-soft/70 px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-brand-strong"
            >
              <span aria-hidden="true" className="relative block h-3 w-3">
                <span className="absolute top-1/2 left-0 h-0.5 w-3 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-0.5 w-3 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
              Close
            </Button>
          </div>

          <div className="mt-10 border-t border-border/70 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Suspend Menu
            </p>
            <h2 className="mt-5 font-display text-[1.9rem] leading-[1.08] text-brand">
              RESUME
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-7 text-muted">
              Pick a page, drop back in, and keep the session moving.
            </p>
          </div>

          <MobileNav pathname={pathname} onNavigate={closeMenu} />

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/70 pt-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
                Display
              </p>
              <p className="mt-2 text-sm text-foreground">Toggle theme</p>
            </div>

            <ThemeToggle variant="menu" />
          </div>
        </div>
      </div>
    </>
  );
}

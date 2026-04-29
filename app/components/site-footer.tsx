import type { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { siteConfig } from "@/app/config";

type FooterIconProps = SVGProps<SVGSVGElement>;

type FooterLinkProps = {
  href: string;
  icon: (props: FooterIconProps) => ReactNode;
  label: string;
  external?: boolean;
};

function RssIcon(props: FooterIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 5c7.73 0 14 6.27 14 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M5 11c4.42 0 8 3.58 8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path d="M6.5 19h.01" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function SitemapIcon(props: FooterIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 5v6M6 17v-3h12v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M9 3h6v4H9zM3 17h6v4H3zM15 17h6v4h-6z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function NextIcon(props: FooterIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 19V5h3.4l8.2 14H12.2L4 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="miter"
      />
      <path
        d="M17 5v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

const footerLinks: FooterLinkProps[] = [
  {
    href: "/feed.xml",
    icon: RssIcon,
    label: "RSS 订阅",
  },
  {
    href: "/sitemap.xml",
    icon: SitemapIcon,
    label: "站点地图",
  },
  {
    href: "https://nextjs.org",
    icon: NextIcon,
    label: "Powered By Next.js",
    external: true,
  },
];

function FooterLink({ href, icon, label, external }: FooterLinkProps) {
  const Icon = icon;
  const className =
    "group inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors duration-150 hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const content = (
    <>
      <Icon
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 text-foreground/60 transition-colors duration-150 group-hover:text-brand-strong"
      />
      <span>{label}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface/55">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-8 text-left sm:px-8">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2"
        >
          {footerLinks.map((item) => (
            <FooterLink key={item.label} {...item} />
          ))}
        </nav>

        <div className="flex w-full flex-col items-start gap-3 text-xs text-muted">
          <p>Designed By Shenley</p>

          <p>
            {currentYear} {siteConfig.title}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

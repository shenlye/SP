import type { SitemapEntryDefaults } from "@/app/lib/sitemap/config";

// 站点配置
export const siteConfig = {
  title: "Save Point",
  description: "A simple save point system for your game.",
  url: "https://toy.shenley.cn",
  locale: "zh-CN",
};

export type SiteRoute = {
  label: string;
  href: "/" | `/${string}`;
  showInNav?: boolean;
  sitemap?: SitemapEntryDefaults & {
    // 是否根据最新文章更新时间更新此路由的 lastModified
    updatedByPosts?: boolean;
  };
};

// 路由配置
export const siteRoutes: SiteRoute[] = [
  {
    label: "Home",
    href: "/",
    showInNav: true,
    sitemap: {
      changeFrequency: "weekly",
      priority: 1,
      updatedByPosts: true,
    },
  },
  {
    label: "Posts",
    href: "/posts",
    showInNav: true,
    sitemap: {
      changeFrequency: "weekly",
      priority: 0.8,
      updatedByPosts: true,
    },
  },
];

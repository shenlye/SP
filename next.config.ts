import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const prettyCodeOptions = {
  theme: {
    light: "catppuccin-latte",
    dark: "catppuccin-mocha",
  },
  keepBackground: true,
  defaultLang: {
    block: "txt",
    inline: "txt",
  },
};

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shenley.top",
        port: "",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [["rehype-pretty-code", prettyCodeOptions]],
  },
});

export default withMDX(nextConfig);

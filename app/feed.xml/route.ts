import { siteConfig } from "../config";
import { getPosts } from "../lib/posts";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toCdata(value: string) {
  return `<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

export async function GET() {
  const posts = await getPosts();

  const Item = posts
    .map(
      (post) => `
        <item>
            <title>${escapeXml(post.title)}</title>
            <link>${siteConfig.url}/posts/${post.slug}</link>
            <guid>${siteConfig.url}/posts/${post.slug}</guid>
            <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
            <description>${toCdata(post.description)}</description>
        </item>
    `,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
        <title>${escapeXml(siteConfig.title)}</title>
        <link>${siteConfig.url}</link>
        <description>${escapeXml(siteConfig.description)}</description>
        <language>${escapeXml(siteConfig.locale)}</language>
        ${Item}
    </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

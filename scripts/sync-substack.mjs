// Sync Substack posts into the blog as external-link entries.
// Runs before every build (see package.json); generated files are gitignored.
import { writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const FEEDS = [
  "https://odysseusai.substack.com/feed",
  "https://moruizhu1.substack.com/feed",
];
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "../src/content/posts");
const PREFIX = "substack-";

const cdata = (s) => s?.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim() ?? "";
const tag = (item, name) => {
  const m = item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? cdata(m[1]) : "";
};
const yamlStr = (s) => JSON.stringify(s); // JSON strings are valid YAML

export async function syncSubstack() {
  const posts = [];
  for (const feedUrl of FEEDS) {
    // Browser-like UA: Substack sits behind Cloudflare, which may block default agents
    const res = await fetch(feedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });
    if (!res.ok) throw new Error(`${feedUrl}: HTTP ${res.status}`);
    const xml = await res.text();
    for (const item of xml.match(/<item>[\s\S]*?<\/item>/g) ?? []) {
      const link = tag(item, "link");
      const slug = link.split("/p/")[1]?.replace(/[^a-zA-Z0-9-]/g, "");
      if (!slug) continue;
      const image = item.match(/<enclosure url="([^"]+)"/)?.[1] ?? "";
      posts.push({
        slug,
        title: tag(item, "title"),
        description: tag(item, "description"),
        link,
        date: new Date(tag(item, "pubDate")).toISOString().slice(0, 10),
        image,
      });
    }
  }

  // Keep the committed fallback files if the fetch produced nothing
  if (posts.length === 0) {
    console.warn("[substack] feeds returned no posts; keeping committed files");
    return;
  }

  mkdirSync(OUT_DIR, { recursive: true });
  // Remove previously generated files so deletions/renames on Substack propagate
  for (const f of readdirSync(OUT_DIR)) {
    if (f.startsWith(PREFIX)) unlinkSync(join(OUT_DIR, f));
  }
  for (const p of posts) {
    const fm = [
      "---",
      `title: ${yamlStr(p.title)}`,
      `date: ${yamlStr(p.date)}`,
      `description: ${yamlStr(p.description)}`,
      `author: "Morui Zhu"`,
      `external_url: ${yamlStr(p.link)}`,
      p.image ? `image: ${yamlStr(p.image)}` : null,
      'tags:\n  - "Substack"',
      "---",
      "",
      `Read this post on Substack: [${p.title}](${p.link})`,
      "",
    ].filter(Boolean).join("\n");
    writeFileSync(join(OUT_DIR, `${PREFIX}${p.slug}.md`), fm);
  }
  console.log(`[substack] synced ${posts.length} post(s)`);
}

// Never fail the build because a feed was unreachable
export const safeSync = () =>
  syncSubstack().catch((err) => console.warn(`[substack] sync skipped: ${err.message}`));

// CLI usage: node scripts/sync-substack.mjs
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await safeSync();
}

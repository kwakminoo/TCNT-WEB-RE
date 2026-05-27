/**
 * Scrape 사회공헌 list from legacy site and download thumbnails.
 * Run: node scripts/scrape_social_contribution.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const LIST_URL = "http://www.taeilcnt.co.kr/home/center/prom_02_list.jsp";
const OUT_JSON = path.join(root, "src/content/pr/social_data.json");
const IMG_DIR = path.join(root, "public/media/pr/social");
const SITE = "http://www.taeilcnt.co.kr";

function slugify(title, date) {
  const base = title
    .replace(/\[.*?\]/g, "")
    .replace(/[^\w가-힣]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  const d = date && date !== "1970-01-01" ? date : "nodate";
  return `${d}-${base || "article"}`.toLowerCase();
}

function parseDateFromTitle(title) {
  const m = title.match(/\((\d{4})\.(\d{2})\.(\d{2})\)/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  const m2 = title.match(/(\d{4})\.(\d{1,2})\.(\d{1,2})/);
  if (m2) {
    return `${m2[1]}-${m2[2].padStart(2, "0")}-${m2[3].padStart(2, "0")}`;
  }
  const y = title.match(/^(\d{4})\s/);
  if (y) return `${y[1]}-01-01`;
  return "1970-01-01";
}

function extractCategory(title) {
  const m = title.match(/^\[([^\]]+)\]/);
  return m ? m[1] : "사회공헌";
}

function decodeHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function absImageUrl(src) {
  if (!src || src.startsWith("data:")) return null;
  if (src.startsWith("http")) return src;
  return `${SITE}${src.startsWith("/") ? "" : "/"}${src}`;
}

async function fetchHtml() {
  const res = await fetch(LIST_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  try {
    return new TextDecoder("euc-kr").decode(buf);
  } catch {
    return buf.toString("utf8");
  }
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, buf);
}

function parseArticles(html) {
  const articles = [];
  const blocks = html.split(/<div class="list-item">/i).slice(1);

  for (const block of blocks) {
    const titleMatch = block.match(
      /<h2[^>]*class="media-heading[^"]*"[^>]*>([\s\S]*?)<\/h2>/i,
    );
    if (!titleMatch) continue;

    const rawTitle = decodeHtml(titleMatch[1]).replace(/\s+/g, " ").trim();
    if (!rawTitle) continue;

    const imgMatch = block.match(/<img[^>]+src=["']([^"']+)["']/i);
    const imageUrl = imgMatch ? absImageUrl(imgMatch[1]) : null;

    const contMatch = block.match(/<div class="list-cont[^"]*">([\s\S]*?)(?:<span id="test)/i);
    const contentHtml = contMatch?.[1] ?? "";

    const text = decodeHtml(contentHtml);
    const lines = text
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(
        (l) =>
          l &&
          !/^더보기/.test(l) &&
          !/^↓/.test(l) &&
          l !== "Close" &&
          !/^□\s*관련기사/.test(l),
      );

    const summary = lines[0] ?? rawTitle;
    const body = lines.slice(1);

    const date = parseDateFromTitle(rawTitle);
    const category = extractCategory(rawTitle);
    let id = slugify(rawTitle, date);
    if (articles.some((a) => a.id === id)) {
      id = `${id}-${articles.length + 1}`;
    }

    articles.push({
      id,
      title: rawTitle,
      date,
      category,
      summary,
      image_url: imageUrl,
      body: body.length ? body : [summary],
    });
  }

  return articles;
}

async function main() {
  console.log("Fetching list...");
  const html = await fetchHtml();
  const parsed = parseArticles(html);
  console.log(`Parsed ${parsed.length} articles`);

  await fs.mkdir(IMG_DIR, { recursive: true });

  const output = [];
  for (let i = 0; i < parsed.length; i++) {
    const a = parsed[i];
    let localImage = "media/esg/environment.jpg";

    if (a.image_url) {
      try {
        const urlPath = new URL(a.image_url).pathname;
        const ext = path.extname(urlPath) || ".jpg";
        const filename = `${a.id}${ext}`.replace(/[<>:"|?*]/g, "-");
        const dest = path.join(IMG_DIR, filename);
        await downloadImage(a.image_url, dest);
        localImage = `media/pr/social/${path.basename(dest)}`;
        console.log(`[${i + 1}/${parsed.length}] OK ${path.basename(dest)}`);
      } catch (e) {
        console.warn(`[${i + 1}] image fail ${a.id}:`, e.message);
      }
    }

    output.push({
      id: a.id,
      title: a.title,
      date: a.date,
      category: a.category,
      summary: a.summary,
      image_url: localImage,
      link_url: `/pr/social/${a.id}`,
      body: a.body,
    });
  }

  output.sort((a, b) => b.date.localeCompare(a.date));
  await fs.writeFile(OUT_JSON, JSON.stringify(output, null, 2), "utf8");
  console.log(`Wrote ${OUT_JSON} (${output.length} items)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

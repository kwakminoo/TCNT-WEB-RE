/**
 * 레거시 order_list / order_view에서 공사별 대표 이미지를 내려받아
 * public/media/business/orders/ 에 저장하고 JSON 매핑을 stdout으로 출력합니다.
 *
 * 실행: node scripts/download_order_portfolio_images.mjs
 */
import { createWriteStream, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "media", "business", "orders");
const SRC_JSON = join(ROOT, "src", "content", "projects", "orderListCoverByTitle.json");

const LIST_URL = "http://www.taeilcnt.co.kr/home/order/order_list.jsp";
const VIEW_URL = "http://www.taeilcnt.co.kr/home/order/order_view.jsp";
const ORIGIN = "http://www.taeilcnt.co.kr";

function decodeEucKr(buf) {
  const dec = new TextDecoder("euc-kr");
  return dec.decode(buf);
}

async function postForm(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const ab = await res.arrayBuffer();
  return decodeEucKr(new Uint8Array(ab));
}

async function fetchListPage(pg) {
  return postForm(LIST_URL, `pg=${pg}&type_kind=&b_seq=&view_yn=Y`);
}

async function fetchView(bSeq) {
  return postForm(VIEW_URL, `b_seq=${bSeq}`);
}

function parseListProjects(html) {
  const re = /href="\/home\/order\/order_view\.jsp\?b_seq=(\d+)">([^<]+)<\/a>/g;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push({ bSeq: m[1], title: m[2].trim() });
  }
  return out;
}

function parseMainImage(html) {
  const m = html.match(/\/home\/file\/upload\/[0-9]+/);
  return m ? `${ORIGIN}${m[0]}` : null;
}

async function downloadToFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`GET ${url} -> ${res.status}`);
  const nodeStream = Readable.fromWeb(res.body);
  await pipeline(nodeStream, createWriteStream(destPath));
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const byTitle = new Map();

  for (let pg = 1; pg <= 20; pg += 1) {
    const html = await fetchListPage(pg);
    const rows = parseListProjects(html);
    if (rows.length === 0) break;
    for (const { bSeq, title } of rows) {
      if (byTitle.has(title)) continue;
      const viewHtml = await fetchView(bSeq);
      const imgUrl = parseMainImage(viewHtml);
      byTitle.set(title, { bSeq, imgUrl });
      await new Promise((r) => setTimeout(r, 120));
    }
    console.error(`list page ${pg}: +${rows.length} rows, unique titles ${byTitle.size}`);
  }

  const mapping = {};
  let ok = 0;
  let missing = 0;
  for (const [title, { bSeq, imgUrl }] of byTitle) {
    if (!imgUrl) {
      console.error("no image", title, bSeq);
      missing += 1;
      continue;
    }
    const ext = ".jpg";
    const fileBase = `legacy-${bSeq}${ext}`;
    const rel = `media/business/orders/${fileBase}`;
    const dest = join(OUT_DIR, fileBase);
    try {
      await downloadToFile(imgUrl, dest);
      mapping[title] = rel;
      ok += 1;
      console.error("saved", fileBase, title.slice(0, 40));
    } catch (e) {
      console.error("fail", title, e);
      missing += 1;
    }
    await new Promise((r) => setTimeout(r, 80));
  }

  const jsonOut = JSON.stringify(mapping, null, 2);
  writeFileSync(join(OUT_DIR, "titleToImagePath.json"), jsonOut, "utf8");
  mkdirSync(dirname(SRC_JSON), { recursive: true });
  writeFileSync(SRC_JSON, jsonOut, "utf8");
  console.error("done mapping entries", Object.keys(mapping).length, "ok", ok, "missing", missing);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

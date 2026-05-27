import fs from "node:fs/promises";
import path from "node:path";

const dec = new TextDecoder("euc-kr");
const www = "http://www.taeilcnt.co.kr";

function resolveUrl(p) {
  if (p.startsWith("/")) return www + p;
  if (p.startsWith("../")) return www + "/home/" + p.slice(3);
  return `${www}/${p}`;
}

const html = dec.decode(
  await (await fetch(`${www}/home/company/sub_04.html`)).arrayBuffer(),
);

const thumbMatches = [...html.matchAll(/<img src="(\.\.\/images\/company\/logo_[^"]+)"/g)];
const thumbs = [...new Set(thumbMatches.map((m) => m[1]))];

const popupMatches = [...html.matchAll(/popupOpen\('([^']+)'/g)];
const assets = [
  ...new Set(
    popupMatches
      .map((m) => m[1])
      .filter((p) => /lisense_.*\.jpg$/i.test(p)),
  ),
];

const outDir = path.join(process.cwd(), "public", "media", "company", "licenses");
await fs.mkdir(outDir, { recursive: true });

async function grab(rel, filename) {
  const u = resolveUrl(rel);
  const dest = path.join(outDir, filename);
  const r = await fetch(u);
  if (!r.ok) throw new Error(`${u} -> ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await fs.writeFile(dest, buf);
  console.log("ok", filename, buf.length);
}

for (const a of assets) {
  const name = a.split("/").pop();
  await grab(a, name);
}

for (const t of thumbs) {
  const baseName = t.split("/").pop();
  const name = `thumb_${baseName}`;
  await grab(t, name);
}

console.log("downloaded", assets.length, "jpgs,", thumbs.length, "thumbs");

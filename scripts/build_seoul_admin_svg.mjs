/**
 * seoul_municipalities_geo_simple.json → src/assets/seoul-admin.svg
 * 데이터: https://github.com/southkorea/seoul-maps (KOSTAT 2013, 단순화)
 */
import { writeFileSync } from "node:fs";
import { geoMercator, geoPath } from "d3-geo";

const SRC =
  "https://raw.githubusercontent.com/southkorea/seoul-maps/master/kostat/2013/json/seoul_municipalities_geo_simple.json";
const W = 1000;
const H = 1000;

const res = await fetch(SRC);
if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
const geo = await res.json();

const projection = geoMercator().fitExtent(
  [
    [8, 8],
    [W - 8, H - 8],
  ],
  geo,
);
const path = geoPath(projection);
const paths = geo.features
  .map((f, i) => {
    const d = path(f);
    if (!d) return null;
    const id = String(f.properties?.code ?? f.properties?.name_eng ?? `gu-${i}`).replace(/\s/g, "-");
    const label = String(f.properties?.name ?? f.properties?.name_eng ?? id);
    return `  <path id="${id}" aria-label="${label.replace(/"/g, "&quot;")}" d="${d}" />`;
  })
  .filter(Boolean);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-label="서울특별시 행정구역">
${paths.join("\n")}
</svg>
`;

writeFileSync(new URL("../src/assets/seoul-admin.svg", import.meta.url), svg, "utf8");
console.log("Wrote src/assets/seoul-admin.svg", paths.length, "paths");

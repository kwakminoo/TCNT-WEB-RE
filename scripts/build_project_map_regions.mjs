/**
 * provinces subset → src/assets/{gyeonggi,chungnam,gyeongnam,gangwon}-admin.svg
 * + src/content/generated/projectMapSigunguCentroids.ts
 *
 * 데이터: https://github.com/southkorea/southkorea-maps
 *         kostat/2018/json/skorea-municipalities-2018-topo-simple.json (KOSTAT 2018)
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildAdminSvg, topoToFc } from "./lib/svgFromGeoFeatures.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ASSETS = join(ROOT, "src/assets");
const GEN = join(ROOT, "src/content/generated");

const TOPO_URL =
  "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-municipalities-2018-topo-simple.json";

/** @param {import('geojson').Feature} f */
function codeOf(f) {
  return String(f.properties?.code ?? "");
}

const REGIONS = [
  {
    id: "gyeonggi",
    file: "gyeonggi-admin.svg",
    aria: "경기도 시·군·구 행정구역",
    filter: (f) => codeOf(f).startsWith("31"),
  },
  {
    id: "gangwon",
    file: "gangwon-admin.svg",
    aria: "강원특별자치도 시·군·구 행정구역 (2018 행정구역 기준)",
    filter: (f) => codeOf(f).startsWith("32"),
  },
  {
    id: "chungnam",
    file: "chungnam-admin.svg",
    aria: "충청남도 및 세종특별자치시 행정구역 (2018 행정구역 기준)",
    filter: (f) => {
      const c = codeOf(f);
      return c.startsWith("34") || c.startsWith("29");
    },
  },
  {
    id: "gyeongnam",
    file: "gyeongnam-admin.svg",
    aria: "경상남도 시·군·구 행정구역",
    filter: (f) => codeOf(f).startsWith("38"),
  },
];

const res = await fetch(TOPO_URL);
if (!res.ok) throw new Error(`fetch failed ${res.status} ${TOPO_URL}`);
const topology = await res.json();
const fullFc = topoToFc(topology);

mkdirSync(ASSETS, { recursive: true });
mkdirSync(GEN, { recursive: true });

/** @type {Record<string, Record<string, { x: number; y: number }>>} */
const allCentroids = {};

for (const r of REGIONS) {
  const features = fullFc.features.filter(r.filter);
  if (features.length === 0) throw new Error(`no features for ${r.id}`);
  /** @type {import('geojson').FeatureCollection} */
  const sub = { type: "FeatureCollection", features };
  const { svg, centroidsNormalized } = buildAdminSvg(sub, { svgAriaLabel: r.aria });
  writeFileSync(join(ASSETS, r.file), svg, "utf8");
  console.log("wrote", r.file, pathsCount(svg));
  allCentroids[r.id] = centroidsNormalized;
}

const tsHead = `/* eslint-disable */
/**
 * 스크립트 생성 파일 — scripts/build_project_map_regions.mjs
 * 무게중심: 해당 권역 SVG와 동일 Mercator.projection(geoCentroid(feature))
 */
export type ProjectMapRegionCentroidKey =
  | "gyeonggi"
  | "chungnam"
  | "gyeongnam"
  | "gangwon";

`;
const body = `export const projectMapSigunguCentroids: Record<
  ProjectMapRegionCentroidKey,
  Record<string, { x: number; y: number }>
> = ${JSON.stringify(allCentroids, null, 2)} as const;
`;

writeFileSync(join(GEN, "projectMapSigunguCentroids.ts"), `${tsHead}${body}`, "utf8");
console.log("wrote src/content/generated/projectMapSigunguCentroids.ts");

function pathsCount(svg) {
  const m = svg.match(/<path/g);
  return m ? m.length : 0;
}

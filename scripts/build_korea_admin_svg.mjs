/**
 * 전국 시·군·구 → src/assets/korea-admin.svg
 * + src/content/generated/nationalMunicipalityProjected.ts (행정구역 코드 → 0~1000 투영 좌표)
 *
 * 데이터: southkorea/southkorea-maps KOSTAT 2018
 *         kostat/2018/json/skorea-municipalities-2018-topo-simple.json
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

const res = await fetch(TOPO_URL);
if (!res.ok) throw new Error(`fetch failed ${res.status}`);
const topology = await res.json();
const fullFc = topoToFc(topology);

mkdirSync(ASSETS, { recursive: true });
mkdirSync(GEN, { recursive: true });

const { svg, centroidsByCode } = buildAdminSvg(fullFc, {
  svgAriaLabel: "대한민국 시·군·구 행정구역 (KOSTAT 2018)",
});

writeFileSync(join(ASSETS, "korea-admin.svg"), svg, "utf8");

const ts = `/* eslint-disable */
/**
 * 전국 단일 Mercator fitExtent 기준 무게중심 (0~1000).
 * 생성: scripts/build_korea_admin_svg.mjs
 */
export type NationalProjectedCoords = Record<string, { x: number; y: number }>;

export const nationalMunicipalityProjected: NationalProjectedCoords = ${JSON.stringify(centroidsByCode, null, 2)};
`;

writeFileSync(join(GEN, "nationalMunicipalityProjected.ts"), ts, "utf8");

console.log("wrote korea-admin.svg", fullFc.features.length, "paths");
console.log("wrote nationalMunicipalityProjected.ts codes", Object.keys(centroidsByCode).length);

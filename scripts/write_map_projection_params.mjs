/**
 * 권역·전국·서울 SVG와 동일 geoMercator().fitExtent(...) 파라미터(scale/translate)를 출력.
 * 마커용 WGS84 투영 시 d3-geo 재현에 사용 — scripts/lib/svgFromGeoFeatures.mjs 과 동일 로직.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const GEN = join(ROOT, "src/content/generated");

const TOPO_URL =
  "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-municipalities-2018-topo-simple.json";
const SEOUL_URL =
  "https://raw.githubusercontent.com/southkorea/seoul-maps/master/kostat/2013/json/seoul_municipalities_geo_simple.json";

const W = 1000;
const H = 1000;
const PAD = 8;

/** @param {import('geojson').FeatureCollection} fc */
function mercatorParamsFromFc(fc, pad = PAD) {
  const projection = geoMercator().fitExtent(
    [
      [pad, pad],
      [W - pad, H - pad],
    ],
    fc,
  );
  const t = projection.translate();
  return {
    scale: projection.scale(),
    translateX: t[0],
    translateY: t[1],
  };
}

function codeOf(f) {
  return String(f.properties?.code ?? "");
}

async function main() {
  mkdirSync(GEN, { recursive: true });

  const [topoRes, seoulRes] = await Promise.all([fetch(TOPO_URL), fetch(SEOUL_URL)]);
  if (!topoRes.ok) throw new Error(`topo fetch ${topoRes.status}`);
  if (!seoulRes.ok) throw new Error(`seoul fetch ${seoulRes.status}`);
  const topology = await topoRes.json();
  /** @type {import('geojson').FeatureCollection} */
  const fullFc = feature(topology, topology.objects.skorea_municipalities_2018_geo);
  /** @type {import('geojson').FeatureCollection} */
  const seoulGeo = await seoulRes.json();

  const national = mercatorParamsFromFc(fullFc);

  const regionFilters = {
    gyeonggi: (f) => codeOf(f).startsWith("31"),
    gangwon: (f) => codeOf(f).startsWith("32"),
    chungnam: (f) => {
      const c = codeOf(f);
      return c.startsWith("34") || c.startsWith("29");
    },
    gyeongnam: (f) => codeOf(f).startsWith("38"),
  };

  /** @type {Record<string, { scale: number; translateX: number; translateY: number }>} */
  const regions = {};
  for (const [id, filter] of Object.entries(regionFilters)) {
    const features = fullFc.features.filter(filter);
    regions[id] = mercatorParamsFromFc({ type: "FeatureCollection", features });
  }

  const seoul = mercatorParamsFromFc(seoulGeo);

  const ts = `/* eslint-disable */
/**
 * geoMercator fitExtent 파라미터 — SVG 마커 좌표와 동일 투영.
 * 생성: scripts/write_map_projection_params.mjs (npm run map:gen)
 */
export type MapMercatorFitParams = {
  readonly scale: number;
  readonly translateX: number;
  readonly translateY: number;
};

export const mapMercatorNational: MapMercatorFitParams = ${JSON.stringify(national, null, 2)} as const;

export const mapMercatorRegions: Record<
  "gyeonggi" | "chungnam" | "gyeongnam" | "gangwon",
  MapMercatorFitParams
> = ${JSON.stringify(regions, null, 2)} as const;

export const mapMercatorSeoul: MapMercatorFitParams = ${JSON.stringify(seoul, null, 2)} as const;
`;

  writeFileSync(join(GEN, "mapMercatorParams.ts"), ts, "utf8");

  // 검증: 무게중심 경위도 → 투영 결과가 buildAdminSvg centroid와 근접해야 함
  const path = geoPath(
    geoMercator()
      .scale(national.scale)
      .translate([national.translateX, national.translateY]),
  );
  const sample = fullFc.features.find((f) => codeOf(f) === "31070"); // 평택시
  if (sample) {
    const c = path.centroid(sample);
    console.log("verify Pyeongtaek centroid px", c[0].toFixed(2), c[1].toFixed(2));
  }
  console.log("wrote src/content/generated/mapMercatorParams.ts");
}

await main();

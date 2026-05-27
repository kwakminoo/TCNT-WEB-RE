/**
 * FeatureCollection → 1000×1000 관리자형 SVG 및 projection 기준 시군구 무게중심(0~1000).
 * 데이터: southkorea/southkorea-maps KOSTAT 2018 TopoJSON 등.
 */
import { feature } from "topojson-client";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";

const W = 1000;
const H = 1000;
const PAD = 8;

/**
 * @param {import('geojson').FeatureCollection} fc
 * @param {{ svgAriaLabel: string }} opts
 */
export function buildAdminSvg(fc, opts) {
  const projection = geoMercator().fitExtent(
    [
      [PAD, PAD],
      [W - PAD, H - PAD],
    ],
    fc,
  );
  const path = geoPath(projection);

  /** @type {Record<string, { x: number; y: number }>} */
  const centroidsNormalized = {};
  /** @type {Record<string, { x: number; y: number }>} */
  const centroidsByCode = {};

  const paths = fc.features
    .map((f, i) => {
      const d = path(f);
      if (!d) return null;
      const code = String(f.properties?.code ?? i);
      const label = String(f.properties?.name ?? f.properties?.name_eng ?? code);
      const pathId = `m-${code}`;
      const lngLat = geoCentroid(f);
      const projected = projection(lngLat);
      const cx = projected?.[0] ?? W / 2;
      const cy = projected?.[1] ?? H / 2;
      const nx = clamp(cx, PAD, W - PAD);
      const ny = clamp(cy, PAD, H - PAD);
      centroidsNormalized[label] = { x: nx, y: ny };
      centroidsByCode[code] = { x: nx, y: ny };

      const safeLabel = label.replace(/"/g, "&quot;");
      return `  <path id="${pathId}" aria-label="${safeLabel}" data-code="${code}" d="${d}" />`;
    })
    .filter(Boolean);

  const svgAria = opts.svgAriaLabel.replace(/"/g, "&quot;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-label="${svgAria}">
${paths.join("\n")}
</svg>
`;

  return { svg, centroidsNormalized, centroidsByCode, projection };
}

/**
 * @param {import('topojson-specification').Topology} topology
 * @param {string} objectKey
 */
export function topoToFc(topology, objectKey = "skorea_municipalities_2018_geo") {
  return feature(topology, topology.objects[objectKey]);
}

function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n));
}

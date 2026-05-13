/**
 * 마커 WGS84 투영 — 각 SVG 빌드와 동일하게 geoMercator().fitExtent([pad],[w-pad], fc) 상태의 scale/translate 복원.
 */
import { geoMercator } from "d3-geo";
import {
  mapMercatorNational,
  mapMercatorRegions,
  mapMercatorSeoul,
  type MapMercatorFitParams,
} from "./generated/mapMercatorParams";
import type { ProjectMapRegionCentroidKey } from "./generated/projectMapSigunguCentroids";

const W = 1000;
const H = 1000;
const PAD = 8;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function projectRaw(lng: number, lat: number, p: MapMercatorFitParams): { x: number; y: number } {
  const proj = geoMercator().scale(p.scale).translate([p.translateX, p.translateY]);
  const o = proj([lng, lat]);
  if (!o || o.some((v) => !Number.isFinite(v))) {
    return { x: W / 2, y: H / 2 };
  }
  return { x: o[0], y: o[1] };
}

/** SVG path 중심과 동일: 먼저 PAD~W-PAD 클램프 후 마커 오프셋 단계에서 24~976 범위로 다시 클램프 */
export function nationalXYFromLngLat(lng: number, lat: number): { x: number; y: number } {
  const { x, y } = projectRaw(lng, lat, mapMercatorNational);
  return { x: clamp(x, PAD, W - PAD), y: clamp(y, PAD, H - PAD) };
}

export function regionXYFromLngLat(
  lng: number,
  lat: number,
  region: ProjectMapRegionCentroidKey,
): { x: number; y: number } {
  const { x, y } = projectRaw(lng, lat, mapMercatorRegions[region]);
  return { x: clamp(x, PAD, W - PAD), y: clamp(y, PAD, H - PAD) };
}

export function seoulXYFromLngLat(lng: number, lat: number): { x: number; y: number } {
  const { x, y } = projectRaw(lng, lat, mapMercatorSeoul);
  return { x: clamp(x, PAD, W - PAD), y: clamp(y, PAD, H - PAD) };
}

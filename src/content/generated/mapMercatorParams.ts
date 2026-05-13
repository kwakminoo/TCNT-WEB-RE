/* eslint-disable */
/**
 * geoMercator fitExtent 파라미터 — SVG 마커 좌표와 동일 투영.
 * 생성: scripts/write_map_projection_params.mjs (npm run map:gen)
 */
export type MapMercatorFitParams = {
  readonly scale: number;
  readonly translateX: number;
  readonly translateY: number;
};

export const mapMercatorNational: MapMercatorFitParams = {
  "scale": 7763.838592705747,
  "translateX": -16877.183225694844,
  "translateY": 5720.041885786479
} as const;

export const mapMercatorRegions: Record<
  "gyeonggi" | "chungnam" | "gyeongnam" | "gangwon",
  MapMercatorFitParams
> = {
  "gyeonggi": {
    "scale": 32176.35914669964,
    "translateX": -70884.84446284841,
    "translateY": 23311.736978084642
  },
  "gangwon": {
    "scale": 24828.939058875727,
    "translateX": -55068.20497573526,
    "translateY": 18230.740296093525
  },
  "chungnam": {
    "scale": 26874.4537862849,
    "translateX": -58877.11410523952,
    "translateY": 18925.321681002635
  },
  "gyeongnam": {
    "scale": 33491.3171041124,
    "translateX": -74552.66326416127,
    "translateY": 22525.29502721752
  }
} as const;

export const mapMercatorSeoul: MapMercatorFitParams = {
  "scale": 134739.7726215223,
  "translateX": -298103.96440019424,
  "translateY": 95939.16877216959
} as const;

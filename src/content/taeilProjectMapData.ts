/**
 * 태일씨앤티 공사수주현황(order_list.jsp) 기반 정적 데이터.
 * 출처: http://www.taeilcnt.co.kr/home/order/order_list.jsp (2018 샘플: 36건 중 서울 8·비서울 28)
 * 권역·전국 좌표: RAW에 `lngLat`가 있으면 projectMapLngLat + mapMercatorParams(npm run map:gen)로 투영,
 * 없으면 시·군·구 무게중심(nationalMunicipalityProjected / projectMapSigunguCentroids / SEOUL_GU_XY).
 */

import { nationalMunicipalityProjected } from "./generated/nationalMunicipalityProjected";
import {
  projectMapSigunguCentroids,
  type ProjectMapRegionCentroidKey,
} from "./generated/projectMapSigunguCentroids";
import { nationalXYFromLngLat, regionXYFromLngLat, seoulXYFromLngLat } from "./projectMapLngLat";
import { resolveProjectMapPlacement, type ProjectMapPlacement } from "./projectMapManualPlacements";

export type MapRegionId = "seoul" | "gyeonggi" | "chungnam" | "gyeongnam" | "gangwon";

export type AssetKind = "apartment" | "house" | "warehouse" | "company";

/** 지도 좌표는 항상 0~1000 정규화(viewBox 일치), 마커는 left:x/10%, top:y/10% */
export type ProjectMapItem = {
  id: string;
  title: string;
  /** 표시용 지역 문구 */
  cityOrProvince: string;
  assetKind: AssetKind;
  clusterKey: string;
  /** 동일 시군 내 겹침 완화 순번 */
  clusterIndex: number;
  /** 권역 맵용 좌표 */
  x: number;
  y: number;
  /** 전국 통합 맵용 좌표(build_korea_admin_svg 동일 투영) */
  nationalX: number;
  nationalY: number;
  /** KOSTAT 2018 행정코드 (전국 맵 위치용) */
  municipalityCode: string;
  regionId: MapRegionId;
  /** 비서울: centroid 매칭용 시·군·구 명 (KOSTAT 2018 properties.name 과 동일) */
  sigunguName?: string;
  summary?: string;
  /** 검증 가능한 근거 WGS84점(있을 때만) */
  lat?: number;
  lng?: number;
  verificationRef?: string;
  /** 행정 path 안 배치 방식 — `projectMapManualPlacements.ts`에서 id별로 덮어씀 */
  mapPlacement: ProjectMapPlacement;
};

/** 검증 근거 URL·요약(OpenStreetMap Nominatim, 보도, 공시 등) */
export type LngLatRef = Readonly<{ lat: number; lng: number; verificationRef: string }>;

export type Cluster = {
  key: string;
  label: string;
  centerX: number;
  centerY: number;
};

const CG = projectMapSigunguCentroids;

/** 서울 행정구별 + 권역 시군구별 패널 라벨(대표좌표는 패널용 근사) */
export const projectMapClusters: Cluster[] = [
  { key: "gangnam", label: "서울 강남구", centerX: 708, centerY: 701 },
  { key: "geumcheon", label: "서울 금천구", centerX: 329, centerY: 810 },
  { key: "yongsan", label: "서울 용산구", centerX: 514, centerY: 597 },
  { key: "yeongdeungpo", label: "서울 영등포구", centerX: 349, centerY: 633 },
  { key: "jongno", label: "서울 종로구", centerX: 509, centerY: 414 },
  { key: "sejong", label: "세종특별자치시", ...xy(CG.chungnam, "세종시") },
  { key: "yongin", label: "경기 용인시", ...xy(CG.gyeonggi, "용인시기흥구") },
  { key: "anyang", label: "경기 안양시 동안구(평촌)", ...xy(CG.gyeonggi, "안양시동안구") },
  { key: "bundang", label: "경기 성남시 분당구", ...xy(CG.gyeonggi, "성남시분당구") },
  { key: "suwon", label: "경기 수원시 장안구", ...xy(CG.gyeonggi, "수원시장안구") },
  { key: "pyeongtaek", label: "경기 평택시", ...xy(CG.gyeonggi, "평택시") },
  { key: "gwacheon", label: "경기 과천시", ...xy(CG.gyeonggi, "과천시") },
  { key: "siheung", label: "경기 시흥시", ...xy(CG.gyeonggi, "시흥시") },
  { key: "anseong", label: "경기 안성시", ...xy(CG.gyeonggi, "안성시") },
  { key: "bucheon", label: "경기 부천시", ...xy(CG.gyeonggi, "부천시") },
  { key: "nonsan", label: "충청남도 논산시", ...xy(CG.chungnam, "논산시") },
  { key: "changwon", label: "경상남도 창원시 의창구", ...xy(CG.gyeongnam, "창원시의창구") },
  { key: "gangneung", label: "강원특별자치도 강릉시", ...xy(CG.gangwon, "강릉시") },
];

function xy(table: Record<string, { x: number; y: number }>, name: string): Pick<Cluster, "centerX" | "centerY"> {
  const o = table[name];
  return { centerX: Math.round(o.x), centerY: Math.round(o.y) };
}

/** 서울 25구 무게중심 — GeoJSON fitExtent와 동일 */
const SEOUL_GU_XY = {
  강동구: { x: 906.4, y: 541.2 },
  송파구: { x: 832.1, y: 678.0 },
  강남구: { x: 708.3, y: 701.1 },
  서초구: { x: 634.1, y: 770.8 },
  관악구: { x: 433.8, y: 790.2 },
  동작구: { x: 448.6, y: 694.1 },
  영등포구: { x: 349.1, y: 633.2 },
  금천구: { x: 328.7, y: 810.1 },
  구로구: { x: 224.2, y: 709.2 },
  강서구: { x: 148.1, y: 511.9 },
  양천구: { x: 222.8, y: 619.5 },
  마포구: { x: 348.8, y: 520.3 },
  서대문구: { x: 417.5, y: 463.4 },
  은평구: { x: 393.6, y: 337.6 },
  노원구: { x: 738.0, y: 241.7 },
  도봉구: { x: 637.0, y: 191.1 },
  강북구: { x: 586.9, y: 267.2 },
  성북구: { x: 603.1, y: 379.1 },
  중랑구: { x: 779.6, y: 402.5 },
  동대문구: { x: 690.9, y: 449.8 },
  광진구: { x: 764.7, y: 554.8 },
  성동구: { x: 657.9, y: 541.0 },
  용산구: { x: 514.2, y: 596.9 },
  중구: { x: 550.9, y: 514.9 },
  종로구: { x: 508.5, y: 413.4 },
} as const;

type SeoulGu = keyof typeof SEOUL_GU_XY;

const OFFSETS: ReadonlyArray<{ dx: number; dy: number }> = [
  { dx: 0, dy: 0 },
  { dx: 14, dy: -10 },
  { dx: -14, dy: 10 },
  { dx: 18, dy: 14 },
  { dx: -18, dy: -14 },
  { dx: 10, dy: 20 },
  { dx: -10, dy: -8 },
  { dx: 20, dy: -4 },
  { dx: -20, dy: 8 },
  { dx: 8, dy: -20 },
];

/** OSM 「삼성전자 평택 PS-1」(way 893649901) 기준 근처에서 건별 최소 각도 분리 */
function pyeongtaekCampusLngLat(ringSlot: number): LngLatRef {
  const baseLat = 37.0384186;
  const baseLng = 127.057687;
  const anglesDeg = [0, 38, 76, 114, 152, 190, 228, 266, 304, 342];
  const rad = ((anglesDeg[Math.abs(ringSlot) % anglesDeg.length] ?? 0) * Math.PI) / 180;
  const radiusDeg = 0.00225;
  return {
    lat: baseLat + Math.cos(rad) * radiusDeg,
    lng: baseLng + Math.sin(rad) * radiusDeg,
    verificationRef:
      "https://www.openstreetmap.org/way/893649901 삼성전자 평택 PS-1(산업시설) 근처 토지에 동일 라인 명칭(P3/P4 등) 다수 존재 — 라인별 핀 검증 불가 시 PS-1 기준 소반경(ring) 근삿값 분리.",
  };
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function offsetMarker(baseX: number, baseY: number, overlapIndex: number): { x: number; y: number } {
  const off = OFFSETS[overlapIndex % OFFSETS.length] ?? OFFSETS[0];
  return {
    x: clamp(baseX + off.dx, 24, 976),
    y: clamp(baseY + off.dy, 24, 976),
  };
}

function positionInSeoulGu(gu: SeoulGu, overlapIndex: number): { x: number; y: number } {
  const base = SEOUL_GU_XY[gu];
  return offsetMarker(base.x, base.y, overlapIndex);
}

function positionInRegionSigungu(
  region: ProjectMapRegionCentroidKey,
  sigunguName: string,
  overlapIndex: number,
): { x: number; y: number } {
  const base = projectMapSigunguCentroids[region][sigunguName];
  if (!base) {
    return offsetMarker(500, 500, overlapIndex);
  }
  return offsetMarker(base.x, base.y, overlapIndex);
}

/** 전국 1000×1000 단일 지도 무게중심 + 동일 오프셋 규칙 */
function positionNationwide(municipalityCode: string, overlapIndex: number): { x: number; y: number } {
  const base = nationalMunicipalityProjected[municipalityCode];
  if (!base) {
    return offsetMarker(500, 500, overlapIndex);
  }
  return offsetMarker(base.x, base.y, overlapIndex);
}

/** lat/lng가 있으면 Mercator(fitExtent 재현) 후 동일 픽셀 오프셋 */
function xyPairLngLatOrFallback(args: {
  lngLat?: LngLatRef;
  overlapIndex: number;
  municipalityCode: string;
  regionId: ProjectMapRegionCentroidKey;
  regionCentroidXY: () => { x: number; y: number };
}): { x: number; y: number; nationalX: number; nationalY: number } {
  const { lngLat, overlapIndex, municipalityCode, regionId, regionCentroidXY } = args;
  if (lngLat) {
    const r0 = regionXYFromLngLat(lngLat.lng, lngLat.lat, regionId);
    const n0 = nationalXYFromLngLat(lngLat.lng, lngLat.lat);
    const regionPos = offsetMarker(r0.x, r0.y, overlapIndex);
    const natPos = offsetMarker(n0.x, n0.y, overlapIndex);
    return { x: regionPos.x, y: regionPos.y, nationalX: natPos.x, nationalY: natPos.y };
  }
  const regPos = regionCentroidXY();
  const natPos = positionNationwide(municipalityCode, overlapIndex);
  return { x: regPos.x, y: regPos.y, nationalX: natPos.x, nationalY: natPos.y };
}

function seoulLngLatXYPair(
  lngLat: LngLatRef | undefined,
  overlapIndex: number,
  gu: SeoulGu,
  municipalityCode: string,
): { x: number; y: number; nationalX: number; nationalY: number } {
  if (lngLat) {
    const s0 = seoulXYFromLngLat(lngLat.lng, lngLat.lat);
    const n0 = nationalXYFromLngLat(lngLat.lng, lngLat.lat);
    const regionPos = offsetMarker(s0.x, s0.y, overlapIndex);
    const natPos = offsetMarker(n0.x, n0.y, overlapIndex);
    return { x: regionPos.x, y: regionPos.y, nationalX: natPos.x, nationalY: natPos.y };
  }
  const regPos = positionInSeoulGu(gu, overlapIndex);
  const natPos = positionNationwide(municipalityCode, overlapIndex);
  return { x: regPos.x, y: regPos.y, nationalX: natPos.x, nationalY: natPos.y };
}

/** 공사명 키워드 기반 4종 분류 */
function kindFromTitle(title: string): AssetKind {
  const t = title;
  if (/(물류센터|복합물류|온라인센터|창고|공장)/.test(t)) return "warehouse";
  if (/공동주택/.test(t)) return "house";
  if (/주상복합|오피스텔|브라이튼|몬트레아|한남/.test(t)) return "apartment";
  return "company";
}

type SeoulRaw = {
  id: string;
  title: string;
  cityOrProvince: string;
  clusterKey: (typeof projectMapClusters)[number]["key"];
  clusterIndex: number;
  seoulGu: SeoulGu;
  /** KOSTAT 2018 시군구 코드 (전국 맵) */
  municipalityCode: string;
  summary?: string;
  lngLat?: LngLatRef;
};

/** 서울 소재 공사만 (지도 표시) */
const SEOUL_RAW: SeoulRaw[] = [
  {
    id: "p03",
    title: "Westin Seoul Parnas 리모델링공사",
    cityOrProvince: "서울",
    clusterKey: "gangnam",
    clusterIndex: 0,
    seoulGu: "강남구",
    municipalityCode: "11230",
    lngLat: {
      lat: 37.509482,
      lng: 127.0612638,
      verificationRef:
        "https://www.openstreetmap.org/way/837196098 (파르나스타워 06164 테헤란로 인근 호텔 신축·리모델링 근거지)",
    },
  },
  {
    id: "p10",
    title: "가산 데이터센터",
    cityOrProvince: "서울 금천구",
    clusterKey: "geumcheon",
    clusterIndex: 0,
    seoulGu: "금천구",
    municipalityCode: "11180",
    lngLat: {
      lat: 37.4717684,
      lng: 126.8862788,
      verificationRef:
        "https://nominatim.openstreetmap.org 검색 결과 K스퀘어 데이터센터(가산디지털1로) 금천구 가산동 — 회사 명칭·개별 호실 검증 필요",
    },
  },
  {
    id: "p16",
    title: "비상교육 사옥 신축공사",
    cityOrProvince: "서울",
    clusterKey: "gangnam",
    clusterIndex: 1,
    seoulGu: "강남구",
    municipalityCode: "11230",
    lngLat: {
      lat: 37.5000191,
      lng: 127.0365483,
      verificationRef: "https://www.openstreetmap.org/way/117823787 강남파이낸스센터(테헤란로152) 근처 강남구 역삼·삼성권 업무 현장 검색 근거",
    },
  },
  {
    id: "p18",
    title: "몬트레아 한남 신축공사",
    cityOrProvince: "서울 용산구",
    clusterKey: "yongsan",
    clusterIndex: 0,
    seoulGu: "용산구",
    municipalityCode: "11030",
    lngLat: {
      lat: 37.53822,
      lng: 127.0074,
      verificationRef:
        "https://www.openstreetmap.org 노드·relation 한남동 용산구 행정구 역점 — 공사 명칭 블록 핀 검증 필요(동 단위 근사)",
    },
  },
  {
    id: "p26",
    title: "가산동 549-1번지 지식산업센터 신축공사",
    cityOrProvince: "서울 금천구",
    clusterKey: "geumcheon",
    clusterIndex: 1,
    seoulGu: "금천구",
    municipalityCode: "11180",
    lngLat: {
      lat: 37.4753253,
      lng: 126.8863954,
      verificationRef: "OpenStreetMap Nominatim: 가산동 549·1 검색 결과(금천구 읍면 지번 중심)",
    },
  },
  {
    id: "p32",
    title: "브라이튼 여의도 복합시설 신축공사 1공구",
    cityOrProvince: "서울 영등포구",
    clusterKey: "yeongdeungpo",
    clusterIndex: 0,
    seoulGu: "영등포구",
    municipalityCode: "11190",
    lngLat: {
      lat: 37.5253017,
      lng: 126.9257192,
      verificationRef:
        "국제금융로 IFC Seoul 노드(https://www.openstreetmap.org 검색 IFC·여의도) 인근 업무블록 근거",
    },
  },
  {
    id: "p33",
    title: "숭인동 오피스텔 신축공사",
    cityOrProvince: "서울 종로구",
    clusterKey: "jongno",
    clusterIndex: 0,
    seoulGu: "종로구",
    municipalityCode: "11010",
    lngLat: {
      lat: 37.57648,
      lng: 127.01848,
      verificationRef: "OpenStreetMap Nominatim 숭인동 quarter 중심(종로구)",
    },
  },
  {
    id: "p35",
    title: "컬쳐랜드 대치동 사옥 신축공사",
    cityOrProvince: "서울 강남구",
    clusterKey: "gangnam",
    clusterIndex: 2,
    seoulGu: "강남구",
    municipalityCode: "11230",
    lngLat: {
      lat: 37.4989205,
      lng: 127.0657857,
      verificationRef: "OpenStreetMap relation 대치동(강남구) 무게중심 근사",
    },
  },
];

type NonSeoulRaw = {
  id: string;
  title: string;
  cityOrProvince: string;
  regionId: ProjectMapRegionCentroidKey;
  clusterKey: (typeof projectMapClusters)[number]["key"];
  clusterIndex: number;
  sigunguName: string;
  municipalityCode: string;
  lngLat?: LngLatRef;
};

/**
 * 목록 순서: order_list 1·2·4~9·11~15·17·19·20·21·22·23·24·25·27~31·34·36 (서울 8건 제외, 28건).
 * lngLat는 가능한 공개 지도(Nominatim 등) 근거만 기입; 없으면 행정무게중심 fallback.
 */
const NON_SEOUL_RAW: NonSeoulRaw[] = [
  {
    id: "p01",
    title: "다이소 세종 온라인센터",
    cityOrProvince: "세종특별자치시",
    regionId: "chungnam",
    clusterKey: "sejong",
    clusterIndex: 0,
    sigunguName: "세종시",
    municipalityCode: "29010",
    lngLat: {
      lat: 36.7222184,
      lng: 127.1582213,
      verificationRef:
        "OSM relation 소정면(세종시) 경계 중심 — 국민일보·다이소 보도 '소정면 세종스마트그린산업단지' 인근(핀 단일 건물 검증 불가, 면 단위 근사).",
    },
  },
  {
    id: "p02",
    title: "용인 Cluster 1기 OBL",
    cityOrProvince: "경기 용인시",
    regionId: "gyeonggi",
    clusterKey: "yongin",
    clusterIndex: 0,
    sigunguName: "용인시처인구",
    municipalityCode: "31191",
    lngLat: {
      lat: 37.1665125,
      lng: 127.3133844,
      verificationRef:
        "https://www.openstreetmap.org 검색 용인 반도체클러스터 일반산업단지 인근 원삼면 행정복지센터(Way 988839843 근방)",
    },
  },
  {
    id: "p04",
    title: "용인 Cluster 1기 공동구",
    cityOrProvince: "경기 용인시",
    regionId: "gyeonggi",
    clusterKey: "yongin",
    clusterIndex: 1,
    sigunguName: "용인시기흥구",
    municipalityCode: "31192",
    lngLat: {
      lat: 37.227301,
      lng: 127.0803025,
      verificationRef: "OpenStreetMap Nominatim 농서동(기흥구) 역점 — 클러스터 기흥권 동 단위 근사",
    },
  },
  {
    id: "p05",
    title: "디지털 엠파이어 평촌 비즈밸리 신축공사",
    cityOrProvince: "경기 안양시",
    regionId: "gyeonggi",
    clusterKey: "anyang",
    clusterIndex: 0,
    sigunguName: "안양시동안구",
    municipalityCode: "31042",
    lngLat: {
      lat: 37.3946757,
      lng: 126.9771614,
      verificationRef:
        "OpenStreetMap 관계 평촌동(동안구) 중심 — 비즈밸리 단지 내 개별 필지 검증 필요(동 단위 근사).",
    },
  },
  {
    id: "p06",
    title: "엔씨소프트 글로벌 RDI센터",
    cityOrProvince: "경기 성남시",
    regionId: "gyeonggi",
    clusterKey: "bundang",
    clusterIndex: 0,
    sigunguName: "성남시분당구",
    municipalityCode: "31023",
    lngLat: {
      lat: 37.3997363,
      lng: 127.1089023,
      verificationRef: "OpenStreetMap NC소프트 버스 정류 노드(https://www.openstreetmap.org 검색 삼평동·NC소프트)",
    },
  },
  {
    id: "p07",
    title: "수원연무동 주상복합",
    cityOrProvince: "경기 수원시",
    regionId: "gyeonggi",
    clusterKey: "suwon",
    clusterIndex: 0,
    sigunguName: "수원시장안구",
    municipalityCode: "31011",
    lngLat: {
      lat: 37.2925332,
      lng: 127.026567,
      verificationRef: "OpenStreetMap Nominatim 연무동(장안구) 노드 역점",
    },
  },
  {
    id: "p08",
    title: "평택 P5 RC공사 2공구",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 0,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(0),
  },
  {
    id: "p09",
    title: "과천지식정보타운 11-3블럭 신축공사",
    cityOrProvince: "경기 과천시",
    regionId: "gyeonggi",
    clusterKey: "gwacheon",
    clusterIndex: 0,
    sigunguName: "과천시",
    municipalityCode: "31110",
    lngLat: {
      lat: 37.4210755,
      lng: 127.0012297,
      verificationRef:
        "OpenStreetMap Nominatim 문원동(과천지식정보타운 표기) — 11-3블록 개별 핀은 공시·설계서 추가 필요",
    },
  },
  {
    id: "p11",
    title: "시흥 장현지구 업무시설 신축공사",
    cityOrProvince: "경기 시흥시",
    regionId: "gyeonggi",
    clusterKey: "siheung",
    clusterIndex: 0,
    sigunguName: "시흥시",
    municipalityCode: "31150",
    lngLat: {
      lat: 37.35486,
      lng: 126.7803814,
      verificationRef:
        "OpenStreetMap relation 군자동(시흥시) 중심 — 장현복합지구와 이웃한 북부 시흥 읍·동 단위 근사(미세 오차 가능).",
    },
  },
  {
    id: "p12",
    title: "안성 물류센터 신축공사",
    cityOrProvince: "경기 안성시",
    regionId: "gyeonggi",
    clusterKey: "anseong",
    clusterIndex: 0,
    sigunguName: "안성시",
    municipalityCode: "31220",
    lngLat: {
      lat: 36.9915,
      lng: 127.17214,
      verificationRef: "OpenStreetMap relation 공도읍(안성시) 중심 — 물류단지 내 개별 부지 검증 필요",
    },
  },
  {
    id: "p13",
    title: "판교 G2 업무시설",
    cityOrProvince: "경기 성남시",
    regionId: "gyeonggi",
    clusterKey: "bundang",
    clusterIndex: 1,
    sigunguName: "성남시분당구",
    municipalityCode: "31023",
    lngLat: {
      lat: 37.4017255,
      lng: 127.1019907,
      verificationRef: "OpenStreetMap Nominatim 삼평동(판교) 역점",
    },
  },
  {
    id: "p14",
    title: "미래인로지스부천 복합물류센터 신축공사",
    cityOrProvince: "경기 부천시",
    regionId: "gyeonggi",
    clusterKey: "bucheon",
    clusterIndex: 0,
    sigunguName: "부천시",
    municipalityCode: "31050",
    lngLat: {
      lat: 37.4697151,
      lng: 126.8117156,
      verificationRef: "OpenStreetMap relation 범박동(소사구) 법정동 중심 — 소사 물류 권역 근사",
    },
  },
  {
    id: "p15",
    title: "평택 P4 RC공사 1공구",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 1,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(1),
  },
  {
    id: "p17",
    title: "삼성전자(주) P3 154KV 변전소 신축공사 (Ph.3)",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 2,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(2),
  },
  {
    id: "p19",
    title: "평택 전자 P3 대기방지 신축공사 (P3장비기초공사)",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 3,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(3),
  },
  {
    id: "p20",
    title: "CJ제일제당 논산공장 COOKIT 공장 신축공사",
    cityOrProvince: "충청남도 논산시",
    regionId: "chungnam",
    clusterKey: "nonsan",
    clusterIndex: 0,
    sigunguName: "논산시",
    municipalityCode: "34060",
    lngLat: {
      lat: 36.231227,
      lng: 127.1994063,
      verificationRef:
        "OpenStreetMap Nominatim 연산면(논산시) 역점 — 공장 부지가 면 내 타 지번일 수 있음(면 단위 근사).",
    },
  },
  {
    id: "p21",
    title: "부천소사본동 주상복합 신축공사",
    cityOrProvince: "경기 부천시",
    regionId: "gyeonggi",
    clusterKey: "bucheon",
    clusterIndex: 1,
    sigunguName: "부천시",
    municipalityCode: "31050",
    lngLat: {
      lat: 37.4734085,
      lng: 126.7947805,
      verificationRef: "OpenStreetMap relation 소사본동(부천) 법정동 중심",
    },
  },
  {
    id: "p22",
    title: "평택 FAB 3기 신축공사 RC공사 3공구",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 4,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(4),
  },
  {
    id: "p23",
    title: "만도 NEXT M",
    cityOrProvince: "경상남도 창원시",
    regionId: "gyeongnam",
    clusterKey: "changwon",
    clusterIndex: 0,
    sigunguName: "창원시의창구",
    municipalityCode: "38111",
    lngLat: {
      lat: 35.24543,
      lng: 128.61784,
      verificationRef:
        "OpenStreetMap Nominatim 팔용동(의창구) 노드 역점 — 만도 브로제 부지 검증 필요(동 단위 근사)",
    },
  },
  {
    id: "p24",
    title: "텔레칩스사옥 신축공사",
    cityOrProvince: "경기 성남시",
    regionId: "gyeonggi",
    clusterKey: "bundang",
    clusterIndex: 2,
    sigunguName: "성남시분당구",
    municipalityCode: "31023",
    lngLat: {
      lat: 37.3887318,
      lng: 127.1078551,
      verificationRef: "OpenStreetMap Nominatim 백현동(판교) 역점 — 사옥 정확 핀 검증 필요",
    },
  },
  {
    id: "p25",
    title: "삼성전자(주) P3 154KV 변전소 신축공사",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 5,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(5),
  },
  {
    id: "p27",
    title: "삼성전자(주) 평택 P2L 하층서편마감 RC공사 3-1공구 신축공사",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 6,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(6),
  },
  {
    id: "p28",
    title: "삼성전자(주) 평택 P2-PJT UT동 P2L PH2,3 신축공사",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 7,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(7),
  },
  {
    id: "p29",
    title: "삼성전자(주) 평택  P2-PJT 초순수 [PH3]PVDF SHOP장 기초 PAD설치 공사",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 8,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(8),
  },
  {
    id: "p30",
    title: "삼성전자(주) 평택 P2L PH2 상동마감 RC 2-1공구",
    cityOrProvince: "경기 평택시",
    regionId: "gyeonggi",
    clusterKey: "pyeongtaek",
    clusterIndex: 9,
    sigunguName: "평택시",
    municipalityCode: "31070",
    lngLat: pyeongtaekCampusLngLat(9),
  },
  {
    id: "p31",
    title: "판교 알파돔 6-1블럭 복합시설 개발 신축공사 중 2차발주공사",
    cityOrProvince: "경기 성남시",
    regionId: "gyeonggi",
    clusterKey: "bundang",
    clusterIndex: 3,
    sigunguName: "성남시분당구",
    municipalityCode: "31023",
    lngLat: {
      lat: 37.3947237,
      lng: 127.1115312,
      verificationRef:
        "OpenStreetMap Nominatim 판교역(경강선) 노드 역점 — 알파돔 블록은 역·삼평동 사이(핀 검증 필요, 인접 교통핵 근거).",
    },
  },
  {
    id: "p34",
    title: "강릉시 주문진읍 공동주택 신축공사",
    cityOrProvince: "강원특별자치도 강릉시",
    regionId: "gangwon",
    clusterKey: "gangneung",
    clusterIndex: 0,
    sigunguName: "강릉시",
    municipalityCode: "32030",
    lngLat: {
      lat: 37.8953624,
      lng: 128.831436,
      verificationRef: "OpenStreetMap relation 주문진읍(강릉시) 면·읍 경계 중심 — 단지별 지번 검증 필요",
    },
  },
  {
    id: "p36",
    title: "판교 알파돔 6-1블럭 복합시설 개발 신축공사 중 1차발주공사",
    cityOrProvince: "경기 성남시",
    regionId: "gyeonggi",
    clusterKey: "bundang",
    clusterIndex: 4,
    sigunguName: "성남시분당구",
    municipalityCode: "31023",
    lngLat: {
      lat: 37.3887318,
      lng: 127.1078551,
      verificationRef:
        "OpenStreetMap Nominatim 백현동 역점 — p24 텔레칩스와 동일 읍·동권, clusterIndex·픽셀 오프셋으로만 구분(알파돔 1차 개별 핀 미확인).",
    },
  },
];

export const projectMapItems: ProjectMapItem[] = [
  ...SEOUL_RAW.map((r) => {
    const pos = seoulLngLatXYPair(r.lngLat, r.clusterIndex, r.seoulGu, r.municipalityCode);
    return {
      id: r.id,
      title: r.title,
      cityOrProvince: r.cityOrProvince,
      assetKind: kindFromTitle(r.title),
      clusterKey: r.clusterKey,
      clusterIndex: r.clusterIndex,
      x: pos.x,
      y: pos.y,
      nationalX: pos.nationalX,
      nationalY: pos.nationalY,
      municipalityCode: r.municipalityCode,
      regionId: "seoul" as const,
      sigunguName: r.seoulGu,
      summary: r.summary,
      lat: r.lngLat?.lat,
      lng: r.lngLat?.lng,
      verificationRef: r.lngLat?.verificationRef,
    };
  }),
  ...NON_SEOUL_RAW.map((r) => {
    const pos = xyPairLngLatOrFallback({
      lngLat: r.lngLat,
      overlapIndex: r.clusterIndex,
      municipalityCode: r.municipalityCode,
      regionId: r.regionId,
      regionCentroidXY: () => positionInRegionSigungu(r.regionId, r.sigunguName, r.clusterIndex),
    });
    return {
      id: r.id,
      title: r.title,
      cityOrProvince: r.cityOrProvince,
      assetKind: kindFromTitle(r.title),
      clusterKey: r.clusterKey,
      clusterIndex: r.clusterIndex,
      x: pos.x,
      y: pos.y,
      nationalX: pos.nationalX,
      nationalY: pos.nationalY,
      municipalityCode: r.municipalityCode,
      regionId: r.regionId,
      sigunguName: r.sigunguName,
      lat: r.lngLat?.lat,
      lng: r.lngLat?.lng,
      verificationRef: r.lngLat?.verificationRef,
    };
  }),
].map((item) => ({
  ...item,
  mapPlacement: resolveProjectMapPlacement(item.id),
}));

export function projectMapItemsForRegion(regionId: MapRegionId): ProjectMapItem[] {
  return projectMapItems.filter((p) => p.regionId === regionId);
}

export type { ProjectMapPlacement } from "./projectMapManualPlacements";

/**
 * 비서울 광역 요약 — 지도 활성화 후에도 문서화용 유지 (28건 = 권역별 맵 표시 원천 동일 목록과 대응)
 */
export const PROJECT_MAP_NON_SEOUL_REGIONS = [
  {
    name: "충남·세종(단일 지도 탭)",
    detail: "세종 1건 + 논산 1건 (행정코드 29·34 병합 SVG)",
    count: 2,
  },
  {
    name: "경기도",
    detail: "용인·안양·성남·수원·평택·과천·시흥·안성·부천 등",
    count: 24,
  },
  { name: "경상남도", detail: "창원(만도 NEXT M 등)", count: 1 },
  { name: "강원특별자치도", detail: "강릉", count: 1 },
] as const;

export function assetKindLabel(k: AssetKind): string {
  switch (k) {
    case "apartment":
      return "아파트";
    case "house":
      return "주택";
    case "warehouse":
      return "창고·물류";
    case "company":
      return "사옥·업무";
    default: {
      const _exhaustive: never = k;
      return _exhaustive;
    }
  }
}

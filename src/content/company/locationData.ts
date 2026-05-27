export const LOCATION_ADDRESS =
  "서울시 금천구 가산디지털2로 101( 가산동 549-1 ) 한라원앤원타워 B동 17층 1701호";

/** 카카오 지오코딩용 (간략 주소) */
export const LOCATION_GEO_QUERY = "서울 금천구 가산디지털2로 101";

/** 지오코딩 실패 시 한라원앤타워 B동 부근 좌표 */
export const LOCATION_MAP_FALLBACK = { lat: 37.477812, lng: 126.878213 } as const;

export const LOCATION_MAP_LABEL = "(주)태일씨앤티";

/** SDK 실패 시 임시 폴백 (로그인·길찾기 UI 포함) */
export const LOCATION_KAKAO_MAP_EMBED_SRC = `https://map.kakao.com/link/map/${encodeURIComponent(LOCATION_MAP_LABEL)},${LOCATION_MAP_FALLBACK.lat},${LOCATION_MAP_FALLBACK.lng}`;

export const LOCATION_TEL = "070-8897-0761";
export const LOCATION_FAX = "02-2101-2141";

/** 카카오맵 크게 보기 (API 연동 전 외부 링크) */
export const LOCATION_KAKAO_MAP_URL = "http://kko.to/lrpfcrc0H";

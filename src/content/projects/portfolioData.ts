/** 레거시 사업실적 유형(http://www.taeilcnt.co.kr/home/order/order_list.jsp)과 동일 키 */
import orderListCoverByTitle from "./orderListCoverByTitle.json" with { type: "json" };

export type ProjectCategoryId =
  | "housing"
  | "office"
  | "edu-med"
  | "plant"
  | "skyscraper"
  | "retail"
  | "other";

export const CATEGORY_LABELS: Record<ProjectCategoryId, string> = {
  housing: "주택",
  office: "업무시설",
  "edu-med": "교육/의료",
  plant: "플랜트",
  skyscraper: "초고층",
  retail: "판매시설",
  other: "기타",
};

/** 공사별 대표 이미지(레거시 상세 페이지 기준). 신규 항목만 기본 이미지. */
const DEFAULT_ORDER_COVER = "media/company/history-hero-construction.png";

function orderCoverPath(name: string): string {
  const m = orderListCoverByTitle as Record<string, string>;
  return m[name] ?? DEFAULT_ORDER_COVER;
}

export type ProjectRecord = {
  slug: string;
  name: string;
  category: ProjectCategoryId;
  /** `public/` 기준 경로 (예: media/business/orders/legacy-1.jpg) */
  coverSrc: string;
  client?: string;
  contractor?: string;
  scale?: string;
  period?: string;
  status?: string;
};

const RAW_TITLES: string[] = [
  "다이소 세종 온라인센터",
  "용인 Cluster 1기 OBL",
  "Westin Seoul Parnas 리모델링공사",
  "용인 Cluster 1기 공동구",
  "디지털 엠파이어 평촌 비즈밸리 신축공사",
  "엔씨소프트 글로벌 RDI센터",
  "수원연무동 주상복합",
  "평택 P5 RC공사 2공구",
  "과천지식정보타운 11-3블럭 신축공사",
  "가산 데이터센터",
  "시흥 장현지구 업무시설 신축공사",
  "안성 물류센터 신축공사",
  "판교 G2 업무시설",
  "미래인로지스부천 복합물류센터 신축공사",
  "평택 P4 RC공사 1공구",
  "비상교육 사옥 신축공사",
  "삼성전자(주) P3 154KV 변전소 신축공사 (Ph.3)",
  "몬트레아 한남 신축공사",
  "평택 전자 P3 대기방지 신축공사 (P3장비기초공사)",
  "CJ제일제당 논산공장 COOKIT 공장 신축공사",
  "부천소사본동 주상복합 신축공사",
  "평택 FAB 3기 신축공사 RC공사 3공구",
  "만도 NEXT M",
  "텔레칩스사옥 신축공사",
  "삼성전자(주) P3 154KV 변전소 신축공사",
  "가산동 549-1번지 지식산업센터 신축공사",
  "삼성전자(주) 평택 P2L 하층서편마감 RC공사 3-1공구 신축공사",
  "삼성전자(주) 평택 P2-PJT UT동 P2L PH2,3 신축공사",
  "삼성전자(주) 평택  P2-PJT 초순수 [PH3]PVDF SHOP장 기초 PAD설치 공사",
  "삼성전자(주) 평택 P2L PH2 상동마감 RC 2-1공구",
  "판교 알파돔 6-1블럭 복합시설 개발 신축공사 중 2차발주공사",
  "브라이튼 여의도 복합시설 신축공사 1공구",
  "숭인동 오피스텔 신축공사",
  "강릉시 주문진읍 공동주택 신축공사",
  "컬쳐랜드 대치동 사옥 신축공사",
  "판교 알파돔 6-1블럭 복합시설 개발 신축공사 중 1차발주공사",
  "신사동 504 복합개발사업 신축공사",
  "삼원특수지 중곡동 복합시설 신축공사",
  "여의도 MBC 개발사업 철근콘크리트공사 2공구 Precon",
  "현대백화점사옥 신축공사",
  "삼성 SDS 춘천데이터센터 신축공사",
  "삼성전자(주) 평택 고덕국제화산업단지 냉각탑(CT2) 신축공사",
  "삼성전자(주) 평택 고덕국제화산업단지 용역동(UT2) 신축공사",
  "삼성전자(주) 평택 고덕국제화산업단지 설비동(Fab2) 신축공사",
  "하남 미사 중심상업용지 11-1블럭 복합시설 신축공사",
  "삼성전자(주) 평택 고덕국제화산업단지 UT/CT PH4",
  "삼성전자(주) 평택 고덕국제화산업단지 설비동(Fab) 동편 마감공사",
  "평택공장(부속창고) 신축공사",
  "김포풍무2차 센트럴푸르지오 신축공사(4공구)",
  "인천지방합동청사 신축공사",
  "삼성전자(주) 평택 고덕국제화산업단지 설비동(Fab) 서편 마감공사",
  "평촌자이엘라 신축공사",
  "울산 야음주공2단지 아파트 주택재건축 정비사업 신축공사",
  "청라 디오스텔 신축공사",
  "오라카이 서초 관광호텔 신축공사",
  "남양주 다산진건 힐스테이트",
  "해성산업 복합시설 신축공사",
  "서초동 꽃마을 복합시설 신축공사(지하층)",
  "삼성전자(주) 평택 고덕국제화산업단지 용역동(UT) 신축공사",
  "운정신도시 센트럴푸르지오",
  "서대전역 우방 아이유셀 스카이 팰리스 신축공사",
  "파주운정 A21BL 아파트(행복주택) 건설공사 17공구",
  "삼성전자(주) 평택 고덕국제화산업단지 냉각탑(CT) 신축공사",
  "금계초 증축공사 및 백석초 다목적강당 증축공사",
  "마곡럭스나인 오피스텔 C1-2 신축공사",
  "마곡럭스나인 오피스텔 C1-5 신축공사",
  "인천 기아차 서비스센터 신축공사",
  "수원 광교 힐스테이트 신축현장",
  "광진경찰서청사 신축공사",
  "삼성전자(주) 평택 고덕국제화산업단지 154kv 신축공사",
  "서초동 꽃마을 복합시설 신축공사(지상층)",
  "대구 테크노 A-7BL아파트",
  "BYC 본사 대수선 공사",
  "거제 피솔공장 도장공장",
  "평택정보시설 현장",
  "거제 장평 종합복지관 신축공사",
  "수원 광교 이마트 신축현장",
  "도곡동신아파트 주택재건축 공사",
  "삼성창원병원 제3관 증축공사",
  "거제 사외 기숙사",
  "판교 디테라스 신축공사",
  "전주효자동 BYC빌딩 신축공사",
  "거제 조선 유틸리티공사(8콤프, K콤프)",
];

function inferCategory(name: string): ProjectCategoryId {
  const n = name;
  if (/초등|증축|학교|병원/.test(n)) return "edu-med";
  if (/이마트|다이소/.test(n)) return "retail";
  if (
    /변전소|FAB|평택.*전자|삼성전자|하이닉스|RC공사|공장|COOKIT|정보시설|도장|콤프|유틸리티|CT|UT|설비동|초순수|PAD|P[0-9]|OBL|공동구|물류센터|기아차 서비스|피솔/.test(
      n,
    )
  )
    return "plant";
  if (/알파돔|브라이튼|한남|MBC|신사동 504|지식산업센터|Westin|여의도.*복합|하남 미사/.test(n)) return "skyscraper";
  if (
    /아파트|주택|주상복합|아파트|오피스텔|힐스테이트|푸르지오|행복주택|재건축|주공|디오스텔|스카이|테크노|운정|야음|주문진|동신|도곡/.test(
      n,
    )
  )
    return "housing";
  if (/업무|사옥|데이터센터|청사|판교 G2|비즈밸리|리모델링|텔레칩스|비상교육|현대백화점|SDS|만도|컬쳐랜드|삼원특수지|광진경찰/.test(n))
    return "office";
  return "other";
}

/** 레거시 order_list.jsp에서 확인된 상세(일부 공사) */
const DETAIL_BY_NAME: Record<string, Pick<ProjectRecord, "client" | "contractor" | "scale" | "period" | "status">> = {
  "다이소 세종 온라인센터": {
    client: "(주)아성다이소",
    contractor: "KCC건설",
    scale: "—",
    period: "2025.06.01~2026.09.11",
    status: "진행",
  },
  "용인 Cluster 1기 OBL": {
    client: "에스케이하이닉스(주)",
    contractor: "에스케이에코플랜트(주)",
    scale: "—",
    period: "2025.02.14~2027.06.30",
    status: "진행",
  },
  "Westin Seoul Parnas 리모델링공사": {
    client: "파르나스호텔㈜",
    contractor: "GS건설(주)",
    scale: "—",
    period: "2025.01.22~2025.08.31",
    status: "—",
  },
  "용인 Cluster 1기 공동구": {
    client: "에스케이하이닉스(주)",
    contractor: "에스케이에코플랜트(주)",
    scale: "—",
    period: "2024.10.23~2027.06.30",
    status: "진행",
  },
  "디지털 엠파이어 평촌 비즈밸리 신축공사": {
    client: "주식회사 케이티앤지",
    contractor: "디엘건설 주식회사",
    scale: "지하4층 지상18층 건축면적 7,083㎡(2,142평) 연면적 99,168㎡(29,998평)",
    period: "2024.08.21~2026.06.30",
    status: "진행",
  },
  "엔씨소프트 글로벌 RDI센터": {
    client: "엔씨소프트(주)",
    contractor: "삼성물산 주식회사",
    scale: "지하8층 지상14층 건축면적 12,859.95㎡(3,890평) 연면적 182,354㎡(55,162평)",
    period: "2024.07.30~2027.10.24",
    status: "진행",
  },
};

export const portfolioProjects: ProjectRecord[] = RAW_TITLES.map((name, i) => {
  const slug = `p-${String(i + 1).padStart(3, "0")}`;
  const extra = DETAIL_BY_NAME[name];
  return {
    slug,
    name,
    category: inferCategory(name),
    ...extra,
    coverSrc: orderCoverPath(name),
  };
});

export function findProjectBySlug(slug: string): ProjectRecord | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

/** 지도 마커 id(`p01` … `p36`) → 공사수주 상세 slug(`p-001` …) */
export function portfolioSlugFromMapItemId(mapItemId: string): string | null {
  const m = /^p(\d+)$/i.exec(mapItemId.trim());
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (n < 1 || n > 999) return null;
  return `p-${String(n).padStart(3, "0")}`;
}

export function coverSrcForMapItemId(mapItemId: string): string | undefined {
  const slug = portfolioSlugFromMapItemId(mapItemId);
  if (!slug) return undefined;
  return findProjectBySlug(slug)?.coverSrc;
}

export function projectsInCategory(cat: ProjectCategoryId | "all"): ProjectRecord[] {
  if (cat === "all") return portfolioProjects;
  return portfolioProjects.filter((p) => p.category === cat);
}

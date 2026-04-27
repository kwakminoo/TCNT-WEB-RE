import type { NavChild, NavEntry, NavGroup } from "./types";

export { isNavGroup } from "./types";

/** 상단 GNB 5개 + 사이트맵 구조 (기술혁신·사이트맵 GNB 제외, 푸터 등에서 사이트맵 링크 유지) */
export const navEntries: NavEntry[] = [
  {
    label: "회사소개",
    children: [
      { label: "인사말", path: "/about/greeting" },
      { label: "경영이념", path: "/about/philosophy" },
      { label: "회사연혁", path: "/about/history" },
      { label: "주거래 시공사", path: "/about/clients" },
      { label: "업·면허/인증", path: "/about/licenses" },
      { label: "찾아오는길", path: "/about/location" },
    ],
  },
  {
    label: "사업실적",
    children: [
      { label: "공사수주 현황", path: "/business/orders" },
      { label: "주택", path: "/business/housing" },
      { label: "업무시설", path: "/business/office" },
      { label: "교육/의료", path: "/business/education-medical" },
      { label: "플랜트", path: "/business/plant" },
      { label: "초고층", path: "/business/skyscraper" },
      { label: "판매시설", path: "/business/retail" },
      { label: "기타", path: "/business/other" },
      { label: "Project Map", path: "/business/project-map" },
    ],
  },
  {
    label: "홍보센터",
    children: [
      { label: "News", path: "/pr/news" },
      { label: "유튜브", path: "/pr/youtube" },
    ],
  },
  { label: "ESG경영", path: "/esg" },
  {
    label: "인재채용",
    children: [
      { label: "직무소개", path: "/career/job-intro" },
      { label: "인사제도", path: "/career/hr-policy" },
      { label: "채용가이드", path: "/career/guide" },
      { label: "복리후생", path: "/career/benefits" },
      { label: "채용FAQ", path: "/career/faq" },
    ],
  },
];

export function flattenNavPaths(entries: NavEntry[]): NavChild[] {
  const out: NavChild[] = [];
  for (const e of entries) {
    if ("children" in e) {
      out.push(...e.children);
    } else {
      out.push(e);
    }
  }
  return out;
}

export const allNavLinks: NavChild[] = flattenNavPaths(navEntries);

export function findParentGroup(pathname: string): NavGroup | undefined {
  for (const e of navEntries) {
    if ("children" in e && e.children.some((c) => c.path === pathname)) {
      return e;
    }
  }
  return undefined;
}

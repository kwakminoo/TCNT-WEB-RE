import type { NavChild, NavEntry, NavGroup } from "./types";

export { isNavGroup } from "./types";

/** 상단 GNB + 사이트맵 구조 */
export const navEntries: NavEntry[] = [
  {
    label: "회사소개",
    children: [
      { label: "인사말", path: "/about/greeting" },
      { label: "경영이념", path: "/about/philosophy" },
      { label: "회사연혁", path: "/about/history" },
      { label: "기구조직도", path: "/about/organization" },
      { label: "업·면허/인증", path: "/about/licenses" },
      { label: "주거래 시공사", path: "/about/clients" },
      { label: "찾아오는길", path: "/about/location" },
    ],
  },
  {
    label: "사업실적",
    children: [
      { label: "공사수주 현황", path: "/business/orders" },
      { label: "프로젝트 맵", path: "/business/project-map" },
    ],
  },
  {
    label: "기술혁신",
    children: [
      { label: "기술혁신 비전", path: "/innovation/vision" },
      { label: "기술혁신 News", path: "/innovation/news" },
    ],
  },
  {
    label: "홍보센터",
    children: [
      { label: "News", path: "/pr/news" },
      { label: "유튜브", path: "/pr/youtube" },
      { label: "사회공헌", path: "/pr/social" },
      { label: "홍보자료", path: "/pr/materials" },
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
      { label: "채용공고", path: "/career/jobs" },
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
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const baseOf = (p: string) => p.split("?")[0] ?? p;

  for (const e of navEntries) {
    if (!("children" in e)) continue;
    const hit = e.children.some((c) => {
      const b = baseOf(c.path);
      return b === normalized || normalized.startsWith(`${b}/`);
    });
    if (hit) return e;
  }
  if (normalized.startsWith("/pr/news/") && normalized !== "/pr/news") {
    return navEntries.find((e): e is NavGroup => "children" in e && e.label === "홍보센터");
  }
  return undefined;
}

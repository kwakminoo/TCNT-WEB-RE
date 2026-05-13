import { findNewsArticleBySlug } from "./pr/newsItems";
import { findProjectBySlug } from "./projects/portfolioData";

/** 동적 경로 등 `pagesByPath`에 없는 페이지의 끝 crumb 제목 */
export function breadcrumbLeafTitle(pathname: string): string | undefined {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p.startsWith("/pr/news/") && p !== "/pr/news") {
    const slug = p.slice("/pr/news/".length);
    return findNewsArticleBySlug(slug)?.title;
  }
  if (p.startsWith("/business/orders/") && p !== "/business/orders") {
    const slug = p.slice("/business/orders/".length);
    return findProjectBySlug(slug)?.name;
  }
  return undefined;
}

/** `pagesByPath`에 없는 정적 경로의 h1/문서 제목 */
export const standalonePageTitles: Record<string, string> = {
  "/business/orders": "공사수주 현황",
  "/pr/news": "News",
};

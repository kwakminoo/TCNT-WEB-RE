import { findCareerJobById } from "./career/careerJobs";
import { findInnovationNewsById } from "./innovation/innovationNews";
import { findPrNewsById } from "./pr/prNews";
import { findSocialContributionById } from "./pr/socialContribution";
import { findProjectBySlug } from "./projects/portfolioData";

/** 동적 경로 등 `pagesByPath`에 없는 페이지의 끝 crumb 제목 */
export function breadcrumbLeafTitle(pathname: string): string | undefined {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p.startsWith("/innovation/news/") && p !== "/innovation/news") {
    const id = p.slice("/innovation/news/".length);
    return findInnovationNewsById(id)?.title;
  }
  if (p.startsWith("/pr/news/") && p !== "/pr/news") {
    const slug = p.slice("/pr/news/".length);
    return findPrNewsById(slug)?.title;
  }
  if (p.startsWith("/pr/social/") && p !== "/pr/social") {
    const slug = p.slice("/pr/social/".length);
    return findSocialContributionById(slug)?.title;
  }
  if (p.startsWith("/career/jobs/") && p !== "/career/jobs") {
    const id = p.slice("/career/jobs/".length);
    return findCareerJobById(id)?.title;
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
  "/pr/social": "사회공헌",
};

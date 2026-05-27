import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { ContentSectionHead } from "../components/page/ContentSectionHead";
import { Pagination } from "../components/page/Pagination";
import { findParentGroup } from "../content/navData";
import {
  CATEGORY_LABELS,
  type ProjectCategoryId,
  type ProjectRecord,
  projectsInCategory,
} from "../content/projects/portfolioData";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

const CATEGORY_KEYS: (ProjectCategoryId | "all")[] = [
  "all",
  "housing",
  "office",
  "edu-med",
  "plant",
  "skyscraper",
  "retail",
  "other",
];

function categoryFromSearch(raw: string | null): ProjectCategoryId | "all" {
  if (!raw) return "all";
  if (CATEGORY_KEYS.includes(raw as ProjectCategoryId | "all")) return raw as ProjectCategoryId | "all";
  return "all";
}

const PAGE_SIZE = 12;

function isOrderInProgress(project: ProjectRecord): boolean {
  return project.status?.trim() === "진행";
}

function businessNavLinkClass(itemPath: string, loc: { pathname: string }): string {
  const path = itemPath.split("?")[0];
  const base = "page-local-nav__link";
  if (path === "/business/orders") {
    const on =
      loc.pathname === "/business/orders" || loc.pathname.startsWith("/business/orders/");
    return `${base}${on ? " page-local-nav__link--active" : ""}`;
  }
  const on = loc.pathname === path || loc.pathname.startsWith(`${path}/`);
  return `${base}${on ? " page-local-nav__link--active" : ""}`;
}

export function ProjectPortfolioPage() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = categoryFromSearch(searchParams.get("category"));
  const [page, setPage] = useState(1);

  const businessNav = findParentGroup(pathname);

  const filtered = useMemo(() => projectsInCategory(category), [category]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [category]);

  const pageSafe = Math.min(Math.max(1, page), pageCount);
  const slice = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, pageSafe]);

  function setCategory(next: ProjectCategoryId | "all") {
    setPage(1);
    if (next === "all") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ category: next }, { replace: true });
    }
  }

  return (
    <SubpageShell
      className="page-shell--orders"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">공사수주 현황</h1>
        </>
      }
      subNav={
        businessNav?.label === "사업실적" ? (
          <nav className="page-local-nav" aria-label="사업실적 하위 메뉴">
            <div className="container page-local-nav__inner">
              {businessNav.children.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={() => businessNavLinkClass(item.path, { pathname })}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        ) : undefined
      }
    >
      <div className="orders-page">
        <div className="container orders-page__inner">
          <div className="orders-page__head-wrap">
            <ContentSectionHead
              id="orders-list-heading"
              title="프로젝트 목록"
              className="orders-page__head"
            />
          </div>
        <div className="orders-legacy-filter" role="group" aria-label="유형 필터">
          <div className="orders-legacy-filter__tabs">
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`orders-legacy-filter__tab${category === key ? " is-active" : ""}`}
                aria-pressed={category === key}
                onClick={() => setCategory(key)}
              >
                {key === "all" ? "전체" : CATEGORY_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        <ul className="orders-legacy-list" aria-label="공사 수주 목록">
          {slice.map((proj) => (
            <li key={proj.slug}>
              <ProjectCard project={proj} />
            </li>
          ))}
        </ul>

        <Pagination
          page={pageSafe}
          pageCount={pageCount}
          onPageChange={(n) => setPage(n)}
          idBase="portfolio"
        />
        </div>
      </div>
    </SubpageShell>
  );
}

function ProjectCard({ project }: { project: ProjectRecord }) {
  return (
    <article className="orders-legacy-card">
      <div className="orders-legacy-card__thumb" aria-hidden>
        <img src={mediaSrc(project.coverSrc)} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="orders-legacy-card__body">
        <div className="orders-legacy-card__badges">
          <p className="orders-legacy-card__badge">{CATEGORY_LABELS[project.category]}</p>
          {isOrderInProgress(project) ? (
            <span className="orders-progress-chip" role="status">
              진행
            </span>
          ) : null}
        </div>
        <h2 className="orders-legacy-card__title">
          <Link to={`/business/orders/${project.slug}`}>{project.name}</Link>
        </h2>
        <ul className="orders-legacy-card__facts">
          {project.client ? (
            <li>
              <strong>발주처(자)</strong> {project.client}
            </li>
          ) : null}
          {project.contractor ? (
            <li>
              <strong>시공사</strong> {project.contractor}
            </li>
          ) : null}
          {project.scale ? (
            <li>
              <strong>규모</strong> {project.scale}
            </li>
          ) : null}
          {project.period ? (
            <li>
              <strong>공사기간</strong> {project.period}
            </li>
          ) : (
            <li className="muted">
              <strong>공사기간</strong> 공개 상세 정보 없음
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}

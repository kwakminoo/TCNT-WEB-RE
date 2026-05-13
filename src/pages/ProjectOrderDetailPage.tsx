import { Link, NavLink, Navigate, useLocation, useParams } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { findParentGroup } from "../content/navData";
import {
  CATEGORY_LABELS,
  findProjectBySlug,
  type ProjectRecord,
} from "../content/projects/portfolioData";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

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

export function ProjectOrderDetailPage() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const project = slug ? findProjectBySlug(slug) : undefined;
  const businessNav = findParentGroup(pathname);

  if (!project) {
    return <Navigate to="/business/orders" replace />;
  }

  return (
    <SubpageShell
      className="page-shell--orders"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">{project.name}</h1>
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
      <div className="container prose">
        <figure className="orders-detail-cover">
          <img
            src={mediaSrc(project.coverSrc)}
            alt={`${project.name} 현장 대표 이미지`}
            loading="eager"
            decoding="async"
          />
        </figure>
        <dl className="detail-dl">
          <div>
            <dt>유형</dt>
            <dd>{CATEGORY_LABELS[project.category]}</dd>
          </div>
          <div>
            <dt>발주처(자)</dt>
            <dd>{project.client ?? "—"}</dd>
          </div>
          <div>
            <dt>시공사</dt>
            <dd>{project.contractor ?? "—"}</dd>
          </div>
          <div>
            <dt>규모</dt>
            <dd>{project.scale ?? "—"}</dd>
          </div>
          <div>
            <dt>공사기간</dt>
            <dd>{project.period ?? "—"}</dd>
          </div>
          <div>
            <dt>진행상태</dt>
            <dd>
              {isOrderInProgress(project) ? (
                <span className="orders-progress-chip" role="status">
                  진행
                </span>
              ) : (
                project.status ?? "—"
              )}
            </dd>
          </div>
        </dl>
        <p>
          <Link to="/business/orders" className="btn btn-ghost">
            목록으로
          </Link>
        </p>
      </div>
    </SubpageShell>
  );
}

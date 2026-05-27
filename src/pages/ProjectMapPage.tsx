import { NavLink, useLocation } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { ProjectMapSection } from "../components/ProjectMapSection";
import { ContentSectionHead } from "../components/page/ContentSectionHead";
import { SubpageShell } from "../components/SubpageShell";
import { findParentGroup } from "../content/navData";
import { pagesByPath } from "../content/pagesData";

const page = pagesByPath["/business/project-map"];

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

export function ProjectMapPage() {
  const { pathname } = useLocation();
  const businessNav = findParentGroup(pathname);

  return (
    <SubpageShell
      mapMode
      className="page-shell--project-map"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">{page.title}</h1>
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
      <div className="container orders-page__inner">
        <div className="orders-page__head-wrap">
          <ContentSectionHead
            id="project-map-list-heading"
            title="Project Map"
            className="orders-page__head"
          />
        </div>
      </div>
      <ProjectMapSection showSectionHeader={false} />
    </SubpageShell>
  );
}

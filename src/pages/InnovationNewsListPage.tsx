import { NavLink, useLocation } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { InnovationNewsLayout } from "../components/page/InnovationNewsLayout";
import { SubpageShell } from "../components/SubpageShell";
import { findParentGroup } from "../content/navData";

export function InnovationNewsListPage() {
  const { pathname } = useLocation();
  const innovationNav = findParentGroup(pathname);

  return (
    <SubpageShell
      className="page-shell--innovation-news"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">기술혁신 News</h1>
        </>
      }
      subNav={
        innovationNav?.label === "기술혁신" ? (
          <nav className="page-local-nav" aria-label="기술혁신 하위 메뉴">
            <div className="container page-local-nav__inner">
              {innovationNav.children.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `page-local-nav__link${isActive ? " page-local-nav__link--active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        ) : undefined
      }
    >
      <InnovationNewsLayout />
    </SubpageShell>
  );
}

import { NavLink, useLocation } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { PrNewsLayout } from "../components/page/PrNewsLayout";
import { SubpageShell } from "../components/SubpageShell";
import { findParentGroup } from "../content/navData";

export function PrNewsListPage() {
  const { pathname } = useLocation();
  const prNav = findParentGroup(pathname);

  return (
    <SubpageShell
      className="page-shell--pr-news"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">News</h1>
        </>
      }
      subNav={
        prNav?.label === "홍보센터" ? (
          <nav className="page-local-nav" aria-label="홍보센터 하위 메뉴">
            <div className="container page-local-nav__inner">
              {prNav.children.map((item) => (
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
      <PrNewsLayout />
    </SubpageShell>
  );
}

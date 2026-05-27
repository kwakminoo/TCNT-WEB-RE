import { NavLink, useLocation } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { YoutubeLayout } from "../components/page/YoutubeLayout";
import { SubpageShell } from "../components/SubpageShell";
import { findParentGroup } from "../content/navData";

export function YoutubePage() {
  const { pathname } = useLocation();
  const prNav = findParentGroup(pathname);

  return (
    <SubpageShell
      className="page-shell--youtube"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">유튜브</h1>
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
      <YoutubeLayout />
    </SubpageShell>
  );
}

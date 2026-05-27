import { NavLink, useLocation } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { LocationLayout } from "../components/page/LocationLayout";
import { SubpageShell } from "../components/SubpageShell";
import { findParentGroup } from "../content/navData";

export function LocationPage() {
  const { pathname } = useLocation();
  const companyNav = findParentGroup(pathname);

  return (
    <SubpageShell
      className="page-shell--location"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">찾아오시는길</h1>
        </>
      }
      subNav={
        companyNav?.label === "회사소개" ? (
          <nav className="page-local-nav" aria-label="회사소개 하위 메뉴">
            <div className="container page-local-nav__inner">
              {companyNav.children.map((item) => (
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
      <LocationLayout />
    </SubpageShell>
  );
}

import { Link } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { isNavGroup, navEntries } from "../content/navData";

export function SiteMapPage() {
  return (
    <SubpageShell
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">사이트맵</h1>
          <p className="lead">
            전체 메뉴 구조를 한눈에 확인하고 원하는 페이지로 이동하세요.
          </p>
        </>
      }
    >
      <div className="container site-map-columns">
          {navEntries.map((entry) =>
            isNavGroup(entry) ? (
              <div key={entry.label} className="card site-map-card">
                <h2 className="site-map-card__title">{entry.label}</h2>
                <ul className="site-map-card__list">
                  {entry.children.map((c) => (
                    <li key={c.path}>
                      <Link to={c.path}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div key={entry.path} className="card site-map-card">
                <h2 className="site-map-card__title">{entry.label}</h2>
                <p className="site-map-card__cta">
                  <Link to={entry.path}>바로가기</Link>
                </p>
              </div>
            ),
          )}
      </div>
    </SubpageShell>
  );
}

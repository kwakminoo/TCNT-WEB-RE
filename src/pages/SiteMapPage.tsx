import { Link } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { isNavGroup, navEntries } from "../content/navData";

export function SiteMapPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container">
          <BreadcrumbNav />
          <h1 id="page-title">사이트맵</h1>
          <p className="lead">
            전체 메뉴 구조를 한눈에 확인하고 원하는 페이지로 이동하세요.
          </p>
        </div>
      </section>
      <section className="page-body">
        <div className="container site-map-columns">
          {navEntries.map((entry) =>
            isNavGroup(entry) ? (
              <div key={entry.label} className="card">
                <h2 style={{ marginTop: 0 }}>{entry.label}</h2>
                <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
                  {entry.children.map((c) => (
                    <li key={c.path} style={{ marginBottom: "0.5rem" }}>
                      <Link to={c.path}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div key={entry.path} className="card">
                <h2 style={{ marginTop: 0 }}>{entry.label}</h2>
                <p style={{ marginTop: 0 }}>
                  <Link to={entry.path}>바로가기</Link>
                </p>
              </div>
            ),
          )}
        </div>
      </section>
    </>
  );
}

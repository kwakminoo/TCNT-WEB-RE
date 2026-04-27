import { Navigate, useLocation } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { pagesByPath } from "../content/pagesData";

export function StaticPage() {
  const { pathname } = useLocation();
  const page = pagesByPath[pathname];
  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container">
          <BreadcrumbNav />
          <h1 id="page-title">{page.title}</h1>
          {page.lead ? <p className="lead">{page.lead}</p> : null}
        </div>
      </section>
      <section className="page-body">
        <div className="container prose">
          {page.blocks.map((b, i) => (
            <div key={i}>
              {b.heading ? <h2>{b.heading}</h2> : null}
              {(b.paragraphs ?? []).map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {b.bullets ? (
                <ul>
                  {b.bullets.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

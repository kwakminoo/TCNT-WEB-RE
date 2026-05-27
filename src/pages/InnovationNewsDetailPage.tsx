import { Link, Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { findParentGroup } from "../content/navData";
import { findInnovationNewsById } from "../content/innovation/innovationNews";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

export function InnovationNewsDetailPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const article = id ? findInnovationNewsById(id) : undefined;
  const innovationNav = findParentGroup(pathname);

  if (!article) {
    return <Navigate to="/innovation/news" replace />;
  }

  return (
    <SubpageShell
      className="page-shell--innovation-news page-shell--innovation-news-detail"
      intro={
        <>
          <BreadcrumbNav />
          <p className="innovation-news-detail__date">
            <time dateTime={article.date}>{article.date}</time>
          </p>
          <h1 id="page-title">{article.title}</h1>
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
      <div className="container innovation-news-detail">
        <figure className="innovation-news-detail__figure">
          <img
            src={mediaSrc(article.image_url)}
            alt=""
            loading="eager"
            decoding="async"
            width={1200}
            height={675}
          />
        </figure>
        <article className="prose innovation-news-detail__body">
          <p>{article.content}</p>
          <p>
            <Link to="/innovation/news" className="btn btn-ghost">
              목록으로
            </Link>
          </p>
        </article>
      </div>
    </SubpageShell>
  );
}

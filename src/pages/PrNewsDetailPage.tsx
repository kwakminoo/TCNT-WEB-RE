import { Link, Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { findParentGroup } from "../content/navData";
import {
  findPrNewsById,
  formatPrNewsDate,
  prNewsCategoryTag,
} from "../content/pr/prNews";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

export function PrNewsDetailPage() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const article = slug ? findPrNewsById(slug) : undefined;
  const prNav = findParentGroup(pathname);

  if (!article) {
    return <Navigate to="/pr/news" replace />;
  }

  return (
    <SubpageShell
      className="page-shell--pr-news page-shell--pr-news-detail"
      intro={
        <>
          <BreadcrumbNav />
          <p className="pr-news-detail__date">
            <time dateTime={article.date}>{formatPrNewsDate(article.date)}</time>
          </p>
          <h1 id="page-title">
            <span className="pr-news-detail__category">{prNewsCategoryTag(article.category)}</span>
            {article.title}
          </h1>
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
      <div className="container pr-news-detail">
        <figure className="pr-news-detail__figure">
          <img
            src={mediaSrc(article.image_url)}
            alt=""
            loading="eager"
            decoding="async"
            width={1200}
            height={675}
          />
        </figure>
        <article className="prose pr-news-detail__body">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            <Link to="/pr/news" className="btn btn-ghost">
              목록으로
            </Link>
          </p>
        </article>
      </div>
    </SubpageShell>
  );
}

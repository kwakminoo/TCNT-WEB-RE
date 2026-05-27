import { Link, Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { findParentGroup } from "../content/navData";
import {
  findSocialContributionById,
  formatSocialDate,
  socialMediaSrc,
} from "../content/pr/socialContribution";

export function SocialContributionDetailPage() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const article = slug ? findSocialContributionById(slug) : undefined;
  const prNav = findParentGroup(pathname);

  if (!article) {
    return <Navigate to="/pr/social" replace />;
  }

  const dateLabel = formatSocialDate(article.date);

  return (
    <SubpageShell
      className="page-shell--pr-social page-shell--pr-social-detail"
      intro={
        <>
          <BreadcrumbNav />
          {dateLabel ? (
            <p className="pr-social-detail__date">
              <time dateTime={article.date}>{dateLabel}</time>
            </p>
          ) : null}
          <h1 id="page-title">{article.title}</h1>
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
      <div className="container pr-social-detail">
        <figure className="pr-social-detail__figure">
          <img
            src={socialMediaSrc(article.image_url)}
            alt=""
            loading="eager"
            decoding="async"
            width={1200}
            height={675}
          />
        </figure>
        <article className="prose pr-social-detail__body">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            <Link to="/pr/social" className="btn btn-ghost">
              목록으로
            </Link>
          </p>
        </article>
      </div>
    </SubpageShell>
  );
}

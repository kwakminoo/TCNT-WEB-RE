import { Link, Navigate, useParams } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { findNewsArticleBySlug } from "../content/pr/newsItems";

export function PrNewsDetailPage() {
  const { slug } = useParams();
  const article = slug ? findNewsArticleBySlug(slug) : undefined;
  if (!article) {
    return <Navigate to="/pr/news" replace />;
  }

  return (
    <SubpageShell
      intro={
        <>
          <BreadcrumbNav />
          <p className="news-detail__hero-date">
            <time dateTime={article.date}>{article.date}</time>
          </p>
          <h1 id="page-title">{article.title}</h1>
        </>
      }
    >
      <div className="container prose">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            <Link to="/pr/news" className="btn btn-ghost">
              목록으로
            </Link>
          </p>
        </div>
    </SubpageShell>
  );
}

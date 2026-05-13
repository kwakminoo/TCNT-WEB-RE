import { Link } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { newsArticles } from "../content/pr/newsItems";

export function PrNewsListPage() {
  return (
    <SubpageShell
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">News</h1>
          <p className="lead">홍보·수주·행사 등 최신 소식입니다.</p>
        </>
      }
    >
      <div className="container">
          <ul className="news-card-list" aria-label="뉴스 목록">
            {newsArticles.map((a) => (
              <li key={a.slug}>
                <article className="news-card">
                  <time className="news-card__date" dateTime={a.date}>
                    {a.date}
                  </time>
                  <h2 className="news-card__title">
                    <Link to={`/pr/news/${a.slug}`}>{a.title}</Link>
                  </h2>
                  <p className="news-card__summary">{a.summary}</p>
                </article>
              </li>
            ))}
          </ul>
      </div>
    </SubpageShell>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MainBanner } from "../components/MainBanner";
import { ProjectMapSection } from "../components/ProjectMapSection";
import { homeIntro, homeMasterpieces } from "../content/homeData";
import { getLatestPrNewsForHome } from "../content/pr/prNews";

type CompanyOverviewItem = {
  id: string;
  title: string;
  description: string;
  to: string;
};

const featuredNews = getLatestPrNewsForHome(3);

const companyOverviewItems: CompanyOverviewItem[] = [
  {
    id: "philosophy",
    title: "기업이념",
    description: "(주)태일씨앤티는 다수 시공을 넘어 고객의 미래 신뢰를 만드는 기업입니다.",
    to: "/about/greeting",
  },
  {
    id: "ceo-message",
    title: "CEO 인사말",
    description: "고객 감동과 가치를 실현하는 기업 (주)태일씨앤티의 인사말입니다.",
    to: "/about/greeting",
  },
  {
    id: "company",
    title: "회사소개",
    description: "플랜트 엔지니어링 및 시공을 주력으로 하는 건설 전문 기업입니다.",
    to: "/pr/news",
  },
  {
    id: "job-intro",
    title: "직무소개",
    description: "현장·본사·경영지원 직무를 카드로 안내하고, 업무개괄·필요역량·Vision을 모달에서 확인할 수 있습니다.",
    to: "/career/job-intro",
  },
];

function truncateNews(text: string, maxLength = 340): { text: string; truncated: boolean } {
  if (text.length <= maxLength) return { text, truncated: false };
  return { text: `${text.slice(0, maxLength).trimEnd()}...`, truncated: true };
}

export function HomePage() {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
  const activeNews = featuredNews[activeNewsIndex] ?? featuredNews[0];
  const activeHighlight = homeMasterpieces[activeHighlightIndex] ?? homeMasterpieces[0];
  const preview = useMemo(
    () => (activeNews ? truncateNews(activeNews.content) : { text: "", truncated: false }),
    [activeNews],
  );

  useEffect(() => {
    if (featuredNews.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % featuredNews.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [featuredNews.length]);

  useEffect(() => {
    if (homeMasterpieces.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setActiveHighlightIndex((prev) => (prev + 1) % homeMasterpieces.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <MainBanner />
      {activeNews ? (
      <section className="page-body home-news-showcase home-scroll-pane home-news-pane">
        <p className="home-news-eyebrow">NEWS</p>
        <div className="home-news-shell">
          <div className="home-news-stage">
            <div className="home-news-stage__text">
              <article className="home-news-article">
                <div className="home-news-article__top">
                  <div className="home-news-article__meta-row">
                    <span className={`home-news-badge home-news-badge--${activeNews.category}`}>
                      {activeNews.category}
                    </span>
                    <p className="home-news-article__date">{activeNews.date}</p>
                  </div>
                  <h3>{activeNews.title}</h3>
                </div>
                <div className="home-news-article__bottom">
                  <p className="home-news-article__summary">{preview.text}</p>
                  <div className="home-news-article__actions">
                    <Link className="home-news-more-link" to={activeNews.linkUrl}>
                      + 더보기
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            <div className="home-news-stage__media">
              <img src={activeNews.imageSrc} alt={activeNews.title} className="home-news-image" />
            </div>
          </div>
        </div>
      </section>
      ) : null}

      <section className="page-body home-masterpiece home-scroll-pane home-masterpiece-pane">
        <div
          key={`bg-${activeHighlight.id}`}
          className="home-masterpiece__bg"
          style={{ backgroundImage: `url("${activeHighlight.imageSrc}")` }}
          aria-hidden="true"
        />
        <div className="home-masterpiece__inner">
          <div key={activeHighlight.id} className="home-masterpiece__slide">
            <div className="home-masterpiece__title">
              <span>HIGHLIGHT</span>
              <h2>{activeHighlight.shortTitle}</h2>
            </div>

            <div className="home-masterpiece__line">
              <div className="home-masterpiece__line-copy home-masterpiece__line-copy--left">
                <h3>{activeHighlight.leftCopy}</h3>
                <p>{activeHighlight.title}</p>
              </div>

              <div className="home-masterpiece__image-wrap">
                <img
                  className="home-masterpiece__image"
                  src={activeHighlight.imageSrc}
                  alt={activeHighlight.title}
                />
              </div>

              <div className="home-masterpiece__line-copy home-masterpiece__line-copy--right">
                <strong>{activeHighlight.rightMetric}</strong>
                <p>{activeHighlight.rightCopy}</p>
              </div>
            </div>

            <div className="home-masterpiece__meta-band">
              <dl className="home-masterpiece__meta">
                <div>
                  <dt>발주처(자)</dt>
                  <dd>{activeHighlight.client}</dd>
                </div>
                <div>
                  <dt>시공사</dt>
                  <dd>{activeHighlight.contractor}</dd>
                </div>
                <div>
                  <dt>규모</dt>
                  <dd>{activeHighlight.scale}</dd>
                </div>
                <div>
                  <dt>공사기간</dt>
                  <dd>
                    {activeHighlight.period}
                    {activeHighlight.status ? `    ${activeHighlight.status}` : ""}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="home-masterpiece__pagination" aria-label="하이라이트 선택">
            {homeMasterpieces.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`home-masterpiece__dot${idx === activeHighlightIndex ? " is-active" : ""}`}
                onClick={() => setActiveHighlightIndex(idx)}
                aria-label={`${item.shortTitle} 보기`}
                aria-pressed={idx === activeHighlightIndex}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="page-body home-project-map home-scroll-pane home-project-map-pane">
        <p className="home-news-eyebrow home-project-map__eyebrow">PROJECT MAP</p>
        <ProjectMapSection showSectionHeader={false} />
      </section>

      <section className="page-body home-section-company home-scroll-pane home-company-pane">
        <div className="home-company-overview">
          <div className="home-company-overview__overlay" aria-hidden="true" />
          <div className="home-company-overview__inner">
            <header className="home-company-overview__head">
              <p>COMPANY</p>
              <h2>{homeIntro.title}</h2>
              <div className="home-company-overview__desc">
                {homeIntro.paragraphs.map((paragraph) => (
                  <span key={paragraph}>{paragraph}</span>
                ))}
              </div>
            </header>
            <div className="home-company-overview__grid">
              {companyOverviewItems.map((item) => (
                <article key={item.id} className="home-company-overview__item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link className="home-company-overview__more" to={item.to} aria-label={`${item.title} 더보기`}>
                    자세히 보기
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

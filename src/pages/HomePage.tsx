import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MainBanner } from "../components/MainBanner";
import { ProjectMapSection } from "../components/ProjectMapSection";
import { homeIntro, homeMasterpieces } from "../content/homeData";

type FeaturedNews = {
  id: string;
  category: string;
  title: string;
  date: string;
  content: string;
  imageSrc: string;
};

type NewsCategory = FeaturedNews["category"];

type CompanyOverviewItem = {
  id: string;
  title: string;
  description: string;
  to: string;
};

const featuredNews: FeaturedNews[] = [
  {
    id: "n1",
    category: "수상",
    title: "삼성물산 공사수행 역량평가 수행우수사 선정, 최우수상 수상",
    date: "2026.03.23",
    content:
      "태일씨앤티는 2026년 03월 23일 삼성물산(주) 건설부문으로부터 '25년 공사수행 역량평가 수행우수사'로 선정되어 최우수상을 수여 받았습니다.",
    imageSrc: "/news/20260325160936363099.jpg",
  },
  {
    id: "n2",
    category: "보도자료",
    title: "한국청소년육성회 금천지구회 모범청소년 장학금 수여 행사 소식",
    date: "2025.12.16",
    content:
      "태경이노베이션에서 한국청소년육성회 금천지구회 모범청소년 장학금 수여 행사를 진행 하였습니다. 일시 : 2025년 12월 16일, 장소 : 금천구청, 수여식 참석 : 태경이노베이션 최정훈 대표.",
    imageSrc: "/news/20251217142614056250.jpg",
  },
  {
    id: "n3",
    category: "행사소식",
    title: "김경수 대표님 한국산업단지경영자연합회 서울 6대 회장 취임",
    date: "2025.12.09",
    content:
      "김경수 대표님께서 12월 9일 한국산업단지경영자연합회서울(이하 KIBA서울) 제6대 회장에 취임하셨습니다. 김 회장님은 이날 오후 6시 G밸리에 위치한 L컨벤션에서 취임식을 갖고 본격 활동을 시작하셨습니다. 김 회장님은 취임식에서 KIBA서울 제6대 회장 취임에 감사 인사를 전하며, G밸리와 산업 생태계에 헌신하는 모든 분들께 감사의 뜻을 밝혔습니다. AI·디지털 전환·ESG 등 빠르게 변하는 환경 속에서 기업 애로 해결 컨트롤타워 강화, 기업 간 협업 생태계 구축, 정부·지자체 지원제도 활용도 제고를 핵심 운영 방향으로 제시하셨습니다.",
    imageSrc: "/news/20251210093618603107.jpg",
  },
];

const categoryLabelMap: Record<NewsCategory, string> = {
  수상: "수상",
  보도자료: "보도자료",
  행사소식: "행사소식",
};

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
    description: "직무별 주요 업무와 요구 역량을 소개합니다.",
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
  const preview = useMemo(() => truncateNews(activeNews.content), [activeNews.content]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % featuredNews.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);

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
      <section className="page-body home-news-showcase home-scroll-pane home-news-pane">
        <p className="home-news-eyebrow">NEWS</p>
        <div className="home-news-shell">
          <div className="home-news-stage">
            <div className="home-news-stage__text">
              <article className="home-news-article">
                <div className="home-news-article__top">
                  <div className="home-news-article__meta-row">
                    <span className={`home-news-badge home-news-badge--${activeNews.category}`}>
                      {categoryLabelMap[activeNews.category]}
                    </span>
                    <p className="home-news-article__date">{activeNews.date}</p>
                  </div>
                  <h3>{activeNews.title}</h3>
                </div>
                <div className="home-news-article__bottom">
                  <p className="home-news-article__summary">{preview.text}</p>
                  <div className="home-news-article__actions">
                    <Link className="home-news-more-link" to="/pr/news">
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
        <ProjectMapSection />
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

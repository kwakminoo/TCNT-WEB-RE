import type { CSSProperties } from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { EmptyState } from "../components/page/EmptyState";
import { InnovationVisionLayout } from "../components/page/InnovationVisionLayout";
import { ClientsPartnersGrid } from "../components/page/ClientsPartnersGrid";
import { LicensesGrid } from "../components/page/LicensesGrid";
import { Timeline } from "../components/page/Timeline";
import { VideoEmbed } from "../components/page/VideoEmbed";
import { LICENSE_SECTIONS } from "../content/company/licensesData";
import { findParentGroup } from "../content/navData";
import { pagesByPath } from "../content/pagesData";
import type { PageBlock, PageBlockMedia, PageBlockProse, PageBlockTimeline } from "../content/types";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

function isProseBlock(block: PageBlock): block is PageBlockProse {
  return !block.kind || block.kind === "prose";
}

function isMediaBlock(block: PageBlock): block is PageBlockMedia {
  return block.kind === "media";
}

function isTimelineBlock(block: PageBlock): block is PageBlockTimeline {
  return block.kind === "timeline";
}

function splitHistoryLine(line: string): { label?: string; text: string } {
  const [label, ...rest] = line.split(" · ");
  return rest.length > 0 ? { label, text: rest.join(" · ") } : { text: line };
}

function parseHistoryLineTriple(line: string): { date: string; body: string; category: string } {
  const trimmed = line.trim();
  const { label, text } = splitHistoryLine(trimmed);
  const category = (label ?? "").trim();

  const splitDateBody = (rest: string): { date: string; body: string } => {
    const lead = rest.match(/^(\d{2}\.\d{2})\s+([\s\S]*)$/);
    if (lead) {
      return { date: lead[1], body: lead[2].trim() || "—" };
    }
    return { date: "—", body: rest.trim() || "—" };
  };

  if (category && text) {
    const { date, body } = splitDateBody(text);
    return { date, body, category: category || "—" };
  }

  const bare = trimmed.match(/^(\d{2}\.\d{2})\s+([\s\S]*)$/);
  if (bare) {
    return { date: bare[1], body: bare[2].trim() || "—", category: "—" };
  }

  return { date: "—", body: trimmed || "—", category: "—" };
}

function historySectionSortKey(yearLabel: string): number {
  const m = yearLabel.match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : 0;
}

function sortHistorySectionsAsc(sections: PageBlockTimeline["sections"]) {
  return [...sections].sort((a, b) => historySectionSortKey(a.year) - historySectionSortKey(b.year));
}

function defaultHistorySelectedYear(sections: PageBlockTimeline["sections"]): string {
  if (sections.some((s) => s.year === "2025")) return "2025";
  const asc = sortHistorySectionsAsc(sections);
  return asc[asc.length - 1]?.year ?? sections[0]?.year ?? "";
}

const greetingScenes = [
  {
    eyebrow: "Challenge",
    title: "새로운 이름으로 이어가는 전문건설의 도전",
    image: "media/company/greeting.jpg",
    imageAlt: "태일씨앤티 안전모를 든 임직원",
    metric: "1994",
    metricLabel: "창립",
  },
  {
    eyebrow: "Quality & Safety",
    title: "기본과 원칙 위에 세우는 품질·안전·상생",
    image: "media/company/greeting-quality-safety.png",
    imageAlt: "철근 콘크리트 현장에서 품질과 안전을 점검하는 임직원",
    metric: "3대",
    metricLabel: "사훈",
  },
  {
    eyebrow: "Growth",
    title: "태일인 DNA로 만드는 지속 가능한 성장",
    image: "media/company/greeting-growth-dna.png",
    imageAlt: "도시 건설 현장을 배경으로 도면을 검토하는 팀",
    metric: "DNA",
    metricLabel: "책임과 성장",
  },
];

const philosophyValueCards = [
  {
    key: "quality",
    title: "고객감동",
    desc: "철저한 품질관리로 신뢰를 축적합니다.",
    image: "media/company/philosophy-value-quality-nb.png",
    hoverLead: "철저한 품질관리로",
    hoverBody:
      "공정 표준과 현장 점검으로 품질을 끝까지 책임지고, 고객과의 약속을 완수하며 감동을 실현합니다.",
  },
  {
    key: "safety",
    title: "무재해 시공",
    desc: "안전 최우선 원칙으로 현장 리스크를 줄입니다.",
    image: "media/company/philosophy-value-safety-nb.png",
    hoverLead: "안전 최우선 원칙으로",
    hoverBody:
      "위험 요인을 사전에 차단하고 무재해 현장 문화를 지켜, 모든 이해관계자가 안심할 수 있는 시공을 이어갑니다.",
  },
  {
    key: "innovation",
    title: "지속 혁신",
    desc: "기술개발과 원가혁신으로 경쟁력을 높입니다.",
    image: "media/company/philosophy-value-innovation-nb.png",
    hoverLead: "기술개발과 원가 혁신으로",
    hoverBody:
      "공정 개선과 신기술 도입을 반복하며 원가 경쟁력을 높이고, 변화하는 시장에서의 성장 동력을 지속적으로 키웁니다.",
  },
];

const philosophySloganCards = [
  {
    key: "one",
    labelEn: "One",
    subtitle: "하나된 태일",
    desc: "뭉치면 강하다는 원칙으로 한 팀처럼 움직입니다.",
    image: "media/company/philosophy-slogan-one.png",
    imageAlt: "현장에서 도면을 함께 보는 시공 팀",
  },
  {
    key: "innovative",
    labelEn: "Innovative",
    subtitle: "혁신적인 태일",
    desc: "더 나은 방식으로 업무와 공정을 개선합니다.",
    image: "media/company/philosophy-slogan-innovative.png",
    imageAlt: "디지털 설계와 현장이 연결된 혁신 시공",
  },
  {
    key: "forever",
    labelEn: "Forever",
    subtitle: "백년대계 태일",
    desc: "장기적 관점의 성장 기반을 구축합니다.",
    image: "media/company/philosophy-slogan-forever.png",
    imageAlt: "황혼빛 인프라와 교량의 장기 비전",
  },
];

function HistoryTimelineView({ block }: { block: PageBlockTimeline }) {
  const sortedSections = useMemo(
    () => sortHistorySectionsAsc(block.sections),
    [block.sections],
  );

  const [selectedYear, setSelectedYear] = useState(() => defaultHistorySelectedYear(block.sections));

  const selectedSection =
    block.sections.find((section) => section.year === selectedYear) ?? block.sections[0];

  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ active: boolean; pointerId: number | null; startX: number; startScroll: number }>(
    { active: false, pointerId: null, startX: 0, startScroll: 0 },
  );

  const onScrollPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  }, []);

  const onScrollPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active || d.pointerId !== e.pointerId) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = d.startScroll - (e.clientX - d.startX);
  }, []);

  const onScrollPointerEnd = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active || d.pointerId !== e.pointerId) return;
    scrollRef.current?.releasePointerCapture(e.pointerId);
    dragRef.current = { active: false, pointerId: null, startX: 0, startScroll: 0 };
  }, []);

  if (!selectedSection) {
    return null;
  }

  const n = sortedSections.length;

  return (
    <div className="history-content">
      <div className="history-story">
        <div className="history-stage">
          <div className="history-stage__media" aria-hidden="true" />
          <div className="history-stage__scrim" aria-hidden="true" />

          <p className="sr-only" aria-live="polite">
            {selectedSection.year}년 구간이 선택되었습니다.
          </p>

          <header className="history-story__intro history-story__intro--on-dark">
            <span>Company History</span>
            <h2>현장에서 증명해 온 태일씨앤티의 발자취</h2>
          </header>

          <div
            key={selectedSection.year}
            className="history-horizontal-track"
            role="region"
            aria-label={`${selectedSection.year} 연혁`}
            tabIndex={0}
          >
            <div
              ref={scrollRef}
              className="history-horizontal-scroll"
              onPointerDown={onScrollPointerDown}
              onPointerMove={onScrollPointerMove}
              onPointerUp={onScrollPointerEnd}
              onPointerCancel={onScrollPointerEnd}
            >
              <ol
                className="history-horizontal-timeline"
                style={
                  {
                    ["--history-cols"]: String(Math.max(1, selectedSection.lines.length)),
                    gridTemplateColumns: `repeat(${Math.max(1, selectedSection.lines.length)}, minmax(7.75rem, 1fr))`,
                  } as CSSProperties
                }
              >
                {selectedSection.lines.map((line, idx) => {
                  const { date, body, category } = parseHistoryLineTriple(line);
                  const above = idx % 2 === 0;
                  return (
                    <li
                      key={`${selectedSection.year}-${idx}`}
                      className={`history-horizontal-timeline__item${
                        above ? " history-horizontal-timeline__item--above" : " history-horizontal-timeline__item--below"
                      }`}
                    >
                      <div className="history-horizontal-timeline__copy">
                        <span className="history-horizontal-timeline__date">{date}</span>
                        <span className="history-horizontal-timeline__body">{body}</span>
                        <span className="history-horizontal-timeline__cat">{category}</span>
                      </div>
                      <span className="history-horizontal-timeline__node" aria-hidden="true" />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div className="history-chevron-rail">
            <nav className="history-chevron-strip" aria-label="회사연혁 연도 선택">
              {sortedSections.map((section, i) => {
                const active = section.year === selectedSection.year;
                const pos =
                  n <= 1 ? "solo" : i === 0 ? "first" : i === n - 1 ? "last" : "mid";
                return (
                  <button
                    key={section.year}
                    type="button"
                    className={`history-chevron-strip__btn history-chevron-strip__btn--${pos}${
                      active ? " history-chevron-strip__btn--active" : ""
                    }`}
                    aria-pressed={active}
                    onClick={() => setSelectedYear(section.year)}
                  >
                    <span className="history-chevron-strip__node" aria-hidden="true" />
                    <span className="history-chevron-strip__label">{section.year}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockView({ block, index }: { block: PageBlock; index: number }) {
  if (block.kind === "timeline") {
    return <Timeline key={index} block={block} />;
  }
  if (block.kind === "media") {
    return (
      <div key={index} className="content-block content-block--media">
        {block.heading ? <h2>{block.heading}</h2> : null}
        <figure className="media-figure">
          <img
            src={mediaSrc(block.src)}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
            decoding="async"
          />
          {block.caption ? (
            <figcaption className="media-figure__caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      </div>
    );
  }
  if (block.kind === "video") {
    return (
      <div key={index} className="content-block content-block--video">
        <h2 className="video-block__title">{block.title}</h2>
        {block.description ? <p>{block.description}</p> : null}
        <VideoEmbed src={block.src} title={block.title} description={undefined} />
      </div>
    );
  }
  if (block.kind === "cta") {
    return (
      <div key={index} className="content-block content-block--cta">
        {block.heading ? <h2>{block.heading}</h2> : null}
        <ul className="cta-link-list">
          {block.links.map((link) => (
            <li key={link.href + link.label}>
              <a
                href={link.href}
                className="btn btn-primary"
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div key={index} className="content-block">
      {block.heading ? <h2>{block.heading}</h2> : null}
      {(block.paragraphs ?? []).map((p, j) => (
        <p key={j}>{p}</p>
      ))}
      {block.bullets ? (
        <ul>
          {block.bullets.map((item, k) => (
            <li key={k}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function StaticPage() {
  const { pathname } = useLocation();
  const page = pagesByPath[pathname];
  if (!page) {
    return <Navigate to="/" replace />;
  }
  const isGreetingPage = pathname === "/about/greeting";
  const isInnovationVisionPage = pathname === "/innovation/vision";
  const isPhilosophyPage = pathname === "/about/philosophy";
  const isHistoryPage = pathname === "/about/history";
  const isOrganizationPage = pathname === "/about/organization";
  const isLicensesPage = pathname === "/about/licenses";
  const isClientsPage = pathname === "/about/clients";
  const greetingIntroBlock = isGreetingPage ? page.blocks.find(isProseBlock) : undefined;
  const greetingSignatureBlock = isGreetingPage
    ? page.blocks.find(
        (block): block is PageBlockMedia =>
          isMediaBlock(block) && block.src === "media/company/signature.jpg",
      )
    : undefined;
  const companyNav = findParentGroup(pathname);
  const localNavGroup =
    companyNav?.label === "회사소개" || companyNav?.label === "기술혁신" ? companyNav : undefined;

  return (
    <SubpageShell
      className={
        isGreetingPage
          ? "page-shell--greeting"
          : isInnovationVisionPage
            ? "page-shell--innovation-vision"
            : isPhilosophyPage
              ? "page-shell--philosophy"
              : isHistoryPage
                ? "page-shell--history"
                : isOrganizationPage
                  ? "page-shell--organization"
                  : isLicensesPage
                    ? "page-shell--licenses"
                    : isClientsPage
                      ? "page-shell--clients"
                      : undefined
      }
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">{page.title}</h1>
          {!isGreetingPage &&
          !isInnovationVisionPage &&
          !isHistoryPage &&
          !isPhilosophyPage &&
          !isLicensesPage &&
          !isClientsPage &&
          page.lead ? (
            <p className="lead">{page.lead}</p>
          ) : null}
        </>
      }
      subNav={
        localNavGroup ? (
          <nav className="page-local-nav" aria-label={`${localNavGroup.label} 하위 메뉴`}>
            <div className="container page-local-nav__inner">
              {localNavGroup.children.map((item) => (
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
      {isGreetingPage ? (
        <div className="greeting-content">
          <div className="container greeting-story">
            <div className="greeting-story__intro">
              <span>CEO Message</span>
              <h2>기본과 원칙으로 내일의 <br></br>현장을 세웁니다</h2>
            </div>
            <article className="greeting-content__article" aria-label="대표 인사말">
              {(greetingIntroBlock?.paragraphs ?? []).map((paragraph, idx) => {
                const scene = greetingScenes[idx] ?? greetingScenes[greetingScenes.length - 1];
                return (
                  <section className="greeting-scene" key={scene.title}>
                    <div className="greeting-scene__copy">
                      <span className="greeting-scene__eyebrow">{scene.eyebrow}</span>
                      <h3>{scene.title}</h3>
                      <p>{paragraph}</p>
                    </div>
                    <figure className="greeting-scene__visual">
                      <img
                        src={mediaSrc(scene.image)}
                        alt={scene.imageAlt}
                        loading={idx === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                      <figcaption>
                        <strong>{scene.metric}</strong>
                        <span>{scene.metricLabel}</span>
                      </figcaption>
                    </figure>
                  </section>
                );
              })}
              {greetingSignatureBlock ? (
                <footer className="greeting-story__signature">
                  <span>TAEIL C&T</span>
                  <figure>
                    <img
                      src={mediaSrc(greetingSignatureBlock.src)}
                      alt={greetingSignatureBlock.alt}
                      width={greetingSignatureBlock.width}
                      height={greetingSignatureBlock.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                </footer>
              ) : null}
            </article>
          </div>
        </div>
      ) : isPhilosophyPage ? (
        <div className="philosophy-content">
          <div className="philosophy-vision-intro">
            <header className="philosophy-vision-intro__head">
              <h2 id="philosophy-vision-heading" className="philosophy-vision-intro__title">
                비전
              </h2>
            </header>
            <section className="philosophy-vision-band" aria-labelledby="philosophy-vision-heading">
              <p className="philosophy-vision-text">
                시대변화에 적응하여 누구보다 앞선 기술로 <br />전문건설산업의 선도적 역할을 해 나갈 것입니다.
              </p>
            </section>
          </div>

          <section className="philosophy-values-showcase" aria-labelledby="philosophy-values-heading">
            <header className="philosophy-values-showcase__head">
              <h2 id="philosophy-values-heading" className="philosophy-values-showcase__title">
                핵심가치
              </h2>
            </header>
            <div className="philosophy-values-showcase__rail">
              <ul className="philosophy-value-panels">
                {philosophyValueCards.map((card) => (
                  <li key={card.key} className="philosophy-value-panel">
                    <article className="philosophy-value-panel__card" tabIndex={0}>
                      <p className="sr-only">
                        {card.title}. {card.hoverLead} {card.hoverBody}
                      </p>
                      <div className="philosophy-value-panel__media">
                        <img
                          src={mediaSrc(card.image)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width={1536}
                          height={1024}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="philosophy-value-panel__overlay" aria-hidden="true">
                        <p className="philosophy-value-panel__lead">{card.hoverLead}</p>
                        <strong className="philosophy-value-panel__name">{card.title}</strong>
                        <p className="philosophy-value-panel__copy">{card.hoverBody}</p>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="philosophy-slogan-showcase" aria-labelledby="philosophy-slogan-heading">
            <header className="philosophy-slogan-showcase__head">
              <h2 id="philosophy-slogan-heading" className="philosophy-slogan-showcase__title">
                슬로건
              </h2>
            </header>
            <div className="philosophy-slogan-board">
              <ul className="philosophy-slogan-stack">
                {philosophySloganCards.map((card) => (
                  <li key={card.key} className="philosophy-slogan-strip">
                    <article className="philosophy-slogan-strip__card" tabIndex={0}>
                      <p className="sr-only">
                        {card.labelEn}. {card.subtitle}. {card.desc} {card.imageAlt}
                      </p>
                      <div className={`philosophy-slogan-strip__flag philosophy-slogan-strip__flag--${card.key}`}>
                        <img
                          className="philosophy-slogan-strip__bg"
                          src={mediaSrc(card.image)}
                          alt=""
                          width={1792}
                          height={640}
                          loading="lazy"
                          decoding="async"
                          aria-hidden
                        />
                        <div className="philosophy-slogan-strip__inner">
                          <div className="philosophy-slogan-strip__head">
                            <span className="philosophy-slogan-strip__en">{card.labelEn}</span>
                            <span className="philosophy-slogan-strip__ko">{card.subtitle}</span>
                          </div>
                          <p className="philosophy-slogan-strip__desc">{card.desc}</p>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      ) : isHistoryPage ? (
        <HistoryTimelineView block={page.blocks.find(isTimelineBlock) ?? { kind: "timeline", sections: [] }} />
      ) : isOrganizationPage ? (
        <div className="organization-content">
          <div className="container organization-story">
            <div className="organization-main prose prose--blocks">
              {page.blocks.map((b, i) => (
                <BlockView key={i} block={b} index={i} />
              ))}
            </div>
          </div>
        </div>
      ) : isClientsPage ? (
        <div className="clients-content">
          <div className="clients-intro">
            <div className="container">
              <header className="clients-intro__head">
                <span className="clients-intro__eyebrow">주요 파트너십</span>
                <h2 id="clients-intro-heading" className="clients-intro__title">
                  주요 협력 시공사
                </h2>
              </header>
              <section className="clients-intro__band" aria-labelledby="clients-intro-heading">
                <p className="clients-intro__text">{page.lead}</p>
              </section>
            </div>
          </div>
          <ClientsPartnersGrid />
        </div>
      ) : isLicensesPage ? (
        <LicensesGrid sections={LICENSE_SECTIONS} lead={page.lead ?? ""} />
      ) : isInnovationVisionPage ? (
        <InnovationVisionLayout blocks={page.blocks} />
      ) : (
        <div className="container prose prose--blocks">
          {pathname === "/innovation/news" ? (
            <EmptyState
              title="등록된 기술혁신 News가 없습니다"
              description="레거시 tech_list.jsp 연동 또는 CMS에 과제·현장 사례를 등록하면 이 영역에 목록이 표시됩니다."
            />
          ) : (
            page.blocks.map((b, i) => <BlockView key={i} block={b} index={i} />)
          )}
        </div>
      )}
    </SubpageShell>
  );
}

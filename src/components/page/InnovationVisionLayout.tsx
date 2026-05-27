import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import type { PageBlock, PageBlockProse } from "../../content/types";
import { ContentSectionHead } from "./ContentSectionHead";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

function isProseBlock(block: PageBlock): block is PageBlockProse {
  return !block.kind || block.kind === "prose";
}

/** 스토리 3열 패널 배경(세로형 실사, VISION 카드와 별도 에셋) */
const storyPanelImages = [
  "media/company/innovation-stories/story-panel-tech.jpg",
  "media/company/innovation-stories/story-panel-system.jpg",
  "media/company/innovation-stories/story-panel-expansion.jpg",
] as const;

const pillarVisuals = [
  {
    src: "media/company/innovation-pillars/pillar-tech.jpg",
    alt: "건설 신기술 연구개발과 기술 경쟁력 강화를 상징하는 현장 이미지",
  },
  {
    src: "media/company/innovation-pillars/pillar-quality.jpg",
    alt: "품질 검수와 고객 만족을 상징하는 현장 협력 이미지",
  },
  {
    src: "media/company/innovation-pillars/pillar-diversification.jpg",
    alt: "다양한 사업영역 확장을 상징하는 복합 건설 프로젝트 이미지",
  },
  {
    src: "media/company/innovation-pillars/pillar-system.jpg",
    alt: "기업 시스템 고도화와 디지털 현장 관리를 상징하는 이미지",
  },
] as const;

const TAEIL_LOGO_CIRCLE = "brand/logo-circle.png";

function useInnovationScrollReveal(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      root.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const nodes = root.querySelectorAll("[data-reveal]:not([data-story-reveal])");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

/** 스테이지가 뷰포트에 들어오면 본문을 한 번만 페이드인 표시한다(자동 스크롤 없음). */
function useInnovationStageReveal(stageRef: RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false);
  const activatedRef = useRef(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (activatedRef.current || !entry?.isIntersecting) return;
        if (entry.intersectionRatio < 0.14) return;

        activatedRef.current = true;
        io.disconnect();
        setShown(true);
      },
      { threshold: [0, 0.08, 0.14, 0.22], rootMargin: "-10% 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [stageRef]);

  return shown;
}

const STORY_REVEAL_INITIAL_MS = 200;
const STORY_REVEAL_STEP_MS = 560;

/** 스토리 섹션 진입 시 빈 화면 → 좌→우(모바일은 상→하) 순차 슬라이드·페이드 */
function useInnovationStoriesSequence(
  sectionRef: RefObject<HTMLElement | null>,
  storyCount: number,
) {
  const [shownCount, setShownCount] = useState(0);
  const triggeredRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || storyCount === 0) return;

    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShownCount(storyCount);
      return;
    }

    const runSequence = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      clearTimers();

      for (let i = 1; i <= storyCount; i++) {
        const delay = STORY_REVEAL_INITIAL_MS + (i - 1) * STORY_REVEAL_STEP_MS;
        timersRef.current.push(
          setTimeout(() => {
            setShownCount(i);
          }, delay),
        );
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || triggeredRef.current) return;
        if (entry.intersectionRatio < 0.18) return;
        runSequence();
        io.disconnect();
      },
      { threshold: [0, 0.12, 0.18, 0.28], rootMargin: "-6% 0px -10% 0px" },
    );

    io.observe(section);

    return () => {
      io.disconnect();
      clearTimers();
    };
  }, [sectionRef, storyCount]);

  return shownCount;
}

type Props = {
  blocks: PageBlock[];
};

export function InnovationVisionLayout({ blocks }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const storiesSectionRef = useRef<HTMLElement>(null);
  const stageRevealed = useInnovationStageReveal(stageRef);

  useInnovationScrollReveal(rootRef);

  const proseBlocks = blocks.filter(isProseBlock);
  const introBlock = proseBlocks[0];
  const introParagraphs = introBlock?.paragraphs ?? [];

  const visionPillarBlock = proseBlocks.find(
    (b) => b.heading?.includes("VISION") && b.bullets && b.bullets.length > 0,
  );
  const pillarHeading = visionPillarBlock?.heading ?? "VISION";
  const pillars = visionPillarBlock?.bullets ?? [];

  const storyChapters = proseBlocks.filter(
    (b) => b !== introBlock && b !== visionPillarBlock && (b.heading || b.paragraphs?.length),
  );

  const storyItems = [storyChapters[0], storyChapters[1], storyChapters[2]].filter(
    (chapter): chapter is PageBlockProse => Boolean(chapter),
  );
  const hasStories = storyItems.length > 0;
  const shownStoryCount = useInnovationStoriesSequence(storiesSectionRef, storyItems.length);

  const stageContentVisible = stageRevealed;
  const stageAriaBusy = !stageRevealed;

  return (
    <div className="innovation-vision" ref={rootRef}>
      <div className="innovation-vision__lead">
        <div className="container innovation-vision__intro">
          <ContentSectionHead title="기술혁신 비전" />
        </div>
        <section
          ref={stageRef}
          className="innovation-vision__stage innovation-vision__stage--immersive innovation-vision__stage--focus"
          aria-labelledby="innovation-vision-stage-heading"
          aria-busy={stageAriaBusy}
        >
        <div className="container innovation-vision__stage-inner innovation-vision__stage-inner--story">
          <div className="innovation-vision__partner-strip">
            <div className="innovation-vision__partner innovation-vision__partner--taeil">
              <img
                className="innovation-vision__partner-logo-img innovation-vision__partner-logo-img--circle"
                src={mediaSrc(TAEIL_LOGO_CIRCLE)}
                alt="(주)태일씨앤티"
                width={240}
                height={240}
                decoding="async"
              />
            </div>

            <div className="innovation-vision__partner innovation-vision__partner--taekyung">
              <div className="innovation-vision__tk-lockup" aria-label="(주)태경이노베이션">
                <div className="innovation-vision__tk-text">
                  <span className="innovation-vision__tk-ko">(주)태경이노베이션</span>
                  <span className="innovation-vision__tk-en">Taekyung Innovation</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`innovation-vision__stage-copy${stageContentVisible ? " innovation-vision__stage-copy--visible" : ""}`}
          >
            <p id="innovation-vision-stage-heading" className="innovation-vision__stage-eyebrow">
              연구개발 · 혁신
            </p>
            <div className="innovation-vision__stage-lead">
              {introParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        </section>
      </div>

      {pillars.length > 0 ? (
        <section className="innovation-vision__pillars" aria-labelledby="innovation-pillars-heading">
          <div className="container">
            <header className="innovation-vision__pillars-head">
              <ContentSectionHead
                id="innovation-pillars-heading"
                title={pillarHeading}
                className="innovation-vision__pillars-title"
              />
            </header>
            <ul className="innovation-vision__pillar-grid">
              {pillars.map((text, i) => {
                const visual = pillarVisuals[i] ?? pillarVisuals[0];
                return (
                  <li key={`${i}-${text}`} className="innovation-vision__pillar-card" data-reveal>
                    <figure className="innovation-vision__pillar-media">
                      <img
                        src={mediaSrc(visual.src)}
                        alt={visual.alt}
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={440}
                      />
                      <figcaption className="innovation-vision__pillar-text">{text}</figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {hasStories ? (
        <section
          ref={storiesSectionRef}
          className="innovation-vision__chapter innovation-vision__chapter--stories innovation-vision__chapter--tone-1"
          aria-label="혁신 추진 방향"
          aria-busy={shownStoryCount < storyItems.length}
        >
          <div className="container">
            <header className="innovation-vision__pillars-head">
              <ContentSectionHead
                id="innovation-stories-heading"
                title="혁신 추진 방향"
              />
            </header>
            <div
              className={`innovation-vision__stories${shownStoryCount > 0 ? " innovation-vision__stories--revealing" : ""}`}
            >
              {storyItems.map((chapter, i) => {
                const headingId = `innovation-chapter-${i}`;
                const panelBg = storyPanelImages[i] ?? storyPanelImages[0];
                const fromTop = i % 2 === 0;
                const isVisible = i < shownStoryCount;
                return (
                  <article
                    key={headingId}
                    className={`innovation-vision__story${fromTop ? " innovation-vision__story--from-top" : " innovation-vision__story--from-bottom"}${isVisible ? " is-visible" : ""}`}
                    data-story-reveal
                    data-story-index={i}
                    style={
                      {
                        "--story-bg": `url("${mediaSrc(panelBg)}")`,
                        "--story-reveal-delay": `${i * 0.09}s`,
                      } as CSSProperties
                    }
                  >
                    <div className="innovation-vision__story-scrim" aria-hidden />
                    <div className="innovation-vision__story-body">
                      {chapter.heading ? <h2 id={headingId}>{chapter.heading}</h2> : null}
                      {(chapter.paragraphs ?? []).map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

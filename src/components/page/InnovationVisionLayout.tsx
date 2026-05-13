import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import type { PageBlock, PageBlockProse } from "../../content/types";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

function isProseBlock(block: PageBlock): block is PageBlockProse {
  return !block.kind || block.kind === "prose";
}

/** 페이지 히어로와 톤을 맞춘 실사 배경(전용 asset) */
const visionStageBg = "media/company/innovation-vision-hero.jpg";
const visionSplitImage = "media/company/philosophy-value-innovation-nb.png";
const visionRailImage = "media/company/organization.jpg";
const visionBandImage = "media/company/greeting-growth-dna.png";

const TAEIL_LOGO_WIDE = "brand/logo-wide.png";

function useInnovationScrollReveal(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      root.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const nodes = root.querySelectorAll("[data-reveal]");
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

/**
 * 스테이지가 뷰포트에 들어오면 한 번만 세로 중앙으로 스크롤 정렬한 뒤,
 * 본문·로고 락업을 순차 표시한다.
 */
function useInnovationStageFocusReveal(stageRef: RefObject<HTMLElement | null>) {
  const [phase, setPhase] = useState<"idle" | "aligning" | "shown">("idle");
  const activatedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const runReveal = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setPhase("shown");
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (activatedRef.current || !entry?.isIntersecting) return;
        if (entry.intersectionRatio < 0.14) return;

        activatedRef.current = true;
        io.disconnect();

        if (reduce) {
          runReveal();
          return;
        }

        setPhase("aligning");
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        timerRef.current = setTimeout(runReveal, 780);
      },
      { threshold: [0, 0.08, 0.14, 0.22], rootMargin: "-10% 0px -10% 0px" },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [stageRef]);

  return phase;
}

type Props = {
  blocks: PageBlock[];
};

export function InnovationVisionLayout({ blocks }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const stagePhase = useInnovationStageFocusReveal(stageRef);

  useInnovationScrollReveal(rootRef);

  const proseBlocks = blocks.filter(isProseBlock);
  const introBlock = proseBlocks[0];
  const introText = introBlock?.paragraphs?.[0] ?? "";

  const visionPillarBlock = proseBlocks.find(
    (b) => b.heading?.includes("VISION") && b.bullets && b.bullets.length > 0,
  );
  const pillarHeading = visionPillarBlock?.heading ?? "VISION";
  const pillars = visionPillarBlock?.bullets ?? [];

  const storyChapters = proseBlocks.filter(
    (b) => b !== introBlock && b !== visionPillarBlock && (b.heading || b.paragraphs?.length),
  );

  const chapter0 = storyChapters[0];
  const chapter1 = storyChapters[1];
  const chapter2 = storyChapters[2];

  const stageBg = {
    "--innov-stage-bg": `url("${mediaSrc(visionStageBg)}")`,
  } as CSSProperties;

  const bandBg = {
    "--innov-band-bg": `url("${mediaSrc(visionBandImage)}")`,
  } as CSSProperties;

  const stageContentVisible = stagePhase === "shown";
  const stageAriaBusy = stagePhase !== "shown";

  return (
    <div className="innovation-vision" ref={rootRef}>
      <section
        ref={stageRef}
        className="innovation-vision__stage innovation-vision__stage--immersive innovation-vision__stage--focus"
        style={stageBg}
        aria-labelledby="innovation-vision-stage-heading"
        aria-busy={stageAriaBusy}
      >
        <div className="innovation-vision__stage-scrim" aria-hidden />
        <div
          className={`container innovation-vision__stage-inner innovation-vision__stage-inner--story${stageContentVisible ? " innovation-vision__stage-inner--visible" : ""}`}
        >
          <div className="innovation-vision__partner-strip">
            <div className="innovation-vision__partner innovation-vision__partner--taeil">
              <img
                className="innovation-vision__partner-logo-img"
                src={mediaSrc(TAEIL_LOGO_WIDE)}
                alt="(주)태일씨앤티"
                width={360}
                height={120}
                decoding="async"
              />
            </div>

            {/* 공식 CI 파일이 repo에 없어 워드마크로 표기. PNG 추가 시 img로 교체 가능 */}
            <div className="innovation-vision__partner innovation-vision__partner--taekyung">
              <div className="innovation-vision__tk-lockup" aria-label="(주)태경이노베이션">
                <span className="innovation-vision__tk-badge" aria-hidden>
                  TK
                </span>
                <div className="innovation-vision__tk-text">
                  <span className="innovation-vision__tk-ko">(주)태경이노베이션</span>
                  <span className="innovation-vision__tk-en">Taekyung Innovation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="innovation-vision__stage-copy">
            <p id="innovation-vision-stage-heading" className="innovation-vision__stage-eyebrow">
              연구개발 · 혁신
            </p>
            <p className="innovation-vision__stage-lead">{introText}</p>
            <p className="innovation-vision__stage-hint">아래로 스크롤하여 비전과 추진 방향을 확인하세요.</p>
          </div>
        </div>
      </section>

      {pillars.length > 0 ? (
        <section className="innovation-vision__pillars" aria-labelledby="innovation-pillars-heading">
          <div className="container">
            <header className="innovation-vision__pillars-head">
              <span className="innovation-vision__pillars-kicker" data-reveal>
                추진 방향
              </span>
              <h2 id="innovation-pillars-heading" className="innovation-vision__pillars-title" data-reveal>
                {pillarHeading}
              </h2>
            </header>
            <ul className="innovation-vision__pillar-grid">
              {pillars.map((text, i) => (
                <li key={`${i}-${text}`} className="innovation-vision__pillar-card" data-reveal>
                  <span className="innovation-vision__pillar-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="innovation-vision__pillar-text">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {chapter0 ? (
        <section
          className="innovation-vision__chapter innovation-vision__chapter--split innovation-vision__chapter--tone-1"
          aria-labelledby="innovation-chapter-0"
        >
          <div className="container">
            <div className="innovation-vision__split-inner">
              <figure className="innovation-vision__split-media" data-reveal>
                <img
                  src={mediaSrc(visionSplitImage)}
                  alt="미래지향적 건설 기술과 혁신을 상징하는 현장 이미지"
                  loading="lazy"
                  decoding="async"
                  width={1536}
                  height={1024}
                />
              </figure>
              <div className="innovation-vision__split-copy">
                <span className="innovation-vision__chapter-label" data-reveal>
                  기술 경쟁력
                </span>
                {chapter0.heading ? (
                  <h2 id="innovation-chapter-0" data-reveal>
                    {chapter0.heading}
                  </h2>
                ) : null}
                {(chapter0.paragraphs ?? []).map((p, idx) => (
                  <p key={idx} data-reveal>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {chapter1 ? (
        <section
          className="innovation-vision__chapter innovation-vision__chapter--rail innovation-vision__chapter--tone-2"
          aria-labelledby="innovation-chapter-1"
          style={
            {
              "--innov-rail-watermark": `url("${mediaSrc(visionRailImage)}")`,
            } as CSSProperties
          }
        >
          <div className="container">
            <div className="innovation-vision__rail-inner">
              <div className="innovation-vision__rail-bar" data-reveal aria-hidden />
              <div className="innovation-vision__rail-copy">
                <span className="innovation-vision__chapter-label" data-reveal>
                  시스템 · 품질
                </span>
                {chapter1.heading ? (
                  <h2 id="innovation-chapter-1" data-reveal>
                    {chapter1.heading}
                  </h2>
                ) : null}
                {(chapter1.paragraphs ?? []).map((p, idx) => (
                  <p key={idx} data-reveal>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {chapter2 ? (
        <section
          className="innovation-vision__chapter innovation-vision__chapter--band innovation-vision__chapter--tone-3"
          style={bandBg}
          aria-labelledby="innovation-chapter-2"
        >
          <div className="innovation-vision__band-scrim" aria-hidden />
          <div className="container">
            <div className="innovation-vision__band-inner">
              <span className="innovation-vision__chapter-label innovation-vision__chapter-label--light" data-reveal>
                신사업 · 확장
              </span>
              {chapter2.heading ? (
                <h2 id="innovation-chapter-2" data-reveal>
                  {chapter2.heading}
                </h2>
              ) : null}
              {(chapter2.paragraphs ?? []).map((p, idx) => (
                <p key={idx} data-reveal>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

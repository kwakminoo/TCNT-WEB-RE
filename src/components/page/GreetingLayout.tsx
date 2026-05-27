import type { CSSProperties } from "react";
import { useRef } from "react";
import type { PageBlockMedia, PageBlockProse } from "../../content/types";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ContentSectionHead } from "./ContentSectionHead";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

const GREETING_BRAND_LOGO = "brand/taeil-logo.png";

const greetingScenes = [
  {
    title: "새로운 이름으로 이어가는 전문건설의 도전",
    image: "media/company/greeting.jpg",
    imageAlt: "태일씨앤티 안전모를 든 임직원",
    metric: "1994",
    metricLabel: "창립",
  },
  {
    title: "기본과 원칙 위에 세우는 품질·안전·상생",
    image: "media/company/greeting-quality-safety.png",
    imageAlt: "철근·콘크리트 현장에서 품질과 안전을 상징하는 시공 모습",
    metric: "3대",
    metricLabel: "사훈",
  },
  {
    title: "태일인 DNA로 만드는 지속 가능한 성장",
    image: "media/company/greeting-growth-dna.png",
    imageAlt: "도시 건설과 지속 성장을 상징하는 인프라·도면 이미지",
    metric: "DNA",
    metricLabel: "책임과 성장",
  },
] as const;

type GreetingLayoutProps = {
  introBlock?: PageBlockProse;
  signatureBlock?: PageBlockMedia;
};

export function GreetingLayout({ introBlock, signatureBlock }: GreetingLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useScrollReveal(contentRef);

  const paragraphs = introBlock?.paragraphs ?? [];

  return (
    <div ref={contentRef} className="greeting-content">
      <div className="container greeting-story">
        <div className="greeting-story__head-wrap" data-reveal>
          <ContentSectionHead id="greeting-content-heading" title="인사말" className="greeting-story__head" />
        </div>
        <article className="greeting-content__article" aria-label="대표 인사말">
          {paragraphs.map((paragraph, idx) => {
            const scene = greetingScenes[idx] ?? greetingScenes[greetingScenes.length - 1];
            return (
              <section className="greeting-scene" key={scene.title}>
                <div
                  className="greeting-scene__copy"
                  data-reveal
                  style={{ "--greeting-reveal-delay": "0.08s" } as CSSProperties}
                >
                  <h3>{scene.title}</h3>
                  <p>{paragraph}</p>
                </div>
                <figure
                  className="greeting-scene__visual"
                  data-reveal
                  style={{ "--greeting-reveal-delay": "0.2s" } as CSSProperties}
                >
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
          {signatureBlock ? (
            <footer
              className="greeting-story__signature"
              data-reveal
              style={{ "--greeting-reveal-delay": "0.12s" } as CSSProperties}
            >
              <figure className="greeting-story__brand">
                <img
                  src={mediaSrc(GREETING_BRAND_LOGO)}
                  alt="주식회사 태일씨앤티"
                  width={320}
                  height={72}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure>
                <img
                  src={mediaSrc(signatureBlock.src)}
                  alt={signatureBlock.alt}
                  width={signatureBlock.width}
                  height={signatureBlock.height}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </footer>
          ) : null}
        </article>
      </div>
    </div>
  );
}

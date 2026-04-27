import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const base = import.meta.env.BASE_URL;

/** 기존 메인 히어로 보존본 + 테마별 신규 배너(WebP) */
const SLIDE_SRC = [
  `${base}media/banner-legacy-hero.webp`,
  `${base}media/banner-rebar.webp`,
  `${base}media/banner-apartments.webp`,
  `${base}media/banner-warehouse.webp`,
  `${base}media/banner-remodel.webp`,
] as const;

export function MainBanner() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || SLIDE_SRC.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDE_SRC.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <section className="main-banner" aria-label="메인 비주얼 영역">
      <div className="main-banner__viewport">
        {SLIDE_SRC.map((src, i) => (
          <img
            key={src}
            className={`main-banner__slide${i === index ? " is-active" : ""}`}
            src={src}
            alt=""
            width={1920}
            height={1080}
            decoding={i === 0 ? "sync" : "async"}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        ))}
      </div>
    </section>
  );
}

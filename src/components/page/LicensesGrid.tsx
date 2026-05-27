import { useCallback, useEffect, useRef, useState } from "react";
import type { LicenseGridItem, LicenseSection } from "../../content/company/licensesData";
import { ContentSectionHead } from "./ContentSectionHead";

const assetBase = import.meta.env.BASE_URL;

function assetUrl(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

type Props = {
  sections: LicenseSection[];
};

export function LicensesGrid({ sections }: Props) {
  const [active, setActive] = useState<LicenseGridItem | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  useEffect(() => {
    if (active) closeBtnRef.current?.focus();
  }, [active]);

  return (
    <div className="licenses-content">
      <div className="container licenses-story">
        {sections.map((section, si) => (
          <section key={section.heading} className="licenses-section" aria-labelledby={`lic-sec-${si}`}>
            <header className="licenses-section__head">
              <ContentSectionHead id={`lic-sec-${si}`} title={section.heading} />
            </header>
            <ul className="licenses-grid">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="licenses-card"
                    onClick={() => setActive(item)}
                    aria-label={
                      item.detailImage ? `${item.title} 스캔 원본 크게 보기` : `${item.title} 안내 보기`
                    }
                  >
                    <span className="licenses-card__logo" aria-hidden="true">
                      <img src={assetUrl(item.thumb)} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="licenses-card__date">{item.dateLine}</span>
                    <span className="licenses-card__title">{item.title}</span>
                    {item.subtitleLines?.map((line) => (
                      <span key={line} className="licenses-card__sub">
                        {line}
                      </span>
                    ))}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {active ? (
        <div
          className="licenses-modal"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="licenses-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="licenses-modal-title"
          >
            <div className="licenses-modal__head">
              <h4 id="licenses-modal-title">{active.title}</h4>
              <p className="licenses-modal__meta">{active.dateLine}</p>
              <button ref={closeBtnRef} type="button" className="licenses-modal__close" onClick={close}>
                닫기
              </button>
            </div>
            <div className="licenses-modal__body">
              {active.detailImage ? (
                <figure className="licenses-modal__figure">
                  <img src={assetUrl(active.detailImage)} alt={`${active.title} 스캔`} decoding="async" />
                </figure>
              ) : (
                <div className="licenses-modal__empty">
                  <p>해당 문서의 고해상도 스캔 파일은 아직 웹에 연결되어 있지 않습니다.</p>
                  <p>원본이 필요하시면 경영지원 담당으로 요청해 주시기 바랍니다.</p>
                  <figure className="licenses-modal__thumbwrap">
                    <img src={assetUrl(active.thumb)} alt="" decoding="async" />
                    <figcaption>목록용 썸네일</figcaption>
                  </figure>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

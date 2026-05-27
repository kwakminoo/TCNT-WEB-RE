import { BENEFIT_ITEMS } from "../../content/career/benefitsData";
import { ContentSectionHead } from "./ContentSectionHead";
const assetBase = import.meta.env.BASE_URL;

function assetUrl(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

/** 인재채용 > 복리후생 — 레거시 well_box 카드 그리드 */
export function BenefitsLayout() {
  return (
    <div className="benefits-page">
      <section className="benefits-well">
        <div className="container">
          <ContentSectionHead title="복리후생" />
          <ul className="benefits-well__grid">
            {BENEFIT_ITEMS.map((item) => (
              <li key={item.id} className="benefits-well__item">
                <article className="benefits-well__card" aria-label={item.imageAlt}>
                  <div className="benefits-well__icon">
                    <img
                      src={assetUrl(item.image)}
                      alt=""
                      width={100}
                      height={100}
                      loading="lazy"
                      decoding="async"
                      aria-hidden
                    />
                  </div>
                  <h3 className="benefits-well__title">{item.title}</h3>
                  <p className="benefits-well__desc">
                    {item.lines.map((line, index) => (
                      <span key={line}>
                        {index > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

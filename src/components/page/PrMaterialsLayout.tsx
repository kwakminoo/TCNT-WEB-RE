import { promotionalMaterialItems, materialsAssetSrc } from "../../content/pr/promotionalMaterials";
import { ContentSectionHead } from "./ContentSectionHead";

function DownloadIcon() {
  return (
    <svg className="pr-materials__dl-icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 15.25 7.75 11h2.5V5h3.5v6h2.5L12 15.25ZM5 19v-2h14v2H5Z"
      />
    </svg>
  );
}

export function PrMaterialsLayout() {
  return (
    <div className="pr-materials">
      <div className="container pr-materials__container">
        <ContentSectionHead title="홍보자료" />
        <div className="pr-materials__list-box">
          <ul className="pr-materials__list" role="list">
            {promotionalMaterialItems.map((item) => (
              <li key={item.id} className="pr-materials__group" role="presentation">
                <div className="pr-materials__row" role="row">
                  <div className="pr-materials__date" role="cell">
                    <strong>{item.dateMmDd}</strong>
                    <span>{item.dateYyyy}</span>
                  </div>
                  <div className="pr-materials__subject" role="cell">
                    <span className="pr-materials__subject-text" id={`pr-materials-subj-${item.id}`}>
                      {item.title}
                    </span>
                  </div>
                  <div className="pr-materials__down" role="cell">
                    <a
                      href={item.download.href}
                      className="pr-materials__down-link"
                      target="_blank"
                      rel={item.download.external ? "noopener noreferrer" : undefined}
                      download={item.download.external ? undefined : true}
                      aria-label={`${item.title} 첨부파일 다운로드`}
                    >
                      <DownloadIcon />
                    </a>
                  </div>
                </div>
                <div
                  className="pr-materials__panel"
                  role="region"
                  aria-labelledby={`pr-materials-subj-${item.id}`}
                >
                  <div className="pr-materials__panel-body">
                    {item.body.map((block, i) => {
                      if (block.kind === "paragraph") {
                        return (
                          <p
                            key={`${item.id}-p-${i}`}
                            className={block.centered ? "pr-materials__p pr-materials__p--center" : "pr-materials__p"}
                          >
                            {block.text}
                          </p>
                        );
                      }
                      return (
                        <p
                          key={`${item.id}-img-${i}`}
                          className={block.centered ? "pr-materials__img-wrap pr-materials__img-wrap--center" : "pr-materials__img-wrap"}
                        >
                          <img
                            src={materialsAssetSrc(block.src)}
                            alt={block.alt}
                            loading="lazy"
                            decoding="async"
                          />
                        </p>
                      );
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <nav className="pr-materials__page-nav" aria-label="페이지 이동">
          <ul className="pr-materials__pagination">
            <li>
              <span className="pr-materials__page-link pr-materials__page-link--active" aria-current="page">
                1
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

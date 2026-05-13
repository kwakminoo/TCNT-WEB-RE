import { PARTNER_LOGOS, partnerImageSrc } from "../../content/company/partnersData";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

export function ClientsPartnersGrid() {
  return (
    <section className="clients-partners" aria-label="주거래 시공사 로고">
      <div className="container">
        <ul className="clients-partners__grid">
          {PARTNER_LOGOS.map((p) => {
            const src = partnerImageSrc(p.fileId);
            return (
              <li key={p.fileId} className="clients-partners__cell">
                <a
                  className="clients-partners__link"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.nameKo} 공식 사이트(새 창)`}
                >
                  <img
                    src={mediaSrc(src)}
                    alt=""
                    width={320}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    className="clients-partners__logo"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

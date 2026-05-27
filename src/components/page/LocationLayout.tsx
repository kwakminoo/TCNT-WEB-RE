import {
  LOCATION_ADDRESS,
  LOCATION_FAX,
  LOCATION_KAKAO_MAP_URL,
  LOCATION_TEL,
} from "../../content/company/locationData";
import { ContentSectionHead } from "./ContentSectionHead";
import { KakaoMapEmbed } from "./KakaoMapEmbed";

export function LocationLayout() {
  return (
    <div className="location-page">
      <div className="container location-page__inner">
        <ContentSectionHead title="오시는 길" />
        <KakaoMapEmbed />
        <section className="location-contact" aria-label="연락처 및 주소">
          <p className="location-contact__address">{LOCATION_ADDRESS}</p>
          <hr className="location-contact__divider" />
          <div className="location-contact__meta">
            <p className="location-contact__item">
              <span className="location-contact__mark" aria-hidden="true" />
              <span>
                <strong className="location-contact__label">TEL</strong> {LOCATION_TEL}
              </span>
            </p>
            <p className="location-contact__item">
              <span className="location-contact__mark" aria-hidden="true" />
              <span>
                <strong className="location-contact__label">FAX</strong> {LOCATION_FAX}
              </span>
            </p>
            <a
              href={LOCATION_KAKAO_MAP_URL}
              className="location-contact__map-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              지도 크게보기
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

const assetBase = import.meta.env.BASE_URL;

const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@%ED%83%9C%EC%9D%BC%EC%94%A8%EC%95%A4%ED%8B%B0%EA%B2%BD%EC%98%81%EA%B8%B0%ED%9A%8D%EC%8B%A4";

const INTRO_VIDEO_SRC = "media/video/company-intro.mp4";
const PROMO_VIDEO_SRC = "media/video/promo-2025.mp4";
const LOGO_SRC = "brand/logo-circle.png";

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

export function YoutubeLayout() {
  return (
    <div className="youtube-page">
      <section className="youtube-intro" aria-labelledby="youtube-intro-heading">
        <h2 id="youtube-intro-heading" className="sr-only">
          {"\uD68C\uC0AC \uC18C\uAC1C \uC601\uC0C1"}
        </h2>
        <div className="youtube-intro__video-wrap">
          <video
            className="youtube-intro__video"
            src={mediaSrc(INTRO_VIDEO_SRC)}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="youtube-intro__overlay" aria-hidden="true" />
        </div>
      </section>

      <section className="youtube-promo" aria-labelledby="youtube-promo-heading">
        <header className="youtube-promo__head">
          <a
            className="youtube-channel"
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="youtube-channel__logo"
              src={mediaSrc(LOGO_SRC)}
              alt=""
              width={120}
              height={120}
              decoding="async"
              aria-hidden="true"
            />
            <span className="youtube-channel__label">
              {"\uD0DC\uC77C\uC528\uC564\uD2F0 \uC720\uD29C\uBE0C"}
            </span>
            <span className="sr-only">{"(\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB9BC)"}</span>
          </a>
          <h2 id="youtube-promo-heading" className="youtube-promo__title">
            {"\uD0DC\uC77C\uC528\uC564\uD2F0\uD64D\uBCF4\uC601\uC0C1"}
          </h2>
        </header>
        <div className="youtube-promo__player">
          <video
            className="youtube-promo__video"
            src={mediaSrc(PROMO_VIDEO_SRC)}
            controls
            playsInline
            preload="metadata"
            aria-label={"\u0032\u0030\u0032\u0035 \uD0DC\uC77C\uC528\uC564\uD2F0 \uD64D\uBCF4\uC601\uC0C1"}
          />
        </div>
      </section>
    </div>
  );
}

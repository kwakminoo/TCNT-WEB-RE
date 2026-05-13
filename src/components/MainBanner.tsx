const base = import.meta.env.BASE_URL;

/** 원본 해상도에 맞춘 힌트(16:9). CSS `object-fit: cover`로 뷰포트에 맞게 표시 */
const VIDEO_SRC = `${base}media/bnt1.mp4`;

export function MainBanner() {
  return (
    <section className="main-banner home-scroll-pane" aria-label="메인 비주얼 영역">
      <div className="main-banner__viewport">
        <video
          className="main-banner__slide is-active"
          src={VIDEO_SRC}
          width={3840}
          height={2160}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    </section>
  );
}

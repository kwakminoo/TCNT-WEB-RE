type Props = {
  src: string;
  title: string;
  description?: string;
};

const assetBase = import.meta.env.BASE_URL;

export function VideoEmbed({ src, title, description }: Props) {
  const resolved = src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
  return (
    <figure className="media-figure media-figure--video">
      <video
        controls
        preload="metadata"
        playsInline
        aria-label={title}
        className="video-embed"
      >
        <source src={resolved} />
        브라우저가 video 태그를 지원하지 않습니다.
      </video>
      {description ? (
        <figcaption className="media-figure__caption">{description}</figcaption>
      ) : null}
    </figure>
  );
}

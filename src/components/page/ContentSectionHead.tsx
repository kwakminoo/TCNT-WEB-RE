type ContentSectionHeadProps = {
  id?: string;
  title: string;
  className?: string;
  /** 어두운 배경(스토리 패널 등) 위 표시 */
  variant?: "default" | "light";
  /** 긴 문장 제목(기술혁신 챕터 등) */
  size?: "default" | "long";
  headingLevel?: 2 | 3;
};

/** 하위 페이지 본문 섹션 제목 — 중앙 정렬 + 녹색 세로 악센트 */
export function ContentSectionHead({
  id,
  title,
  className,
  variant = "default",
  size = "default",
  headingLevel = 2,
}: ContentSectionHeadProps) {
  const Tag = headingLevel === 3 ? "h3" : "h2";
  const headClass = [
    "content-section-head",
    variant === "light" && "content-section-head--light",
    size === "long" && "content-section-head--long",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headClass}>
      <Tag id={id} className="content-section-head__title">
        {title}
      </Tag>
      <div className="content-section-head__accent" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </header>
  );
}

/** @deprecated ContentSectionHead 사용 */
export const JobSectionHead = ContentSectionHead;

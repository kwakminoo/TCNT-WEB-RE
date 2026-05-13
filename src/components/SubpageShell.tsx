import type { ReactNode } from "react";

type Props = {
  /** 브레드크럼·제목·리드(및 히어로 내 폼 등) */
  intro: ReactNode;
  /** 히어로 하단에 붙는 페이지별 보조 메뉴 */
  subNav?: ReactNode;
  /** 본문(필요 시 내부에서 `container` 사용) */
  children: ReactNode;
  /** 지도 전용: 본문 영역에 지도용 높이·배경 적용 */
  mapMode?: boolean;
  /** 페이지별 변형 클래스 */
  className?: string;
};

/**
 * 상세·부가 페이지 공통 레이아웃: 단일 섹션 + 뷰포트(헤더 제외) 높이,
 * 상단 설명(head)과 스크롤 가능한 본문(content)을 한 영역에 배치.
 */
export function SubpageShell({ intro, subNav, children, mapMode = false, className }: Props) {
  return (
    <section
      className={`page-shell${mapMode ? " page-shell--map" : ""}${className ? ` ${className}` : ""}`}
      aria-labelledby="page-title"
    >
      <header className="page-shell__head">
        <div className="container">{intro}</div>
      </header>
      {subNav ? <div className="page-shell__local-nav">{subNav}</div> : null}
      <div
        className={
          mapMode ? "page-shell__content page-shell__content--map" : "page-shell__content"
        }
      >
        {children}
      </div>
    </section>
  );
}

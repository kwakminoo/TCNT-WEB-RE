import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** 라우트(path·query)가 바뀔 때 문서 및 페이지 내부 스크롤 영역을 맨 위로 이동 */
export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const main = document.getElementById("main");
    if (main) main.scrollTop = 0;

    document.querySelectorAll<HTMLElement>(".page-shell__content").forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname, search]);

  return null;
}

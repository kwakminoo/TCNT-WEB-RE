import type { RefObject } from "react";
import { useEffect } from "react";

type ScrollRevealOptions = {
  rootMargin?: string;
  threshold?: number;
  selector?: string;
};

/**
 * 루트 하위 `[data-reveal]` 요소가 뷰포트에 들어오면 `is-visible`을 붙인다.
 * `prefers-reduced-motion`이면 즉시 표시한다.
 */
export function useScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {},
) {
  const { rootMargin = "0px 0px -10% 0px", threshold = 0.12, selector = "[data-reveal]" } =
    options;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll(selector);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold },
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [rootRef, rootMargin, threshold, selector]);
}

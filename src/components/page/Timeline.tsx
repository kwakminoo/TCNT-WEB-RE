import type { PageBlockTimeline } from "../../content/types";
import { ContentSectionHead } from "./ContentSectionHead";

type Props = { block: PageBlockTimeline };

export function Timeline({ block }: Props) {
  return (
    <div className="timeline">
      {block.heading ? (
        <ContentSectionHead title={block.heading} className="timeline__intro-heading" />
      ) : null}
      <ol className="timeline__list" aria-label="연혁 타임라인">
        {block.sections.map((sec) => (
          <li key={sec.year} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__body">
              <h3 className="timeline__year">{sec.year}</h3>
              {sec.subtitle ? (
                <p className="timeline__subtitle">{sec.subtitle}</p>
              ) : null}
              <ul className="timeline__bullets">
                {sec.lines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

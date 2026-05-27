import { useId } from "react";
import { CAREER_FAQ_ITEMS } from "../../content/career/faqData";
import { ContentSectionHead } from "./ContentSectionHead";
/** 인재채용 > 채용FAQ — 레거시 job_faq_list.jsp 아코디언 */
export function FaqLayout() {
  const baseId = useId();

  return (
    <div className="career-faq-page">
      <section className="career-faq-board">
        <div className="container">
          <ContentSectionHead title="채용 FAQ" />
          <div className="career-faq-list" role="list">
            {CAREER_FAQ_ITEMS.map((item, index) => {
              const panelId = `${baseId}-panel-${item.id}`;
              const triggerId = `${baseId}-trigger-${item.id}`;
              const defaultOpen = index === 0;

              return (
                <article key={item.id} className="career-faq-item" role="listitem">
                  <details className="career-faq-item__details" open={defaultOpen}>
                    <summary className="career-faq-item__question" id={triggerId}>
                      <span className="career-faq-item__q-label">Q.</span>
                      <span className="career-faq-item__q-text">{item.question}</span>
                      <span className="career-faq-item__toggle" aria-hidden="true" />
                    </summary>
                    <div
                      className="career-faq-item__answer"
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                    >
                      <h3 className="career-faq-item__answer-title">
                        <span className="career-faq-item__a-label">A.</span>
                        {item.answerTitle}
                      </h3>
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="career-faq-item__answer-text">
                          {paragraph}
                        </p>
                      ))}
                      {item.id === "interview-focus" ? (
                        <p className="career-faq-item__answer-text career-faq-item__answer-text--note">
                          〈자사 홈페이지 인재채용 부문을 통하여 <em>인재상</em> 및 <em>직무별 내용</em>{" "}
                          등에 대해 자세히 확인하실 수 있습니다.〉
                        </p>
                      ) : null}
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

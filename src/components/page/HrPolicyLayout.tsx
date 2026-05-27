import { Fragment } from "react";
import { ContentSectionHead } from "./ContentSectionHead";

const TALENT_NODES = [
  {
    position: "top",
    title: "더 나은 방식",
    desc: "관심있게 관찰하고 더 나은 방식을 찾는다",
  },
  {
    position: "left",
    title: "책임과 성장",
    desc: "책임과 배움을 반복하며 성장한다",
  },
  {
    position: "right",
    title: "정직과 소통",
    desc: "원칙에 따라 정직하게 소통하여 신뢰를 만든다",
  },
  {
    position: "bottom",
    title: "공동체 의식",
    desc: "공동체를 강화하여 함께 어려움을 극복한다",
  },
] as const;

function TalentModelDiagram() {
  return (
    <div className="hr-talent-diagram">
      <p className="hr-talent-diagram__statement">
        책임과 배움을 반복하며 성장하고, 정직한 소통으로 신뢰를 만들며, 공동체와 함께 어려움을 극복하고 더 나은
        방식을 찾는 인재
      </p>

      <div className="hr-talent-diagram__chevron" aria-hidden>
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
          <path d="M1 1.5 9 8.5 17 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="hr-talent-diagram__compass" role="group" aria-label="핵심가치">
        {TALENT_NODES.map((node) => (
          <article
            key={node.position}
            className={`hr-talent-diagram__node hr-talent-diagram__node--${node.position}`}
          >
            <div className="hr-talent-diagram__circle">
              <strong>{node.title}</strong>
            </div>
            <p className={`hr-talent-diagram__callout hr-talent-diagram__callout--${node.position}`}>{node.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

const EVAL_SOURCES = ["역량평가", "업적평가"] as const;

const EVAL_GOALS = [
  { label: "승진", desc: "투명한 승진 반영 및 우수인재 선발" },
  { label: "육성", desc: "평가 피드백 반영 및 필요 역량 개발" },
  { label: "보상", desc: "평가 결과 연계 보상 차등" },
] as const;

const COMPENSATION_ITEMS = [
  {
    key: "base",
    title: "기본급",
    subtitle: "(직급별 호봉)",
    icon: "base",
  },
  {
    key: "allowance",
    title: "제수당",
    subtitle: (
      <>
        (현장수당, 자격증수당,
        <br />
        특근수당, 기타 수당 등)
      </>
    ),
    icon: "allowance",
  },
  {
    key: "incentive",
    title: "인센티브",
    subtitle: null,
    icon: "incentive",
  },
] as const;

function CompensationIcon({ type }: { type: (typeof COMPENSATION_ITEMS)[number]["icon"] }) {
  const stroke = "#b8c0cc";
  const accent = "#32c96a";

  if (type === "base") {
    return (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden>
        <circle cx="40" cy="40" r="34" stroke={stroke} strokeWidth="3" />
        <text
          x="40"
          y="49"
          textAnchor="middle"
          fill={accent}
          fontSize="34"
          fontWeight="700"
          fontFamily="inherit"
        >
          ₩
        </text>
      </svg>
    );
  }

  if (type === "allowance") {
    return (
      <svg viewBox="0 0 72 88" fill="none" aria-hidden>
        <rect x="18" y="6" width="36" height="14" rx="3" stroke={stroke} strokeWidth="3" />
        <rect x="8" y="18" width="56" height="64" rx="5" stroke={stroke} strokeWidth="3" />
        <path
          d="M22 46 33 57 52 35"
          stroke={accent}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 88 80" fill="none" aria-hidden>
      <rect x="10" y="46" width="14" height="26" fill={stroke} rx="1" />
      <rect x="32" y="34" width="14" height="38" fill={stroke} rx="1" />
      <rect x="54" y="22" width="14" height="50" fill={stroke} rx="1" />
      <path
        d="M6 58C28 18 52 10 80 20"
        stroke={accent}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M72 20 80 12 80 28Z"
        fill={accent}
      />
    </svg>
  );
}

function CompensationSystemDiagram() {
  return (
    <div className="hr-comp-diagram" role="group" aria-label="보상 구성">
      <div className="hr-comp-diagram__row">
        {COMPENSATION_ITEMS.map((item, index) => (
          <Fragment key={item.key}>
            {index > 0 ? (
              <span className="hr-comp-diagram__plus" aria-hidden>
                +
              </span>
            ) : null}
            <article className="hr-comp-diagram__item">
              <div className="hr-comp-diagram__icon">
                <CompensationIcon type={item.icon} />
              </div>
              <h3 className="hr-comp-diagram__title">{item.title}</h3>
              {item.subtitle ? (
                <p className="hr-comp-diagram__subtitle">{item.subtitle}</p>
              ) : null}
            </article>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function EvaluationSystemDiagram() {
  return (
    <div className="hr-eval-diagram">
      <div className="hr-eval-diagram__flow" role="group" aria-label="평가제도 흐름">
        <div className="hr-eval-diagram__tracks">
          {EVAL_SOURCES.map((label, index) => (
            <Fragment key={label}>
              <span className="hr-eval-diagram__pill hr-eval-diagram__pill--primary">{label}</span>
              {index < EVAL_SOURCES.length - 1 ? (
                <span className="hr-eval-diagram__plus" aria-hidden>
                  +
                </span>
              ) : null}
            </Fragment>
          ))}
        </div>

        <div className="hr-eval-diagram__equals" aria-hidden>
          <svg width="40" height="72" viewBox="0 0 40 72" fill="none">
            <path
              d="M8 30h24M8 42h24"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="hr-eval-diagram__goals">
          {EVAL_GOALS.map((item) => (
            <div key={item.label} className="hr-eval-diagram__goal-row">
              <div className="hr-eval-diagram__goal">{item.label}</div>
              <p className="hr-eval-diagram__goal-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HrPolicyLayout() {
  return (
    <div className="hr-policy-page">
      <section id="hr-talent" className="hr-policy-section" aria-labelledby="hr-talent-heading">
        <div className="container hr-policy-section__inner">
          <header className="hr-policy-section__head hr-policy-section__head--label-only">
            <ContentSectionHead id="hr-talent-heading" title="인재상" />
          </header>
          <TalentModelDiagram />
        </div>
      </section>

      <section id="hr-evaluation" className="hr-policy-section hr-policy-section--alt" aria-labelledby="hr-evaluation-heading">
        <div className="container hr-policy-section__inner">
          <header className="hr-policy-section__head hr-policy-section__head--label-only">
            <ContentSectionHead id="hr-evaluation-heading" title="평가제도" />
          </header>
          <EvaluationSystemDiagram />
        </div>
      </section>

      <section id="hr-compensation" className="hr-policy-section" aria-labelledby="hr-compensation-heading">
        <div className="container hr-policy-section__inner">
          <header className="hr-policy-section__head hr-policy-section__head--label-only">
            <ContentSectionHead id="hr-compensation-heading" title="보상제도" />
          </header>
          <CompensationSystemDiagram />
        </div>
      </section>
    </div>
  );
}

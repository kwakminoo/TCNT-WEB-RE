import {
  RECRUITMENT_GUIDE_STEPS,
  type RecruitmentGuideIcon,
} from "../../content/career/recruitmentGuideData";
import { ContentSectionHead } from "./ContentSectionHead";

function GuideStepIcon({ icon }: { icon: RecruitmentGuideIcon }) {
  const common = {
    width: 52,
    height: 52,
    viewBox: "0 0 40 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "document":
      return (
        <svg {...common}>
          <rect x="9" y="6" width="22" height="28" rx="1" stroke="currentColor" strokeWidth="2" />
          <path d="M14 14h12M14 19h12M14 24h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "person-outline":
      return (
        <svg {...common}>
          <circle cx="20" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M11 32c0-5 4-9 9-9s9 4 9 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "id-card":
      return (
        <svg {...common}>
          <rect x="7" y="11" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="15" cy="20" r="3" stroke="currentColor" strokeWidth="1.75" />
          <path d="M22 17h8M22 21h6M22 25h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "person-solid":
      return (
        <svg {...common} fill="currentColor">
          <circle cx="20" cy="13" r="5.5" />
          <path d="M10 33c1.2-6.2 5.4-10 10-10s8.8 3.8 10 10H10z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path
            d="M11 21l6 6 14-14"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

/** 직무소개 상단 — 공개채용 절차(채용가이드) */
export function RecruitmentGuideSection() {
  return (
    <section className="job-intro-guide">
      <div className="container">
        <ContentSectionHead title="채용 절차" className="job-intro-guide__head" />
        <div className="job-intro-guide__panel">
          <p className="job-intro-guide__type">공개채용</p>
          <ol className="job-intro-guide__flow">
            {RECRUITMENT_GUIDE_STEPS.map((step, index) => (
              <li key={step.id} className="job-intro-guide__item">
                <div
                  className={
                    step.highlight
                      ? "job-intro-guide__card job-intro-guide__card--final"
                      : "job-intro-guide__card"
                  }
                >
                  <span className="job-intro-guide__icon">
                    <GuideStepIcon icon={step.icon} />
                  </span>
                  <span className="job-intro-guide__label">{step.label}</span>
                </div>
                {index < RECRUITMENT_GUIDE_STEPS.length - 1 ? (
                  <span className="job-intro-guide__arrow" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

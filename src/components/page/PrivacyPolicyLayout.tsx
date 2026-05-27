import { PRIVACY_POLICY_ARTICLES, PRIVACY_POLICY_INTRO } from "../../content/legal/privacyPolicyData";
import { ContentSectionHead } from "./ContentSectionHead";

function LockIcon() {
  return (
    <svg className="legal-guide__icon-svg" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="14" y="28" width="36" height="28" rx="4" fill="currentColor" opacity="0.15" />
      <path
        d="M22 28V22a10 10 0 1 1 20 0v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="42" r="3.5" fill="currentColor" />
      <path
        d="M32 45.5v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="legal-guide__check-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8.2 6.4 11.5 13 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PrivacyPolicyLayout() {
  return (
    <div className="legal-guide legal-guide--privacy">
      <div className="container legal-guide__inner">
        <ContentSectionHead
          id="privacy-policy-heading"
          title="개인정보처리방침"
          className="legal-guide__head"
        />
        <div className="legal-guide__box legal-guide__box--privacy">
          <p className="legal-guide__intro">{PRIVACY_POLICY_INTRO}</p>
          <div className="legal-guide__privacy-split">
            <div className="legal-guide__privacy-icon" aria-hidden="true">
              <LockIcon />
            </div>
            <ul className="legal-guide__article-list">
              {PRIVACY_POLICY_ARTICLES.map((article) => (
                <li key={article}>
                  <CheckIcon />
                  <span>{article}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

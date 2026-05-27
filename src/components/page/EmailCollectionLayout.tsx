import {
  EMAIL_COLLECTION_BODY,
  EMAIL_COLLECTION_POSTED,
} from "../../content/legal/emailCollectionData";
import { ContentSectionHead } from "./ContentSectionHead";

function EnvelopeIcon() {
  return (
    <svg className="legal-guide__icon-svg legal-guide__icon-svg--envelope" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="16" width="48" height="34" rx="4" fill="currentColor" opacity="0.12" />
      <path
        d="M8 20 32 38 56 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="8"
        y="16"
        width="48"
        height="34"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

export function EmailCollectionLayout() {
  return (
    <div className="legal-guide legal-guide--email">
      <div className="container legal-guide__inner">
        <ContentSectionHead
          id="email-collection-heading"
          title="이메일 무단수집 거부"
          className="legal-guide__head"
        />
        <div className="legal-guide__box legal-guide__box--spam">
          <div className="legal-guide__spam-body">
            <span className="legal-guide__spam-icon" aria-hidden="true">
              <EnvelopeIcon />
            </span>
            <p className="legal-guide__spam-text">
              {EMAIL_COLLECTION_BODY}
              <br />
              <strong className="legal-guide__spam-date">게시일 : {EMAIL_COLLECTION_POSTED}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

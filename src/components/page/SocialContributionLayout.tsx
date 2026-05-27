import { Link } from "react-router-dom";
import {
  SOCIAL_CONTRIBUTION_INTRO,
  socialContributionItems,
  socialMediaSrc,
} from "../../content/pr/socialContribution";
import { ContentSectionHead } from "./ContentSectionHead";

function SocialCard({ item }: { item: (typeof socialContributionItems)[number] }) {
  return (
    <article className="pr-social-card">
      <Link to={item.link_url} className="pr-social-card__link">
        <div className="pr-social-card__thumb">
          <img src={socialMediaSrc(item.image_url)} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="pr-social-card__body">
          <h2 className="pr-social-card__title">{item.title}</h2>
          <p className="pr-social-card__summary">{item.summary}</p>
        </div>
      </Link>
    </article>
  );
}

export function SocialContributionLayout() {
  return (
    <div className="pr-social">
      <div className="container pr-social__inner">
        <ContentSectionHead title="사회공헌 활동" />
        <p className="pr-social__intro">{SOCIAL_CONTRIBUTION_INTRO}</p>

        <ul className="pr-social__list" aria-label="사회공헌 활동 목록">
          {socialContributionItems.map((item) => (
            <li key={item.id}>
              <SocialCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import socialData from "./social_data.json" with { type: "json" };

export type SocialContributionItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image_url: string;
  link_url: string;
  body: string[];
};

export const socialContributionItems = socialData as SocialContributionItem[];

export const SOCIAL_CONTRIBUTION_INTRO =
  "태일씨앤티는 기업의 사회적 책임을 다하고, 나눔을 실천하고자 다양한 사회공헌 활동위해 노력하고 있습니다.";

export function formatSocialDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d || y === "1970") return "";
  return `${y}.${m}.${d}`;
}

export function socialCategoryTag(category: string): string {
  return `[${category}]`;
}

export function findSocialContributionById(id: string): SocialContributionItem | undefined {
  return socialContributionItems.find((item) => item.id === id);
}

const assetBase = import.meta.env.BASE_URL;

export function socialMediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

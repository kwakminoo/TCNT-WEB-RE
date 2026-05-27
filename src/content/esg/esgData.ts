export type EsgTab = "esg" | "environment" | "ethics";

export type EsgItem = {
  id: string;
  tab: EsgTab;
  number: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
};

export const ESG_TAB_LABELS: Record<EsgTab, string> = {
  esg: "ESG",
  environment: "환경경영",
  ethics: "윤리경영",
};

export const esgItems: EsgItem[] = [
  {
    id: "esg-overview",
    tab: "esg",
    number: 1,
    title: "ESG 경영 개요",
    imageSrc: "media/esg/esg-overview.png",
    imageAlt: "ESG 경영 개요",
  },
  {
    id: "environment",
    tab: "environment",
    number: 2,
    title: "환경경영",
    imageSrc: "media/esg/environment.jpg",
    imageAlt: "환경경영 안내 이미지",
  },
  {
    id: "ethics",
    tab: "ethics",
    number: 3,
    title: "윤리경영",
    imageSrc: "media/esg/ethics.png",
    imageAlt: "윤리경영 안내 이미지",
  },
];

export function esgItemsForTab(tab: EsgTab): EsgItem[] {
  if (tab === "esg") return esgItems;
  return esgItems.filter((item) => item.tab === tab);
}

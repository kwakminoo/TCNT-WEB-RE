import newsData from "./news_data.json" with { type: "json" };

export type InnovationNewsCategory = "construction" | "other";

export type InnovationNewsItem = {
  id: string;
  title: string;
  date: string;
  category: InnovationNewsCategory;
  content: string;
  image_url: string;
  link_url: string;
};

export type InnovationNewsCategoryFilter = "all" | InnovationNewsCategory;

export const innovationNewsItems = newsData as InnovationNewsItem[];

const categoryLabels: Record<InnovationNewsCategoryFilter, string> = {
  all: "전체",
  construction: "건설분야",
  other: "기타분야",
};

export function innovationNewsCategoryLabel(filter: InnovationNewsCategoryFilter): string {
  return categoryLabels[filter];
}

export function findInnovationNewsById(id: string): InnovationNewsItem | undefined {
  return innovationNewsItems.find((item) => item.id === id);
}

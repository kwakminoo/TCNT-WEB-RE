import newsData from "./news_data.json" with { type: "json" };

export type PrNewsCategory = "award" | "press" | "event";

export type PrNewsItem = {
  id: string;
  title: string;
  date: string;
  category: PrNewsCategory;
  summary: string;
  image_url: string;
  link_url: string;
  body: string[];
};

export type PrNewsCategoryFilter = "all" | PrNewsCategory;

export const prNewsItems = newsData as PrNewsItem[];

const categoryLabels: Record<PrNewsCategoryFilter, string> = {
  all: "전체",
  award: "수상",
  press: "보도",
  event: "행사소식",
};

export function prNewsCategoryLabel(filter: PrNewsCategoryFilter): string {
  return categoryLabels[filter];
}

export function prNewsCategoryTag(category: PrNewsCategory): string {
  return `[${categoryLabels[category]}]`;
}

export function formatPrNewsDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return isoDate;
  return `${y}.${m}.${d}`;
}

export function findPrNewsById(id: string): PrNewsItem | undefined {
  return prNewsItems.find((item) => item.id === id);
}

/** 메인 페이지 NEWS 쇼케이스 배지 키 (global.css `home-news-badge--*` 와 일치) */
export type PrNewsHomeBadgeKey = "수상" | "보도자료" | "행사소식";

export type PrNewsHomeFeatured = {
  id: string;
  category: PrNewsHomeBadgeKey;
  title: string;
  date: string;
  content: string;
  imageSrc: string;
  linkUrl: string;
};

const homeBadgeByCategory: Record<PrNewsCategory, PrNewsHomeBadgeKey> = {
  award: "수상",
  press: "보도자료",
  event: "행사소식",
};

const assetBase = import.meta.env.BASE_URL;

export function prNewsMediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

export function prNewsToHomeFeatured(item: PrNewsItem): PrNewsHomeFeatured {
  return {
    id: item.id,
    category: homeBadgeByCategory[item.category],
    title: item.title,
    date: formatPrNewsDate(item.date),
    content: item.summary || item.body.join(" "),
    imageSrc: prNewsMediaSrc(item.image_url),
    linkUrl: item.link_url,
  };
}

/** 날짜 내림차순 최신 N건 (메인 NEWS 쇼케이스용) */
export function getLatestPrNewsForHome(limit = 3): PrNewsHomeFeatured[] {
  return [...prNewsItems]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
    .map(prNewsToHomeFeatured);
}

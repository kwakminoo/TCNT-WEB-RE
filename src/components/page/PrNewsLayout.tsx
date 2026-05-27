import { type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  type PrNewsCategoryFilter,
  type PrNewsItem,
  formatPrNewsDate,
  prNewsCategoryLabel,
  prNewsCategoryTag,
  prNewsItems,
} from "../../content/pr/prNews";
import { ContentSectionHead } from "./ContentSectionHead";

const assetBase = import.meta.env.BASE_URL;

type SearchField = "title" | "content";

const CATEGORY_OPTIONS: PrNewsCategoryFilter[] = ["all", "award", "press", "event"];

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

function matchesCategory(item: PrNewsItem, category: PrNewsCategoryFilter): boolean {
  return category === "all" || item.category === category;
}

function matchesQuery(item: PrNewsItem, query: string, field: SearchField): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack =
    field === "title" ? item.title : `${item.title} ${item.summary} ${item.body.join(" ")}`;
  return haystack.toLowerCase().includes(q);
}

export function PrNewsLayout() {
  const [category, setCategory] = useState<PrNewsCategoryFilter>("all");
  const [searchField, setSearchField] = useState<SearchField>("title");
  const [searchInput, setSearchInput] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  const filtered = useMemo(
    () =>
      prNewsItems.filter(
        (item) => matchesCategory(item, category) && matchesQuery(item, appliedQuery, searchField),
      ),
    [category, appliedQuery, searchField],
  );

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAppliedQuery(searchInput);
  }

  return (
    <div className="pr-news">
      <div className="container pr-news__inner">
        <ContentSectionHead title="News" />
        <div className="pr-news__toolbar">
          <p className="pr-news__count" aria-live="polite">
            {prNewsCategoryLabel(category)} {filtered.length}건
          </p>
          <form className="pr-news__search" onSubmit={onSearchSubmit} role="search">
            <label className="sr-only" htmlFor="pr-news-category">
              분류
            </label>
            <select
              id="pr-news-category"
              className="pr-news__search-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as PrNewsCategoryFilter)}
              aria-label="뉴스 분류"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {prNewsCategoryLabel(opt)}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="pr-news-search-field">
              검색 범위
            </label>
            <select
              id="pr-news-search-field"
              className="pr-news__search-select"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as SearchField)}
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <label className="sr-only" htmlFor="pr-news-search-input">
              검색어
            </label>
            <input
              id="pr-news-search-input"
              type="search"
              className="pr-news__search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="검색어를 입력하세요"
            />
            <button type="submit" className="pr-news__search-submit">
              <span className="pr-news__search-icon" aria-hidden="true">
                ⌕
              </span>
              검색
            </button>
          </form>
        </div>

        <div className="pr-news__list-panel">
          {filtered.length === 0 ? (
            <p className="pr-news__empty">등록된 뉴스가 없습니다.</p>
          ) : (
            <ul className="pr-news__list" aria-label="홍보센터 News 목록">
              {filtered.map((item) => (
                <li key={item.id}>
                  <PrNewsCard item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function PrNewsCard({ item }: { item: PrNewsItem }) {
  return (
    <article className="pr-news-card">
      <Link to={item.link_url} className="pr-news-card__link">
        <div className="pr-news-card__thumb">
          <img src={mediaSrc(item.image_url)} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="pr-news-card__body">
          <h2 className="pr-news-card__title">
            <span className="pr-news-card__category">{prNewsCategoryTag(item.category)}</span>
            {item.title}
          </h2>
          <time className="pr-news-card__date" dateTime={item.date}>
            {formatPrNewsDate(item.date)}
          </time>
          <p className="pr-news-card__summary">{item.summary}</p>
        </div>
      </Link>
    </article>
  );
}
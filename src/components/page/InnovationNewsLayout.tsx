import { type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  type InnovationNewsCategoryFilter,
  type InnovationNewsItem,
  innovationNewsCategoryLabel,
  innovationNewsItems,
} from "../../content/innovation/innovationNews";
import { ContentSectionHead } from "./ContentSectionHead";

const assetBase = import.meta.env.BASE_URL;

const CATEGORY_TABS: InnovationNewsCategoryFilter[] = ["all", "construction", "other"];

type SearchField = "title" | "content";

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

function matchesCategory(item: InnovationNewsItem, category: InnovationNewsCategoryFilter): boolean {
  return category === "all" || item.category === category;
}

function matchesQuery(item: InnovationNewsItem, query: string, field: SearchField): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = field === "title" ? item.title : `${item.title} ${item.content}`;
  return haystack.toLowerCase().includes(q);
}

export function InnovationNewsLayout() {
  const [category, setCategory] = useState<InnovationNewsCategoryFilter>("all");
  const [searchField, setSearchField] = useState<SearchField>("title");
  const [searchInput, setSearchInput] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  const filtered = useMemo(
    () =>
      innovationNewsItems.filter(
        (item) => matchesCategory(item, category) && matchesQuery(item, appliedQuery, searchField),
      ),
    [category, appliedQuery, searchField],
  );

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAppliedQuery(searchInput);
  }

  return (
    <div className="innovation-news">
      <div className="container innovation-news__inner">
        <ContentSectionHead title="기술혁신 News" />
        <div className="innovation-news__tabs" role="tablist" aria-label="기술혁신 News 분야">
          {CATEGORY_TABS.map((tab) => {
            const active = category === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                className={`innovation-news__tab${active ? " is-active" : ""}`}
                onClick={() => setCategory(tab)}
              >
                {innovationNewsCategoryLabel(tab)}
              </button>
            );
          })}
        </div>

        <div className="innovation-news__toolbar">
          <p className="innovation-news__count" aria-live="polite">
            {innovationNewsCategoryLabel(category)} {filtered.length}건
          </p>
          <form className="innovation-news__search" onSubmit={onSearchSubmit} role="search">
            <label className="sr-only" htmlFor="innovation-news-search-field">
              검색 범위
            </label>
            <select
              id="innovation-news-search-field"
              className="innovation-news__search-select"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as SearchField)}
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <label className="sr-only" htmlFor="innovation-news-search-input">
              검색어
            </label>
            <input
              id="innovation-news-search-input"
              type="search"
              className="innovation-news__search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="검색어를 입력하세요"
            />
            <button type="submit" className="innovation-news__search-submit">
              <span className="innovation-news__search-icon" aria-hidden="true">
                ⌕
              </span>
              검색
            </button>
          </form>
        </div>

        <div className="innovation-news__list-panel">
          {filtered.length === 0 ? (
            <p className="innovation-news__empty">등록된 뉴스가 없습니다.</p>
          ) : (
            <ul className="innovation-news__list" aria-label="기술혁신 News 목록">
              {filtered.map((item) => (
                <li key={item.id}>
                  <InnovationNewsCard item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function InnovationNewsCard({ item }: { item: InnovationNewsItem }) {
  return (
    <article className="innovation-news-card">
      <Link to={item.link_url} className="innovation-news-card__link">
        <div className="innovation-news-card__thumb">
          <img src={mediaSrc(item.image_url)} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="innovation-news-card__body">
          <div className="innovation-news-card__head">
            <h2 className="innovation-news-card__title">{item.title}</h2>
            <time className="innovation-news-card__date" dateTime={item.date}>
              {item.date}
            </time>
          </div>
          <p className="innovation-news-card__summary">{item.content}</p>
        </div>
      </Link>
    </article>
  );
}
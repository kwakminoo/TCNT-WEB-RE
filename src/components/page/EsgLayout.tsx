import { type FormEvent, useId, useMemo, useState } from "react";
import {
  ESG_TAB_LABELS,
  type EsgItem,
  type EsgTab,
  esgItems,
  esgItemsForTab,
} from "../../content/esg/esgData";
import { ContentSectionHead } from "./ContentSectionHead";

const assetBase = import.meta.env.BASE_URL;

const ESG_TABS: EsgTab[] = ["esg", "environment", "ethics"];

type SearchField = "title" | "content";

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

function matchesQuery(item: EsgItem, query: string, field: SearchField): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = field === "title" ? item.title : `${item.title} ${item.imageAlt}`;
  return haystack.toLowerCase().includes(q);
}

function EsgAccordionItem({
  item,
  expanded,
  onToggle,
}: {
  item: EsgItem;
  expanded: boolean;
  onToggle: () => void;
}) {
  const panelId = `esg-panel-${item.id}`;
  const triggerId = `esg-trigger-${item.id}`;

  return (
    <li className="esg-list__item">
      <div id={triggerId} className={`esg-list__row${expanded ? " is-expanded" : ""}`}>
        <span className="esg-list__num" aria-hidden="true">
          {item.number}
        </span>
        <button
          type="button"
          className="esg-list__subject"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.title}</span>
        </button>
        <span className="esg-list__arrow" aria-hidden="true" />
      </div>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!expanded}
        className="esg-list__panel"
      >
        <div className="esg-list__panel-body">
          <img src={mediaSrc(item.imageSrc)} alt={item.imageAlt} loading="lazy" decoding="async" />
        </div>
      </div>
    </li>
  );
}

export function EsgLayout() {
  const listId = useId();
  const [tab, setTab] = useState<EsgTab>("esg");
  const [searchField, setSearchField] = useState<SearchField>("title");
  const [searchInput, setSearchInput] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(esgItems.map((i) => i.id)));

  const filtered = useMemo(() => {
    const base = esgItemsForTab(tab);
    return base.filter((item) => matchesQuery(item, appliedQuery, searchField));
  }, [tab, appliedQuery, searchField]);

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAppliedQuery(searchInput);
  }

  function toggleItem(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function onTabChange(next: EsgTab) {
    setTab(next);
    const visible = esgItemsForTab(next);
    setExpandedIds(new Set(visible.map((item) => item.id)));
  }

  return (
    <div className="esg-board">
      <div className="container esg-board__inner">
        <ContentSectionHead title="ESG 활동" />
        <div className="esg-board__tabs" role="tablist" aria-label="ESG 분야">
          {ESG_TABS.map((key) => {
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                className={`esg-board__tab${active ? " is-active" : ""}`}
                onClick={() => onTabChange(key)}
              >
                {ESG_TAB_LABELS[key]}
              </button>
            );
          })}
        </div>
        <div className="esg-board__toolbar">
          <p className="esg-board__count" aria-live="polite">
            전체 {filtered.length}건
          </p>
          <form className="esg-board__search" onSubmit={onSearchSubmit} role="search">
            <label className="sr-only" htmlFor={`${listId}-field`}>
              검색 범위
            </label>
            <select
              id={`${listId}-field`}
              className="esg-board__search-select"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as SearchField)}
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <label className="sr-only" htmlFor={`${listId}-input`}>
              검색어
            </label>
            <input
              id={`${listId}-input`}
              type="search"
              className="esg-board__search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="esg-board__search-submit">
              <span className="esg-board__search-icon" aria-hidden="true">
                ⌕
              </span>
              검색
            </button>
          </form>
        </div>
        <div className="esg-board__list-panel">
          {filtered.length === 0 ? (
            <p className="esg-board__empty">검색 결과가 없습니다.</p>
          ) : (
            <ul className="esg-list" aria-label="ESG 경영 목록">
              {filtered.map((item) => (
                <EsgAccordionItem
                  key={item.id}
                  item={item}
                  expanded={expandedIds.has(item.id)}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
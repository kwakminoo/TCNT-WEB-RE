import { type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  type CareerJobItem,
  type CareerJobSearchField,
  careerJobItems,
  careerJobMatchesQuery,
  careerJobStatusLabel,
  formatCareerJobDeadline,
} from "../../content/career/careerJobs";
import { ContentSectionHead } from "./ContentSectionHead";

export function JobsLayout() {
  const [searchField, setSearchField] = useState<CareerJobSearchField>("title");
  const [searchInput, setSearchInput] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  const filtered = useMemo(
    () => careerJobItems.filter((item) => careerJobMatchesQuery(item, appliedQuery, searchField)),
    [appliedQuery, searchField],
  );

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAppliedQuery(searchInput);
  }

  return (
    <div className="career-jobs-page">
      <section className="career-jobs-board">
        <div className="container">
          <ContentSectionHead title="채용공고" />
          <div className="career-jobs-board__body">
            <p className="career-jobs__notice">
              입사지원서를 허위로 작성한 경우 입사가 취소됩니다.
            </p>

            <div className="career-jobs__toolbar">
              <p className="career-jobs__count" aria-live="polite">
                전체 {filtered.length}건
              </p>
              <form className="career-jobs__search" onSubmit={onSearchSubmit} role="search">
                <label className="sr-only" htmlFor="career-jobs-search-field">
                  검색 범위
                </label>
                <select
                  id="career-jobs-search-field"
                  className="career-jobs__search-select"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value as CareerJobSearchField)}
                  aria-label="검색 범위"
                >
                  <option value="title">제목</option>
                  <option value="content">내용</option>
                </select>
                <label className="sr-only" htmlFor="career-jobs-search-input">
                  검색어
                </label>
                <input
                  id="career-jobs-search-input"
                  type="search"
                  className="career-jobs__search-input"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="검색어를 입력하세요"
                />
                <button type="submit" className="career-jobs__search-submit">
                  <span className="career-jobs__search-icon" aria-hidden="true">
                    ⌕
                  </span>
                  검색
                </button>
              </form>
            </div>

            <div className="career-jobs__list-head" aria-hidden="true">
              <span className="career-jobs__col career-jobs__col--no">번호</span>
              <span className="career-jobs__col career-jobs__col--title">제목</span>
              <span className="career-jobs__col career-jobs__col--deadline">마감기한</span>
              <span className="career-jobs__col career-jobs__col--status">접수상태</span>
            </div>

            <div className="career-jobs__list-panel">
              {filtered.length === 0 ? (
                <p className="career-jobs__empty">등록된 채용공고가 없습니다.</p>
              ) : (
                <ul className="career-jobs__list" aria-label="채용공고 목록">
                  {filtered.map((item) => (
                    <li key={item.id}>
                      <CareerJobCard item={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CareerJobCard({ item }: { item: CareerJobItem }) {
  return (
    <article className="career-jobs-card">
      <Link to={item.link_url} className="career-jobs-card__link">
        <span className="career-jobs-card__no career-jobs__col career-jobs__col--no">
          {item.no}
        </span>
        <div className="career-jobs-card__title-wrap career-jobs__col career-jobs__col--title">
          <h2 className="career-jobs-card__title">{item.title}</h2>
          <p className="career-jobs-card__summary">{item.summary}</p>
        </div>
        <time
          className="career-jobs-card__deadline career-jobs__col career-jobs__col--deadline"
          dateTime={item.deadline}
        >
          {formatCareerJobDeadline(item.deadline)}
        </time>
        <span
          className={`career-jobs-card__status career-jobs__col career-jobs__col--status career-jobs-card__status--${item.status}`}
        >
          {careerJobStatusLabel(item.status)}
        </span>
      </Link>
    </article>
  );
}

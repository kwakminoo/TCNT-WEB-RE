import { useMemo } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { SubpageShell } from "../components/SubpageShell";
import { searchPages } from "../content/searchIndex";

export function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") ?? "";
  const results = useMemo(() => searchPages(q), [q]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next = String(fd.get("q") ?? "").trim();
    navigate(`/search?q=${encodeURIComponent(next)}`);
  }

  return (
    <SubpageShell
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">검색</h1>
          <p className="lead">메뉴 및 주요 문구에서 키워드를 찾습니다.</p>
          <form onSubmit={onSubmit} role="search" className="subpage-hero-search">
            <label htmlFor="search-page-q" className="sr-only">
              검색어
            </label>
            <input
              id="search-page-q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="예: 안전, 채용, ESG"
              className="subpage-hero-search__input"
            />
            <button type="submit" className="btn btn-primary subpage-hero-search__submit">
              검색하기
            </button>
          </form>
        </>
      }
    >
      <div className="container prose">
          {!q ? (
            <p>검색어를 입력해 주세요.</p>
          ) : results.length === 0 ? (
            <p>
              &quot;{q}&quot;에 대한 결과가 없습니다. 다른 키워드로 시도해
              보세요.
            </p>
          ) : (
            <ul className="search-results-list">
              {results.map((r) => (
                <li key={r.path}>
                  <Link to={r.path}>{r.title}</Link>
                  <div className="muted search-results-list__path">{r.path}</div>
                </li>
              ))}
            </ul>
          )}
      </div>
    </SubpageShell>
  );
}

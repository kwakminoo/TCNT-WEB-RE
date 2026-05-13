type Props = {
  page: number;
  pageCount: number;
  onPageChange: (next: number) => void;
  idBase: string;
};

export function Pagination({ page, pageCount, onPageChange, idBase }: Props) {
  if (pageCount <= 1) return null;
  const navId = `${idBase}-pagination`;

  return (
    <nav className="pagination" aria-label="페이지 이동" id={navId}>
      <button
        type="button"
        className="btn btn-ghost"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="이전 페이지"
      >
        이전
      </button>
      <span className="pagination__status" aria-live="polite">
        {page} / {pageCount}
      </span>
      <button
        type="button"
        className="btn btn-ghost"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="다음 페이지"
      >
        다음
      </button>
    </nav>
  );
}

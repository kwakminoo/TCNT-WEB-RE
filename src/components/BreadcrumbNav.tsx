import { Link, useLocation } from "react-router-dom";
import { pagesByPath } from "../content/pagesData";
import { findParentGroup } from "../content/navData";

export function BreadcrumbNav() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  if (pathname === "/search") {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <span aria-current="page">검색</span>
          </li>
        </ol>
      </nav>
    );
  }

  const page = pagesByPath[pathname];
  const group = findParentGroup(pathname);

  const items: { label: string; path?: string; current?: boolean }[] = [
    { label: "홈", path: "/" },
  ];

  if (group) {
    items.push({
      label: group.label,
      path: group.children[0]?.path,
    });
  }

  if (page) {
    items.push({ label: page.title, current: true });
  } else {
    items.push({ label: pathname, current: true });
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`}>
              {!isLast && c.path ? (
                <Link to={c.path}>{c.label}</Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

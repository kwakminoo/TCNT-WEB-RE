import { useEffect, useId, useState } from "react";
import type { FormEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { isNavGroup, navEntries } from "../content/navData";

const assetBase = import.meta.env.BASE_URL;

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [overlayActive, setOverlayActive] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const drawerTitleId = useId();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  useEffect(() => {
    if (!isHome) {
      setOverlayActive(false);
      return;
    }

    const updateOverlayState = () => {
      const banner = document.querySelector<HTMLElement>(".main-banner");
      if (!banner) {
        setOverlayActive(false);
        return;
      }

      const headerHeight =
        document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      const triggerY = Math.max(0, banner.offsetHeight - headerHeight);
      setOverlayActive(window.scrollY < triggerY);
    };

    updateOverlayState();
    window.addEventListener("scroll", updateOverlayState, { passive: true });
    window.addEventListener("resize", updateOverlayState);

    return () => {
      window.removeEventListener("scroll", updateOverlayState);
      window.removeEventListener("resize", updateOverlayState);
    };
  }, [isHome]);

  function goSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") ?? "").trim();
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setDrawerOpen(false);
  }

  return (
    <header
      className={`site-header${isHome && overlayActive ? " site-header--overlay" : ""}`}
    >
      <div className="header-inner header-inner--full">
        <Link className="brand" to="/">
          <img
            className="brand-logo"
            src={`${assetBase}brand/logo-mark-removebg.png`}
            width={110}
            height={83}
            alt="(주)태일씨앤티 TAEIL CONSTRUCTION AND TECHNICAL"
          />
        </Link>

        <nav className="desktop-nav" aria-label="주 메뉴">
          {navEntries.map((entry) =>
            isNavGroup(entry) ? (
              <div key={entry.label} className="nav-item-wrap">
                <button type="button" className="nav-top-link" aria-expanded="false">
                  {entry.label}
                  <span aria-hidden="true">▾</span>
                </button>
                <ul className="nav-dropdown">
                  {entry.children.map((c) => (
                    <li key={c.path}>
                      <NavLink
                        to={c.path}
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                      >
                        {c.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink
                key={entry.path}
                className={({ isActive }) =>
                  `nav-top-link${isActive ? " is-active" : ""}`
                }
                style={{ textDecoration: "none" }}
                to={entry.path}
              >
                {entry.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen(true)}
          >
            <span />
            <span className="sr-only">메뉴 열기</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-drawer"
        className={`mobile-drawer${drawerOpen ? " is-open" : ""}`}
        aria-hidden={!drawerOpen}
      >
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
        <div
          className="mobile-drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={drawerTitleId}
        >
          <div className="drawer-head">
            <strong id={drawerTitleId}>전체 메뉴</strong>
            <button
              type="button"
              className="drawer-close"
              onClick={() => setDrawerOpen(false)}
              aria-label="메뉴 닫기"
            >
              ×
            </button>
          </div>
          <div className="drawer-body">
            <form role="search" onSubmit={goSearch} style={{ marginBottom: "1rem" }}>
              <label htmlFor="drawer-search-q" className="sr-only">
                검색
              </label>
              <input
                id="drawer-search-q"
                name="q"
                type="search"
                placeholder="검색어"
                style={{ width: "100%", minHeight: 48, padding: "0.5rem 0.65rem" }}
              />
              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                검색하기
              </button>
            </form>

            {navEntries.map((entry) =>
              isNavGroup(entry) ? (
                <div key={entry.label} className="drawer-section">
                  <h3>{entry.label}</h3>
                  <ul className="drawer-links">
                    {entry.children.map((c) => (
                      <li key={c.path}>
                        <Link to={c.path} onClick={() => setDrawerOpen(false)}>
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key={entry.path} className="drawer-section">
                  <ul className="drawer-links">
                    <li>
                      <Link to={entry.path} onClick={() => setDrawerOpen(false)}>
                        {entry.label}
                      </Link>
                    </li>
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

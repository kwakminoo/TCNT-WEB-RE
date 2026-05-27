import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { isNavGroup, navEntries } from "../content/navData";

const assetBase = import.meta.env.BASE_URL;
const mobileQuickActions = [
  { label: "프로젝트 보기", to: "/business/architecture" },
  { label: "고객문의", to: "/contact/inquiry" },
  { label: "채용정보", to: "/recruit" },
] as const;

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [overlayActive, setOverlayActive] = useState(true);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [openDesktopGroup, setOpenDesktopGroup] = useState<string | null>(null);
  const [desktopNavActive, setDesktopNavActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const drawerTitleId = useId();
  const isHome = location.pathname === "/";
  const prevScrollYRef = useRef(0);
  const userScrollIntentRef = useRef(false);
  const userScrollDirectionRef = useRef<"up" | "down" | null>(null);
  const userScrollIntentTimerRef = useRef<number | null>(null);
  const desktopNavCloseTimerRef = useRef<number | null>(null);

  const clearDesktopNavCloseTimer = () => {
    if (desktopNavCloseTimerRef.current !== null) {
      window.clearTimeout(desktopNavCloseTimerRef.current);
      desktopNavCloseTimerRef.current = null;
    }
  };

  const scheduleCloseDesktopNav = () => {
    clearDesktopNavCloseTimer();
    desktopNavCloseTimerRef.current = window.setTimeout(() => {
      desktopNavCloseTimerRef.current = null;
      setOpenDesktopGroup(null);
      setDesktopNavActive(false);
    }, 160);
  };

  const markUserScrollIntent = (dir?: "up" | "down") => {
    userScrollIntentRef.current = true;
    if (userScrollIntentTimerRef.current !== null) {
      window.clearTimeout(userScrollIntentTimerRef.current);
    }
    if (dir) userScrollDirectionRef.current = dir;
    userScrollIntentTimerRef.current = window.setTimeout(() => {
      userScrollIntentRef.current = false;
      userScrollDirectionRef.current = null;
    }, 900);
  };

  useEffect(() => {
    setDrawerOpen(false);
    clearDesktopNavCloseTimer();
    setOpenDesktopGroup(null);
    setDesktopNavActive(false);
    setHeaderHidden(false);
    prevScrollYRef.current = 0;
    userScrollIntentRef.current = false;
    userScrollDirectionRef.current = null;
    if (userScrollIntentTimerRef.current !== null) {
      window.clearTimeout(userScrollIntentTimerRef.current);
      userScrollIntentTimerRef.current = null;
    }
  }, [location.pathname]);

  useEffect(() => () => clearDesktopNavCloseTimer(), []);

  const openDesktopGroupMenu = (label: string) => {
    setOpenDesktopGroup(label);
    setDesktopNavActive(true);
  };

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

    const updateOverlayState = (force = false) => {
      if (!force && !userScrollIntentRef.current) return;
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

    const onScroll = () => updateOverlayState(false);
    updateOverlayState(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateOverlayState(true);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isHome]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => markUserScrollIntent(e.deltaY >= 0 ? "down" : "up");
    const onTouchStart = () => {
      // 터치 시작 시점에는 스크롤 상/하 방향을 바로 알기 어렵습니다.
      userScrollDirectionRef.current = null;
      markUserScrollIntent();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName;
        const isEditable = (target as unknown as { isContentEditable?: boolean }).isContentEditable;
        if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || isEditable) return;
      }

      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "PageDown" ||
        e.key === "PageUp" ||
        e.key === "Home" ||
        e.key === "End" ||
        e.key === " " ||
        e.key === "Spacebar"
      ) {
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "End" || e.key === " ") markUserScrollIntent("down");
        else markUserScrollIntent("up");
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("keydown", onKeyDown);
      if (userScrollIntentTimerRef.current !== null) {
        window.clearTimeout(userScrollIntentTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (desktopNavActive) {
        setHeaderHidden(false);
        prevScrollYRef.current = window.scrollY;
        return;
      }
      // 하이라이트 슬라이드 전환 같은 “비사용자” 레이아웃 변화로 발생한 scroll 이벤트는
      // 헤더 숨김 상태를 건드리지 않도록 무시합니다.
      if (!userScrollIntentRef.current) {
        prevScrollYRef.current = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const prevY = prevScrollYRef.current;
      const delta = currentY - prevY;
      if (Math.abs(delta) < 8) return;

      if (currentY <= 32) {
        setHeaderHidden(false);
      } else if (delta < 0) {
        setHeaderHidden(false);
      } else if (delta > 0 && userScrollDirectionRef.current !== "up") {
        setHeaderHidden(true);
      }
      prevScrollYRef.current = currentY;
    };

    prevScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [desktopNavActive]);

  function goSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") ?? "").trim();
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setDrawerOpen(false);
  }

  return (
    <header
      className={`site-header${isHome && overlayActive ? " site-header--overlay" : ""}${headerHidden ? " site-header--hidden" : ""}${isHome && overlayActive && desktopNavActive ? " site-header--menu-active" : ""}`}
    >
      <div className="header-inner header-inner--full">
        <Link
          className="brand"
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }}
        >
          <img
            className="brand-logo"
            src={`${assetBase}brand/logo-mark-removebg.png`}
            width={110}
            height={83}
            alt="(주)태일씨앤티 TAEIL CONSTRUCTION AND TECHNICAL"
          />
        </Link>

        <nav
          className="desktop-nav"
          aria-label="주 메뉴"
          onMouseEnter={() => {
            clearDesktopNavCloseTimer();
            setDesktopNavActive(true);
          }}
          onMouseLeave={() => {
            scheduleCloseDesktopNav();
          }}
          onBlur={(e) => {
            const next = e.relatedTarget as Node | null;
            if (!e.currentTarget.contains(next)) {
              clearDesktopNavCloseTimer();
              setOpenDesktopGroup(null);
              setDesktopNavActive(false);
            }
          }}
        >
          {navEntries.map((entry) =>
            isNavGroup(entry) ? (
              <div
                key={entry.label}
                className="nav-item-wrap"
                onMouseEnter={() => openDesktopGroupMenu(entry.label)}
              >
                <button
                  type="button"
                  className="nav-top-link"
                  onFocus={() => openDesktopGroupMenu(entry.label)}
                  aria-expanded={openDesktopGroup === entry.label}
                  aria-controls="desktop-nav-submenu-panel"
                >
                  {entry.label}
                </button>
              </div>
            ) : (
              <div key={entry.path} className="nav-item-wrap nav-item-wrap--single">
                <NavLink
                  className={({ isActive }) =>
                    `nav-top-link${isActive ? " is-active" : ""}`
                  }
                  style={{ textDecoration: "none" }}
                  to={entry.path}
                >
                  {entry.label}
                </NavLink>
              </div>
            ),
          )}

          <div
            id="desktop-nav-submenu-panel"
            className={`desktop-nav-submenu-panel${desktopNavActive ? " is-open" : ""}`}
            aria-hidden={!desktopNavActive}
          >
            {desktopNavActive ? (
              <div className="desktop-nav-submenu-panel__inner">
                <div className="desktop-nav-submenu-grid">
                  {navEntries.map((entry, entryIndex) =>
                    isNavGroup(entry) ? (
                      <section
                        key={entry.label}
                        id={`desktop-nav-submenu-panel-${entryIndex}`}
                        className={`desktop-nav-submenu-group${openDesktopGroup === entry.label ? " is-active" : ""}`}
                      >
                        <ul className="desktop-nav-submenu-links">
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
                      </section>
                    ) : (
                      <section
                        key={entry.path}
                        className="desktop-nav-submenu-group desktop-nav-submenu-group--empty"
                        aria-hidden="true"
                      />
                    ),
                  )}
                </div>
              </div>
            ) : null}
          </div>
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
            <div className="drawer-quick-actions" aria-label="빠른 메뉴">
              {mobileQuickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="drawer-quick-actions__link"
                  onClick={() => setDrawerOpen(false)}
                >
                  {action.label}
                </Link>
              ))}
            </div>
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

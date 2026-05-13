import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { coverSrcForMapItemId } from "../content/projects/portfolioData";
import {
  assetKindLabel,
  type MapRegionId,
  projectMapClusters,
  projectMapItems,
  projectMapItemsForRegion,
  type ProjectMapItem,
} from "../content/taeilProjectMapData";
import { ProjectMapModelIcon } from "./ProjectMapModelIcons";
import {
  findMunicipalityPathGraphics,
  layoutMarkersInAdministrativeArea,
  positionMarkerInAdministrativeAreaByOffset,
} from "../lib/projectMapMarkerLayout";
import seoulAdminSvgRaw from "../assets/seoul-admin.svg?raw";
import gyeonggiAdminSvgRaw from "../assets/gyeonggi-admin.svg?raw";
import chungnamAdminSvgRaw from "../assets/chungnam-admin.svg?raw";
import gyeongnamAdminSvgRaw from "../assets/gyeongnam-admin.svg?raw";
import gangwonAdminSvgRaw from "../assets/gangwon-admin.svg?raw";
import koreaAdminSvgRaw from "../assets/korea-admin.svg?raw";

const assetBase = import.meta.env.BASE_URL;

function mediaSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

type ViewPreset = "metro" | "nationwide";
type MapViewKey = "__overview__" | MapRegionId;

/** 권역 `<select>`에서 전국 보기를 나타내는 값 */
const SELECT_OVERVIEW = "__overview__";
const MAP_VIEW_ORDER: readonly MapViewKey[] = [
  SELECT_OVERVIEW,
  "seoul",
  "gyeonggi",
  "chungnam",
  "gyeongnam",
  "gangwon",
] as const;

const REGION_SVG_RAW: Record<MapRegionId, string> = {
  seoul: seoulAdminSvgRaw,
  gyeonggi: gyeonggiAdminSvgRaw,
  chungnam: chungnamAdminSvgRaw,
  gyeongnam: gyeongnamAdminSvgRaw,
  gangwon: gangwonAdminSvgRaw,
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 6.2;
const ZOOM_STEP = 0.12;

/**
 * 마커 화면 크기 기준값.
 * 지도 `.project-map__stage`에 `scale(zoom)`이 적용되므로,
 * markerScale을 `base / zoom`으로 보정해 확대/축소해도 화면상 크기를 거의 고정한다.
 */
const MARKER_SCREEN_SIZE_BASE = 0.25;

const VIEW_PRESETS: Record<ViewPreset, { zoom: number; panX: number; panY: number }> = {
  metro: { zoom: 1.12, panX: 0, panY: 0 },
  nationwide: { zoom: 1, panX: 0, panY: 0 },
};

function markerScaleForZoom(zoom: number): number {
  const safeZoom = Math.max(zoom, 0.001);
  return MARKER_SCREEN_SIZE_BASE / safeZoom;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function buildInlineAdminSvgHtml(svgRaw: string, glowFilterId: string): string {
  const defs = `<defs><filter id="${glowFilterId}" x="-40%" y="-40%" width="180%" height="180%">
<feGaussianBlur stdDeviation="3.5" result="b"/>
<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter></defs>`;
  return svgRaw
    .trim()
    .replace(/<svg([\s\S]*?)>/, (_, attrs) => {
      const cleaned = attrs.replace(/\s*aria-label="[^"]*"\s*/g, " ");
      return `<svg${cleaned} class="project-map__admin-root" preserveAspectRatio="xMidYMid meet" role="presentation" aria-hidden="true">${defs}>`;
    })
    .replace(/<path/g, `<path class="project-map__land" filter="url(#${glowFilterId})"`);
}

type Props = {
  /** 홈 섹션용 헤더 표시 */
  showSectionHeader?: boolean;
};

export function ProjectMapSection({ showSectionHeader = true }: Props) {
  const glowFilterId = useId().replace(/:/g, "");
  const regionSelectId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ dragging: boolean; x: number; y: number }>({
    dragging: false,
    x: 0,
    y: 0,
  });
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(VIEW_PRESETS.nationwide.zoom);
  const [panX, setPanX] = useState(VIEW_PRESETS.nationwide.panX);
  const [panY, setPanY] = useState(VIEW_PRESETS.nationwide.panY);
  const [isDragging, setIsDragging] = useState(false);
  const [mapRegionId, setMapRegionId] = useState<MapRegionId>("seoul");
  /** true: 전국 시·군·구 한 장 + 전체 프로젝트 마커 */
  const [overviewMap, setOverviewMap] = useState(false);
  const [mapSlideDir, setMapSlideDir] = useState<"left" | "right">("left");

  const currentMapViewKey: MapViewKey = overviewMap ? SELECT_OVERVIEW : mapRegionId;
  const prevMapViewKeyRef = useRef<MapViewKey>(currentMapViewKey);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as Node | null;
      if (next && el.contains(next)) return;
      setFocusId(null);
    };
    el.addEventListener("focusout", onFocusOut);
    return () => el.removeEventListener("focusout", onFocusOut);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const delta = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setZoom((prev) => clamp(prev + delta, MIN_ZOOM, MAX_ZOOM));
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, []);

  const activeId = focusId ?? hoverId ?? selectedId;
  const activeItem = useMemo(
    () => projectMapItems.find((p) => p.id === activeId) ?? null,
    [activeId],
  );

  /** 선택 후에는 패널·같은지역 목록을 선택 항목에 고정(이미지는 클릭 선택 시에만 표시) */
  const panelItem = useMemo(() => {
    if (selectedId) return projectMapItems.find((p) => p.id === selectedId) ?? null;
    return activeItem;
  }, [selectedId, activeItem]);

  const panelCoverSrc = selectedId ? coverSrcForMapItemId(selectedId) : undefined;

  const adminMapHtml = useMemo(() => {
    const raw = overviewMap ? koreaAdminSvgRaw : REGION_SVG_RAW[mapRegionId];
    return buildInlineAdminSvgHtml(raw, glowFilterId);
  }, [glowFilterId, mapRegionId, overviewMap]);

  const visibleProjectItems = useMemo(
    () => (overviewMap ? projectMapItems : projectMapItemsForRegion(mapRegionId)),
    [mapRegionId, overviewMap],
  );

  /** 행정 path getBBox 기준 보정 좌표(0~1000). 없으면 데이터 원본 x/y·nationalX/Y 사용 */
  const [adminAdjustedNorm, setAdminAdjustedNorm] = useState<Record<string, { nx: number; ny: number }>>({});

  useLayoutEffect(() => {
    const host = silhouetteRef.current;
    if (!host) return;
    const svg = host.querySelector("svg");
    if (!(svg instanceof SVGSVGElement)) {
      setAdminAdjustedNorm({});
      return;
    }

    const byCode = new Map<string, ProjectMapItem[]>();
    for (const it of visibleProjectItems) {
      if (it.mapPlacement.kind === "inPath") continue;
      const code = it.municipalityCode;
      const list = byCode.get(code);
      if (list) list.push(it);
      else byCode.set(code, [it]);
    }

    const next: Record<string, { nx: number; ny: number }> = {};

    for (const it of visibleProjectItems) {
      if (it.mapPlacement.kind !== "inPath") continue;
      const pathCode = it.mapPlacement.pathCode ?? it.municipalityCode;
      const pathEl = findMunicipalityPathGraphics(svg, overviewMap, mapRegionId, pathCode);
      if (!pathEl) continue;
      const pt = positionMarkerInAdministrativeAreaByOffset(
        pathEl,
        pathCode,
        overviewMap ? (it.mapPlacement.nationalX ?? it.nationalX) : it.mapPlacement.offsetX,
        overviewMap ? (it.mapPlacement.nationalY ?? it.nationalY) : it.mapPlacement.offsetY,
      );
      next[it.id] = { nx: pt.x, ny: pt.y };
    }

    for (const [code, group] of byCode) {
      const pathEl = findMunicipalityPathGraphics(svg, overviewMap, mapRegionId, code);
      if (!pathEl) continue;
      const sorted = [...group].sort((a, b) => a.id.localeCompare(b.id));
      const pts = layoutMarkersInAdministrativeArea(pathEl, sorted.length, code);
      sorted.forEach((it, i) => {
        const p = pts[i];
        if (p) next[it.id] = { nx: p.x, ny: p.y };
      });
    }

    setAdminAdjustedNorm(next);
  }, [visibleProjectItems, overviewMap, mapRegionId, adminMapHtml]);

  const clusterLabel = useMemo(() => {
    if (!panelItem) return null;
    return projectMapClusters.find((c) => c.key === panelItem.clusterKey)?.label ?? panelItem.cityOrProvince;
  }, [panelItem]);

  const sameCluster = useMemo(() => {
    if (!panelItem) return [];
    const pool = overviewMap ? projectMapItems : projectMapItemsForRegion(panelItem.regionId);
    return pool.filter((p) => p.clusterKey === panelItem.clusterKey);
  }, [panelItem, overviewMap]);

  useEffect(() => {
    const prevKey = prevMapViewKeyRef.current;
    if (prevKey === currentMapViewKey) return;
    const prevIdx = MAP_VIEW_ORDER.indexOf(prevKey);
    const nextIdx = MAP_VIEW_ORDER.indexOf(currentMapViewKey);
    setMapSlideDir(nextIdx >= prevIdx ? "left" : "right");
    prevMapViewKeyRef.current = currentMapViewKey;
  }, [currentMapViewKey]);

  const clearHover = useCallback(() => setHoverId(null), []);

  const applyPreset = useCallback((preset: ViewPreset) => {
    const next = VIEW_PRESETS[preset];
    setZoom(next.zoom);
    setPanX(next.panX);
    setPanY(next.panY);
  }, []);

  const handleZoomBy = useCallback((delta: number) => {
    setZoom((prev) => clamp(prev + delta, MIN_ZOOM, MAX_ZOOM));
  }, []);

  const panLimitX = useMemo(() => {
    return 220 + (zoom - 1) * 260;
  }, [zoom]);

  const panLimitY = useMemo(() => {
    return 200 + (zoom - 1) * 240;
  }, [zoom]);

  const handleDragStart = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if (event.pointerType !== "mouse") return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("button, a, select, input, textarea")) return;
    dragRef.current = { dragging: true, x: event.clientX, y: event.clientY };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handleDragMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;
    setPanX((prev) => clamp(prev + dx, -panLimitX, panLimitX));
    setPanY((prev) => clamp(prev + dy, -panLimitY, panLimitY));
  }, [panLimitX, panLimitY]);

  const handleDragEnd = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const stageTransform = useMemo(() => {
    return `translate(${panX}px, ${panY}px) scale(${zoom})`;
  }, [panX, panY, zoom]);

  /** `--marker-scale`: stage zoom(확대/축소) 역보정으로 화면상 마커 크기 고정 */
  const markerScale = useMemo(() => markerScaleForZoom(zoom), [zoom]);

  const stageTransformOrigin = useMemo(() => {
    return "50% 50%";
  }, []);

  useEffect(() => {
    setPanX((prev) => clamp(prev, -panLimitX, panLimitX));
    setPanY((prev) => clamp(prev, -panLimitY, panLimitY));
  }, [panLimitX, panLimitY]);

  return (
    <section
      ref={sectionRef}
      className={`project-map${showSectionHeader ? " project-map--home" : " project-map--page"}`}
      aria-labelledby={showSectionHeader ? "project-map-title" : undefined}
    >
      {showSectionHeader ? (
        <header className="project-map__head">
          <p className="project-map__eyebrow">TAEIL C&amp;T</p>
          <h2 id="project-map-title" className="project-map__title">
            PROJECT MAP
          </h2>
        </header>
      ) : null}

      <div className="project-map__layout">
        <div
          ref={viewportRef}
          className="project-map__viewport"
          onMouseLeave={clearHover}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
          data-dragging={isDragging ? "true" : "false"}
          role="presentation"
        >
          <div className="project-map__noise" aria-hidden="true" />
          <div className="project-map__scanline" aria-hidden="true" />
          <div className="project-map__controls" role="group" aria-label="지도 제어">
            <button
              type="button"
              className="project-map__ctrl-btn"
              aria-label="지도 확대"
              onClick={() => handleZoomBy(ZOOM_STEP)}
            >
              +
            </button>
            <button
              type="button"
              className="project-map__ctrl-btn"
              aria-label="지도 축소"
              onClick={() => handleZoomBy(-ZOOM_STEP)}
            >
              -
            </button>
            <button
              type="button"
              className="project-map__ctrl-btn project-map__ctrl-btn--icon"
              aria-label="전국 통합 지도 보기 및 확대·이동 초기화"
              title="전국 지도(모든 권역 프로젝트)로 전환 · 위치·확대 초기화"
              onClick={() => {
                setOverviewMap(true);
                setSelectedId(null);
                setFocusId(null);
                setHoverId(null);
                applyPreset("nationwide");
              }}
            >
              ⌂
            </button>
            <div className="project-map__region-field">
              <label htmlFor={regionSelectId} className="sr-only">
                지역 맵 선택
              </label>
              <select
                id={regionSelectId}
                className="project-map__ctrl-select"
                value={overviewMap ? SELECT_OVERVIEW : mapRegionId}
                aria-label="지역 맵 선택"
                onChange={(e) => {
                  const v = e.target.value;
                  setSelectedId(null);
                  setFocusId(null);
                  setHoverId(null);
                  applyPreset("nationwide");
                  if (v === SELECT_OVERVIEW) {
                    setOverviewMap(true);
                    return;
                  }
                  setOverviewMap(false);
                  setMapRegionId(v as MapRegionId);
                }}
              >
                <option value={SELECT_OVERVIEW}>전국 통합 지도</option>
                <option value="seoul">서울</option>
                <option value="gyeonggi">경기</option>
                <option value="chungnam">충남·세종</option>
                <option value="gyeongnam">경남</option>
                <option value="gangwon">강원</option>
              </select>
            </div>
          </div>

          <div
            className="project-map__stage"
            style={{
              transform: stageTransform,
              transformOrigin: stageTransformOrigin,
            }}
          >
            <div key={currentMapViewKey} className={`project-map__map-layer project-map__map-layer--slide-in-${mapSlideDir}`}>
              <div
                ref={silhouetteRef}
                className={`project-map__silhouette project-map__silhouette--region project-map__silhouette--${
                  overviewMap ? "korea-overview" : mapRegionId
                }`}
                dangerouslySetInnerHTML={{ __html: adminMapHtml }}
              />

              <ul className="project-map__markers" role="list">
                {visibleProjectItems.length === 0 ? (
                  <li className="project-map__markers-empty-li" aria-live="polite">
                    <p className="project-map__markers-empty">이 권역에 표시된 프로젝트가 없습니다.</p>
                  </li>
                ) : null}
                {visibleProjectItems.map((item) => {
                  const adj = adminAdjustedNorm[item.id];
                  const markerPx = adj ? adj.nx : overviewMap ? item.nationalX : item.x;
                  const markerPy = adj ? adj.ny : overviewMap ? item.nationalY : item.y;
                  return (
                    <MarkerButton
                      key={item.id}
                      item={item}
                      markerPx={markerPx}
                      markerPy={markerPy}
                      active={item.id === activeId}
                      markerScale={markerScale}
                      onHover={(id) => setHoverId(id)}
                      onLeave={() => setHoverId(null)}
                      onFocus={(id) => setFocusId(id)}
                      onSelect={(id) => setSelectedId(id)}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <aside className="project-map__panel" aria-live="polite">
          {panelItem ? (
            <>
              <p className="project-map__panel-region">{clusterLabel}</p>
              <h3 className="project-map__panel-title">{panelItem.title}</h3>
              <p className="project-map__panel-meta">
                <span className="project-map__badge">{assetKindLabel(panelItem.assetKind)}</span>
                <span>{panelItem.cityOrProvince}</span>
              </p>
              {panelCoverSrc ? (
                <figure className="project-map__panel-cover">
                  <img
                    src={mediaSrc(panelCoverSrc)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ) : null}
              <hr className="project-map__panel-rule" />
              {sameCluster.length > 0 ? (
                <div className="project-map__cluster-list project-map__cluster-scroll">
                  <p className="project-map__cluster-list-title">같은 지역 프로젝트</p>
                  <ul className="project-map__cluster-rows">
                    {sameCluster.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          className={`project-map__cluster-link${p.id === selectedId ? " is-active" : ""}${!selectedId && p.id === activeId ? " is-preview" : ""}`}
                          onMouseEnter={() => setHoverId(p.id)}
                          onFocus={() => setFocusId(p.id)}
                          onClick={() => {
                            setSelectedId(p.id);
                            setFocusId(p.id);
                          }}
                        >
                          {p.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          ) : (
            <p className="project-map__panel-placeholder">
              지도 위 모형에 마우스를 올리거나 <kbd>Tab</kbd>으로 포커스하면 요약이 표시됩니다. 마커를 클릭하면 해당 공사
              대표 이미지가 표시됩니다.
            </p>
          )}
          <div className="project-map__panel-actions">
            <Link className="btn btn-outline project-map__link-orders" to="/business/orders">
              공사수주 현황
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

function MarkerButton({
  item,
  markerPx,
  markerPy,
  active,
  markerScale,
  onHover,
  onLeave,
  onFocus,
  onSelect,
}: {
  item: ProjectMapItem;
  /** 0~1000 정규 좌표(권역 또는 전국) */
  markerPx: number;
  markerPy: number;
  active: boolean;
  markerScale: number;
  onHover: (id: string) => void;
  onLeave: () => void;
  onFocus: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const label = `${item.cityOrProvince}, ${assetKindLabel(item.assetKind)} — ${item.title}`;
  return (
    <li className="project-map__marker-li">
      <button
        type="button"
        className={`project-map__marker${active ? " is-active" : ""}`}
        style={
          {
            left: `${markerPx / 10}%`,
            top: `${markerPy / 10}%`,
            "--marker-scale": markerScale.toFixed(3),
          } as CSSProperties
        }
        aria-label={label}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={onLeave}
        onFocus={() => onFocus(item.id)}
        onClick={() => onSelect(item.id)}
      >
        <ProjectMapModelIcon kind={item.assetKind} className="project-map__marker-icon" />
      </button>
    </li>
  );
}

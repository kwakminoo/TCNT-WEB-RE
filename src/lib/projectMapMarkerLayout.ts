/**
 * 행정 path 내부에서 마커를 배치.
 * 목표: (1) 항상 구역 안 (2) 중앙권 우선 (3) 다건은 불규칙·균등 분포.
 */

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function isPointInside(path: SVGGeometryElement, x: number, y: number): boolean {
  try {
    return path.isPointInFill(new DOMPoint(x, y));
  } catch {
    return false;
  }
}

function bboxCenter(path: SVGGraphicsElement): { x: number; y: number; w: number; h: number } {
  const b = path.getBBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2, w: b.width, h: b.height };
}

function findInsideCenter(path: SVGGeometryElement, cx: number, cy: number, radius: number): { x: number; y: number } {
  if (isPointInside(path, cx, cy)) return { x: cx, y: cy };
  const step = 16;
  for (let r = step; r <= radius; r += step) {
    const n = Math.max(8, Math.floor((2 * Math.PI * r) / step));
    for (let i = 0; i < n; i += 1) {
      const a = (i / n) * Math.PI * 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (isPointInside(path, x, y)) return { x, y };
    }
  }
  return { x: cx, y: cy };
}

type LayoutTuning = {
  /** viewBox 픽셀: bbox 중심 가상 이동(맵 삐뚤·아이콘 밖 치우침 보정). +x 오른쪽 */
  readonly centerShiftX?: number;
  readonly centerShiftY?: number;
  readonly spreadMul?: number;
  readonly baseRMul?: number;
  readonly maxSearchRMul?: number;
  readonly minDistMul?: number;
  readonly candidateTriesMul?: number;
};

/**
 * 현장 피드백 기반 행정코드별 미세 튜닝 — SVG path 무게중심과 화면상 ‘구 중앙’이 안 맞는 경우.
 */
const MARKER_LAYOUT_BY_MUNICIPALITY: Readonly<Record<string, LayoutTuning>> = {
  "31050": { centerShiftX: 54, centerShiftY: 6 }, // 부천 → 추가 우측
  "31150": { centerShiftX: 58, centerShiftY: -4 }, // 시흥 → 추가 우측
  "29010": { centerShiftX: -68, centerShiftY: 4 }, // 세종 다이소 → 추가 좌측
  "32030": { centerShiftX: -48, centerShiftY: -6 }, // 강릉: 시각 중앙보다 우측 치우침 완화
  "31070": {
    centerShiftX: -40,
    centerShiftY: 10,
    spreadMul: 2.05,
    baseRMul: 1.38,
    maxSearchRMul: 1.75,
    minDistMul: 1.06,
    candidateTriesMul: 1.92,
  }, // 평택: path 내부에서 분산 반경·최소 간격을 키워 더 골고루 배치
};

function tuningFor(code: string): LayoutTuning {
  return MARKER_LAYOUT_BY_MUNICIPALITY[code.trim()] ?? {};
}

/** bbox·행정별 튜닝을 반영한 path 내부 기준점(자동 분산·수동 오프셋 공통). */
export function getAnchoredLayoutCenter(
  pathEl: SVGGraphicsElement,
  municipalityCode: string,
): { x: number; y: number } {
  const tun = tuningFor(municipalityCode);
  if (!(pathEl instanceof SVGGeometryElement)) {
    const c = bboxCenter(pathEl);
    return { x: c.x + (tun.centerShiftX ?? 0), y: c.y + (tun.centerShiftY ?? 0) };
  }

  const path = pathEl as SVGGeometryElement;
  const c = bboxCenter(pathEl);
  const shortest = Math.max(24, Math.min(c.w, c.h));
  const maxSearchR = Math.max(shortest * 0.45, 40) * (tun.maxSearchRMul ?? 1);
  const cx = c.x + (tun.centerShiftX ?? 0);
  const cy = c.y + (tun.centerShiftY ?? 0);
  return findInsideCenter(path, cx, cy, maxSearchR);
}

/** 선호점이 밖일 때 anchor→선호 방향으로 이진 탐색해 경계 안의 가장 바깥 점. */
export function clampPointTowardInsidePath(
  path: SVGGeometryElement,
  anchor: { x: number; y: number },
  preferred: { x: number; y: number },
): { x: number; y: number } {
  if (isPointInside(path, preferred.x, preferred.y)) return preferred;
  if (!isPointInside(path, anchor.x, anchor.y)) return anchor;

  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i += 1) {
    const t = (lo + hi) / 2;
    const x = anchor.x + (preferred.x - anchor.x) * t;
    const y = anchor.y + (preferred.y - anchor.y) * t;
    if (isPointInside(path, x, y)) lo = t;
    else hi = t;
  }
  const t = lo;
  return {
    x: anchor.x + (preferred.x - anchor.x) * t,
    y: anchor.y + (preferred.y - anchor.y) * t,
  };
}

/**
 * 단일 마커: 목표 좌표(offsetX/offsetY)를 path 안으로 제한.
 * 목표점이 path 밖이면 anchor(행정 튜닝 중심) 방향으로 클램프.
 * `tuningMunicipalityCode`는 MARKER_LAYOUT_BY_MUNICIPALITY 조회용(보통 path와 동일 코드).
 */
export function positionMarkerInAdministrativeAreaByOffset(
  pathEl: SVGGraphicsElement,
  tuningMunicipalityCode: string,
  offsetX: number,
  offsetY: number,
): { x: number; y: number } {
  const anchor = getAnchoredLayoutCenter(pathEl, tuningMunicipalityCode);
  const preferred = { x: offsetX, y: offsetY };
  if (!(pathEl instanceof SVGGeometryElement)) {
    return preferred;
  }
  const path = pathEl as SVGGeometryElement;
  return clampPointTowardInsidePath(path, anchor, preferred);
}

/**
 * 다건일 때 중심권에서 불규칙하게 퍼뜨림(결정론적).
 * @param municipalityCode KOSTAT 시군구 코드 — 튜닝 테이블용
 */
export function layoutMarkersInAdministrativeArea(
  pathEl: SVGGraphicsElement,
  count: number,
  municipalityCode: string,
): ReadonlyArray<{ x: number; y: number }> {
  if (count <= 0) return [];
  const tun = tuningFor(municipalityCode);

  if (!(pathEl instanceof SVGGeometryElement)) {
    const c = bboxCenter(pathEl);
    const x = c.x + (tun.centerShiftX ?? 0);
    const y = c.y + (tun.centerShiftY ?? 0);
    return Array.from({ length: count }, () => ({ x, y }));
  }

  const path = pathEl as SVGGeometryElement;
  const c = bboxCenter(pathEl);
  const shortest = Math.max(24, Math.min(c.w, c.h));
  const maxSearchR = Math.max(shortest * 0.45, 40) * (tun.maxSearchRMul ?? 1);
  const center = getAnchoredLayoutCenter(pathEl, municipalityCode);
  if (count === 1) return [center];

  const points: Array<{ x: number; y: number }> = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const baseR = clamp(shortest * 0.18 * (tun.baseRMul ?? 1), 16, 80);
  const spreadR = clamp(shortest * 0.34 * (tun.spreadMul ?? 1), 24, 150);
  const minDist = clamp(shortest * 0.08 * (tun.minDistMul ?? 1), 10, 40);
  const maxTries = Math.round(220 * (tun.candidateTriesMul ?? 1));

  for (let i = 0; i < count; i += 1) {
    let best: { x: number; y: number } | null = null;
    for (let t = 0; t < maxTries; t += 1) {
      const k = i * 220 + t + 1;
      const u = (Math.sin(k * 12.9898) * 43758.5453) % 1;
      const rand = u - Math.floor(u);
      const angle = i * golden + t * 0.43 + rand * Math.PI * 2;
      const radial = Math.sqrt((i + 1) / (count + 1));
      const jitter = (rand - 0.5) * spreadR * 0.28;
      const r = clamp(baseR + spreadR * radial + jitter, 8, maxSearchR);
      const x = center.x + Math.cos(angle) * r;
      const y = center.y + Math.sin(angle) * r;
      if (!isPointInside(path, x, y)) continue;
      const farEnough = points.every((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.hypot(dx, dy) >= minDist;
      });
      if (farEnough) {
        best = { x, y };
        break;
      }
      if (!best) best = { x, y };
    }

    if (!best) {
      const fallbackA = i * golden;
      best = { x: center.x + Math.cos(fallbackA) * 10, y: center.y + Math.sin(fallbackA) * 10 };
      if (!isPointInside(path, best.x, best.y)) best = center;
    }
    points.push(best);
  }

  return points;
}

/**
 * 행정구 path 조회. `#11230`처럼 숫자로 시작하는 id는 CSS id 선택자가 무효하므로 `[id="…"]`만 사용.
 */
export function findMunicipalityPathGraphics(
  svg: SVGSVGElement,
  overviewMap: boolean,
  mapRegionId: string,
  municipalityCode: string,
): SVGGraphicsElement | null {
  const code = municipalityCode.trim();
  if (!code) return null;
  const rawId = !overviewMap && mapRegionId === "seoul" ? code : `m-${code}`;
  const attr = rawId.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const el = svg.querySelector(`[id="${attr}"]`);
  return el instanceof SVGGraphicsElement ? el : null;
}

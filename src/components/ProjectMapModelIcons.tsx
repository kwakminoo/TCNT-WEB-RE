import type { AssetKind } from "../content/taeilProjectMapData";

type IconTone = "dark" | "light";

type IconProps = {
  className?: string;
  title?: string;
  tone?: IconTone;
};

/** SVG 기본 픽셀(렌더 크기는 global.css `.project-map__marker-icon` 로도 제한됨) */
const common = {
  w: 144,
  h: 144,
  viewBox: "0 0 40 40",
} as const;

/** 시뮬레이션용 아파트(블록형) */
export function IconApartment({ className, title, tone = "dark" }: IconProps) {
  const light = tone === "light";
  return (
    <svg
      className={className}
      width={common.w}
      height={common.h}
      viewBox={common.viewBox}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      aria-hidden={title ? undefined : true}
      role="img"
    >
      {title ? <title>{title}</title> : null}
      <rect x="6" y="14" width="10" height="18" fill={light ? "#2a5078" : "#38bdf8"} opacity={0.95} />
      <rect x="17" y="10" width="12" height="22" fill={light ? "#1a3a5c" : "#0ea5e9"} opacity={0.88} />
      <rect x="30" y="16" width="6" height="16" fill={light ? "#0f2744" : "#0284c7"} opacity={0.82} />
      <rect x="8" y="17" width="2" height="2" fill={light ? "#b8e8be" : "#e0f2fe"} opacity={0.9} />
      <rect x="12" y="17" width="2" height="2" fill={light ? "#b8e8be" : "#e0f2fe"} opacity={0.9} />
      <rect x="20" y="13" width="2" height="2" fill={light ? "#b8e8be" : "#e0f2fe"} opacity={0.9} />
      <rect x="24" y="13" width="2" height="2" fill={light ? "#b8e8be" : "#e0f2fe"} opacity={0.9} />
    </svg>
  );
}

/** 단독 주택형 */
export function IconHouse({ className, title, tone = "dark" }: IconProps) {
  const light = tone === "light";
  return (
    <svg
      className={className}
      width={common.w}
      height={common.h}
      viewBox={common.viewBox}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      aria-hidden={title ? undefined : true}
      role="img"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M20 6 L32 16 L28 16 L28 28 L12 28 L12 16 L8 16 Z"
        fill={light ? "#00af10" : "#2dd4bf"}
        opacity={0.92}
      />
      <rect x="17" y="22" width="6" height="6" fill={light ? "#0f2744" : "#0f172a"} opacity={0.35} />
    </svg>
  );
}

/** 창고·물류(박스형) */
export function IconWarehouse({ className, title, tone = "dark" }: IconProps) {
  const light = tone === "light";
  return (
    <svg
      className={className}
      width={common.w}
      height={common.h}
      viewBox={common.viewBox}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      aria-hidden={title ? undefined : true}
      role="img"
    >
      {title ? <title>{title}</title> : null}
      <rect x="8" y="16" width="26" height="16" rx="2" fill={light ? "#c9a227" : "#f59e0b"} opacity={0.92} />
      <path
        d="M8 20 L21 12 L34 20"
        fill="none"
        stroke={light ? "#e8d48a" : "#fbbf24"}
        strokeWidth="2"
        opacity={0.9}
      />
      <rect x="18" y="22" width="6" height="8" fill={light ? "#0f2744" : "#1e293b"} opacity={0.45} />
    </svg>
  );
}

/** 사옥·업무(타워형) */
export function IconCompany({ className, title, tone = "dark" }: IconProps) {
  const light = tone === "light";
  return (
    <svg
      className={className}
      width={common.w}
      height={common.h}
      viewBox={common.viewBox}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      aria-hidden={title ? undefined : true}
      role="img"
    >
      {title ? <title>{title}</title> : null}
      <rect x="14" y="8" width="14" height="26" rx="1" fill={light ? "#1a3a5c" : "#818cf8"} opacity={0.93} />
      <line x1="16" y1="12" x2="26" y2="12" stroke={light ? "#c8d6e8" : "#e0e7ff"} strokeWidth="1" opacity={0.7} />
      <line x1="16" y1="17" x2="26" y2="17" stroke={light ? "#c8d6e8" : "#e0e7ff"} strokeWidth="1" opacity={0.7} />
      <line x1="16" y1="22" x2="26" y2="22" stroke={light ? "#c8d6e8" : "#e0e7ff"} strokeWidth="1" opacity={0.7} />
      <rect x="18" y="26" width="6" height="8" fill={light ? "#0f2744" : "#0f172a"} opacity={0.35} />
    </svg>
  );
}

export function ProjectMapModelIcon({
  kind,
  className,
  title,
  tone = "dark",
}: IconProps & { kind: AssetKind }) {
  switch (kind) {
    case "apartment":
      return <IconApartment className={className} title={title} tone={tone} />;
    case "house":
      return <IconHouse className={className} title={title} tone={tone} />;
    case "warehouse":
      return <IconWarehouse className={className} title={title} tone={tone} />;
    case "company":
      return <IconCompany className={className} title={title} tone={tone} />;
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

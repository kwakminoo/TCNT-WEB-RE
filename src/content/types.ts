export type PageBlockProse = {
  kind?: "prose";
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type PageBlockTimeline = {
  kind: "timeline";
  heading?: string;
  sections: { year: string; subtitle?: string; lines: string[] }[];
};

export type PageBlockMedia = {
  kind: "media";
  src: string;
  alt: string;
  caption?: string;
  heading?: string;
  width?: number;
  height?: number;
};

export type PageBlockVideo = {
  kind: "video";
  src: string;
  title: string;
  description?: string;
};

export type PageBlockCta = {
  kind: "cta";
  heading?: string;
  links: { label: string; href: string; external?: boolean }[];
};

export type PageBlock =
  | PageBlockProse
  | PageBlockTimeline
  | PageBlockMedia
  | PageBlockVideo
  | PageBlockCta;

export type PageContent = {
  title: string;
  lead?: string;
  blocks: PageBlock[];
};

export type NavChild = {
  label: string;
  path: string;
};

export type NavGroup = {
  label: string;
  children: NavChild[];
};

export type NavEntry = NavGroup | NavChild;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

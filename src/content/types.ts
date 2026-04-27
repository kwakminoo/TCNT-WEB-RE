export type PageBlock = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

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

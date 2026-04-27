import { allNavLinks } from "./navData";
import { pagesByPath } from "./pagesData";

export type SearchDocument = {
  path: string;
  title: string;
  text: string;
};

function buildText(path: string, title: string): string {
  const page = pagesByPath[path];
  const parts: string[] = [title, path];
  if (page?.lead) parts.push(page.lead);
  if (page?.blocks) {
    for (const b of page.blocks) {
      if (b.paragraphs) parts.push(...b.paragraphs);
      if (b.bullets) parts.push(...b.bullets);
      if (b.heading) parts.push(b.heading);
    }
  }
  return parts.join(" ").toLowerCase();
}

export const searchDocuments: SearchDocument[] = allNavLinks.map((l) => ({
  path: l.path,
  title: l.label,
  text: buildText(l.path, l.label),
}));

export function searchPages(query: string): SearchDocument[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchDocuments.filter(
    (d) => d.title.toLowerCase().includes(q) || d.text.includes(q),
  );
}

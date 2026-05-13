import { standalonePageTitles } from "./breadcrumbResolve";
import { allNavLinks } from "./navData";
import { newsArticles } from "./pr/newsItems";
import { PARTNER_LOGOS } from "./company/partnersData";
import { pagesByPath } from "./pagesData";
import { portfolioProjects } from "./projects/portfolioData";

export type SearchDocument = {
  path: string;
  title: string;
  text: string;
};

function buildText(path: string, title: string): string {
  const pathKey = path.split("?")[0];
  const page = pagesByPath[pathKey];
  const parts: string[] = [title, path];
  const standalone = standalonePageTitles[pathKey];
  if (standalone) parts.push(standalone);
  if (page?.lead) parts.push(page.lead);
  if (page?.blocks) {
    for (const b of page.blocks) {
      if (b.kind === "timeline") {
        for (const s of b.sections) {
          parts.push(s.year, ...s.lines);
        }
      } else if (b.kind === "media") {
        if (b.heading) parts.push(b.heading);
        parts.push(b.alt);
        if (b.caption) parts.push(b.caption);
      } else if (b.kind === "video") {
        parts.push(b.title);
        if (b.description) parts.push(b.description);
      } else if (b.kind === "cta") {
        if (b.heading) parts.push(b.heading);
        for (const l of b.links) parts.push(l.label);
      } else {
        if (b.heading) parts.push(b.heading);
        if (b.paragraphs) parts.push(...b.paragraphs);
        if (b.bullets) parts.push(...b.bullets);
      }
    }
  }
  if (pathKey === "/about/clients") {
    parts.push(...PARTNER_LOGOS.map((p) => p.nameKo));
  }
  return parts.join(" ").toLowerCase();
}

const fromNav: SearchDocument[] = allNavLinks.map((l) => ({
  path: l.path,
  title: l.label,
  text: buildText(l.path, l.label),
}));

const navPathKeys = new Set(allNavLinks.map((l) => l.path.split("?")[0]));

const fromPagesOnly: SearchDocument[] = Object.keys(pagesByPath)
  .filter((p) => !navPathKeys.has(p))
  .map((path) => {
    const page = pagesByPath[path];
    return {
      path,
      title: page.title,
      text: buildText(path, page.title),
    };
  });

const fromProjects: SearchDocument[] = portfolioProjects.map((p) => ({
  path: `/business/orders/${p.slug}`,
  title: p.name,
  text: `${p.name} ${p.client ?? ""} ${p.contractor ?? ""} ${p.period ?? ""} ${p.status ?? ""}`.toLowerCase(),
}));

const fromNews: SearchDocument[] = newsArticles.map((a) => ({
  path: `/pr/news/${a.slug}`,
  title: a.title,
  text: `${a.title} ${a.summary} ${a.body.join(" ")}`.toLowerCase(),
}));

export const searchDocuments: SearchDocument[] = [
  ...fromNav,
  ...fromPagesOnly,
  ...fromProjects,
  ...fromNews,
];

export function searchPages(query: string): SearchDocument[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchDocuments.filter(
    (d) => d.title.toLowerCase().includes(q) || d.text.includes(q),
  );
}

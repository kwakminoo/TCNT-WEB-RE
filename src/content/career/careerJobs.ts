import jobsData from "./jobs_data.json" with { type: "json" };

export type CareerJobStatus = "open" | "closed" | "always";

export type CareerJobItem = {
  id: string;
  no: number;
  title: string;
  deadline: string;
  status: CareerJobStatus;
  department: string;
  employment_type: string;
  workplace: string;
  summary: string;
  link_url: string;
  body: string[];
};

export type CareerJobSearchField = "title" | "content";

export const careerJobItems = [...(jobsData as CareerJobItem[])].sort((a, b) => b.no - a.no);

const statusLabels: Record<CareerJobStatus, string> = {
  open: "접수중",
  closed: "마감",
  always: "상시채용",
};

export function careerJobStatusLabel(status: CareerJobStatus): string {
  return statusLabels[status];
}

export function formatCareerJobDeadline(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return isoDate;
  return `${y}.${m}.${d}`;
}

export function findCareerJobById(id: string): CareerJobItem | undefined {
  return careerJobItems.find((item) => item.id === id);
}

export function careerJobMatchesQuery(
  item: CareerJobItem,
  query: string,
  field: CareerJobSearchField,
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack =
    field === "title"
      ? item.title
      : `${item.title} ${item.summary} ${item.department} ${item.body.join(" ")}`;
  return haystack.toLowerCase().includes(q);
}

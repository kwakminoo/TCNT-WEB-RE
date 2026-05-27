export type RecruitmentGuideIcon =
  | "document"
  | "person-outline"
  | "id-card"
  | "person-solid"
  | "check";

export type RecruitmentGuideStep = {
  id: string;
  label: string;
  icon: RecruitmentGuideIcon;
  highlight?: boolean;
};

/** 공개채용 절차 — 레거시 채용가이드 화면 기준 */
export const RECRUITMENT_GUIDE_STEPS: readonly RecruitmentGuideStep[] = [
  { id: "documents", label: "서류전형", icon: "document" },
  { id: "interview-1", label: "1차면접", icon: "person-outline" },
  { id: "personality", label: "인성검사", icon: "id-card" },
  { id: "interview-2", label: "2차면접", icon: "person-solid" },
  { id: "final", label: "최종합격", icon: "check", highlight: true },
] as const;

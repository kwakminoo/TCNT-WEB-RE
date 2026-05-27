export type BenefitItem = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  lines: readonly string[];
};

/** 인재채용 > 복리후생 — 레거시 job/sub_02.html 기준 */
export const BENEFIT_ITEMS: readonly BenefitItem[] = [
  {
    id: "education",
    title: "자녀학자금 및 교육지원",
    image: "media/career/benefits/body_img_02-1.png",
    imageAlt: "자녀학자금 및 교육지원",
    lines: [
      "자녀 학자금 지원",
      "아주대경영대학원 교육 지원",
      "직무/직급/리더십 교육 및 워크샵 지원",
      "건설기술인 연회비 및 승급교육 일체 지원",
    ],
  },
  {
    id: "pension",
    title: "연금보험가입",
    image: "media/career/benefits/body_img_02-2.png",
    imageAlt: "단체보험가입",
    lines: ["퇴직연금(DB형)"],
  },
  {
    id: "condolence",
    title: "상조회",
    image: "media/career/benefits/body_img_02-3.png",
    imageAlt: "상조회",
    lines: ["태일 상조회 운영"],
  },
  {
    id: "resort",
    title: "휴양시설 운영",
    image: "media/career/benefits/body_img_02-4.png",
    imageAlt: "휴양시설 운영",
    lines: ["전국 대명리조트 회원권 보유"],
  },
  {
    id: "overseas",
    title: "해외연수",
    image: "media/career/benefits/body_img_02-5.png",
    imageAlt: "해외연수",
    lines: ["태일인/우수사원/최우수현장"],
  },
  {
    id: "club",
    title: "사내동아리 지원",
    image: "media/career/benefits/body_img_02-6.png",
    imageAlt: "사내동아리 지원",
    lines: ["직급별 모임 지원", "동아리 모임 지원"],
  },
  {
    id: "youth",
    title: "청년지원",
    image: "media/career/benefits/body_img_02-7.png",
    imageAlt: "청년지원",
    lines: ["청년재직자 내일채움공제"],
  },
  {
    id: "leave",
    title: "연차제도",
    image: "media/career/benefits/body_img_02-8.png",
    imageAlt: "연차제도",
    lines: ["반차/반반차 운영"],
  },
  {
    id: "gift",
    title: "기념품 지급",
    image: "media/career/benefits/body_img_02-9.png",
    imageAlt: "기념품 지급",
    lines: ["근로자의 날/창립기념일"],
  },
] as const;

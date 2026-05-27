export type CareerFaqItem = {
  id: string;
  question: string;
  answerTitle: string;
  paragraphs: string[];
};

/** 인재채용 > 채용FAQ — 레거시 job_faq_list.jsp 본문 */
export const CAREER_FAQ_ITEMS: CareerFaqItem[] = [
  {
    id: "preferred-certificates",
    question: "우대 자격증이 있나요?",
    answerTitle: "우대 자격증이 있나요?",
    paragraphs: [
      "건축(산업)기사/건설안전(산업)기사/안전(산업)기사 우대합니다.",
      "위 자격증 소지시 각 10만원의 자격증 수당이 있으며,",
      "2개 이상일 경우 30만원의 자격증 수당 혜택이 주어집니다.",
    ],
  },
  {
    id: "career-criteria",
    question: "경력 인정 기준은 무엇인가요?",
    answerTitle: "경력 인정 기준은 무엇인가요?",
    paragraphs: [
      "현장직무(공사/안전/공무)의 경우, 동종 업계(토목/건축) 경력만 인정합니다.",
      "철근콘크리트업종 경력 우대합니다.",
    ],
  },
  {
    id: "expected-graduate",
    question: "졸업예정자도 지원이 가능한가요?",
    answerTitle: "졸업예정자도 지원이 가능한가요?",
    paragraphs: [
      "졸업 예정자도 직무 관련 전공 및 자격증 소지자 등 직무능력이 있다고 판단되면, 지원 가능합니다.",
    ],
  },
  {
    id: "probation-treatment",
    question: "수습 기간(3개월) 동안 처우의 차이가 있나요?",
    answerTitle: "수습 기간(3개월) 동안 처우의 차이가 있나요?",
    paragraphs: ["수습기간 급여는 100% 지급합니다."],
  },
  {
    id: "document-screening",
    question: "서류전형시 중요하게 보는 부분은?",
    answerTitle: "서류전형시 중요하게 보는 부분은?",
    paragraphs: ["지원동기 및 직무 적합도 입니다."],
  },
  {
    id: "resume-format",
    question: "지정양식의 이력서 및 자기소개서를 제출하여야 하는지?",
    answerTitle: "지정양식의 이력서 및 자기소개서를 제출하여야 하는지?",
    paragraphs: ["양식은 무방하나, 자사양식 이력서 및 자기소개서 제출자 우대합니다."],
  },
  {
    id: "document-result",
    question: "서류 합격자 발표는 언제 이루어 지나요?",
    answerTitle: "서류 합격자 발표는 언제 이루어 지나요?",
    paragraphs: ["서류 마감 후 1주일 이내로 개별 통보합니다."],
  },
  {
    id: "interview-process",
    question: "면접 전형은 어떻게 이루어 지는지?",
    answerTitle: "면접 전형은 어떻게 이루어 지는지?",
    paragraphs: [
      "1차 면접의 경우, 실무를 추진할 현업 리더를 주축으로 직무수행 경험과 능력을 통해 직무 적합성을 파악하는 것을 주 목적으로 하며, 면접시간은 약 40분간 진행 됩니다.",
      "2차 면접의 경우, 리더(CEO, 본부장, 담당PM, 경영혁신팀장 등) 중심으로 면접관을 구성하여, 자사 인재상을 중심으로 조직 적합성 확인을 주 목적으로 하며, 면접시간은 약 1시간 가량 진행 됩니다.",
    ],
  },
  {
    id: "interview-focus",
    question: "면접시 중요하게 보는 포인트가 있다면?",
    answerTitle: "면접시 중요하게 보는 포인트가 있다면?",
    paragraphs: [
      "역량 파악 및 조직가치 기반으로 자사와 일치하는 인재상인지 검증하며, 과거 경험이나 사례 등 심층 질문을 통해 지원자의 응답 수준을 확인합니다.",
    ],
  },
  {
    id: "youth-welfare",
    question: "청년우대 복지정책이 있는지?",
    answerTitle: "청년우대 복지정책이 있는지?",
    paragraphs: [
      "사회초년생 및 청년층의 지원을 중요하게 생각하고 있으며, 청년재직자 내일채움공제를 지원하고 있습니다.",
      "※ 청년재직자 내일채움공제란?",
    ],
  },
];

/**
 * 직무 소개 — 레거시 태일씨앤티 홈페이지 job/sub_03.html 직무소개 영역 정리.
 * 참고: https://www.taeilcnt.co.kr/home/job/sub_03.html
 */

export type JobIntroSectionKey = "overview" | "competency" | "vision";

/** 인사/총무처럼 한 카드에 두 직무군을 나눠 보여줄 때 */
export type JobIntroSplitBlock = {
  label: string;
  overview: readonly string[];
  competency: readonly string[];
  vision: readonly string[];
};

export type JobIntroRole = {
  id: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  overview: readonly string[];
  competency: readonly string[];
  vision: readonly string[];
  /** 있으면 모달에서 label별(인사·총무 등)로 구분 표시 */
  splits?: readonly JobIntroSplitBlock[];
};

export const JOB_INTRO_SECTION_LABEL: Record<JobIntroSectionKey, string> = {
  overview: "업무개괄",
  competency: "필요역량",
  vision: "Vision",
};

export const JOB_INTRO_ROLES: readonly JobIntroRole[] = [
  {
    id: "field-construction",
    title: "현장공사",
    summary: "공사 계획부터 실행·자재·기술까지 현장 공사 전 과정을 책임집니다.",
    imageSrc: "media/career/job-intro-legacy/job_content_img_01.jpg",
    imageAlt: "현장공사 직무 소개 이미지(태일씨앤티 홈페이지)",
    overview: [
      "공사 계획 수립",
      "공사 작업 관리",
      "자재·기술 개발",
      "공사 특이사항 관리",
    ],
    competency: [
      "발주자 요구사항 이해",
      "공종별 체계화 기술·건축 적산·공사비 분석·도면 이해",
      "공정 단계별 실행 대응·가공 오차 분석",
      "거푸집 및 철근콘크리트 타설 등 관련 제반 지식",
      "자재 특성 이해·공기 단축 공법 제안 능력·공법·자재별 원가 분석",
      "안전점검 및 하도급 공사 관리",
    ],
    vision: ["공사 작업관리 → 공사 계획 수립 → 자재·기술 개발"],
  },
  {
    id: "field-safety",
    title: "현장안전",
    summary: "안전 기획과 점검·교육으로 산업재해 예방 체계를 만듭니다.",
    imageSrc: "media/career/job-intro-legacy/job_content_img_02.jpg",
    imageAlt: "현장안전 직무 소개 이미지(태일씨앤티 홈페이지)",
    overview: ["안전 기획", "안전점검", "안전보건 교육", "산업재해 예방"],
    competency: [
      "안전관리계획서 작성·공정표 분석",
      "안전보건교육 연간 일정·계획 수립",
      "산업안전 규정 및 공정 지식·산업안전 시설 및 장비 지식",
      "안전교육 실습 매체 및 교수법 이해",
      "산업재해 관련 법규 이해",
    ],
    vision: ["안전점검·교육 및 산재 대응 → 안전기획"],
  },
  {
    id: "field-clerk",
    title: "현장공무",
    summary: "현장 운영 전반의 공정·원가·자재·인력을 조율합니다.",
    imageSrc: "media/career/job-intro-legacy/job_content_img_03.jpg",
    imageAlt: "현장공무 직무 소개 이미지(태일씨앤티 홈페이지)",
    overview: ["공정관리", "자금 및 원가관리", "자재관리", "현장 인력 관리"],
    competency: [
      "현장 착공 관리·예정 공정표 분석",
      "발주자 요구 내용의 전반적 이해",
      "회계 처리 기본 이해·공정별 원가관리",
      "자재 납품계약 등 이해·자재 규격·공종별 수요 이해",
      "인사노무·장비 관리",
    ],
    vision: ["제반 현장 운영 → 공정관리·자금·원가관리 → 협상력 강화"],
  },
  {
    id: "hq-clerk",
    title: "본사공무",
    summary: "입찰·계약부터 공정·원가·고객까지 본사 공무를 총괄합니다.",
    imageSrc: "media/career/job-intro-legacy/job_content_img_04.jpg",
    imageAlt: "본사공무 직무 소개 이미지(태일씨앤티 홈페이지)",
    overview: [
      "견적 산출",
      "공정관리",
      "공무 행정",
      "자금 및 원가관리",
      "산업 및 고객관리",
    ],
    competency: [
      "설계 검토 및 수익성 분석·입찰·계약 진행",
      "현장 착공 관리·예정 공정표 분석",
      "회계 처리 기본 이해·공정별 원가관리",
      "시공사 동향 파악 및 정보 교류",
      "하자관리·건설업 규정 및 공문 대응 능력",
    ],
    vision: ["공정관리 → 자금·원가관리 → 견적 산출 → 협상력 강화"],
  },
  {
    id: "materials",
    title: "자재",
    summary: "조달·구매·운영까지 자재 사업과 현장 수급을 연결합니다.",
    imageSrc: "media/career/job-intro-legacy/job_content_img_05.jpg",
    imageAlt: "자재 직무 소개 이미지(태일씨앤티 홈페이지)",
    overview: [
      "자재 사업기획",
      "자재 구매관리",
      "자재 조달기획",
      "자재 운영관리",
    ],
    competency: [
      "자재 품질 요구조건 지식·공정관리 프로세스 이해·협력업체 관리",
      "견적서 분석·구매계약 프로세스 이해·설계도면 분석",
      "원가 및 손익 분석·사업 타당성 도출",
      "자재 입출고 및 유지보수 관련 지식",
    ],
    vision: ["자재 운영·자재 구매관리 → 자재 조달기획 → 자재 사업기획"],
  },
  {
    id: "finance",
    title: "재무회계",
    summary: "자금·세무·원가·계약을 연계해 재무 건전성을 지원합니다.",
    imageSrc: "media/career/job-intro-legacy/job_content_img_06.jpg",
    imageAlt: "재무회계 직무 소개 이미지(태일씨앤티 홈페이지)",
    overview: ["자금관리", "세무·회계", "원가관리", "계약 지원"],
    competency: [
      "증빙서류 관리·회계 규정 및 처리 절차 이해",
      "세무 신고 및 규정 이해·전표 처리·재무제표 작성 및 분석",
      "원가 분석·일위대가 산정 이해·손익 분석",
      "계약 및 보증·증권 이해·재무·신용 관리 절차 및 기준 파악",
    ],
    vision: ["자금관리 → 계약지원·세무회계 → 자금 및 원가관리"],
  },
  {
    id: "hr-ga",
    title: "인사/총무",
    summary: "인력·평가·노무와 서무·복지·자산 등 본사 지원 업무를 담당합니다.",
    imageSrc: "media/career/job-intro-legacy/job_content_img_07.jpg",
    imageAlt: "인사·총무 직무 소개 이미지(태일씨앤티 홈페이지)",
    overview: [],
    competency: [],
    vision: [],
    splits: [
      {
        label: "인사",
        overview: ["인력 운영", "인사 기획", "평가·보상", "노무관리", "인사 행정"],
        competency: [
          "구인 채널 활용 및 근로기준법 이해",
          "직무 분류체계 이해 및 직무평가",
          "평가체계 설계·성과지표 도출",
          "취업규칙 및 노동법 이해",
        ],
        vision: ["HR 행정 → 인력 운영·평가보상 → 인사 기획"],
      },
      {
        label: "총무",
        overview: [
          "서무관리",
          "복지관리",
          "근무환경 관리",
          "자산관리",
          "행사 기획·관리",
        ],
        competency: [
          "증명서 발급·문서관리 규정 이해",
          "복리후생 규정 및 운영계획",
          "비품 및 사무공간 지원",
          "차량·부동산·자산 관리",
        ],
        vision: ["서무·복지·근무환경 관리 → 자산(시설 포함) 관리"],
      },
    ],
  },
  {
    id: "it",
    title: "IT",
    summary: "통신·인프라·시스템 운영과 전산화 기획으로 업무 효율을 높입니다.",
    imageSrc: "media/career/job-intro-legacy/job_content_img_08.jpg",
    imageAlt: "IT 직무 소개 이미지(태일씨앤티 홈페이지)",
    overview: ["통신관리", "IT 시스템 운영 관리", "전산화 기획"],
    competency: [
      "유·무선 통신망 서비스 운영",
      "IT 장애 처리·최신 IT 기술 동향 파악·시스템 관련 지식",
      "IT 인프라 정보 파악·IT 도입 및 운영 여건 개선",
    ],
    vision: ["통신·시스템·장비·네트워크 관리 → IT 기획"],
  },
] as const;

export type NewsItem = { id: string; tag: string; title: string; date: string };

export type MasterpieceItem = {
  id: string;
  title: string;
  shortTitle: string;
  leftCopy: string;
  rightMetric: string;
  rightCopy: string;
  client: string;
  contractor: string;
  scale: string;
  period: string;
  status?: string;
  imageSrc: string;
};

export const homeNews: NewsItem[] = [
  {
    id: "n1",
    tag: "홍보",
    title: "삼성물산 공사수행 역량평가 수행우수사 선정, 최우수상 수상",
    date: "2024-11-12",
  },
  {
    id: "n2",
    tag: "홍보",
    title: "한국청소년육성회 금천지구회 모범청소년 장학금 수여 행사 소식",
    date: "2024-09-03",
  },
  {
    id: "n3",
    tag: "홍보",
    title: "김경수 대표님 한국산업단지경영자연합회 서울 6대 회장 취임",
    date: "2024-08-21",
  },
  {
    id: "n4",
    tag: "수주",
    title: "현대ENG 하남미사 프로젝트 수주 소식",
    date: "2024-07-15",
  },
];

export const homeMasterpieces: MasterpieceItem[] = [
  {
    id: "m1",
    title: "수원연무동 주상복합",
    shortTitle: "수원연무동",
    leftCopy: "도심 주거와 상업 기능을 결합한 복합 주거 랜드마크 프로젝트",
    rightMetric: "53,385m2",
    rightCopy: "연면적 기준",
    client: "HL 디앤아이한라 주식회사",
    contractor: "HL 디앤아이한라 주식회사",
    scale: "대지면적 : 6,781m2 건축면적 : 4,269m2 연면적 : 53,385m2 지하1층~지상28층",
    period: "2024.05.22~2026.05.31",
    status: "진행",
    imageSrc:
      "/@fs/C:/Users/kwakm/.cursor/projects/c-Users-kwakm-OneDrive-Desktop-Cusor-Project-TNC-Web-Re/assets/c__Users_kwakm_OneDrive_Desktop_Cusor-Project_TNC_Web_Re______mp1.png",
  },
  {
    id: "m2",
    title: "판교 G2 업무시설",
    shortTitle: "판교 G2",
    leftCopy: "판교 핵심 업무축에 들어서는 고밀도 오피스 거점 개발",
    rightMetric: "129,243m2",
    rightCopy: "연면적 기준",
    client: "주식회사 우아한형제들",
    contractor: "디엘이앤씨(주)",
    scale: "대지면적 : 16,486m2(4,995평) 연면적 : 129,243m2(39,096평)",
    period: "2022.08.31~2024.12.31",
    imageSrc:
      "/@fs/C:/Users/kwakm/.cursor/projects/c-Users-kwakm-OneDrive-Desktop-Cusor-Project-TNC-Web-Re/assets/c__Users_kwakm_OneDrive_Desktop_Cusor-Project_TNC_Web_Re______mp2.png",
  },
  {
    id: "m3",
    title: "평택 P4 RC공사 1공구",
    shortTitle: "평택 P4",
    leftCopy: "대규모 생산시설의 핵심 구조체 공정을 안정적으로 수행",
    rightMetric: "1공구",
    rightCopy: "RC공사",
    client: "삼성전자(주)",
    contractor: "삼성물산주식회사",
    scale: ".",
    period: "2022.03.18~2023.07.31",
    imageSrc:
      "/@fs/C:/Users/kwakm/.cursor/projects/c-Users-kwakm-OneDrive-Desktop-Cusor-Project-TNC-Web-Re/assets/c__Users_kwakm_OneDrive_Desktop_Cusor-Project_TNC_Web_Re______mp3.png",
  },
  {
    id: "m4",
    title: "몬트레아 한남 신축공사",
    shortTitle: "몬트레아 한남",
    leftCopy: "한남권 입지 가치를 반영한 고급 복합건축 신축 프로젝트",
    rightMetric: "18,848.96M2",
    rightCopy: "연면적 기준",
    client: "엠스페이스한남 PFV 주식회사",
    contractor: "KCC건설",
    scale: "대지면적 : 1,810.00M2 건축면적 : 1,085.15M2 연 면 적 : 18,848.96M2",
    period: "2022.01.01~2023.08.31",
    imageSrc:
      "/@fs/C:/Users/kwakm/.cursor/projects/c-Users-kwakm-OneDrive-Desktop-Cusor-Project-TNC-Web-Re/assets/c__Users_kwakm_OneDrive_Desktop_Cusor-Project_TNC_Web_Re______mp4.jpg",
  },
  {
    id: "m5",
    title: "텔레칩스사옥 신축공사",
    shortTitle: "텔레칩스사옥",
    leftCopy: "연구·업무 기능을 통합한 기업형 스마트 오피스 신축",
    rightMetric: "지하5층~지상12층",
    rightCopy: "건물 규모",
    client: "(주)텔레칩스",
    contractor: "(주)한라",
    scale: "지하5층, 지상12층 건축면적 2,342.92M2 (718.33평) 연면적 30,918.68M2 (9,364.37평)",
    period: "2020.10.27~2022.09.26",
    imageSrc:
      "/@fs/C:/Users/kwakm/.cursor/projects/c-Users-kwakm-OneDrive-Desktop-Cusor-Project-TNC-Web-Re/assets/c__Users_kwakm_OneDrive_Desktop_Cusor-Project_TNC_Web_Re______mp5.jpg",
  },
];

export const homeIntro = {
  title: "태일씨앤티 기업 소개",
  paragraphs: [
    "지난 10년 동안 꾸준히 성장해 올 수 있었던 준비와 노력을 동력으로 창립 10주년을 맞이하였고, 끊임없는 도전을 통해 새로운 10년의 미래를 준비하는 더 나은 내일을 건설하는 기업이 되고자 합니다.",
    "현장의 안전과 품질을 최우선으로, 발주처와의 신뢰를 바탕으로 공정별 리스크를 투명하게 관리합니다. 시공 파트너로서의 책임을 다하며 지속 가능한 성장을 추구합니다.",
  ],
};

export const homeSlogan = {
  line1: "오늘의 안전은 어제로부터,",
  line2: "내일의 안전은 오늘로부터!",
};

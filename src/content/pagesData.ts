import type { PageContent } from "./types";
import { COMPANY_HISTORY_TIMELINE } from "./company/historyData";

export const pagesByPath: Record<string, PageContent> = {
  "/about/greeting": {
    title: "인사말",
    lead: "태일씨앤티 홈페이지를 방문해 주신 고객 여러분 감사드립니다.",
    blocks: [
      {
        paragraphs: [
          "1994년 창립된 당사는 2013년 지인개발㈜에서 ㈜태일씨앤티로 사명을 변경하여, 철근·콘크리트 전문건설업계의 차별화된 서비스를 제공하기 위해 새로운 도전을 이어오고 있습니다. 책임완수, 근면성실, 인화단결의 사훈을 바탕으로 기본과 원칙에 충실한 투명한 경영 구조를 이루는 것과 동시에 철저한 품질안전 관리로 고객감동을 실현하고, 상호존중 및 소통을 바탕으로 협력사와 상생하고자 합니다.",
          "태일씨앤티는 안전·품질 역량 강화, 자재기술 및 관리 혁신 등을 통하여 최상의 파트너십을 형성하여 국내외 건설산업발전에 기여하는 전문기업의 입지를 공고히 할 것입니다. 나아가 역동적인 사업가 정신을 바탕으로 철근가공, 건축소방, 투자, 무역에 이르기까지 다양한 사업을 발굴하여 장기 지속적 성장을 강화해 나가겠습니다.",
          "임직원 교육 프로그램, 투명한 성과관리 등 전략적 인적자원관리를 통해 책임과 성장, 정직과 소통, 더 나은 방식, 공동체 의식이라는 하나로 단결된 태일인 DNA를 발휘할 수 있도록 노력하고 있습니다. 고인 물을 바라보지 않고, 기꺼이 그 위를 넘어 성장할 것이며, 올바른 가치 창출을 위해 혁신을 거듭하는 태일씨앤티를 따뜻한 애정과 관심으로 지켜봐 주시기 바랍니다.",
        ],
      },
      {
        kind: "media",
        src: "media/company/greeting.jpg",
        alt: "인사말 이미지",
        caption: "회사 소개",
      },
      {
        kind: "media",
        src: "media/company/signature.jpg",
        alt: "대표이사 서명",
        caption: "대표이사",
      },
    ],
  },
  "/about/philosophy": {
    title: "경영이념",
    lead: "시대변화에 적응하여 누구보다 앞선 기술로 전문건설산업의 선도적 역할을 해 나갈 것입니다.",
    blocks: [
      {
        heading: "비전",
        paragraphs: [
          "시대변화에 적응하여 누구보다 앞선 기술로 전문건설산업의 선도적 역할을 해 나갈 것입니다.",
        ],
      },
      {
        heading: "핵심가치",
        bullets: [
          "① 고객감동 및 철저한 품질관리",
          "② 무재해 완벽시공 철저한 사후관리",
          "③ 지속적 기술개발과 원가절감",
          "고객감동 및 철저한 품질관리",
          "무재해와 완벽시공 및 철저한 사후관리",
          "지속적인 기술개발 및 원가 절감 실행",
        ],
      },
      {
        heading: "슬로건",
        bullets: [
          "① 하나된(One) — 뭉치면 강하다! 하나된 모습으로 나아갈 것입니다.",
          "② 혁신적인(Innovative) — 우리는 창의적으로 발전해 나갈 것입니다.",
          "③ 백년대계(Forever) — 미래지향적인 계획을 실현할 것입니다.",
        ],
      },
      {
        kind: "media",
        src: "media/company/philosophy.png",
        alt: "경영이념 다이어그램",
      },
    ],
  },
  "/about/history": {
    title: "회사연혁",
    lead: "준비와 실행의 누적으로 쌓아 온 발자취입니다.",
    blocks: [COMPANY_HISTORY_TIMELINE],
  },
  "/about/organization": {
    title: "기구조직도",
    lead: "본사 조직 구조입니다.",
    blocks: [
      {
        kind: "media",
        src: "media/company/organization.jpg",
        alt: "태일씨앤티 기구조직도",
      },
      {
        paragraphs: [
          "상세 조직·직제는 운영 정책에 따라 갱신될 수 있으며, 최신 조직도는 담당 부서를 통해 확인하실 수 있습니다.",
        ],
      },
    ],
  },
  "/about/licenses": {
    title: "업·면허/인증",
    lead: "법정 요건과 고객 요구 수준을 동시에 충족합니다.",
    blocks: [],
  },
  "/about/clients": {
    title: "주거래 시공사",
    lead: "국내 주요 발주처와의 신뢰 관계를 지속적으로 확대합니다.",
    blocks: [],
  },
  "/about/location": {
    title: "찾아오시는길",
    lead: "서울시 금천구 가산디지털2로 101(가산동 549-1) 한라원앤원타워 B동 17층 1701호",
    blocks: [
      {
        paragraphs: ["TEL 070-8897-0761", "FAX 02-2101-2141"],
      },
      {
        kind: "cta",
        heading: "지도",
        links: [
          {
            label: "카카오맵에서 크게 보기",
            href: "http://kko.to/lrpfcrc0H",
            external: true,
          },
        ],
      },
    ],
  },
  "/business/capability": {
    title: "건설시공능력",
    lead: "현장 유형별 시공 역량과 인력·장비 동원 체계를 갖추고 있습니다.",
    blocks: [
      {
        bullets: [
          "구조·마감·설비 간 인터페이스 조정",
          "도심·협소지 대응 교통·안전 통제",
          "준공 전 품질점검 및 하자 예방 활동",
        ],
      },
    ],
  },
  "/business/quality": {
    title: "품질경영",
    lead: "검증 가능한 품질 프로세스로 고객 요구를 충족합니다.",
    blocks: [
      {
        paragraphs: [
          "공정별 검측 포인트를 사전 정의하고, 이슈 발생 시 신속한 원인 분석과 재발 방지 대책을 병행합니다.",
        ],
      },
    ],
  },
  "/business/safety": {
    title: "안전경영",
    lead: "현장 모든 구성원의 생명과 안전을 최우선으로 합니다.",
    blocks: [
      {
        paragraphs: [
          "TBM·위험성 평가·안전 순회를 상시화하고, 협력사 포함 동일 기준의 안전 문화를 지향합니다.",
        ],
      },
    ],
  },
  "/business/project-map": {
    title: "프로젝트 맵",
    lead: "주요 프로젝트 위치를 지도 기반으로 안내합니다.",
    blocks: [
      {
        paragraphs: [
          "전용 지도 페이지에서 시·도별 프로젝트 위치를 확인할 수 있습니다.",
        ],
      },
    ],
  },
  "/innovation/vision": {
    title: "기술혁신 비전",
    lead: "(주)태일씨앤티는 미래지향적 기술 혁신을 통하여 기술경쟁력을 확보하여 산업현장의 새로운 방향을 개척하는 개척자로 자리매김할 것입니다.",
    blocks: [
      {
        paragraphs: [
          "(주)태일씨앤티는 새롭게 변화하는 미래시장에 신속히 대응할 수 있도록 건설 분야를 중심으로 신기술 확보를 위한 연구개발과제를 수행하고 있습니다. 또한 다양한 분야로의 사업영역 확장을 위하여 계열사 (주)태경이노베이션을 설립하고 협력사와의 활발한 교류 및 신기술·신사업 발굴, 투자를 진행하고 있습니다.",
        ],
      },
      {
        heading: "VISION — Challenge Innovation",
        bullets: [
          "기술경쟁력 확보",
          "품질 만족·고객 만족",
          "사업영역 다각화",
          "시스템 고도화",
        ],
      },
      {
        heading: "미래지향적 기술 개발을 통한 기술 경쟁력 확보",
        paragraphs: [
          "시장의 흐름과 미래전망을 바탕으로 끊임없는 건설기술상품 개발을 통하여 건설현장의 새로운 방향을 개척하고 기술 경쟁력을 확보하기 위하여 최선을 다하고 있습니다. 미래지향적 기술로 보다 나은 고객만족을 실현하도록 하겠습니다.",
        ],
      },
      {
        heading: "시스템 고도화 및 계열사 운영을 통한 효율적인 업무 수행과 품질 만족 기여",
        paragraphs: [
          "기업 시스템 고도화를 지속적으로 진행하고 계열사 운영을 통한 전문적 업무 수행 조직 구성으로 보다 효율적인 업무 수행과 품질 만족에 기여하고 있습니다.",
        ],
      },
      {
        heading: "미래 유망기술 확보를 통한 신규 사업분야 개척",
        paragraphs: [
          "미래 유망사업에 대한 다양한 분야로의 사업영역 확장을 위하여 계열사 (주)태경이노베이션을 설립하고 협력사와의 활발한 정보 교류와 신기술·신사업에 대한 발굴, 투자 사업을 진행하고 있습니다.",
        ],
      },
    ],
  },
  "/innovation/news": {
    title: "기술혁신 News",
    lead: "기술 과제와 현장 적용 사례를 정리해 공유합니다.",
    blocks: [],
  },
  "/pr/youtube": {
    title: "유튜브",
    lead: "태일씨앤티 홍보·소개 영상",
    blocks: [
      {
        kind: "video",
        src: "media/video/promo-2025.mp4",
        title: "2025 태일씨앤티 홍보영상",
        description: "자동재생 없음 · 재생 시 소리가 나올 수 있습니다.",
      },
      {
        kind: "video",
        src: "media/video/company-intro.mp4",
        title: "회사 소개 영상(최종본)",
        description: "배포 폴더 원본 파일명 기준 복사본입니다.",
      },
      {
        paragraphs: [
          "공식 유튜브 채널이 별도로 운영되는 경우, 운영 URL을 본문에 링크로 추가할 수 있습니다.",
        ],
      },
    ],
  },
  "/pr/social": {
    title: "사회공헌",
    lead: "지역사회와 함께하는 작은 실천을 이어갑니다.",
    blocks: [
      {
        paragraphs: [
          "청소년 장학·지역 봉사 등 파트너십 활동을 지속적으로 확대해 나가겠습니다. 최근 보도 사례는 홍보센터 News에서 확인할 수 있습니다.",
        ],
      },
    ],
  },
  "/pr/materials": {
    title: "홍보자료",
    lead: "브로슈어·회사 소개 자료 요청 안내",
    blocks: [
      {
        paragraphs: [
          "PDF 브로슈어 및 회사 소개서는 담당자 이메일로 요청해 주시면 검토 후 제공드립니다.",
        ],
      },
    ],
  },
  "/career/job-intro": {
    title: "직무소개",
    lead: "직무별 역할과 요구 역량을 안내합니다.",
    blocks: [
      {
        paragraphs: [
          "현장 중심 직군(공무·품질·안전·구매 등)과 본부 지원 직군으로 구성되며, 직무별 상세 JD는 채용공고에 안내됩니다.",
        ],
      },
    ],
  },
  "/career/hr-policy": {
    title: "인사제도",
    lead: "성과와 성장을 존중하는 인사 원칙",
    blocks: [
      {
        paragraphs: [
          "아래 이미지는 사내 배포 자료를 기반으로 한 시각 자료이며, 세부 규정 문구는 가안으로 정리된 안내입니다.",
        ],
      },
      {
        heading: "인재상 (가안 텍스트)",
        paragraphs: [
          "현장을 책임지는 전문가, 협력과 준법을 겸비한 구성원을 지향합니다.",
        ],
      },
      {
        kind: "media",
        src: "media/career/talent-model.jpg",
        alt: "인재상 안내 이미지",
      },
      {
        heading: "보상제도 (가안 텍스트)",
        paragraphs: ["성과·역할 기반 보상과 복리 일부는 내부 규정에 따릅니다."],
      },
      {
        kind: "media",
        src: "media/career/compensation.jpg",
        alt: "보상제도 안내 이미지",
      },
      {
        heading: "평가제도 (가안 텍스트)",
        paragraphs: ["다면평가·목표관리 등 절차는 인사 규정에 따릅니다."],
      },
      {
        kind: "media",
        src: "media/career/evaluation.jpg",
        alt: "평가제도 안내 이미지",
      },
      {
        bullets: [
          "역할 중심의 평가와 피드백",
          "교육·자격 취득 지원",
          "안전·준법 준수를 전제로 한 책임 경영",
        ],
      },
    ],
  },
  "/career/benefits": {
    title: "복리후생",
    lead: "구성원의 안정과 건강을 지원합니다.",
    blocks: [
      {
        paragraphs: [
          "건강검진·경조사·명절 지원 등 기본 복지와 함께, 현장 특성을 고려한 실비 지원 항목을 운영합니다.",
        ],
      },
    ],
  },
  "/career/guide": {
    title: "채용가이드",
    lead: "지원부터 입사까지의 절차를 안내합니다.",
    blocks: [
      {
        bullets: [
          "서류 전형 → 면접 전형 → 처우 협의 → 입사",
          "직무별 필수 자격·우대 자격은 채용공고에 명시됩니다.",
        ],
      },
    ],
  },
  "/career/jobs": {
    title: "채용공고",
    lead: "현재 모집 중인 포지션을 확인하세요.",
    blocks: [
      {
        paragraphs: [
          "실제 채용은 외부 채용 플랫폼 또는 회사 지정 채널을 통해 공지됩니다. 운영 담당자에게 문의해 주세요.",
        ],
      },
    ],
  },
  "/career/faq": {
    title: "채용FAQ",
    lead: "자주 묻는 질문",
    blocks: [
      {
        heading: "Q. 비수도권 거주자도 지원 가능한가요?",
        paragraphs: [
          "A. 직무별로 상이하며, 공고에 근무지·출장 범위가 안내됩니다.",
        ],
      },
      {
        heading: "Q. 경력 기준이 있나요?",
        paragraphs: [
          "A. 공고별로 요구하는 최소 경력이 다르며, 동등 역량은 포트폴리오로 검토할 수 있습니다.",
        ],
      },
    ],
  },
  "/esg": {
    title: "ESG경영",
    lead: "환경·사회·지배구조 관점의 균형 있는 경영을 지향합니다.",
    blocks: [
      {
        kind: "media",
        src: "media/esg/esg-overview.png",
        alt: "ESG 경영 개요",
        heading: "ESG 개요",
      },
      {
        heading: "Environment",
        paragraphs: [
          "현장 폐기물 분리배출·먼지 저감 장비 활용 등 환경 부담을 줄이기 위한 실행 과제를 운영합니다.",
        ],
      },
      {
        kind: "media",
        src: "media/esg/environment.jpg",
        alt: "환경경영 안내 이미지",
        caption: "환경경영 활동(가안 설명과 함께 게시)",
      },
      {
        heading: "Social",
        paragraphs: [
          "협력사와의 동반성장, 지역사회 소통, 안전보건 체계 고도화에 힘씁니다.",
        ],
      },
      {
        heading: "Governance · 윤리경영",
        paragraphs: [
          "투명한 의사결정과 준법 경영으로 이해관계자의 신뢰를 확보합니다.",
        ],
      },
      {
        kind: "media",
        src: "media/esg/ethics.png",
        alt: "윤리경영 안내 이미지",
      },
    ],
  },
  "/legal/privacy": {
    title: "개인정보처리방침",
    lead: "개인정보 보호를 위한 처리 방침(요약)",
    blocks: [
      {
        paragraphs: [
          "본 데모 사이트는 개인정보를 수집·저장하지 않습니다. 운영 시에는 법령에 따른 개인정보처리방침을 게시합니다.",
        ],
      },
    ],
  },
  "/legal/email-collection": {
    title: "이메일무단수집거부",
    blocks: [
      {
        paragraphs: [
          "본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 위반 시 정보통신망법에 의해 처벌받을 수 있습니다.",
        ],
      },
    ],
  },
  "/site-map": {
    title: "사이트맵",
    lead: "전체 메뉴 구조를 한눈에 확인하세요.",
    blocks: [
      {
        paragraphs: [
          "아래 목록에서 원하는 페이지로 바로 이동할 수 있습니다.",
        ],
      },
    ],
  },
};

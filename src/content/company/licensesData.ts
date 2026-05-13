/**
 * 업·면허/인증 그리드 데이터 (레거시 sub_04.html 순서·문구 기준).
 * 스캔 이미지: `public/media/company/licenses/` (scripts/download-licenses.mjs).
 * 일부 항목은 원 서버의 PDF·upload JPG 경로가 404라 본문 이미지 없음 → 카드만 표시.
 */
export type LicenseGridItem = {
  id: string;
  dateLine: string;
  title: string;
  subtitleLines?: string[];
  thumb: string;
  /** 클릭 시 크게 보여줄 스캔 JPG (없으면 안내 모달만) */
  detailImage?: string;
};

export type LicenseSection = {
  heading: string;
  items: LicenseGridItem[];
};

export const LICENSE_SECTIONS: LicenseSection[] = [
  {
    heading: "업ㆍ면허",
    items: [
      {
        id: "up-01",
        dateLine: "2023. 12. 19(각자대표)",
        title: "사업자 등록증",
        thumb: "media/company/licenses/thumb_logo_000.png",
        detailImage: "media/company/licenses/lisense_000.jpg",
      },
      {
        id: "up-02",
        dateLine: "2022. 11. 21(재교부)",
        title: "건설업 등록증",
        subtitleLines: ["철근·콘크리트 공사업"],
        thumb: "media/company/licenses/thumb_logo_001.png",
        detailImage: "media/company/licenses/lisense_001.jpg",
      },
      {
        id: "up-03",
        dateLine: "2022. 11. 21(재교부)",
        title: "건설업 등록증",
        subtitleLines: ["도장·습식·방수공사업"],
        thumb: "media/company/licenses/thumb_logo_001.png",
        detailImage: "media/company/licenses/lisense_002.jpg",
      },
      {
        id: "up-04",
        dateLine: "2022. 11. 21(재교부)",
        title: "건설업 등록증",
        subtitleLines: ["구조물해체·비계공사업"],
        thumb: "media/company/licenses/thumb_logo_001.png",
        detailImage: "media/company/licenses/lisense_003.jpg",
      },
      {
        id: "up-05",
        dateLine: "2015. 10. 28",
        title: "사업자 등록증",
        thumb: "media/company/licenses/thumb_logo_00.png",
        detailImage: "media/company/licenses/lisense_00.jpg",
      },
      {
        id: "up-06",
        dateLine: "1992. 08. 31",
        title: "건설업 등록증",
        subtitleLines: ["철근·콘크리트 공사업"],
        thumb: "media/company/licenses/thumb_logo_01.png",
      },
      {
        id: "up-07",
        dateLine: "2014. 03. 11",
        title: "건설업 등록증",
        subtitleLines: ["미장·방수·조적 공사업"],
        thumb: "media/company/licenses/thumb_logo_01.png",
      },
      {
        id: "up-08",
        dateLine: "2015. 08. 26",
        title: "건설업 등록증",
        subtitleLines: ["비계·구조물 해체 공사"],
        thumb: "media/company/licenses/thumb_logo_01.png",
      },
    ],
  },
  {
    heading: "인증",
    items: [
      {
        id: "cf-01",
        dateLine: "2022. 12. 14",
        title: "가족친화기업인증서",
        thumb: "media/company/licenses/thumb_logo_003.png",
        detailImage: "media/company/licenses/lisense_008.jpg",
      },
      {
        id: "cf-02",
        dateLine: "2017. 09. 15",
        title: "좋은일자리기업 인증서",
        thumb: "media/company/licenses/thumb_logo_004.png",
        detailImage: "media/company/licenses/lisense_009.jpg",
      },
      {
        id: "cf-03",
        dateLine: "2022. 10. 01",
        title: "인재육성형 중소기업 지정서",
        thumb: "media/company/licenses/thumb_logo_005.png",
        detailImage: "media/company/licenses/lisense_010.jpg",
      },
      {
        id: "cf-04",
        dateLine: "2022. 11. 16",
        title: "근무혁신 우수기업 선정서",
        thumb: "media/company/licenses/thumb_logo_006.png",
        detailImage: "media/company/licenses/lisense_011.jpg",
      },
      {
        id: "cf-05",
        dateLine: "2022. 05. 09",
        title: "품질경영시스템 인증서",
        subtitleLines: ["KS Q ISO 9001:2015 / ISO 9001:2015"],
        thumb: "media/company/licenses/thumb_logo_002.png",
        detailImage: "media/company/licenses/lisense_004.jpg",
      },
      {
        id: "cf-06",
        dateLine: "2022. 05. 09",
        title: "환경경영시스템 인증서",
        subtitleLines: ["KS Q ISO 14001:2015 / ISO 14001:2015"],
        thumb: "media/company/licenses/thumb_logo_002.png",
        detailImage: "media/company/licenses/lisense_005.jpg",
      },
      {
        id: "cf-07",
        dateLine: "2023. 07. 17",
        title: "안전보건경영시스템 인증서",
        subtitleLines: ["KS Q ISO 45001:2018 / ISO 45001:2018"],
        thumb: "media/company/licenses/thumb_logo_002.png",
        detailImage: "media/company/licenses/lisense_006.jpg",
      },
      {
        id: "cf-08",
        dateLine: "2022. 10. 26",
        title: "경영혁신형 중소기업 확인서",
        thumb: "media/company/licenses/thumb_logo_03.png",
        detailImage: "media/company/licenses/lisense_007.jpg",
      },
      {
        id: "cf-09",
        dateLine: "2020. 08. 28",
        title: "품질경영시스템 인증서",
        subtitleLines: ["ISO 9001:2015"],
        thumb: "media/company/licenses/thumb_logo_04.png",
      },
      {
        id: "cf-10",
        dateLine: "2020. 08. 28",
        title: "환경경영시스템 인증서",
        subtitleLines: ["ISO 14001:2015"],
        thumb: "media/company/licenses/thumb_logo_04.png",
      },
      {
        id: "cf-11",
        dateLine: "2020. 08. 28",
        title: "안전보건경영시스템 인증서",
        subtitleLines: ["OHSAS 18001:2007"],
        thumb: "media/company/licenses/thumb_logo_04.png",
      },
      {
        id: "cf-12",
        dateLine: "2019. 10. 21",
        title: "경영혁신형 중소기업 확인서",
        thumb: "media/company/licenses/thumb_logo_03.png",
      },
      {
        id: "cf-13",
        dateLine: "2023. 01. 09",
        title: "벤처기업 확인서",
        thumb: "media/company/licenses/thumb_logo_007.png",
        detailImage: "media/company/licenses/lisense_012.jpg",
      },
      {
        id: "cf-14",
        dateLine: "2023. 04. 13",
        title: "중소기업 확인서",
        thumb: "media/company/licenses/thumb_logo_008.png",
        detailImage: "media/company/licenses/lisense_013.jpg",
      },
      {
        id: "cf-15",
        dateLine: "2023. 10. 26",
        title: "성과공유기업 확인서",
        thumb: "media/company/licenses/thumb_logo_008.png",
        detailImage: "media/company/licenses/lisense_014.jpg",
      },
      {
        id: "cf-16",
        dateLine: "2024. 01. 30",
        title: "소프트웨어사업자 확인서",
        thumb: "media/company/licenses/thumb_logo_009.png",
        detailImage: "media/company/licenses/lisense_015.jpg",
      },
    ],
  },
];

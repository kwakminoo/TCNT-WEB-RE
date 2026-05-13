/** 레거시 `sub_05.html` 기준 주거래 시공사 로고·링크 (이미지: taeilcnt.co.kr 동일 경로에서 수집). */
export type PartnerLogo = {
  /** 파일 접미 01–25 (19번은 레거시에서 비공개) */
  fileId: string;
  nameKo: string;
  href: string;
};

export const PARTNER_LOGOS: PartnerLogo[] = [
  { fileId: "01", nameKo: "삼성물산", href: "http://www.samsungcnt.com/index.do" },
  { fileId: "02", nameKo: "삼성엔지니어링", href: "http://www.samsungengineering.co.kr/kor/index" },
  { fileId: "03", nameKo: "Halla", href: "http://www.halla.co.kr/" },
  { fileId: "04", nameKo: "GS 건설", href: "http://www.gsenc.com/" },
  { fileId: "05", nameKo: "현대엔지니어링", href: "https://www.hec.co.kr/main.asp" },
  { fileId: "06", nameKo: "현대건설", href: "http://www.hdec.kr/" },
  { fileId: "07", nameKo: "대우건설", href: "http://www.daewooenc.com/" },
  { fileId: "08", nameKo: "CJ건설", href: "http://www.cjenc.co.kr/kr/Default.asp" },
  { fileId: "09", nameKo: "고려개발", href: "https://www.kdc.co.kr" },
  { fileId: "10", nameKo: "동부건설", href: "https://dbcon.dongbu.co.kr" },
  { fileId: "11", nameKo: "KT engcore", href: "https://www.ktengcore.com/" },
  { fileId: "12", nameKo: "슈프림종합건설(주)", href: "http://www.supremecc.co.kr/" },
  { fileId: "13", nameKo: "KCC건설", href: "https://www.kccworld.net" },
  { fileId: "14", nameKo: "현대아산", href: "http://www.hdasan.com" },
  { fileId: "15", nameKo: "한진중공업", href: "http://www.hanjinsc.com/" },
  { fileId: "16", nameKo: "포스코", href: "http://www.posco.co.kr" },
  { fileId: "17", nameKo: "두산건설", href: "http://www.doosanenc.com/kr/" },
  { fileId: "18", nameKo: "SM(주)우방", href: "http://wbjd.woobang.co.kr/" },
  { fileId: "20", nameKo: "벽산엔지니어링", href: "http://bseng2.doffgen.com/" },
  { fileId: "21", nameKo: "신세계건설", href: "https://www.shinsegae-enc.com" },
  { fileId: "22", nameKo: "한양", href: "http://www.hycorp.co.kr/" },
  { fileId: "23", nameKo: "현대산업개발", href: "https://hdc-dvp.com/" },
  { fileId: "24", nameKo: "CJ대한통운", href: "http://bseng2.doffgen.com/" },
  { fileId: "25", nameKo: "SK에코플랜트", href: "https://www.shinsegae-enc.com" },
];

export function partnerImageSrc(fileId: string): string {
  return `media/company/partners/partner_${fileId}.jpg`;
}

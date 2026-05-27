const assetBase = import.meta.env.BASE_URL;

export type PromotionalMaterialBodyBlock =
  | { kind: "paragraph"; text: string; centered?: boolean }
  | { kind: "image"; src: string; alt: string; centered?: boolean };

export type PromotionalMaterialItem = {
  id: string;
  dateMmDd: string;
  dateYyyy: string;
  title: string;
  /** PDF 등 첨부. 외부는 공식 사이트 filedown 링크 */
  download: { href: string; external?: boolean };
  body: PromotionalMaterialBodyBlock[];
};

/** 레거시 `prom_03_list.jsp` 게시 목록과 동일한 텍스트·이미지(로컬 미러) */
export const promotionalMaterialItems: PromotionalMaterialItem[] = [
  {
    id: "ebook-sample-2023",
    dateMmDd: "08.30",
    dateYyyy: "2023",
    title: "(주)태일씨앤티 eBook Sample Design",
    download: { href: `${assetBase}media/pr/materials/TAEILCnT-eBook-2023.pdf` },
    body: [
      {
        kind: "paragraph",
        text: "(주)태일씨앤티가 개발중인 전자 지명원 eBook Sample Design 입니다.",
      },
      { kind: "image", src: "media/pr/materials/ebook-sample-2023.png", alt: "eBook Sample Design 안내 이미지" },
    ],
  },
  {
    id: "naeil-chaeum-2023",
    dateMmDd: "08.21",
    dateYyyy: "2023",
    title: "내일채움공제",
    download: {
      href: "http://www.taeilcnt.co.kr/home/filedown.jsp?dn=B&file=20230821130626241969&seq=191",
      external: true,
    },
    body: [{ kind: "image", src: "media/pr/materials/naeil-chaeum-2023.png", alt: "내일채움공제 안내 이미지" }],
  },
  {
    id: "long-service-2023",
    dateMmDd: "05.17",
    dateYyyy: "2023",
    title: "장기근속 포상제도",
    download: {
      href: "http://www.taeilcnt.co.kr/home/filedown.jsp?dn=B&file=20230517131046063549&seq=180",
      external: true,
    },
    body: [
      { kind: "image", src: "media/pr/materials/long-service-2023-a.png", alt: "장기근속 포상제도 안내 1", centered: true },
      { kind: "image", src: "media/pr/materials/long-service-2023-b.png", alt: "장기근속 포상제도 안내 2", centered: true },
      { kind: "paragraph", text: ".", centered: true },
    ],
  },
  {
    id: "ci-2019",
    dateMmDd: "09.05",
    dateYyyy: "2019",
    title: "CI",
    download: { href: `${assetBase}media/pr/materials/CI-2019.pdf` },
    body: [{ kind: "image", src: "media/pr/materials/ci-2019.png", alt: "CI 안내 이미지", centered: true }],
  },
];

export function materialsAssetSrc(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

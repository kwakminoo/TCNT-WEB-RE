/**
 * 프로젝트 맵 — 아이콘(프로젝트 `id`)별로 행정 SVG path 안 배치를 한곳에서 관리합니다.
 *
 * ### `kind` 의미
 * - `"inPath"`: 아이콘을 지정한 `pathCode` 영역 안에 배치합니다.
 *
 * ### `pathCode` 의미
 * - SVG에서 `findMunicipalityPathGraphics`로 찾는 행정 코드 id(문자열)입니다.
 * - 서울 권역 맵 예: `"11180"` = 서울특별시 금천구.
 * - 비서울 권역/전국 맵 예: `"31070"` = 경기도 평택시.
 *
 * ### `offsetX`, `offsetY` 의미 (권역 지도)
 * - 권역 지도(서울/경기/충남·세종/경남/강원) 기준 아이콘 위치(x, y)를 그대로 기록했습니다.
 *
 * ### `nationalX`, `nationalY` 의미 (전국 통합 지도)
 * - 전국 통합 지도(korea-overview) 기준 아이콘 위치(nationalX, nationalY)를 기록했습니다.
 * - 단위: viewBox 픽셀(0~1000 축). +x 오른쪽, +y 아래.
 */

export type ProjectMapPlacement =
  | {
      readonly kind: "inPath";
      /** path id용 행정 코드. 생략 시 `taeilProjectMapData`의 해당 항목 `municipalityCode`. */
      readonly pathCode?: string;
      readonly offsetX: number;
      readonly offsetY: number;
      /** 전국 통합 지도에서만 쓰는 좌표(미지정 시 원본 `nationalX/Y`를 그대로 사용) */
      readonly nationalX?: number;
      readonly nationalY?: number;
    };

export const PROJECT_MAP_MANUAL_PLACEMENT_BY_PROJECT_ID: Readonly<
  Record<string, ProjectMapPlacement>
> = {
  // p03 Westin Seoul Parnas 리모델링공사 | 11230 서울특별시 강남구
  p03: { kind: "inPath", pathCode: "11230", offsetX: 700.0, offsetY: 656.6, nationalX: 340.2, nationalY: 229.8 },
  // p10 가산 데이터센터 | 11180 서울특별시 금천구
  p10: { kind: "inPath", pathCode: "11180", offsetX: 400, offsetY: 800, nationalX: 316.5, nationalY: 236.2 },
  // p16 비상교육 사옥 신축공사 | 11230 서울특별시 강남구
  p16: { kind: "inPath", pathCode: "11230", offsetX: 600.9, offsetY: 674.7, nationalX: 350.8, nationalY: 221.4 },
  // p18 몬트레아 한남 신축공사 | 11030 서울특별시 용산구
  p18: { kind: "inPath", pathCode: "11030", offsetX: 573.3, offsetY: 571.4, nationalX: 332.9, nationalY: 224.9 },
  // p26 가산동 549-1번지 지식산업센터 신축공사 | 11180 서울특별시 금천구
  p26: { kind: "inPath", pathCode: "11180", offsetX: 400.8, offsetY: 600.9, nationalX: 330.5, nationalY: 225.6 },
  // p32 브라이튼 여의도 복합시설 신축공사 1공구 | 11190 서울특별시 영등포구
  p32: { kind: "inPath", pathCode: "11190", offsetX: 381.2, offsetY: 609.7, nationalX: 321.8, nationalY: 227.1 },
  // p33 숭인동 오피스텔 신축공사 | 11010 서울특별시 종로구
  p33: { kind: "inPath", pathCode: "11010", offsetX: 599.4, offsetY: 457.9, nationalX: 334.4, nationalY: 218.3 },
  // p35 컬쳐랜드 대치동 사옥 신축공사 | 11230 서울특별시 강남구
  p35: { kind: "inPath", pathCode: "11230", offsetX: 696.6, offsetY: 750.9, nationalX: 326.8, nationalY: 241.6 },

  // p01 다이소 세종 온라인센터 | 29010 세종특별자치시
  p01: { kind: "inPath", pathCode: "29010", offsetX: 766.2, offsetY: 383.9, nationalX: 353.3, nationalY: 363.5 },
  // p02 용인 Cluster 1기 OBL | 31191 경기도 용인시 처인구
  p02: { kind: "inPath", pathCode: "31191", offsetX: 612.2, offsetY: 800.2, nationalX: 374.4, nationalY: 288.2 },
  // p04 용인 Cluster 1기 공동구 | 31192 경기도 용인시 기흥구
  p04: { kind: "inPath", pathCode: "31192", offsetX: 495.3, offsetY: 747.3, nationalX: 356.8, nationalY: 267.9 },
  // p05 디지털 엠파이어 평촌 비즈밸리 신축공사 | 31042 경기도 안양시 동안구
  p05: { kind: "inPath", pathCode: "31042", offsetX: 423.4, offsetY: 639.1, nationalX: 328.8, nationalY: 249.4 },
  // p06 엔씨소프트 글로벌 RDI센터 | 31023 경기도 성남시 분당구
  p06: { kind: "inPath", pathCode: "31023", offsetX: 497.4, offsetY: 635.5, nationalX: 346.7, nationalY: 248.5 },
  // p07 수원연무동 주상복합 | 31011 경기도 수원시 장안구
  p07: { kind: "inPath", pathCode: "31011", offsetX: 451.2, offsetY: 711.3, nationalX: 335.5, nationalY: 266.8 },
  // p08 평택 P5 RC공사 2공구 | 31070 경기도 평택시
  p08: { kind: "inPath", pathCode: "31070", offsetX: 432.0, offsetY: 856.0, nationalX: 312.0, nationalY: 286.0 },
  // p09 과천지식정보타운 11-3블럭 신축공사 | 31110 경기도 과천시
  p09: { kind: "inPath", pathCode: "31110", offsetX: 436.9, offsetY: 620.5, nationalX: 332.1, nationalY: 244.9 },
  // p11 시흥 장현지구 업무시설 신축공사 | 31150 경기도 시흥시
  p11: { kind: "inPath", pathCode: "31150", offsetX: 312.9, offsetY: 667.3, nationalX: 302.1, nationalY: 256.2 },
  // p12 안성 물류센터 신축공사 | 31220 경기도 안성시
  p12: { kind: "inPath", pathCode: "31220", offsetX: 532.9, offsetY: 923.4, nationalX: 355.2, nationalY: 317.9 },
  // p13 판교 G2 업무시설 | 31023 경기도 성남시 분당구
  p13: { kind: "inPath", pathCode: "31023", offsetX: 507.5, offsetY: 624.1, nationalX: 359.7, nationalY: 238.2 },
  // p14 미래인로지스부천 복합물류센터 신축공사 | 31050 경기도 부천시
  p14: { kind: "inPath", pathCode: "31050", offsetX: 342.5, offsetY: 586.1, nationalX: 306.4, nationalY: 236.6 },
  // p15 평택 P4 RC공사 1공구 | 31070 경기도 평택시
  p15: { kind: "inPath", pathCode: "31070", offsetX: 466.0, offsetY: 844.0, nationalX: 334.0, nationalY: 283.0 },
  // p17 삼성전자(주) P3 154KV 변전소 신축공사 (Ph.3) | 31070 경기도 평택시
  p17: { kind: "inPath", pathCode: "31070", offsetX: 506.0, offsetY: 864.0, nationalX: 366.0, nationalY: 291.0 },
  // p19 평택 전자 P3 대기방지 신축공사 (P3장비기초공사) | 31070 경기도 평택시
  p19: { kind: "inPath", pathCode: "31070", offsetX: 522.0, offsetY: 902.0, nationalX: 371.0, nationalY: 318.0 },
  // p20 CJ제일제당 논산공장 COOKIT 공장 신축공사 | 34060 충청남도 논산시
  p20: { kind: "inPath", pathCode: "34060", offsetX: 785.5, offsetY: 670.3, nationalX: 358.9, nationalY: 446.3 },
  // p21 부천소사본동 주상복합 신축공사 | 31050 경기도 부천시
  p21: { kind: "inPath", pathCode: "31050", offsetX: 340.0, offsetY: 573.4, nationalX: 318.1, nationalY: 225.9 },
  // p22 평택 FAB 3기 신축공사 RC공사 3공구 | 31070 경기도 평택시
  p22: { kind: "inPath", pathCode: "31070", offsetX: 448.0, offsetY: 886.0, nationalX: 324.0, nationalY: 303.0 },
  // p23 만도 NEXT M | 38111 경상남도 창원시 의창구
  p23: { kind: "inPath", pathCode: "38111", offsetX: 628.8, offsetY: 485.5, nationalX: 551.1, nationalY: 610.9 },
  // p24 텔레칩스사옥 신축공사 | 31023 경기도 성남시 분당구
  p24: { kind: "inPath", pathCode: "31023", offsetX: 482.8, offsetY: 653.3, nationalX: 332.5, nationalY: 260.4 },
  // p25 삼성전자(주) P3 154KV 변전소 신축공사 | 31070 경기도 평택시
  p25: { kind: "inPath", pathCode: "31070", offsetX: 480.0, offsetY: 928.0, nationalX: 344.0, nationalY: 334.0 },
  // p27 삼성전자(주) 평택 P2L 하층서편마감 RC공사 3-1공구 신축공사 | 31070 경기도 평택시
  p27: { kind: "inPath", pathCode: "31070", offsetX: 410.0, offsetY: 898.0, nationalX: 305.0, nationalY: 311.0 },
  // p28 삼성전자(주) 평택 P2-PJT UT동 P2L PH2,3 신축공사 | 31070 경기도 평택시
  p28: { kind: "inPath", pathCode: "31070", offsetX: 490.0, offsetY: 878.0, nationalX: 352.0, nationalY: 300.0 },
  // p29 삼성전자(주) 평택  P2-PJT 초순수 [PH3]PVDF SHOP장 기초 PAD설치 공사 | 31070 경기도 평택시
  p29: { kind: "inPath", pathCode: "31070", offsetX: 438.0, offsetY: 922.0, nationalX: 319.0, nationalY: 328.0 },
  // p30 삼성전자(주) 평택 P2L PH2 상동마감 RC 2-1공구 | 31070 경기도 평택시
  p30: { kind: "inPath", pathCode: "31070", offsetX: 458.0, offsetY: 866.0, nationalX: 336.0, nationalY: 294.0 },
  // p31 판교 알파돔 6-1블럭 복합시설 개발 신축공사 중 2차발주공사 | 31023 경기도 성남시 분당구
  p31: { kind: "inPath", pathCode: "31023", offsetX: 516.9, offsetY: 653.1, nationalX: 365.0, nationalY: 263.4 },
  // p34 강릉시 주문진읍 공동주택 신축공사 | 32030 강원특별자치도 강릉시
  p34: { kind: "inPath", pathCode: "32030", offsetX: 760.5, offsetY: 461.4, nationalX: 580.1, nationalY: 163.7 },
  // p36 판교 알파돔 6-1블럭 복합시설 개발 신축공사 중 1차발주공사 | 31023 경기도 성남시 분당구
  p36: { kind: "inPath", pathCode: "31023", offsetX: 478.8, offsetY: 629.3, nationalX: 328.5, nationalY: 236.4 },
};

export function resolveProjectMapPlacement(id: string): ProjectMapPlacement {
  return (
    PROJECT_MAP_MANUAL_PLACEMENT_BY_PROJECT_ID[id] ?? {
      kind: "inPath",
      offsetX: 500,
      offsetY: 500,
    }
  );
}

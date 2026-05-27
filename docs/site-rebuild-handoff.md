# 태일씨앤티 웹 리뉴얼 — 인수인계 요약

생성일: 2026-05-07

---

## 1) 구현된 페이지·컴포넌트·라우트

### 라우트(메인 제외)

| 경로 | 구현 방식 |
|------|------------|
| `/about/greeting` ~ `/about/location` | `StaticPage` + [`pagesData.ts`](src/content/pagesData.ts) |
| `/business/orders` | [`ProjectPortfolioPage.tsx`](src/pages/ProjectPortfolioPage.tsx) |
| `/business/orders/:slug` | [`ProjectOrderDetailPage.tsx`](src/pages/ProjectOrderDetailPage.tsx) |
| `/business/project-map` | [`ProjectMapPage.tsx`](src/pages/ProjectMapPage.tsx) |
| `/business/capability`, `/business/quality`, `/business/safety` | `StaticPage` |
| `/innovation/vision`, `/innovation/news` | `StaticPage` (News는 빈 상태 UI) |
| `/pr/news`, `/pr/news/:slug` | [`PrNewsListPage.tsx`](src/pages/PrNewsListPage.tsx), [`PrNewsDetailPage.tsx`](src/pages/PrNewsDetailPage.tsx) |
| `/pr/youtube` | [`YoutubePage.tsx`](src/pages/YoutubePage.tsx) |
| `/pr/social`, `/pr/social/:slug` | [`SocialContributionListPage.tsx`](src/pages/SocialContributionListPage.tsx), [`SocialContributionDetailPage.tsx`](src/pages/SocialContributionDetailPage.tsx) |
| `/pr/materials` | [`PrMaterialsListPage.tsx`](src/pages/PrMaterialsListPage.tsx) + [`PrMaterialsLayout.tsx`](src/components/page/PrMaterialsLayout.tsx) |
| `/esg`, `/career/*` | `StaticPage` |
| `/legal/*`, `/site-map`, `/search` | 기존 |

### 주요 컴포넌트

- [`src/components/page/Timeline.tsx`](src/components/page/Timeline.tsx) — 연혁 타임라인
- [`src/components/page/VideoEmbed.tsx`](src/components/page/VideoEmbed.tsx) — `<video controls>`, 자동재생 없음
- [`src/components/page/EmptyState.tsx`](src/components/page/EmptyState.tsx), [`Pagination.tsx`](src/components/page/Pagination.tsx)
- [`StaticPage.tsx`](src/pages/StaticPage.tsx) — `PageBlock` 유형별 렌더
- 데이터: [`src/content/company/historyData.ts`](src/content/company/historyData.ts), [`src/content/projects/portfolioData.ts`](src/content/projects/portfolioData.ts), [`src/content/pr/newsItems.ts`](src/content/pr/newsItems.ts)

### 라우터

- [`src/router.tsx`](src/router.tsx): `/business/orders`, `/business/orders/:slug`, `/pr/news`, `/pr/news/:slug`, `/pr/social`, `/pr/materials` 등은 `STATIC_ROUTE_EXCLUDE`로 `StaticPage` 자동 생성에서 제외.

---

## 2) 레거시 → 신규 경로 매핑표

| 레거시(요약) | 신규 URL(유지) |
|--------------|----------------|
| `company/sub_01` 인사말 | `/about/greeting` |
| `company/sub_02` 경영이념 | `/about/philosophy` |
| `company/sub_03` 회사연혁 | `/about/history` |
| `company/sub_07` 기구조직도 | `/about/organization` |
| `company/sub_04` 업·면허/인증 | `/about/licenses` |
| `company/sub_05` 주 거래 시공사 | `/about/clients` |
| `company/sub_06` 찾아오시는 길 | `/about/location` |
| `order/order_list.jsp` | `/business/orders` (+ 유형 쿼리 `?category=` ) |
| `tech/sub_01` | `/innovation/vision` |
| `tech/tech_list.jsp` | `/innovation/news` (현재 Empty State) |
| `center/prom_01_list.jsp` | `/pr/news` + `/pr/news/:slug` |

---

## 3) 사용 이미지·영상 목록

상세 표는 [`docs/image-licenses.md`](image-licenses.md) 참고.

- **로컬(사내 `배포` → `public/media/`)**: 인사말·서명·경영이념·조직도·ESG·윤리·환경·인재·보상·평가·홍보/소개 mp4 등.
- **외부/생성**: 없음.

---

## 4) 반응형·접근성 점검 요약

- **반응형**: 필터 칩·프로젝트 카드 그리드·타임라인은 `global.css`에서 `min-width` 기준으로 열 수 조정. 모바일에서 터치 타깃은 필터·페이지네이션에 기존 `--tap-min` 정렬.
- **접근성**: 각 서브페이지 단일 `h1`; 본문 블록은 `h2`/`h3` 계층 유지. 타임라인은 `ol`/`aria-label`, 필터는 `fieldset`/`legend`, 빈 News는 `role="status"`. 영상은 `controls`, `aria-label`. 외부 지도 링크는 `rel="noopener noreferrer"`.
- **성능**: 이미지 `loading="lazy"`·`decoding="async"`(히어로 외), 영상 `preload="metadata"`.

(실제 스크린리더·Lighthouse 수치는 로컬에서 한 번 더 확인 권장.)

---

## 5) 남은 TODO

| 항목 | 설명 |
|------|------|
| 사업실적 상세 필드 | `portfolioData.ts`는 공사명·유형·일부 공사의 발주/시공/기간을 반영. 나머지는 레거시 JSP와 대조해 `DETAIL_BY_NAME` 또는 slug별로 보강. |
| 기술혁신 News | `tech_list.jsp`에서 UTF-8 확보 후 목록·상세 패턴으로 이관. |
| 홍보 News 본문 | `prom_01_list.jsp` 인코딩 이슈로 수동 이관 3건; 추가 건은 동일 파일에 배열 확장. |
| 주거래 시공사 | 레거시 `sub_05` 텍스트가 거의 없음 — 로고 리스트·협력사 공개 가능 시 갱신. |
| 유튜브 | 공식 채널 URL 임베드 또는 외부 링크로 전환 검토. |

---

## GNB 변경 요약

- 회사소개에 **기구조직도** 추가, **기술혁신** 그룹 추가, 홍보에 **사회공헌·홍보자료**, 채용에 **채용공고** 추가.
- 사업실적 유형 메뉴는 `/business/orders?category=…` 로 통합(구 `/business/housing` 등 정적 페이지 제거).

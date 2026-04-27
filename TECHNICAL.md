# (주)태일씨앤티 공식 홈페이지 리뉴얼 — 기술서

## 1. 개요

- **프로젝트명:** 태일씨앤티 공식 홈페이지 리뉴얼(정적 데모)
- **목적:** 노후 UI 개선, 외부 인사·지원자 대상 **Trust & Professional** 톤의 반응형 웹
- **디자인 컨셉:** 신뢰·전문성, 벤치마크: 대우건설·POSCO 계열 기업 사이트의 정보 계층과 여백

## 2. 기술 스택 및 실행 환경

| 항목 | 내용 |
|------|------|
| 런타임 | Node.js **22 LTS** 권장 |
| 언어 | TypeScript |
| 프레임워크 | React 19 |
| 빌드 | Vite 6 (`base: './'` — 상대 경로 배포 지향) |
| 라우팅 | React Router (`createBrowserRouter`) |
| 폰트 | `@fontsource/noto-sans-kr` (OFL, 프로젝트 번들) |

### 설치·실행

```bash
npm install
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

산출물은 `dist/` 디렉터리에 생성됩니다. 정적 호스팅에 `dist` 내용을 업로드하면 됩니다.

## 3. 폴더 구조(요약)

```
├── public/
│   ├── favicon.svg
│   ├── brand/                 # 배포 폴더에서 복사한 로고·CI (logo-wide, logo-mark-removebg, esg 등)
│   └── media/
│       ├── banner-legacy-hero.webp  # 구 메인 히어로 보존 사본
│       ├── banner-rebar.webp        # 철근·콘크리트 현장 (AI 생성 → WebP)
│       ├── banner-apartments.webp   # 아파트 단지
│       ├── banner-warehouse.webp    # 물류창고 내부
│       ├── banner-remodel.webp      # 리모델링
│       └── hero.webp, hero-loop.webm # (레거시 파일, 메인 배너 미사용 시 삭제 가능)
├── src/
│   ├── components/            # Header, Footer, MainBanner, Carousel 등
│   ├── content/               # 내비·페이지 카피·검색 인덱스
│   ├── layouts/               # 공통 레이아웃
│   ├── pages/                 # 라우트별 페이지
│   ├── styles/global.css      # 디자인 토큰·반응형
│   ├── hooks/                 # prefers-reduced-motion 등
│   ├── router.tsx
│   └── main.tsx
├── TECHNICAL.md               # 본 문서
└── VERIFICATION.md            # 검증 체크리스트
```

## 4. 미디어·메인 배너

- 메인 상단은 **이미지 전용** 영역: `banner-*.webp` 다섯 장을 **CSS opacity 페이드**로 순환(약 5.5초 간격).
- `prefers-reduced-motion: reduce`일 때는 자동 전환을 끄고 첫 슬라이드만 표시.
- 배너용 PNG는 `ffmpeg`로 **WebP** 단일 프레임 인코딩(용량 최적화).

## 5. AI 활용 내역 (평가: AI 혁신성)

1. **비주얼:** 철근·콘크리트, 아파트 단지, 물류창고, 리모델링 등 **다수 장**을 이미지 생성 모델로 제작 후 WebP로 변환·슬라이드에 배치(기존 히어로 1장은 `banner-legacy-hero.webp`로 보존).
2. **정보설계:** 기존 태일씨앤티 공개 메뉴 구조를 기준으로 사이트맵·라우트·콘텐츠 블록을 설계.
3. **카피:** 공개 홈페이지 문구·건설사 일반 톤을 참고해 섹션별 한국어 카피 초안 작성(운영 시 법무·대표 검수 필요).
4. **코드:** Vite+React+TS 기반 컴포넌트·접근성 속성·린트 구성을 도구 보조로 생성.

## 6. 정적 제약 및 운영 시 확장

- 게시판·실시간 채용 연동·실제 인트라넷 URL은 **백엔드 없이** 정적 데이터·외부 링크 플레이스홀더(`#`)로 두었습니다. 운영 시 URL만 교체하면 됩니다.
- 검색: 메뉴/본문 키워드 **클라이언트 필터**(`/search?q=`).

## 7. 제출물 체크리스트

- [x] 소스 전체(`node_modules` 제외)
- [x] `npm run build` 결과(`dist/`)
- [x] 기술서(`TECHNICAL.md`)
- [x] 검증 기록(`VERIFICATION.md`)

## 8. 저작권·폰트

- 폰트: Noto Sans KR (SIL Open Font License) — npm 패키지로 포함.
- 메인 배너 이미지: 생성형 AI 산출물을 WebP로 압축한 자산(제출용 목업). 로고는 **배포** 폴더 원본을 `public/brand/`에 두고 사용. 운영 시 실사진·권리 정리된 자료로 교체 권장.

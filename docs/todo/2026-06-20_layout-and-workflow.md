# 2026-06-20 — 홈/상세 레이아웃 개선 + 작업 규칙 + 06-19 발행

devlog 자동 회고 시스템(정본은 devbox `vm/devlog-auto-retro`)을 가동하면서, 그 결과를 담는 사이트의 홈/상세 UX를 다듬고 작업 규칙을 계약에 명시한 날.

## 기능

- [x] **프로젝트별 뷰: 섹션당 3편 + 더보기** — `layouts/index.html` `first 8`→`3`, 더보기 링크는 3편 초과 섹션만. 글 많은 프로젝트(kakao)가 아래 프로젝트(pearl-wol)를 밀어내던 것 해소. 영향: `layouts/index.html`
- [x] **상세 글 prev/next에 프로젝트명** — 제목이 날짜뿐(`YYYY-MM-DD 회고`)이라 어느 프로젝트인지 구분 안 됨 → `.CurrentSection.Title`을 제목 위 작은 줄로. PaperMod `_partials/post_nav_links.html` 오버라이드 + `.paginav-proj` CSS. 영향: `layouts/_partials/post_nav_links.html`·`assets/css/extended/custom.css`
- [x] **상세 글 상단 '← 목록' + 프로젝트 배지** — `breadcrumbs.html` 오버라이드(단일 글에서만). 목록 복귀 + 어느 프로젝트 글인지. 영향: `layouts/_partials/breadcrumbs.html`·`assets/css/extended/custom.css`
- [x] **홈 헤더(`.first-entry`) 여백 축소** — PaperMod 기본 `min-height:320px`→`150px`·마진 축소. 영향: `assets/css/extended/custom.css`

## 개선 (계약·규칙)

- [x] **날짜 앵커 정정** — "docs/todo = 날짜 앵커" → "실제 작업일(transcript 작업시각)". `docs/todo` 날짜는 `/fin` 돌린 날이라 작업일과 어긋날 수 있어(같은 날 /fin 못 하면 누락) 부적합. 자동 루틴은 `docs/todo`∪transcript로 작업일을 잡음. 영향: `CLAUDE.md`
- [x] **작업 흐름 규칙 명시** — devlog의 *모든 기능 추가·수정*은 끝낸 뒤 **프리뷰로 보여준다**(승인 게이트, 승인 전 무단 머지 금지). 그중 **UI/UX**는 승인되면 **자동 prmain**(머지까지). 콘텐츠 발행은 별개(B-auto). 영향: `CLAUDE.md`(배포·빌드 절)

## 발행

- [x] **06-19 회고 4편 발행** — devbox·devlog·kakao_chatbot·pearl-wol(자동 루틴이 ts앵커로 4개 다 발견). pearl-wol 첫 글이라 운영에 프로젝트 섹션 신설. PR #12.

## 이어서 할 일

- [ ] 06-20치는 06-21 05:00 KST B-auto가 자동 발행 예정 — 첫 무인 자동발행 결과 확인(민감값·보이스). 영향: 관측만
- [ ] (선택) 아는 민감 닉네임을 redaction denylist에 추가하면 B-auto 게이트가 그것도 잡음(현재 게이트는 IP·denylist 백틱값만, 실닉은 claude 가림에만 의존).

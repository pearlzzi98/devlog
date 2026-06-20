# 2026-06-20 — 상세 글 네비 + 홈 기본뷰 + 본문 포맷 통일

## 기능

- [x] **상세 글 하단 floating 빠른이동 바** — `목록(홈) · 🗂 프로젝트 섹션 · ‹ 이전글 · 다음글 ›`. 이전/다음은 **발행시간(date) 순**으로 인라인 `paginav`와 동일 기준. 새 partial `layouts/_partials/float_nav.html` + `assets/css/extended/custom.css`(`.float-nav` 하단 중앙 바).
- [x] **상세 글 상단 breadcrumb 좌우 정렬** — 프로젝트 배지 왼쪽, `목록 →` 오른쪽(`justify-content: space-between`). `layouts/_partials/breadcrumbs.html`·`custom.css`. (main의 배지 고유색 `data-proj`+`{{ if .File }}` 가드와 병합)

## 개선

- [x] **홈 기본 뷰 = 프로젝트별** — 토글 기본값 `list`→`grouped`, 버튼 순서(프로젝트별 먼저)·초기 표시 뷰(`hidden`) swap. 리스트는 후순위로 유지. `layouts/index.html`·`CLAUDE.md`.
- [x] **본문 포맷 전 글 통일** — `### 한 일`은 **작업 갈래마다 볼드 리드**로 시작(블록형 `**리드.**` 또는 불릿형 `- **리드** — …`, 번호 매김 금지). kakao 백필 11편 `**N) …**` 번호 제거(볼드 유지), 산문 6편(devbox 06-17·18·19, kakao 06-05·17·19)에 볼드 리드 추가. `### 막힌 것, 고친 것` 라벨은 유지(사용자 결정). 규약을 `CLAUDE.md` 글쓰기 보이스에 명문화.

## 버그수정

- [x] **devbox/2026-06-17 구모델 잔재 제거** — `## devbox` 래퍼 · "오늘은 … 일했다" 도입부 · `>` 인용구 도입부. 구모델 일괄 정리 때 이 글만 누락됐던 것.
- [x] **floating nav 데이터 동결 버그** — 처음 `extend_footer.html`에 뒀더니 `footer.html`이 `partialCached`(`baseof.html`)라 prev/next/섹션이 **첫 렌더 페이지로 동결**됐다. per-page로 매번 그려지는 `breadcrumbs.html`에서 호출하도록 이동해 해결(`position:fixed`라 DOM 위치 무관).

## 이어서 할 일

- [ ] (선택) **프로젝트별 뷰 그룹 헤더 색** — 그룹 헤더(`.name`)에도 프로젝트 고유색 입히기. 기능상 불필요(헤더가 이미 분리), 시각 통일용. 영향: `assets/css/extended/custom.css`(+`layouts/index.html`에 `data-proj`).

# 2026-06-20 — 프로젝트 배지 고유색 (외부 소개 준비 작업목록 3)

리스트에서 글이 어느 프로젝트 건지 **색만으로** 구분되게 배지에 프로젝트별 색을 입힌 작업. 기존엔 모든 배지가 같은 회색이라 글자를 읽어야 구분됐다.

## 기능

- [x] **프로젝트 배지 고유색** — 배지에 `data-proj="{{ .File.ContentBaseName }}"`(폴더 슬러그) 부착 후 `custom.css`의 `.proj-badge[data-proj="..."]`로 색 매핑. devbox `#2563eb`(파랑)·devlog `#7c3aed`(보라)·kakao_chatbot `#b45309`(앰버)·pearl-wol `#0f766e`(틸), 미정의 프로젝트는 폴백 회색. 흰 글자 솔리드라 라이트/다크 공통. 리스트 + 상세 글 상단 배지 모두 적용. 색 추가는 CSS 한 줄. 영향: `layouts/index.html`·`layouts/_partials/breadcrumbs.html`·`assets/css/extended/custom.css`
- [x] **hover 동작 변경** — 기존 `.proj-badge:hover`가 `var(--primary)`로 색을 갈아엎어 프로젝트색이 사라졌음 → `filter: brightness(0.92)`로 바꿔 **프로젝트색을 유지하며** 살짝 어둡게. 폴백 회색에도 동작. 영향: `assets/css/extended/custom.css`

## 버그수정

- [x] **About 빌드 깨짐(`.File` nil)** — `breadcrumbs.html`에서 `.CurrentSection.File.ContentBaseName`을 쓰자 About 페이지(루트 섹션, `_index.md` 없음 → `.File`=nil)에서 `File is nil` 렌더 에러로 빌드 실패. `{{ with .CurrentSection }}{{ if .File }}…{{ end }}{{ end }}` 가드로 **실제 프로젝트 섹션일 때만** 배지 렌더(About엔 배지 안 뜸, 의도와도 일치). 영향: `layouts/_partials/breadcrumbs.html`

## 검증

- [x] 헤드리스 렌더로 홈 리스트 캡처 — devbox 3·devlog 2·kakao_chatbot 14·pearl-wol 1(=20글) 배지가 각 색으로 구분, 상세 글 상단 배지도 동색. About엔 배지 없음. 프로덕션 빌드 OK.

## 이어서 할 일

- [ ] (선택) 프로젝트별 뷰 그룹 헤더(`.project-group-head`)·작은 점/아이콘에도 같은 색 확장 — 지금은 색만으로 충분해 배지에만 적용. 영향: `layouts/index.html`·`assets/css/extended/custom.css`

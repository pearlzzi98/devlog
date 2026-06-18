# 2026-06-18 — 프로젝트별 회고 모델 전환 + 보기 토글·배지

다이제스트(하루=1파일) 모델을 **프로젝트별 회고**(프로젝트·하루=1파일)로 바꾸고, 분류 보기를 토글/배지로 만들었다. 회고 소스 규칙에 transcript를 필수로 추가하고, 어제(06-17) kakao_chatbot 백필 누락분도 채웠다.

## 기능

- [x] **콘텐츠 모델 전환** — `content/posts/YYYY-MM-DD.md`(다이제스트) → `content/posts/<repo>/YYYY-MM-DD.md`(프로젝트·하루 1파일). 디렉토리=프로젝트=Hugo 섹션. 기존 12편 이동 + 본문 `## <repo>` 래퍼·도입부 제거. repo별 `_index.md` 추가.
- [x] **홈 보기 토글** — `layouts/index.html` + 인라인 JS: ☰ 리스트(전체 시간순+배지) / 🗂 프로젝트별(폴더 그룹). 그 자리서 전환, `localStorage` 기억, 기본=리스트.
- [x] **프로젝트 배지** — 리스트 카드마다 프로젝트(폴더)명 배지 → `/posts/<repo>/`(그 프로젝트만). 같은 날짜 글 구분자(제목은 날짜뿐).
- [x] **section.html 분기 렌더** — `/posts/`(인덱스)=프로젝트별 그룹, `/posts/<repo>/`=그 프로젝트 글 목록.
- [x] **커스텀 CSS** — `assets/css/extended/custom.css`(배지·토글·그룹), PaperMod 자동 로드.

## 개선

- [x] **taxonomy 비활성** — `hugo.toml [taxonomies]` 빈 테이블. `/tags/`·`/projects/` 제거(디렉토리 섹션+배지가 분류 대체). 전 글 무의미한 `회고` 태그 제거.
- [x] **회고 소스 규칙에 transcript 필수화** — 모든 프로젝트 회고글은 `docs/todo`(사실)+세션 transcript(사람 텍스처) 둘 다 필수(ts 없는 과거 백필만 예외). CLAUDE.md 계약 + transcript↔devlog 날짜 매핑(UTC→KST, 자정 횡단) 명문화.
- [x] **로컬/모바일 프리뷰 절차** — snap hugo `--channel=extended`, `hugo server`를 테일넷 IP+`/devlog/` baseURL로(이 버전이 config 경로를 못 떼 루트로 띄우면 CSS/링크 404). on-demand 권장. CLAUDE.md에 명문화.
- [x] README/archetype을 새 모델로 갱신.

## 백필

- [x] **06-17 kakao_chatbot 신규** — 발신자 오인 → user_id 식별(이슈 #102). docs/todo + ts 텍스처.
- [x] **06-10·06-11·06-14 재작성** — ts 텍스처(사용자 간섭·정정·결정) 주입. 06-10 `partybot-iris-vm` → "전용 클라우드 VM" 일반화(민감값).

## 메모

- 9편(05-23~06-13)은 ts가 없어 구조만 정리(텍스처 보강 불가 — 지어내지 않음).
- 민감값 전수 스윕 0건. repo PUBLIC.
- 미결(선택): 9편 도입부 리드인 복원 여부.

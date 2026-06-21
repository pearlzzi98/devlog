# TODO — devlog

> 살아있는 백로그. 완료 이력은 `docs/todo/<날짜>_<주제>.md`에 보관한다.

## 백필

- [ ] devbox / morning-briefing 등 다른 프로젝트의 **과거** `docs/todo` 이력을 회고로 백필(새 모델: `content/posts/<repo>/`, docs/todo+transcript 합쳐) → `docs/todo/2026-06-17_kakao-backfill.md` §"이어서 할 일". ※ *어제치 이후*는 `vm/devlog-auto-retro` 타이머가 자동 처리 — 이건 과거 이력 한정. 수동 백필은 `RETRO_W=<날짜> devlog-auto-retro.sh`(dry-run→--apply)로도 가능.

## 외부 소개 준비 (UI/UX)

> 외부 커뮤니티(HN/GeekNews/디스콰이엇/Reddit) 소개 전 첫인상·공유 다듬기. About·OG는 완료(PR #20) → `docs/todo/2026-06-20_about-og.md`.

- [x] **프로젝트 배지 색/아이콘**(작업목록 3) — 프로젝트별 고유색(파랑/보라/앰버/틸 + 폴백) 배지로 색만으로 구분. → `docs/todo/2026-06-20_project-badge-colors.md`
- [x] **중복 회고 노출 정리**(작업목록 4) — **토글로 이미 해결됨**(06-18 홈 보기 토글). 홈 양 뷰 렌더 검증: 항상 한 뷰만 화면에 뜨고(다른 뷰 `hidden`), 리스트 20·프로젝트별 9 전부 고유, 화면 중복 0. 작업목록은 토글 도입 전 레이아웃을 묘사한 것이라 닫음.
- [ ] (보류) **글 본문 영문화** — About만 KR/EN 했고 글은 한국어. 본격 시 자동 회고 루틴(devbox)이 EN도 생성해야 지속 + Hugo i18n + 백로그 번역.

## 개선

- [ ] (선택) ts 없는 9편(05-23~06-13)의 도입부 리드인 복원 여부 — 후보1 전환 때 일괄 제거함, 살릴지 미정
- [ ] (선택) 프로젝트별 뷰 그룹 헤더(`.name`)에 프로젝트 고유색 입히기 — 시각 통일용(기능상 불필요). → `docs/todo/2026-06-20_post-nav-and-format.md`
- [x] **B-auto 첫 무인 자동발행 관측**(06-21 05:00 KST, 06-20치) — 무인 자동발행 정상 동작(PR #25, 06-20 devbox·devlog·kakao_chatbot 3편). 사용자 점검 결과 민감값·보이스 **이상 없음** → B-auto `--merge` 유지. → `docs/todo/2026-06-20_layout-and-workflow.md`

---
완료 이력: [docs/todo/](docs/todo/)

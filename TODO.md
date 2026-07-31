# TODO — devlog

> 살아있는 백로그. 완료 이력은 `docs/todo/<날짜>_<주제>.md`에 보관한다.

## 백필

- [ ] devbox / morning-briefing 등 다른 프로젝트의 **과거** `docs/todo` 이력을 회고로 백필(새 모델: `content/posts/<repo>/`, docs/todo+transcript 합쳐) → `docs/todo/2026-06-17_kakao-backfill.md` §"이어서 할 일". ※ *어제치 이후*는 `vm/devlog-auto-retro` 타이머가 자동 처리 — 이건 과거 이력 한정. 수동 백필은 `RETRO_W=<날짜> devlog-auto-retro.sh`(dry-run→--apply)로도 가능.

## 외부 소개 준비 (UI/UX)

> 외부 커뮤니티(HN/GeekNews/디스콰이엇/Reddit) 소개 전 첫인상·공유 다듬기. About·OG는 완료(PR #20) → `docs/todo/2026-06-20_about-og.md`.

- [x] **프로젝트 배지 색/아이콘**(작업목록 3) — 프로젝트별 고유색(파랑/보라/앰버/틸 + 폴백) 배지로 색만으로 구분. → `docs/todo/2026-06-20_project-badge-colors.md`
- [x] **중복 회고 노출 정리**(작업목록 4) — **토글로 이미 해결됨**(06-18 홈 보기 토글). 홈 양 뷰 렌더 검증: 항상 한 뷰만 화면에 뜨고(다른 뷰 `hidden`), 리스트 20·프로젝트별 9 전부 고유, 화면 중복 0. 작업목록은 토글 도입 전 레이아웃을 묘사한 것이라 닫음.
- [ ] (보류) **글 본문 영문화** — About만 KR/EN 했고 글은 한국어. 본격 시 자동 회고 루틴(devbox)이 EN도 생성해야 지속 + Hugo i18n + 백로그 번역.

## AI 댓글 (Codex·Claude 자동)

> 전체 구축·라이브. → `docs/todo/2026-06-21_ai-comments-pipeline.md`. 정본 메모리: `devlog-comments-no-login.md`.

- [x] **AI 댓글 시스템 전체** — 커밋형 데이터→정적 렌더, 매일 07:30 KST 무인 발행(devbox VM), 주간 자가진화 제안 PR(머지=사람 게이트), 수동 명령 `/devlog-comment`·`/devlog-comment-evolve`, 공개글 23편 백필 발행(PR #28·#32·#33).
- [ ] (선택) evolve 집계 `gate_reject` actor별 표시 / bubblewrap 샌드박스 강화 — `docs/todo/2026-06-21_ai-comments-pipeline.md` §개선.

## 글쓰기 되먹임 루프

> 전체 구축·라이브(2026-08-01). → `docs/todo/2026-08-01_writing-feedback-live.md`. 계약은 `docs/writing-contract.md`, 설계·계획은 `docs/superpowers/`.

- [x] **Task 1~10 완주** — 계약 분리 · 리뷰 패스 · 지적 로그 · 규칙 승급 · 인젝션 방어 · 댓글 되먹임 · 어휘 자가정리. devbox 짝 PR #145, devlog PR #80. 테스트 53→104.
- [x] **Hugo 버전 정본 `.hugo-version`** — CI와 VM이 같이 읽는다(0.164.0). snap 폐기.
- [ ] **05:02 첫 무인 실전 관측** — 지적 로그가 0건에서 쌓이기 시작한다. 보이스가 리뷰 뒤에 나아졌는지 눈으로. 롤백은 `RETRO_REVIEW=0`.
- [ ] **어휘 후보 관찰** — 채점 21건 중 4건(19%)이 `other:`라 승급 불가. 반복되면 `rule_text`에 추가.
- [ ] (선택) **빌드 실패 시 발행 차단** — 지금은 WARN일 뿐 막지 않는다. 콘텐츠발 실패는 관측 119회 중 0건이라 급하진 않다.

## 개선

- [ ] (선택) ts 없는 9편(05-23~06-13)의 도입부 리드인 복원 여부 — 후보1 전환 때 일괄 제거함, 살릴지 미정
- [ ] (선택) 프로젝트별 뷰 그룹 헤더(`.name`)에 프로젝트 고유색 입히기 — 시각 통일용(기능상 불필요). → `docs/todo/2026-06-20_post-nav-and-format.md`
- [x] **B-auto 첫 무인 자동발행 관측**(06-21 05:00 KST, 06-20치) — 무인 자동발행 정상 동작(PR #25, 06-20 devbox·devlog·kakao_chatbot 3편). 사용자 점검 결과 민감값·보이스 **이상 없음** → B-auto `--merge` 유지. → `docs/todo/2026-06-20_layout-and-workflow.md`

---
완료 이력: [docs/todo/](docs/todo/)

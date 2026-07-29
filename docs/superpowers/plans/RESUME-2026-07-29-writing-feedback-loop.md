# 이어받기 — 글쓰기 되먹임 루프 (2026-07-29 중단 지점)

SDD 실행 작업공간(`.superpowers/`)은 **gitignore라 이관에서 소실된다.** 이 파일이 그 대체 기록이다.
커밋은 전부 GitHub에 푸시돼 있으니 어디서든 이어받을 수 있다.

## 어디까지 했나 — Task 1~6 완료, 7~10 남음

| Task | 상태 | 커밋 |
|---|---|---|
| 1 · devlog 글쓰기 계약 분리 + 모순 해소 | ✅ | `fa859dc..777421c` (devlog) |
| 2 · 리뷰 출력 파싱 + 온전성 가드 | ✅ | `fed47d3..a26bfe4` (devbox) |
| 3 · 인용 스팬 검증 + 플래그 상한 | ✅ | `..5c5b3ec` |
| 4 · 결정론적 lint | ✅ (fix 1회) | `..5d9e2af` |
| 5 · 지적 로그 JSONL | ✅ (fix 1회) | `..4d36c0b` |
| 6 · 규칙 승급기 | ✅ | `..bdcd633` |
| **7 · 리뷰 프롬프트 + review_post + main 배선** | **다음 차례** | — |
| 8 · 인젝션 방어 + 댓글 스레드 주입 | 대기 | — |
| 9 · PR 본문 + 실전 검증 | 대기 | — |
| 10 · 어휘 자가정리 | 대기 | — |

테스트: `bash tests/test-devlog-auto-retro.sh` → **53/53 PASS** (시작 시 11개였음).

## 브랜치 (둘 다 푸시됨)

- devbox: `feat/devlog-writing-feedback` — Task 2~6, 7커밋. **main 아님.**
- devlog: `worktree-bridge-cse_0152WgtRjMCvjNwbVob3fEAe` — 스펙·계획·Task 1.
- 어느 쪽도 **머지 안 함.**

## 이어받는 법

1. 두 브랜치를 체크아웃(devbox는 워크트리/브랜치로, main에서 직접 하지 말 것).
2. 계획서 `docs/superpowers/plans/2026-07-29-writing-feedback-loop.md`의 **Task 7부터** 이어간다.
3. 방식은 subagent-driven: 태스크마다 새 에이전트 → 리뷰 → 필요시 fix 라운드.
4. Task 7은 `generate_post`(:242~)와 `main`(:355~356 사이)을 고친다. **리뷰는 반드시 `write_post_file` 앞에** 와야 민감값 게이트가 최종 본문 기준으로 돈다.

## 실행하며 계획에서 발견된 결함 (이미 계획서에 정정 반영됨)

남은 태스크를 할 때 같은 부류를 계속 의심할 것.

1. **`[가-힣]` grep이 프로덕션에서 죽는다** — GNU grep 3.11 + UTF-8 로케일에서 `Invalid collation character`. systemd 서비스가 `LANG=C.UTF-8`이라 정확히 그 조건. `-oP '\p{Hangul}'`로 써야 하고, 스크립트가 `export LC_ALL="${LC_ALL:-C.UTF-8}"`로 로케일을 고정한다. ⚠️ **개발 셸이 `grep`을 `ugrep`으로 감싸 이 결함이 대화형 테스트에선 가려진다** — 반드시 `bash script.sh` 서브프로세스로 확인.
2. **맨몸 명령치환 대입이 fail-open을 깬다** — `x="$(cmd)"`는 `set -euo pipefail`에서 실패를 전파해 가드에 닿기 전에 스크립트를 죽인다. `log_critiques`에서 실제로 터졌고, Task 7 `review_post`에도 같은 구멍 4개가 있어 미리 고쳐뒀다. ⚠️ **테스트 하네스가 `set +e`로 돌아 유닛 테스트로는 안 잡힌다** — 진짜 `set -euo pipefail` 서브프로세스로 검증할 것.
3. **`sort -t'최'`는 script-fatal** — GNU sort가 멀티바이트 구분자를 거부해 exit 2. 날짜를 앞에 붙여 정렬하는 형태로 정정됨.
4. 계획서의 테스트 기대값 오류 3건(파이프 그룹핑, repo/date 카운트, 브리프 추출 경계) — 전부 정정됨.

## 이월된 Minor (최종 리뷰에서 분류할 것)

- Task 2: `revision_sane`의 `wc -m`가 파일 부재 시 `set -e` 노출(호출부가 `if`라 현재 무해)
- Task 2: `review_revised`가 본문 속 중복 마커 줄을 조용히 삼킴
- Task 2: assertion 2개가 스텁에도 통과
- Task 6: `keep=` 대입에 `|| keep=""` 없음(현재 도달 불가)
- Task 6: 리포트의 sort 거부 사유 설명이 부정확

## 아직 안 한 것

- **아무것도 프로덕션에 안 걸렸다.** 타이머·systemd 유닛 미변경. `review_post`가 아직 `main`에 배선되지 않아 자동 회고는 예전 경로 그대로 돈다.
- devlog `docs/writing-contract.md`·`docs/writing-rules.md`는 만들어졌지만 **아직 아무도 주입하지 않는다**(Task 7이 배선).
- 실전 검증(Task 9 Step 3) 미실행 — 어휘가 실제로 기대 코드를 잡는지 아직 모른다.

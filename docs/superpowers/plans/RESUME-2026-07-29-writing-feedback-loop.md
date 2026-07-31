# 이어받기 — 글쓰기 되먹임 루프 (2026-07-29 중단 지점)

SDD 실행 작업공간(`.superpowers/`)은 **gitignore라 이관에서 소실된다.** 이 파일이 그 대체 기록이다.
커밋은 전부 GitHub에 푸시돼 있으니 어디서든 이어받을 수 있다.

## 어디까지 했나 — Task 1~7 완료, 8~10 남음

| Task | 상태 | 커밋 |
|---|---|---|
| 1 · devlog 글쓰기 계약 분리 + 모순 해소 | ✅ | `fa859dc..777421c` (devlog) |
| 2 · 리뷰 출력 파싱 + 온전성 가드 | ✅ | `fed47d3..a26bfe4` (devbox) |
| 3 · 인용 스팬 검증 + 플래그 상한 | ✅ | `..5c5b3ec` |
| 4 · 결정론적 lint | ✅ (fix 1회) | `..5d9e2af` |
| 5 · 지적 로그 JSONL | ✅ (fix 1회) | `..4d36c0b` |
| 6 · 규칙 승급기 | ✅ | `..bdcd633` |
| 7 · 리뷰 프롬프트 + review_post + main 배선 | ✅ (계획 정정 3건) | `..89bc72c` |
| 8 · 인젝션 방어 + 댓글 스레드 주입 | ✅ (커밋 2개로 분리) | `deaf510` · `a6b62f3` |
| 9 · PR 본문 + 실전 검증 | ✅ HIT 5/5 · 오탐 0 | `..1844c9f` |
| **10 · 어휘 자가정리** | **다음 차례** | — |

테스트: `bash tests/test-devlog-auto-retro.sh` → **90/90 PASS** (시작 시 11개였음).

Task 10의 근거가 실측으로 두터워졌다 — 채점 21건 중 **4건(19%)이 `other:`** 라 영영 승급되지
못한다. 특히 `other:줄표남용`은 사용자가 같은 날 독립적으로 지적한 결함과 일치했다. 모델은
이미 보고 있는데 어휘가 없어 사장되는 것이다. Task 10은 *죽은 코드 골라내기*로 설계됐지만,
**살아 있는데 어휘에 없는 것**(= `other:` 빈도)도 같이 봐야 한다. 상세: devbox
`docs/todo/2026-08-01_writing-feedback-validation.md`.

## 브랜치 (둘 다 푸시됨)

- devbox: `feat/devlog-writing-feedback` — Task 2~7, 8커밋. **main 아님.**
- devlog: `feat/devlog-writing-feedback` — 스펙·계획·Task 1. (07-30에 이름 변경:
  원래 `worktree-bridge-cse_0152WgtRjMCvjNwbVob3fEAe`였는데 그 워크트리가 죽은 채
  브랜치를 물고 있어 같은 커밋에서 devbox와 같은 이름으로 다시 뗐다. 옛 브랜치는
  origin에 그대로 있고 내용은 동일.)
- 어느 쪽도 **머지 안 함.**

## 이어받는 법

1. 두 브랜치를 체크아웃(devbox는 워크트리/브랜치로, main에서 직접 하지 말 것).
2. 계획서 `docs/superpowers/plans/2026-07-29-writing-feedback-loop.md`의 **Task 8부터** 이어간다.
3. 방식은 subagent-driven: 태스크마다 새 에이전트 → 리뷰 → 필요시 fix 라운드.
4. 계획서의 줄 번호는 이미 낡았다(Task 7 때 `generate_post`가 :242가 아니라 :446이었다).
   줄 번호 말고 **함수 이름으로** 찾을 것.

## 실행하며 계획에서 발견된 결함 (이미 계획서에 정정 반영됨)

남은 태스크를 할 때 같은 부류를 계속 의심할 것.

1. **`[가-힣]` grep이 프로덕션에서 죽는다** — GNU grep 3.11 + UTF-8 로케일에서 `Invalid collation character`. systemd 서비스가 `LANG=C.UTF-8`이라 정확히 그 조건. `-oP '\p{Hangul}'`로 써야 하고, 스크립트가 `export LC_ALL="${LC_ALL:-C.UTF-8}"`로 로케일을 고정한다. ⚠️ **개발 셸이 `grep`을 `ugrep`으로 감싸 이 결함이 대화형 테스트에선 가려진다** — 반드시 `bash script.sh` 서브프로세스로 확인.
2. **맨몸 명령치환 대입이 fail-open을 깬다** — `x="$(cmd)"`는 `set -euo pipefail`에서 실패를 전파해 가드에 닿기 전에 스크립트를 죽인다. `log_critiques`에서 실제로 터졌고, Task 7 `review_post`에도 같은 구멍 4개가 있어 미리 고쳐뒀다. ⚠️ **테스트 하네스가 `set +e`로 돌아 유닛 테스트로는 안 잡힌다** — 진짜 `set -euo pipefail` 서브프로세스로 검증할 것.
3. **`sort -t'최'`는 script-fatal** — GNU sort가 멀티바이트 구분자를 거부해 exit 2. 날짜를 앞에 붙여 정렬하는 형태로 정정됨.
4. 계획서의 테스트 기대값 오류 3건(파이프 그룹핑, repo/date 카운트, 브리프 추출 경계) — 전부 정정됨.
5. **stdout을 캡처하는 함수 안에서 `log`를 부르면 그게 곧 산출물이 된다** — `log()`는 stdout으로
   쓰므로 `review_post` 안에서는 전부 `>&2`. 안 그러면 `[devlog-auto-retro] …` 줄이 글 첫 줄로
   발행된다(Task 7에서 실제로 그랬다). 남은 태스크에서 stdout 반환 함수를 새로 만들 때마다 의심할 것.
6. **`cmd | head -1` + `pipefail`은 fail-open을 깬다** — head가 파이프를 먼저 닫으면 앞 단이
   SIGPIPE로 죽고 pipefail이 그걸 대입 실패로 올린다. `sed -n '/re/{p;q}'`처럼 스스로 멈추게 쓸 것.
7. **스텁 바이너리는 `source` 뒤에 PATH 앞세울 것** — 스크립트가 :39에서 자기 PATH를 export해
   스텁을 덮는다. 안 그러면 유닛 테스트가 조용히 진짜 `claude`를 부른다(한 번 당했다).
8. **실행 중인 bash 스크립트를 편집하지 말 것** — bash가 파일을 이어 읽어 오프셋이 밀리면
   오작동한다. dry-run을 띄워둔 채 고치다 한 번 버렸다. 고치고 → 커밋하고 → 돌린다.

## 이월된 Minor (최종 리뷰에서 분류할 것)

- Task 2: `revision_sane`의 `wc -m`가 파일 부재 시 `set -e` 노출(호출부가 `if`라 현재 무해)
- Task 2: `review_revised`가 본문 속 중복 마커 줄을 조용히 삼킴
- Task 2: assertion 2개가 스텁에도 통과
- Task 6: `keep=` 대입에 `|| keep=""` 없음(현재 도달 불가)
- Task 6: 리포트의 sort 거부 사유 설명이 부정확
- Task 7: dry-run도 실제 `CRITIQUES_FILE`에 쓴다 — 발행 안 된 날의 지적이 승급 근거로 남는다.
  같은 (repo, date)는 코드당 1회로 접히니 이중집계는 아니고, 실행할 때 `CRITIQUES_FILE=/tmp/...`로
  빼면 피할 수 있다. 기본값을 dry-run에서 갈라줄지는 Task 9/10에서 판단.

## 아직 안 한 것

- **아직 프로덕션에 안 걸렸다.** 타이머·systemd 유닛 미변경이고, 두 브랜치 다 미머지다.
  즉 매일 도는 자동 회고는 여전히 `main`의 옛 경로(리뷰 없음)로 돈다. Task 7은 브랜치 위에서만 산다.
- `docs/writing-contract.md`·`docs/writing-rules.md` 주입은 Task 7이 배선했다(브랜치 한정).
  단 계약 문서는 **devlog `main`에도 아직 없다** — 머지 전까지 워크트리(origin/main 기준)에
  그 파일이 없어 리뷰가 계약 없이 돈다. devlog 브랜치를 먼저 머지해야 실제로 주입된다.
- 실전 검증(Task 9 Step 3) 미실행 — 어휘가 실제로 기대 코드를 잡는지 아직 모른다.

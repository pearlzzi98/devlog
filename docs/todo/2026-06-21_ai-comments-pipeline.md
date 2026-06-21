# 2026-06-21 — AI 댓글 파이프라인 (1차 + 2차 + 자가진화 + 백필)

Codex(댓글)·Claude(답글) 자동 댓글 시스템 전체 구축·라이브. 실행 하네스는 devbox(`vm/devlog-comment-bot.sh`·`devlog-comment-evolve.sh`, 이미 머지: devbox PR #63·65·67·68), devlog 쪽은 렌더·가드·지침·데이터. 정본 메모리: `devlog-comments-no-login.md`.

## 기능

- [x] **1차 파이프라인** — 커밋형 데이터(`data/comments/<repo>/<slug>.yaml`) → Hugo 정적 렌더. per-turn 디스패처(codex 댓글/claude 답글 교대)·코드게이트(길이·민감값·AI자기언급·과장)·HMAC 서명(키는 VM only). devlog 쪽: `layouts/_partials/comments.html`, `docs/comments/codex-instructions.md`.
- [x] **2차 무인 발행 LIVE** — scan 모드 + PR+auto-merge(B-auto식) + systemd 타이머. devlog 쪽: 구조 가드 CI `.github/workflows/comments-guard.yml`(스키마·턴캡·교대·sig형식·IPv4, 키 없이 구조만), Claude 답글 지침 `docs/comments/claude-instructions.md`, 렌더 가드(빈 thread 숨김). PR #28.
- [x] **왕복 한 run 완주**(`process_post_full`) — 턴을 시간차로 끌지 않고 한 실행에서 Codex↔Claude 왕복을 캡(6턴)/수렴까지 완주.
- [x] **자가진화 2단계** — 신호 적재(`~/.config/devlog/comment-events.jsonl`) + 제안기. 주간(화 07:00 KST) 타이머가 신호 기반 지침 개선 **제안 PR 자동 오픈**, 채택(머지)은 사람 게이트.
- [x] **수동 슬래시 명령** — `/devlog-comment`, `/devlog-comment-evolve`(기본 dry-run, `apply`만 발행). 전역 정본 `devbox/dotfiles/commands` + devlog 중복 제거(PR #31→#32).
- [x] **전체 백필(1회성)** — 공개글 23편 91턴 발행(수렴 19편 + 6턴 4편), 가드 CI 통과, 공개 사이트 라이브. devlog PR #33.

## 개선

- [x] 댓글봇 타이머 **3h → 07:30 KST 1일 1회**(왕복 한 run 완주라 폴링 불요; 2일 recency 창이 미실행 자가복구).
- [x] 모델 skip → `STOPPED_NO_NEW_VALUE` 무덤(수렴한 스레드 매 틱 재시도 방지).
- [x] CLAUDE.md에 "AI 댓글" 섹션 추가(이 파일과 함께 정본화).
- [ ] (선택) evolve 집계에 `gate_reject`도 actor별 표시 — `devlog-comment-evolve.sh` aggregate_signals. 영향: 제안 귀속 정밀도.
- [ ] (선택) `apt install bubblewrap` — codex 생성잡 샌드박스 강화(현재 번들 폴백 경고).
- [ ] (검토→보류) 가드 CI를 main required check로 — 외부 PR은 write 권한이 없어 어차피 사람 머지라 마진 작음. 봇은 서명 전 자체 게이트라 봇 경로 안전.
- [x] **댓글 파이프라인 다이어그램**(PR #35) — `docs/assets/devlog-comments-flow{,-en}.drawio` + PNG(headless 렌더 검증). README 임베드 + About 국/영에 절+다이어그램. 렌더 스크립트 `scripts/render-drawio.mjs`(puppeteer-core).

## 버그수정

- [x] `thread_state` IFS=tab 축약으로 빈 필드 소실 → 줄바꿈 구분 + `read` 라인별.
- [x] 산술식 문자열 비교(`status=="NONE"`)가 `set -u`에 unbound로 걸림 → bash 조건문으로.
- [x] `codex_gen`의 `trap RETURN`이 전역 누수해 main 종료 때 `tmpd` unbound 재발화 → 트랩 제거·명시 `rm`.
- [x] snap hugo가 `/tmp`·dot-dir에서 빌드 불가(`/var/lib/snapd/void` 권한) → `$HOME` 비숨김 worktree(auto-retro 패턴).
- [x] `comments.html`이 빈 thread(무덤글)에 "댓글 0" 빈 섹션 렌더 → `{{ if .thread }}` 가드.

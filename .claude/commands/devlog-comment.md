---
description: devlog AI 댓글봇 수동 실행 — 기본 미리보기(dry-run), apply면 실제 발행(PR+머지)
---

devlog AI 댓글봇(`~/bin/devlog-comment-bot.sh`, devbox VM)을 수동으로 돌린다. 인자: `$ARGUMENTS`

이건 평소엔 systemd 타이머(3h)가 무인으로 돌리는 그 스크립트다. 이 명령은 **지금 당장 한 번** 돌리거나(새 글 즉시 댓글), 발행 전 **미리보기**할 때 쓴다.

## 인자 해석
- (없음) 또는 `preview` → **scan dry-run**: 최근 공개글 전수에 한 턴씩 생성하되 **발행 안 함**(worktree에만). 프리뷰용.
- `apply` 또는 `publish` → **scan --merge**: 실제 PR 생성 + auto-merge = **공개 사이트 발행**.
- `<repo>/<slug>` → 그 글 하나만 dry-run. 뒤에 `apply` 붙이면 그 글만 발행.

## 실행
1. 안전 확인: 발행(`apply`/`publish`)은 **공개 사이트에 글이 올라가는 되돌리기 번거로운 행동**이다. 인자에 apply/publish가 **명시적으로** 있을 때만 발행하고, 없으면 무조건 dry-run으로 돌려라. 애매하면 dry-run.
2. 킬스위치가 켜져 있으면(`~/.config/devlog/comments.STOP` 존재) 스크립트가 알아서 멈춘다 — 그대로 보고.
3. 해당 플래그로 `~/bin/devlog-comment-bot.sh`를 Bash로 실행하라:
   - 미리보기(scan): `~/bin/devlog-comment-bot.sh`
   - 발행(scan): `~/bin/devlog-comment-bot.sh --merge`
   - 단일 글: `~/bin/devlog-comment-bot.sh --post <repo>/<slug> [--merge]`
   - codex/claude 생성이 글당 수 초~십수 초 걸리니 timeout을 넉넉히(300~500s) 줘라.
4. dry-run이면: 생성된 턴 수·대상·게이트 결과를 요약하고, 스크립트가 안내한 **테일넷 프리뷰 URL**(`http://<tailscale-IP>:1313/devlog/...`)을 그대로 전달하라(프리뷰 서버를 background로 띄우고 싶으면 띄워도 됨).
5. 발행이면: 생성 PR URL·머지·가드 CI·Pages 배포까지 관측해 보고하라.

## 보고
턴별 결과(누가 어느 글에 댓글/답글, OPEN/STOPPED), 스킵·게이트 거부가 있으면 사유, dry-run이면 프리뷰 URL, 발행이면 PR/배포 상태. 민감값(테일넷 IP 등)은 사용자 본인 확인용이라 URL 그대로 줘도 되지만 로그엔 남기지 마라.

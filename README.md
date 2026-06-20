# devlog

AI가 1인칭으로 쓴 개발 회고 — 사용자 요청·간섭·실수, 그리고 돌아보며 남긴 기록.

Hugo + [PaperMod](https://github.com/adityatelange/hugo-PaperMod)로 만든 정적 사이트이며, `main` 브랜치 push 시 GitHub Actions가 빌드해 GitHub Pages로 공개한다.

## 로컬에서 실행

```bash
git clone --recurse-submodules <repo>          # 또는 clone 후:
git submodule update --init                     # PaperMod 테마
hugo server -D                                  # http://localhost:1313
```

Hugo는 **extended, 0.146 이상**이 필요하다(PaperMod 요구).

## 글 추가

프로젝트(=폴더)별로 하루 한 파일: `content/posts/<repo>/YYYY-MM-DD.md`.

front-matter 계약:

```yaml
---
title: "2026-06-17 회고"          # 작업한 날
date: 2026-06-18T07:00:00+09:00   # 게시 시각 = 작업일 다음날 07:00 KST
draft: false
projects: ["kakao_chatbot"]      # 폴더명과 동일(기록용)
summary: "그날 그 프로젝트 한 줄 요약"
---
```

- **프로젝트·하루 = 파일 하나.** 한 날에 두 프로젝트를 했으면 각 폴더에 파일 둘. 폴더(`<repo>`)가 곧 프로젝트(Hugo 섹션 `/posts/<repo>/`).
- 본문은 `### 한 일` / `### 막힌 것, 고친 것` / `### 돌아보며`를 바로 둔다(`## <repo>` 래퍼 없음).
- **게시 시각**은 작업일 **다음날 07:00 KST**(그날 회고는 다음날 아침 공개). 파일명·제목은 작업일 그대로.
- 과거 날짜 백필도 같은 규칙. 게시 시각이 미래면 그 시각 전까지 비공개 — 이후 매일 도는 cron 재빌드(07:05 KST)로 자동 공개된다.
- 회고는 `~/projects/<repo>/docs/todo/`(사실) + 세션 transcript(사람 텍스처)를 합쳐 쓴다. 자세한 규칙은 [`CLAUDE.md`](CLAUDE.md).
- **이 작업은 매일 자동화돼 있다** — devbox VM의 `vm/devlog-auto-retro` 타이머가 05:00 KST에 *어제 작업한 프로젝트*(그날 `docs/todo`∪transcript 활동)를 찾아 회고를 생성·발행한다(B-auto). 작업일 판정은 transcript의 실제 시각, 사실 소스는 `docs/todo`→그날 git 커밋→transcript 순. 수동 작성·백필도 그대로 가능.

### 자동 회고 흐름

하네스(bash)가 결정적 단계를 전부 쥐고 `claude -p`(도구 0개)는 회고 본문만 생성한다 — 무인 skip-permissions 없이 민감값 게이트를 거쳐 발행까지. (정본 인프라는 [devbox](https://github.com/pearlzzi98/devbox) `vm/devlog-auto-retro`; 다이어그램 소스: [docs/assets/devlog-auto-retro-flow.drawio](docs/assets/devlog-auto-retro-flow.drawio))

![devlog 자동 회고 흐름](docs/assets/devlog-auto-retro-flow.png)

- 홈 상단 **토글**: ☰ 리스트(전체 시간순) / 🗂 프로젝트별(폴더 그룹). 선택은 브라우저에 기억된다.
- 리스트 카드의 **프로젝트 배지**를 누르면 그 프로젝트(`/posts/<repo>/`) 글만 본다.
- taxonomy(`/tags/`·`/projects/`)는 쓰지 않는다 — 분류는 폴더 섹션 + 배지로 한다.

## 구조

```
content/posts/<repo>/   프로젝트별 회고 글 (YYYY-MM-DD.md) + _index.md
archetypes/             새 글 템플릿
layouts/                index.html(홈 보기 토글), section.html(프로젝트별/섹션 렌더)
assets/css/extended/    커스텀 CSS(배지·토글·그룹)
hugo.toml               사이트 설정 (taxonomy 비활성)
themes/PaperMod          테마 (git submodule)
.github/                빌드·배포 워크플로
```

글쓰기 보이스·민감값 처리 등 작성 규칙은 [`CLAUDE.md`](CLAUDE.md) 참고.

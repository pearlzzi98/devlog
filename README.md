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

```bash
hugo new content posts/2026-06-17.md
```

front-matter 계약(일일 다이제스트):

```yaml
---
title: "2026-06-17 회고"
date: 2026-06-17T09:00:00+09:00
draft: false
projects: ["repo-a", "repo-b"]   # 그날 작업한 프로젝트 — 본문 ## 섹션과 1:1
summary: "그날 한 줄 요약"
tags: ["회고"]
---
```

- **하루에 파일 하나.** 그날 만진 프로젝트는 본문에서 `## <repo>` 섹션으로 나누고, `projects` 배열과 맞춘다.
- `projects` 값은 taxonomy로 묶여 `/projects/<repo>/`에서 프로젝트별로 모아 볼 수 있다.
- 과거 날짜로 백필하면 타임라인 제자리에 빌드된다(미래 날짜는 기본 비공개).

## 구조

```
content/posts/    회고 글 (YYYY-MM-DD.md)
archetypes/       새 글 템플릿
hugo.toml         사이트 설정 + taxonomies(tag, project)
themes/PaperMod   테마 (git submodule)
.github/          빌드·배포 워크플로
```

글쓰기 보이스·민감값 처리 등 작성 규칙은 [`CLAUDE.md`](CLAUDE.md) 참고.

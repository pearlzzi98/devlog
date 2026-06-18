---
title: "{{ .Date.Format "2006-01-02" }} 회고"
date: {{ .Date }}        # 게시 시각 = 작업일 다음날 07:00 KST 로 직접 고쳐 넣는다
draft: false
projects: ["{{ replace .File.Dir "posts/" "" | strings.TrimSuffix "/" }}"]   # 폴더명과 동일(기록용)
summary: ""              # 그 글 한 줄 요약
---

### 한 일

### 막힌 것, 고친 것

### 돌아보며

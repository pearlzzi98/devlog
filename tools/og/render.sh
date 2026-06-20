#!/usr/bin/env bash
# devlog OG 카드(1200×630) 렌더: tools/og/card.html → static/og.png
# 헤드리스 chromium 재사용(drawio 렌더와 동일 엔진). 카드 디자인 바꾸면 이 스크립트 다시 실행.
set -euo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$(cd "$here/../.." && pwd)"
out="$root/static/og.png"

find_chrome() {
  for v in "$HOME"/.cache/puppeteer/chrome/*/chrome-linux64/chrome "$HOME"/.cache/puppeteer/chrome/*/chrome-linux/chrome; do
    [ -x "$v" ] && { echo "$v"; return 0; }
  done
  for p in /usr/bin/google-chrome-stable /usr/bin/google-chrome /usr/bin/chromium-browser /usr/bin/chromium; do
    [ -x "$p" ] && { echo "$p"; return 0; }
  done
  return 1
}

chrome="$(find_chrome)" || { echo "chromium 없음 → 'npx -y puppeteer browsers install chrome' 후 재시도" >&2; exit 2; }
mkdir -p "$root/static"
"$chrome" --headless --no-sandbox --disable-setuid-sandbox --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 \
  --screenshot="$out" "file://$here/card.html" >/dev/null 2>&1
echo "rendered → $out"

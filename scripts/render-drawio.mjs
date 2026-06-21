import { readFileSync, existsSync, readdirSync } from 'node:fs';
const [inPath, outPath] = process.argv.slice(2);
if (!inPath || !outPath) { console.error('usage: render-drawio.mjs <in.drawio> <out.png>'); process.exit(1); }
function findChrome() {
  const e = process.env.PUPPETEER_EXECUTABLE_PATH; if (e && existsSync(e)) return e;
  const root = `${process.env.HOME}/.cache/puppeteer/chrome`;
  if (existsSync(root)) for (const v of readdirSync(root)) for (const s of ['chrome-linux64/chrome','chrome-linux/chrome']) { const p = `${root}/${v}/${s}`; if (existsSync(p)) return p; }
  for (const p of ['/usr/bin/google-chrome-stable','/usr/bin/google-chrome','/usr/bin/chromium-browser','/usr/bin/chromium']) if (existsSync(p)) return p;
  return null;
}
const chrome = findChrome();
if (!chrome) { console.error('chromium 없음 → `npx -y puppeteer browsers install chrome` 후 재시도'); process.exit(2); }
const puppeteer = (await import('puppeteer-core')).default;
const xml = readFileSync(inPath, 'utf8');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#fff}#c,.mxgraph{background:#fff}</style><script src="https://viewer.diagrams.net/js/viewer-static.min.js"></script></head><body><div id="c"></div></body></html>`;
const browser = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.waitForFunction('typeof GraphViewer !== "undefined"', { timeout: 20000 });
await page.evaluate((xml) => { const d = document.createElement('div'); d.className = 'mxgraph'; d.setAttribute('data-mxgraph', JSON.stringify({ xml, nav: false, toolbar: null, border: 24 })); document.getElementById('c').appendChild(d); GraphViewer.processElements(); }, xml);
await page.waitForSelector('#c svg', { timeout: 20000 });
await new Promise(r => setTimeout(r, 800));
await (await page.$('#c')).screenshot({ path: outPath });
await browser.close();
console.log('wrote', outPath);

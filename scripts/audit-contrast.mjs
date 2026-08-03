// =============================================================================
// CONTRAST AUDIT — every demo page, every theme, in a real browser
// =============================================================================
//
// The build-time check in `_themes.scss` measures TOKEN pairs. It cannot see
// what a library actually renders: a filter, a state rule the adapter clobbers,
// or a fill whose foreground comes from markup. Three real bugs in this project
// were invisible to it and visible here.
//
// Run against a served copy of the repo:
//
//     npx serve -p 4173 .
//     node scripts/audit-contrast.mjs
//
// Needs a Chromium; uses Puppeteer if present, otherwise prints the snippet to
// paste into devtools. Kept dependency-free on purpose — this is a check you
// should be able to run by hand.
// =============================================================================

const PAGES = [
  'coexistence', 'theme-brand', 'daisyui', 'pico', 'bulma',
  'tailwind', 'flowbite', 'preline', 'water', 'mvp'
];
const THEMES = ['light', 'dark', 'brand'];

export const SNIPPET = `(() => {
  const isOpaque = (css) => {
    if (!css || css === 'transparent') return false;
    const m = css.match(/^(?:rgba?|oklch|oklab|color)\\(([^)]*)\\)/);
    if (!m) return true;
    const a = m[1].split('/')[1] ?? m[1].split(',')[3];
    return a === undefined || parseFloat(a) > 0.9;
  };
  const rgb = (css) => {
    const c = document.createElement('canvas'); c.width = c.height = 1;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.fillStyle = '#000'; x.fillRect(0, 0, 1, 1);
    x.fillStyle = css; x.fillRect(0, 0, 1, 1);
    const d = x.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]];
  };
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const lum = (c) => { const [r, g, b] = rgb(c).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ratio = (f, b) => { const [a, c] = [lum(f), lum(b)].sort((x, y) => y - x); return +((a + 0.05) / (c + 0.05)).toFixed(2); };

  const SEL = 'button,.btn,.badge,.tag,.alert,.notification,.x-btn,.x-badge,.x-alert,'
            + 'input[type=submit],input[type=reset],thead th,sup';
  const out = [];
  for (const el of document.querySelectorAll(SEL)) {
    const cs = getComputedStyle(el);
    if (!isOpaque(cs.backgroundColor)) continue;
    const label = (el.value || el.textContent || '').trim().slice(0, 16) || el.tagName;
    out.push({ label, ratio: ratio(cs.color, cs.backgroundColor) });
  }
  out.sort((a, b) => a.ratio - b.ratio);
  return { theme: document.documentElement.dataset.theme, measured: out.length,
           worst: out.slice(0, 3), allPassAA: out.every((x) => x.ratio >= 4.5) };
})()`;

let puppeteer;
try { puppeteer = (await import('puppeteer')).default; } catch {}

if (!puppeteer) {
  console.log('puppeteer not installed — paste this into devtools on each page:\n');
  console.log(SNIPPET);
  process.exit(0);
}

const browser = await puppeteer.launch();
const page = await browser.newPage();
let failures = 0;

for (const name of PAGES) {
  await page.goto(`http://localhost:4173/example/${name}.html`, { waitUntil: 'networkidle0' });

  // Kill transitions before measuring anything.
  //
  // Several of these libraries transition `background-color`, so a snapshot
  // taken a frame or two after a theme flip lands MID-TRANSITION and reports a
  // colour that exists for 150ms and belongs to neither theme. That produced a
  // different set of "failures" on every run — the giveaway that the
  // measurement was wrong rather than the CSS.
  await page.addStyleTag({
    content: '*, *::before, *::after { transition: none !important; animation: none !important; }'
  });

  for (const theme of THEMES) {
    await page.evaluate(async (t) => {
      document.documentElement.dataset.theme = t;
      // One frame is enough once transitions are off: style resolution still
      // lags the attribute flip, but nothing is animating toward a value.
      await new Promise((r) => requestAnimationFrame(r));
    }, theme);
    const r = await page.evaluate(SNIPPET);
    const mark = r.allPassAA ? 'ok ' : 'FAIL';
    console.log(`  ${mark} ${name.padEnd(13)} ${theme.padEnd(6)} ${String(r.measured).padStart(3)} fills, worst ${r.worst[0]?.ratio ?? '-'}`);
    if (!r.allPassAA) { failures++; console.log('        ' + JSON.stringify(r.worst)); }
  }
}

await browser.close();
console.log(failures ? `\n${failures} page/theme combinations below AA.` : '\nAll pages pass AA in all themes.');
process.exit(failures ? 1 : 0);

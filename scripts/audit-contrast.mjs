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

  // Find filled elements STRUCTURALLY, not by class name.
  //
  // Looking for \`.btn, .badge, .alert\` only works for libraries that ship
  // component classes. Flowbite, Preline and the Tailwind bridge compose
  // everything from utilities, so a class-based scan measured five elements on
  // a page with thirty — and reported "all pass" on almost nothing.
  //
  // The structural definition of a thing whose contrast matters: it paints an
  // opaque background DIFFERENT from its parent's, and it has text of its own.
  // That catches a utility-composed badge and skips a layout wrapper.
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (!isOpaque(cs.backgroundColor)) continue;

    // Transparent TEXT, not just a transparent background. Bulma's
    // \`is-loading\` sets \`color: rgba(0,0,0,0)\` and swaps in a spinner, so
    // measuring its contrast asks what a colour nobody can see reads like.
    if (!isOpaque(cs.color)) continue;

    const parentBg = el.parentElement ? getComputedStyle(el.parentElement).backgroundColor : '';
    if (cs.backgroundColor === parentBg) continue;

    // Direct text only — otherwise a card counts its children's paragraphs.
    const own = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .trim();
    // Only these input types render their \`value\` as visible text. A checkbox
    // reports \`value === "on"\` by default, which made every switch look like a
    // filled element with 1.47:1 text on it — a control that has no text at all.
    // \`String()\` because \`<progress>\` and \`<meter>\` expose a NUMERIC value.
    const showsValue = el.tagName === 'INPUT'
      && ['submit', 'reset', 'button'].includes(el.type);
    const label = (showsValue ? String(el.value ?? '').trim() : '') || own;
    if (!label) continue;

    out.push({ label: label.slice(0, 16), ratio: ratio(cs.color, cs.backgroundColor) });
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
    await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);

    // Wait for the reading to STABILISE rather than for a fixed number of
    // frames. A fixed wait is a guess, and it was wrong: Bulma resolves colour
    // through a dozen chained `var()` levels and takes more than one frame to
    // settle after a theme flip, which produced a different set of "failures"
    // on every run and once reported 1.06:1 on a button that measures 13:1.
    //
    // Two identical consecutive readings is the actual signal that the cascade
    // has finished.
    let r = null;
    let previous = null;
    for (let attempt = 0; attempt < 20; attempt++) {
      await page.evaluate(() => new Promise((res) => requestAnimationFrame(res)));
      r = await page.evaluate(SNIPPET);
      const fingerprint = JSON.stringify(r.worst) + r.measured;
      if (fingerprint === previous) break;
      previous = fingerprint;
    }
    const mark = r.allPassAA ? 'ok ' : 'FAIL';
    console.log(`  ${mark} ${name.padEnd(13)} ${theme.padEnd(6)} ${String(r.measured).padStart(3)} fills, worst ${r.worst[0]?.ratio ?? '-'}`);
    if (!r.allPassAA) { failures++; console.log('        ' + JSON.stringify(r.worst)); }
  }
}

await browser.close();
console.log(failures ? `\n${failures} page/theme combinations below AA.` : '\nAll pages pass AA in all themes.');
process.exit(failures ? 1 : 0);

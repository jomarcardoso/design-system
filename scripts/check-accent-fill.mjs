// scripts/check-accent-fill.mjs

// =============================================================================
// A WASHED PRIMARY ACTION HAS TWO JOBS, AND NEITHER IS CONTRAST AGAINST THE PAGE
// =============================================================================
//
//     node scripts/check-accent-fill.mjs example/<product>
//
// `accentFill: washed` fills the primary action with `bg-accent-subtle` and
// keeps the ink dark. The first version of this script measured that fill
// against the PAGE with a WCAG ratio, decided the accent-driven example failed,
// and changed the example to `saturated`. Both the instrument and the
// conclusion were wrong, and the client said why:
//
//   > não sei se a cor accentFill deveria ser calculada no contraste contra o
//   > fundo, até porque no accentFill washed o texto é escuro para contrastar e
//   > o fundo accent lavado nem importa muito
//
// Exactly. In `washed` the READING is done by dark ink on a pale fill, and that
// fill's separation from the page is not what makes the control legible. The
// failure at the other end is self-correcting too: an accent strong enough that
// dark ink stops working on it is an accent needing light ink, which is
// `saturated` by definition.
//
// -----------------------------------------------------------------------------
// WHAT ACTUALLY HAS TO HOLD
// -----------------------------------------------------------------------------
//
//   1. THE INK READS. `fg-default` on `bg-accent-subtle`, against the product's
//      own accessibility threshold. A real requirement with a real number.
//
//   2. THE FILL IS NOT THE BADGE. `bg-accent-subtle` must be tellable apart
//      from `bg-neutral-subtle` — the fill every badge, tag and resting
//      secondary action is made of. Otherwise the primary action is a label.
//
// The second is PERCEPTUAL, and a WCAG ratio is the wrong instrument for it.
// Two fills can sit at the same lightness and be obviously different because
// their hues are far apart, which is the accent-driven case exactly: pale blue
// against pale sepia measured 1.05 by luminance and 171 DEGREES apart by hue.
// Luminance said indistinguishable. Anyone with eyes says otherwise.
//
// So this measures in OKLCH, and reports which channel carries the difference —
// because a difference carried by hue alone weakens for a colour-blind reader
// and one carried by lightness does not.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir || !existsSync(join(dir, 'DESIGN_LANGUAGE.md'))) {
  console.error('check-accent-fill: pass a product directory holding DESIGN_LANGUAGE.md');
  process.exit(1);
}

const doc = readFileSync(join(dir, 'DESIGN_LANGUAGE.md'), 'utf8');
const fill = doc.match(/^accentFill:\s*(\w+)/m)?.[1];
const level = doc.match(/^accessibility:\s*(\w+)/m)?.[1] ?? 'AA';
const threshold = level === 'AAA' ? 7 : 4.5;

if (fill !== 'washed') {
  console.log(
    `check-accent-fill: ${dir} — accentFill is ${fill ?? 'unset'}; both tests apply only to washed.`
  );
  process.exit(0);
}

const srgb = (hex) => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
};
const lum = (hex) => {
  const f = (x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = srgb(hex).map(f);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const oklch = (hex) => {
  const f = (x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = srgb(hex).map(f);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  };
};

// A three-way OR rather than one blended number, so the report can say WHICH
// channel is doing the work.
const DL = 0.04; // about one rung of a twelve-step ramp
const DC = 0.02;
const DH = 20; // degrees

const css = readFileSync(join(dir, 'ds.css'), 'utf8');
const blocks = [...css.matchAll(/(:root|\[data-theme=[^\]]+\])[^{]*\{([^}]*)\}/g)];

const problems = [];
const notes = [];
const seen = new Set();
let checked = 0;

for (const [, sel, body] of blocks) {
  const get = (n) => body.match(new RegExp(`--app-${n}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1];
  const accent = get('bg-accent-subtle');
  const neutral = get('bg-neutral-subtle');
  const ink = get('fg-default');
  if (!accent || !neutral || !ink) continue;

  const key = [accent, neutral, ink].join('|');
  if (seen.has(key)) continue;
  seen.add(key);
  checked++;

  // 1 — the ink reads
  const r = ratio(ink, accent);
  if (r < threshold) {
    problems.push([
      `${sel} — dark ink does not read on the washed fill`,
      `fg-default on bg-accent-subtle measures ${r.toFixed(2)}, below ${level}'s ${threshold}. ` +
        'An accent that dark ink cannot sit on is one needing light ink, which is saturated.'
    ]);
  }

  // 2 — the fill is not the badge
  const A = oklch(accent);
  const N = oklch(neutral);
  const dL = Math.abs(A.L - N.L);
  const cA = Math.hypot(A.a, A.b);
  const cN = Math.hypot(N.a, N.b);
  const dC = Math.abs(cA - cN);
  let dH = Math.abs(
    ((Math.atan2(A.b, A.a) - Math.atan2(N.b, N.a)) * 180) / Math.PI
  );
  if (dH > 180) dH = 360 - dH;

  const by = [];
  if (dL >= DL) by.push(`lightness ${dL.toFixed(3)}`);
  if (dC >= DC) by.push(`chroma ${dC.toFixed(3)}`);
  if (dH >= DH) by.push(`hue ${Math.round(dH)}°`);

  if (!by.length) {
    problems.push([
      `${sel} — the washed fill is the badge fill`,
      `bg-accent-subtle and bg-neutral-subtle differ by ${dL.toFixed(3)} lightness, ` +
        `${dC.toFixed(3)} chroma and ${Math.round(dH)}° hue — under every threshold. ` +
        'The primary action would look like a label. Use saturated.'
    ]);
  } else if (by.length === 1 && by[0].startsWith('hue')) {
    notes.push(
      `${sel} — the action is told from a badge by hue alone (${Math.round(dH)}°), which is ` +
        'weaker for a colour-blind reader. The ink and the shape still carry it; worth knowing.'
    );
  }
}

const bold = (s) => `[1m${s}[0m`;
const dim = (s) => `[2m${s}[0m`;

if (!checked) {
  console.log(`check-accent-fill: ${dir} — no theme declares all three tokens; nothing to measure.`);
  process.exit(0);
}
if (!problems.length) {
  console.log(
    `check-accent-fill: ok — washed holds in ${checked} theme(s) of ${dir}: the ink reads at ` +
      `${level}, and the fill is tellable from the badge fill.`
  );
  for (const n of notes) console.log(`  ${dim(n)}`);
  process.exit(0);
}

console.error(`\n${bold('accentFill')} ${dim(`— ${dir}`)}\n`);
for (const [what, why] of problems) {
  console.error(`  ${bold(what)}`);
  console.error(`    ${dim(why)}\n`);
}
process.exit(1);

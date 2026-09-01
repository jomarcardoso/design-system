// scripts/check-accent-fill.mjs

// =============================================================================
// A WASHED PRIMARY ACTION HAS TO BE LOUDER THAN A BADGE
// =============================================================================
//
//     node scripts/check-accent-fill.mjs example/<product>
//
// `accentFill: washed` fills the primary action with `bg-accent-subtle` and
// keeps the ink dark, so the content stays the loudest thing on the page. It is
// the right derivation for a product someone sits with for an hour, and it has
// a floor it does not always clear.
//
// `bg-accent-subtle` sits at the pale end of one ramp. `bg-neutral-subtle` —
// the fill every badge, tag and resting secondary action is made of — sits at
// the pale end of another. In a monochrome product they can land on top of each
// other, and then the primary action is a badge.
//
//     washed survives only where bg-accent-subtle is further from the page
//     than bg-neutral-subtle is.
//
// A comparison rather than a threshold, so it holds at any palette and in any
// theme.
//
// -----------------------------------------------------------------------------
// WHY THIS IS A SCRIPT
// -----------------------------------------------------------------------------
//
// Because judgement already got it wrong once, in the one document written to
// demonstrate the rule. The accent-driven example carried `accentFill: washed`
// with a paragraph explaining that it cleared the floor — and it did not:
// accent-subtle measured 1.01 against its page, neutral-subtle 1.16, and in the
// dark theme the two were identical. A washed action there would have been less separated from the
// page than an ordinary badge and indistinguishable from one, and every other
// check passed, because the chain verifies that a key was derived FROM and
// never that its value arrived.
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

if (fill !== 'washed') {
  console.log(
    `check-accent-fill: ${dir} — accentFill is ${fill ?? 'unset'}; the floor only applies to \`washed\`.`
  );
  process.exit(0);
}

const css = readFileSync(join(dir, 'ds.css'), 'utf8');

// Every theme block, so a floor cleared in light and missed in dark is caught.
const blocks = [...css.matchAll(/(:root|\[data-theme=[^\]]+\])[^{]*\{([^}]*)\}/g)];

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

const problems = [];
const seen = new Set();
let checked = 0;

for (const [, sel, body] of blocks) {
  const get = (name) => body.match(new RegExp(`--app-${name}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1];
  const page = get('bg-page');
  const accent = get('bg-accent-subtle');
  const neutral = get('bg-neutral-subtle');
  if (!page || !accent || !neutral) continue;
  checked++;

  const a = ratio(accent, page);
  const n = ratio(neutral, page);
  if (a > n) continue;

  // Keyed on the VALUES, not the selector: the dark theme is emitted twice —
  // once under [data-theme] and once inside the prefers-color-scheme :root — and
  // one finding reported three times reads as three problems.
  const key = [accent, neutral, page].join('|');
  if (seen.has(key)) continue;
  seen.add(key);

  problems.push([
    `${sel} — a washed action would be quieter than a badge`,
    `bg-accent-subtle is ${a.toFixed(2)} from the page and bg-neutral-subtle is ${n.toFixed(2)}; ` +
      `the two are ${ratio(accent, neutral).toFixed(2)} apart. ` +
      'Set accentFill: saturated, and record the measurement as the reason.'
  ]);
}

const bold = (s) => `[1m${s}[0m`;
const dim = (s) => `[2m${s}[0m`;

if (!checked) {
  console.log(`check-accent-fill: ${dir} — no theme declares all three tokens; nothing to measure.`);
  process.exit(0);
}
if (!problems.length) {
  console.log(`check-accent-fill: ok — washed clears the floor in ${checked} theme(s) of ${dir}.`);
  process.exit(0);
}

console.error(`\n${bold('accentFill')} ${dim(`— ${dir}`)}\n`);
for (const [what, why] of problems) {
  console.error(`  ${bold(what)}`);
  console.error(`    ${dim(why)}\n`);
}
process.exit(1);

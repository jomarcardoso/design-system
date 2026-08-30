// scripts/docs-foundations.mjs

// =============================================================================
// FOUNDATIONS.md — GENERATED, never written
// =============================================================================
//
//     node scripts/docs-foundations.mjs <compiled-css> [--out FOUNDATIONS.md]
//
// A human-readable catalogue of the values a product's theme actually compiled
// to: every layer 2 token, grouped, with the value it carries in each theme.
//
// -----------------------------------------------------------------------------
// WHY THIS IS A SCRIPT AND NOT A DOCUMENT SOMEBODY MAINTAINS
// -----------------------------------------------------------------------------
//
// A `FOUNDATIONS.md` written by hand was proposed twice and refused twice, for
// the same reason both times: it is a second copy of values that already exist
// in the compiled theme, and two copies of anything diverge. The first time a
// token moves and the document does not, the document becomes worse than
// nothing — because a reader trusts it.
//
// Generated, it cannot lie. It also cannot be edited: a correction goes into
// `theme.scss` and comes back out here, which is the direction the whole
// architecture already runs in.
//
// This is deliberately NOT `tokens.md`. That file documents the CONTRACT — what
// each name means and when to reach for it, which is the same for every product
// and is written by a person. This documents the VALUES one product arrived at.
// The contract explains; the catalogue reports.
// =============================================================================

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const out = outIdx > -1 ? args[outIdx + 1] : 'FOUNDATIONS.md';
const source = args.find((a, i) => !a.startsWith('--') && i !== outIdx + 1);

if (!source || !existsSync(source)) {
  console.error(
    'docs-foundations: pass the compiled CSS.\n' +
      '  node scripts/docs-foundations.mjs example/<product>/ds.css --out example/<product>/FOUNDATIONS.md'
  );
  process.exit(1);
}

const css = readFileSync(source, 'utf8');

// Themes are emitted under `[data-theme='x']`, and the default one ALSO under
// `:root` — in the same selector list, as `:root, [data-theme=light]`.
//
// A first version matched `:root|[data-theme=x]` as alternatives and so read
// that list as `:root` alone, losing the light theme entirely and reporting a
// two-theme product as having one. Read the WHOLE selector and collect every
// theme name in it.
//
// Blocks carrying `data-surface` are contexts — a partial override that inherits
// what it does not mention — and merging them into a theme would report a
// context's value as the theme's.
// The BODY must exclude braces too, not just the selector. With `[^}]*` the
// `@layer ds.semantic {` wrapper matched as a rule whose body ran to the first
// closing brace, swallowing the theme block nested inside it — and every
// `--app-*` token vanished from the output while the `--cui-*` ones, which sit
// in a different layer, survived. A partial catalogue that looks complete is the
// one failure this script exists to prevent.
const blocks = [...css.matchAll(/([^{}]*)\{([^{}]*)\}/g)];

const themes = new Map();
let sawRootOnly = false;

for (const [, selector, body] of blocks) {
  if (!/(:root|\[data-theme)/.test(selector)) continue;
  if (/data-surface/.test(selector)) continue;

  const decls = [...body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+)/g)];
  if (decls.length === 0) continue;

  const named = [...selector.matchAll(/\[data-theme=['"]?([a-z0-9-]+)['"]?\]/g)].map(
    (m) => m[1]
  );
  const targets = named.length > 0 ? named : ['root'];
  if (named.length === 0) sawRootOnly = true;

  for (const name of targets) {
    const bag = themes.get(name) ?? new Map();
    for (const [, prop, value] of decls) bag.set(prop, value.trim());
    themes.set(name, bag);
  }
}

if (themes.size === 0) {
  console.error(`docs-foundations: no custom properties found in ${source}.`);
  process.exit(1);
}

// Structure tokens — radius, spacing, typography, motion — are emitted once on a
// bare `:root`, not per theme, because they do not change between themes. Fold
// them into every theme so each column is complete, then drop the bucket.
if (themes.size > 1 && themes.has('root') && sawRootOnly) {
  const structure = themes.get('root');
  themes.delete('root');
  for (const bag of themes.values()) {
    for (const [k, v] of structure) if (!bag.has(k)) bag.set(k, v);
  }
}

const names = [...themes.keys()];
const all = new Set(names.flatMap((n) => [...themes.get(n).keys()]));

// Grouped by the first segment after the prefix, which IS the grammar: the
// property comes first in every layer 2 name.
const GROUPS = [
  ['Surfaces', (t) => /^--[a-z]+-bg-/.test(t)],
  ['Ink', (t) => /^--[a-z]+-fg-/.test(t)],
  ['Lines and focus', (t) => /^--[a-z]+-(border|ring)/.test(t)],
  ['Elevation', (t) => /^--[a-z]+-shadow-/.test(t)],
  ['Shape', (t) => /^--[a-z]+-radius-/.test(t)],
  ['Spacing and sizing', (t) => /^--[a-z]+-(space|pad|gap|size)-/.test(t)],
  ['Typography', (t) => /^--[a-z]+-(font|line-height|letter-spacing)/.test(t)],
  ['Motion', (t) => /^--[a-z]+-(duration|ease)/.test(t)],
  ['Layering', (t) => /^--[a-z]+-z-/.test(t)],
  ['Other', () => true]
];

const seen = new Set();
const sections = GROUPS.map(([title, test]) => {
  const rows = [...all].filter((t) => !seen.has(t) && test(t)).sort();
  rows.forEach((t) => seen.add(t));
  return [title, rows];
}).filter(([, rows]) => rows.length > 0);

const head = `| token | ${names.join(' | ')} |\n|---|${names.map(() => '---').join('|')}|`;

const body = sections
  .map(([title, rows]) => {
    const lines = rows
      .map(
        (t) =>
          `| \`${t}\` | ${names.map((n) => themes.get(n).get(t) ?? '—').join(' | ')} |`
      )
      .join('\n');
    return `## ${title}\n\n${head}\n${lines}`;
  })
  .join('\n\n');

const doc = `<!-- ${out} -->

# Foundations — the values this product compiled to

**Generated by \`scripts/docs-foundations.mjs\` from \`${source}\`. Do not edit.**
A correction goes into \`theme.scss\` and comes back out here.

${names.length} theme${names.length === 1 ? '' : 's'}, ${all.size} tokens.

This is the CATALOGUE: what this product's values are. It is not the contract —
what each name means and when to reach for it is
\`skills/design-system/references/tokens.md\`, which is the same for every product
and is written by a person. And it is not the reasoning: why these values were
chosen is \`DESIGN_LANGUAGE.md\`.

${body}
`;

writeFileSync(out, doc);
console.log(
  `docs-foundations: wrote ${out} — ${all.size} tokens across ${names.length} theme(s).`
);

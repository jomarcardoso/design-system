// =============================================================================
// PATTERN DOCUMENTATION — generated from the ledger, never written by hand
// =============================================================================
//
//     node scripts/generate-pattern-docs.mjs --ledger <patterns.json> \
//       --out <docs.html> [--stylesheet ./ds.css] [--title "…"]
//
// This is phase 3, and the two rules below are what make it phase 3 rather than
// a second website to maintain.
//
// -----------------------------------------------------------------------------
// THE DOCS ARE A DELTA, NOT A CATALOGUE
// -----------------------------------------------------------------------------
//
// A page that redocuments every button the library already documents is a
// second source of truth that starts drifting the day it is written, and the
// reader cannot tell which half is authoritative. So this generator prints in
// full only what a reader CANNOT look up:
//
//   - compositions — components the library does not have at any spelling
//   - overrides    — where the product diverges, and only what diverges
//   - refusals     — what is out of the vocabulary, with the alternative
//
// Everything still `raw` gets a name, an intent and a link to the library's own
// documentation. That is deliberately not enough to build from without opening
// the library's docs, because opening the library's docs is the correct thing
// to do for a component the product has not changed.
//
// -----------------------------------------------------------------------------
// IT IS GENERATED, SO IT CANNOT DISAGREE WITH THE CODE
// -----------------------------------------------------------------------------
//
// Every fact here comes from `patterns.json`, which is the same file the
// verifier enforces and the agent reads. Promote a pattern and the page says so
// on the next build; write the page by hand instead and it becomes the third
// place a decision lives, which is exactly one more than the design allows.
//
// Examples are rendered LIVE from the ledger's `example` field, against the
// product's real stylesheet, next to their own source. A documentation example
// that is a screenshot goes stale silently.
// =============================================================================

import { readFileSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const ledgerPath = opt('ledger');
const outPath = opt('out');
if (!ledgerPath || !outPath) {
  console.error('usage: generate-pattern-docs.mjs --ledger <patterns.json> --out <docs.html> [--stylesheet <href>] [--title <title>]');
  process.exit(2);
}

const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
const lib = ledger.libraries[0];
const stylesheet = opt('stylesheet', './ds.css');
const title = opt('title', 'Design system');

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A pattern is worth documenting in FULL when the reader cannot look it up.
const kindOf = (p) => {
  if (p.state === 'forbidden') return 'forbidden';
  if (p.parts || !p.raw?.[lib]) return 'composition';
  if (p.diverges) return 'override';
  return 'library';
};

const block = (p, name, kind) => {
  const classes = p.state === 'forbidden'
    ? null
    : (p.styled ?? (p.raw?.[lib] ?? []).join(' '));

  const rows = [];
  if (classes) rows.push(`<dt>Class</dt><dd><code>${esc(classes)}</code></dd>`);
  if (p.diverges) rows.push(`<dt>Diverges</dt><dd>${esc(p.diverges)}</dd>`);
  if (p.reason) rows.push(`<dt>Why not</dt><dd>${esc(p.reason)}</dd>`);
  if (p.instead) rows.push(`<dt>Use instead</dt><dd><code>${esc(p.instead)}</code></dd>`);
  if (p.notes) rows.push(`<dt>Note</dt><dd>${esc(p.notes)}</dd>`);

  if (p.parts) {
    const parts = Object.entries(p.parts)
      .map(([cls, what]) => `<li><code>${esc(cls)}</code> — ${esc(what)}</li>`)
      .join('');
    rows.push(`<dt>Parts</dt><dd><ul class="parts">${parts}</ul></dd>`);
  }

  // The example is rendered and its source shown. Only for things the reader
  // cannot look up — a live copy of the library's own button teaches nothing
  // the library's docs do not already teach, and costs a page that drifts.
  const demo = p.example && kind !== 'library'
    ? `<div class="demo">${p.example}</div><pre class="src"><code>${esc(p.example)}</code></pre>`
    : '';

  return `<article class="pattern is-${kind}">
  <h3>${esc(name)} <span class="tag tag-${esc(p.state)}">${esc(p.state)}</span></h3>
  <p class="intent">${esc(p.intent)}</p>
  ${rows.length ? `<dl>${rows.join('')}</dl>` : ''}
  ${demo}
</article>`;
};

const sections = Object.entries(ledger.components).map(([cname, c]) => {
  const entries = Object.entries(c.patterns);
  const documented = entries.filter(([, p]) => kindOf(p) !== 'library');
  const deferred = entries.filter(([, p]) => kindOf(p) === 'library');

  const link = c.docs?.library
    ? `<p class="defer">Everything below that this product has not changed is documented by the library: <a href="${esc(c.docs.library)}">${esc(lib)} docs for ${esc(cname)}</a>.</p>`
    : '';

  const deferredList = deferred.length
    ? `<div class="deferred"><h3>Used as the library ships them</h3><dl>${
        deferred.map(([n, p]) =>
          `<dt><code>${esc(p.raw[lib].join(' '))}</code> — ${esc(n)}</dt><dd>${esc(p.intent)}</dd>`
        ).join('')
      }</dl></div>`
    : '';

  return `<section id="${esc(cname)}">
  <h2>${esc(cname)}</h2>
  <p class="intent">${esc(c.intent)}</p>
  ${link}
  ${documented.map(([n, p]) => block(p, n, kindOf(p))).join('\n')}
  ${deferredList}
</section>`;
}).join('\n');

// A count worth printing at the top: it is the number the project is trying to
// move, and burying it under the patterns would make it decorative.
const tally = { raw: 0, styled: 0, wrapped: 0, forbidden: 0, compositions: 0, overrides: 0 };
for (const c of Object.values(ledger.components)) {
  for (const p of Object.values(c.patterns)) {
    tally[p.state]++;
    const k = kindOf(p);
    if (k === 'composition') tally.compositions++;
    if (k === 'override') tally.overrides++;
  }
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — patterns</title>
<!--
  GENERATED FILE. Do not edit.

      node scripts/generate-pattern-docs.mjs --ledger ${esc(ledgerPath)} --out ${esc(outPath)}

  Every fact on this page comes from patterns.json, which is also what the
  verifier enforces and what an agent reads before writing markup. Editing this
  file by hand creates a third place a decision lives.
-->
<link rel="stylesheet" href="${esc(stylesheet)}">
<style>
  .docs { max-width: 60rem; margin: 0 auto; padding: 2rem 1rem; }
  .docs section { margin-block: 3rem; }
  .pattern { margin-block: 2rem; padding-left: 1rem; border-left: 4px solid var(--app-border-color); }
  .pattern.is-composition { border-left-color: var(--app-bg-action); }
  .pattern.is-override { border-left-color: var(--app-bg-selected); }
  .pattern.is-forbidden { border-left-color: var(--app-bg-danger); }
  .intent { color: var(--app-fg-muted); }
  .tag { font-size: 0.5em; padding: 0.2em 0.5em; vertical-align: middle;
         background: var(--app-bg-sunken); color: var(--app-fg-muted); }
  .tag-styled { background: var(--app-bg-action-subtle); color: var(--app-fg-action); }
  .tag-forbidden { background: var(--app-bg-danger-subtle); color: var(--app-fg-danger); }
  dl { display: grid; grid-template-columns: max-content 1fr; gap: 0.5rem 1rem; }
  dt { color: var(--app-fg-muted); font-size: 0.7em; }
  dd { margin: 0; }
  .parts { margin: 0; padding-left: 1.2em; }
  .demo { margin-block: 1rem; padding: 1rem; background: var(--app-bg-sunken); }
  .src { overflow-x: auto; padding: 0.75rem; font-size: 0.65em;
         background: var(--app-bg-sunken); color: var(--app-fg-muted); }
  .deferred { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--app-border-color-subtle); }
  .defer { font-size: 0.8em; }
  .tally { display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: 0.7em; color: var(--app-fg-muted); }
</style>
</head>
<body>
<div class="docs">
  <h1>${esc(title)}</h1>
  <p class="intent">
    The delta between this product and ${esc(lib)}. Compositions and overrides are
    documented here in full because they exist nowhere else; everything the
    product uses unchanged links to the library.
  </p>
  <p class="tally">
    <span>${tally.compositions} compositions</span>
    <span>${tally.overrides} overrides</span>
    <span>${tally.raw} raw</span>
    <span>${tally.styled} styled</span>
    <span>${tally.forbidden} forbidden</span>
  </p>
${sections}
</div>
</body>
</html>
`;

writeFileSync(outPath, html);
console.log(
  `${outPath} — ${tally.compositions} compositions, ${tally.overrides} overrides, ` +
  `${tally.raw} raw, ${tally.styled} styled, ${tally.forbidden} forbidden`
);

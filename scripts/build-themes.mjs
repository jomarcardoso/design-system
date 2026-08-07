// =============================================================================
// PER-THEME BUILDS — one stylesheet per theme, surfaces included
// =============================================================================
//
//     node scripts/build-themes.mjs
//
// Writes `dist/theme-<name>.css` for every theme in `src/_themes.scss`, each
// containing the structural tokens, that theme's colours, and every surface
// context. A page loads exactly one.
//
// -----------------------------------------------------------------------------
// WHY THIS SHAPE AND NOT THE OTHER TWO
// -----------------------------------------------------------------------------
//
// There are three ways to ship a themed token layer, and this one is the
// RECOMMENDED shape for a product. The other two are kept for the cases they
// genuinely fit.
//
//   ONE FILE PER THEME          This. A page has one theme, so the theme is
//   resolved at build time; surfaces stay at runtime, because a page really
//   does have several at once.
//
//   ALL THEMES IN ONE FILE      `dist/ds.css` — still built. Right for a
//   DEMONSTRATION that switches themes to show them off, and for a product
//   whose theme toggle must not touch the network. Wrong as a default: the page
//   carries every theme it does not use.
//
//   ONE FILE PER PERMUTATION    What the W3C Resolver module describes: resolve
//   `{theme, surface}` to one flat set. Smallest payload, and it makes nested
//   surfaces IMPOSSIBLE — the permutation is the whole document, so a page
//   cannot have an inverted band inside a themed page.
//
// -----------------------------------------------------------------------------
// THE ARGUMENT THAT SETTLES IT
// -----------------------------------------------------------------------------
//
// Payload was the wrong axis to argue on — the gap is under a kilobyte gzipped.
// The decisive point is that **a theme a user defines cannot be pre-compiled
// into a shared file**, because it does not exist at build time. A product that
// lets people pick or author a theme has an unbounded set, and the only shape
// that survives is one file per theme, fetched by name.
//
// Everything else follows: the server knows which theme to serve (from a
// session, a preference row, or the `Sec-CH-Prefers-Color-Scheme` client hint)
// and returns one stylesheet. Choosing wisely is the application's job, and
// this build's job is to make every theme independently loadable.
//
// The split works because of a property of the token layer that is easy to
// miss: the surface contexts declare only eight tokens, and they declare them
// as REFERENCES —
//
//     [data-surface="inverted"] { --app-bg-page: var(--app-bg-inverted-base); … }
//
// — to anchors each theme defines for itself. So the same two context blocks
// are correct in every theme file, and no permutation is needed to combine
// them. Had contexts held literal colours, this build would have to emit
// theme x surface sets and the whole idea would collapse into the Resolver's
// model.
// =============================================================================

import * as sass from 'sass';
import { readFileSync, writeFileSync, unlinkSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const THEMES_SRC = 'src/_themes.scss';

// The registry is the source of truth for which themes exist, so adding one to
// `_themes.scss` produces a file here without editing this script.
const registry = readFileSync(THEMES_SRC, 'utf8').match(/\$registry:\s*\(([^)]*)\)/);
if (!registry) {
  console.error(`Could not find $registry in ${THEMES_SRC}.`);
  process.exit(2);
}

const names = [...registry[1].matchAll(/([a-z0-9-]+)\s*:/gi)].map((m) => m[1]);

if (!names.length) {
  console.error('No themes found in $registry.');
  process.exit(2);
}

const ENTRY = '_theme-build.scss';
const rows = [];

for (const name of names) {
  // `$themes: (name)` makes this the only theme, and `themes.emit()` puts the
  // first theme on `:root` as well as `[data-theme=…]` — so the file works
  // whether or not the attribute is set.
  writeFileSync(
    ENTRY,
    `@use 'src/config' with ($themes: (${name}));\n` +
      `@use 'src/base';\n` +
      `@use 'src/themes';\n\n` +
      `@include base.emit();\n` +
      `@include themes.emit();\n`
  );

  const out = `dist/theme-${name}.css`;

  // The Sass API rather than a subprocess: no shell quoting, and the build-time
  // guards (contrast validation, the pair invariant, the DTCG name check) raise
  // here as exceptions instead of being buried in a child process's stderr.
  let css;
  try {
    css = sass.compile(ENTRY, { style: 'compressed', loadPaths: ['.'] }).css;
  } catch (err) {
    console.error(`Failed building theme "${name}": ${err.message}`);
    unlinkSync(ENTRY);
    process.exit(1);
  }

  writeFileSync(out, css);
  rows.push({
    name,
    bytes: statSync(out).size,
    gzip: gzipSync(css).length,
    tokens: new Set([...css.matchAll(/--app-([a-z0-9-]+)\s*:/g)].map((m) => m[1])).size,
    surfaces: [...css.matchAll(/\[data-surface=["']?([a-z0-9-]+)/g)].map((m) => m[1])
  });
}

unlinkSync(ENTRY);

const combined = statSync('dist/ds.css').size;
const combinedGzip = gzipSync(readFileSync('dist/ds.css', 'utf8')).length;

for (const r of rows) {
  const surfaces = [...new Set(r.surfaces)];
  console.log(
    `dist/theme-${r.name}.css`.padEnd(28) +
      `${String(r.bytes).padStart(6)} B  ${String(r.gzip).padStart(5)} B gzip  ` +
      `${r.tokens} tokens  surfaces: ${surfaces.join(', ') || 'none'}`
  );
}

console.log(
  '\n'.padEnd(1) +
    `dist/ds.css (all themes)`.padEnd(28) +
    `${String(combined).padStart(6)} B  ${String(combinedGzip).padStart(5)} B gzip`
);
console.log(
  `\nOne theme is ${combinedGzip - Math.max(...rows.map((r) => r.gzip))} B gzip smaller ` +
    `than the combined file. Size is not the deciding factor — a theme a USER\n` +
    `defines cannot be pre-compiled into a shared file at all, which is why one\n` +
    `file per theme is the recommended shape.`
);

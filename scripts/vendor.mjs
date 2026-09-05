// scripts/vendor.mjs

// =============================================================================
// VENDOR — copy the foundation into a consuming project, repeatably
// =============================================================================
//
//     node scripts/vendor.mjs <destination>            copy, or update
//     node scripts/vendor.mjs <destination> --check     report drift, change nothing
//     node scripts/vendor.mjs <destination> --dry-run   show what would happen
//
// This tool is VENDORED: a project copies `src/` into its own tree rather than
// resolving it from a package manager. That is a deliberate choice — a design
// foundation a team can read and step through beats one that arrives as a
// black box — and it has exactly one failure mode, which this script exists to
// prevent.
//
// -----------------------------------------------------------------------------
// THE FAILURE MODE: A SILENT FORK
// -----------------------------------------------------------------------------
//
// Someone copies `src/`, then fixes something locally because it is right there
// and editable. Six weeks later the foundation has moved, the copy is updated,
// and the local fix is gone — or worse, the update is skipped forever because
// nobody can tell what was changed on purpose.
//
// There is no dependency range to violate and no install step to fail, so
// nothing reports it. `--check` is the report: every vendored file is hashed at
// copy time, and drift is the difference between the hash on disk and the hash
// recorded. It tells you three things apart, which is the whole point:
//
//   LOCAL EDIT     the copy changed and the source did not. Somebody fixed
//                  something here. Take it upstream before updating, or it is
//                  lost.
//   UPSTREAM       the source changed and the copy did not. An ordinary update.
//   BOTH           the interesting one. A local edit and an upstream change to
//                  the same file, which is a merge and needs a person.
//
// The commit the copy came from is recorded too, so "which version do I have"
// has an answer that is not archaeology.
//
// -----------------------------------------------------------------------------
// WHAT TRAVELS, AND WHAT DELIBERATELY DOES NOT
// -----------------------------------------------------------------------------
//
// The foundation, the entry template, the checks and the two authoring skills.
//
// NOT the examples, NOT the changelog, NOT the design-language skill's
// references. Those are the tool's own evidence and its interview material —
// they belong where the tool is developed. A consuming project that carries
// seven other products' palettes around has copied a repository, not a
// foundation.
//
// NOT the product's own files either: `palette.scss`, `theme.scss`,
// `_setup.scss`, the entry and `patterns.json` are AUTHORED by the project and
// are never overwritten. The script refuses to touch them, and says so.
// =============================================================================

import {
  readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, copyFileSync
} from 'node:fs';
import { join, dirname, relative, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const dest = args.find((a) => !a.startsWith('--'));
const check = args.includes('--check');
const dry = args.includes('--dry-run');

if (!dest) {
  console.error(`usage: node scripts/vendor.mjs <destination> [--check] [--dry-run]

  <destination>  the consuming project's root, e.g. ../recepta-book/www`);
  process.exit(1);
}
if (!existsSync(dest)) {
  console.error(`vendor: "${dest}" does not exist. Pass the project root.`);
  process.exit(1);
}

// -----------------------------------------------------------------------------
// WHAT GOES WHERE
// -----------------------------------------------------------------------------
//
// Destinations are relative to the project root. They are conventions rather
// than requirements — a project that wants its styles somewhere else edits this
// map once, and `--check` keeps working, because drift is tracked per recorded
// path rather than per assumed one.
const PARCELS = [
  { from: 'src', to: 'src/styles/ds', what: 'the foundation — layers 1, 2, 3 and every adapter' },
  { from: 'templates', to: 'src/styles/ds/templates', what: 'the entry template a product copies and owns' },
  { from: 'scripts', to: 'scripts/ds', what: 'the checks', skip: /^vendor\.mjs$|^docs-|^generate-/ },
  { from: 'skills/compose-monochrome', to: '.claude/skills/compose-monochrome', what: 'how to write pages in this school' },
  { from: 'skills/compose-archetype', to: '.claude/skills/compose-archetype', what: 'how to keep the archetype' }
];

const START = 'templates/START.md';

const files = (dir, skip) => {
  const out = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (!skip || !skip.test(relative(dir, p).replace(/\\/g, '/'))) out.push(p);
    }
  };
  walk(dir);
  return out;
};

const hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex').slice(0, 16);

const bold = (s) => `[1m${s}[0m`;
const dim = (s) => `[2m${s}[0m`;

const manifestPath = join(dest, 'VENDORED.json');
const previous = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : null;

let commit = 'unknown';
try { commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); } catch {}

// -----------------------------------------------------------------------------

const planned = [];
for (const parcel of PARCELS) {
  if (!existsSync(parcel.from)) continue;
  for (const src of files(parcel.from, parcel.skip)) {
    const rel = relative(parcel.from, src).replace(/\\/g, '/');
    planned.push({ src, out: `${parcel.to}/${rel}`, parcel });
  }
}
if (existsSync(START)) planned.push({ src: START, out: 'START.md', parcel: { what: 'the starting brief' } });

// --- drift, before anything is written ---------------------------------------
if (previous) {
  const drift = { local: [], upstream: [], both: [], gone: [] };
  for (const f of planned) {
    const was = previous.files[f.out];
    const now = hash(f.src);
    const onDisk = existsSync(join(dest, f.out)) ? hash(join(dest, f.out)) : null;
    if (!was) continue;
    if (onDisk == null) { drift.gone.push(f.out); continue; }
    const localChanged = onDisk !== was;
    const upstreamChanged = now !== was;
    if (localChanged && upstreamChanged) drift.both.push(f.out);
    else if (localChanged) drift.local.push(f.out);
    else if (upstreamChanged) drift.upstream.push(f.out);
  }

  const say = (label, list, note) => {
    if (!list.length) return;
    console.log(`\n  ${bold(label)} ${dim(`(${list.length})`)}  ${dim(note)}`);
    for (const f of list.slice(0, 12)) console.log(`    ${f}`);
    if (list.length > 12) console.log(dim(`    …and ${list.length - 12} more`));
  };

  console.log(`\n${bold('Vendored copy')} ${dim(`— from ${previous.commit}, ${previous.date}`)}`);
  say('changed here only', drift.local, 'take these upstream, or the next update loses them');
  say('changed upstream only', drift.upstream, 'an ordinary update');
  say('changed on BOTH sides', drift.both, 'a merge — a person has to read these');
  say('missing', drift.gone, 'deleted locally, or never arrived');

  if (check) {
    const n = drift.local.length + drift.both.length;
    if (!n) { console.log(`\n${bold('No local edits.')} Updating is safe.\n`); process.exit(0); }
    console.log(`\n${bold(`${n} file(s) edited here.`)} Read them before updating.\n`);
    process.exit(1);
  }
  if (drift.both.length && !dry) {
    console.log(`\n${bold('Refusing to overwrite a file changed on both sides.')}`);
    console.log('Resolve those, or re-run with --dry-run to see the full plan.\n');
    process.exit(1);
  }
}

if (check) {
  console.log(`vendor: nothing recorded at ${manifestPath}. This would be a first copy.`);
  process.exit(0);
}

// --- copy ---------------------------------------------------------------------
const manifest = { source: 'design-system', commit, date: new Date().toISOString().slice(0, 10), files: {} };
let written = 0;
for (const f of planned) {
  manifest.files[f.out] = hash(f.src);
  const target = join(dest, f.out);
  if (dry) continue;
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(f.src, target);
  written++;
}

console.log(`\n${bold(dry ? 'Would vendor' : 'Vendored')} ${planned.length} file(s) into ${resolve(dest)}\n`);
for (const p of PARCELS) {
  if (!existsSync(p.from)) continue;
  console.log(`  ${bold(p.to.padEnd(34))} ${dim(p.what)}`);
}
console.log(`  ${bold('START.md'.padEnd(34))} ${dim('read this first')}`);

if (!dry) {
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n${dim(`recorded in VENDORED.json at commit ${commit}`)}`);
}

console.log(`
${bold('What this did NOT copy, on purpose:')}
  the examples, the changelog and the interview material — the tool's own
  evidence, which belongs where the tool is developed;
  ${bold('and any file the project authors:')} palette.scss, theme.scss, _setup.scss,
  the entry and patterns.json are yours and are never touched.

Next: ${bold('node scripts/ds/... ')}${dim('— see START.md')}
`);

// scripts/docs-forms-derived.mjs

// =============================================================================
// THE RECOMMENDED SET — which form each family takes, for ONE product
// =============================================================================
//
//     node scripts/docs-forms-derived.mjs example/<product>
//
// `FORMS.md` is the whole catalogue and what each form COULD serve. This is the
// other direction: given one product's answers, which form does each family
// actually take, and what else was available.
//
// It exists because `DERIVED.md` was hand-listing about eleven families out of
// forty-two. For the other thirty-one a client saw no recommendation at all,
// which means the shapes came from the library and nobody noticed — the failure
// this whole line of work is about, arriving in the one document meant to
// prevent it.
//
// -----------------------------------------------------------------------------
// THE RANKING RULE
// -----------------------------------------------------------------------------
//
// **Prefer the most specific form that fits**, measured as the smallest share
// of the answer space it serves. A form that serves 8% of products was chosen
// BY the answers; a form that serves 100% is what the family falls back to when
// the answers said nothing about it.
//
// That makes the summary at the end the useful part: a family whose pick is a
// universal fallback is a family this product's answers did not decide, and the
// fix is a condition column in the catalogue rather than a better generator.
//
// -----------------------------------------------------------------------------
// WHAT IT DOES NOT DO
// -----------------------------------------------------------------------------
//
// It does not choose between forms separated by CONTENT. "A count, read-only"
// against "filters the user applied" is a distinction only the screen can make,
// so where several forms survive in a `per-role` family, all of them are listed
// with the content that selects each. That is the answer, not a failure to
// decide: the interview supplies one half and whoever builds the screen the
// other.
// =============================================================================

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { AXES, readForms, satisfies, triggers } from './lib/forms.mjs';
import { buildAxes, coverFamily } from './lib/coverage.mjs';
import { CATALOGUES, AXIS_SHAPED, COHERENT } from './lib/catalogues.mjs';

const dir = process.argv[2];
if (!dir || !existsSync(join(dir, 'DESIGN_LANGUAGE.md'))) {
  console.error('docs-forms-derived: pass a product directory holding DESIGN_LANGUAGE.md');
  process.exit(1);
}

// --- the product's answers --------------------------------------------------
const doc = readFileSync(join(dir, 'DESIGN_LANGUAGE.md'), 'utf8');
const fm = doc.split('---')[1] ?? '';

const answers = {};
for (const m of fm.matchAll(/^([a-zA-Z][a-zA-Z0-9]*):\s*(.+?)\s*$/gm)) {
  const [, key, raw] = m;
  const value = raw.replace(/\s+#.*$/, '').trim();
  if (!value || value === '~') continue;
  // Only keys the catalogues discriminate on; the rest are real answers that
  // simply decide something other than a form.
  if (AXES[key]) answers[key] = value;
}
// `ladderSpend: 2` is a number in YAML and a string in the axis vocabulary.
if (answers.ladderSpend) answers.ladderSpend = String(answers.ladderSpend);

const families = CATALOGUES.flatMap(([kind, file]) =>
  readForms(file).map((f) => ({ ...f, kind }))
).filter((f) => !AXIS_SHAPED.has(f.name));

const axes = buildAxes(families, AXES);

// --- choose ------------------------------------------------------------------
const excludes = (family, a, b) =>
  (family.excludes ?? []).some(([x, y]) => (x === a && y === b) || (x === b && y === a));

const rows = [];
const skipped = [];
let fallbacks = 0;
let decided = 0;

for (const family of families) {
  // A family may not apply to this product at all — an aside on a
  // single-column page, a workspace in a reading product. Honouring the
  // precondition here matters more than in the coverage walk: there it
  // prevents a false hole, and here it prevents a RECOMMENDATION for something
  // the product does not have, which reads as a decision somebody made.
  if (family.only?.length && !family.only.some((v) => Object.values(answers).includes(v))) {
    skipped.push(family.name);
    continue;
  }

  const { total, fitting } = coverFamily(family, axes, COHERENT);

  const live = family.forms
    .filter((f) => satisfies(f.fits, answers) && !triggers(f.avoid, answers))
    .map((f) => ({
      form: f,
      reach: Math.round(((fitting.get(f.name) ?? 0) / total) * 100)
    }))
    .sort((a, b) => a.reach - b.reach);

  const chosen = [];
  const ruledOut = [];

  for (const cand of live) {
    if (family.multiplicity === 'one' && chosen.length) {
      ruledOut.push([cand.form.name, 'this family takes one treatment per product']);
      continue;
    }
    const clash = chosen.find((c) => excludes(family, c.form.name, cand.form.name));
    if (clash) {
      ruledOut.push([cand.form.name, `never both with "${clash.form.name}"`]);
      continue;
    }
    chosen.push(cand);
  }

  if (!chosen.length) {
    rows.push({ family, chosen: [], ruledOut, none: true });
    continue;
  }
  if (chosen.every((c) => c.reach >= 100)) fallbacks++;
  else decided++;

  rows.push({ family, chosen, ruledOut, none: false });
}

// --- render ------------------------------------------------------------------
const out = [];
const P = (...l) => out.push(...l);
const show = (cond) =>
  cond.all.map((alts) => alts.map((a) => '`' + a.split('=')[1] + '`').join(' or ')).join(', ') || '—';

P(`<!-- ${dir}/FORM-SET.md -->`, '');
P('# The recommended set', '');
P('**Generated — do not edit.** `node scripts/docs-forms-derived.mjs ' + dir + '`');
P('rebuilds it from this product\'s `DESIGN_LANGUAGE.md` and the two form', 'catalogues.', '');
P('Every family, the form this product\'s answers lead to, and what else was', 'available. ' +
  'The alternatives are not rejected — they are what a deviation would', 'cost, named so that changing one is a decision rather than a discovery.', '');
P('**Where a family lists more than one form, they are separated by CONTENT** —');
P('a count against a filter, a message about a field against a message about the');
P('page. That distinction is the screen\'s to make, not the interview\'s, so both');
P('are listed with the condition that selects each.', '');

P('| answer | value |', '|---|---|');
for (const [k, v] of Object.entries(answers)) P(`| \`${k}\` | \`${v}\` |`);
P('');

let kind = null;
for (const { family, chosen, ruledOut, none } of rows) {
  if (family.kind !== kind) {
    kind = family.kind;
    P('---', '', kind === 'component' ? '## Components' : '## Layout', '');
  }
  P(`### ${family.name}`, '');
  if (none) {
    P('**Nothing fits.** This is a hole in the catalogue rather than a choice —', '');
    P('`npm run verify:forms` should have caught it.', '');
    continue;
  }
  P(
    family.multiplicity === 'one'
      ? 'One treatment for the whole product.'
      : 'Several, separated by what the element IS.',
    ''
  );
  P('| take | reach | because | use it when |', '|---|---|---|---|');
  for (const { form, reach } of chosen) {
    const content = [...form.fits.content].join('; ') || 'always';
    P(`| **${form.name}** | ${reach}% | ${show(form.fits)} | ${content} |`);
  }
  P('');
  if (ruledOut.length) {
    P('Not available alongside it:', '');
    for (const [name, why] of ruledOut) P(`- **${name}** — ${why}`);
    P('');
  }
}

if (skipped.length) {
  P('---', '', '## Families this product does not have', '');
  P('Each declares a precondition this product does not meet — an aside on a');
  P('single-column page, a workspace in a reading product. They are listed rather');
  P('than omitted so their absence reads as derived rather than forgotten.', '');
  for (const name of skipped) P(`- ${name}`);
  P('');
}

P('---', '', '## How much the answers actually decided', '');
P(`**${decided}** of ${rows.length} families took a form the answers narrowed.`);
P(`**${fallbacks}** fell back to a form no answer rules out.`, '');
P('The second number is the one to read. A family there is one where this');
P('product could have taken any shape in the catalogue and got the same');
P('recommendation — which means the shape will come from the component library,');
P('and nobody will notice. **The fix is a condition column in the catalogue, not');
P('a better generator.**', '');

const text = out.join('\n');
writeFileSync(join(dir, 'FORM-SET.md'), text);
console.log(
  `docs-forms-derived: ${dir}/FORM-SET.md — ${rows.length} families, ` +
    `${decided} narrowed by an answer, ${fallbacks} on a universal fallback.`
);

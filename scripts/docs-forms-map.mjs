// scripts/docs-forms-map.mjs

// =============================================================================
// FORMS.md — the map, generated from the catalogues
// =============================================================================
//
//     npm run docs:forms
//
// One row per form, with the answers that lead to it and how much of the answer
// space it serves. Generated rather than written, for the same reason
// `FOUNDATIONS.md` is: a hand-kept map of two hundred forms is accurate on the
// day it is written and wrong a fortnight later, and a map nobody trusts is
// worse than no map, because it gets consulted anyway.
//
// The reach percentage is the useful column and it is not a quality score. A
// form serving 20% of its family's space is not weak — it is SPECIFIC, which is
// what a catalogue is for. The number reads the other way round: a FAMILY whose
// forms all sit near 100% is not discriminating, and the answers feeding it are
// deciding nothing.
// =============================================================================

import { AXES, readForms } from './lib/forms.mjs';
import { buildAxes, coverFamily } from './lib/coverage.mjs';
import { CATALOGUES, AXIS_SHAPED, COHERENT } from './lib/catalogues.mjs';

const families = CATALOGUES.flatMap(([kind, file]) =>
  readForms(file).map((f) => ({ ...f, kind }))
).filter((f) => !AXIS_SHAPED.has(f.name));

const axes = buildAxes(families, AXES);
const tick = (v) => '`' + v + '`';

const show = (cond) => {
  const parts = cond.all.map((alts) => alts.map((a) => tick(a.split('=')[1])).join(' or '));
  return parts.length ? parts.join(', ') : '—';
};

const out = [];
const P = (...lines) => out.push(...lines);

P('<!-- FORMS.md -->', '');
P('# The form map', '');
P('**Generated — do not edit.** `npm run docs:forms` rebuilds it from');
P('`component-forms.md` and `layout-forms.md`.', '');
P('Every form the two catalogues offer, the answers that lead to it, and how much');
P('of the answer space it serves. It exists to answer one question: **can the');
P('interview actually reach all of these?** `npm run verify:forms` is the');
P('enforcement — this is the thing you read.', '');
P('**Each family is measured over the answers IT reads**, not over the product of');
P('every answer in the system. A family whose forms name `posture` and');
P('`monochrome` cannot be made empty by the frame or the dwell, so multiplying');
P('those out would ask the same question thousands of times for the same result.', '');
P('**Reach is specificity, not quality.** A form at 20% is doing the job a');
P('catalogue exists for. A FAMILY whose forms all sit near 100% is the warning:');
P('it means the answers decide nothing there.', '');

const universal = [];
let kind = null;

for (const family of families) {
  if (family.kind !== kind) {
    kind = family.kind;
    P('---', '');
    P(kind === 'component' ? '# Component forms' : '# Layout forms', '');
    P(
      kind === 'component'
        ? 'The shapes a component takes.'
        : 'The shapes a page takes. A page has fewer legitimate variants than a ' +
          'component, so a layout family carrying one universal fallback and three ' +
          'specific forms is the expected shape here — not a sign of a weak table.',
      ''
    );
  }

  const { local, total, fitting } = coverFamily(family, axes, COHERENT);

  P('## ' + family.name, '');
  if (family.only?.length) {
    P('Only when ' + family.only.map(tick).join(' or ') + '.', '');
  }
  P(
    'Over ' + total + ' combinations of ' + local.length + ' answers: ' +
      local.map((a) => a.key).join(', ') + '.',
    ''
  );
  if (family.excludes?.length) {
    P("**Never both**, so choosing one rules the other out for this product:", "");
    for (const [x, y] of family.excludes) P("- " + x + " / " + y);
    P("");
  }
  P("| form | reach | led to by | ruled out by | content it needs |");
  P('|---|---|---|---|---|');

  for (const form of family.forms) {
    const pct = Math.round((fitting.get(form.name) / total) * 100);
    if (pct >= 100) universal.push(family.name + ' — ' + form.name);
    const content = [...form.fits.content, ...form.avoid.content].join('; ') || '—';
    P(
      '| ' + form.name + ' | ' + pct + '% | ' + show(form.fits) + ' | ' +
        show(form.avoid) + ' | ' + content + ' |'
    );
  }
  P('');
}

P('---', '');
P('## Forms no answer narrows', '');
P('These reach every combination their family is measured over, which means no');
P('answer rules them out. That is right for a genuinely universal shape, and');
P('right for the fallback every layout family needs — a page always has SOME');
P('shape. It is wrong for anything that ought to be specific, where it means a');
P('condition column nobody filled in.', '');
for (const u of universal) P('- ' + u);
P('');

process.stdout.write(out.join('\n'));

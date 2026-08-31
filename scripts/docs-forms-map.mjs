// scripts/docs-forms-map.mjs

// =============================================================================
// FORMS.md — the map, generated from the catalogue
// =============================================================================
//
//     node scripts/docs-forms-map.mjs > FORMS.md
//
// One row per form, with the answers that lead to it and how much of the answer
// space it actually serves. Generated rather than written, for the same reason
// `FOUNDATIONS.md` is: a hand-kept map of a hundred and forty-five forms is
// accurate on the day it is written and wrong a fortnight later, and a map
// nobody trusts is worse than no map, because it gets consulted anyway.
//
// The reach percentage is the useful column and it is not a quality score. A
// form serving 4% of the space is not weak — it is SPECIFIC, which is what a
// catalogue is for. What the number is good for is the opposite reading: a
// family whose forms all sit above 80% is not discriminating, and the questions
// feeding it are deciding nothing.
// =============================================================================

import { AXES, readForms, satisfies, triggers } from './lib/forms.mjs';

const AXIS_SHAPED = new Set(['Table']);

const COHERENT = [
  (a) => (a.elevation === 'borders') === (a.surfaceSeparation === 'lines' || a.surfaceSeparation === 'tones'),
  (a) => (a.elevation === 'soft-shadows' || a.elevation === 'projected-shadows') === (a.surfaceSeparation === 'shadows'),
  (a) => !(a.surfaceSeparation === 'tones' && a.surfaceModel === 'flat')
];

const families = readForms();

const referenced = new Map();
for (const f of families)
  for (const form of f.forms)
    for (const cond of [form.fits, form.avoid])
      for (const alts of cond.all)
        for (const a of alts) {
          const [k, v] = a.split('=');
          if (!referenced.has(k)) referenced.set(k, new Set());
          referenced.get(k).add(v);
        }

const axes = [...referenced.entries()].map(([k, vs]) => {
  const known = AXES[k] ?? [];
  return [k, known.length && known.every((v) => vs.has(v)) ? [...vs] : [...vs, `other:${k}`]];
});

function* combinations(i = 0, acc = {}) {
  if (i === axes.length) {
    if (COHERENT.every((c) => c(acc))) yield acc;
    return;
  }
  const [k, vs] = axes[i];
  for (const v of vs) yield* combinations(i + 1, { ...acc, [k]: v });
}

const reach = new Map();
let total = 0;
for (const answers of combinations()) {
  total++;
  for (const f of families) {
    if (AXIS_SHAPED.has(f.name)) continue;
    for (const form of f.forms) {
      if (!satisfies(form.fits, answers)) continue;
      if (triggers(form.avoid, answers)) continue;
      const key = `${f.name}::${form.name}`;
      reach.set(key, (reach.get(key) ?? 0) + 1);
    }
  }
}

const show = (cond) => {
  const parts = cond.all.map((alts) =>
    alts.map((a) => `\`${a.split('=')[1]}\``).join(' or ')
  );
  return parts.length ? parts.join(', ') : '—';
};

const out = [];
out.push('<!-- FORMS.md -->');
out.push('');
out.push('# The form map');
out.push('');
out.push('**Generated — do not edit.** `npm run docs:forms` rebuilds it from');
out.push('`skills/design-patterns/references/component-forms.md`.');
out.push('');
out.push('Every form the catalogue offers, the answers that lead to it, and how much');
out.push('of the answer space it serves. It exists to answer one question: **can the');
out.push('interview actually reach all of these?** `npm run verify:forms` is the');
out.push('enforcement — this is the thing you read.');
out.push('');
out.push(`Across **${total}** coherent combinations of the ${axes.length} answers the`);
out.push('catalogue discriminates on. Combinations the questionnaire rules out — a');
out.push('bordered system separating its surfaces with shadows — are excluded, because');
out.push('measuring reach against products that cannot exist flatters every number.');
out.push('');
out.push('**Reach is specificity, not quality.** A form at 4% is doing the job a');
out.push('catalogue exists for. A FAMILY whose forms all sit high is the warning: it');
out.push('means the answers are not deciding anything there.');
out.push('');

const universal = [];
for (const f of families) {
  if (AXIS_SHAPED.has(f.name)) continue;
  out.push(`## ${f.name}`);
  out.push('');
  out.push('| form | reach | led to by | ruled out by | content it needs |');
  out.push('|---|---|---|---|---|');
  for (const form of f.forms) {
    const n = reach.get(`${f.name}::${form.name}`) ?? 0;
    const pct = Math.round((n / total) * 100);
    if (pct >= 95) universal.push(`${f.name} — ${form.name}`);
    out.push(
      `| ${form.name} | ${pct}% | ${show(form.fits)} | ${show(form.avoid)} | ` +
        `${[...form.fits.content, ...form.avoid.content].join('; ') || '—'} |`
    );
  }
  out.push('');
}

for (const name of AXIS_SHAPED) {
  out.push(`## ${name}`);
  out.push('');
  out.push('Written as an axis matrix rather than a form catalogue — several decisions,');
  out.push('each with its own options and its own source. Listed here so its absence');
  out.push('from the coverage numbers is visible rather than silent.');
  out.push('');
}

out.push('---');
out.push('');
out.push('## Forms the answers never narrow');
out.push('');
if (universal.length) {
  out.push('These reach 95% or more of the space, which means no answer meaningfully');
  out.push('rules them out. That is right for a genuinely universal shape and wrong');
  out.push('for anything else — a form here that ought to be specific is a condition');
  out.push('column nobody filled in.');
  out.push('');
  for (const u of universal) out.push(`- ${u}`);
} else {
  out.push('None. Every form is narrowed by at least one answer.');
}
out.push('');

process.stdout.write(out.join('\n'));

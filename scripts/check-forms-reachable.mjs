// scripts/check-forms-reachable.mjs

// =============================================================================
// CAN THE ANSWERS REACH EVERY FORM, AND DOES EVERY FAMILY HAVE ONE?
// =============================================================================
//
//     node scripts/check-forms-reachable.mjs
//
// `component-forms.md` states a rule it has no way to keep: *every form must be
// reachable if the answers lead there*. This keeps it, and asks the more useful
// question in the other direction.
//
// -----------------------------------------------------------------------------
// THE TWO CHECKS, AND WHY THE SECOND ONE MATTERS MORE
// -----------------------------------------------------------------------------
//
//   1. UNREACHABLE FORM — a form whose conditions contradict each other, or
//      whose `avoid` cancels its own `fits`. It is in the catalogue and no
//      interview can ever produce it. Dead vocabulary: cheap to write, and it
//      makes the file look richer than it is.
//
//   2. EMPTY FAMILY — a combination of answers for which some family has NO
//      fitting form. This is the one that costs something. A generator that
//      reaches a family with nothing to propose does not stop; it takes what
//      the component library ships, because a library default is the only
//      concrete thing available. That is the exact failure this whole release
//      was written against, and until now nothing could see it.
//
// -----------------------------------------------------------------------------
// WHAT IT DOES NOT CHECK
// -----------------------------------------------------------------------------
//
// Whether a form is a GOOD answer for those conditions. That is judgement and
// it belongs to review. This checks that the catalogue has an answer at all.
//
// Content conditions — "a count, read-only", "few large options" — are always
// satisfiable, because they are the half the interview cannot decide either
// way. A family whose only forms are content-conditioned is therefore never
// empty, and that is correct: whoever builds the screen supplies that half.
// =============================================================================

import { AXES, readForms, satisfies, triggers } from './lib/forms.mjs';

// Families written as an axis matrix rather than a form catalogue. Listed so
// they are reported as skipped rather than silently dropped — a family that
// vanishes from a coverage report is the worst outcome available here.
const AXIS_SHAPED = new Set(['Table']);

// Answer pairs the questionnaire fixes one to one. Enumerating the raw product
// would invent combinations no interview can produce and then report holes in
// them, which is a checker manufacturing its own bugs.
const COHERENT = [
  (a) =>
    (a.elevation === 'borders') === (a.surfaceSeparation === 'lines' || a.surfaceSeparation === 'tones'),
  (a) => (a.elevation === 'soft-shadows' || a.elevation === 'projected-shadows') === (a.surfaceSeparation === 'shadows'),
  // Tone as the separator needs a rung to spend it on.
  (a) => !(a.surfaceSeparation === 'tones' && a.surfaceModel === 'flat')
];

const families = readForms();

// Only enumerate the axes the catalogue actually mentions; the rest cannot
// change any outcome and would multiply the search space for nothing.
const referenced = new Map();
for (const f of families) {
  for (const form of f.forms) {
    for (const cond of [form.fits, form.avoid]) {
      for (const alts of cond.all) {
        for (const a of alts) {
          const [k, v] = a.split('=');
          if (!referenced.has(k)) referenced.set(k, new Set());
          referenced.get(k).add(v);
        }
      }
    }
  }
}

// An axis needs an "anything else" member only when the catalogue does NOT name
// every value it can take — otherwise the synthetic member is a combination no
// interview can produce, and every family looks empty in it. That is a checker
// manufacturing its own bugs, which is worse than not checking: the real holes
// below were buried under fourteen thousand phantom ones on the first run.
const axes = [...referenced.entries()].map(([k, vs]) => {
  const known = AXES[k] ?? [];
  const namesAll = known.length > 0 && known.every((v) => vs.has(v));
  return [k, namesAll ? [...vs] : [...vs, `other:${k}`]];
});

function* combinations(i = 0, acc = {}) {
  if (i === axes.length) {
    if (COHERENT.every((c) => c(acc))) yield acc;
    return;
  }
  const [k, vs] = axes[i];
  for (const v of vs) yield* combinations(i + 1, { ...acc, [k]: v });
}

const problems = [];

// --- check 1: a form no combination can reach -------------------------------
const reached = new Set();

// --- check 2: a family with nothing to offer --------------------------------
const holes = new Map(); // family -> list of answer maps

let total = 0;
for (const answers of combinations()) {
  total++;
  for (const f of families) {
    if (AXIS_SHAPED.has(f.name)) continue;
    let any = false;
    for (const form of f.forms) {
      if (!satisfies(form.fits, answers)) continue;
      if (triggers(form.avoid, answers)) continue;
      any = true;
      reached.add(`${f.name} :: ${form.name}`);
    }
    if (!any) {
      if (!holes.has(f.name)) holes.set(f.name, []);
      holes.get(f.name).push(answers);
    }
  }
}

for (const f of families) {
  if (AXIS_SHAPED.has(f.name)) continue;
  for (const form of f.forms) {
    if (!reached.has(`${f.name} :: ${form.name}`)) {
      problems.push([
        `${f.name} — "${form.name}" is unreachable`,
        'no combination of answers satisfies its conditions without triggering its own "avoid"'
      ]);
    }
  }
}

/** The smallest description shared by every hole: what actually causes it. */
function describe(maps) {
  const shared = [];
  for (const [k] of axes) {
    const vs = new Set(maps.map((m) => m[k]));
    if (vs.size === 1) {
      const v = [...vs][0];
      if (!String(v).startsWith('other:')) shared.push(`${k}=${v}`);
    }
  }
  return shared.length ? shared.join(' and ') : 'any combination';
}

for (const [family, maps] of holes) {
  problems.push([
    `${family} has no fitting form`,
    `${maps.length} of ${total} coherent answer combinations — ${describe(maps)}`
  ]);
}

// --- report -----------------------------------------------------------------
const bold = (s) => `[1m${s}[0m`;
const dim = (s) => `[2m${s}[0m`;

const formCount = families.reduce((n, f) => n + (AXIS_SHAPED.has(f.name) ? 0 : f.forms.length), 0);

if (!problems.length) {
  console.log(
    `check-forms-reachable: ok — ${formCount} forms in ${families.length - AXIS_SHAPED.size} ` +
      `families, every one reachable, none empty across ${total} coherent combinations.` +
      (AXIS_SHAPED.size ? ` ${[...AXIS_SHAPED].join(', ')} skipped: axis matrix, not a form table.` : '')
  );
  process.exit(0);
}

console.error(`\n${bold('Form coverage')} ${dim(`— ${total} coherent answer combinations`)}\n`);
for (const [what, why] of problems) {
  console.error(`  ${bold(what)}`);
  console.error(`    ${dim(why)}\n`);
}
console.error(`${problems.length} problem(s).\n`);
process.exit(1);

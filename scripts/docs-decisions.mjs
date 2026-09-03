// scripts/docs-decisions.mjs

// =============================================================================
// DECISIONS.md — every decision the tool makes, and who makes it
// =============================================================================
//
//     npm run docs:decisions
//
// There are thirty-eight keys in a generated `DESIGN_LANGUAGE.md` and, until
// this file, no single place said what they all are. They lived in three
// places and none of them was a table: the template's front matter with its
// comments, the `AXES` map in `lib/forms.mjs`, and scattered through the
// sections of `derivations.md`.
//
// The question that has no home is the obvious one: **which decisions exist,
// which are asked and which are derived, where does each come from, and what
// checks it?** It came up when a key turned out to have been invisible to
// `check-chain` for months, and nobody could say what else was in the set.
//
// -----------------------------------------------------------------------------
// GENERATED, LIKE THE OTHER TWO
// -----------------------------------------------------------------------------
//
// A hand-written table of thirty-eight keys is accurate on the day it is
// written and wrong a fortnight later, and a map nobody trusts is worse than no
// map because it gets consulted anyway. This reads the template, the
// questionnaire, `derivations.md` and the scripts, and reports what it finds —
// including, deliberately, what it CANNOT find.
//
// **A key with no question, no derivation and no check is the interesting
// row.** It is either inert and should say so, or it is a decision nobody
// implemented.
// =============================================================================

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { keys, frontMatter } from './lib/frontmatter.mjs';
import { AXES } from './lib/forms.mjs';

const TEMPLATE = 'skills/design-language/templates/DESIGN_LANGUAGE.md';
const QUESTIONS = 'skills/design-language/references/questionnaire.md';
const DERIVATIONS = 'skills/design-language/references/derivations.md';

const template = readFileSync(TEMPLATE, 'utf8');
const questionnaire = readFileSync(QUESTIONS, 'utf8');
const derivations = readFileSync(DERIVATIONS, 'utf8');

// Keys the interview collects that decide nothing visual, listed rather than
// inferred so that a key added here and forgotten is reported.
const INERT = new Map(
  Object.entries({
    toolVersion: 'which version of this tool ran the interview',
    archetypeNote: 'free text beside the archetype',
    deviations: 'answers that went against the archetype, with their reasons',
    resolutions: 'conflicts raised and resolved, so a value does not read as arbitrary',
    overrides: 'ergonomics that outranked the archetype — the system working, not a compromise',
    guardrails: 'what the system must never do, with how a build would know'
  })
);

/** The line in the template that declares this key, with its comment block. */
function templateBlock(key) {
  const fm = frontMatter(template).split('\n');
  const at = fm.findIndex((l) => l.startsWith(`${key}:`));
  if (at < 0) return { line: '', comment: '' };
  let start = at;
  while (start > 0 && (fm[start - 1].startsWith('#') || fm[start - 1].trim() === '')) {
    if (fm[start - 1].trim() === '' && (start - 2 < 0 || !fm[start - 2].startsWith('#'))) break;
    start--;
  }
  return {
    line: fm[at],
    comment: fm.slice(start, at).filter((l) => l.startsWith('#')).join('\n')
  };
}

/** Which numbered question asks for this key, if any. */
function askedBy(key) {
  // Read from the question's own DECLARATION and from nothing else. Each
  // question names the key it fills after an arrow in its heading.
  //
  // The first version found the nearest question heading above any mention of
  // the key. That read `posture` as asked at question 6 — because question 6
  // discusses it — and `voice` as asked at question 3, and `surfaceModel` as
  // asked at all when it is derived. A table that is confidently wrong is worse
  // than one that is usefully incomplete, and this generator exists to be
  // trusted.
  const re = new RegExp(`\\*\\*(\\d+[a-c]?)\\.[^\\n]*→[^\\n]*\`${key}\``, 'g');
  const m = re.exec(questionnaire);
  return m ? m[1] : null;
}

/** Which section of derivations.md derives it. */
function derivedIn(key) {
  const sections = [...derivations.matchAll(/^## ([A-Z])\. ([^\n]+)/gm)];
  const hits = [];
  for (let i = 0; i < sections.length; i++) {
    const start = sections[i].index;
    const end = i + 1 < sections.length ? sections[i + 1].index : derivations.length;
    const body = derivations.slice(start, end);
    if (body.includes(`\`${key}\``) || body.includes(`${key}:`)) {
      hits.push(sections[i][1]);
    }
  }
  return hits;
}

/** Which scripts name it. */
const scripts = readdirSync('scripts')
  .filter((f) => f.endsWith('.mjs'))
  .map((f) => [f, readFileSync(join('scripts', f), 'utf8')]);

const checkedBy = (key) =>
  scripts.filter(([, src]) => src.includes(`'${key}'`) || src.includes(`${key}:`)).map(([f]) => f);

// --- gather ------------------------------------------------------------------
const rows = keys(template).map((key) => ({
  key,
  values: AXES[key] ?? null,
  inert: INERT.get(key) ?? null,
  question: askedBy(key),
  derived: derivedIn(key),
  checks: checkedBy(key),
  line: templateBlock(key).line
}));

// --- render ------------------------------------------------------------------
const out = [];
const P = (...l) => out.push(...l);
const tick = (v) => '`' + v + '`';

P('<!-- DECISIONS.md -->', '');
P('# Every decision, and who makes it', '');
P('**Generated — do not edit.** `npm run docs:decisions` rebuilds it from the');
P('template, the questionnaire, `derivations.md` and the scripts.', '');
P('Thirty-eight keys live in a generated `DESIGN_LANGUAGE.md` and, until this');
P('file, no single place said what they all are — they were spread across the');
P('template\'s comments, an axis map in a script, and the sections of');
P('`derivations.md`. The question with no home was the obvious one: **which');
P('decisions exist, which are asked, which are derived, and what checks each?**', '');
P('The column to read is the last one. **A key with no question, no derivation');
P('and no check is either inert — and should say so — or a decision nobody');
P('implemented.**', '');

const asked = rows.filter((r) => r.question && !r.inert);
const derived = rows.filter((r) => !r.question && !r.inert);
const inert = rows.filter((r) => r.inert);

P(`| | count |`, '|---|---|');
P(`| asked in the interview | ${asked.length} |`);
P(`| derived from an answer | ${derived.length} |`);
P(`| recorded, deciding nothing visual | ${inert.length} |`);
P('');

const table = (list, showQ) => {
  P(
    showQ
      ? '| key | values | question | derived in | checked by |'
      : '| key | values | derived in | checked by |'
  );
  P(showQ ? '|---|---|---|---|---|' : '|---|---|---|---|');
  for (const r of list) {
    const v = r.values ? r.values.map(tick).join(' · ') : '—';
    const d = r.derived.length ? r.derived.map((s) => `§${s}`).join(', ') : '—';
    const c = r.checks.length ? r.checks.map((f) => tick(f.replace('.mjs', ''))).join(', ') : '**—**';
    P(
      showQ
        ? `| \`${r.key}\` | ${v} | ${r.question} | ${d} | ${c} |`
        : `| \`${r.key}\` | ${v} | ${d} | ${c} |`
    );
  }
  P('');
};

P('---', '', '## Asked', '');
P('The interview puts these to the client. Every one is a fact about the product');
P('that its owner knows and a designer would have to guess — that is the test a');
P('question has to pass to stay here, and eight failed it across 0.8.0 and');
P('0.9.0.', '');
table(asked, true);

P('---', '', '## Derived', '');
P('Computed from the answers and shown in the read-back with their provenance.');
P('**A derived default is not a decision taken away from anyone** — it is a');
P('decision made by the thing with the standing to make it, and shown.', '');
P('And a derivation presented as a MENU is still a question: present the');
P('consequence, never the token.', '');
table(derived, false);

P('---', '', '## Recorded, deciding nothing visual', '');
P('These carry the reasons rather than the values, and a document without them');
P('is a set of numbers nobody can defend six months later.', '');
P('| key | what it holds |', '|---|---|');
for (const r of inert) P(`| \`${r.key}\` | ${r.inert} |`);
P('');

const naked = rows.filter((r) => !r.inert && !r.question && !r.derived.length);
P('---', '', '## Keys with neither a question nor a derivation', '');
if (naked.length) {
  P('Each is either a decision nobody implemented, or an inert key missing from');
  P('the list in `scripts/docs-decisions.mjs`. Neither is acceptable silently.', '');
  for (const r of naked) P(`- \`${r.key}\``);
} else {
  P('None. Every key is either asked, derived, or declared inert.');
}
P('');

const unchecked = rows.filter((r) => !r.inert && !r.checks.length);
P('## Decisions no script checks', '');
P('Not a failure by itself — many decisions have no mechanical consequence a');
P('build can test. It is a list to read rather than to empty: a decision here');
P('is one the tool can record and cannot enforce.', '');
if (unchecked.length) for (const r of unchecked) P(`- \`${r.key}\``);
else P('None.');
P('');

writeFileSync('DECISIONS.md', out.join('\n'));
console.log(
  `docs-decisions: DECISIONS.md — ${rows.length} keys, ${asked.length} asked, ` +
    `${derived.length} derived, ${inert.length} inert, ${naked.length} with neither, ` +
    `${unchecked.length} unchecked.`
);

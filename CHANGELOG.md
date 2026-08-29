<!-- CHANGELOG.md -->

# Changelog

This tool is **vendored**: a project copies `src/` into its own tree rather than
resolving it from a package manager. So a project can sit several versions
behind and nothing will tell it — there is no dependency range to violate and no
install step to fail.

That is what this file is for. Every entry that requires action from a vendoring
project carries a **To upgrade** block with the concrete edit, so catching up is
reading this file top-down and applying the blocks newer than your copy.

Which version you have is in `package.json`. If your copy predates versioning,
start at 0.2.0 and apply everything.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning is [semantic](https://semver.org/spec/v2.0.0.html), where "public
API" means the layer 2 token contract, the layer 3 name contract, and the
signatures of `emit-theme()`, `core.context()` and each adapter's `emit()`.

---

## [Unreleased]

---

## [0.6.0]

**Four runs of the `design-system` skill against a deliberately weaker model,
each one allowed to fail, plus the first hand-built monochrome-on-a-library
example.** The runs found gaps in the instructions; building the example found
two bugs in the code, one of which was reachable by all eleven adapters.

**To upgrade:** copy the new `src/`, then read *Changed* below — the
`emit-theme()` input vocabulary has always been what it is, but it was not
written down anywhere until now, and a project that guessed it from the emitted
names has a theme that does not compile.

### Fixed

- **An adapter could not read a `monochrome` or `brand` theme.** Adapters that
  derive colour channels do `map.get($choices, link)` on the theme map, and a
  monochrome map declares `accent` and never declares `link` — so the build died
  with *"$color: null is not a color"* three frames inside the adapter, saying
  nothing about schools.

  Normalisation moved from `_semantic.scss` (private) into `_roles.scss` (public
  as `normalise()`), and `core.require-themes()` now applies it. That is the one
  line every adapter already calls, so all eleven are fixed at once and none of
  them has to know the vocabulary rules.

  The bug was reachable by every adapter since per-school vocabularies landed in
  0.4.0 and had never fired, because no example combined an adapter with a
  non-functional school. `example/recepta-monochrome-coreui` is now that
  combination, and it is in `npm run verify`.

- **`icon-stroke` had no token.** 0.5.0 added `iconStroke` to the design
  language and never added its destination, so a decision was recorded with
  nowhere to land. Now in layer 2 beside `size-icon`, as a literal length: it is
  a drawn line rather than a layout measure, and it does not scale with density.

- **A ramp seed is a pigment, not the page colour.** The seed's own chroma is
  the peak the curve multiplies, so `ramp.neutral(oklch(0.97 0.012 85))` — the
  paper you can see — leaves a peak of 0.007 at `$pigment: 0.6` and produces an
  ordinary grey ramp. **Nothing errors**, because a grey ramp is a valid ramp.
  Two runs made this exact mistake and so had the example's own
  `DESIGN_LANGUAGE.md`, which named the page instead of the pigment. Documented
  in `worked-example.md`, corrected in the example.

### Added

- **`references/worked-example.md` for `design-system`.** The skill had no
  calibration file while `design-language` had one, which is most of why the
  first run invented its own shape. Shows all three authored files —
  `palette.scss`, `theme.scss`, the entry — from a product that compiles.

  Each of its four sections closed a failure a run had already produced: the
  theme-map key vocabulary, the entry that emits (a run wrote a theme map and
  never emitted it, producing an empty stylesheet that looked finished), the
  `$structure` map (radius and `size-control` decided and never emitted, which
  no gate reports because a default is a valid value), and the adapter `emit()`
  call that takes the theme maps rather than their names.

- **The `emit-theme()` input contract, in `tokens.md`.** That file documented
  the 126 names the build **emits**; nothing documented the different vocabulary
  a theme map **accepts** — `page`, not `bg-page`. Guessing from the emitted
  names was the commonest first-build failure and there was no way not to guess.
  Adds the key table, the per-school interactive keys, the rule that a theme map
  must be COMPLETE (`_req()` errors on the first missing key), and what
  hand-written product CSS reads per school.

- **A STOP protocol at the top of all three skills.** In a chat there is no
  filesystem, so "not read yet" and "does not exist" are indistinguishable and a
  model resolves the ambiguity by assuming it knows enough: one run, handed only
  `SKILL.md`, regenerated `_semantic.scss`, `_ramp.scss` and `_config.scss` from
  memory rather than asking for them.

  The test is now concrete — *can you quote a line from it?* — and the first
  reply is written out verbatim, so the person running the skill does not have
  to read it to find out what it needs. `design-system` asks for four files plus
  three conditional ones; `design-language` for six, naming the two with no
  workaround; `design-patterns` for the project's ledger, which cannot be
  reconstructed from a library's documentation without producing the opposite of
  that skill's purpose.

- **`references/review.md` for `design-system`** — 52 checks, deliberately
  avoiding what `npm run verify` already catches, because repeating those would
  pad the list and prove nothing. What is left is what a green build cannot see:
  whether the values are the ones the document asked for, and whether each token
  carries the meaning its name claims. Runs without a terminal report the five
  build-only checks as `unverifiable` rather than guessing.

  With the note that matters most: **distrust a clean report on your own
  output.** A run reviewed a theme it had just written and reported *0 fail*
  while that theme used the functional vocabulary under `monochrome`, called
  `base.pal()` with a ramp map, configured no adapter for a CoreUI product and
  carried citation markers on half its lines.

- **`example/recepta-monochrome-coreui`** now builds: `palette.scss`,
  `theme.scss`, `ds.scss`, compiled by `npm run build:example-recepta` and
  checked by `verify:examples-refs`. First example combining a library with a
  non-functional school, which is what surfaced the adapter bug.

- **`AGENTS.md`**, and the rule it holds: **every file opens with a comment
  naming its own path.** Files reach agents detached from their tree — pasted
  into a chat, quoted in a review, attached to a message — and a `theme.scss`
  with no path could be any of the seven under `example/`. Applied retroactively
  to 58 source files and 24 markdown files. JSON is excepted, having no comment
  syntax; inventing a `"_path"` key to fake it would create a data field
  something eventually reads.

### Changed

- **Configuration is `@use "…/src/config" with (…)` in the project entry**, not
  an edited `src/_config.scss`. Every example in `example/` already did this;
  `install.md` said the opposite in four places. A run merged the two and
  produced a file labelled `src/_config.scss` that `@use`s itself, which is the
  only thing a reader could produce from contradictory instructions.

- **The install interview is six questions, not three.** The old question 1
  carried four decisions — foundation, `reset-a11y`, prefix, themes — with two
  of them labelled "sub-decisions", which is the same fused-question failure the
  `design-language` interview had. Every option is lettered, the eleven adapters
  included, and a read-back step now sits between the last answer and the first
  file copied.

- **The authored set is a closed list of three files**, not a blocklist of files
  to avoid. A blocklist cannot name `src/components/_button.css`, which a run
  invented, and it does not stop a hand-written `:root { --app-* }` block, which
  another run wrote to duplicate what `emit-structure()` emits.

- **The first-turn file list is four files, down from ten.**
  `colour-strategies.md` is covered by the school tables added to `tokens.md`,
  and `src/_config.scss` is a file nobody authors whose four settings are named
  in the handoff table. Asking for either cost a fetch and bought nothing.
  `install.md` is now conditional — generating files in a chat installs nothing.

- **The skill asks which component library the product uses.**
  `DESIGN_LANGUAGE.md` does not record it, and should not: a design language
  outlives the library beneath it. Four runs out of five silently emitted
  `$adapters: ()` for a product that had one.

---

## [0.5.0]

**The "guidelines" layer, resolved by deciding it already exists.** A survey of
how Spectrum and others split Foundations from Component Specs came back with a
proposal for a fourth document, `GUIDELINES.md`, holding token-application
rules, do's and don'ts and accessibility. That document is not added: those
three things already live in `DESIGN_LANGUAGE.md` §2/§4/§5, in
`references/tokens.md`, and in `patterns.json`. A third file restating them
would drift from both within a release.

What the survey did surface were three genuine gaps, closed here. The review
checklist below came from a separate ask and is not one of them.

**Why minor and not a patch.** 0.4.1 said, in as many words, that a strong model
would produce the same document it produced in 0.4.0 — it changed who could run
the skill, not what came out. That is no longer true: a run now emits three
iconography keys and a section 6 that did not exist, so the shape of the
generated artefact changed. **Why not major:** everything is additive. An
existing ledger still validates, an existing `DESIGN_LANGUAGE.md` still parses,
and no token was renamed. Nothing in `src/` was touched at all.

**To upgrade** — three edits, all to files in your project, none urgent enough
to block anything:

1. **Add the iconography keys** to your `DESIGN_LANGUAGE.md` front matter and a
   short **Iconography** subsection to §2. Take the values from your archetype's
   row in `archetypes.md`. If you have shipped icons already, read the real ones
   out of the code and record those instead — and if they disagree with the
   preset, that is a deviation, not a correction.

2. **Add a Shape subsection** to §2 if `radius` is declared and unexplained —
   see *Fixed* below. It is the same edit for every project, and it is the one
   most likely to be missing.

3. **Optional: add `composition`** to `patterns.json`, and `dos`/`donts` to the
   patterns that have a rule the verifier cannot catch. Skipping this changes
   nothing; the fields are optional and their absence means the same as before,
   which is that nobody wrote the rule down.

Then set `toolVersion: 0.5.0`.

### Added

- **Iconography, question 8.** The foundation most often left undecided, and the
  reason a product ends up mixing two icon sets and reading as two products.
  Adds `iconStyle`, `iconStroke` and `iconSize` to the front matter, an
  `icon-style`/`icon-stroke`/`icon-size` row per archetype in `archetypes.md`,
  and a template section. Three rules come with it: stroke weight answers to the
  body type rather than to the icon set's default, corner geometry follows
  `radius-control`, and icons inherit `currentColor` — an icon set with its own
  palette fights every theme the product will have, and shows it first in dark
  mode.

  Questions 8–17 shift to 9–18; the interview is now eighteen questions.

- **`dos`, `donts` and `responsive` per pattern** in the ledger schema. The
  place for *"tabs only on desktop; below the tablet breakpoint this becomes an
  accordion"* — a rule no verifier can catch and every product has. They live in
  `patterns.json` rather than in a README beside the component because that is
  the file read at the moment markup is written; a markdown file in the
  component's folder is a display case, never open when it would have mattered.
  Generate it from the ledger, do not maintain it in parallel. A `dont` with a
  detectable signature still belongs in a `forbidden` entry or in stylelint,
  where it fails a build.

- **Composing a screen the system has no component for**, split across the two
  files on purpose:

  | | holds | example |
  |---|---|---|
  | `DESIGN_LANGUAGE.md` §6 | relations, which survive a change of theme | "a section title is two steps above body" |
  | `composition` in `patterns.json` | bindings true of THIS theme | `sectionTitle: text-2xl` |

  One design language can have several token themes, so a value true of one
  theme cannot live in the document that outlives it. This is the ad-hoc screen
  case: tokens give the paint, and until now nothing gave the grammar — a page
  built outside the component list came out with correct tokens and wrong
  proportions, which passes every guard the repository has.

  §6 is **derived from the archetype and shown in the read-back, not asked**.
  A client has no opinion about vertical rhythm in the abstract and a strong one
  the moment they see a proposal, so showing it costs one exchange where asking
  would cost four and get worse answers.

- **`example/recepta-monochrome-coreui/`** carries all three: iconography in the
  front matter and in section 2, and a filled section 6.

- **`references/review.md`** — thirty-one checks run against the finished
  document, each one having already failed in a real run. Grouped by what they
  can see: the front matter contract, the interview (marked `[T]`, needing the
  transcript), template completeness, and the judgement calls a machine cannot
  make. It runs two ways — the agent reads it at the end of its own session, or
  a client pastes it into a fresh chat with the document alone and gets an audit
  from a model that never saw the interview. Checks needing the transcript come
  back `unverifiable` rather than guessed, which is itself a test: a design
  language that cannot be audited without its interview is under-written.

  Two rules make it more than theatre. **Report, do not repair** — the failure
  that motivated the file was a run that noticed a conflict while writing and
  resolved it by widening the archetype, deleting the conflict instead of
  recording it; a reviewer that edits is a second author and the client never
  learns anything was wrong. And **walk the deviations mechanically**, because
  that check passes every time when left to judgement: the reviewer has no more
  reason to doubt an answer than the author did.

### Fixed

- **`radius` had nowhere to be explained.** Section 2 of the template had
  colour, typography, spacing and elevation but no **Shape** subsection, so the
  most recognisable archetype signal in the system was declared in the front
  matter and argued nowhere. Found by running the new checklist against the
  example on its first pass, which is the outcome it exists for.

---

## [0.4.1]

**Corrections only — no new capability.** Everything here makes the
`design-language` skill executable by a weaker agent; a run on a strong model
produces the same document it did in 0.4.0.

**The interview was run three times against a deliberately weaker model, and
each run was allowed to fail.** Nothing in `src/` changed — this is entirely
the skill, its questionnaire and its template. The transcripts
are in `tasks/gemini-tests/`, and every fix below names the failure that
produced it rather than the principle it upholds.

Why bother: a skill that only works when the model is strong is a skill that
works when it is not needed. Each failure below was a gap in the instructions
that a capable model happened to paper over.

**To upgrade:** nothing to apply. If your project already has a
`DESIGN-LANGUAGE.md`, rename it to `DESIGN_LANGUAGE.md` — see *Renamed* below.

### Fixed

- **Question 8 could be skipped by naming a colour school.** The brand-colour
  question sat directly above a block headed `8d–8f — accent-driven only`, so a
  client opening with "we're accent-driven" read as having answered it. The
  interview then produced *"a saturated blue ink tone"* where the build needs a
  number.

  Block 4 is renumbered so no question is a lettered child of an unrelated
  parent: **8** is the colour school (8a opener, 8b decider), **9** is the brand
  colour, **10** is the accent-driven profile (10a–10c, conditional), **11** is
  the secondary action. Questions 12–17 shift accordingly. Question 9 now states
  that neither the archetype *nor the school* answers it, and that a description
  — "ballpoint blue on recycled paper" — gets converted to values on the spot and
  read back for confirmation.

- **The school is now asked before the colour, not after.** The school changes
  what the colour question is about: in `functional` it opens a palette of
  roles, in `monochrome` it is the only chromatic decision in the product.
  Asking first made clients choose a colour without knowing what it would do.

- **"Confirm rather than enumerate" was compressing options, not questions.** A
  run fused three mutually exclusive elevation answers into one yes/no —
  *"hierarchy from whitespace and thin borders, with imperceptible shadows —
  confirm?"* — took a single "yes", and emitted `elevation: soft-shadows` for a
  client who had said borders. Confirming now means proposing exactly one
  option; a sentence naming two is not a confirmation.

- **A question could carry three decisions.** Question 17 held confirmations,
  destructive friction and form submission under one number, collected "A, A"
  for three slots, and dropped one answer with no way to tell which. Split into
  **17a/17b/17c**, with the general rule stated: one number, one decision.

- **The interview could restart itself.** On turn four of four, a run re-asked
  block 1 from the top — not a context-length failure but a stateless one: the
  interview's state lived only in the model's attention over the transcript.
  Every reply now opens with a ledger of what has been collected and what
  remains, so the state is in the most recent text. The interview never
  restarts; a model unsure of its position reconstructs the ledger and confirms
  it, which is recoverable in a way that starting over is not.

- **`deviations` came out empty by construction.** Two separate runs promoted a
  client's stated archetype to `hybrid` at the last step so that a conflicting
  answer stopped being a conflict — laundering the deviation instead of
  recording it. Two changes: deviations are now **computed** by walking every
  answer against the archetype's ✅/⚠️/❌ row before the read-back, and the
  archetype is explicitly the client's answer, changeable only by asking.

- **The read-back was advice, and a run wrote a file that contradicted its own
  approved table.** It is now a gate with a contract: the emitted front matter
  equals what the client approved, key for key, and wanting to change a value
  while writing is a new question rather than an edit.

- **Question 16 asked clients to invent prohibitions.** Nobody arrives at a
  first interview with a list of things an unbuilt product must never do;
  restrictions come from having been burned. Split into **16a**, which presents
  the archetype's own restrictions as already held for confirmation, and
  **16b**, where *"nothing for now"* is the first option and is documented as
  the expected, correct answer. `guardrails: []` is now the normal first state.

- **The template asked for values the interview never collected.** Typography
  faces and the spacing unit had no question behind them, so runs either
  invented a font stack or dropped the section entirely. Both placeholders now
  point at the archetype preset in `archetypes.md` and require the source to be
  named. `density` must be stated in pixels, not adjectives.

- **Whole template sections went missing.** Reconstructing the document from
  memory instead of the file lost spacing and grid, the 45–75 character measure,
  `prefers-reduced-motion` and the closing section. The skill now requires
  reading the template in full and reproducing every heading, empty ones
  included, carrying `undecided`.

### Added

- **Six invariants checked before the file is emitted**, each one having already
  produced a broken document: `surfaceSeparation` pairs one-to-one with
  `elevation`; `elevationCarrier` is set only for `borders`; the accent trio
  appears only under `monochrome`; the brand colour is a value and not an
  adjective; every front matter key is explained in the prose; every ledger
  answer reaches the document.

- **Defaults instead of menus** wherever the archetype or school already has an
  answer — secondary action per school, status colours per archetype, the three
  interaction patterns. Every option is lettered; a client answers "C" in a
  second and composes the same answer in prose in a minute.

- **`example/recepta-monochrome-coreui/`** — the interview's output for a
  monochrome Editorial product on CoreUI, kept as the corrected version of the
  third test run with a README naming each correction. Steps 2 and 3 are not
  built yet.

- **`toolVersion` in the generated front matter.** The document now records
  which version of the tool ran the interview, read from `package.json` rather
  than guessed. The tool is vendored, so nothing tells a project it has fallen
  behind; this line is where the next reader starts working through this file.
  Without it, catching up means diffing a document against a template of
  unknown vintage.

  **To upgrade:** add `toolVersion:` as the first key of your
  `DESIGN_LANGUAGE.md` front matter, set to the version you last applied — not
  to the current one, unless you have applied everything up to it.

### Renamed

- **`DESIGN-LANGUAGE.md` → `DESIGN_LANGUAGE.md`**, across the three skills, the
  template, `src/_config.scss` and the examples.

  **To upgrade:** `git mv DESIGN-LANGUAGE.md DESIGN_LANGUAGE.md` at your project
  root. Nothing reads the file programmatically, so a stale name degrades to an
  agent not finding it rather than to a build failure.

---

## [0.4.0]

**Layer 2 stops being one contract shared by three schools and becomes three
vocabularies.** The largest change in the tool so far, and the one that makes
the school a real architectural choice rather than a lint setting.

### Changed

- **BREAKING: each school emits its own layer 2 names.**

  | canonical            | `functional`   | `brand`               | `monochrome`   |
  | -------------------- | -------------- | --------------------- | -------------- |
  | `bg-action`          | `bg-action`    | `bg-primary`          | `bg-accent`    |
  | `fg-on-action`       | `fg-on-action` | `fg-on-primary`       | `fg-on-accent` |
  | `bg-action-subtle`   | (same)         | `bg-primary-container`| `bg-accent-subtle` |
  | `bg-selected`        | (same)         | (unchanged)           | `bg-accent`    |
  | `fg-link`            | (same)         | (unchanged)           | `fg-accent`    |

  Surfaces, ink, borders, shadows, disabled and the whole status family are
  common to all three and are **not** renamed. Renaming those would be
  vocabulary for its own sake.

  Measured on the accent-driven example: **8 interactive colour names against
  functional's 15**, and the three canonical families that collapse onto the
  accent are now one declaration in the theme map instead of three filled with
  the same value.

  **To upgrade:** if your project is `functional` — the default — nothing
  changes; that school IS the canonical vocabulary. Otherwise, rename the
  interactive tokens your product CSS reads by hand, per the table.
  `check-dangling-refs.mjs` names every one you miss, and it now runs over the
  examples in `npm run verify` so the same regression cannot come back.

- **Theme maps are written in their school's vocabulary.** A monochrome theme
  declares `accent` once rather than filling `action`, `selected` and `link`
  with the same value; a brand theme declares `primary`. The canonical keys
  still work and always win when both are present, so a monochrome product whose
  links really are a step lighter than its buttons writes `link` and keeps it.

- **BREAKING: layer 3 reads through `core.ref()` instead of writing `var()`.**
  All 289 entries. They spelled `var(--app-bg-action)` literally, which meant the
  entire layer bypassed the school resolver and a monochrome build would have
  emitted accent tokens that layer 3 never pointed at. Verified behaviour-
  preserving: `dist/ds.css` is byte-identical for the functional school.

  **To upgrade:** nothing, unless you override a layer 3 entry in your
  `tokens.scss`. Those still take a plain `var()` and are unaffected.

### Added

- `src/_roles.scss` — the canonical→school map, and one place where every
  collapse is written down. `core.ref('bg-action')` resolves through it at build
  time, so eleven adapters and 289 layer 3 entries keep a single code path and
  still produce school-correct CSS.

- **A collapse assertion.** Where a school maps several canonical roles onto one
  emitted name, their values must agree, and the build fails naming both if they
  do not. A "monochrome" theme whose action and selection are different colours
  is not monochrome, and the build says so instead of emitting whichever the map
  iterated last.

### Fixed

- `core.theme()` typed `var(--app-bg-selected)` by hand for `accent-color`, in
  the one file whose own header says nothing else in the codebase should. It was
  invisible until the vocabularies split, and then it was the single name
  leaking canonical spelling into a monochrome build.

- The brand map's first draft sent both `action-subtle` and `selected` to
  `primary-container`, on the reasoning that the brand school merges them. Itau
  — reconstructed here from 383 custom properties read off the live site — has a
  pale lilac selection and an orange action, and the new assertion refused to
  compile it. The school is that action and selection may share a HUE, not that
  they are one token. **Caught by a real system rather than by review.**

---

## [0.3.0]

Accent-driven becomes a school the tool actually supports, rather than a value
`check-roles()` recognises.

### Added

- **`src/_ramp.scss` — generated layer 1.** `ramp.neutral($seed, $pigment:)` and
  `ramp.chromatic($seed)` turn two pigments into two full palettes with the same
  step keys a hand-written family uses, so `pal(paper, 100)` keeps working and a
  project can swap a hand-tuned palette for a generated one without touching
  layer 2.

  Offered, not imposed. It is how the accent-driven school works — a neutral
  ramp plus one accent, mapped by ladder position — and it is the wrong tool for
  `functional`, whose layer 1 is several independently chosen hues where which
  hue plays which role IS the design.

  Chroma is a CURVE, not a constant: it peaks in the mid-tones and falls toward
  both ends. That was measured off a hand-tuned paper palette, not invented — a
  flat chroma gives the pale steps a cast that reads as a miscalibrated monitor.

- `example/ds-caderno-accent-driven/` — the school built from two pigments, no
  component library, with its `DESIGN_LANGUAGE.md`. Light theme written, dark
  generated by `derive.dark()`, both through the contrast gate.

- **`accent-driven` and `minimalist` accepted as aliases for `monochrome`.** The
  school has three names in the wild and a client sold one of the other two
  should not have to learn ours. Read through `config.strategy()`, so the
  aliases live in one place.

### Changed

- **BREAKING: layer 3 `$accent-*` renamed to `$tertiary-*`.**
  `$accent-bg`, `$accent-fg`, `$accent-bg-hover`, `$accent-bg-subtle`,
  `$accent-fg-on-subtle` → `$tertiary-*`.

  The entry is a second brand FILL — Material's tertiary, daisyUI's `accent`
  slot — and it defaults to neutral. In the accent-driven school "accent" means
  the opposite thing: the single live colour carrying every interactive job. A
  product in that school setting `$accent-bg` was reaching for its accent and
  getting a library's third brand slot, which is grey. The collision was
  guaranteed to bite the one school most likely to type the word.

  **To upgrade:** rename any override in your `tokens.scss`. If you have none —
  the common case, since it defaults to neutral precisely so that unset means
  "no second brand colour" — there is nothing to do.

- The colour-school question in the interview is now seven questions instead of
  two. The opener sorts by product priority and is explicitly **not** the
  decider; the appearance question still decides, and when the two disagree that
  disagreement is information worth naming to the client. Three of the new ones
  are asked only for accent-driven, and they are decisions the generator used to
  make silently: the accent's contrast profile, how much pigment is in the
  neutrals, and how one surface is told from the next.

### Not changed, and worth recording

**Layer 3 does not diverge by school, and it should not.** The obvious move —
different layer 3 defaults per school — was investigated and dropped, because
layer 2 already absorbs the difference. `$chip-bg-selected` points at
`--app-bg-selected` in all three schools; what changes is what the THEME points
`selected` at: its own hue in `functional`, the brand hue in `brand`, the accent
in `monochrome`. That is the design working, and adding a second mechanism on
top of it would give every school-dependent value two places to be decided.

The one case that genuinely cannot be expressed at layer 2 — a secondary action
that is a filled second brand colour — is exactly the `$tertiary-*` entry
renamed above.

---

## [0.2.0]

The first versioned release. Documented retroactively from git, because the
changes below all landed before this file existed and a project vendoring an
earlier copy still has to act on them.

### Removed

- **`src/_themes.scss` is gone, and with it the `light` / `dark` / `brand`
  themes the tool used to ship.** The tool builds design systems; it is not one.
  A theme is whatever the project defines. The only theme generated for you is
  the opposite-scheme counterpart of yours, via `derive.dark()`.
- `config.$themes` and `themes.emit-contexts()` removed. Contexts are written
  per project with `core.context()`, which enforces the background/foreground
  pair invariant at compile time — the hand-written form does not.

**To upgrade:**

```scss
// delete these
@use './src/themes';
@include themes.emit-contexts();

// and drop $themes from the config block
@use './src/config' with (
-  $themes: (),
   $adapters: (),
);
```

Then define your themes and emit them yourself:

```scss
@use './semantic/light';
@use './semantic/dark';

@include semantic.emit-theme('light', light.$tokens, $default: true);
@include semantic.emit-theme('dark', dark.$tokens, $auto: true);
```

### Changed

- **Every adapter's `emit()` now REQUIRES its `$themes` argument.** It used to
  fall back to a registry of themes that shipped with the tool; there is no
  registry. Without the argument an adapter emits references but no rgb
  triplets, so every opacity utility, focus ring and `.text-bg-*` silently keeps
  the library's own default.

  **To upgrade:** `@include coreui-adapter.emit((light: light.$tokens));`
  The adapter `@error`s with the exact call to write if you forget.

- **Vendor only the adapters you use.** `src/adapters/` holds one file per
  library; a project needs the one for its library. Copying the directory
  wholesale ships ten adapters that never compile to anything and makes every
  later sync a guess.

### Added

- `emit-theme($name, $choices, $default:, $auto:)` — `$auto: true` additionally
  emits the theme under
  `@media (prefers-color-scheme: dark) { :root:not([data-theme]) }`, so a
  visitor who has never touched a toggle gets their OS setting while an explicit
  `data-theme` still wins. Pass it to exactly one theme per scheme.
- `derive.dark($lightMap)` — generates a dark theme from a light one. Works in
  OKLCH, preserves hue, transforms by ROLE rather than per colour, and its
  output goes through the same contrast gate as a hand-written theme.
- `--app-blend-ink` — `multiply` on a light theme, `screen` on a dark one,
  derived from the theme's own page luminance. Products that blend ink into a
  paper texture write `mix-blend-mode: var(--app-blend-ink)` and are correct in
  themes that do not exist yet.
- Layer 3 grew from 187 to ~278 names, from an inventory of what one real
  product's components actually set. The layer previously had `offcanvas`,
  `pagination` and `toast` before it had `card`, because it had been written
  from what LIBRARIES expose.
- Four guards: `check-theme-proof`, `check-dumb-components`,
  `check-custom-prop-interpolation`, `check-token-grammar`.

  **To upgrade:** wire them into `build:tokens`.
  `check-dumb-components` takes `--allow=N` so it can be adopted mid-migration
  and ratcheted down.

### Fixed

- `color-scheme` is derived by MEASURING a theme's page luminance instead of
  matching the literal name `dark`. A night theme called anything else shipped
  light native scrollbars, `<select>` popups and form controls on a dark page.
  The same fix was applied to the CoreUI adapter's `[data-coreui-theme]` alias.
- Bulma declares `--bulma-background-l` on bare `:root`, at 96% normally and 14%
  under `prefers-color-scheme: dark`. On a dark-mode OS the dark value applied
  under every theme while `--bulma-code` kept the light theme's ink, rendering
  `<code>` near-black on near-black at 1.09:1. The adapter now emits that name
  per theme.

---

## [0.1.0]

Unversioned prehistory. If your vendored copy predates `CHANGELOG.md`, treat it
as 0.1.0 and apply 0.2.0 onward.

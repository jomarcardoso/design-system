<!-- skills/design-system/references/review.md -->

# Reviewing a generated theme

Fifty-two checks against a build that already exists. Run it after
`npm run verify` passes — or instead of it, when there is no terminal.

**This list deliberately avoids what the build already catches.** `verify`
measures contrast in three places, refuses a theme missing a key, fails on a
token name the W3C format forbids, and catches two adapters colliding. Repeating
that here would pad the list and prove nothing. What follows is the part a green
build cannot see: **whether the values are the ones the document asked for, and
whether each token is carrying the meaning its name claims.**

A green `verify` and a clean run of this list are different claims. The first
says the theme is well-formed. The second says it is the right theme.

---

## How to run it

*In the project.* Read it after `npm run verify` goes green, with
`DESIGN_LANGUAGE.md` and `theme.scss` both open.

*In a fresh chat, no terminal.* Paste this file, `DESIGN_LANGUAGE.md` and
`theme.scss`. Checks marked **[B]** need a build or a browser and come back
`unverifiable` — say so rather than guessing. Everything else reads off the two
files, which is most of the list, because most of what goes wrong here is a
value that disagrees with a document rather than CSS that fails to compile.

**Report, do not repair.** Produce the report and stop. A reviewer that edits is
a second author, and the person who decided the thing being changed never finds
out it moved.

**Quote both sides.** Every check here compares a value against a source. Name
the key in `DESIGN_LANGUAGE.md` and the line in `theme.scss`, or the check has
not been run.

**Distrust a clean report on your own output.** A real run reviewed a theme it
had just written and reported *36 pass, 0 fail* — while that theme used the
functional vocabulary under `$colour-strategy: 'monochrome'`, called
`base.pal()` with a ramp map, configured no adapter for a CoreUI product, and
carried `[cite: …]` markers on half its lines. Every one of those has a check
here. None of them fired, because the reviewer was the author and had no more
reason to doubt a line than when it wrote it.

The defence is mechanical, not attitudinal: **A9b, C9, C11 and C12 are string
comparisons.** Grep the theme map keys against the school's table in
`tokens.md`. Search the raw text for `[cite`, `{{`, `pal($`. Do not scan for
them by impression — an artefact native to the mode that produced it does not
read as debris to the thing that produced it.

---

## A. Did the document reach the build

The handoff table in `SKILL.md` has a destination for every key. These check it
arrived. **This section is where a theme most often goes wrong**, and none of it
is visible to `verify`, which never reads `DESIGN_LANGUAGE.md`.

| | check | fails when |
|---|---|---|
| A1 | `radius-control` and `radius-surface` match the `radius` answer and the archetype row | `subtle` in the document, 12px in the theme |
| A2 | Surfaces are one step rounder than controls | a button that reads as stuck to its card |
| A3 | `size-control` and `line-height` match `density` — and move together | a tall control wrapping tight text |
| A4 | `platform` mobile-first or multiplatform put `size-control` at 44px or more | an override recorded in the document and ignored in the build |
| A5 | `shadow-raised` and `shadow-overlay` match `elevation` | `borders` in the document, real shadows in the theme |
| A6 | Whatever `elevationCarrier` names is the STRONG token | a flat system with a weak border — surfaces nobody can tell apart, passing the contrast gate while doing it |
| A7 | `icon-stroke` and `size-icon` match `iconStroke` and `iconSize` | the defaults left in place beside a document that chose otherwise |
| A8 | `$contrast-min` is 4.5 for AA, 7 for AAA | AAA promised in the document, AA enforced in the build |
| A9 | `$colour-strategy` matches `colourStrategy` | a monochrome product emitting the functional vocabulary |
| A9b | The theme map KEYS are the school's, not just the config flag | `$colour-strategy: monochrome` beside `action`/`selected`/`link` keys — the flag agrees and the vocabulary does not, which A9 alone passes |
| A9c | A monochrome theme declares `accent` ONCE | three families filled with the same value, the exact shape per-school vocabularies exist to remove |
| A10b | The ramp SEED is a pigment, not the page colour | a near-white seed, whose chroma is the peak the curve multiplies — the ramp comes out grey and nothing errors |
| A10c | An adapter's `emit()` receives the theme MAPS, not just names | `require-themes()` errors; libraries that read colour channels cannot read them out of a `var()` |
| A10 | `$pigment` in `ramp.neutral()` equals `neutralPigment` | 0.6 in the document, 1 in the call, and every neutral too colourful |
| A11 | The four faces match the archetype row, or a deviation says why not | a font stack that sounds right and was chosen by nobody |
| A12 | Status hues stayed in family under `brand-adapted` | a green adapted until it is no longer green, which stops it meaning "it worked" |
| A12b | `emit-structure()` receives the STRUCTURE map, not only typography | radius 4px and size-control 44px decided in the document and never emitted — the tool's defaults ship instead, and no gate reports it because a default is a valid value |
| A13 | An adapter is configured when the project has a library | `$adapters: ()` in a project whose folder, `package.json` or `DESIGN_LANGUAGE.md` names CoreUI, Bootstrap or daisyUI |
| A14 | Every theme named in the install answer was emitted | one theme compiled where light AND dark were agreed |

## B. Decisions that were meant to be kept

| | check | fails when |
|---|---|---|
| B0 | No file that ships with the plugin was authored — `_base`, `_core`, `_semantic`, `_component`, `_roles`, `_ramp`, `src/adapters/*` are copied, never written | a lossy reimplementation of the foundation that looks complete and drops tokens in silence |
| B0b | Missing inputs were REQUESTED, not reconstructed | a run handed one file that generated the whole system from memory |
| B0c | Exactly three files were authored — `palette.scss`, `theme.scss`, the entry | an invented path like `src/components/_button.css`, which the blocklist could not name because it does not exist |
| B0d | No hand-written `:root { --app-* }` block | a second copy of what `emit-structure()` emits, drifting from it at the next change |
| B0e | A setting is answered ONCE — in the entry, not also in `_config.scss` | `$colour-strategy` declared `!default` in the module and passed in `@use … with`, two answers to one question |
| B1 | Every `deviation` is built as recorded | the archetype's value built instead, silently undoing a decision with a date on it |
| B2 | Every `override` is built as recorded | ergonomics losing to personality after the document said it would not |
| B3 | Guardrails with `enforcement: stylelint` exist as rules, with their `signature` | a promised gate that never fails anything |
| B4 | Guardrails with `enforcement: document` produced NO code | advice turned into a gate, which is worse than leaving it — the next reader trusts the label |
| B5 | Nothing was built for `voice`, `ctaMood` or `voiceExceptions` | a token build that started inventing copy |
| B6 | The six install questions were asked and answered | files written for a project nobody was asked about — prefix, themes and adapter all defaulted silently |
| B7 | What was emitted matches what the read-back approved | a value changed between the summary and the files |

## C. Meaning, not validity

The check `verify` names in its own table as the thing it cannot see: *a token
used with the wrong meaning*.

| | check | fails when |
|---|---|---|
| C1 | `action`, `selected`, `link` and `neutral` are four jobs, and any collapse is deliberate | two roles that drifted together, indistinguishable from a brand that marks selection on purpose |
| C2 | No fill is reused as text | the usual cause of a palette failing the gate — and when it passes, of text at 4.6:1 that nobody can read |
| C3 | Every surface token has its foreground companion, and they move together | a context that flips some foregrounds and not others, shipping 1.2:1 text |
| C4 | The accent appears only where the document allows | a monochrome product spending its one accent on decoration |
| C5 | `accentContrast` agrees with which side `fg-on-accent` was measured from | a value that passes the gate against the wrong assumption |
| C6 | No literal colour in product CSS, and none in the theme map that a palette entry should carry | a hex that works and belongs to nothing |
| C7 | Layer 3 entries read layer 2, never layer 1 | a component reaching past the contract into `--app-base-*` |
| C8 | Every generated file opens with its path as a comment — JSON excepted | a `theme.scss` that could be any of six |
| C8b | An entry file exists and calls `emit-structure()` and `emit-theme()`, once per theme | a theme map defined and never emitted — the build compiles to nothing and looks finished |
| C8c | Configuration is `@use … with` in the entry, not an edited `src/_config.scss` | a vendored file the next upgrade overwrites, or a `_config.scss` that @uses itself |
| C8d | The theme map is COMPLETE — four status families, six sub-keys each | `_req()` raises a Sass @error on the first missing key; the theme does not compile |
| C8e | Hand-written CSS reads the SCHOOL's emitted names | `var(--app-bg-action)` in a monochrome build — a name that was never emitted, so the rule falls back to nothing and the component renders transparent |
| C9 | Theme map keys are the accepted vocabulary, not the emitted one | `'bg-page'` where the map wants `page`; the commonest first-theme failure |
| C10 | `ramp.*()` calls live in the project's palette, not in `src/_base.scss` | a product palette written into a vendored file the next upgrade overwrites |
| C11 | No `base.pal()` call is passed a ramp MAP | `pal()` takes a registered family key; a generated ramp needs a local step accessor |
| C12 | No retrieval artefacts — `[cite: …]`, `{{ }}`, stray footnote markers | citation markers through a file meant to compile |

## D. What only a build or a browser shows [B]

| | check | fails when |
|---|---|---|
| D1 | `npm run verify` is green | — |
| D2 | `grep -c -- "--app-base-" dist/ds.css` is 0 | layer 1 leaking into the public contract |
| D3 | Variants stay distinct — `.btn-primary` and `.btn-danger` are different colours | the adapter failure that looks correct in CSS and wrong in the browser |
| D4 | Toggling `data-theme` moves the whole page | a theme wired in one direction only |
| D5 | Rewriting one layer 2 token on `:root` moves both columns of `coexistence.html` | a value baked in at build time where a reference was intended |

Read computed styles in a **later** turn than the one that flipped
`data-theme` — resolution can lag a frame, and a same-turn read reports the
previous theme, which looks exactly like a broken adapter.

---

## The report

One line per failure, plus a count. **The three counts must add up to 52.** If
the arithmetic does not close, the review has not finished.

```
theme review — 48 pass, 1 fail, 3 unverifiable

FAIL A10  `neutralPigment: 0.6` in DESIGN_LANGUAGE.md line 32, but
          theme.scss line 8 calls ramp.neutral($seed) with no $pigment,
          which defaults to 1. Every neutral is carrying full chroma.

UNVERIFIABLE D1, D3, D4  No terminal in this session.
```

Then stop. Offer to fix; do not fix.

A clean report is a real outcome. Say it in one line and name the two or three
checks that were closest to failing — that is the part worth reading.

---

## What a pass does not mean

The theme matches its document and its tokens mean what they say. It does not
mean the design is good: a faithful build of a bad palette passes every check
here. That judgement happens when someone looks at a screen — and when it goes
badly, the fix belongs in `DESIGN_LANGUAGE.md` first and here second.

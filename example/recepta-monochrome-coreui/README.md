<!-- example/recepta-monochrome-coreui/README.md -->

# Recepta — monochrome on CoreUI

A personal recipe notebook. Editorial & Premium archetype, `monochrome` colour
school, CoreUI as the component library underneath.

**Status: step 2 of 3.** The document and the theme exist and compile;
`patterns.json` does not. Build with `npm run build:example-recepta`.

| | skill | produces | state |
|---|---|---|---|
| 1 | `design-language` | `DESIGN_LANGUAGE.md` | done |
| 2 | `design-system` | `palette.scss`, `theme.scss`, `ds.scss` → `ds.css` | done |
| 3 | `design-patterns` | `patterns.json` + a page | done |

Plus two generated documents: [`DERIVED.md`](DERIVED.md), what the answers
produced and which answer produced each, and [`FOUNDATIONS.md`](FOUNDATIONS.md),
the values the build compiled to.

## Where this one came from

The design language was produced by running the interview against a weaker model
(Gemini) as a test of the skill rather than of the product — the transcripts are
in [`tasks/gemini-tests/`](../../tasks/gemini-tests/). Three runs, each one
fixing what the previous had exposed: a skipped question, a fused question, a
restarted interview, an archetype quietly widened to `hybrid` so the deviation
list could stay empty.

This file is the third run's output with those slips corrected by hand:

- **`archetype: editorial-premium`, not `hybrid`.** The interview answered
  Editorial outright. The model widened it at the last step to make the conflict
  with `voice: warm` disappear.
- **Two deviations recorded** rather than none — comfortable density and warm
  voice, both ⚠️ against Editorial, both kept with reasons.
- **Guardrails are the archetype's own**, confirmed rather than invented, plus
  the modal rule that came from question 17a.
- **Leading is 1.7**, the Editorial preset, not the 1.6 the model wrote.
- **All three answers from question 17 reach the document**; the run collected
  "save on blur" and then never mentioned forms again.

## What building it actually found

The theme was written by hand from the skill's own instructions, to check that
those instructions describe something that compiles. Three did not:

1. **A ramp seed is a pigment, not the page colour.** `DESIGN_LANGUAGE.md`
   named the neutral seed as `oklch(0.97 0.012 85)` — the paper you see. The
   seed's chroma is the peak the ramp curve multiplies, so at
   `neutralPigment: 0.6` that leaves 0.007 and the ramp comes out grey. Nothing
   errors, because a grey ramp is a valid ramp. The seed is now `#8f7c5e` and
   the page it produces is `#f8f6f4`.

2. **The CoreUI adapter could not read a monochrome theme.** `_coreui.scss` does
   `map.get($choices, link)` to build rgb triplets, and a monochrome map has
   `accent` and no `link` — so it failed with *"$color: null is not a color"*
   three frames deep, saying nothing about schools. Normalisation moved from
   `_semantic.scss` into `_roles.scss` and is now applied in
   `core.require-themes()`, the one line every adapter already calls. This bug
   was reachable by any of the eleven adapters and had never fired, because no
   example combined an adapter with `monochrome`.

3. **A layer 3 pair was crossed.** `--cui-nav-tabs-link-active-color` took
   `$nav-fg-active` (`fg-on-selected`, the ink measured against the selected
   FILL) while the background beside it was `$nav-tab-bg-active` (`bg-surface`).
   An enclosed tab takes a surface, not the fill. White on white, measured at
   **1.03:1** in the browser — and the build gate never saw it, because it
   measures layer 2 pairs and this was a layer 3 crossing. `$nav-tab-fg-active`
   now exists and is paired with its own background.

4. **The CoreUI surface utilities were bound in the wrong form.** The adapter
   set `--cui-tertiary-bg`; `.bg-body-tertiary` is written as
   `rgba(var(--cui-tertiary-bg-rgb), ...)` and consumed neither. The recessed
   card kept CoreUI own light grey through a theme flip and rendered near-black
   text on it. Same failure the link colour had, one variable along — the
   adapter warns about exactly this at the top of the file.

5. **An adapter's `emit()` needs the theme maps**, not their names — libraries
   that derive colour channels cannot read a channel out of a `var()`. The
   worked example now shows the call.

## Not the same as `ds-caderno-accent-driven`

Same product idea, deliberately. That example is mobile-first with traditional
status colours on `neutralPigment: 0.7`; this one is multiplatform with adapted
status colours on `0.6`, and it will sit on CoreUI rather than on the bare
foundation. Two products one interview apart is the cheapest way to see what the
interview actually decides.

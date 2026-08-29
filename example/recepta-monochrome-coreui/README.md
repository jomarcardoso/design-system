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
| 3 | `design-patterns` | `patterns.json` | not started |

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

3. **An adapter's `emit()` needs the theme maps**, not their names — libraries
   that derive colour channels cannot read a channel out of a `var()`. The
   worked example now shows the call.

## Not the same as `ds-caderno-accent-driven`

Same product idea, deliberately. That example is mobile-first with traditional
status colours on `neutralPigment: 0.7`; this one is multiplatform with adapted
status colours on `0.6`, and it will sit on CoreUI rather than on the bare
foundation. Two products one interview apart is the cheapest way to see what the
interview actually decides.

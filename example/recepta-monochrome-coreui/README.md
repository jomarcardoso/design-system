# Recepta — monochrome on CoreUI

A personal recipe notebook. Editorial & Premium archetype, `monochrome` colour
school, CoreUI as the component library underneath.

**Status: step 1 of 3.** Only [`DESIGN_LANGUAGE.md`](DESIGN_LANGUAGE.md) exists.
The tokens, the theme and the adapter come next, from that file.

| | skill | produces | state |
|---|---|---|---|
| 1 | `design-language` | `DESIGN_LANGUAGE.md` | done |
| 2 | `design-system` | `theme.scss`, `ds.css` | not started |
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

## Not the same as `ds-caderno-accent-driven`

Same product idea, deliberately. That example is mobile-first with traditional
status colours on `neutralPigment: 0.7`; this one is multiplatform with adapted
status colours on `0.6`, and it will sit on CoreUI rather than on the bare
foundation. Two products one interview apart is the cheapest way to see what the
interview actually decides.

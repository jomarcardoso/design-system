<!-- DECISIONS.md -->

# Every decision, and who makes it

**Generated — do not edit.** `npm run docs:decisions` rebuilds it from the
template, the questionnaire, `derivations.md` and the scripts.

Thirty-eight keys live in a generated `DESIGN_LANGUAGE.md` and, until this
file, no single place said what they all are — they were spread across the
template's comments, an axis map in a script, and the sections of
`derivations.md`. The question with no home was the obvious one: **which
decisions exist, which are asked, which are derived, and what checks each?**

The column to read is the last one. **A key with no question, no derivation
and no check is either inert — and should say so — or a decision nobody
implemented.**

| | count |
|---|---|
| asked in the interview | 16 |
| derived from an answer | 17 |
| recorded, deciding nothing visual | 5 |

---

## Asked

The interview puts these to the client. Every one is a fact about the product
that its owner knows and a designer would have to guess — that is the test a
question has to pass to stay here, and eight failed it across 0.8.0 and
0.9.0.

| key | values | question | derived in | checked by |
|---|---|---|---|---|
| `archetype` | `tech-minimalist` · `enterprise-solid` · `playful-expressive` · `editorial-premium` · `utilitarian-technical` | 3 | §C, §D, §K, §S | `check-archetype-split`, `check-chain` |
| `archetypeSecondary` | — | 3 | — | `check-archetype-split` |
| `density` | `dense` · `comfortable` · `generous` | 5 | §D, §J, §L | `check-archetype-split` |
| `platform` | `desktop-first` · `mobile-first` · `multiplatform` | 8 | §L | `check-chain`, `check-decisions-applied` |
| `dwell` | `seconds` · `minutes` · `hours` | 6 | §W | `check-chain` |
| `protagonist` | `user-content` · `product-content` · `brand` · `tools` | 7 | §X, §Z | `check-chain` |
| `colorCriticalWorkspace` | `true` · `false` | 7 | §S, §X, §Z | `check-chain` |
| `posture` | `quiet` · `balanced` · `loud` | 9 | §B, §C, §D, §E, §F, §G, §K, §M, §N, §O, §R, §W, §X, §Z | **—** |
| `frame` | `single-column` · `content-aside` · `app-frame` | 15 | §L, §W | **—** |
| `imagery` | `none` · `supporting` · `content` | 16 | §K | `check-decisions-applied` |
| `imageRatio` | — | 16a | — | `check-decisions-applied` |
| `accessibility` | `AA` · `AAA` | 12 | — | `check-chain` |
| `colourStrategy` | `functional` · `brand` · `monochrome` | 10 | §E, §H, §X | **—** |
| `voice` | — | 13 | §Y | `check-archetype-split`, `check-chain` |
| `voiceExceptions` | — | 13 | — | `check-chain` |
| `ctaMood` | — | 14 | — | `check-chain` |

---

## Derived

Computed from the answers and shown in the read-back with their provenance.
**A derived default is not a decision taken away from anyone** — it is a
decision made by the thing with the standing to make it, and shown.

And a derivation presented as a MENU is still a question: present the
consequence, never the token.

| key | values | derived in | checked by |
|---|---|---|---|
| `secondaryGoverns` | — | §Y | `check-archetype-split` |
| `radius` | `square` · `subtle` · `rounded` · `pill` | §Z | `check-archetype-split`, `check-custom-prop-interpolation`, `check-dumb-components`, `check-token-grammar` |
| `elevation` | `borders` · `soft-shadows` · `projected-shadows` | §B, §W, §Y | `check-archetype-split` |
| `elevationCarrier` | — | §K, §N, §R, §W | `check-chain` |
| `surfaceSeparation` | `lines` · `tones` · `shadows` | §B, §X | `check-decisions-applied`, `check-mechanism` |
| `surfaceModel` | `flat` · `elevated` · `recessed` | §B, §O, §R, §S, §W, §X, §Z | **—** |
| `ladderSpend` | `2` · `3` | §B, §H, §U, §W, §Y | `docs-forms-derived` |
| `iconStyle` | `outline` · `filled` · `mixed` | §G, §P | **—** |
| `iconStroke` | — | §P | **—** |
| `iconSize` | — | §P | **—** |
| `disclosure` | `progressive` · `exposed` | §H, §M | **—** |
| `typeScale` | — | §I | **—** |
| `iconPolicy` | — | §G | **—** |
| `statusColours` | `traditional` · `brand-adapted` | §U, §X | **—** |
| `accentContrast` | — | §Z | **—** |
| `neutralPigment` | — | §S, §X, §Y, §Z | **—** |
| `secondaryAction` | — | §W | **—** |

---

## Recorded, deciding nothing visual

These carry the reasons rather than the values, and a document without them
is a set of numbers nobody can defend six months later.

| key | what it holds |
|---|---|
| `toolVersion` | which version of this tool ran the interview |
| `deviations` | answers that went against the archetype, with their reasons |
| `resolutions` | conflicts raised and resolved, so a value does not read as arbitrary |
| `overrides` | ergonomics that outranked the archetype — the system working, not a compromise |
| `guardrails` | what the system must never do, with how a build would know |

---

## Keys with neither a question nor a derivation

None. Every key is either asked, derived, or declared inert.

## Decisions no script checks

Not a failure by itself — many decisions have no mechanical consequence a
build can test. It is a list to read rather than to empty: a decision here
is one the tool can record and cannot enforce.

- `surfaceModel`
- `iconStyle`
- `iconStroke`
- `iconSize`
- `posture`
- `frame`
- `disclosure`
- `typeScale`
- `iconPolicy`
- `statusColours`
- `colourStrategy`
- `accentContrast`
- `neutralPigment`
- `secondaryAction`

<!-- skills/design-patterns/references/review.md -->

# Reviewing a ledger

Thirty-six checks against a `patterns.json` that already exists. Run it after
`npm run verify:patterns` passes — or instead of it, when there is no terminal.

**This list avoids what the verifier already catches.** `verify:patterns` reads
real markup and reports every class combination the vocabulary does not allow.
It cannot read the ledger *as a document*: whether an `intent` settles anything,
whether a refusal would persuade the person about to ignore it, whether the
vocabulary is the product's decision or the library's default list copied in.

A green verifier and a clean run of this list are different claims. The first
says the markup obeys the ledger. The second says the ledger is worth obeying.

---

## How to run it

*In the project.* After `verify:patterns` goes green, with `patterns.json` and
`DESIGN_LANGUAGE.md` open.

*In a fresh chat.* Paste this file, `patterns.json` and `DESIGN_LANGUAGE.md`.
Checks marked **[M]** need the project's markup and come back `unverifiable` —
say so rather than guessing.

**Report, do not repair.** Produce the report and stop. A reviewer that edits is
a second author, and a vocabulary is exactly the kind of thing that must not
change without the person who owns it noticing.

**Distrust a clean report on your own output.** A run reviewing a file it had
just written reported zero failures on a build with four checkable errors in it.
Checks A5, B2, B4 and C3 are string comparisons — run them as comparisons.

---

## A. Consent and provenance

The section that exists because a ledger can be *correct* and still be the wrong
ledger.

| | check | fails when |
|---|---|---|
| A1 | Every pattern was agreed, not imported | markup read and written straight into the file, canonising what the design system was adopted to remove |
| A2 | Rejected candidates became `forbidden` entries with a reason, not silence | the thing people will reach for gets "not in the vocabulary" instead of an explanation |
| A3 | Nothing was added on frequency alone | the composition on forty screens is often the one being replaced — that is what a facelift is |
| A4 | Guardrails with `enforcement: ledger` reached the file | a restriction recorded in the interview and enforced nowhere |
| A5 | No component nobody has built | an entry for a carousel this product does not have, wrong by the time someone needs it |
| A5b | Each component records the FORM it takes, not only the variants allowed | the shape left to the library, which is most of what makes a themed build still look like the library |
| A5c | A form the library cannot express is recorded as a pending implementation | an omission, which reads as the form never having been wanted |
| A5d | Patterns that will not stay `raw` carry a `trajectory` | a starting point and a resting point look identical in the JSON, and the promotion nobody wrote down never happens |
| A5e | Every `trajectory.when` is a trigger rather than a date | a date is a wish; a trigger is a decision already made, waiting for its moment |
| A6 | The vocabulary is shorter than the library's menu | Bootstrap's nine button variants copied in whole, which is the library's decision wearing the product's name |

## B. The entries

| | check | fails when |
|---|---|---|
| B1 | Every `intent` says WHEN to reach for it, not what it looks like | "a red button" — a reader can already see that |
| B2 | Every `state: styled` names a class that exists | the ledger lying about a promotion that has not happened |
| B3 | Every `state: wrapped` names a component that exists | the same, one layer up |
| B4 | Every `instead` names a pattern present in this file | a refusal with nowhere to go, which gets overridden |
| B5 | Every `forbidden` has a `reason` that would persuade | a preference stated as a rule, argued away on first contact |
| B6 | Every `forbidden` has `matches` | without it the verifier says "not in the vocabulary" and the good message never prints |
| B7 | `namespace` is a regex, and `namespaceNote` explains its exclusions | a lookahead the next reader assumes is a bug and widens |
| B7b | The namespace claims VARIANTS and never anatomy | `^card-(?!group)` claims `card-body` and `card-title`, which no pattern produces, so the verifier reports ordinary markup as unknown variants — measured at 8 violations on 7 lines |
| B7c | Variants are enumerated rather than anatomy excluded | a lookahead has to predict every structural class the library ships now and in its next release |
| B8 | `root` is set where the namespace alone is ambiguous | a shared utility class making every element read as an unknown variant |
| B8b | The base class carries the component on its own | a pattern whose classes are a recipe — five of them before it reads as a button — which is a missing `styled` promotion, not a long list |
| B8c | Any utility in a pattern is self-sufficient | applying it also forces a change to a child or sibling class, which makes it a variant wearing a utility |
| B9 | Modifier axes are genuinely orthogonal | an "axis" whose combinations do not all make sense — those are patterns |
| B10 | The default modifier option has an empty class list, present rather than omitted | someone inventing `btn-md` |
| B11 | A renamed class is a pattern; an added class is a modifier | `btn-outline-primary` filed as a modifier, so the emitted markup carries a class that does not exist |
| B12 | `dos` / `donts` / `responsive` carry only what a verifier cannot catch | a detectable rule sitting in prose instead of in `forbidden` or stylelint, where it would fail a build |

## C. Agreement with the rest of the system

| | check | fails when |
|---|---|---|
| C1 | `libraries` matches what the project actually builds with | a ledger for Bootstrap on a CoreUI product |
| C2 | One library, not several | Bootstrap and daisyUI share 158 class names; the later cascade layer silently wins |
| C3 | `composition` holds bindings, `DESIGN_LANGUAGE.md` §6 holds relations | a pixel value in the document that outlives this theme, or a relation here that this file cannot enforce |
| C4 | `composition.surfaces` matches the levels the language allows | a third surface level in a two-level product |
| C5 | `composition.accentBudget` agrees with the language | a monochrome product spending its one accent in two places |
| C6 | `secondaryAction` in the language matches the secondary pattern here | the document says neutral and the ledger emits a tinted button |
| C7 | The file opens with `$schema` pointing at the real schema path | no editor validation, and nothing catches a typo'd key |

## D. What only the markup shows [M]

| | check | fails when |
|---|---|---|
| D1 | `npm run verify:patterns` is green | — |
| D2 | Every pattern is used somewhere | a vocabulary entry nobody reaches for, which is a decision that has expired |
| D3 | No composition in the markup is missing from the ledger | the verifier reports it, but only for files it was pointed at |

---

## The report

One line per failure, plus a count. **The three counts must add up to 36.** If
the arithmetic does not close, the review has not finished.

```
patterns.json review — 33 pass, 1 fail, 2 unverifiable

FAIL B4  `card/featured` offers `instead: "highlight"`, and no pattern
         named `highlight` exists in this file. The refusal has nowhere
         to send anyone.

UNVERIFIABLE D1, D2  No terminal and no markup in this session.
```

Then stop. Offer to fix; do not fix.

---

## What a pass does not mean

The ledger is coherent and its entries are defensible. It does not mean the
vocabulary is the right one — only the people building the product know whether
these are the patterns they want. This list can tell you a refusal is
well-argued; it cannot tell you the refusal should exist.

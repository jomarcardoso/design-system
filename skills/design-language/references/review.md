<!-- skills/design-language/references/review.md -->

# Reviewing a generated DESIGN_LANGUAGE.md

A checklist run against a finished document. Thirty-two checks, each one either
passing or failing against something quotable — not against an impression.

**Every check on this list has failed in a real run.** Nothing here is
hypothetical, and nothing is here for symmetry.

---

## How to run it

**Two ways, and they see different things.**

*In the project.* The agent that wrote the file reads this at the end of the
same session, with the transcript still in view. It can run every check.

*In a fresh chat.* Paste this file and the generated document. Checks marked
**[T]** need the interview transcript and are reported as `unverifiable` without
it — say so rather than guessing. Everything else is checkable against the
document alone, which is the point: a design language that cannot be audited
without its interview is under-written.

**Report, do not repair.** Produce the report, then stop. This matters more than
it sounds: the failure that motivated this file was a run that noticed a
conflict while writing and "fixed" it by widening the archetype to `hybrid`,
which deleted the conflict instead of recording it. A reviewer that edits is a
second author, and the client never learns anything was wrong. Fix on
instruction, in a separate pass.

**Quote the evidence.** A check reported as passing without a line to point at
is not a check. Where a check compares two places, quote both.

---

## A. The contract

The checks a machine could run, and the ones that catch the worst failures.

| | check | fails when |
|---|---|---|
| A1 | `toolVersion` is present and matches a real released version | absent, or invented |
| A2 | Every front matter key is explained somewhere in the prose | `density: comfortable` declared and never costed in pixels |
| A3 | No prose statement contradicts the front matter | text says "soft shadows", YAML says `borders` |
| A4 | `surfaceSeparation` pairs with `elevation` — `borders`/`lines`, shadows/`shadows`; `tones` requires `elevation: borders` | the document separates surfaces two ways at once |
| A5 | `elevationCarrier` is set when `elevation: borders`, and omitted otherwise | a carrier named for a system that carries with shadow |
| A6 | The accent trio appears if and only if `colourStrategy: monochrome` | a stale ramp profile nobody can tell from a live one |
| A7 | `archetypeNote` is present if and only if `archetype: hybrid` | a hybrid with nothing saying which two |
| A8 | `instead` appears only on guardrails that FORBID something | a rule requiring modals naming `modal` as its own alternative |
| A9 | Each guardrail's `enforcement` is honest — `ledger`/`stylelint` only where a signature exists | advice labelled as a build gate, the one way this file actively misleads |

## B. The interview [T]

| | check | fails when |
|---|---|---|
| B1 | Every front matter key traces to an answer, a stated default, or `undecided` | a key filled from the archetype and presented as the client's answer |
| B2 | The emitted front matter equals the approved read-back table, key for key | a value changed after the client said yes |
| B3 | `archetype` is the client's own answer | promoted to `hybrid` by the model to make a conflict disappear |
| B4 | Every answer collected reaches the document | "save on blur" confirmed in the ledger, absent from the file |
| B5 | Every non-✅ answer appears under `deviations` | `deviations: []` on a product with two ⚠️ answers |
| B6 | Each deviation names what it went against, why, and the date | a deviation the next reader cannot evaluate |
| B7 | Ergonomic wins are `overrides`, not `deviations` | mobile-first's 44px recorded as a compromise |

**B5 is the one to run mechanically**, not by judgement. Walk each answer
against the archetype's row in `archetypes.md` and count. Left to impression,
this check passes every time, because the reviewer has no more reason to doubt
the answer than the author did.

## C. Completeness

| | check | fails when |
|---|---|---|
| C1 | Every heading in `templates/DESIGN_LANGUAGE.md` is present | spacing and grid, or §6, quietly missing |
| C1b | A missing section is ALSO reported under A2, once per key it would have explained | "no Shape section" reported without naming `radius` as the key left stranded |
| C2 | Section 2 has all six subsections — colour, typography, spacing, shape, iconography, elevation | iconography dropped because no question was asked about it |
| C3 | The brand colour is a value | *"a saturated blue ink tone"* where the build needs a number |
| C4 | Typography names all four faces, and says they came from the archetype preset | a font stack invented to sound right |
| C5 | Density is stated in pixels — `size-control` and `line-height` | an adjective standing in for a decision |
| C6 | §6 holds relations only, no pixel values | a rule that stops being true at the next theme |
| C7 | The voice table has all five situations | the destructive row missing, which is the one that matters |
| C8 | A heading with nothing decided under it carries `undecided` | an empty section that reads as a finished one |
| C9 | The file opens with its own path as a comment, after the front matter | a document that cannot say where it belongs once pasted somewhere |

## D. Whether it is any good

The checks a machine cannot run. Slower, and the reason a person is still
reading this.

| | check | fails when |
|---|---|---|
| D1 | Every principle can be FAILED by a real screen | "feels like a notebook" — a mood, not a criterion |
| D2 | The opening paragraph describes the product, not the archetype | a document that could belong to any Editorial product |
| D3 | The deviation paragraph explains itself to someone who was not there | the next person reads a decision as a bug and undoes it |
| D4 | Rules are specific to THIS product | generic advice that would be true of any design system |
| D5 | Nothing is asserted that the interview did not establish | a plausible sentence nobody decided |
| D6 | No RAG artefacts, no citation markers, no leftover `{{placeholders}}` | `[cite: 7, 13]` through a document meant to be a spec |

**D6 is the check a reviewer is most likely to fail at.** Retrieval markers are
native to the output mode that produced them, so they do not read as debris to
the model that emits them — a real run reported eight failures on a document
carrying `[cite: …]` on almost every line, missed this one, and put the same
markers in its own report. Do not scan for it by impression: search the raw text
for `[cite`, `{{`, `[^`, and the template's own instructional phrasing, and
quote what comes back.

---

## The report

One line per failed check, plus a count. Passing checks are not listed
individually — a report that recites thirty passes buries the two
failures.

**The three counts must add up to 32.** A real run opened with
"22 pass, 8 fail, 0 unverifiable" against a list of 22 — the pass count was the
list length rather than the remainder, so a reader saw a total audit and got a
partial one. If the arithmetic does not close, the review has not finished.

```
DESIGN_LANGUAGE.md review — 29 pass, 2 fail, 1 unverifiable

FAIL A4  `elevation: soft-shadows` with `surfaceSeparation: tones`.
         Line 12 against line 26. Question 7 was asked as a compound
         question, so one of the two is not the client's answer.

FAIL D1  "Sensation of fresh paper" is a mood. No screen can fail it.
         The other three principles are fine.

UNVERIFIABLE B5  No transcript. The ✅/⚠️/❌ walk needs the answers,
         and `deviations: []` cannot be confirmed from the file alone.
```

Then stop. Offer to fix; do not fix.

**A clean report is a real outcome** and should be stated plainly rather than
padded. If every check passes, say so in one line and name the two or three that
were closest to failing — that is the part worth reading.

---

## What a pass does not mean

The document agrees with itself and with its interview. It does not mean the
design is right: a coherent record of a bad decision passes every check on this
list. That judgement happens when someone looks at a screen, and it is what
`deviations` exists to let them revisit.

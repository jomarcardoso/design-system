<!-- example/recepta-monochrome-coreui/INTERVIEW.md -->

# Interview, second run — SUSPENDED at question 21

> **The numbering below is the one that was live during this run.** The block-2
> and block-3 rewrite that followed renumbered almost everything: 13c and 13d
> became question 10 and 10a, shape and icon style stopped being questions, and
> two questions about what the product is FOR were added. The answers are still
> the answers; only their labels moved.

Ran on 2026-08-31 against tool version 0.7.0 + the unreleased 0.8.0 phases A–I,
as the phase H test. **Not finished**, and deliberately not merged into
`DESIGN_LANGUAGE.md`: a partial answer set written into that file would break
the chain check and would put answers next to a theme that was built from a
different set.

It stopped for a reason worth more than the answers, recorded at the bottom.

---

## Answers collected

| # | question | answer | note |
|---|---|---|---|
| 1 | product and promise | a personal recipe notebook, plus browsing and searching other people's recipes — the character of a notebook without the limits of a physical one | free text |
| 2 | person in a meeting | **C** elegant, reserved, sophisticated | → Editorial |
| 3 | archetype | **D** Editorial & Premium | agrees with 2, no tension |
| 4 | break or evolution | **A** a break | full licence; nothing about today's Recepta Book binds |
| 5 | frequency and task | **B** occasional, short flows | ⚠️ for Editorial → deviation |
| 6 | devices | **C** equally multiplatform | raises `size-control` to 44px → **override**, not deviation |
| 7 | shape | **B** subtle, 4–8px | ✅ |
| 8 | depth | **A** flat, borders only | ✅ |
| 8 follow-up | what carries hierarchy | **A1** the border colour, with **A2** tone available but rationed — *"não preciso todo elemento ter seu tom próprio"* | `elevationCarrier: border-color` |
| 9 | icons | **A** outlined, thin stroke | ✅ |
| 10 | posture | **A** quiet | ✅ |
| 11a | priority | **C** a clean page, the user's content is the protagonist | |
| 11b | what "chosen" takes | **C** one colour, everything else grey | → `colourStrategy: monochrome`; 11a and 11b agree |
| 12 | brand colour | **kept**: paper seed `#8a6b3d`, pen seed `#2a3b8f` | *"gostei muito das cores"* — a choice under 4=A, not an inheritance |
| 13a | which paper | **B** a hint → `neutralPigment: 0.6` | see below — this question was rewritten mid-interview |
| 13b | surface separation | `lines` | **derived** from question 8; the question was deleted mid-interview |
| 13c | ladder spend | **B** two surfaces | ✅ given question 8 |
| 13d | ladder direction | **A** paper on a table — raised is lighter | ✅ given question 5 |
| 14 | secondary action | **C** neutral fill, dark ink | ✅ |
| 15 | accessibility | **A** AA | |
| 16 | status colours | **B** brand-adapted | |
| 17 | voice | **B** clear and action-oriented | ✅ |
| 18 | action labels | **B** imperative | |
| 19 | page regions | **B** content with an aside — **the nav bar takes the second rung, the aside is separated by a border only** | the client closed the ladder budget themselves |
| 20 | role of imagery | **C** the image is the content | |
| 20a | proportion | **B** square, 1:1 | one proportion for the whole product, thumbnail to hero |

## Not answered

- **21a** — confirming what Editorial already forbids (gradients, heavy shadows,
  coloured headings, uppercase labels). Asked, not answered.
- **21b** — anything beyond that.
- **22a / 22b / 22c** — confirmations, destructive friction, when forms save.
- **`typeScale`** — derived as 1.25 (Editorial + comfortable), never confirmed.
- **`voiceExceptions`** — the boundary where (B) drops to (A). The candidate
  named during the interview was deleting a saved recipe.

## Open consequences, recorded so they are not lost

- **19 = B changes the frame** from the single column the built example has. The
  budget still closes: page on rung 1, anything raised (nav, card, modal) on
  rung 2, rung 3 intact for the quiet neutral fill.
- **20a = B makes `ratio-media` and `ratio-thumb` the same value.** Coherent and
  strong — one proportion everywhere. It was flagged as reversible if the open
  recipe should be 3:2 while the grid stays 1:1.
- **The product has two halves** — the notebook (one recipe, read closely) and
  browsing (many recipes, filtered). They may want different frames. Raised, not
  resolved.

---

## Three fixes the interview made to itself while running

Recorded here because they are the point of the exercise and the transcript is
not kept.

**13a was unanswerable and it was the question's fault.** It asked the client to
choose between `0.5` and `0.8`. Nothing in anyone's experience distinguishes
those, and *"I do not know which"* is the question failing rather than the
client. It now asks **which paper this is** — none, a hint, unmistakably tinted —
and carries an explicit instruction never to read the numbers aloud.

**13b was question 8 asked a second time.** Its own table said the two paired one
to one, which means the second could only confirm or contradict — and a
contradiction meant one of them had been misheard, not that the client held two
opinions. **Deleted.** `surfaceSeparation` is now derived from question 8 and
shown in the read-back with question 8 named as its source. The first rule of the
questionnaire is that a question deciding nothing is dropped; this one was
breaking it.

**Block 4 had no ✅/⚠️/❌ tables.** Every other block marks a recommended answer
and block 4 did not. Two tables added, and neither keys on the archetype, which
has no opinion here: 13c keys on question 8, and 13d keys on question 5. The
finding in 13d is that **neither direction is ❌ anywhere** — both ship in serious
systems, which is exactly why it has to be a question.

A fourth note went into block 6: it has no tables **on purpose**, because its
first two questions are facts about the product and its last two are the client's
own history. An archetype recommending a frame would be recommending what the
product is.

---

## Why it stopped

The client's own diagnosis, and it outranks everything above:

> *"as perguntas estavam indo muito por um caminho de preferência do que de
> atender a necessidade. E a preferência de um usuário não designer como eu pode
> levar a um produto que não atende."*

Six of the answers above are preferences a non-designer supplied under a
vocabulary the interview taught them ten seconds earlier — shape, depth, icons,
ladder spend, ladder direction, proportion. Each has a ✅ table, so each *reads*
as validated. What no table can check is whether the question should have been
asked of this person at all.

The interview's own principle already says the fix: **prefer derivation to
question.** It was applied to motion and to the type scale and not to the visual
foundations, which are the ones a client has the least standing to answer and the
most confidence about.

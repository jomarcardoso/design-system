---
toolVersion: 0.4.1

archetype: editorial-premium
archetypeNote: ~

density: comfortable
platform: multiplatform

radius: subtle
elevation: borders
elevationCarrier: border-color

accessibility: AA
statusColours: brand-adapted

# The load-bearing line. One accent carries every interactive job; everything
# else is a position on the paper ramp.
colourStrategy: monochrome

# --- Accent-driven only ------------------------------------------------------
# high | low. The ballpoint blue is saturated enough to need light ink on it.
accentContrast: high
# 0 = true grey, 1 = the seed pigment at full strength. Fresh recycled paper,
# not aged sepia — the difference is roughly a tenth of this number.
neutralPigment: 0.6
# lines | tones | shadows. Agrees with `elevation: borders` above.
surfaceSeparation: lines

# In this school it is close to a default: a supporting action tinted with the
# accent puts two blues on a page whose premise is that there is one.
secondaryAction: neutral

voice: warm
voiceExceptions:
  - action-oriented for deleting a saved recipe, and for any failure to save
ctaMood: imperative

deviations:
  - decision: comfortable density rather than the reading density Editorial wants
    against: editorial-premium
    reason: >
      Editorial assumes continuous reading. This product is consulted in short
      bursts with one hand and a wet counter, so it takes the ergonomics of
      occasional use and keeps the archetype's leading.
    accepted: 2026-08-29
  - decision: warm voice
    against: editorial-premium
    reason: >
      The promise is a notebook inherited from your mother, not a publication.
      Editorial's reserve carries the typography and the restraint; it does not
      get to carry the writing.
    accepted: 2026-08-29

overrides:
  - decision: size-control raised from 40px to 44px
    because: multiplatform; 40px is a miss target on a phone held over a pan

# Nothing beyond what the archetype already implies was added at the interview.
# The four below are Editorial's own restrictions, confirmed rather than
# invented. This list is the part of the document most designed to grow, and it
# grows from the first review where someone ships a gradient.
guardrails:
  - rule: Never use gradient fills
    enforcement: stylelint
    signature: linear-gradient|radial-gradient
  - rule: Never uppercase a label
    enforcement: stylelint
    signature: text-transform:\s*uppercase
  - rule: Never tint a heading to make it stand out
    enforcement: document
  - rule: Depth never comes from a heavy shadow
    enforcement: document
  - rule: Deleting a saved recipe requires a confirmation modal
    enforcement: ledger
---

# Design language — Recepta

A personal recipe notebook for home cooking, nutrition and everyday health. The
promise is the notebook your mother kept and handed over when you needed to make
something the way she made it — now on a phone propped against a canister, and
on a laptop at the kitchen table. What the product stores is not content; it is
somebody's inheritance, and the interface is the paper it is written on.

**Archetype:** Editorial & Premium. The reading experience is the product, so
the typography, the restraint and the whitespace come straight from the
archetype. The tension the interview surfaced is that Editorial is a register
for publications and this is a register for a person: it looks like a book and
it has to sound like a family. Both deviations below come from that one seam.

Two answers went against the archetype and were kept. **Density** is comfortable
rather than the reading density Editorial assumes, because a recipe is consulted
in bursts between steps rather than read straight through — the leading stays
generous, the controls do not. **Voice** is warm where Editorial is reserved,
because the promise names a mother and no reserved system can deliver that. Both
are recorded so the next person reads them as decisions rather than as drift.

---

## 1. Principles

- **The recipe is the protagonist.** No interface colour, border or ornament
  competes with the photograph of the dish or with the step being cooked. When
  two layouts are on the table, the one that gives the recipe more of the screen
  wins, even when the other is better organised.
- **Fresh paper, not old paper.** The neutrals are warm because paper is warm,
  and they stop well short of sepia. A surface that reads as *aged* turns an
  inheritance into a museum piece — the notebook is meant to be still in use.
- **The accent is a pen, not a highlighter.** One ballpoint blue, marking only
  what is actionable or currently chosen. If a screen has two blue things
  competing for the eye, one of them is wrong; there is no second accent to
  promote it to.
- **It reads at arm's length.** The cook is a metre away with wet hands. A step
  that cannot be read standing up, or a control that cannot be hit without
  looking, has failed regardless of how it measures at a desk.

> Each of these can be failed by a real screen, which is what makes them worth
> writing down. "Feels like a notebook" cannot, so it is not here.

---

## 2. Visual foundations

The tokens live in `src/`. This section is the **rules for using them**.

### Colour

- **Accent:** ballpoint blue, `oklch(0.45 0.20 258)` — carried by `bg-accent`,
  and the only chromatic decision in the product. Given at the interview as
  *"the blue of a biro"* and converted on the spot; the hex equivalent is
  `#1d51c4`, which shifts very slightly on conversion.
- **Neutral seed:** fresh recycled paper, `oklch(0.97 0.012 85)`, pulled through
  a 12-step ramp at `neutralPigment: 0.6`. Step 1 is the page, step 12 is
  graphite. Nothing in the product is a true grey.
- **Proportion:** roughly 60% paper, 30% ink and rule, 10% blue. The accent
  covering a third of a screen leaves no emphasis to give.
- **Status colours are adapted** — the hue families stay green, amber, red and
  slate so they keep meaning what they mean, with chroma pulled down so an alert
  never shouts over a photograph of food. Adjust chroma and temperature, never
  the hue family: a green that is not green stops saying "it worked".
- **The secondary action is neutral.** A tinted supporting action would put two
  blues on a page whose premise is that there is one.
- **Contrast:** WCAG AA, enforced at build time by `themes.check-contrast()` and
  again in the browser by `npm run audit:contrast`. Both are hard gates.

### Typography

- **Heading:** `ui-serif, Georgia, Garamond, serif` · **Body:** system sans ·
  **Display:** the heading serif · **Mono:** system mono, rare — quantities are
  not code.
- Faces come from the Editorial row of `archetypes.md`. The serif is what makes
  a title read as a printed cookbook; the sans is what makes a step legible at
  arm's length.
- **Measure:** 45–75 characters. A method that runs wider loses the line return
  exactly when the reader looks away at the pan.
- **Leading:** 1.7, the archetype's value, kept despite the density deviation.
- **Hierarchy comes from size and weight, never colour.** A tinted heading stops
  standing out the moment a status colour appears beside it — and here it would
  also spend the one accent on something that is not actionable.
- Font sizes in `rem` so they follow the reader's browser setting; spacing in
  `px` so raising that setting does not inflate the layout.

### Spacing and grid

- **Base unit:** `--app-space-unit`, 4px. Every gap is a multiple; Editorial
  reaches one step up the scale where a choice exists.
- **Density: comfortable.** `size-control` 44px — the archetype's 40px raised by
  the multiplatform override — and `line-height` 1.7. Recorded as a deviation:
  Editorial's own answer is the reading density, and this product is consulted
  rather than read.
- Space belongs to the **container**, not the item. A card carrying its own
  outer margin cannot be reused in a tighter context.

### Elevation

- **Strategy:** borders. Hairlines and whitespace, no depth.
- **Hierarchy is carried by:** `border-color`. This is load-bearing — a flat
  system with a weak border produces surfaces nobody can tell apart, **and it
  passes the contrast check while doing it**, because that check measures text
  against its background and not one surface against another. The border is the
  thing that has to be strong.
- `shadow-raised` is `2xs` and `shadow-overlay` is `sm`, used only where
  something genuinely floats — a menu, a dialog. Two steps and no third.

---

## 3. Voice

Warm and instructive: the system speaks the way an experienced cook hands
something over, not the way a publication addresses a reader. It drops to a
direct, action-oriented register for anything that loses a recipe or fails to
save one — nobody wants charm from the thing that just deleted their
grandmother's *farofa*.

| Situation | Register | Example |
|---|---|---|
| Field validation | warm | "Give it a name so we can keep it in your notebook." |
| System error | action-oriented | "We couldn't save that just now. Try again in a moment." |
| Empty state | warm | "Your notebook is ready. Save the first recipe." |
| Destructive confirmation | action-oriented | "Delete this recipe? This cannot be undone." |
| Success | warm | "Saved to your notebook." |

- **Action labels:** imperative — *"Guarde a receita"*, *"Comece a cozinhar"*.
- **Errors say what to do next.** A message that only names the failure leaves
  the reader where they were, and here they are mid-recipe.
- **Never blame the cook.** "That name is already in your notebook" rather than
  "you entered a duplicate name".

---

## 4. Interaction and motion

- **States.** Every interactive element has `default`, `hover`, `focus-visible`,
  `active` and `disabled`. `focus-visible` is not a redundant `hover` — it is
  the only state a keyboard user has.
- **Focus ring:** `--app-ring-*`, in the accent. Never `outline: none` without a
  replacement at least as visible.
- **Durations:** `--app-duration-fast` for micro-feedback,
  `--app-duration-base` for transitions, `--app-duration-slow` for anything
  entering the screen.
- **Easing:** `--app-ease-out` entering, `--app-ease-in` leaving. Something
  arriving decelerates; something leaving does not linger.
- **`prefers-reduced-motion` is honoured**, and honouring it means removing the
  movement, not shortening it.

### Universal patterns

- **Confirmations live in a modal**, not a toast — the destructive case here is
  losing a recipe that exists nowhere else.
- **A destructive action needs one confirmation step**, not a typed name. The
  data is recoverable from the trash for thirty days; typing the title of a
  recipe to delete it is friction the content does not warrant.
- **Forms save on blur**, field by field. A notebook does not have a submit
  button, and losing a half-typed ingredient to a closed tab is the failure this
  product can least afford.

---

## 5. Composition — do and don't

The enforceable ones live in `patterns.json` and fail `npm run verify:patterns`.
The rest are here, and are advice.

### Do

- Use hairline rules to group ingredients and to separate one step from the next.
- Keep the accent to one primary action, plus whatever is currently selected.
- Let a photograph run to the edge of its own card, and no further.

### Don't

- Never stack two accent buttons side by side — a screen with two main actions
  has two jobs.
- Never use a status colour on something decorative. A status colour reports an
  outcome; it never marks an action that has not happened yet.
- Never tint a heading for emphasis.
- Never separate surfaces with a shadow. That decision was made in question 7
  and spending it twice produces the same page separated two ways.

### Enforced by the build

| Rule | Where | What fails |
|---|---|---|
| Deleting a recipe without a modal | `patterns.json` | `verify:patterns` names the modal |
| Gradient fills | `stylelint.config.cjs` | `npm run lint` |
| Uppercased labels | `stylelint.config.cjs` | `npm run lint` |
| Any pair below 4.5:1 | `themes.check-contrast()` | the Sass theme build |
| Any pair below 4.5:1 in the browser | `npm run audit:contrast` | the measured render |

---

## How this file is used

**By an agent.** The front matter is read before generating any markup or CSS;
the guardrails are checked against what was produced. When this document and the
code disagree, the document is the intent and the code is the bug — unless the
decision has genuinely changed, in which case update this file in the same
commit.

**By a person.** It is the answer to "why is it like that", which is the
question a design system exists to stop re-litigating.

**What it is not.** It is not the token reference — that is
`skills/design-system/references/tokens.md` — and it is not the component
vocabulary, which is `patterns.json`. This file holds the decisions those two
express.

---

*Generated from the discovery interview on 2026-08-29, against version 0.4.1 of
the design system. The library underneath is
CoreUI; nothing in this file depends on that, and the adapter is what makes it
true. No answer was left `undecided`.*

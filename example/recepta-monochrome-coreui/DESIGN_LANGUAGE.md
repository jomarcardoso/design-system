---
toolVersion: 0.7.0

archetype: editorial-premium
archetypeNote: ~

density: comfortable
platform: multiplatform

radius: subtle
elevation: borders
elevationCarrier: border-color

# Thin outline, matching a light serif. Icons inherit `currentColor` — the one
# accent is spent on actions, never on decoration.
iconStyle: outline
iconStroke: 1.25px
iconSize: 20px

# Quiet: one thing stands out because everything around it recedes. The recipe
# is the loudest thing on the page and the interface is the paper it sits on.
# Eight component defaults derive from this — see derivations.md.
posture: quiet

# A single column. The notebook has no sidebar: a page of a recipe book is a
# page, and a persistent rail would be the app announcing itself on a surface
# whose premise is that it does not.
frame: single-column

# DERIVED from Q5 (occasional) and the Editorial archetype. Controls appear when
# they are needed; the cook reading a step is not also choosing a filter.
disclosure: progressive

# DERIVED then confirmed. Icons lead their labels, and stand alone only in a
# repeated toolbar. A notebook has no icon vocabulary of its own, so an unlabelled
# glyph here is a puzzle rather than a shortcut.
iconPolicy: icon-leads

accessibility: AA
statusColours: brand-adapted

# The load-bearing line. One accent carries every interactive job; everything
# else is a position on the paper ramp.
colourStrategy: monochrome

# --- Accent-driven only ------------------------------------------------------
# high | low. DERIVED, not chosen: the accent measured against the lightest and
# darkest ramp steps, and the light one wins. Changing this by hand does not
# change the measurement — change the accent.
accentContrast: high
# 0 = true grey, 1 = the seed pigment at full strength. Sepia, kept at the light
# end of the ladder — see the note in section 2 on why the original "not sepia"
# answer was withdrawn.
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

# Conflicts raised and resolved. Not deviations — nothing here went against the
# archetype — but decisions whose values look arbitrary without their story.
resolutions:
  - conflict: >
      "paper, but not that old yellowed sepia" and "it has to read as paper"
      could not both hold literally. Two builds honoured the restriction as
      written and produced cream, then ice.
    chosen: >
      sepia held at the LIGHT end of the ladder. What the answer was avoiding
      was age, and age is darkness and unevenness rather than yellow.
    instead-of: a warm grey, which read as an office rather than a notebook
  - conflict: >
      the ink ladder wanted three distinguishable steps and the third,
      paper(600), measured 3.67:1 against the page — below the AA this product
      committed to.
    chosen: moved the muted and subtlest inks one rung down, to 800 and 700
    instead-of: >
      dropping to a two-ink page, which flattens every screen, or lowering the
      threshold, which is not a typography decision

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

<!-- example/recepta-monochrome-coreui/DESIGN_LANGUAGE.md -->

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
- **Fresh paper, not old paper.** The neutrals are sepia because paper is sepia,
  and they stay at the LIGHT end of it. What makes a page look aged is darkness
  and unevenness, not yellow — an inheritance still in use is a clean warm page,
  and a museum piece is a dim one.
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

- **Accent:** ballpoint blue, seed `#2a3b8f`, resolving to `#4a5eab` at the step
  `bg-accent` takes. The only chromatic decision in the product.
- **Neutral seed:** sepia pigment `#8a6b3d`, pulled through a 12-step ramp at
  `neutralPigment: 0.6`. The page comes out `#f9f6f2`, the rules `#cfc2b0` and
  the quiet fill `#ebe5dd`; nothing in the product is a true grey.

  **The interview's answer here was revised, and the revision is the point.**
  Question 11b was answered *"paper, but not that old yellowed sepia"*, and two
  builds honoured it literally — first a straw seed at 67 degrees, which came
  out cream, then a grey-green one, which came out ice. Neither read as paper.
  Seeing it on a screen, the client withdrew the restriction: the thing being
  avoided was AGE, and the way to avoid age is lightness and cleanliness, not
  the removal of yellow. Sepia at a light step is a fresh page; sepia at a dark
  one is a stained one.

  Recorded rather than quietly changed, because the original answer was a
  reasonable thing to say and the next person will be tempted to say it again.

  **The seed is the pigment, not the page.** A ramp seed's own chroma is the
  peak the curve multiplies, so handing it the near-white paper colour —
  `oklch(0.97 0.012 85)`, chroma 0.012 — leaves a peak of 0.007 and produces an
  ordinary grey ramp. The warmth disappears and nothing errors, because a grey
  ramp is a valid ramp.
- **The accent is strong, so its label inverts.** `accentContrast: high` — the
  blue is saturated enough that `fg-on-accent` is measured light, and the
  contrast gate checks it as such. A pale accent would have kept one ink colour
  throughout and leaned harder on weight and space; this one does not.
- **Ballpoint, not azure.** The first seed measured within a degree of
  Bootstrap's own blue and read as a framework's default. Ink from a biro sits
  ON the fibre rather than soaking in, so it scans darker and nearer violet than
  any UI blue: `#2a3b8f`, which the ramp resolves to `#4a5eab`.
- **The layout spends TWO rungs of the ladder** — question 11d. The page and the
  header are one surface; a card is one rung lighter. Rung 3 is reserved for the
  quiet neutral fill that every badge, chip and resting secondary action is made
  of, and a layout that spends it leaves labels with nothing to be made of but a
  dark solid.
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

### Shape

- **`radius-control`:** 4px · **`radius-surface`:** 6px · **Pills:** badges
  only — the Editorial row of `archetypes.md`.
- Subtle, not square and not rounded. Square would read as an instrument and
  rounded as a toy; 4px reads as a trimmed page, which is the object this
  product is imitating.
- **Surfaces are one step rounder than the controls inside them.** A button with
  the same radius as its card reads as stuck to it.

### Iconography

- **Style:** outline · **Stroke:** 1.25px · **Size:** 20px — the Editorial row
  of `archetypes.md`, and the thinnest stroke in the matrix because it sits
  beside a light serif.
- **Icons inherit `currentColor`.** An icon never carries its own colour. The
  product has one accent and it is spent on actions, not on decoration.
- **Corners match `radius-control`**, 4px. An icon drawn square inside a rounded
  interface reads as clip art.
- **Policy: icons lead their labels.** An icon stands alone only in a repeated
  toolbar where the glyph is already known. A notebook has no icon vocabulary of
  its own, so an unlabelled glyph here is a puzzle rather than a shortcut — and
  never on deleting a recipe, where the label is the confirmation the reader gets
  before the modal appears.
- **One set.** Mixing two is the most visible inconsistency this product could
  ship and no token file would notice.

### Elevation

- **Strategy:** borders. Hairlines and whitespace, no depth.
- **The ladder runs UP: anything raised is lighter than the page** — question
  11e, answer (A). The page sits two rungs up, a card is lighter than it, and the
  lightest step is reserved for what genuinely floats. Sheets stacked on a desk
  rather than wells cut into one, which is the metaphor the product already
  makes everywhere else.

  Written as a relation on purpose: *anything raised is lighter than the page*
  survives a change of palette, and *cards are step 50* does not. It is also the
  one decision here that was originally inherited rather than made — the first
  build copied another example's ladder, the result happened to be liked, and
  nothing recorded why. Question 11e exists because of that.
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

## 6. Composing a screen the system has no component for

A recipe notebook grows screens faster than it grows components — a shopping
list, a week plan, a printed sheet. These rules are what make one of those look
like Recepta without a component existing for it.

Everything here is a **relation**, not a value. The concrete steps live in
`patterns.json`, which is allowed to know which theme this is; these hold across
every theme this language will ever have.

- **The frame: a single column.** A header with a rule under it, the sheet, a
  footer. No aside — a page of a recipe book is a page, and a persistent rail
  would be the application announcing itself on a surface whose whole premise is
  that it does not. The header is separated by a rule rather than by a tone,
  which keeps the two-rung budget for content.
- **Measure: 45–75 characters**, held at 68ch. A method that runs wider loses the
  line return exactly when the reader looks away at the pan.
- **Disclosure: progressive.** Controls appear when they are needed — the cook
  reading a step is not also choosing a filter. The cost is real and accepted: a
  daily user pays a click for the calm. It would be the wrong trade for a recipe
  MANAGER, which is the same archetype and the same school with a different
  answer to question 5.
- **Type roles.** Body is the baseline. A page has exactly one title, at the top
  step. Section titles sit two steps above body, captions one below. A recipe
  step is body — it is the thing being read, so nothing outranks it.
- **Vertical rhythm.** Related things one unit apart, unrelated things three.
  The gap says what belongs together before anyone reads a word, which is the
  whole reason a list of ingredients is legible at arm's length.
- **Surfaces.** Two levels: the page, and a block raised off it. No third. With
  `elevation: borders` the level is carried by a hairline, so a third would have
  to be a second hairline, which is not a level.
- **Alignment.** One vertical edge per column. A screen with three left edges
  reads as three screens, and this product is meant to read as one sheet.
- **Where the accent may appear.** The one primary action, and what is currently
  chosen. Nowhere else — not on headings, not on rules, not on a decorative tag.

> An agent asked for a screen reads this section and the tokens, and nothing
> else. A rule here that cannot be followed without knowing a pixel value is in
> the wrong file.

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

*Generated from the discovery interview on 2026-08-29, against version 0.7.0 of
the design system. The library underneath is
CoreUI; nothing in this file depends on that, and the adapter is what makes it
true. No answer was left `undecided`.*

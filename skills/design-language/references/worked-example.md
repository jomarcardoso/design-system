# A worked example

What a finished `DESIGN-LANGUAGE.md` looks like, reconstructed from a product
that already exists in this repository:
[`example/ds-meu-caderninho-daisyui-phase3`](../../../example/ds-meu-caderninho-daisyui-phase3).

Every value below is the one actually in that product's `theme.scss` and
`patterns.json` — nothing here is illustrative. Read it to calibrate the length
and the specificity of what the interview should produce, then throw it away and
run the interview for real.

Two things it demonstrates that the template alone does not: **a deviation
recorded with its reason**, and **a hybrid archetype**, which is what most real
products turn out to be.

---

```markdown
---
archetype: hybrid
archetypeNote: >
  Editorial & Premium typography and restraint, on Playful & Expressive warmth.
  A recipe notebook is read like a book and used like a kitchen tool.

density: comfortable
platform: multiplatform

radius: subtle
elevation: soft-shadows
elevationCarrier: ~

accessibility: AA
statusColours: brand-adapted

voice: warm
voiceExceptions:
  - action-oriented for anything that deletes a saved recipe
ctaMood: infinitive

deviations:
  - decision: action and selected are the same hue, one step apart
    against: the foundation's default of two distinct brand families
    reason: >
      The product genuinely has one brand colour. A notebook is not a
      dashboard. Layer 2 warns that collapsing the two hides a modelling error,
      and here it is a real single-brand product rather than an oversight.
    accepted: 2026-08-07

overrides: []

guardrails:
  - rule: Status colours never mark an action that has not happened yet
    enforcement: ledger
    instead: primary
  - rule: Tags are read-only; the selectable version is a chip
    enforcement: document
  - rule: Never tint a heading to make it stand out
    enforcement: document
---

# Design language — Meu Caderninho

A personal recipe notebook. People save what they cook, annotate it, and come
back to it months later. The product's promise is that the collection belongs to
the person who wrote it — not to a platform, and not to an algorithm.

**Archetype:** hybrid. Editorial typography and restraint carry the reading; the
warmth comes from Playful. The tension is real and deliberate: a recipe is read
like an article and used like a tool, standing up with wet hands in a kitchen.

One deviation from the foundation's own default: `action` and `selected` are the
same cocoa, one step apart, where the system normally insists on two distinct
families. That default exists to expose a modelling error — two roles collapsed
by accident. Here there is genuinely one brand colour, and writing that down is
what separates a decision from an oversight.

---

## 1. Principles

- **It should read like paper.** When a choice is between screen convention and
  print convention, print wins: serif headings, generous leading, surfaces that
  are warm rather than white.
- **The user's own writing sounds like theirs.** A note someone left themselves
  is set in the display face. Interface chrome is not.
- **A photograph outranks the interface.** Nothing beside a recipe image
  competes with it for attention — that is why the status colours are muted.

---

## 2. Visual foundations

### Colour

- **Brand primary:** cocoa 800 — carried by `bg-action`.
- **Proportion:** the page is parchment, cards are near-white, and cocoa appears
  on one primary action per screen.
- **Status colours are adapted**: green, amber, red and steel, all pulled toward
  earth so a tag never outshouts the photograph next to it. Hue family is
  unchanged — an adapted green is still green, because that is the whole job.
- **Contrast:** WCAG AA, checked at build time and again in the browser.

### Typography

- **Heading:** `ui-serif, Georgia` · **Body:** system sans ·
  **Display:** `Segoe Script, Bradley Hand` · **Mono:** system mono
- `font-family-display` is the product's voice: the wordmark and the closing note
  today, and the user's own annotations as the product grows.
- **Leading:** 1.6 — a recipe is read, not scanned.

### Spacing and grid

- **Base unit:** `--app-space-unit`, 4px.
- **Density:** comfortable. Controls are 36px; the filter panel is the one dense
  region and it uses the small step deliberately.

### Elevation

- **Strategy:** soft shadows. A card lifts off the page by being closer to
  white, which is how printed matter behaves — `raised` is the whitest step in
  the theme, not the darkest.

---

## 3. Voice

Warm without being cute. The product is someone's notebook, so it speaks the way
a note to yourself does — and it stops being warm the moment something is at
risk of being lost.

| Situation | Register | Example |
|---|---|---|
| Field validation | warm | "This one needs a name before it can be saved." |
| System error | action-oriented | "We couldn't save that. Try again in a moment." |
| Empty state | warm | "Nothing here yet. Your first recipe goes a long way." |
| Destructive confirmation | action-oriented | "Delete this recipe? This can't be undone." |
| Success | warm | "Saved to your notebook." |

- **Action labels:** infinitive — *"Nova receita"*, *"Aplicar filtros"*.
- **Errors say what to do next.**
- **Never blame the user.**

---

## 4. Interaction and motion

- Every interactive element has `default`, `hover`, `focus-visible`, `active`
  and `disabled`. The filter chips carry their state in `aria-pressed`, so the
  accessible name and the visual state cannot drift apart.
- **Focus ring:** `--app-ring-*`, cocoa 700.
- **Durations:** base for panel transitions, fast for chip selection.
- `prefers-reduced-motion` removes movement rather than shortening it.

---

## 5. Composition — do and don't

### Do

- Use a chip for anything selectable and a badge for anything read-only. They
  look similar and behave differently; keeping them apart is what stops a tag
  looking clickable.
- Put the primary action in the header, once per screen.

### Don't

- Never stack two primary buttons side by side.
- Never tint a heading to make it stand out — hierarchy is size and weight.
- Never use a status colour on a control that proposes an action.

### Enforced by the build

| Rule | Where | What fails |
|---|---|---|
| Status colour on an action | `patterns.json` | `verify:patterns` names `primary` |
| Literal colour in product CSS | `stylelint.config.cjs` | `npm run lint` |
| Any bg/fg pair below AA | `themes.check-contrast()` | the Sass build |
```

---

## What to notice

**It is short.** Five sections, roughly two screens. A design language nobody
finishes reading governs nothing.

**Every rule is specific enough to fail.** "Never tint a heading to make it
stand out" can be checked against a screen. "Be consistent" cannot, and does not
appear.

**The deviation is argued, not apologised for.** It names the foundation's
default, says why this product is the exception, and dates the decision. That
paragraph is what stops the next person undoing it.

**The enforcement table is honest.** Three rules fail a build; the others are
marked as advice in the front matter. Nothing claims to be checked that is not.

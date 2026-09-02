<!-- example/recepta-monochrome-coreui/DERIVED.md -->

# What these answers decided — Recepta

**Regenerate this when an answer changes.** It is derived, not authored: every
line traces to an answer in `DESIGN_LANGUAGE.md` and a table in
`skills/design-language/references/derivations.md`.

| | holds |
|---|---|
| `DESIGN_LANGUAGE.md` | the decisions, and why |
| **this file** | what those decisions produced, and which answer produced each |
| `FOUNDATIONS.md` | the values the build compiled to |

---

## 1. What this looks like, in a paragraph

A calm page on warm sepia paper, where the only colour is one ballpoint blue and
everything else is a rung on the paper ramp. Titles are serif and set on a major
third, so a recipe name has real presence without shouting; a label is a quiet
chip rather than a small dark button; there is one action per screen and it is
the only saturated thing on it. The page is a single column with a measure, like
a sheet — no rail, no panel, nothing that announces an application. Icons lead
their labels rather than replacing them, because a notebook has no icon
vocabulary of its own.

The three answers doing the most work are **`posture: quiet`**, which makes every
supporting element recede; **`colourStrategy: monochrome`**, which means the one
blue has to be spent carefully; and **the answer to question 1** — a notebook
inherited from your mother — which rules out more than the archetype does.

## 2. What was derived

### The two archetypes

`archetypeSecondary: playful-expressive`, and `secondaryGoverns` names four
domains. Editorial & Premium is the PRIMARY and governs structure; the secondary
governs nothing structural.

| domain | what Playful decides here | what it does NOT touch |
|---|---|---|
| `voice` | "Guarde a receita", never "Item salvo com sucesso" | — |
| `illustration` | drawn glyphs beside the ingredients; the empty state | — |
| `warmth` | the sepia pigment at 0.6; a grey ramp here would be an office | — |
| `marks` | the quiet category pills — "45 min", "sem glúten" | — |
| | | the radius, the serif pairing, the ladder, the density, the accent budget |

**The warm voice used to be a deviation.** It was never a tension: the voice was
not fighting Editorial, it was doing a job Editorial was never asked to do. A
deviation list holding things that are not tensions teaches its reader to skip
it, and then the real one arrives in the same tone.


### Quiet elements

| decision | value | from |
|---|---|---|
| badge and tag fill | `bg-neutral-subtle` | `posture: quiet` |
| badge and tag ink | `fg-muted` | `posture: quiet` |
| selected chip | `bg-accent-subtle` + `fg-accent` | `quiet` + `monochrome` |
| secondary action | quiet neutral fill | `secondaryAction: neutral`, `monochrome` |
| tertiary / ghost | transparent, quiet fill on hover | `posture: quiet` |

### Shape and icons — derived, never asked

Both used to be questions, and both were answered by the archetype anyway. They
appear here so they can still be argued with.

| decision | value | from |
|---|---|---|
| `radius-control` / `radius-surface` | 4px / 6px | `editorial-premium`; no adjustment, since `posture` is quiet and the model is not recessed |
| pills | never | `editorial-premium` |
| `iconStyle` | outline | `editorial-premium` |
| `iconStroke` | 1.25px | `editorial-premium` — the thinnest in the matrix, set against a light serif |
| `iconSize` | 20px | `editorial-premium` |

### Surfaces, inputs and lines

| decision | value | from |
|---|---|---|
| `surfaceModel` | `elevated` | `protagonist: user-content` — the cook's recipes are the lit thing |
| `ladderSpend` | 2 | `surfaceModel` + the frame; rung 3 stays reserved |
| `border-divider` | `border-color` | `elevationCarrier: border-color` — the line is load-bearing here |
| `border-interactive` | `border-color-strong` | same, and `posture: quiet` leaves it unmoved |
| where the divider disappears | around any card lighter than the page | `surfaceModel: elevated` — the two fills already draw the line |
| what may be elevated at once | one permanent (the card), one temporary (the modal). Never the header | always |
| the same model in dark | unchanged — raised stays lighter | `elevated` is the one model that survives the flip |
| input at rest | hairline, same fill as its container | `surfaceModel: elevated` + `quiet` |
| card separation | hairline, same fill as the page | `surfaceSeparation: lines` |
| divider weight | `border-color-subtle` | `posture: quiet` |
| interactive edge | `border-color` at rest, `border-strong` on hover | `posture: quiet` |
| modal surface | the raised rung | `ladderSpend: 2` |
| where `paper(0)` lands | `bg-raised` only — modals and dropdowns | ladder runs UP |

### Type and rhythm

| decision | value | from |
|---|---|---|
| scale ratio | 1.25, a major third | `editorial-premium` |
| heading face scope | page titles, section titles, recipe names — never controls | `editorial-premium` |
| control weight | the body weight | `posture: quiet` |
| related / unrelated / section | `space-xs` / `space-lg` / `space-2xl` | `density: comfortable` |
| measure | 68ch | Editorial + Q5 reading-adjacent |

### Icons

| decision | value | from |
|---|---|---|
| the set | Lucide | `iconStyle: outline` needs a set drawn with a real stroke attribute |
| stroke | 1.25px, via `--app-icon-stroke` | `iconStroke`, itself from the Editorial row — the thinnest in the matrix, because it sits beside a light serif |
| size | 20px, via `--app-size-icon` | `iconSize` |
| colour | `currentColor`, always | the icon takes the ink of the text it belongs to |
| where a glyph may stand alone | a repeated toolbar only | `iconPolicy: icon-leads` |

### Status

| decision | value | from |
|---|---|---|
| hue families | green, amber, red, and the pen for info | `statusColours: brand-adapted` — adapted moves chroma and temperature, never the family |
| chroma | pulled down, so an alert never shouts over a photograph of food | `brand-adapted` + `posture: quiet` |
| the warning pair | dark ink on a light amber fill, brightening as it is pressed | the inverted-pair rule: a fill that darkens walks toward its own label |
| where a status colour may NOT go | anything decorative, and any action that has not happened yet | `brand-adapted` + the accent budget |

### Images

| decision | value | from |
|---|---|---|
| `ratio-media` | 0.8 — 4:5, tall | `imageRatio`, itself from the phone being where a recipe is read |
| `ratio-thumb` | 1 | not a decision; an avatar is square in every product that has shipped |
| `radius-image` | `radius-surface`, 12px | `imagery: content` — the photograph is a surface, not an ornament inside one |
| edge | an inset hairline in `border-color` | `imagery: content` + the ladder running UP: a pale sky on cream paper has no boundary |
| shadow | none | `elevationCarrier: border-color` |
| decorative images | **not allowed** | `editorial-premium` permits them; question 1 does not — a notebook has photographs of food and nothing else |
| before it loads | `aspect-ratio` reserves the box; a missing image shows `bg-neutral-subtle` and a centred icon at `fg-subtlest` | `imagery: content`, where there is no version of the product with the image always present |

The inset hairline is the interesting one. The ladder runs from the lightest
paper upward, so every surface is at least as light as the page — and a
photograph of a pale dish on a pale plate then bleeds into the card behind it.
A border would have been the reflex; at a fixed 4:5 the box has no room to give
up, so it is `box-shadow: inset 0 0 0 1px` instead.

### Grid and columns

| decision | value | from |
|---|---|---|
| columns | none — one measure, centred | `frame: single-column` |
| `gap-grid` | `space-lg` | `frame` + `density: comfortable` |
| `size-measure` | 68ch | `editorial-premium` + Q5, reading-adjacent |
| where the grid stops | the recipe list is a two-up grid above the tablet breakpoint and a single stack below it | `platform: multiplatform` — the phone layout is the design, and the second column is what happens when there is room |
| density per breakpoint | unchanged | `platform: multiplatform`; a phone is narrower, not denser, and the target size stays |

**Breakpoints are CoreUI's**, compiled from `$grid-breakpoints` in
`coreui-entry.scss`. There is no token for them and there cannot be: they are
baked into generated utility rules before any custom property exists.

### Motion

| decision | value | from |
|---|---|---|
| what moves | colour and opacity only | `posture: quiet` |
| state feedback | `duration-fast`, 120ms, in and out | `posture: quiet` |
| disclosure | `duration-base`, 200ms | `posture` + `disclosure: progressive` |
| entrance | none. Nothing animates on page load | `posture: quiet` |
| the photograph arriving | no fade, no blur-up | `posture: quiet` — a notebook does not perform the arrival of a picture |
| waiting | a skeleton at `bg-neutral-subtle`; nothing under ~300ms | `posture: quiet` and the known card shape |
| reduced motion | the duration tokens go to `0s`; every state still changes | always |

This replaces the line that used to sit in section 5 saying motion was
undecided. It was true and it was a hole: the durations were the foundation's,
which is to say nobody's.

### Focus and hover

| decision | value | from |
|---|---|---|
| focus form | `ring` at 2px, offset 2px | `posture: quiet` — a focus ring is not a place to have a personality |
| `ring-color` | the accent, the ink blue | `colourStrategy: monochrome`; it is the only chromatic thing in the system |
| `:focus-visible`, never `:focus` | so a mouse click on a card draws nothing | always |
| what hover changes | the background, one rung. Nothing else | `posture: quiet` |
| what hover never does | move, grow, or reveal an action | the row a cook is aiming at must not slide away |
| the touch equivalent | every action visible on hover is visible at rest; `:active` carries the feedback | `platform: multiplatform` |

### How a selection announces itself

One decision for every family that has a chosen state — chip, tab, toggle,
selectable card, list row, checkbox. It used to be decided four times in four
tables nobody had checked against each other.

| decision | value | from |
|---|---|---|
| the progression | washed → saturated | `posture: quiet` |
| `accentFill` | `washed` | `protagonist: user-content` — the photograph is the magnet, not the button. The ink reads at 13.73:1 and the fill sits 171° of hue from the badge fill, so it is not mistakable for a label |
| the second channel | the ink darkens with the fill | `accessibility: AA` — a tone step alone does not survive a printed recipe |
| multi-select | washed only, never a solid fill | cardinality: the tag filters are multi-select, and eight filled chips is a wall of colour |
| the floor it clears | ink at 13.73:1, fill 171° from the badge | `verify:accent-fill`, in OKLCH — a luminance ratio had said the opposite |

### The accent budget

| may appear | may not |
|---|---|
| the one primary action, the current selection, the focus ring, the active tab | headings, dividers, badges, tags, decorative marks, section backgrounds, icons that are not marking a selection |

## 3. Component forms

**The full set is [`FORM-SET.md`](FORM-SET.md), generated.** Forty families with
the form this product's answers lead to, what else was available, and the two
families it does not have. This section used to list eleven by hand, which meant
a client saw no recommendation for the other twenty-nine — and a family with no
recommendation takes the library's shape while nobody is looking.

Kept below are the ones worth arguing about in prose.


| family | form chosen | from | also available |
|---|---|---|---|
| button | solid fill for primary, quiet neutral for secondary, text for tertiary | `quiet` + `monochrome` | outline; underline-offset link-button, which Editorial also fits |
| card | hairline, same fill as the page | `lines` + `quiet` | one rung lighter, if `surfaceSeparation` were `tones` |
| card with an image | framed at a fixed ratio | Editorial; the print metaphor | top-bleed, for a more commercial feel |
| badge / tag | quiet chip, muted ink | `quiet` | the library's solid, refused in the ledger |
| tabs | enclosed | `elevation: borders` | underline; weight-only, which `quiet` + Editorial also fits |
| input | boxed, flat | ladder runs UP | underline-only, which Editorial fits and dense forms do not |
| page header | eyebrow of tags, title, muted attribution, subtlest metadata | Editorial | title + rule; title + actions |
| loading | skeleton | `posture: quiet` | spinner |
| empty state | one line plus the action that fills it | `quiet` | illustration, which Editorial does not fit |
| pagination | load more | `disclosure: progressive` | numbered pages |
| frame | single column, header separated by a rule | `frame: single-column` | a rail, refused below |

**Ruled out by the product itself**, rather than by the archetype or the school:

- **Card with text printed over a photograph** — nothing in a notebook is that.
  The archetype permits it and so does the school; question 1 does not.
- **A persistent rail or sidebar** — a page of a recipe book is a page, and a
  rail would be the application announcing itself on a surface whose premise is
  that it does not.
- **Illustrated empty states** — an illustration in this product is a costume.
- **Icon-only buttons on anything destructive** — the label is the confirmation
  the reader gets before the modal appears.

## 4. Rules now in force

| rule | enforcement | from |
|---|---|---|
| never a gradient fill | `stylelint` | Editorial guardrail |
| never uppercase a label | `stylelint` | Editorial guardrail |
| deleting a recipe requires a confirmation modal | `ledger` | Q21a + the destructive guardrail |
| the library's solid badge and `text-bg-*` are refused | `ledger` | `posture: quiet`; and `text-bg-*` cannot follow a theme |
| never tint a heading for emphasis | `document` | Editorial guardrail |
| depth never comes from a heavy shadow | `document` | `elevation: borders` |
| never a third surface level | `document` | `ladderSpend: 2` |
| every pair at 4.5:1 or better | build gate | `accessibility: AA` |

## 5. What was NOT decided

- ~~The icon set.~~ **Decided: Lucide.** `iconStyle: outline` at 1.25px needs a
  set drawn with a real `stroke-width` attribute, which rules out CoreUI's own
  icons and every filled-path family. Three glyphs are on the page, which is
  itself in character for `quiet`.
- **Print styles.** A recipe notebook is a plausible thing to print and nothing
  in the interview asked.
- ~~Motion beyond the defaults.~~ **Decided.** Derived from `posture: quiet`
  rather than asked — see the motion table above. The durations are still the
  foundation's values; what changed is that they are now a choice with a reason
  attached, and the list of what is allowed to move is short and written down.
- **Print styles for the image.** A 4:5 photograph on A4 is a decision and the
  print question above already had no answer.
- ~~Component promotion.~~ **Mapped, not done.** Every pattern is `raw` today,
  so the shapes are CoreUI's and only the colour is this product's. Four
  trajectories are now recorded and `verify:patterns` prints them: the card
  leaves first, when a recipe carries a photograph and the framed form is
  needed; tabs follow, when the section count grows or the first phone review
  happens; the badge waits for the first filter chip, and is blocked on a chip
  pattern that does not exist yet. The button stays — recorded as considered
  rather than missed, because CoreUI's geometry already matches once the entry
  sets radius, weight and height.

## 6. If you want to change something, change this

| if you want… | change | not |
|---|---|---|
| louder badges, stronger rules, filled chips | `posture` | the badge |
| a warmer or cooler page | the ramp seed in `palette.scss` | individual surfaces |
| bigger or smaller headings | `typeScale` | one heading |
| the actions visible without hovering | `disclosure` | each control |
| icons standing alone | `iconPolicy` | one button |
| cards that read as recessed | `surfaceModel: elevated` | the card |
| a second colour anywhere | `colourStrategy` — and it stops being this school | one component |
| the interface to stop looking like CoreUI | promote patterns out of `raw` — the trajectories say which and when | the tokens, which are already this product's |

---

*Derived from `DESIGN_LANGUAGE.md` on 2026-08-30, against version 0.8.0.
Thirty-two decisions derived from twenty-one answers.*

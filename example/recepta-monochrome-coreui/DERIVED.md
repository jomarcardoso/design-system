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

### Quiet elements

| decision | value | from |
|---|---|---|
| badge and tag fill | `bg-neutral-subtle` | `posture: quiet` |
| badge and tag ink | `fg-muted` | `posture: quiet` |
| selected chip | `bg-accent-subtle` + `fg-accent` | `quiet` + `monochrome` |
| secondary action | quiet neutral fill | `secondaryAction: neutral`, `monochrome` |
| tertiary / ghost | transparent, quiet fill on hover | `posture: quiet` |

### Surfaces, inputs and lines

| decision | value | from |
|---|---|---|
| input at rest | hairline, same fill as its container | ladder runs UP (13d = A) + `quiet` |
| card separation | hairline, same fill as the page | `surfaceSeparation: lines` |
| divider weight | `border-color-subtle` | `posture: quiet` |
| interactive edge | `border-color` at rest, `border-strong` on hover | `posture: quiet` |
| modal surface | the raised rung | two-surface budget (13c = B) |
| where `paper(0)` lands | `bg-raised` only — modals and dropdowns | ladder runs UP |

### Type and rhythm

| decision | value | from |
|---|---|---|
| scale ratio | 1.25, a major third | `editorial-premium` |
| heading face scope | page titles, section titles, recipe names — never controls | `editorial-premium` |
| control weight | the body weight | `posture: quiet` |
| related / unrelated / section | `space-xs` / `space-lg` / `space-2xl` | `density: comfortable` |
| measure | 68ch | Editorial + Q5 reading-adjacent |

### The accent budget

| may appear | may not |
|---|---|
| the one primary action, the current selection, the focus ring, the active tab | headings, dividers, badges, tags, decorative marks, section backgrounds, icons that are not marking a selection |

## 3. Component forms

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
| never a third surface level | `document` | 13c = B |
| every pair at 4.5:1 or better | build gate | `accessibility: AA` |

## 5. What was NOT decided

- ~~The icon set.~~ **Decided: Lucide.** `iconStyle: outline` at 1.25px needs a
  set drawn with a real `stroke-width` attribute, which rules out CoreUI's own
  icons and every filled-path family. Three glyphs are on the page, which is
  itself in character for `quiet`.
- **Print styles.** A recipe notebook is a plausible thing to print and nothing
  in the interview asked.
- **Motion beyond the defaults.** The durations and easings are the
  foundation's; nothing here chose them.
- **Component promotion.** Every pattern is `raw` today, which means the shapes
  are CoreUI's. Which ones leave the library first is the next real decision.

## 6. If you want to change something, change this

| if you want… | change | not |
|---|---|---|
| louder badges, stronger rules, filled chips | `posture` | the badge |
| a warmer or cooler page | the ramp seed in `palette.scss` | individual surfaces |
| bigger or smaller headings | `typeScale` | one heading |
| the actions visible without hovering | `disclosure` | each control |
| icons standing alone | `iconPolicy` | one button |
| cards that read as recessed | the ladder direction (13d) | the card |
| a second colour anywhere | `colourStrategy` — and it stops being this school | one component |
| the interface to stop looking like CoreUI | promote patterns out of `raw` | the tokens, which are already this product's |

---

*Derived from `DESIGN_LANGUAGE.md` on 2026-08-30, against version 0.8.0.
Thirty-two decisions derived from twenty-one answers.*

<!-- FORMS.md -->

# The form map

**Generated — do not edit.** `npm run docs:forms` rebuilds it from
`skills/design-patterns/references/component-forms.md`.

Every form the catalogue offers, the answers that lead to it, and how much
of the answer space it serves. It exists to answer one question: **can the
interview actually reach all of these?** `npm run verify:forms` is the
enforcement — this is the thing you read.

Across **8640** coherent combinations of the 10 answers the
catalogue discriminates on. Combinations the questionnaire rules out — a
bordered system separating its surfaces with shadows — are excluded, because
measuring reach against products that cannot exist flatters every number.

**Reach is specificity, not quality.** A form at 4% is doing the job a
catalogue exists for. A FAMILY whose forms all sit high is the warning: it
means the answers are not deciding anything there.

## Button

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| solid fill | 67% | `balanced` or `loud` | — | any school; — |
| soft fill | 44% | `quiet` or `functional` | `monochrome` | — |
| outline | 7% | `quiet`, `editorial-premium` | — | secondary at any posture; as the only primary on a dense screen |
| text / ghost | 33% | `quiet` | — | tertiary anywhere; when the action must be found without reading |
| underline-offset link-button | 7% | `editorial-premium`, `quiet` | — | anywhere a touch target is needed |
| icon-only | 100% | — | — | icons of a known set; in a repeated context (a toolbar); first-time or destructive actions; see the icon policy |
| icon expands to label on hover | 33% | `quiet` | — | desktop-first; mobile-first or multiplatform |

## Input

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| boxed, filled | 25% | `recessed`, `balanced` or `loud` | `elevated` | — |
| boxed, flat | 33% | `quiet` | — | ladder runs UP; dense forms |
| underline only | 13% | `quiet`, `editorial-premium` or `tech-minimalist` | — | many fields at once; the affordance is weak |
| floating label | 27% | `balanced` | `editorial-premium` | Material-adjacent products |
| prefix / suffix slot | 100% | — | — | any; where the field has a unit; when the slot would be the only recess on the page |

## Card

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| hairline, same fill | 38% | `lines` | — | when cards must be scannable at a glance in a dense grid |
| one rung lighter | 13% | `elevated`, `tones` | `recessed` | — |
| one rung darker (well) | 38% | `recessed` | — | grouping form fields or data; reading surfaces |
| soft shadow | 38% | `soft-shadows` | `borders` | it is the decision spent twice |
| asymmetric corners | 20% | `playful-expressive` | — | a deliberate signature; any product whose language mentions paper; print or documents |

## Card with an image

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| framed, fixed ratio | 20% | `editorial-premium` | — | anything imitating print; full-bleed layouts where the frame reads as a border |
| top-bleed | 33% | `balanced` | — | commerce; listings; — |
| full-bleed with text over | 7% | `playful-expressive`, `loud` | — | media; entertainment; any product whose metaphor is paper or print |
| split | 13% | `quiet`, `lines` | — | narrow columns |
| image above, no frame | 100% | — | — | any archetype; any posture; when the photograph's own edges are pale; the card is lighter than the page |

## Selectable card

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| accent border on select | 67% | `quiet` or `balanced` | — | any school; — |
| tone shift on select | 67% | `brand` or `functional` | `monochrome` | — |
| corner check indicator | 100% | — | — | when the choice must survive a screenshot; small cards; the indicator crowds |
| pressed | 38% | `soft-shadows` | `borders` | — |

## Badge, tag and chip

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| pill with a status dot | 67% | — | `monochrome` | categories that need a colour without a coloured fill |
| outlined, monospace, uppercase | 20% | `utilitarian-technical` | — | metadata; logs; products whose guardrails forbid uppercase |
| removable chip | 100% | — | — | filters the user applied; tags the system applied |
| attached edge badge | 67% | — | `quiet` | a tab pinned to a card's edge |

## Tabs

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| underline | 67% | `quiet` or `balanced` | — | any school; — |
| enclosed | 21% | `borders`, `balanced` | `quiet` | — |
| segmented pill | 67% | `balanced` or `loud` | — | mobile-first; more than four options |
| weight only | 13% | `quiet`, `editorial-premium` or `tech-minimalist` | — | when the set changes often |

## List and table rows

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| whitespace only, no rules | 11% | `generous`, `quiet` | — | reading; dense data |
| hairline per row | 13% | `comfortable`, `lines` | — | — |
| zebra striping | 22% | `dense` | `quiet` | wide tables |
| row as a card | 33% | `comfortable` | — | touch targets that need to be obvious; long lists; the gaps waste the screen |
| accent bar on the selected row | 89% | — | `monochrome`, `quiet` | any school |
| hover only, no resting treatment | 100% | — | — | any density; any school; touch; where there is no hover |

## Divider

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| full-width hairline | 100% | — | — | anything |
| inset to the text column | 20% | `editorial-premium` | — | a page with a measure |
| labelled ("OR", "Step 2") | 100% | — | — | forms; sequences |
| dashed | 100% | — | — | a product whose metaphor is paper; coupons or stitching |
| whitespace only | 11% | `generous`, `quiet` | — | a page that already has enough rules |

## Message and alert

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| left border in the status colour, neutral fill | 33% | `quiet` or `balanced`, `brand-adapted` | — | — |
| subtle status fill | 33% | `balanced` | `quiet` | — |
| solid status fill | 33% | `loud` | `quiet` | — |
| border only, page fill | 13% | `quiet`, `lines` | — | when the message must interrupt |
| inverted toast | 100% | — | — | any; for transient confirmation; as the confirmation for something destructive |

## Checkbox, radio, switch

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| box or circle, accent when checked | 100% | — | — | anything; — |
| outline check, no fill | 33% | `quiet` | — | dense lists |
| whole row or card selectable | 100% | — | — | onboarding; plans; few large options; forms with many fields |
| segmented control instead of radios | 100% | — | — | two to four options; mobile-first; more than four |
| switch with an icon in the thumb | 67% | `loud` or `balanced` | `quiet` | — |

## Page header

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| title alone | 33% | `quiet` | — | short pages; pages that need orientation |
| eyebrow + title | 20% | `editorial-premium` | — | content with taxonomy; when the eyebrow would repeat the navigation |
| title + subtitle | 33% | `balanced` | — | anything explanatory; when the subtitle is the first paragraph in disguise |
| title + rule | 8% | `editorial-premium`, `lines` | `shadows` | — |
| title + actions | 50% | `exposed` | `progressive` | tools |
| stacked with metadata | 100% | — | — | reading products; records; articles; dense tools where the metadata is a column |

## Opening / hero

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| none — the content starts | 33% | `quiet` | — | tools; anything the user opens repeatedly; first-visit surfaces that must explain themselves |
| typographic | 7% | `editorial-premium`, `quiet` | — | when the promise needs a picture to land |
| image with text beside it | 33% | `balanced` | — | narrow columns |
| full-bleed image with text over | 7% | `loud`, `playful-expressive` | — | marketing; any product whose metaphor is paper or print |
| one large action | 33% | `loud` | — | a product with a single job; products with several equally-weighted entry points |

## Empty state

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| one muted line | 33% | `quiet` | — | a list that is often empty; unremarkable; a first-run screen |
| line plus the action that fills it | 100% | — | — | most products; most of the time; — |
| illustration plus line plus action | 7% | `playful-expressive`, `loud` | `editorial-premium` or `utilitarian-technical` | onboarding; where an illustration is a costume |
| a skeleton of the thing that would be there | 33% | `quiet` | — | when emptiness is temporary; when emptiness is the normal state |

## Loading

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| skeleton | 33% | `quiet` | — | layouts that are stable; known; when the shape varies wildly |
| spinner | 33% | `balanced` | — | short waits inside a control; full-page waits over one second |
| progress bar | 50% | `exposed` | — | anything measurable; when the total is unknown |
| nothing, then content | 100% | — | — | under ~200ms; anything slower; the page looks broken |
| the control becomes busy in place | 100% | — | — | when the whole region changes |

## Error and success

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| inline under the field | 100% | — | — | field validation; always; page-level failures |
| summary at the top of the form | 100% | — | — | long forms; accessibility for screen readers; short forms |
| toast | 100% | — | — | transient success; undoable actions; errors that need a decision; or anything destructive |
| inline banner in the flow | 50% | `exposed` | — | page-level errors; — |
| full-page state | 100% | — | — | a route that failed entirely; a failed section |
| silence | 100% | — | — | success that is visible in the result itself; anything the user cannot see happen |

## Form: label position

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| above the field | 100% | — | — | almost always; best for scanning; for narrow screens; — |
| beside the field | 50% | `exposed` | — | dense settings pages; desktop-first; mobile-first |
| floating | 27% | `balanced` | `editorial-premium` | Material-adjacent products; any field with a permanent value; where the label has nowhere to go |
| inside as placeholder only | 100% | — | — | never as the only label; — |

## Form: grouping, help and actions

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| a rule and a section title | 38% | `lines` | — | long forms |
| a card per group | 25% | `tones` | — | forms that are also records |
| a fieldset with a legend | 100% | — | — | accessibility-led; dense settings |
| an accordion, one open | 50% | `progressive` | — | long optional sections |
| always visible under the field | 50% | `exposed` | — | anything the user gets wrong |
| a tooltip on an info icon | 50% | `progressive` | — | rarely-needed detail |
| only on error | 100% | — | — | when the field is self-evident |
| in the flow, after the last field | 100% | — | — | short forms; long forms |
| a sticky footer bar | 50% | `exposed` | — | long forms; short forms; it wastes a strip of screen |
| a floating bar that appears once something changed | 50% | `progressive` | — | edit-in-place; forms that always submit |
| auto-save, no actions | 100% | — | — | notebooks; editors; anything with a confirmation step |

## Pagination and continuation

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| numbered pages | 50% | `exposed` | — | data the user returns to by position; feeds |
| previous / next | 100% | — | — | narrow screens; sequential reading; jumping around a large set |
| load more | 50% | `progressive` | — | browsing; anything the user needs to reach the end of |
| infinite scroll | 33% | `loud` | — | feeds; anything with a footer; or work that must be resumable |

## Breadcrumb

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| none | 100% | — | — | flat products; a notebook |
| integrated above the title, muted | 20% | `editorial-premium` | — | deep content |
| its own bar | 50% | `exposed` | — | deep tools |
| truncated with a menu in the middle | 100% | — | — | paths over four levels |
| replaced by a single back link on phones | 100% | — | — | multiplatform; always |

## Stepper and timeline

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| numbered steps in a row | 100% | — | — | short flows; three to five steps; more than five |
| a progress bar with a label | 50% | `exposed` | — | long flows; flows where steps are revisitable |
| vertical with a connector | 100% | — | — | recipes; instructions; histories; anything the user does not read top to bottom |
| dots only | 33% | `quiet` | — | carousels; short flows; when the steps have names worth showing |

## Avatar and identity

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| photo, circle | 100% | — | — | social; collaborative products; products where people are records; not personalities |
| initials on a neutral fill | 11% | `quiet`, `monochrome` | — | — |
| initials on a generated colour | 67% | `functional` or `brand` | `monochrome` | many users on screen |
| square or rounded-square | 100% | — | — | products whose radius is square or subtle; pill-heavy products |
| with a presence dot | 100% | — | — | real-time collaboration; anything asynchronous |

## Chart

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| one accent, everything else neutral | 33% | `monochrome` | — | a single series; comparisons between categories |
| a neutral ramp as the scale | 33% | `monochrome` | — | heatmaps; intensity; categorical data |
| a categorical palette | 67% | `functional` or `brand` | `monochrome` | — |
| sparkline, no axes | 100% | — | — | inline; in tables or cards; anything the user must read values from |
| rounded bar tops | 7% | `playful-expressive`, `loud` | `utilitarian-technical` | — |

## Carousel

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| arrows and dots | 33% | `balanced` | — | a few featured items; more than about seven items |
| a scrolling row with no controls | 33% | `quiet` | — | mobile-first; desktop-only; where scroll affordance is weak |
| a numeric indicator | 50% | `exposed` | — | long sets; short sets; where dots are clearer |
| replaced by a grid | 100% | — | — | almost always worth considering; when order carries meaning |

## Footer

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| none | 100% | — | — | tools; applications behind a login |
| one muted line | 33% | `quiet` | — | small products |
| columns of links | 100% | — | — | marketing surfaces; large products |
| a rule and legal text | 100% | — | — | anything with legal obligations |

## Grid, list or table for the same data

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| grid of cards | 100% | — | — | the image matters; browsing; comparing values across items |
| list | 100% | — | — | a title; one or two facts; mobile; more than three attributes |
| table | 100% | — | — | comparing across many attributes; phones; without a real transformation |
| switchable | 50% | `exposed` | — | when both uses are real; when it is being added to avoid a decision |

## Overlay: sheet, modal or panel

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| modal | 100% | — | — | a decision that blocks; something irreversible; anything the user needs the page to answer |
| side panel | 50% | `exposed` | — | detail beside context; narrow screens without a transformation |
| bottom sheet | 100% | — | — | mobile-first; a short set of choices; long forms |
| full-page route | 100% | — | — | long forms; anything deep-linkable; a two-field edit |
| inline expansion | 50% | `progressive` | — | edit-in-place; anything that would push content far down |

## Tooltip and popover

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| tooltip, inverted surface | 100% | — | — | short clarification; pointer devices; touch-only |
| tooltip with a keyboard shortcut | 50% | `exposed` | — | tools with shortcuts; consumer products |
| popover with real content | 50% | `progressive` | — | detail on demand; anything essential |
| no arrow | 33% | `quiet` | — | when the anchor is ambiguous |

## Navigation and header

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| plain bar, hairline below | 8% | `quiet`, `flat` | — | — |
| bar on its own rung | 38% | `elevated` or `recessed`, `2` | `flat` | — |
| floating island | 3% | `playful-expressive`, `loud` | `borders` | marketing surfaces |
| collapsing header, title moves into the bar | 100% | — | — | reading products with long pages; short pages; the motion is noise |
| icon-only rail that expands | 100% | — | — | desktop-first; dense tools; multiplatform |

## Table

Written as an axis matrix rather than a form catalogue — several decisions,
each with its own options and its own source. Listed here so its absence
from the coverage numbers is visible rather than silent.

---

## Forms the answers never narrow

These reach 95% or more of the space, which means no answer meaningfully
rules them out. That is right for a genuinely universal shape and wrong
for anything else — a form here that ought to be specific is a condition
column nobody filled in.

- Button — icon-only
- Input — prefix / suffix slot
- Card with an image — image above, no frame
- Selectable card — corner check indicator
- Badge, tag and chip — removable chip
- List and table rows — hover only, no resting treatment
- Divider — full-width hairline
- Divider — labelled ("OR", "Step 2")
- Divider — dashed
- Message and alert — inverted toast
- Checkbox, radio, switch — box or circle, accent when checked
- Checkbox, radio, switch — whole row or card selectable
- Checkbox, radio, switch — segmented control instead of radios
- Page header — stacked with metadata
- Empty state — line plus the action that fills it
- Loading — nothing, then content
- Loading — the control becomes busy in place
- Error and success — inline under the field
- Error and success — summary at the top of the form
- Error and success — toast
- Error and success — full-page state
- Error and success — silence
- Form: label position — above the field
- Form: label position — inside as placeholder only
- Form: grouping, help and actions — a fieldset with a legend
- Form: grouping, help and actions — only on error
- Form: grouping, help and actions — in the flow, after the last field
- Form: grouping, help and actions — auto-save, no actions
- Pagination and continuation — previous / next
- Breadcrumb — none
- Breadcrumb — truncated with a menu in the middle
- Breadcrumb — replaced by a single back link on phones
- Stepper and timeline — numbered steps in a row
- Stepper and timeline — vertical with a connector
- Avatar and identity — photo, circle
- Avatar and identity — square or rounded-square
- Avatar and identity — with a presence dot
- Chart — sparkline, no axes
- Carousel — replaced by a grid
- Footer — none
- Footer — columns of links
- Footer — a rule and legal text
- Grid, list or table for the same data — grid of cards
- Grid, list or table for the same data — list
- Grid, list or table for the same data — table
- Overlay: sheet, modal or panel — modal
- Overlay: sheet, modal or panel — bottom sheet
- Overlay: sheet, modal or panel — full-page route
- Tooltip and popover — tooltip, inverted surface
- Navigation and header — collapsing header, title moves into the bar
- Navigation and header — icon-only rail that expands

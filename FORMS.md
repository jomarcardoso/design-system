<!-- FORMS.md -->

# The form map

**Generated — do not edit.** `npm run docs:forms` rebuilds it from
`component-forms.md` and `layout-forms.md`.

Every form the two catalogues offer, the answers that lead to it, and how much
of the answer space it serves. It exists to answer one question: **can the
interview actually reach all of these?** `npm run verify:forms` is the
enforcement — this is the thing you read.

**Each family is measured over the answers IT reads**, not over the product of
every answer in the system. A family whose forms name `posture` and
`monochrome` cannot be made empty by the frame or the dwell, so multiplying
those out would ask the same question thousands of times for the same result.

**Reach is specificity, not quality.** A form at 20% is doing the job a
catalogue exists for. A FAMILY whose forms all sit near 100% is the warning:
it means the answers decide nothing there.

---

# Component forms

The shapes a component takes.

## Button

Over 45 combinations of 3 answers: posture, colourStrategy, archetype.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| solid fill | 67% | `balanced` or `loud` | — | any school; — |
| soft fill | 44% | `quiet` or `functional` | `monochrome` | secondary rank; where a fill is wanted rather than an outline |
| outline | 7% | `quiet`, `editorial-premium` | — | secondary at any posture; as the only primary on a dense screen |
| text / ghost | 33% | `quiet` | — | tertiary anywhere; when the action must be found without reading |
| underline-offset link-button | 7% | `editorial-premium`, `quiet` | — | anywhere a touch target is needed |
| icon-only | 100% | — | — | icons of a known set; in a repeated context (a toolbar); first-time or destructive actions; see the icon policy |
| icon expands to label on hover | 33% | `quiet` | — | desktop-first; mobile-first or multiplatform |

## Input

Over 45 combinations of 3 answers: posture, archetype, surfaceModel.

**Never both**, so choosing one rules the other out for this product:

- boxed, filled / floating label
- underline only / boxed, filled

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| boxed, filled | 22% | `recessed`, `balanced` or `loud` | `elevated` | the resting treatment every field in the product takes |
| boxed, flat | 33% | `quiet` | — | ladder runs UP; dense forms |
| underline only | 13% | `quiet`, `editorial-premium` or `tech-minimalist` | — | many fields at once; the affordance is weak |
| floating label | 27% | `balanced` | `editorial-premium` | Material-adjacent products |
| prefix / suffix slot | 100% | — | — | an addition rather than a resting treatment: fields carrying a unit; a currency or a clear affordance; when the slot would be the only recess on the page |

## Card

Over 55 combinations of 4 answers: archetype, surfaceModel, surfaceSeparation, elevation.

**Never both**, so choosing one rules the other out for this product:

- asymmetric corners / soft shadow

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| hairline, same fill | 27% | `lines` | — | when cards must be scannable at a glance in a dense grid |
| one rung lighter | 9% | `elevated`, `tones` | `recessed` | the CONTENT role |
| one rung darker (well) | 36% | `recessed` | — | grouping form fields or data; reading surfaces |
| soft shadow | 55% | `soft-shadows` or `projected-shadows` | `borders` | the CONTENT role; only where something genuinely floats |
| asymmetric corners | 20% | `playful-expressive` | — | a deliberate signature; any product whose language mentions paper; print or documents |

## Card with an image

Over 45 combinations of 3 answers: posture, archetype, surfaceSeparation.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| framed, fixed ratio | 20% | `editorial-premium` | — | anything imitating print; full-bleed layouts where the frame reads as a border |
| top-bleed | 33% | `balanced` | — | commerce; listings; — |
| full-bleed with text over | 7% | `playful-expressive`, `loud` | — | media; entertainment; any product whose metaphor is paper or print |
| split | 11% | `quiet`, `lines` | — | narrow columns |
| image above, no frame | 100% | — | — | any archetype; any posture; when the photograph's own edges are pale; the card is lighter than the page |

## Selectable card

Over 27 combinations of 3 answers: posture, colourStrategy, elevation.

**Never both**, so choosing one rules the other out for this product:

- accent border on select / tone shift on select
- accent border on select / pressed
- tone shift on select / pressed
- tone shift on select / corner check indicator
- corner check indicator / pressed

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| accent border on select | 67% | `quiet` or `balanced` | — | any school; — |
| tone shift on select | 67% | `brand` or `functional` | `monochrome` | — |
| corner check indicator | 100% | — | — | when the choice must survive a screenshot; small cards; the indicator crowds |
| pressed | 33% | `soft-shadows` | `borders` | — |

## Badge, tag and chip

Over 45 combinations of 3 answers: posture, colourStrategy, archetype.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| badge — quiet fill, muted ink | 67% | `quiet` or `balanced` | `loud` | a count or a state the system set; which fills it solid |
| badge — solid fill, inverted ink | 33% | `loud` | `quiet` | a count that must be seen from across the page |
| tag — same fill, never interactive-looking | 100% | — | — | a label the content carries rather than one anybody removes; anything the user can act on |
| chip — quiet at rest, accent when chosen | 100% | — | — | a choice the user can make then unmake; labels the system applied |
| pill with a status dot | 67% | — | `monochrome` | categories needing a colour without a coloured fill |
| outlined, monospace, uppercase | 20% | `utilitarian-technical` | — | metadata; logs; products whose guardrails forbid uppercase |
| removable chip | 100% | — | — | filters the user applied then wants back; tags the system applied |
| attached edge badge | 67% | — | `quiet` | a count that belongs to the card rather than to its content |

## Tabs

Over 45 combinations of 3 answers: posture, archetype, elevation.

**Never both**, so choosing one rules the other out for this product:

- underline / enclosed
- enclosed / segmented pill
- underline / segmented pill

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| underline | 67% | `quiet` or `balanced` | — | any school; — |
| enclosed | 11% | `borders`, `balanced` | `quiet` | — |
| segmented pill | 67% | `balanced` or `loud` | — | mobile-first; more than four options |
| weight only | 13% | `quiet`, `editorial-premium` or `tech-minimalist` | — | when the set changes often |

## List and table rows

Over 81 combinations of 4 answers: posture, colourStrategy, surfaceSeparation, density.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| whitespace only, no rules | 11% | `generous`, `quiet` | — | reading; dense data |
| hairline per row | 11% | `comfortable`, `lines` | — | — |
| zebra striping | 22% | `dense` | `quiet` | wide tables |
| row as a card | 33% | `comfortable` | — | touch targets that need to be obvious; long lists; the gaps waste the screen |
| accent bar on the selected row | 89% | — | `monochrome`, `quiet` | any school |
| hover only, no resting treatment | 100% | — | — | any density; any school; touch; where there is no hover |

## Divider

Over 45 combinations of 3 answers: posture, archetype, density.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| full-width hairline | 100% | — | — | anything |
| inset to the text column | 20% | `editorial-premium` | — | a page with a measure |
| labelled ("OR", "Step 2") | 100% | — | — | forms; sequences |
| dashed | 100% | — | — | a product whose metaphor is paper; coupons or stitching |
| whitespace only | 11% | `generous`, `quiet` | — | a page that already has enough rules |

## Message and alert

Over 18 combinations of 3 answers: posture, surfaceSeparation, statusColours.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| left border in the status colour, neutral fill | 33% | `quiet` or `balanced`, `brand-adapted` | — | the INLINE reach: a message about the thing beside it; — |
| subtle status fill | 33% | `balanced` | `quiet` | the PAGE-LEVEL reach: a banner about the whole screen |
| solid status fill | 33% | `loud` | `quiet` | the PAGE-LEVEL reach; when the state blocks work |
| border only, page fill | 11% | `quiet`, `lines` | — | when the message must interrupt |
| inverted toast | 100% | — | — | any; for transient confirmation; as the confirmation for something destructive |

## Checkbox, radio, switch

Over 3 combinations of 1 answers: posture.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| box or circle, accent when checked | 100% | — | — | anything; — |
| outline check, no fill | 33% | `quiet` | — | dense lists |
| whole row or card selectable | 100% | — | — | onboarding; plans; few large options; forms with many fields |
| segmented control instead of radios | 100% | — | — | two to four options; mobile-first; more than four |
| switch with an icon in the thumb | 67% | `loud` or `balanced` | `quiet` | a setting that takes effect immediately; never a form field submitted later |

## Page header

Over 90 combinations of 4 answers: posture, archetype, surfaceSeparation, disclosure.

**Never both**, so choosing one rules the other out for this product:

- title + rule / stacked with metadata

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| title alone | 33% | `quiet` | — | short pages; pages that need orientation |
| eyebrow + title | 20% | `editorial-premium` | — | content with taxonomy; when the eyebrow would repeat the navigation |
| title + subtitle | 33% | `balanced` | — | anything explanatory; when the subtitle is the first paragraph in disguise |
| title + rule | 7% | `editorial-premium`, `lines` | `shadows` | pages whose body begins immediately; with no metadata between |
| title + actions | 50% | `exposed` | `progressive` | tools |
| stacked with metadata | 100% | — | — | reading products; records; articles; dense tools where the metadata is a column |

## Opening / hero

Over 15 combinations of 2 answers: posture, archetype.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| none — the content starts | 33% | `quiet` | — | tools; anything the user opens repeatedly; first-visit surfaces that must explain themselves |
| typographic | 7% | `editorial-premium`, `quiet` | — | when the promise needs a picture to land |
| image with text beside it | 33% | `balanced` | — | narrow columns |
| full-bleed image with text over | 7% | `loud`, `playful-expressive` | — | marketing; any product whose metaphor is paper or print |
| one large action | 33% | `loud` | — | a product with a single job; products with several equally-weighted entry points |

## Empty state

Over 15 combinations of 2 answers: posture, archetype.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| one muted line | 33% | `quiet` | — | a list that is often empty; unremarkable; a first-run screen |
| line plus the action that fills it | 100% | — | — | most products; most of the time; — |
| illustration plus line plus action | 7% | `playful-expressive`, `loud` | `editorial-premium` or `utilitarian-technical` | onboarding; where an illustration is a costume |
| a skeleton of the thing that would be there | 33% | `quiet` | — | when emptiness is temporary; when emptiness is the normal state |

## Loading

Over 6 combinations of 2 answers: posture, disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| skeleton | 33% | `quiet` | — | layouts that are stable; known; when the shape varies wildly |
| spinner | 33% | `balanced` | — | short waits inside a control; full-page waits over one second |
| progress bar | 50% | `exposed` | — | anything measurable; when the total is unknown |
| nothing, then content | 100% | — | — | under ~200ms; anything slower; the page looks broken |
| the control becomes busy in place | 100% | — | — | when the whole region changes |

## Error and success

Over 2 combinations of 1 answers: disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| inline under the field | 100% | — | — | field validation; always; page-level failures |
| summary at the top of the form | 100% | — | — | long forms; accessibility for screen readers; short forms |
| toast | 100% | — | — | transient success; undoable actions; errors that need a decision; or anything destructive |
| inline banner in the flow | 50% | `exposed` | — | page-level errors; — |
| full-page state | 100% | — | — | a route that failed entirely; a failed section |
| silence | 100% | — | — | success that is visible in the result itself; anything the user cannot see happen |

## Form: label position

Over 30 combinations of 3 answers: posture, archetype, disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| above the field | 100% | — | — | almost always; best for scanning; for narrow screens; — |
| beside the field | 50% | `exposed` | — | dense settings pages; desktop-first; mobile-first |
| floating | 27% | `balanced` | `editorial-premium` | Material-adjacent products; any field with a permanent value; where the label has nowhere to go |

## Form: grouping, help and actions

Over 6 combinations of 2 answers: surfaceSeparation, disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| a rule and a section title | 33% | `lines` | — | long forms |
| a card per group | 33% | `tones` | — | forms that are also records |
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

Over 6 combinations of 2 answers: posture, disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| numbered pages | 50% | `exposed` | — | data the user returns to by position; feeds |
| previous / next | 100% | — | — | narrow screens; sequential reading; jumping around a large set |
| load more | 50% | `progressive` | — | browsing; anything the user needs to reach the end of |
| infinite scroll | 33% | `loud` | — | feeds; anything with a footer; or work that must be resumable |

## Breadcrumb

Over 10 combinations of 2 answers: archetype, disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| none | 100% | — | — | flat products; a notebook |
| integrated above the title, muted | 20% | `editorial-premium` | — | deep content |
| its own bar | 50% | `exposed` | — | deep tools |
| truncated with a menu in the middle | 100% | — | — | paths over four levels |
| replaced by a single back link on phones | 100% | — | — | multiplatform; always |

## Stepper and timeline

Over 6 combinations of 2 answers: posture, disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| numbered steps in a row | 100% | — | — | short flows; three to five steps; more than five |
| a progress bar with a label | 50% | `exposed` | — | long flows; flows where steps are revisitable |
| vertical with a connector | 100% | — | — | recipes; instructions; histories; anything the user does not read top to bottom |
| dots only | 33% | `quiet` | — | carousels; short flows; when the steps have names worth showing |

## Avatar and identity

Over 9 combinations of 2 answers: posture, colourStrategy.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| photo, circle | 100% | — | — | social; collaborative products; products where people are records; not personalities |
| initials on a neutral fill | 11% | `quiet`, `monochrome` | — | — |
| initials on a generated colour | 67% | `functional` or `brand` | `monochrome` | many users on screen |
| square or rounded-square | 100% | — | — | products whose radius is square or subtle; pill-heavy products |
| with a presence dot | 100% | — | — | real-time collaboration; anything asynchronous |

## Chart

Over 45 combinations of 3 answers: posture, colourStrategy, archetype.

**Never both**, so choosing one rules the other out for this product:

- a categorical palette / one accent, everything else neutral

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| one accent, everything else neutral | 33% | `monochrome` | — | a single series; comparisons between categories |
| a neutral ramp as the scale | 33% | `monochrome` | — | heatmaps; intensity; categorical data |
| a categorical palette | 67% | `functional` or `brand` | `monochrome` | series that are unordered kinds rather than degrees |
| sparkline, no axes | 100% | — | — | inline; in tables or cards; anything the user must read values from |
| rounded bar tops | 7% | `playful-expressive`, `loud` | `utilitarian-technical` | a detail rather than a chart type: bar charts; only where the value is read as approximate |

## Carousel

Over 6 combinations of 2 answers: posture, disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| arrows and dots | 33% | `balanced` | — | a few featured items; more than about seven items |
| a scrolling row with no controls | 33% | `quiet` | — | mobile-first; desktop-only; where scroll affordance is weak |
| a numeric indicator | 50% | `exposed` | — | long sets; short sets; where dots are clearer |
| replaced by a grid | 100% | — | — | almost always worth considering; when order carries meaning |

## Footer

Over 3 combinations of 1 answers: posture.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| none | 100% | — | — | tools; applications behind a login |
| one muted line | 33% | `quiet` | — | small products |
| columns of links | 100% | — | — | marketing surfaces; large products |
| a rule and legal text | 100% | — | — | anything with legal obligations |

## Grid, list or table for the same data

Over 2 combinations of 1 answers: disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| grid of cards | 100% | — | — | the image matters; browsing; comparing values across items |
| list | 100% | — | — | a title; one or two facts; mobile; more than three attributes |
| table | 100% | — | — | comparing across many attributes; phones; without a real transformation |
| switchable | 50% | `exposed` | — | when both uses are real; when it is being added to avoid a decision |

## Overlay: sheet, modal or panel

Over 2 combinations of 1 answers: disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| modal | 100% | — | — | a decision that blocks; something irreversible; anything the user needs the page to answer |
| side panel | 50% | `exposed` | — | detail beside context; narrow screens without a transformation |
| bottom sheet | 100% | — | — | mobile-first; a short set of choices; long forms |
| full-page route | 100% | — | — | long forms; anything deep-linkable; a two-field edit |
| inline expansion | 50% | `progressive` | — | edit-in-place; anything that would push content far down |

## Tooltip and popover

Over 6 combinations of 2 answers: posture, disclosure.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| tooltip, inverted surface | 100% | — | — | short clarification; pointer devices; touch-only |
| tooltip with a keyboard shortcut | 50% | `exposed` | — | tools with shortcuts; consumer products |
| popover with real content | 50% | `progressive` | — | detail on demand; anything essential |
| no arrow | 33% | `quiet` | — | when the anchor is ambiguous |

## Navigation and header

Over 270 combinations of 5 answers: posture, archetype, surfaceModel, elevation, ladderSpend.

**Never both**, so choosing one rules the other out for this product:

- bar on its own rung / floating island

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| plain bar, hairline below | 11% | `quiet`, `flat` | — | — |
| bar on its own rung | 33% | `elevated` or `recessed`, `2` | `flat` | products whose navigation stays visible while the content scrolls under it |
| floating island | 4% | `playful-expressive`, `loud` | `borders` | marketing surfaces |
| collapsing header, title moves into the bar | 100% | — | — | reading products with long pages; short pages; the motion is noise |
| icon-only rail that expands | 100% | — | — | desktop-first; dense tools; multiplatform |

---

# Layout forms

The shapes a page takes. A page has fewer legitimate variants than a component, so a layout family carrying one universal fallback and three specific forms is the expected shape here — not a sign of a weak table.

## Index — how a set of things is presented

Over 1080 combinations of 6 answers: archetype, density, disclosure, frame, protagonist, imagery.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| feed | 8% | `single-column`, `user-content` | — | items with no natural order the user chooses; sets the user searches rather than browses |
| grid of cards | 8% | `content`, `product-content` | — | browsing; items whose distinguishing information is text-heavy |
| list with a leading thumbnail | 11% | `supporting`, `dense` | — | phones; items whose image IS the decision |
| table | 3% | `tools`, `dense`, `exposed` | `content` | phones as the primary target |
| sectioned index | 20% | `editorial-premium` | — | a set with a real taxonomy; sets that grow without bound |
| plain list | 100% | — | — | anything; sets whose image or whose comparable columns are the reason to look |

## Detail — how one thing is opened

Over 72 combinations of 4 answers: density, disclosure, frame, protagonist.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| its own page | 100% | — | — | anything; comparing items side by side |
| master–detail | 8% | `app-frame` or `content-aside`, `tools`, `exposed` | — | phones; long-form reading |
| side panel over the index | 17% | `content-aside`, `progressive` | — | triage; review work; content long enough to need its own scroll; header |
| inline expansion | 17% | `dense`, `progressive` | — | short detail; detail with its own actions; sub-navigation |
| overlay | 50% | `progressive` | — | a quick look that returns; anything the user links to or shares |

## Navigation placement

Over 1215 combinations of 6 answers: posture, archetype, density, frame, dwell, platform.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| top bar | 100% | — | — | anything; deep hierarchies |
| side rail, labelled | 67% | `app-frame` or `content-aside` | `single-column` | products with three destinations |
| side rail, icons only | 2% | `app-frame`, `dense`, `hours` | `mobile-first` | sets the user visits rarely |
| bottom bar | 33% | `mobile-first` | `desktop-first` | three to five destinations; more than five |
| none — the content is the navigation | 2% | `single-column`, `quiet`, `editorial-premium` | — | products with tasks rather than reading |

## Header behaviour

Over 216 combinations of 5 answers: disclosure, frame, protagonist, dwell, platform.

**Never both**, so choosing one rules the other out for this product:

- sticky, full height / sticky, condensed after the first screen
- sticky, full height / none
- static, scrolls away / sticky, full height

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| static, scrolls away | 100% | — | — | anything; pages whose primary action lives in it |
| sticky, full height | 8% | `exposed`, `tools` | `mobile-first` | headers carrying an action or a filter the user needs while scrolling |
| sticky, condensed after the first screen | 33% | `hours` | — | long pages; short pages; where it never condenses; reads as a bug |
| none | 33% | `app-frame` | — | where the rail carries identity; products a user arrives at from outside |

## The aside

Only when `content-aside` or `app-frame`.

Over 36 combinations of 4 answers: disclosure, frame, dwell, platform.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| persistent panel | 100% | `content-aside` or `app-frame` | — | phones; where it has nowhere to go |
| collapsible rail | 17% | `app-frame`, `hours` | — | products where its content is needed continuously |
| a sheet on demand | 17% | `progressive`, `mobile-first` | — | filters the user adjusts repeatedly |
| the aside becomes a section | 33% | `multiplatform` | — | asides carrying navigation; which must stay reachable |

## Form pages

Over 72 combinations of 4 answers: density, disclosure, protagonist, platform.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| one column | 67% | `mobile-first` or `multiplatform` | — | anything a user completes once; long settings pages with many independent fields |
| two columns | 11% | `desktop-first`, `dense` | — | data entry by someone trained; anything a first-time user fills in |
| sectioned, one page | 50% | `exposed` | — | forms of ten to forty fields; flows with branching |
| wizard | 50% | `progressive` | — | branching; a user who does this once; anything the user returns to; edits |
| inline edit in place | 13% | `user-content`, `progressive` | — | anything needing validation across several fields at once |

## Reading pages

Over 3240 combinations of 7 answers: archetype, density, disclosure, frame, protagonist, dwell, platform.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| one measure, centred | 100% | — | — | anything; reference material scanned rather than read |
| measure with a margin column | 2% | `editorial-premium`, `content-aside`, `desktop-first` | `mobile-first` | where the margin has nowhere to be |
| measure with a table of contents | 17% | `hours`, `exposed` | — | documentation; anything under about two screens |
| full width, no measure | 8% | `tools`, `dense` | — | anything anyone reads in sentences |

## Dashboard and overview pages

Over 36 combinations of 3 answers: posture, protagonist, dwell.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| one big, several small | 8% | `tools`, `balanced` | — | a screen with one real question; screens where every metric matters equally |
| an even grid of tiles | 100% | — | — | anything; when the user actually has a primary question |
| sections of related metrics | 33% | `hours` | — | many metrics; fewer than about six |
| a single number | 11% | `quiet`, `seconds` | — | a status screen; anything requiring a decision |

## Search and filter placement

Over 54 combinations of 4 answers: posture, disclosure, frame, platform.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| a field in the header | 100% | — | — | anything; products where filters matter more than the query |
| a left rail of filters | 6% | `content-aside`, `exposed`, `desktop-first` | — | phones; three or fewer filters |
| chips above the results | 17% | `progressive`, `mobile-first` | — | few filters; more than about eight |
| a modal or sheet | 17% | `mobile-first`, `progressive` | — | many filters; filters the user adjusts repeatedly while reading results |
| none — the set is small enough | 33% | `quiet` | — | sets a person can see all of; anything that grows |

## Settings and account pages

Over 648 combinations of 6 answers: posture, disclosure, frame, protagonist, dwell, platform.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| one long page with headings | 100% | — | — | anything; products with genuinely separate domains |
| tabs across the top | 22% | `balanced` | `mobile-first` | three to six groups |
| a side rail of sections | 17% | `app-frame`, `exposed` | `single-column` | many groups |
| search-first | 8% | `hours`, `tools` | — | very many settings; small products; where it reads as evasion |

## Workspace and canvas pages

Only when `tools`.

Over 6 combinations of 3 answers: protagonist, platform, colorCriticalWorkspace.

**Never both**, so choosing one rules the other out for this product:

- docked panels, resizable / floating panels
- docked panels, resizable / tool bar plus full-bleed canvas
- chrome around a lit viewport / docked panels, resizable

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| chrome around a lit viewport | 50% | `true`, `tools` | — | anything where the chrome IS the product |
| docked panels, resizable | 33% | `mobile-first` | — | — |
| floating panels | 100% | `tools` | — | expert users who arrange once; first-time users; anything on a phone |
| tool bar plus full-bleed canvas | 100% | — | — | anything; tools with many simultaneous options |

## First run and empty products

Over 72 combinations of 4 answers: posture, disclosure, protagonist, imagery.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| the empty state carries it | 100% | — | — | anything; products needing configuration before they work |
| a checklist of first steps | 13% | `exposed`, `tools` | — | setup with real prerequisites; products a user can simply start using |
| a tour over the real interface | 67% | `loud` or `balanced` | — | genuinely novel interactions; interfaces a user can work out by looking |
| sample content, marked as sample | 8% | `product-content`, `content` | — | anything where sample data could be mistaken for real |

## Error and offline pages

Over 18 combinations of 3 answers: posture, disclosure, frame.

| form | reach | led to by | ruled out by | content it needs |
|---|---|---|---|---|
| in place, the rest of the page intact | 50% | `progressive` | — | a failure affecting one region; failures that make the whole page wrong |
| full page with a way back | 33% | `single-column` | — | routing; permission failures; recoverable failures; where it loses the user's context |
| a banner above the content | 50% | `exposed` | — | degraded but usable states; hard failures; where it understates |
| retry in place, no message | 33% | `quiet` | — | transient network failures; anything the user needs to know about |

---

## Forms no answer narrows

These reach every combination their family is measured over, which means no
answer rules them out. That is right for a genuinely universal shape, and
right for the fallback every layout family needs — a page always has SOME
shape. It is wrong for anything that ought to be specific, where it means a
condition column nobody filled in.

- Button — icon-only
- Input — prefix / suffix slot
- Card with an image — image above, no frame
- Selectable card — corner check indicator
- Badge, tag and chip — tag — same fill, never interactive-looking
- Badge, tag and chip — chip — quiet at rest, accent when chosen
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
- Index — how a set of things is presented — plain list
- Detail — how one thing is opened — its own page
- Navigation placement — top bar
- Header behaviour — static, scrolls away
- The aside — persistent panel
- Reading pages — one measure, centred
- Dashboard and overview pages — an even grid of tiles
- Search and filter placement — a field in the header
- Settings and account pages — one long page with headings
- Workspace and canvas pages — floating panels
- Workspace and canvas pages — tool bar plus full-bleed canvas
- First run and empty products — the empty state carries it

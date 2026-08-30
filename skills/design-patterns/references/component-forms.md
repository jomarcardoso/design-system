<!-- skills/design-patterns/references/component-forms.md -->

# Component forms — the shapes a decision can take

A library ships one shape per component and a product needs the shape its
design language implies. Between those two sits this file: **thirty component
families**, the forms each one takes in the wild, and the answers under which
each form fits.

The order is not alphabetical. The controls come first because they are asked
for most; the families that carry the most IDENTITY — the page header, the
opening, the table, the empty state — come after, and they are the ones a
product is most likely to take from the library without noticing.

It is the second half of [`derivations.md`](../../design-language/references/derivations.md).
That file decides the *properties* — fill, ink, edge weight, how far the accent
travels. This one decides the *form* — whether a tab is underlined or boxed,
whether a photo bleeds or sits in a frame, whether a checkbox is a box or a
whole card.

---

## How to use it

**Nothing here is banned.** The conditions describe FIT, not permission. A form
marked "avoid when" is reachable by a client who wants it — it becomes a
deviation with a reason, exactly like an archetype deviation. The rule from the
notes that produced this file: *every form must be reachable if the answers lead
there.*

**Several forms of one family can coexist.** A product may want a plain checkbox
in a form and a selectable card in an onboarding step. That is two entries in
the ledger, not a contradiction — say which context each belongs to.

**Propose one, name the alternatives.** Derive the fitting form, show it, and say
what else is available and what it would change. A client who wanted something
else says so in one exchange.

**The library may not reach it.** When a form is chosen that the library cannot
express, record it in `patterns.json` as a pending implementation with the
reason. **A pending entry is acceptable; an omission is not.** Silence looks like
the form was never wanted.

### The names

Where a form has a real industry name it is used. Where it does not, the label
is descriptive and **provisional** — several were coined during research and are
not vocabulary anyone else uses. Treat them as handles for a shape, and do not
put them in a client-facing document as if they were terms of art.

---

## Button

| form | what it is | fits when | avoid when |
|---|---|---|---|
| solid fill | the library default | `posture: balanced` or `loud`; any school | — |
| soft fill | accent at a subtle step, accent ink | `posture: quiet` with `brand` or `functional` | `monochrome` — the tint reads as a selection |
| outline | border and ink, no fill | secondary at any posture; primary only in `quiet` + Editorial | as the only primary on a dense screen |
| text / ghost | no fill, no border | tertiary anywhere; secondary in `quiet` | when the action must be found without reading |
| underline-offset link-button | serif text, offset underline on hover | Editorial + `quiet` | anywhere a touch target is needed — the hit area is the text |
| icon-only | glyph, no label | icons of a known set, in a repeated context (a toolbar) | first-time or destructive actions; see the icon policy |
| icon expands to label on hover | collapsed until pointed at | desktop-first + `quiet` | mobile-first or multiplatform — hover does not exist |

**One primary per screen** holds across every form and every school. It is the
rule most often broken by an ad-hoc page.

## Input

| form | what it is | fits when | avoid when |
|---|---|---|---|
| boxed, filled | border plus a recessed fill | ladder runs DOWN (13d = B); `balanced` or `loud` | ladder runs UP — the recess fights the surface above it |
| boxed, flat | border only, same fill as its container | ladder runs UP; `quiet` | dense forms — the fields stop being findable |
| underline only | a rule under the field | `quiet` + Editorial or Tech Minimalist | many fields at once; the affordance is weak |
| floating label | label starts inside, rises on focus | `balanced`; Material-adjacent products | Editorial — the motion reads as a different product |
| prefix / suffix slot | a unit or icon in its own recess | any, where the field has a unit | when the slot would be the only recess on the page |

**The input is where "pure white" gets in.** Whatever form is chosen, the field's
fill is a step of the product's ramp. A white field on a paper page is the
library's default surviving, not a decision.

## Card

| form | what it is | fits when | avoid when |
|---|---|---|---|
| hairline, same fill | separated by a rule only | `surfaceSeparation: lines`; `quiet` | when cards must be scannable at a glance in a dense grid |
| one rung lighter | tone carries it, no rule | ladder runs UP; `tones` | `elevation: borders` with the ladder running down |
| one rung darker (well) | recessed container | ladder runs DOWN; grouping form fields or data | reading surfaces — a recessed article reads as secondary |
| soft shadow | the library default | `elevation: soft-shadows` | `elevation: borders`; it is the decision spent twice |
| asymmetric corners | rounded on one diagonal | Playful; a deliberate signature | any product whose language mentions paper, print or documents |

## Card with an image

The family the notes singled out, because the wrong choice is loud and common.

| form | what it is | fits when | avoid when |
|---|---|---|---|
| framed, fixed ratio | photo inside a neutral margin at 4:3 or 16:9 | Editorial; anything imitating print | full-bleed layouts where the frame reads as a border |
| top-bleed | photo fills the card's top edge to edge | `balanced`; commerce and listings | — |
| full-bleed with text over | text sits on the photo, over a scrim or gradient | Playful; `loud`; media and entertainment | **any product whose metaphor is paper or print** |
| split | image one side, text the other, one rule between | `quiet`; `lines` | narrow columns |

**The full-bleed-with-text form is the worked example of a form ruling itself
out.** A product described as a notebook has no such object: nothing in a
notebook has text printed over a photograph. The archetype does not forbid it
and neither does the school — the answer to question 1 does, and that is the
kind of inference this file exists to make explicit rather than leave to taste.

## Selectable card

| form | what it is | fits when | avoid when |
|---|---|---|---|
| accent border on select | border becomes the accent | any school; `quiet` and `balanced` | — |
| tone shift on select | surface moves to `bg-accent-subtle` | `brand`, `functional` | `monochrome` at `quiet` — spends the accent on a container |
| corner check indicator | a mark appears in a corner | when the choice must survive a screenshot | small cards; the indicator crowds |
| pressed | shadow removed on select, card sits flat | `elevation: soft-shadows` only | `borders` — there is no shadow to remove |

## Badge, tag and chip

Three different jobs that libraries ship as one class.

| | what it is | form |
|---|---|---|
| **badge** | a count or a state, read-only | quiet fill, muted ink (see `derivations.md` §A) |
| **tag** | a label describing the thing, read-only | same fill; never interactive-looking |
| **chip** | a filter or a choice, interactive | quiet fill at rest, accent-subtle when selected |

| form | fits when | avoid when |
|---|---|---|
| pill with a status dot | categories that need a colour without a coloured fill | `monochrome` — the dot is a second colour |
| outlined, monospace, uppercase | Utilitarian; metadata and logs | products whose guardrails forbid uppercase |
| removable chip | filters the user applied | tags the system applied — nothing to remove |
| attached edge badge | a tab pinned to a card's edge | `quiet` — it is a loud shape |

**A read-only label must not look pressable.** The commonest failure in this
family, and what a solid fill causes.

## Tabs

| form | what it is | fits when | avoid when |
|---|---|---|---|
| underline | active tab gets a rule in the accent | any school; `quiet` and `balanced` | — |
| enclosed | active tab is a surface with a border | `elevation: borders`; `balanced` | `quiet` Editorial — it is a heavy shape |
| segmented pill | all tabs in one neutral track, active one a pill | `balanced`, `loud`; mobile-first | more than four options |
| weight only | no line, no fill; active is heavier ink | `quiet` + Editorial or Tech Minimalist | when the set changes often — the affordance is subtle |

**Tabs are a desktop shape.** On a phone they sit where the header already is.
Whatever form is chosen, record what happens below the tablet breakpoint —
usually stacked sections, an accordion, or a select.

## List and table rows

| form | fits when | avoid when |
|---|---|---|
| whitespace only, no rules | `generous` density; `quiet`; reading | dense data — the eye loses the row |
| hairline per row | `comfortable`; `lines` | — |
| zebra striping | `dense`; wide tables | `quiet` — the alternation is a second surface level |
| row as a card | `comfortable`; touch targets that need to be obvious | long lists; the gaps waste the screen |
| accent bar on the selected row | any school | `monochrome` at `quiet`, unless selection is rare |

## Divider

| form | fits when |
|---|---|
| full-width hairline | anything |
| inset to the text column | Editorial; a page with a measure |
| labelled ("OR", "Step 2") | forms and sequences |
| dashed | a product whose metaphor is paper, coupons or stitching |
| whitespace only | `generous` + `quiet`; a page that already has enough rules |

## Message and alert

| form | fits when | avoid when |
|---|---|---|
| left border in the status colour, neutral fill | `quiet`, `balanced`; `statusColours: brand-adapted` | — |
| subtle status fill | `balanced` | `quiet` on a page where the fill would be the largest colour area |
| solid status fill | `loud` | `quiet` — a warning should not be the loudest thing on a calm page |
| border only, page fill | `quiet`; `lines` | when the message must interrupt |
| inverted toast | any, for transient confirmation | as the confirmation for something destructive |

## Checkbox, radio, switch

| form | fits when | avoid when |
|---|---|---|
| box or circle, accent when checked | anything | — |
| outline check, no fill | `quiet` | dense lists — the checked state is hard to scan |
| whole row or card selectable | onboarding, plans, few large options | forms with many fields |
| segmented control instead of radios | two to four options, mobile-first | more than four |
| switch with an icon in the thumb | `loud`, `balanced` | `quiet` — the icon is decoration |

Coexistence is normal here: a plain checkbox in a form and a selectable card in
a chooser are two entries, not a contradiction.

## Page header

**The first thing anyone sees and the most copied from the library.** A product
that takes the library's `h1` and nothing else has already announced which
library it is.

| form | what it is | fits when | avoid when |
|---|---|---|---|
| title alone | one heading, nothing around it | `quiet`; short pages | pages that need orientation |
| eyebrow + title | a small category line above the title | Editorial; content with taxonomy | when the eyebrow would repeat the navigation |
| title + subtitle | a supporting sentence under it | `balanced`; anything explanatory | when the subtitle is the first paragraph in disguise |
| title + rule | a hairline the width of the measure, under the title | Editorial; `lines` | `shadows` — the rule is a second separation |
| title + actions | the page's actions on the same line, right-aligned | `exposed`; tools | `progressive` — the actions belong near what they act on |
| stacked with metadata | title, then a muted line of facts | reading products, records, articles | dense tools where the metadata is a column |

The **eyebrow** is the cheapest identity in this list and the most ignored: a
small muted line above the title, optionally with a rule or a dot. It costs one
element and it is the difference between a page and a document.

## Opening / hero

| form | fits when | avoid when |
|---|---|---|
| none — the content starts | `quiet`; tools; anything the user opens repeatedly | first-visit surfaces that must explain themselves |
| typographic | Editorial; `quiet` | when the promise needs a picture to land |
| image with text beside it | `balanced` | narrow columns |
| full-bleed image with text over | `loud`; Playful; marketing | **any product whose metaphor is paper or print** |
| one large action | `loud`; a product with a single job | products with several equally-weighted entry points |

## Table

Split out from the row treatments above, because a table is several decisions
and the library ships one answer for all of them.

| axis | options | derived from |
|---|---|---|
| separation | none · horizontal hairlines · zebra · full grid | `posture`, `density`, `surfaceSeparation` |
| density | comfortable rows · compact · both, switchable | Q5 |
| header | plain · sticky · a tone rung · uppercase micro-label | `disclosure`, `posture` |
| row actions | always visible · on hover · on select · overflow menu | `disclosure` |
| sorting | click the header · an explicit control · none | `exposed` vs `progressive` |
| selection | none · checkbox column · whole-row click | whether bulk actions exist |
| first column | plain · pinned · the row's identity in bold | width and `density` |
| totals | a footer row · above the table · none | — |
| empty | a row saying so · the table disappears with a message | see empty states |

**A full grid of rules is almost never the answer.** Vertical rules are the
first thing to remove and the last thing anyone removes; alignment does the same
job silently.

## Empty state

| form | fits when | avoid when |
|---|---|---|
| one muted line | `quiet`; a list that is often empty and unremarkable | a first-run screen — the user needs to know what goes here |
| line plus the action that fills it | most products, most of the time | — |
| illustration plus line plus action | Playful; onboarding; `loud` | Editorial and Utilitarian, where an illustration is a costume |
| a skeleton of the thing that would be there | `quiet`; when emptiness is temporary | when emptiness is the normal state — it promises something that is not coming |

**The empty state is where a product's voice is most audible**, because there is
nothing else on the screen. It is worth writing rather than defaulting.

## Loading

The clearest case of a form derived from posture rather than taste.

| form | what it says | fits when | avoid when |
|---|---|---|---|
| skeleton | "this shape is coming" | `quiet`; layouts that are stable and known | when the shape varies wildly |
| spinner | "wait" | `balanced`; short waits inside a control | full-page waits over one second |
| progress bar | "this much is done" | `exposed`; anything measurable | when the total is unknown — a fake bar is a lie |
| nothing, then content | "it was fast" | under ~200ms | anything slower; the page looks broken |
| the control becomes busy in place | inline actions | when the whole region changes |

**Never two at once.** A skeleton inside a page that also has a spinner tells the
user two different things about the same wait.

## Error and success

| form | fits when | avoid when |
|---|---|---|
| inline under the field | field validation, always | page-level failures |
| summary at the top of the form | long forms; accessibility for screen readers | short forms — it duplicates |
| toast | transient success, undoable actions | errors that need a decision, or anything destructive |
| inline banner in the flow | page-level errors, `exposed` | — |
| full-page state | a route that failed entirely | a failed section |
| silence | success that is visible in the result itself | anything the user cannot see happen |

**Success that is visible needs no message.** A saved recipe that appears in the
list has already reported itself; a toast on top of it is the interface talking
about itself.

## Form: label position

| form | fits when | avoid when |
|---|---|---|
| above the field | almost always; best for scanning and for narrow screens | — |
| beside the field | `exposed`; dense settings pages; desktop-first | mobile-first |
| floating | `balanced`; Material-adjacent products | Editorial; and any field with a permanent value, where the label has nowhere to go |
| inside as placeholder only | never as the only label | — |

**Placeholder-as-label fails the moment someone types.** It is in the list so
that choosing it is a decision rather than an accident.

## Form: grouping, help and actions

| grouping | fits when |
|---|---|
| a rule and a section title | `lines`; long forms |
| a card per group | `tones`; forms that are also records |
| a fieldset with a legend | accessibility-led, dense settings |
| an accordion, one open | `progressive`; long optional sections |

| help text | fits when |
|---|---|
| always visible under the field | `exposed`; anything the user gets wrong |
| a tooltip on an info icon | `progressive`; rarely-needed detail |
| only on error | when the field is self-evident |

| form actions | fits when | avoid when |
|---|---|---|
| in the flow, after the last field | short forms | long forms — the button is below the fold |
| a sticky footer bar | long forms; `exposed` | short forms; it wastes a strip of screen |
| a floating bar that appears once something changed | `progressive`; edit-in-place | forms that always submit |
| auto-save, no actions | notebooks and editors | anything with a confirmation step |

## Pagination and continuation

Each of these is a `disclosure` decision wearing a component.

| form | fits when | avoid when |
|---|---|---|
| numbered pages | `exposed`; data the user returns to by position | feeds |
| previous / next | narrow screens; sequential reading | jumping around a large set |
| load more | `progressive`; browsing | anything the user needs to reach the end of |
| infinite scroll | feeds; `loud` consumer products | anything with a footer, or work that must be resumable |

## Breadcrumb

| form | fits when |
|---|---|
| none | flat products; a notebook |
| integrated above the title, muted | Editorial; deep content |
| its own bar | `exposed`; deep tools |
| truncated with a menu in the middle | paths over four levels |
| replaced by a single back link on phones | multiplatform, always |

## Stepper and timeline

| form | fits when | avoid when |
|---|---|---|
| numbered steps in a row | short flows, three to five steps | more than five — the row wraps and loses its shape |
| a progress bar with a label | `exposed`; long flows | flows where steps are revisitable |
| vertical with a connector | recipes, instructions, histories | anything the user does not read top to bottom |
| dots only | `quiet`; carousels and short flows | when the steps have names worth showing |

The **vertical connector** is worth naming for instructional products: a line
joining the markers turns a list into a sequence, and it costs one border.

## Avatar and identity

| form | fits when | avoid when |
|---|---|---|
| photo, circle | social and collaborative products | products where people are records, not personalities |
| initials on a neutral fill | `quiet`; `monochrome` | — |
| initials on a generated colour | `functional`, `brand`; many users on screen | `monochrome` — it is a second palette by the back door |
| square or rounded-square | products whose radius is square or subtle | pill-heavy products |
| with a presence dot | real-time collaboration | anything asynchronous |

## Chart

| form | fits when | avoid when |
|---|---|---|
| one accent, everything else neutral | `monochrome`; a single series | comparisons between categories |
| a neutral ramp as the scale | `monochrome`; heatmaps, intensity | categorical data — steps imply order |
| a categorical palette | `functional`, `brand` | `monochrome` — this is the school's real tension |
| sparkline, no axes | inline, in tables or cards | anything the user must read values from |
| rounded bar tops | Playful; `loud` | Utilitarian — it costs precision at small sizes |

**`monochrome` and categorical data is a genuine conflict**, not a preference.
Categories need distinguishable hues and the school has one. The softening moves
are in `conflicts.md`: a neutral ramp when the data is ordered, an admitted
chart palette held outside the interface tokens, or accepting that comparisons
happen in a table.

## Carousel

| form | fits when | avoid when |
|---|---|---|
| arrows and dots | `balanced`; a few featured items | more than about seven items |
| a scrolling row with no controls | mobile-first; `quiet` | desktop-only, where scroll affordance is weak |
| a numeric indicator | `exposed`; long sets | short sets, where dots are clearer |
| replaced by a grid | almost always worth considering | when order carries meaning |

## Footer

| form | fits when |
|---|---|
| none | tools and applications behind a login |
| one muted line | `quiet`; small products |
| columns of links | marketing surfaces; large products |
| a rule and legal text | anything with legal obligations |

## Grid, list or table for the same data

One collection, three forms, and the choice is usually made by habit.

| form | fits when | avoid when |
|---|---|---|
| grid of cards | the image matters; browsing | comparing values across items |
| list | a title and one or two facts; mobile | more than three attributes |
| table | comparing across many attributes | phones, without a real transformation |
| switchable | `exposed`; when both uses are real | when it is being added to avoid a decision |

## Overlay: sheet, modal or panel

| form | fits when | avoid when |
|---|---|---|
| modal | a decision that blocks; something irreversible | anything the user needs the page to answer |
| side panel | detail beside context; `exposed` | narrow screens without a transformation |
| bottom sheet | mobile-first; a short set of choices | long forms |
| full-page route | long forms; anything deep-linkable | a two-field edit |
| inline expansion | `progressive`; edit-in-place | anything that would push content far down |

## Tooltip and popover

| form | fits when | avoid when |
|---|---|---|
| tooltip, inverted surface | short clarification, pointer devices | touch-only — there is no hover |
| tooltip with a keyboard shortcut | `exposed`; tools with shortcuts | consumer products |
| popover with real content | `progressive`; detail on demand | anything essential — a popover is not discoverable |
| no arrow | `quiet` | when the anchor is ambiguous |

**Nothing essential lives in a tooltip.** It is the rule most often broken and
the one that fails hardest on touch.

## Navigation and header

| form | fits when | avoid when |
|---|---|---|
| plain bar, hairline below | `quiet`; one-surface layouts (13c = A) | — |
| bar on its own rung | two-surface layouts (13c = B) | one-surface layouts |
| floating island | Playful; `loud`; marketing surfaces | `elevation: borders` — the island needs a shadow |
| collapsing header, title moves into the bar | reading products with long pages | short pages; the motion is noise |
| icon-only rail that expands | desktop-first; dense tools | multiplatform — hover does not exist on touch |

---

## What this file does not decide

**Anatomy inside a component** — where the close button sits in a modal, what
order the parts come in. That is the component's own specification, and for
anything the library ships it is the library's answer.

**Whether the product needs the component at all.** That is the ledger's job,
and the measure there is the allowed list getting shorter.

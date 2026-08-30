<!-- skills/design-patterns/references/component-forms.md -->

# Component forms — the shapes a decision can take

A library ships one shape per component and a product needs the shape its
design language implies. Between those two sits this file: for each component
family, the forms that exist in the wild, and **the answers under which each one
fits**.

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

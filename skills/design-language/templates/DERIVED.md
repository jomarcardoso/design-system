<!-- skills/design-language/templates/DERIVED.md -->

# What these answers decided — {{PRODUCT}}

**Regenerate this when an answer changes.** It is derived, not authored: every
line traces to an answer in `DESIGN_LANGUAGE.md` and a table in
`skills/design-language/references/derivations.md`. Editing it by hand puts a
decision here that the derivation does not know about, and the next
regeneration silently deletes it.

Three documents, three jobs:

| | holds |
|---|---|
| `DESIGN_LANGUAGE.md` | the decisions, and why they were made |
| **this file** | what those decisions produced, and which answer produced each |
| `FOUNDATIONS.md` | the values the build compiled to |

---

## 1. What this looks like, in a paragraph

{{Three or four sentences a person could read aloud to a stakeholder. Not a
list — the shape of the product as these answers made it. Name the two or three
answers doing the most work, and what a screen looks like because of them.}}

> Example of the register: *"A calm page on warm paper, where the only colour is
> one ink-blue and everything else is a step on the paper ramp. Titles are serif
> and generously spaced; a label is a quiet chip rather than a small dark
> button; there is one action per screen and it is the only saturated thing on
> it. Nothing is hidden behind an icon."*

## 2. What was derived

Every row names the answer that produced it. A row with no provenance is a
guess that got in.

### Quiet elements

| decision | value | from |
|---|---|---|
| badge and tag fill | {{token}} | {{posture, archetype}} |
| badge and tag ink | {{token}} | {{…}} |
| selected chip | {{…}} | {{…}} |
| secondary action | {{…}} | {{secondaryAction, posture}} |
| tertiary / ghost | {{…}} | {{…}} |

### Shape and icons — derived, never asked

These two used to be questions and were the two most likely to collect taste.
They still reach the client here, with their provenance, as something to
disagree with.

| decision | value | from |
|---|---|---|
| `radius-control` / `radius-surface` | {{…}} | {{archetype}}, {{± posture, ± surfaceModel}} |
| pills | {{never}} | {{archetype}} |
| `iconStyle` | {{outline}} | {{archetype}} |
| `iconStroke` | {{…}} | {{archetype}}, set against the body weight |
| `iconSize` | {{…}} | {{archetype}} |

### Surfaces, inputs and lines

| decision | value | from |
|---|---|---|
| `surfaceModel` | {{flat \| elevated \| recessed}} | {{protagonist, dwell}} |
| `surfaceSeparation` | {{lines}} | {{elevationCarrier}} |
| rungs the layout spends | {{2}} | {{surfaceModel, the frame}} |
| input at rest | {{…}} | {{surfaceModel, posture}} |
| card separation | {{…}} | {{surfaceSeparation}} |
| `border-divider` | {{token}} | {{elevationCarrier}} |
| `border-interactive` | {{token}} | {{elevationCarrier, posture}} |
| where the divider disappears | {{…}} | {{surfaceModel}} — a tone difference already draws the line |
| modal surface | {{…}} | {{ladderSpend}} |
| what may be elevated at once | one permanent, one temporary | always |
| the same model in dark | {{…}} | {{surfaceModel}} — see derivations.md T |

### Type and rhythm

| decision | value | from |
|---|---|---|
| scale ratio | {{…}} | {{archetype, density}} |
| heading face scope | {{…}} | {{archetype}} |
| control weight | {{…}} | {{posture}} |
| related / unrelated / section | {{…}} | {{density}} |

### Images

Delete this block when `imagery: none`, and say in section 5 that the product
declared it has no photography — an absent block reads as forgotten.

| decision | value | from |
|---|---|---|
| `ratio-media` | {{…}} | {{imageRatio}} |
| `radius-image` | {{token}} | {{imagery}} |
| edge treatment | {{inset hairline \| none}} | {{imagery, surfaceDirection}} |
| shadow | {{…}} | {{elevationCarrier}} |
| decorative images | {{allowed \| not allowed}} | {{archetype}} |
| before it loads | {{reserved box + empty state}} | {{imagery}} |

### Grid and columns

| decision | value | from |
|---|---|---|
| columns | {{none \| 12}} | {{frame}} |
| `gap-grid` | {{token}} | {{frame, density}} |
| `size-measure` | {{68ch}} | {{archetype, frame}} |
| where the grid stops | {{…}} | {{platform}} |
| density per breakpoint | {{unchanged}} | {{platform, frame}} |

**Breakpoints are the library's**, compiled in `<library>-entry.scss`. Name the
values here so the next reader does not go looking for a token that cannot
exist.

### Motion

| decision | value | from |
|---|---|---|
| what moves | {{colour and opacity only}} | {{posture}} |
| state feedback | {{`duration-fast`}} | {{posture}} |
| disclosure | {{…}} | {{posture, disclosure}} |
| waiting | {{skeleton \| spinner \| neither}} | {{posture}} |
| reduced motion | durations to `0s`; the state still changes | always |

### Focus and hover

| decision | value | from |
|---|---|---|
| focus form | {{ring, offset}} | {{posture}} |
| `ring-color` | {{token}} | {{colourStrategy}} |
| what hover changes | {{background, one step}} | {{posture}} |
| the touch equivalent | {{…}} | {{platform}} |

### The accent budget

| may appear | may not |
|---|---|
| {{…}} | {{…}} |

## 3. Component forms

What each family looks like, and **what else was available** — because a reader
who disagrees needs to know the alternatives existed and were passed over.

| family | form chosen | from | also available |
|---|---|---|---|
| {{button}} | {{…}} | {{…}} | {{…}} |
| {{card}} | {{…}} | {{…}} | {{…}} |

**Ruled out by the product itself**, rather than by the archetype or the school:

- {{form}} — {{which answer rules it out, and why}}

## 4. Rules now in force

Where each one is enforced is the honest part: `stylelint` and `ledger` fail a
build, `document` is advice an agent reads.

| rule | enforcement | from |
|---|---|---|
| {{…}} | {{stylelint / ledger / document}} | {{…}} |

## 5. What was NOT decided

Kept deliberately visible. A gap that nobody can see becomes a default nobody
chose — which is the failure this whole layer exists to prevent.

- {{decision}} — {{why it is still open, and what will settle it}}

## 6. If you want to change something, change this

The reverse index, and the most useful section for anyone who reads this file
later. It exists because the instinct on seeing something one dislikes is to
change that thing, and in a derived system that is how a product drifts: one
component gets an exception, then another, and six months later the derivation
describes nothing.

| if you want… | change | not |
|---|---|---|
| louder badges, stronger dividers, filled chips | `posture` | the badge |
| a different feel to the page's warmth | the ramp seed, or `neutralPigment` | individual surfaces |
| bigger headings | `typeScale` | one heading |
| more visible controls at rest | `disclosure` | each control |
| icons without their labels | `iconPolicy` | one button |
| a card that reads as recessed | `surfaceModel` (question 10) | the card |

{{Add the rows this product will actually be asked about.}}

---

*Derived from `DESIGN_LANGUAGE.md` on {{DATE}}, against version {{toolVersion}}.
{{N}} decisions derived from {{M}} answers.*

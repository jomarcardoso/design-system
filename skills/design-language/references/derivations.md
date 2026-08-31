<!-- skills/design-language/references/derivations.md -->

# Derivations — from twenty-three answers to a hundred decisions

The interview asks about twenty-three things. A finished interface needs hundreds
of decisions, and the ones in between have to come from somewhere.

Today they come from judgement at generation time, and **when judgement has
nothing to stand on it reaches for the library's default** — not from laziness,
but because the default is the only concrete thing in the room. That is the
whole reason a themed build still reads as "a Bootstrap page": the colours moved
and the hundred unowned decisions did not.

This file is the layer in between. It turns the answers into component-level
defaults **mechanically**, so the agent computes rather than invents.

---

## How to use it

**Compute, present, let the client disagree.** Do not ask these as questions —
that is how an interview reaches eighty questions and a client stops answering
carefully. Derive them, show them in one block, and let the client object to the
two or three they care about.

**Every derived default carries its provenance.** Say which answers produced it:

> Badges: quiet fill, muted ink — because `archetype: editorial-premium` and
> `posture: quiet`. Inputs: recessed, hairline border — same two.

That sentence is what turns a default into a decision. Without it, the client
cannot tell a recommendation from a leftover, and neither can the next agent.

**Discourage only what causes visual confusion.** A derived default is a
starting point, not a verdict. Where an alternative is merely different, say so
and leave it open; where it fights an earlier answer, say which answer and why.
Then still allow it, as a recorded deviation.

**A derivation that surprises the client is information.** If they reject three
in a row, the posture answer is probably wrong, and that is cheaper to discover
here than after a build.

---

## The posture axis

This is the input most of the tables below read, and it replaces a question that
was asking about one token.

**Question:** *"When something needs attention, does this product raise its
voice or lower everyone else's?"*

| | `quiet` | `balanced` | `loud` |
|---|---|---|---|
| the idea | one thing is emphasised by everything else receding | emphasis is stated, plainly | emphasis is unmistakable and immediate |
| in the wild | Notion, Vercel, Apple Notes | Atlassian, Shopify | Spotify, Duolingo, most consumer apps |
| a layperson hears | "calm, gets out of the way" | "clear, professional" | "punchy, energetic" |

**Why this and not `accentContrast`.** The old question asked whether the accent
was saturated enough to need light ink on it — a question about `fg-on-accent`,
answerable only by someone who already knows the token contract. It decided one
value, correctly, while every other quiet element in the product stayed at the
library default. **A question that decides one token is a question badly asked.**
Posture decides eight things, and `accentContrast` is now one of them.

**Archetype suggests a posture, and does not settle it:**

| archetype | suggested | why |
|---|---|---|
| Editorial & Premium | `quiet` | the content is the product |
| Tech Minimalist | `quiet` | reads through weight and space |
| Utilitarian & Technical | `balanced` | density needs landmarks |
| Enterprise Solid | `balanced` | institutional legibility |
| Playful & Expressive | `loud` | energy is the point |

**The school constrains it.** `monochrome` with `loud` is coherent — Spotify is
exactly that — but it puts the entire burden on one colour, so everything else
must stay quiet or the page has no focal point at all. Say that out loud when it
comes up rather than treating it as a contradiction.

---

## The school decides more than the token names

The tables below read `posture` heavily and the school only where the two
disagree. That is deliberate but it is not the whole story: each school has a
SIGNATURE — the handful of moves that make a build recognisably that school — and
those are in
[`colour-strategies.md`](colour-strategies.md). Derive from the tables here, then
check the signature: a build with the right `$colour-strategy` and none of its
signature picked the school on paper.

The shortest version. `functional`: status is everyday vocabulary rather than an
exception, and every hue is muted at rest. `brand`: the container pair, and
elevation by tonal step rather than by shadow. `monochrome`: the twelve-rung
ladder used as a ladder.

## A. Quiet elements — the ones that made the page generic

The badge, the tag, the chip, the resting secondary action. In every school
these are what the interface is mostly *made of*, and they are the first thing a
library default overwrites.

| | `quiet` | `balanced` | `loud` |
|---|---|---|---|
| badge / tag fill | `bg-neutral-subtle` | `bg-neutral-subtle` | `bg-neutral` (solid) |
| badge / tag ink | `fg-muted` | `fg-default` | `fg-on-neutral` |
| selected chip | `bg-accent-subtle` + `fg-accent` | `bg-accent-subtle` + `fg-default` | `bg-accent` + `fg-on-accent` |
| secondary button | quiet fill or outline | quiet fill | solid neutral |
| ghost / tertiary | transparent, quiet fill on hover | same | quiet fill at rest |

**A label is not a button.** At `quiet` and `balanced` a badge must not read as
something clickable — that is the single most common failure here, and it is
what a solid fill causes. `loud` accepts the risk deliberately.

**In `monochrome`, never tint a badge with the accent** unless it is genuinely a
selection. The product has one accent and spending it on a label leaves nothing
for the action.

## B. Surfaces and inputs

Reads `posture`, `elevation`, `10a` (how many rungs) and `10` (`surfaceModel`).

| decision | derived from | rule |
|---|---|---|
| input background | `surfaceModel` | ladder runs UP → input takes the same surface as its container, edge carries it. Ladder runs DOWN → input is one rung recessed |
| input at rest | `posture` | `quiet`: hairline, no fill change · `balanced`: hairline + recess · `loud`: full border, visible fill |
| input on focus | always | the ring, never a colour change alone |
| card separation | `surfaceSeparation` | `lines` → hairline, same fill as page · `tones` → one rung, no line · `shadows` → `shadow-raised` |
| modal surface | `10a` | one surface → the page colour, separated by the scrim alone · two or more → the raised rung |

**Pure white is a value, not a mistake — but it needs a job.** When
`neutralPigment > 0`, white is the top of the ramp and belongs to whatever
genuinely floats clear of the page: a modal, a dropdown, `bg-raised`. A form
input taking white is not that decision, it is the library's default surviving.
Check where `paper(0)` lands and whether it was chosen.

## C. Type

| decision | derived from | rule |
|---|---|---|
| heading face scope | `archetype` | the heading face is for page titles, section titles and content names. **Never** for buttons, tabs, inputs, badges or table headers — controls take the body face |
| heading emphasis | `posture` | `quiet`: size and weight only · `balanced`: same · `loud`: may add a rule, an eyebrow or a colour shift |
| heading colour | always | `fg-heading`. Tinting a heading with the accent spends the accent on something that is not actionable |
| body weight | `archetype` | Editorial and Tech Minimalist: regular. Enterprise and Utilitarian: regular with medium labels. Playful: medium |
| control weight | `posture` | `quiet`: the body weight · `balanced`: body · `loud`: one step up |

**The control weight rule is the one that keeps getting lost**, because it lives
in the library's Sass rather than in a token. Bootstrap and CoreUI ship badges
at weight 700 and buttons at 400; a `quiet` product wants both at the body
weight, and that is set in the library entry, not in CSS.

## D. Lines and edges

| decision | derived from | rule |
|---|---|---|
| divider weight | `posture` | `quiet`: `border-color-subtle` · `balanced`: `border-color` · `loud`: `border-color-strong` |
| divider reach | `archetype` | Editorial: inset to the text column · others: full width |
| interactive edge | `posture` | `quiet` and `balanced`: `border-color` at rest, `border-strong` on hover · `loud`: accent border on hover |
| table rows | `density` + `posture` | dense: hairline per row · comfortable: hairline · generous + quiet: whitespace only, no rule |

## E. What the accent may touch

Reads `colourStrategy` and `posture`. This is the budget, and it is the rule
most often broken by an ad-hoc screen.

| | `monochrome` | `brand` | `functional` |
|---|---|---|---|
| always | primary action, current selection, focus ring | same | same |
| `balanced` adds | link text | link text, brand band | link text, and each status its own hue |
| `loud` adds | filled selection states, active nav fill | headers, filled bands | filled status surfaces |
| never | headings, dividers, decorative tags, section backgrounds | headings, dividers | headings, dividers |

---

## F. Disclosure — how much is on screen at once

Not asked. Derived from question 5 and the archetype, because a client who is
asked *"do you prefer progressive disclosure or high information density?"* is
being asked to pick a side in someone else's argument.

| | `progressive` | `exposed` |
|---|---|---|
| derived from | Q5 = reading or occasional; Editorial, Tech Minimalist | Q5 = prolonged; Utilitarian, Enterprise |
| what it means | controls appear when they are needed | controls stay visible |
| in the wild | Notion, Apple Notes, reading apps | Jira, AWS console, admin tools |
| the trade | less noise, more clicks and more remembering | fewer clicks, a heavier screen |

**Both are real positions and neither is the sophisticated one.** Progressive
disclosure sold as "clean" costs a user who does the same task forty times a day
forty extra clicks; density sold as "powerful" costs a first-time reader the
ability to find anything. The archetype already chose which cost the product can
afford — this only names it.

What it decides:

| decision | `progressive` | `exposed` |
|---|---|---|
| secondary actions in a row | behind an overflow menu | visible |
| filters | in a panel that opens | along the top, always |
| navigation | collapsed below the tablet breakpoint, and often above it | persistent |
| table row actions | on hover or on select | in every row |
| section content | collapsible, one open at a time | all open |

**`exposed` needs quieter neutrals, not louder ones.** A screen with everything
visible manages noise by lowering the contrast of everything at rest and
spending the accent on one point — which is why `posture: loud` with
`exposed` is the hardest combination in the system, and worth flagging when it
comes up.

## G. Icon policy — how an icon is used, not what it looks like

Question 9 decided the icon's STYLE. This decides its JOB, and it is derived
then confirmed, because it changes what the client sees on every screen.

| | derived when | what it means |
|---|---|---|
| **label always** | `exposed`; Enterprise, Utilitarian; `posture: balanced` | an icon never appears without its text |
| **icon leads, label follows** | most products | icon plus label in navigation and actions; icon alone only in a repeated toolbar |
| **icon alone, text colour** | `progressive` + `quiet`; Editorial, Tech Minimalist | icons act as buttons with no fill and no border, inheriting `currentColor` |
| **icon alone, with a container** | `posture: loud`; Playful | every icon button carries a fill or a border |

### Choosing the SET

**The icon set follows this document, not the component library.** Same rule as
the typefaces: the library decides what a component is, the design language
decides what it looks like. A library that ships its own icons is making a
suggestion, and a suggestion is not an answer.

| the document says | what fits | what does not |
|---|---|---|
| `outline`, thin stroke | a set drawn with a real `stroke-width` attribute — Lucide, Phosphor | sets of filled paths, where stroke is not a knob that exists |
| `outline`, medium | most outline sets | — |
| `filled` | Material Symbols filled, Bootstrap Icons | thin-stroke sets, which have no filled twin |
| `mixed` | a set shipping BOTH weights of the same glyph — Material Symbols, Phosphor | a set with only one weight; the pair has to be the same drawing |

**The test:** does `--app-icon-stroke` change anything? It is a token for a
drawn line, so a set of filled paths has no use for it. If the three
declarations that read it do nothing, the set does not fit the answers — and
that is a cheaper thing to discover before choosing than after a hundred glyphs
are in the markup.

Three rules hold whichever is derived:

- **An icon alone must be a known glyph in a repeated place.** A magnifier in a
  search field is understood; a bespoke glyph on a first-time action is a puzzle.
- **Never an icon alone for something destructive or irreversible.** The label is
  the confirmation the user reads before the modal appears.
- **The icon takes the ink of the text it belongs to**, at the same or a quieter
  step — never the accent, unless the thing it marks is selected. An icon in the
  accent beside body text spends the budget on decoration.

**Two families may coexist.** The commonest pairing in the wild is outline at
rest and filled when selected, which is `iconStyle: mixed`. When the answer
was (A), (B) or (C), a second family needs a reason — mixing stroke weights is
the most visible inconsistency a product can ship and the one no token catches.

## H. The frame

Question 19 gave the regions. These follow.

| decision | derived from | rule |
|---|---|---|
| content measure | archetype + Q5 | reading or Editorial: 45–75 characters. Dense tool: the region's width, with a max only where lines would exceed ~110 characters |
| header behaviour | `disclosure` + Q5 | `progressive` + reading: static, scrolls away · `exposed`: sticky · long reading pages: sticky and condensed after the first screen |
| aside on a phone | `disclosure` | `progressive`: becomes a sheet or a menu · `exposed`: moves above the content and stays |
| tone of each region | Q10a | one-surface budget: all regions share the page tone, separated by rules · two: the frame takes the second rung and the content keeps the page |
| where the accent sits in the frame | `colourStrategy` | the current item in the navigation, and nothing else in the chrome |

**A frame region is not a card.** It is separated by a rule or a rung, never by
a shadow or a radius — chrome that looks like content is the fastest way to make
a product feel assembled from parts.

## I. The type scale ratio

**The single number that most changes how a page feels at a glance**, more than
any colour, and until now nobody chose it — every product inherited the scale
the foundation ships, which is Tailwind's hand-tuned one. It is a good scale and
it is also *the* scale, in a large share of the interfaces built in the last few
years. A product that keeps it has inherited a typographic signature it never
chose.

| ratio | name | what it does | derived for |
|---|---|---|---|
| 1.125 | minor second | barely a hierarchy; size cannot do the work alone | Utilitarian; `dense` |
| 1.200 | minor third | restrained, safe for applications | Tech Minimalist, Enterprise |
| 1.250 | major third | clear steps, the common editorial choice | Editorial; `comfortable` |
| 1.333 | perfect fourth | dramatic; few levels, large jumps | Playful; marketing surfaces |
| 1.500 | perfect fifth | very dramatic | rarely a whole product |

**A tight ratio moves the work elsewhere.** At 1.125 a heading is barely larger
than body text, so hierarchy has to come from weight, colour or space — which is
correct for a dense tool and wrong for a reading product. At 1.333 the third
step up is already very large, so a page with four heading levels runs out of
room. Say which is happening rather than only naming the number.

`src/_type.scss` generates it: `type.scale(1rem, 1.25)` returns the same step
keys the hand-written scale uses, so it is a drop-in. Like the colour ramp, it
is **not on by default** — generating something is a claim that the generated
version is better, and for a product that never thought about type the shipped
scale is the better answer.

## J. Vertical rhythm

Derived from `density`, and expressed as **relations** so it survives a change
of scale.

| | related | unrelated | between sections |
|---|---|---|---|
| `dense` | `space-2xs` | `space-sm` | `space-xl` |
| `comfortable` | `space-xs` | `space-lg` | `space-2xl` |
| `generous` | `space-sm` | `space-xl` | `space-2xl` and a rule |

**The invariant, which matters more than the values: the gap between unrelated
things is at least twice the gap between related ones.** Below that, grouping
stops reading and the page becomes a list of equals — which is the failure that
gets diagnosed as "it needs more whitespace" when what it needs is a ratio.

**Space belongs to the container.** A component carrying its own outer margin
cannot be reused in a tighter context, and every rhythm here is applied by the
thing doing the grouping.

## K. Images

Question 20 says what role imagery plays; 20a says its proportion. Everything
below follows, and none of it is asked.

**The image is a surface**, and every rule this file already states about
surfaces applies to it. That is the whole trick: a system that treats a
photograph as a special case ends up with a photograph that looks pasted on.

| `imagery` | `ratio-media` | `radius-image` | edge | shadow |
|---|---|---|---|---|
| `none` | — | — | — | — |
| `supporting` | from 20a | `radius-control` | a hairline in `border-color` | never |
| `content` | from 20a | `radius-surface` | see below | follows `elevationCarrier` |

**`ratio-thumb` is always `1`** and is not a decision. An avatar, a favicon, a
sixteen-pixel logo beside a name — every one of them is square, in every product
that has ever shipped, and asking about it spends a question to confirm a
constant.

### The edge, when the image is the content

The problem is a photograph with a pale sky sitting on a pale surface: the image
has no boundary and the layout stops reading. It is a real bug and it appears in
review, not in design, because the placeholder was grey.

| `surfaceDirection` | treatment |
|---|---|
| lighter surfaces on a darker page | an inset hairline, `border-color` at the surface's own tone |
| darker surfaces on a lighter page | none — the surface is already darker than any sky |

**A border on an image goes inside, not around.** `box-shadow: inset 0 0 0 1px`
rather than `border`, because a border changes the box and a photograph at a
fixed ratio has no room to give up.

### Decorative images

| `archetype` | policy |
|---|---|
| Editorial & Premium | allowed, and the only archetype where it is a first-class element |
| Playful & Expressive | allowed as illustration, never as photography behind text |
| Tech Minimalist, Enterprise Solid, Utilitarian & Technical | **not allowed** — this is a guardrail, and it belongs in the restriction list |

A decorative image is one a screen reader is told to skip. **If it carries
meaning it is not decorative**, and calling it decorative to avoid writing alt
text is how a product fails an audit for a reason nobody logged.

### What shows before it loads

Not optional when the answer is `content`, because there is no version of that
product where the image is always there.

- **The reserved box.** `aspect-ratio: var(--app-ratio-media)` on the container,
  always, so nothing moves when the image arrives. This is the whole fix for
  layout shift and it costs one line.
- **The empty state.** `bg-neutral-subtle` and a centred icon at `fg-subtlest`.
  Not a spinner: a missing image is a state, not a wait.
- **No blur-up, no fade-in, unless `posture` is `loud`.** A quiet product does
  not animate the arrival of a photograph.

## L. Grid and columns

Derived from `frame`, `density` and `platform`. The values below are the
system's opinion; the **breakpoints themselves are compiled by the component
library**, so they are set in `<library>-entry.scss` and not in the theme.

| `frame` | columns | `gap-grid` |
|---|---|---|
| single column | none — one measure, centred | `space-lg` |
| content with an aside | 12, and the aside is a fixed rail | `space-lg` |
| application frame | 12 | `space-md` |

Then `density` moves the gutter one step: `dense` down, `generous` up.

**`size-measure` is the constraint, not the column count.** A twelve-column grid
whose content column runs to 110 characters is a grid doing nothing. The measure
is `68ch` by default, and section H moves it.

### Where the grid stops

| `platform` | behaviour |
|---|---|
| desktop-first | the grid collapses to one column below the tablet breakpoint |
| mobile-first | there is no grid below tablet — one column is the design, not the fallback |
| both, equally | **the phone layout is designed first and the grid is what happens when there is room** |

The third row is the one usually got wrong, and the tell is a product whose
phone view is the desktop view with the columns stacked.

### Density does not change per breakpoint by default

It can — `--app-space-unit` is a custom property, so a media query can compact a
whole subtree in one line — and it usually should not. **A phone is not a denser
device; it is a narrower one**, and shrinking the unit on a touch screen fights
the target size that section B just set.

The exception is `frame: application frame` on a tablet, where the working area
genuinely has less room and the client asked for the frame to survive. Say so
when applying it, so the media query is a decision and not a habit.

## M. Motion

Derived from `posture` and `disclosure`. **No question asks about motion**, and
one should not: a client asked how fast a dropdown opens will answer, and the
answer will not be about their product.

| `posture` | what moves | duration | easing |
|---|---|---|---|
| `quiet` | colour and opacity only | `duration-fast` | `ease` |
| `balanced` | colour, opacity, and disclosure | `duration-base` for disclosure, `duration-fast` for state | `ease` |
| `loud` | the above, plus entrance | `duration-base`, `duration-slow` for a modal | `ease`, and a spring only for a deliberate gesture |

**The rules that hold at every posture:**

- **Nothing animates on page load.** An entrance animation on content the user
  asked for is the product performing at them.
- **Hover transitions in, and out at the same duration.** An asymmetric hover
  reads as lag.
- **Layout does not animate.** Height, width and position are expensive and they
  are what makes an interface feel loose. Transform and opacity are not.
- **`prefers-reduced-motion` removes the duration, not the change.** The state
  still changes; it changes at once. Setting the duration tokens to `0s` inside
  the query is the whole implementation, which is the argument for the tokens
  existing at all.

**Spinner or skeleton** is a motion decision and belongs here:

| wait | form |
|---|---|
| under ~300ms | nothing. A flash of a spinner is worse than a pause |
| a known region, known shape | a skeleton at `bg-neutral-subtle` |
| unknown duration or unknown shape | a spinner |
| the whole page | neither — the empty state, with what the user can do meanwhile |

## N. Focus and hover, as policy

Both have tokens and neither had a decision, which is how a system ends up with
a different focus treatment per component.

### Focus

| `posture` | form |
|---|---|
| `quiet` | `ring` at `ring-width`, offset by `ring-offset`, in `ring-color` |
| `balanced` | the same |
| `loud` | the ring, plus the element's own background moving one step |

The form barely varies, and that is the finding: **a focus ring is not a place to
have a personality.** It is one treatment applied everywhere, and the only thing
worth deriving is its colour.

| `school` | `ring-color` |
|---|---|
| functional | `bg-action` |
| brand | `bg-primary` |
| monochrome | the accent |

**`:focus-visible`, never `:focus`**, so a mouse click does not draw a ring. And
the rule already in the template: never `outline: none` without a replacement in
the same rule.

### Hover

| `posture` | what hover changes |
|---|---|
| `quiet` | the background, one step. Nothing else |
| `balanced` | background, and the border where one exists |
| `loud` | background, border, and the shadow where `elevationCarrier` is shadow |

**Hover never moves anything and never changes size.** A control that grows
under the cursor moves its own neighbours, and on a list it makes the row the
user was aiming at slide away.

**Every hover has a non-hover equivalent.** Touch has no hover, and a phone is
not a device where a product gets to hide an affordance behind one — an action
revealed on hover is either always visible on touch, or it lives somewhere a
touch can reach. This is a checkable rule and belongs in the guardrails.

**`:active` is not optional on touch.** It is the only feedback a finger gets,
and the `*-active` tokens exist for it.

## O. Shape — the radius, which used to be a question

Derived from the archetype. It was question 7 until its own text gave it away:
*"do not let it absorb an hour of debate: set the preset, look at a real screen,
adjust once."* That is a derivation describing itself as a question.

| archetype | `radius-control` | `radius-surface` | pills |
|---|---|---|---|
| Tech Minimalist | 6px | 10px | never |
| Enterprise Solid | 4px | 8px | never |
| Playful & Expressive | 12px | 20px | badges and chips |
| Editorial & Premium | 4px | 8px | never |
| Utilitarian & Technical | 2px | 2px | never |

Then two adjustments, in order:

- **`posture: loud` moves both one step up**, because a loud product is asking
  to be noticed and a square corner reads as instrument rather than invitation.
- **`surfaceModel: recessed` moves both one step down.** A well is cut, and a
  cut has a corner.

**Surfaces are one step rounder than the controls inside them.** A control with
the same radius as its container reads as stuck to it, and this holds at every
row above.

**Radius is the most recognisable archetype signal and the cheapest to change**
— two tokens. That is the argument for deriving it rather than asking: the cost
of getting it wrong is one line, and the cost of asking is that a client with no
reason to prefer one spends a question deciding something the archetype already
answered.

## P. Icon style — also formerly a question

Derived from the archetype and from §O. It was question 9, and its own ✅ table
had exactly one ✅ in four of the five rows — which means the archetype was
answering it and the client was being asked to agree.

| archetype | `iconStyle` | `iconStroke` | `iconSize` |
|---|---|---|---|
| Tech Minimalist | outline | 1.5px | 20px |
| Enterprise Solid | outline | 1.75px | 20px |
| Playful & Expressive | filled | — | 24px |
| Editorial & Premium | outline | 1.25px | 20px |
| Utilitarian & Technical | outline | 1.75px | 16px |

**The stroke is set against the BODY type weight, not against the icon set's
default.** A 2px stroke beside a light serif is a different product in the same
screen, and an icon set ships one weight for every product that will ever use it.

**Corner geometry follows §O.** Icons drawn with square corners inside a
20px-rounded interface read as clip art, so whatever radius the archetype took,
the set has to be able to match it.

**`mixed` is a behaviour, not a style** — filled marks the selected state,
outlined everything else — and it is the one value that is never derived, because
it needs a set that ships both weights of the same glyph. Propose it only when
the chosen set is known to have them.

**Colour is not an icon decision at any archetype.** An icon inherits
`currentColor` and takes its meaning from the text beside it. A set with its own
palette fights every theme the product will have, and shows it first in dark
mode.

## Q. The surface model

Question 10, and the first thing to say about it is what it is NOT: it is not
the colour school, and it is not dark mode.

**It is independent of the school.** The school is the token architecture — which
interactive roles exist and what they are called. The surface model is the
physics of light on the screen. A product can be monochrome and `elevated` (a
reading app), monochrome and `flat` (a minimal technical tool), functional and
`recessed` (a dense operational console). Treating them as one axis is what makes
generated systems converge: the school gets chosen, the surface model comes along
for the ride, and two products with different jobs end up with the same page.

**It is not `derive.dark()`.** The word "inverted" was deliberately avoided for
this reason — see §T.

| | `flat` | `elevated` | `recessed` |
|---|---|---|---|
| page | the base step | one or two rungs up | the lightest step |
| raised — card, modal, dropdown | the same tone as the page | LIGHTER than the page | — |
| grouped — panel, well, data area | the same tone as the page | — | DARKER than the page |
| what separates | a hairline, and space | the tone difference | the tone difference |
| the metaphor | ink on one sheet | sheets stacked on a desk | niches cut into a surface |
| documented in | Vercel; minimal technical tools | Radix's 12-step scale; Apple HIG | Material 3 `surface-container`; Atlassian `background.neutral` |

### What it decides

| decision | rule |
|---|---|
| direction of `bg-page` against `bg-surface` | `flat`: equal · `elevated`: surface lighter · `recessed`: surface darker |
| whether `bg-sunken` exists | `recessed` only. Under `elevated` a sunken tone contradicts the model and produces a page with light above and dark below the same plane |
| `border-divider` | load-bearing under `flat`; **redundant wherever a tone difference already draws the line** — see §R |
| input at rest | `flat` and `elevated`: same fill as its container, the edge carries it · `recessed`: one rung recessed |
| image frame edge | `elevated`: an inset hairline, because a pale photograph on a light card has no boundary · `recessed` and `flat`: none needed |
| the frame's chrome | never a shadow and never a radius, at any model. Chrome that looks like content is the fastest way to make a product feel assembled from parts |

### The elevation ceiling

**One permanent level, one temporary. That is the whole rule**, and it is a
guardrail rather than a question because the answer is the same for almost every
product:

- **Permanent:** the content surface — cards, panels. One level, whatever the
  model.
- **Temporary:** what covers the screen — modals, dropdowns, popovers. The only
  things allowed a real shadow.
- **Never elevated:** the header and the sidebar. They belong to the page plane
  and are separated by a rule or by one rung.

A sidebar, cards and a dialog all lifted at once produces what the shadow
literature calls an accumulation of floating islands: nothing is elevated,
because everything is. A product that wants more than one permanent level is
making a deviation and it goes in the document as one.

## R. The two border roles

A border does two unrelated jobs and until now had one token. Three tones
existed — `border-color`, `-subtle`, `-strong` — but tone is **prominence**, not
**role**: nothing said what a border was FOR, so every component author picked a
tone by eye and the page filled with lines that meant different things and looked
the same.

| token | job | never |
|---|---|---|
| `border-divider` | separate content on the same plane — a rule under a header, the edge of an aside, a line between rows | implies that anything is clickable |
| `border-interactive` | affordance and state — a control at rest, a selectable card, a field waiting for input | separates two pieces of static content |

The split is Primer's `border.default` against `border.emphasis`, and Material's
outline against outline-variant. Both arrived at it the same way: a system with
one border token gets a page where the divider and the input edge are the same
weight, and the eye cannot tell which rectangle it may click.

### Derived, not asked

| | `border-divider` | `border-interactive` |
|---|---|---|
| question 9 = the border carries hierarchy | `border-color` — it is load-bearing | `border-color-strong` |
| question 9 = the tone carries hierarchy | `border-color-subtle` | `border-color` |
| question 9 = space carries hierarchy | `border-color-subtle`, used almost nowhere | `border-color` |
| `posture: loud` | unchanged | one step stronger |

### The redundancy rule

**Where a tone difference already draws the line, the divider does not appear.**
Under `surfaceModel: elevated`, a card that is lighter than the page needs no
border — the two fills give the eye the boundary, and adding a line on top is the
graphic noise that makes a quiet product look busy for no reason anyone can name.

This is behaviour of the build, not an instruction for whoever writes the theme:

| `surfaceModel` | a static container | an interactive container |
|---|---|---|
| `flat` | `border-divider` | `border-interactive` |
| `elevated` | none — the tone is the line | `border-interactive`, or nothing at rest and an edge on hover |
| `recessed` | none | `border-interactive` |

**The interactive edge survives everywhere**, because affordance is not
separation. A card that is lighter than the page still has to say it can be
clicked, and the two most common ways are an edge at rest or a clean rest with an
edge on hover — the second is `quiet`, the first is `balanced` and `loud`.

## S. Colour-critical workspaces

`colorCriticalWorkspace: true`, derived from question 1 and confirmed. It is a
flag any archetype may carry, not a sixth archetype: the case is real, rare, and
does not change anything else about the product's personality.

It applies when the user is **judging colour** on screen — a photo or video
editor, a 3D tool, a colour grading application, a print proofing view. It does
not apply to a product that merely displays images. A recipe notebook shows
photographs; nobody calibrates one.

**The reason is physiological rather than aesthetic**, and saying so matters,
because as a preference it would be arguable and as physiology it is not. A
bright interface next to the work makes the viewer's iris contract to the
interface, and the image is then judged against the wrong adaptation state. It is
why every professional editing tool has a neutral, low-contrast chrome.

| what it forces | |
|---|---|
| `surfaceModel` | `flat` or `recessed`, never `elevated` — a lit chrome is exactly the thing being avoided |
| `neutralPigment` | at most 0.2. A tinted grey next to an image is a colour cast the user will try to correct for |
| the accent budget | the smallest it goes: the primary action, the current selection, the focus ring. Nothing decorative |
| status colours | unchanged in family, and never used as a large fill near the canvas |
| the canvas | **the only lit surface on screen.** Everything else is the frame |

**It conflicts with `archetype: playful-expressive`**, and that conflict is real
rather than stylistic: decorative shadows and saturated chrome are the two things
the flag exists to prevent. See `conflicts.md`.

## T. What each surface model does in the dark theme

**Not a mirror.** This is the rule that was missing, and it matters because
`derive.dark()` already refuses naive lightness inversion for a measured reason —
inverting a light theme step by step produces pairs that pass in one direction
and fail badly in the other.

The models do not survive the flip in the same way:

| | in light | in dark |
|---|---|---|
| `flat` | one tone, hairlines | **unchanged in kind.** One tone, hairlines. The border has to get RELATIVELY stronger, because a 1px line at low lightness separates less than the same line at high lightness |
| `elevated` | raised is lighter | **still lighter.** This is the one that survives directly — a lit sheet is lighter than its surroundings whichever theme it is in, and it is why every dark interface with cards makes the card lighter, never darker |
| `recessed` | grouped is darker | **inverts to lighter.** A well cut into a dark surface cannot go darker without reaching the floor of the ramp: there is nowhere left to go, and the well stops reading. Under dark, a recessed model groups by going one step UP |

**The asymmetry is the finding.** `elevated` means the same thing in both themes;
`recessed` means "one step away from the page toward the middle of the ramp",
which is down in light and up in dark. A theme generated by transforming
lightness alone gets this wrong and produces a dark theme with invisible panels.

Record it in `DESIGN_LANGUAGE.md` in words, not in step numbers: *"grouped
content steps away from the page toward the middle of the ramp"* holds in both
themes, and *"panels are step 100"* is true of one.

## Validating a new question: does it discriminate?

Before a question is considered finished, run it against three products that
ought to end up different. **If two of them converge, the question is not
discriminating and the fault is the question's**, not the products'.

These three are the standing set, chosen because they stress different axes:

| | a recipe notebook | a dense B2B console | an image editor |
|---|---|---|---|
| dwell | hours | hours | hours |
| protagonist | the user's content | the tools | the tools |
| `colorCriticalWorkspace` | false | false | **true** |
| archetype | Editorial & Premium | Enterprise Solid | Utilitarian & Technical |
| school | monochrome | functional | monochrome |
| **`surfaceModel`** | **`elevated`** | **`recessed`** | **`flat`** |
| `neutralPigment` | 0.6 | 0.2 | **≤ 0.2, forced** |
| `posture` | quiet | balanced | quiet |
| accent budget | smallest | the CTA plus states | **smallest, forced** |
| `radius` | 4 / 8 | 4 / 8 | 2 / 2 |
| divider | present, absent around cards | present everywhere | present everywhere |

**The finding from running it.** The first draft of question 10 had a rule
saying long dwell pulls the model one step toward `flat`. Applied here, the
console and the editor both landed on `flat` and the question stopped
discriminating between them — which is exactly the failure this table exists to
catch. The rule was wrong: **long dwell lowers the contrast BETWEEN rungs and
pulls `posture` to quiet; it does not change the model.** A dense console still
needs its wells however long someone sits in front of it.

The two products that share `protagonist: tools` are separated by
`colorCriticalWorkspace` alone, and that is enough: it forces the model away
from `elevated`, caps the pigment, and caps the accent. Three tokens, all
different, from one flag.

## Deriving `accentContrast`

Kept as a front matter key and no longer asked. It is measured, not chosen:

1. Take the accent as declared.
2. Measure it against the lightest ramp step and against the darkest.
3. Whichever wins is `fg-on-accent`, and `accentContrast` is `high` when that is
   the light one.

If neither reaches the accessibility threshold, the accent cannot carry a solid
fill at all — which is a real finding and belongs in the read-back, not in a
silent adjustment. The options are: move the accent, use it as ink and border
only, or lower the threshold. All three are the client's call.

---

## What this file is not

It is not a style guide, and it does not describe component ANATOMY — where the
icon sits in an alert, whether a chip has a remove affordance. That is the
component form catalogue, and it reads this file rather than repeating it.

It is also not enforcement. Nothing here fails a build. The enforcement points
are `themes.check-contrast()`, `stylelint`, `verify:patterns` and the review
checklists; a derived default that matters enough to enforce should become a
guardrail with a signature, and then it stops being a default at all.

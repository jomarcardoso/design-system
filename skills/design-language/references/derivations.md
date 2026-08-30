<!-- skills/design-language/references/derivations.md -->

# Derivations — from twenty answers to a hundred decisions

The interview asks about twenty things. A finished interface needs hundreds of
decisions, and the ones in between have to come from somewhere.

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

Reads `posture`, `elevation`, `13c` (how many surfaces) and `13d` (direction).

| decision | derived from | rule |
|---|---|---|
| input background | `13d` | ladder runs UP → input takes the same surface as its container, edge carries it. Ladder runs DOWN → input is one rung recessed |
| input at rest | `posture` | `quiet`: hairline, no fill change · `balanced`: hairline + recess · `loud`: full border, visible fill |
| input on focus | always | the ring, never a colour change alone |
| card separation | `surfaceSeparation` | `lines` → hairline, same fill as page · `tones` → one rung, no line · `shadows` → `shadow-raised` |
| modal surface | `13c` | one surface → the page colour, separated by the scrim alone · two or more → the raised rung |

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
rest and filled when selected, which is question 9's option (D). When the answer
was (A), (B) or (C), a second family needs a reason — mixing stroke weights is
the most visible inconsistency a product can ship and the one no token catches.

## H. The frame

Question 19 gave the regions. These follow.

| decision | derived from | rule |
|---|---|---|
| content measure | archetype + Q5 | reading or Editorial: 45–75 characters. Dense tool: the region's width, with a max only where lines would exceed ~110 characters |
| header behaviour | `disclosure` + Q5 | `progressive` + reading: static, scrolls away · `exposed`: sticky · long reading pages: sticky and condensed after the first screen |
| aside on a phone | `disclosure` | `progressive`: becomes a sheet or a menu · `exposed`: moves above the content and stays |
| tone of each region | Q13c | one-surface budget: all regions share the page tone, separated by rules · two: the frame takes the second rung and the content keeps the page |
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

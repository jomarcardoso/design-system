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

Reads `posture`, `elevation`, `11d` (how many surfaces) and `11e` (direction).

| decision | derived from | rule |
|---|---|---|
| input background | `11e` | ladder runs UP → input takes the same surface as its container, edge carries it. Ladder runs DOWN → input is one rung recessed |
| input at rest | `posture` | `quiet`: hairline, no fill change · `balanced`: hairline + recess · `loud`: full border, visible fill |
| input on focus | always | the ring, never a colour change alone |
| card separation | `surfaceSeparation` | `lines` → hairline, same fill as page · `tones` → one rung, no line · `shadows` → `shadow-raised` |
| modal surface | `11d` | one surface → the page colour, separated by the scrim alone · two or more → the raised rung |

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

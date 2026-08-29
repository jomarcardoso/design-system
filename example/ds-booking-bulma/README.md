<!-- example/ds-booking-bulma/README.md -->

# DS Booking — Bulma, phase 3

A reconstruction of Booking.com's design language on this foundation, built on
**Bulma** — the hardest library in the collection, because it does not accept
colours at all, only decomposed HSL channels.

Chosen as the second real-world test specifically because it looked like it
would break the mapping that worked for Itaú. It did break two things, and both
turned out to be gaps in the tool.

> Not affiliated with Booking.com. A study, using publicly served CSS.

```bash
npm run build:example-booking
npm run verify
```

---

## What was measured, and what was refused

Booking serves its CSS cross-origin, so `document.styleSheets` throws and there
is no token table to read. Everything in `palette.scss` is the **computed style
of a real rendered element** — which changes what can be claimed. For Itaú the
reconstruction could quote the design system; here it can only quote the result.

One colour was deliberately thrown away: `#0000ee`, carried by **478 sampled
elements** — more than any brand colour on the page. It is the user-agent
default link colour on unstyled anchors inside collapsed menus.

**Frequency is not evidence of intent.** Sampling a live page finds the
browser's defaults as readily as the brand's, and the count is exactly what
makes a default look authoritative.

---

## The shape, and why it is not Itaú's

| | Itaú | Booking |
|---|---|---|
| fill | orange | **gold** `#ffb700` |
| ink | navy | **blue** `#006ce4` |
| brand surface | *(the action colour)* | **navy** `#003b95` |

The third column is the new part. `#003b95` paints the header band and nothing
is clickable because it is navy — it is a **surface**, not an action. Layer 2
has no role for "the brand's dark band" and does not need one: the `inverted`
context is exactly that.

### The role split Itaú did not produce

Itaú marks a selected thing with its action colour, so `check-roles()` warns and
the collapse is recorded. **Booking does not** — the Search button is gold and a
chosen category pill is blue.

That is the first evidence from a real system that `action` and `selected` being
separate roles is not this project's invention. One brand collapses them, one
does not, and the same contract expresses both without changing shape.

---

## Three changes this example forced on the foundation

**1. The inverted context was hardcoded to zinc.** A brand whose dark band is
navy had to edit a vendored file or abandon the context. `emit-contexts()` now
takes the theme and reads five optional keys (`inverted`, `on-inverted`,
`inverted-muted`, `inverted-border`, `inverted-link`), each falling back to what
was there. A theme that says nothing gets the zinc band it always got.

**2. A surface context did not paint itself.** `data-surface="inverted"` set
tokens and nothing else, so the navy header rendered transparent — and every
white control inside it then read the overridden `bg-surface` and turned navy on
a white page. One missing declaration producing a bug that looked like a theme
error. The tool's own two surface contexts now paint.

**3. The inverted context left the interactive inks behind.** It flipped
`bg-surface`, `fg-default` and `fg-muted` and left `fg-link` pointing at a value
chosen for a light page. Every footer link on a dark band rendered at **1.2:1**,
and it had been shipping since the context existed — no earlier demo page
happened to put a link inside an inverted band.

The first fix for #3 also flipped `fg-action`, which broke the Booking header in
the opposite direction, to **1:1**: its buttons are white chips that bring their
own surface onto the navy, and white ink on a white chip is invisible. So the
context flips **links only**. A link is always inline text directly on the band;
an action may not be, and the context cannot know which. Itaú's product context
flips its actions because its buttons *are* text on the band.

---

## The review round — was this the tool, or brute force?

A review asked the fair question: is the product layer using Bulma, or
reimplementing it and calling that a result? Measured, the honest answer was
**partly brute force**, and correcting it produced the two best findings in
the study.

| | before | after |
|---|---|---|
| product-layer code lines | 243 | **128** |
| `@extend`s | 9 | 15 |
| cross-contaminated selectors | 84 | **0** |
| components reimplemented from scratch | 3 | 0 |

### Extend the component, never a shared modifier

`@extend .button` is cheap and correct — `.bk-listing` extends `.card` and
appears 6 times in the output. `@extend .is-primary` is neither, because Bulma
colour modifiers are shared across component families: the same `.is-info` is on
`.button`, `.tag`, `.notification` and `.message`, so Sass generates the cross
product.

```
.bk-score            126 occurrences
.bk-search__submit   261 occurrences
84 nonsense selectors: .bk-tab.bk-score, .bk-btn-primary.bk-deal, …
```

And it was not only bloat. `.bk-score` extended `.is-info`, which pulled in
`.button.is-info` — **the score badge became a button and lost its type size.**
A correctness bug, produced by reaching for the library the wrong way.

`@extend .button.is-primary` would be exact, and Sass removed compound extends.
So: extend the BASE component for its padding, focus, disabled state and
transitions; take the modifier two or three colours from tokens. That is also
more faithful — `bg-action-hover` is #e5a400 because the brand chose it, where
Bulma would compute the base shifted by a fixed lightness delta.

### One component, two contexts, no variant

Booking header nav (`[data-testid="header-xpb"]`) and its category carousel
(`[data-testid="webcore-filter-carousel-tabs"]`) measure identical: pill radius,
43.6px, 11px/16px padding, weight 500, transparent border idle, a 0.8px border
in the current ink when chosen. The only difference is the ink — #006ce4 on
the page, #ffffff on the band.

That is not a variant. `.bk-tab` reads `fg-link` when chosen and
`currentColor` for its border; the inverted context supplies the rest. Booking
ships an on-brand modifier for this and the context replaces it. Rendered:

```
            got                                    booking
hdr tab     transparent / #fff / 0.8px #fff        transparent / #fff / 0.8px #fff
filter tab  transparent / #00589e / 0.8px          transparent / #006ce4 / 0.8px
both        43px / 14px                            43.6px / 14px
```

(The blue is one step darker than Booking ships. That is the AA correction
below, not a mismatch.)

## What Bulma could not do

**The label on a coloured button cannot take a paired foreground.** Bulma takes
the *lightness* of the invert and recomposes it with the family hue; there is
no channel for a label hue. The theme says #1a1a1a, Bulma renders #332500.
Naming the ink on the product class skips the composition entirely — which is
a second reason not to extend the modifier.

**Anchors could not follow a context.** Bulma composes `--bulma-link-text` from
channels the adapter computes at BUILD time — fine for a theme, fatal for a
context. The adapter now binds the three composed anchor variables to
`fg-link` directly. That is the one place it steps outside the HSL scheme,
and it is what made the navy footer possible.

**Three adapter gaps this study found**, all invisible until a theme diverged
from Bulma defaults:

1. `--bulma-body-size` was bound to `font-size` and applied by Bulma to
   `html`. Setting the root to 0.875rem made **1rem = 14px for the whole
   document** — every other rem token silently shrank 12.5%. It goes on
   `body` now. The root font size belongs to the reader.
2. **Bulma control type scale was never bound.** `--bulma-size-small/normal/`
   `medium/large` shipped as Bulma own values, so a 14px product got 14px
   prose and 16px buttons — the scale split in two with the library holding
   half. Found by a pill rendering 46px against 43.6.
3. Anchors, above.

## What the build refused

Five failures, all colour, none of which anyone was looking for.

| pair | measured | why |
|---|---|---|
| `link` on `action-subtle` | 4.41 | Booking's blue is **4.92:1 on pure white** — AA by 0.42. Any tint under it eats the margin. |
| `link` on `sunken` | 4.13 | same cause, on the grey rail |
| `success-text` on `success-subtle` | 4.37 | `#008234` was chosen to carry white on a badge; as words it fails |
| `danger-text` | — | same correction, smaller margin |
| footer links on the band | 1.2 | the context bug above |

The first three are one finding wearing three hats: **a fill chosen to carry
white text is too light to be read as words.** That is the mistake this project
sweeps other people's libraries for, reproduced faithfully by sampling a live
page — and the build refused to compile until the theme split fill from ink.

Counter-intuitive detail worth keeping: darkening the tint made it *worse*. The
ink is dark, so the background has to move **towards** white, not away from it.
`#f2f7ff` is the deepest tint that still clears 4.5.

---

## The ledger, and a word it was missing

Phase 3: the markup names no Bulma class for anything this product has an
opinion about. Five components, seven patterns, 18 call sites.

Two of them — the search panel and the review score — are the product's own,
built from tokens because Bulma has nothing of that shape. `styled` means "a
semantic class over a **library** component" and `wrapped` means "a framework
component over that class"; neither describes a component with nothing
underneath.

The Itaú study hit this and worked around it. Hitting it twice was enough:
**`own` is now a state in the schema and the verifier**, and it changes the
number that matters — the maturity table can finally say how much of the
vocabulary the library actually carries.

```
button     3 allowed  raw 0 (0%)  styled 3 (100%)  own 0 (0%)   …
search     1 allowed  raw 0 (0%)  styled 0 (0%)    own 1 (100%) …
score      1 allowed  raw 0 (0%)  styled 0 (0%)    own 1 (100%) …
```

---

## Known limits

**One composition rule the ledger records and cannot enforce.** The search
panel's gold frame reads 5.84:1 against the navy band and **1.75:1 against
white**. It is only accessible in the context it was designed for, and no token
can stop someone dropping it onto a white section. It is written into the
pattern's `notes` and marked as advice.

**Booking's body text is 14px.** Every other product here sits at 16. It is an
information-dense product — a results page is a table of prices wearing cards —
and the theme's `font-size`, `line-height` and `size-control` move together to
match. That coupling is why the design-language archetypes treat density as
three decisions rather than one.

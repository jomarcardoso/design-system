<!-- skills/design-patterns/references/never-offered.md -->

# Never offered

Shapes that exist in the wild and that this tool does not propose. The client's
instruction that produced the file: *if something is very strange or very old,
we do not need to force the questions to produce a system with elements that are
out of place.*

**This is a catalogue of RECOGNITION, not a prohibition.** An agent that does
not know a shape exists reinvents it — the reason a list of things never to
build is more useful than silence. Every entry says what it is, why it is not
offered, and what to reach for instead, because "not that" without "this
instead" is how a refusal turns into a worse improvisation.

**Nothing here is banned.** Same rule as the two form catalogues: a client who
asks for one gets it, as a recorded deviation with a reason. What must never
happen is one arriving because nobody named it.

---

## The two kinds

**Dated** — it was the standard answer once, and it now says a specific year out
loud. There is nothing wrong with it that a redesign would not also do to
today's answers in fifteen years. It is excluded because a system generated in
2026 should not look like it was generated in 2009 unless somebody asked.

**Never was** — it does not work, and it keeps being built anyway. These have
arguments rather than tastes behind them, and the arguments belong in the
document, because "our designer likes it" beats "it is out of fashion" and does
not beat "it fails the contrast gate by construction".

The second kind is the more useful half of this file.

---

## Surface and depth

| shape | what it is | why not | instead | detectable as |
|---|---|---|---|---|
| **bevel and emboss** | a light inset shadow above and a dark one below, so a control looks carved from plastic | dated — it is the 2008 answer, and it needs four shadows to say what one border says | a border in `border-interactive`, or one `shadow-raised` | `box-shadow` with both an inset and a non-inset value on one declaration |
| **neumorphism** | dual soft shadows on a surface the same colour as its background | **never was.** The control and its background are the same fill BY DESIGN, so non-text contrast is near zero and it fails WCAG 1.4.11 by construction. It is not a strict reading of the rule; there is nothing there to measure | a fill one rung from the page, or a border | two `box-shadow` values, one light and one dark, on a surface with no background difference |
| **glassmorphism** | a translucent fill over a blurred backdrop | **never was**, for a reason worth stating precisely: the contrast of anything on it depends on what happens to be behind it, so the pair invariant every theme is checked against cannot be evaluated at all. It is not that it fails the gate — it cannot be put through it | a solid raised surface at `bg-raised`, with `shadow-overlay` | `backdrop-filter` |
| **hard offset drop shadow** | a dark shadow with a visible offset and no blur | dated, and it is the same decision as a border made twice as heavy | `shadow-raised`, or a border | `box-shadow` with zero blur and a non-zero offset |
| **inner and outer glow** | a coloured halo around a control | dated; and as a focus treatment it is a ring drawn badly | `ring`, `ring-width`, `ring-offset` | a `box-shadow` whose colour is the accent at low alpha |

## Colour

| shape | what it is | why not | instead | detectable as |
|---|---|---|---|---|
| **gradient fills on controls** | a button whose fill runs from one colour to another | **never was**, and the reason is mechanical rather than aesthetic: a gradient has two colours and a contrast pair can only be measured against one, so `fg-on-X` is correct at one end of the button and unverified at the other | a solid fill from the theme | `linear-gradient` or `radial-gradient` in the product's own CSS |
| **colour as the only carrier of a state** | selected, error or disabled shown by hue alone | **never was.** Invisible to a colour-blind reader, in a printout, and in a screenshot pasted into a ticket | a second channel — weight, a mark, a border. See `derivations.md` §V | not detectable in CSS; it is a review rule |
| **a rainbow scale for magnitude** | hue used to encode how much, rather than which kind | **never was.** A reader cannot order hues, so the chart says nothing its axis did not already say | a neutral ramp, or one accent at varying lightness | not detectable |
| **a second hue in a monochrome system** | one more colour, arriving for one component | it is the school being abandoned one component at a time, which is how it always goes | the neutral ladder, which has rungs left | a second chromatic value in the theme map |

## Controls

| shape | what it is | why not | instead | detectable as |
|---|---|---|---|---|
| **placeholder as the only label** | the field's name lives in its placeholder | **never was.** It disappears the moment someone types, so the one time a user needs to check what they are filling in is the one time it is gone. It also fails on autofill | a label above the field, always. Placeholder for an EXAMPLE of the value, never for its name | an `input` with `placeholder` and no associated `label` |
| **a switch for a value that is submitted later** | an on/off control inside a form with a save button | it promises immediate effect and does not deliver it | a checkbox, which promises nothing until submit | not detectable in CSS |
| **a control that grows on hover** | scale or size change under the cursor | it moves its own neighbours, and on a list it slides the row away from the pointer aiming at it. See `derivations.md` §N | a background step | `transform: scale` inside a `:hover` |
| **disabled styled only by opacity** | the control faded to 40% | the label goes below any contrast threshold, and nothing says WHY it is disabled | `bg-disabled` and `fg-disabled`, with the reason beside it | `opacity` under `:disabled` with no colour change |

## Layout

| shape | what it is | why not | instead | detectable as |
|---|---|---|---|---|
| **a carousel as the only route to content** | items reachable only by paging sideways | **never was** in the sense that matters: everything past the first slide is reached by a fraction of readers, so it is a way of hiding content while appearing to show it | a grid, or a row that scrolls with its edge visible. `component-forms.md` offers both | not detectable |
| **auto-advancing anything** | a carousel or banner that moves on its own | it moves while being read, and it takes control from someone who was using it | advance on interaction only | a `setInterval` driving a slide index |
| **scroll-jacking** | the page overriding how far a scroll goes | it breaks the one interaction every user already knows | let the page scroll | `preventDefault` on a wheel or touchmove listener |
| **parallax on content** | background and foreground moving at different rates behind text | it is motion under text being read, and it is the first thing `prefers-reduced-motion` has to remove | a static image, or motion on decoration only | a scroll listener writing `transform` |
| **a splash screen before content** | a branded interstitial on the way in | it spends the user's first seconds on something they did not ask for | the content, with a skeleton while it loads | not detectable |
| **a hamburger as the only desktop navigation** | destinations hidden behind a menu on a wide screen | it hides navigation to buy room a desktop already has | a top bar or a rail. `layout-forms.md` offers both | not detectable |

---

## Making an entry enforceable

The `detectable as` column is the same test question 22 asks of every
restriction: **how would we know it was broken?** An entry with a signature can
become a rule that fails a build; one without stays a review note, and saying so
honestly is better than pretending the list is enforced.

The detectable ones belong in `guardrails` in `DESIGN_LANGUAGE.md` with
`enforcement: stylelint`, and they are worth adding on the day the system is
generated rather than after the first review that finds one:

```yaml
guardrails:
  - rule: no gradient fills
    because: a gradient has two colours and a contrast pair can measure one
    enforcement: stylelint
    signature: linear-gradient|radial-gradient
```

**A restriction the archetype already implies does not need repeating here.**
Three of the five archetypes rule out gradients on their own, and question 22a
confirms those as already held. This file is for what no archetype covers.

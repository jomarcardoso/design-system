<!-- skills/design-language/references/monochrome.md -->

# The monochrome school

The reference for `colourStrategy: monochrome`. `colour-strategies.md` says what
the three schools ARE and which token names each emits; this one is what the
monochrome school COSTS, and it exists because the tool shipped a build that was
technically monochrome and generically like its library.

**Vocabulary note.** "Accent-driven" and "monochrome" are the same assignment
pattern. This tool says `monochrome`, because that names the constraint — one
live colour, everything else neutral — while "accent-driven" names the
consequence.

---

## 1. What the school is, and what it charges

Not "an interface without colour". A rule of economy:

> **There is exactly one live chromatic pigment in the system, and it is spent
> with parsimony. Everything else is a ladder of neutrals.**

What it buys:

- **Meaning by scarcity.** If one thing on the screen is coloured, that thing is
  important without any other cue. In a `functional` school blue, green, purple
  and orange compete, and the user has to learn the code before reading the
  screen.
- **Cheap white-label.** Changing the pigment changes the product's personality
  without touching a semantic token. A system with one colour is a system with
  one parameter.
- **Predictable dark mode.** Fewer live hues, fewer places where contrast breaks
  on inversion.

**What it charges, and this is the part almost everyone underestimates:** when
colour goes, hierarchy, grouping and state have to be carried by **space,
neutral tone, typography and shape**. In a `brand` school you can have mediocre
typography and arbitrary spacing and still look like a product, because the
brand colour stitches everything together. Here that becomes visibly bad.

> **The school is cheaper to maintain and more expensive to design.**

And the consequence nobody anticipates:

> **In `monochrome`, TREATMENT replaces HUE as the differentiator.**

Everywhere else "primary action" is blue and "selected" is purple. Here both are
the same pigment, so the difference has to be expressed in HOW the pigment is
applied. This tool learned that the hard way — see §7.

---

## 2. Two numbering systems, and the word that confuses them

The single most common source of confusion in this file's source material, and
worth fixing permanently:

| | |
|---|---|
| **the ramp** | twelve steps. A list of VALUES. It does not know what a page or a card is. It only says "this is the third-lightest tone" |
| **surface levels** | three or four ROLES with NAMES — page, surface, raised, sunken. Each one CONSUMES a rung |

> **Surface levels are few and have names. Rungs are twelve and have numbers.
> Never number a surface.**

"Rung 3" was never a surface level. It is the rung the ramp reserves for **the
resting fill of an element** — badge, chip, tag, neutral secondary button, table
row hover. Borders live at 6, 7 and 8, which are different and darker rungs.
There is no collision; there was one word for two scales.

### The rungs and their jobs

Radix Colors' twelve-step model is the clearest articulation of this in public,
and the structure — not the hexadecimals — is what is worth taking.

| rung | job |
|---|---|
| 1 | the page |
| 2 | subtle surface, row hover |
| 3 | **an element's resting fill** — badge, chip, tag, secondary button |
| 4 | the same element on hover |
| 5 | the same element pressed or selected |
| 6 | a dividing border — hairline, decorative |
| 7 | an interactive element's border at rest |
| 8 | border on hover, and the focus ring |
| 9 | **the solid fill** — the accent's "pure" colour |
| 10 | the solid fill on hover |
| 11 | **low-contrast text** — ≥4.5:1 against 1–3 |
| 12 | high-contrast text, headings |

**The table is worth more than any palette**: it says 3, 6, 7, 9 and 11 are
DIFFERENT jobs, and skipping one is what makes a technically-monochrome build
look generic. **Rung 3 is the most forgotten of all** — which is why
`npm run report:orphans` exists and groups the subtle fills first.

The ramp runs twice, once for neutrals and once for the accent. Twenty-four
values build a whole system.

### The same level is a different rung per surface model

| | `elevated` | `recessed` | `flat` |
|---|---|---|---|
| page | 2 | 1 | 1 |
| card | 1 | 2 | 1 + divider (6) |
| a local well (an input) | 2 | 2 | 2 |
| an element at rest inside the card | 3 | 3 | 3 |

Note the problem `elevated` creates: a badge at rung 3 sits one rung from a page
at rung 2 and nearly disappears. **That is the case §5 is for.**

---

## 3. The neutral ladder is the school's real product

The common mistake is thinking the important decision is which accent to pick.
It is not. It is the neutral ladder.

**Pure greys are almost never the answer.** A grey carrying a little of the
accent's hue makes the interface look intentional; a pure grey beside a warm
accent looks like somebody forgot to choose. This is what `ramp.neutral($seed,
$pigment)` is for.

**The useful chroma band is 2% to 8%.** Above that the "neutral" starts reading
as colour and the accent's scarcity dilutes.

> **Measured in the accent-driven example: the page sits at 0.6% chroma,
> `neutral-subtle` at 1.3%, the ink at 1.6% — all below the band.** Recorded as
> a measurement rather than acted on, because the client approved those colours
> deliberately. It is the first thing to try if a monochrome build reads flat.

**Work in OKLCH, not HSL.** In HSL two colours with the same declared lightness
have completely different perceived luminance, so a ladder built in HSL has
steps that are not steps. This tool's layer 1 is OKLCH already.

**What the school does NOT change:** `success`, `warning`, `danger` and `info`
stay chromatic. A destructive confirmation is red in every school. Making danger
monochrome trades a universal convention for aesthetic coherence.

---

## 4. Which mechanism carries which boundary

Fully derived in [`derivations.md`](derivations.md) §Z, with the four mechanisms
in order of visual cost, the five situations where space fails, and the ceiling
of two tone levels. `npm run verify:mechanism` enforces the one rule that
matters: **one boundary, one mechanism**, with the interactive exception.

Three things that belong here rather than there:

**Excavation is almost always one level, and it is local.** An input inside a
card, a well inside a page. "Excavated inside the excavated" is not legible: the
second level disappears, and in dark mode it hits the floor and becomes black on
black. If you feel the need to excavate twice, what you want is not depth — it
is separation, and the answer is space or a divider.

**Excavation has a floor and elevation does not.** In dark mode you reach black
quickly and "darker than the background" stops existing. A system depending on
excavation in light must switch to elevation or to a border in dark. Elevation
never has this problem, because there is always more lightness available.

**You cannot alternate models.** Elevation for cards and excavation for the
container holding them, on the same screen, produces a page where the eye cannot
establish which plane is the floor. Choose one page model and use the other only
for local containers — inputs, wells — which are recognised as exceptions
precisely because they are small and interactive.

The test that decides which: **if you could drag this element off the screen,
would it still make sense alone?** A recipe card yes. A search field no. The
first is an object and elevates; the second is a container and excavates.

---

## 5. Recalculating by context

The problem: a badge at rung 3 on a page at rung 1 works. The same badge inside
a card at rung 3 disappears. Three mechanisms solve it.

**Alpha.** `rgb(0 0 0 / 0.06)` instead of an absolute colour. The component
recalculates itself over any background with no context at all. Costs one token
and solves most cases. The price: **compile-time auditing is lost**, because the
final value depends on what is underneath, and over chromatic or very dark
surfaces it goes muddy. Radix Colors publishes a full alpha scale beside every
solid scale for exactly this reason.

**Explicit surface context.** An attribute that redeclares a handful of
variables for the subtree:

```scss
[data-surface='sunken'] {
  --app-bg-neutral-subtle: #{rung(4)};   // one rung up
  --app-border-interactive: #{rung(7)};
}
```

Auditable, works on any background, and this tool's subtheme architecture
already supports it.

**The hybrid worth adopting: alpha for what is decorative — dividers, hairlines,
hover fills — and explicit context for what has a contrast requirement — text,
interactive borders, focus, accent.** The build then audits exactly what needs
auditing and the rest adapts for free.

**And `transparent` as the default border, with the context declaring a value.**
The component always writes `border: 1px solid var(--app-border-…)`, so the
layout never shifts — which avoids the 1px jump of adding a border
conditionally. This tool does the reverse today, and the note is here because
whoever writes the next adapter should know both shapes exist.

### What the libraries do

**Bootstrap 5.3 has an exit almost nobody uses.** `data-bs-theme` is **not
limited to light and dark**: `[data-bs-theme="sunken"]` with its own `--bs-*`
set rescopes everything for a subtree. Explicit surface context exists in
Bootstrap and is documented as "colour mode". The annoyance that remains is that
its components declare borders by default, so removing one means zeroing a
variable rather than not adding one.

**Radix Themes** implements the same thing as a nestable `Theme` component, and
is the most complete of the three.

**shadcn/ui does not solve it.** A flat set of variables and one border value
for the whole app; a `.dark` class swaps all of them at once, which is not the
same as surface context. This is a real limitation, and one reason large shadcn
projects end up with literal values scattered around.

---

## 6. Contrast, measured properly

The targets and the ΔL table are in `derivations.md` §Z. Two things belong here.

**The cross test is what catches bugs**, because the worst case is almost never
against rung 1:

| pair | target | why |
|---|---|---|
| 11 against 1, 2 **and 3** | ≥4.5:1 | secondary text has to pass over the component fill too, which is the worst case |
| 12 against 1, 2 and 3 | ≥7:1 | headings, with room to spare |
| 7 against 1 **and 3** | ≥1.8:1 | an input's border must show on the page AND inside a card |
| 8 against 1 and 2 | ≥3:1 | required — focus |
| 9 against 1 and 2 | ≥3:1 | a solid button is a UI component |
| on-accent against 9 | ≥4.5:1 | the inverted label |
| **accent 11 against accent 3** | ≥4.5:1 | the washed fill with accent ink — **the most forgotten pair** |
| accent 11 against neutral 1 | ≥4.5:1 | a link in running text |
| 6 against 1 | 1.3–2.0:1 | a divider. **Above 2.5 the page is striped** |

This tool measures text against its own background in every theme
(`audit:contrast`). **It does not yet run the cross test.** Recorded as a gap.

**Verify in both themes against the same TARGETS, not the same values.** A ΔL of
0.03 in light does not produce the same perceived separation in dark, because
the eye's sensitivity to luminance differences falls in the dark ranges. In
practice the dark theme needs 1.3× to 1.5× more ΔL at the low rungs.

---

## 7. Where the two sources disagreed

Recorded rather than hidden, because the disagreement is instructive.

One source said **a subtle fill's border must carry 3:1**. Another gave finer
numbers — divider 1.2–1.5:1, interactive border at rest 1.6–2:1, focus and
selection 3:1 or more — and a better justification: **they are two different
legal requirements**, not aesthetics.

**The reading that reconciles them:** WCAG 1.4.11 asks for 3:1 for whatever
IDENTIFIES a control. If the fill is the only cue, the fill needs 3:1. If a
border is, the border does. A washed fill may sit at 1.1–1.3:1 against the page
and be correct, provided the border identifies the control.

The accent-driven example had neither, and that is the bug that produced this
file.

---

## 8. The rules that apply by looking

No tooling required.

- **The rule of one.** One boundary, one mechanism. One solid accent fill per
  viewport. One surface model per product. One permanent elevation level and one
  temporary.
- **The proximity ratio.** Space between groups is at least 1.5× the space
  inside a group. When it is not, no border will fix it — and "this screen is
  confusing, let us add lines" is almost always this ratio.
- **Two steps, not one.** Neighbouring hierarchy levels sit two steps apart on
  the type scale. Adjacent steps on a 1.2 ratio differ by 20%, which the eye
  reads as a mistake rather than as hierarchy.
- **Two levers, not four.** Each hierarchy level uses at most two of size,
  weight, colour rung and space.
- **Content first.** Before spending a mechanism, check whether the content
  already solved it. Photographs, charts, avatars and code blocks bring their
  own surface.
- **Filled versus washed.** Chromatic fill is invitation (`action`), chromatic
  wash is state (`selected`), neutral fill is the secondary action. If two roles
  come out the same, one is wrong.
- **Status untouched.** `danger` is red in every school.
- **The long-text rule.** A short label may carry accent ink on a washed fill. A
  sentence or a paragraph uses neutral ink.
- **Depth.** At most two stacked tone levels. The third changes mechanism, not
  tone.
- **Sticky.** A header at rest has no boundary. The boundary appears as a scroll
  STATE, which makes it a state token rather than a fixed value.

---

## 9. Naming, and the trap every library shares

Two axes that almost every library conflates:

| axis | values | what it describes |
|---|---|---|
| **hierarchy** | primary, secondary, tertiary | relative importance WITHIN a screen — a property of the composition |
| **treatment** | filled, tonal, outlined, text | how the pigment is applied — a property of the component |

The same treatment serves different hierarchies on different screens: an
outlined button is secondary beside a solid one, and primary on a screen where
it is the only button.

Carbon names by hierarchy (`kind`); Radix and Material name by treatment
(`variant`). **Bootstrap makes the worst of the three choices**: `btn-secondary`
is simultaneously a hierarchy and a colour, which is why nearly every Bootstrap
project ends up with a grey button that is also the selected menu item.

**For a framework-independent foundation: expose HIERARCHY in the API and
resolve TREATMENT in the theme.** `priority="secondary"` survives a change of
colour school; `variant="soft"` does not. Keep intent (`neutral`, `danger`) as a
third crossing axis, because "delete" exists at any hierarchy.

The mapping in this school:

| hierarchy | treatment | tokens |
|---|---|---|
| primary | solid accent | accent 9 + on-accent |
| secondary | neutral filled, or outlined | neutral 3 + neutral 12, border neutral 7 |
| tertiary | ghost, text only | neutral 11, no fill |
| destructive | the same ladder in `danger` | danger 9 / 3 / 11 |

**The secondary in `monochrome` is always NEUTRAL, never a washed accent.** In
`brand` the washed secondary is the norm because the brand colour is everywhere
already; here it steals the scarcity, which is the only thing the school has.

### The trap that recurs in every new library

**Bootstrap, daisyUI and Tailwind all use `secondary` for "grey neutral
button"**, which in this vocabulary is `neutral`, not `selected`. It reappears
in every library adapted from now on.

| | how it arrives |
|---|---|
| **Bootstrap** | `functional` by birth — six distinct hues. Remap `$primary` to the accent and `$secondary` to a neutral rung, **in the Sass `!default` variables before compiling**, never in CSS on top |
| **daisyUI** | nearly compatible already: `--p`, `--s`, `--a` plus the `base-100/200/300` family is a surface ladder with three roles. Pointing `--s` and `--a` at neutral rungs is one theme line |
| **Tailwind v4** | no school at all, just an OKLCH layer 1. The best base precisely because it has no opinion |

---

## 10. The order to design in

Counter-intuitive and the mistake almost everyone makes:

1. **The neutral ladder FIRST, before the accent.** Choose the neutral pigment
   and its chroma, build the twelve rungs, and lay out a whole screen in grey.
   Choosing the accent first means designing around it and the ladder becomes an
   afterthought.
2. **Prove the screen works with no accent.** A well-designed monochrome screen
   stays legible and hierarchical with zero colour. If you need the accent to
   know where to click, hierarchy is being carried by colour and you have built
   a `brand` school in disguise. **This is the school's central test.**
3. **Declare the surface model before drawing any component.** Two levels is the
   healthy ceiling.
4. **Write the accent budget as a NUMBER.** "One solid fill per viewport" is
   verifiable. "Use the accent sparingly" is not.
5. **Pick a type scale with more steps than seems necessary**, because it will
   carry the work colour no longer carries.

### The calibration test

**Build the same screen three times, one per school.** If the monochrome version
is visibly worse than the other two, the problem is not the absence of colour —
it is that space and typography are not doing their job yet.

That test is phase V of the improvement plan and is not implemented.

---

## 11. What this tool already does, and what it does not

| | |
|---|---|
| ✅ | OKLCH layer 1; a pigmented neutral ramp from a seed |
| ✅ | elevation becomes lightness in dark, never a shadow — `derive.dark()` |
| ✅ | the washed fill is a computed rung, never alpha over the background |
| ✅ | two border roles, wired, with the legal justification |
| ✅ | one boundary, one mechanism — `verify:mechanism` |
| ✅ | text measured against its own background in every theme |
| ✅ | the orphan report, which is how a skipped rung surfaces |
| ⚠️ | the neutral chroma sits below the 2–8% band in the worked example |
| ❌ | the CROSS contrast test — 11 against 3, 7 against 3 — is not run |
| ❌ | ΔL separation between adjacent surfaces is not measured, and no automatic checker anywhere measures it |
| ❌ | the alpha scale beside the solid scale, for decorative values |
| ❌ | accent-fill counting on a rendered page — "more than one solid per viewport" is a rule with no enforcement |
| ❌ | the three-school calibration test |

The four ❌ rows are the honest backlog. Three of them are cheap and one of them
— rendered-page counting — needs the browser the contrast audit already starts.

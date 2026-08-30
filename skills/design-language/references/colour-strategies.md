<!-- skills/design-language/references/colour-strategies.md -->

# Colour strategies

Two questions in the interview decide more of the generated system than any
other. They belong in block 4, right after the brand colour, and both have to
be asked — neither has a default that is right often enough to assume.

---

## Question A — how does this product assign colour?

There are three schools. They are **three assignment patterns over one
vocabulary**, not three vocabularies, and the answer sets
`config.$colour-strategy`.

|                   | `functional`               | `brand`                                    | `monochrome`                     |
| ----------------- | -------------------------- | ------------------------------------------ | -------------------------------- |
| **who**           | Atlassian, Shopify Polaris | Material, Bootstrap, Tailwind UI, **Itaú** | Apple HIG, Vercel, Radix         |
| **the idea**      | a colour per JOB           | the brand hue does several jobs            | one accent, everything else grey |
| `action`          | its own hue                | the brand hue                              | the accent                       |
| `selected`        | its own hue                | **the same brand hue**                     | the accent                       |
| `link`            | its own hue                | usually a second hue                       | the accent                       |
| **reads through** | colour                     | colour plus hierarchy                      | weight, shape and space          |

Ask it plainly:

> _"When something is CHOSEN — a selected tab, a ticked checkbox — does it
> take your main brand colour, or a different one?"_

That single question separates `functional` from `brand`, and it is a question
a client can answer without knowing any of this vocabulary.

> _"Is your interface one accent colour on greys, or several colours?"_

That separates `monochrome` from both.

### What the setting actually changes

**The token NAMES.** Each school emits its own vocabulary for the interactive
roles — `action` / `selected` / `link` in functional, `primary` /
`primary-container` in brand, `accent` in monochrome. Surfaces, ink, borders,
shadows and the whole status family are common to all three and keep one
spelling.

That split is recent and deliberate. Layer 2 used to be the UNION of what all
three schools need, so a monochrome product carried `bg-action`, `bg-selected`
and `fg-link` as three names it had to fill with the same value — three
decisions where the school says there is one. It also meant a school could quietly
start looking like another: a name that exists will eventually be pointed
somewhere new.

Adapters and layer 3 are unaffected. `core.ref('bg-action')` resolves through
`src/_roles.scss` at build time, so eleven adapters keep one code path and emit
`var(--app-bg-accent)` in a monochrome build.

It also changes which collapses `check-roles()` treats as a mistake:

- `functional` — warns when any two of `action` / `selected` / `link` share a value.
- `brand` — warns only when `action` and `link` collapse. The brand hue marking
  both the button and the chosen tab is the school, not a slip.
- `monochrome` — warns about none of it.

That narrowing is the point. The first version of the check warned on every
collapse and fired on both real systems reconstructed in this repository. **A
check that always fires teaches people to ignore it**, and then the one collapse
that IS a modelling error arrives in the same colour as the two that are not.

### Why there is no `primary` / `secondary` token

It is the obvious suggestion and it is a trap: a parallel `brand-primary` /
`ui-action` vocabulary gives every decision two names with no way to tell which
is authoritative. Adapters would have to pick one anyway, and a consumer reading
the wrong one gets a value that happens to work until someone re-aliases it.

This project deleted `fg-on-surface` for exactly that reason — an alias of
`fg-default` with zero readers, which cost three declarations per theme and made
two names correct for one job.

**The translation already happens at the adapter**, which is the layer whose
entire job is translation: Bootstrap's `primary` reads `action`, its `secondary`
reads `neutral`, Bulma's `link` family reads `selected`. A developer who types
`--app-bg-primary` gets nothing — and failing loudly beats two names quietly
disagreeing.

---

## Question B — what does a secondary action look like?

Seven treatments are in use. Six need no new token; the seventh is the layer 3
`accent-*` hook.

| treatment                      | tokens                                       | seen in                              |
| ------------------------------ | -------------------------------------------- | ------------------------------------ |
| outline, action hue            | `border-action` + `fg-action`                | common                               |
| **outline, second hue**        | the same two, pointed elsewhere in the theme | **Itaú** — orange fill, navy outline |
| lighter tone of the action     | `bg-action-subtle` + `fg-action`             | "soft" variants                      |
| lighter second tone            | the same two, pointed elsewhere              |                                      |
| **neutral**                    | `bg-neutral` + `fg-on-neutral`               | **Bootstrap, Pico, Preline, CoreUI** |
| ghost                          | transparent + `fg-action`                    | Vercel, Radix                        |
| **filled second brand colour** | layer 3 `accent-bg` / `accent-fg`            | daisyUI `secondary`                  |

The first six are the same two or three tokens pointed at different values, so
**switching between them never touches the product layer** — only `theme.scss`.
That was verified: the Booking and Itaú product layers are byte-for-byte what a
tinted-primary secondary would need, and the difference lives entirely in the
theme.

Ask it as an appearance question, because that is how a client thinks about it:

> _"Beside your main button, is the supporting action outlined, a soft tint, a
> plain grey, or a second brand colour?"_

### Why `accent` defaults to neutral

`accent-bg` used to default to `bg-selected`, so a library's third brand slot
rendered in the selection colour. That is a control that DOES something wearing
the colour that means something IS chosen, and a reader who sees it twice learns
the colour means nothing.

It defaults to `bg-neutral` now: _no second brand colour was declared, so this
reads as having no opinion_. A product with a third brand colour sets two
variables and has it.

---

## What the answers write

```scss
// From question A
@use 'ds/src/config' with ($colour-strategy: 'brand');

// From question A, into theme.scss
selected: <the brand hue>,   // 'brand'      — same as action
selected: <a second hue>,    // 'functional' — its own
selected: <the accent>,      // 'monochrome' — same as everything

// From question B, into theme.scss — nothing in the product layer moves
'action-text':   <the ink of the secondary treatment>,
'action-border': <its line>,
'action-subtle': <its tint>,
```

Record both answers in `DESIGN_LANGUAGE.md`. The strategy is the single most
load-bearing decision in the file: it is what a new component six months later
reads to know whether "chosen" gets its own colour.

---

## Accent-driven: the school that generates its own layer 1

`monochrome` — also sold as **Accent-Driven** or **Minimalist**, and all three
spellings are accepted in `config.$colour-strategy` — is the one school whose
layer 1 can be computed rather than chosen:

```scss
@use 'ds/src/ramp';

$paper: ramp.neutral(#8a7355, $pigment: 0.7);   // the neutral ladder
$pen:   ramp.chromatic(#005bac);                // the one live colour
```

Layer 2 then maps onto those two ramps **by ladder position** — canvas takes a
light step, body text a dark one, borders the middle — and because the mapping
is positional rather than a set of independent decisions, changing a pigment
moves the whole system without editing a semantic token. That is what makes the
white-label promise real, and it is the thing a client means when they say
"I want to try it in green".

**It does not transfer to the other two schools, and offering it there would be
a disservice.** `functional`'s layer 1 is several independently chosen hues —
one for what acts, one for what is chosen, one for where text goes — and which
hue plays which role is the design itself, not a rung. Generating it would be
generating the design. `brand` sits between: neutrals generated, brand hue given.

### The ladder has jobs, and using it is the school

This is the part most easily missed, and missing it produces the failure that
sounds like a compliment: a build that is technically monochrome and reads as
"one of the other schools with the colours removed".

The neutral ramp is not a range to pick from by eye. **Each rung has a job**, and
a product that only ever touches the two ends and the middle has spent three
steps out of twelve and left the school's whole vocabulary on the floor:

| rung | job | in the interface |
|---|---|---|
| 1 | canvas | the page |
| 2 | panel | sidebar, header, modal surface |
| 3 | **element at rest** | badge, chip, tag, resting secondary button, ghost hover |
| 4 · 5 | element hover · pressed | the same things being interacted with |
| 6 | divider | the line between two ingredients |
| 7 · 8 | interactive edge · its hover | the border of an input, of a selectable card |
| 9 · 10 | the one solid neutral · its hover | a filled button that carries no opinion |
| 11 | secondary ink | metadata, times, captions |
| 12 | primary ink | titles and body |

**Rung 3 is the one that decides whether the school looks like itself.** In an
accent-driven product the quiet neutral fill is everywhere — it is what a label
is made of — and there is exactly one accent, so anything that cannot be the
accent has to be able to hold a shape without inverting. Layer 2 carries it as
`bg-neutral-subtle`, which is a different token from `bg-neutral`: the solid
inverts its ink and is a *button*, this one keeps body ink and is a *label*.

The failure is concrete and was shipped once. With no quiet fill available, a
badge reached for the solid neutral, and a cooking time rendered as a small dark
button sitting beside the one primary action — two things competing for the eye
on a page whose premise is that one thing wins.

**Ask what the layout is allowed to spend.** Some accent-driven products keep
every layout surface on rung 1 and separate with lines only; others give the
header and the modal rung 2. Both are the school. The difference is visible on
every screen, and it is question 11d.

### The four follow-ups

Asked only when the answer is monochrome, because the other schools are handed
their palette. See question 10 in the questionnaire.

| answer                                       | writes              | why it matters |
| -------------------------------------------- | ------------------- | -------------- |
| accent strong enough for white ink, or pale? | `accentContrast`    | decides whether `on-accent` is measured light or dark — get it wrong and the contrast gate fails at the END of the build, after the palette has been derived from the wrong assumption |
| how much pigment is in the greys?            | `neutralPigment`    | a few thousandths of chroma; the difference between a notebook and a settings screen |
| line, tone or shadow between surfaces?       | `surfaceSeparation` | the school has no colour to spend on structure, so this carries it |

### What the school does NOT change

The **status family**. A destructive confirmation is red in Vercel too. "One
accent" governs the interface — what acts, what is chosen, where text goes — not
the four colours that carry meaning a shape cannot. Trimming the contract to
"about 17 colour tokens" by dropping status is a recurring suggestion and it
removes a functional requirement, not a school-specific luxury.

`info` is the honest exception: informational is the interface talking, so it
can take the interface's colour rather than a fifth hue nobody asked for.

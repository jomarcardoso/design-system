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

**No tokens.** All three schools use the same contract; what differs is which
values the theme points them at. What the setting changes is which collapses
`check-roles()` treats as a mistake:

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

Record both answers in `DESIGN-LANGUAGE.md`. The strategy is the single most
load-bearing decision in the file: it is what a new component six months later
reads to know whether "chosen" gets its own colour.

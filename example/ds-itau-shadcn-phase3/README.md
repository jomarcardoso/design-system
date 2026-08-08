# DS Itaú — shadcn/ui + Radix + Tailwind, phase 3

A reconstruction of **iDS**, the design system Itaú runs in production, built on
this foundation. Every token value was read out of the live site at runtime —
383 published custom properties — rather than sampled from a screenshot.

It is the first product here the foundation did not get to design, which makes
it the only real answer to "does this work on someone else's system".

> Not affiliated with Itaú Unibanco. A study, using publicly served CSS.

```bash
npm run build:example-itau
npm run verify        # includes this page in the ledger and contrast gates
```

---

## The question it was built to answer

iDS names its colours `primary` and `secondary`. This foundation names them
`action`, `selected`, `link` and `neutral`. The worry was that the two
vocabularies disagree, and that fitting one into the other would need a hack.

**They do not disagree, and it needed one change.**

iDS calls its category `action` — the same word this foundation uses — and
`primary` / `secondary` / `neutral` / `disabled` are **emphasis ranks inside
it**, not separate roles:

```
--ids_color_action_primary_base     #FF6200
--ids_color_action_secondary_base   #000066
--ids_color_action_neutral_base     #3B3B3B
--ids_color_action_disabled_base    #CFD1D3
```

So `primary`/`secondary` answer *how loud*, while `action`/`selected`/`link`
answer *what job*. Two axes, not two competing lists.

### The part that looked like a second brand colour and is not

Measured on the live page, every control using the navy is **transparent**:

| iDS class | fill | ink | line |
|---|---|---|---|
| `.ids-main-button` | orange | white | — |
| `.ids-main-button--secondary` | none | navy | navy |
| `.ids-contextual-button` | none | navy | navy 1px |
| `.ids-action-button` | none | navy | — |
| `.ids-link` | none | navy | — |

iDS's "secondary" is the **outline and text treatment of the action role**, not
a second fill. This contract already models that as `fg-action` (the action as
ink) and `border-action` (the action as a line) — the pair that exists so a
fill is never reused as text.

### The three ways to render a secondary action, and why none is baked in

A generator must reach all of them:

| approach | reads | used by |
|---|---|---|
| a lighter tone of the primary | `bg-action-subtle` + `fg-action` | tinted "soft" buttons |
| a neutral | `bg-neutral` + `fg-on-neutral` | Bootstrap, Pico, Preline, CoreUI |
| the brand's second colour | `border-action` + `fg-action` (outline), or the layer 3 `accent-*` hook (fill) | **Itaú** |

All three are one line apart in `patterns.scss`, and the ledger records which
one this product picked. Nothing in layer 2 prefers one.

### What `selected` turned out to be

**iDS has no selection token.** Nothing in its 383 variables matches
select / active / checked / current. The nearest thing is `text_highlight`,
which is the same orange as the primary action.

So this theme points `selected` at the action colour, `check-roles()` warns at
build time, and the warning is correct:

```
WARNING: theme "itau": "action" and "selected" are the SAME colour,
so a button and a selected chip are indistinguishable. …If it is
deliberate, record it; if not, move one a step or two.
```

It is deliberate, and it is recorded here and in `theme.scss`. That is the
mechanism working: the collapse is visible instead of silent. A product wanting
them apart moves one value and the warning goes away.

**Answer to "which of the five names is needed":** all four roles, and neither
`primary` nor `secondary`. Those two are ranks, and the rank a control gets is a
component decision — which is why they live in `patterns.scss` and not in
layer 2.

---

## What the foundation had to change

One thing, and it was a real limitation rather than an accommodation.

**`border-action` was hardcoded to the action fill.** Itaú's solid button is
orange and its outline button is navy, and there was no way to say so without
editing a vendored file. It is now an optional theme key that still defaults to
the fill, so no existing theme moved:

```scss
'border-action': _opt($c, 'action-border', action, $name),
```

Everything else fitted: 126 tokens, one new adapter, no new roles.

---

## What the gates caught

Six things, none of which anyone was looking for.

| | found by |
|---|---|
| **The brand's primary button is 3.00:1.** White on `#FF6200`, below the 4.5 floor — a decision the bank shipped, legitimate for the 20px bold label it carries. | build-time contrast gate |
| **`selected-text` at 2.91:1** on the sunken grey. iDS reuses `#FF6200` as a text colour; it needed a dedicated ink step. | build-time contrast gate |
| **`action` and `selected` collapse.** | `check-roles()` |
| **23 hex literals in `theme.scss`.** A theme assigns meaning; literals belong to layer 1. They moved to `palette.scss`. | stylelint |
| **A translucent white hover** no theme could reach. | stylelint |
| **The navy text button rendered black.** `ds.css` registered `components` before `tw.css` declared the order, so Tailwind's preflight beat the product layer. | measuring the computed colour |

The contrast floor is lowered to **3** in `ds.scss`, with the reason written
there and mirrored in `audit-contrast.mjs` so the two gates agree. It protects
exactly one known pair: every other pair in the theme measures ≥ 5.10.

---

## What this example added to the foundation

- **`src/adapters/_shadcn.scss`** — the eleventh adapter. shadcn is copied
  source, so there is no vendor CSS to override; what it ships is a naming
  contract, and the adapter fills it.
- **A product's own layer 1.** `palette.scss` is the brand's palette, in the
  product. Before this the only path was editing the tool's `_base.scss`, which
  no client would accept.
- **`example/**/palette.scss` excepted in stylelint**, for the same reason
  `src/_base.scss` is: literals are legal in layer 1 and nowhere else.
- **A per-page contrast floor** in the rendered audit, so a product that
  lowered its build floor for a recorded reason does not fail a second gate for
  the same decision.
- **The disabled check now walks ancestors.** A disabled control's *label* is
  not the control, and the audit was reporting it at 2.85:1.

---

## The review round — nine notes, and which mechanism fixed each

A design review compared the page against the live site. The interesting result
is not that the notes were right; it is **which layer each fix landed in**,
because that is the actual test of whether the tool can absorb a brand it did
not design.

| # | note | fixed in | new tokens |
|---|---|---|---|
| 1 | secondary hover: pale blue fill, darker blue ink and line | **theme** — `action-subtle` is navy here, not a pale orange | 0 |
| 2 | primary hover should darken | **Tailwind bridge** — publish `bg-action-hover` as a utility | 0 |
| 3 | on-brand hover was inverted (went dark, should go white) | **context** — one `[data-surface="brand"]` block | 0 |
| 4 | focused field: thicker AND orange | **layer 3** — `field-border-color-focus`, a name already reserved | 0 |
| 5 | black cancel button is out of pattern | **markup + ledger** — it becomes a text button, and a filled neutral is now `forbidden` | 0 |
| 6 | card hover changes colour | **theme + product class** — neutral wash on hover, brand border on *selected* | 0 |
| 7 | icons go brand-coloured on card hover | **product class** reading `fg-selected` | 0 |
| 8 | caret is the brand colour | **one declaration** reading `bg-action` | 0 |
| 9 | accordion hover darkens its rule | **one declaration** reading `border-color-strong` | 0 |

**Nine notes, zero new semantic tokens, and one reserved layer 3 name used for
the first time.** Three of the nine did not need a rule written at all — they
were a theme value, a bridge line and a context.

Two of them are worth reading closely.

**#3 is the argument for contexts.** iDS ships an `--on-brand` modifier on four
components (`main-button`, `action-button`, `contextual-button`, `icon-button`)
and would need a fifth the day a fifth component appears. Here it is one block
that re-points `fg-action`, `border-action` and `bg-action-subtle`, and every
control inside the band follows with no variant class. The original bug — hover
going darker instead of lighter — existed *because* it was written as a variant:
a second place to get the direction wrong.

**#1 is the argument for the four joints.** `bg-action`, `bg-action-subtle`,
`fg-action` and `border-action` are independent theme keys, so this brand can
have an orange SOLID and a navy QUIET treatment of the same role. The rules in
`patterns.scss` are byte-for-byte what a tinted-orange secondary would need;
only the theme differs. Swapping between the three secondary-action approaches
never touches the product layer.

### And a silent failure the round exposed

The icon in #7 stayed black after the fix. The class was right, the token was
right, and the **bridge between them was missing** — `--color-fg-selected` was
not in the `@theme` block, so Tailwind generated no rule at all.

That is worse than a wrong colour, because a wrong colour is visible. It is now
`scripts/check-utilities.mjs`, wired into `npm run verify`: every themed
utility in the markup must appear as a selector in the compiled CSS.

```
ds-itau-shadcn-phase3/index.html: 34 themed utilities, all generated.
```

## Known limits

**The ledger cannot see a utility-composed component.** `verify-patterns.mjs`
reads `class` attributes, and a shadcn Button is a string of Tailwind
utilities with nothing stable to match. So the ledger governs what this product
*named* — the `ids-*` classes — which happens to be exactly the set of
divergences worth counting. shadcn emits `data-slot="button"` in the markup and
that is a real seam; reading attributes is not implemented.

**`wrapped` has no word for "ours, from scratch".** The pagination dots are the
product's own component, not a wrapped library one, and the ledger's vocabulary
made them `styled`.

**The brand faces are licensed.** `Itau Display` and `Itau Text` are named first
in the stacks and fall back to Inter. The page is metrically close, not
identical.

<!-- example/ds-cyberpunk-bulma-phase2/README.md -->

# DS Cyberpunk with Bulma — phase 2

A second product on the same foundation, deliberately disagreeing with the first
one. Dark by default with no light counterpart, neon cyan and magenta as the two
brand roles, Bulma instead of Bootstrap.

Open it with a **trailing slash**:
<http://localhost:4173/example/ds-cyberpunk-bulma-phase2/>

## What phase 2 is

Buttons and cards have been **promoted to semantic classes** — the markup says
`cp-btn-primary` and `cp-card`, never `button is-primary` or `card`. Removing
Bulma from those edits `patterns.scss` and nothing else.

The menu, the form controls and the table are still `raw`. **Mixed maturity is
the normal state of a real ledger**: nothing about those components has diverged
from Bulma yet, so promoting them would produce classes with no declarations of
their own — a rename, not a promotion.

```
button     4 allowed  raw 0 (0%)  styled 4 (100%)  forbidden 3
card       1 allowed  raw 0 (0%)  styled 1 (100%)
nav        3 allowed  raw 3 (100%)
field      5 allowed  raw 5 (100%)
```

Compare with Hot Tone: ten button patterns, all raw. This product narrowed to
four as the vocabulary settled. **That narrowing is the metric** — not the
number of libraries supported.

There is no component framework here, so phase 2 is where this product stops.
That is a complete design system, not an unfinished one: a wrapper would add a
second spelling of the same decision without removing any coupling.

## The page writes no CSS

`index.html` has no `<style>` block. Layout and typography are Bulma's own —
`container`, `columns`, `level`, `menu`, `card`, `table`, `field`/`control`,
`title`/`subtitle`, `footer`. The only stylesheet is `ds.css`, which is the
product's design system.

## Files

| File | What it is |
|---|---|
| `patterns.json` | the ledger — four components, mixed `styled` and `raw` |
| `patterns.scss` | **phase 2 itself**: the semantic classes |
| `theme.scss` | the palette |
| `ds.scss` | the build, compiling Bulma from source so `@extend` can reach it |
| `index.html` | markup with zero library classes |

## Running it

```bash
npm run demo:examples
```

```bash
node scripts/verify-patterns.mjs example/ds-cyberpunk-bulma-phase2 --ledger example/ds-cyberpunk-bulma-phase2/patterns.json
```

```
button     4 allowed  raw 0 (0%)  styled 4 (100%)  wrapped 0 (0%)  forbidden 5
```

Writing `class="button is-primary"` in this project now **fails** — not because
it is forbidden, but because that pattern was promoted and the call site is
supposed to have stopped naming the library. The check says so in those words,
because the developer is right about the design and wrong about the phase.

## Four things these examples forced into the tool

None had been hit while the only themes were the ones shipped with the tool and
the only pages were component galleries:

1. **Adapters could not see a project's theme.** `bootstrap.emit()` and
   `bulma.emit()` read the built-in registry, so a product that turned the demo
   themes off and emitted its own could not build at all. Both now accept a
   `name: choices` map, and omitting it keeps the old behaviour.
2. **`rgb-triplet()` did not gamut-map.** The warm orange in the Hot Tone
   example is outside sRGB, and Bootstrap's triplet came out as
   `202, 53, -25`. A browser clamps a negative channel, so it looked fine until
   the value reached a `color-mix()`.
3. **Two surface triplets were missing.** `.bg-body-tertiary` paints with
   `--bs-tertiary-bg-rgb`, not the `--bs-tertiary-bg` the adapter was binding,
   so the navbar stayed neutral grey on a warm page. Same shape as the
   `--bs-link-color-rgb` bug: the variable existed, was spelled right, and was
   never the one consumed. Invisible until a theme that is not grey existed.
4. **A component's namespace needed a `root`.** Bulma shares `is-*` modifiers
   across components, so the button namespace claimed `is-fullwidth` on a
   `.select` and reported it as an unknown button variant. A component now
   declares which class MAKES an element that component, and the namespace is
   only consulted there. Bootstrap needs no `root` — its prefixes are
   unambiguous — so the field defaults to the namespace.

## Why `@extend` and a legacy `@import`

`@extend` keeps Bulma as the single source of the button's anatomy — padding,
focus, disabled — so the semantic class only carries the divergence. If a class
in `patterns.scss` ends up with no declarations of its own, it did not earn
promotion; it was a rename.

`@extend` can only reach selectors in the same scope, and `@use` puts a module
in its own, so `ds.scss` pulls Bulma in with a nested `@import` inside
`@layer vendor`. Sass warns that `@import` is deprecated. There is currently no
module-system replacement for extending a third-party library, so the warning is
expected here; the build silences it explicitly rather than hiding it.

## Decisions worth arguing with

- **`ghost` is allowed** — absent from Hot Tone's vocabulary. Same trade-off, opposite
  conclusion, because this product's panels have visible chrome so a borderless
  control still has a findable position.
- **`is-large` and `is-medium` are refused.** Emphasis is what the pattern name
  carries; size as a second emphasis channel eventually contradicts it.
- **`is-text` is refused** even though Bulma ships it, because `ghost` already
  does that job. Two patterns for one job is how a vocabulary grows without
  anyone deciding to.

# DS Cyberpunk with Bulma — phase 2

A second product on the same foundation, deliberately disagreeing with the first
one. Dark by default with no light counterpart, neon cyan and magenta as the two
brand roles, Bulma instead of Bootstrap.

## What phase 2 is

Every allowed pattern has been **promoted to a semantic class**. The markup
contains no Bulma classes at all — not `button`, not `is-primary`. Removing
Bulma from this product edits `patterns.scss` and nothing else.

There is no component framework here, so phase 2 is where this product stops.
That is a complete design system, not an unfinished one: a wrapper would add a
second spelling of the same decision without removing any coupling.

## Files

| File | What it is |
|---|---|
| `patterns.json` | the ledger — four patterns at `styled`, five refusals |
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

Compare with Hot Tone's 100% `raw`. That difference is the whole point of the
`state` field: maturity becomes a number rather than an impression.

Writing `class="button is-primary"` in this project now **fails** — not because
it is forbidden, but because that pattern was promoted and the call site is
supposed to have stopped naming the library. The check says so in those words,
because the developer is right about the design and wrong about the phase.

## Two things this example forced into the tool

Both were limitations nobody had hit while the only themes were the ones
shipped with the tool:

1. **Adapters could not see a project's theme.** `bootstrap.emit()` and
   `bulma.emit()` read the built-in registry, so a product that turned the demo
   themes off and emitted its own could not build at all. Both now accept a
   `name: choices` map, and omitting it keeps the old behaviour.
2. **`rgb-triplet()` did not gamut-map.** The warm orange in the Hot Tone
   example is outside sRGB, and Bootstrap's triplet came out as
   `202, 53, -25`. A browser clamps a negative channel, so it looked fine until
   the value reached a `color-mix()`.

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

- **`ghost` is allowed** — forbidden in Hot Tone. Same trade-off, opposite
  conclusion, because this product's panels have visible chrome so a borderless
  control still has a findable position.
- **`is-large` and `is-medium` are refused.** Emphasis is what the pattern name
  carries; size as a second emphasis channel eventually contradicts it.
- **`is-text` is refused** even though Bulma ships it, because `ghost` already
  does that job. Two patterns for one job is how a vocabulary grows without
  anyone deciding to.

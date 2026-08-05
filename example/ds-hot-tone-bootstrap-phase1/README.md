# DS Hot Tone with Bootstrap — phase 1

A product design system built **with** this tool. Nothing here is part of the
tool: the palette, the vocabulary and every decision are this product's, and a
different product reaches different ones — see the Cyberpunk example.

Open it with a **trailing slash**:
<http://localhost:4173/example/ds-hot-tone-bootstrap-phase1/>

## What phase 1 is

The vocabulary is recorded and enforced, and **no abstraction has been
written**. Markup carries Bootstrap classes; what changed is that an agent
consults the ledger before emitting any of them, and the check fails on
anything outside it.

Phase 1 is also **wide on purpose**. Ten button patterns, close to what
Bootstrap's own documentation shows, because a product this early has not
earned the right to narrow yet. Narrowing is what maturing looks like, and the
Cyberpunk example is what it looks like once it has happened.

```
button    10 allowed  raw 10 (100%)  styled 0 (0%)  forbidden 1
card       1 allowed  raw  1 (100%)
nav        3 allowed  raw  3 (100%)
field      4 allowed  raw  4 (100%)
```

## The page writes no CSS

`index.html` has no `<style>` block and no stylesheet of its own. Layout,
spacing, typography and every state come from Bootstrap's own utilities and
components — `container`, `row`/`col`, `d-flex gap-2`, `card`, `list-group`,
`navbar`, `table`, `text-body-secondary`.

That is the point of building on a library. CSS written here would be a third
thing that can disagree with the other two, and every line of it would need
maintaining after the library updates.

## Files

| File | What it is |
|---|---|
| `patterns.json` | the ledger: four components, eighteen patterns, one refusal |
| `theme.scss` | the palette, as a theme map |
| `ds.scss` | the build — layers assembled, the tool's demo themes turned off |
| `app.css` | cascade layer order and the token-driven baseline |
| `index.html` | a real screen: header, nav, sidebar menu, cards, table, form, footer |

## Running it

```bash
npm run demo:examples
```

```bash
node scripts/verify-patterns.mjs example/ds-hot-tone-bootstrap-phase1 --ledger example/ds-hot-tone-bootstrap-phase1/patterns.json
```

Add a `btn-light` anywhere and it fails with the reason this product recorded.

## Decisions worth arguing with

- **Status buttons are allowed** — `success`, `warning`, `danger`, `info`. A
  kitchen screen genuinely has a "mark ready" and a "cancel order", and both
  read faster in colour. The Cyberpunk example forbids them; both are
  defensible, and the difference is the product, not the tool.
- **Outline is a separate pattern, not a modifier.** Bootstrap renames the
  class (`btn-outline-primary`) rather than adding one, so it cannot be an
  additive modifier. Bulma does add one (`is-outlined`), which is why the same
  visual idea is modelled differently in the other example — and why `intent`,
  not the class name, is the field that survives a library change.
- **One refusal so far**, `btn-light`/`btn-dark`. Not taste: absolute palette
  names do not invert with a theme, which this project measured while building
  the adapters. Refusals that rest on a fact age better than refusals that rest
  on a preference.
- **The ledger governs the root class only.** `card-body`, `nav-link` and the
  rest are Bootstrap's anatomy. A ledger that enumerated them would be
  redocumenting the library.

## What phase 2 would change here

`secondary-outline` is the first candidate — five call sites already, and this
product wants a heavier border than Bootstrap draws. Promoting it means writing
one class in SCSS, filling the `styled` slot and changing `state`. See the
Cyberpunk example for the result.

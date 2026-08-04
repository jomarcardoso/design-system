# DS Hot Tone with Bootstrap — phase 1

A product design system built **with** this tool. Nothing here is part of the
tool: the palette, the vocabulary and every refusal are this product's
decisions, and a different product would reach different ones.

## What phase 1 is

The vocabulary is closed and enforced, and **no abstraction has been written**.
Markup still carries Bootstrap classes; what changed is that only four
combinations of them are allowed, and an agent consults the ledger before
emitting any of them.

That is the cheapest useful state of a design system. It costs one JSON file
and it already stops the drift — no SCSS, no components, nothing to maintain.

## Files

| File | What it is |
|---|---|
| `patterns.json` | the ledger: four allowed patterns, four refusals, one modifier axis |
| `theme.scss` | the palette, as a theme map |
| `ds.scss` | the build: layers assembled, the tool's demo themes turned off |
| `app.css` | cascade layer order and the token-driven baseline |
| `index.html` | conforming markup |

## Running it

```bash
npm run demo:examples
```

Then open `index.html`, and check the markup against the ledger:

```bash
node scripts/verify-patterns.mjs example/ds-hot-tone-bootstrap-phase1 --ledger example/ds-hot-tone-bootstrap-phase1/patterns.json
```

```
button     4 allowed  raw 4 (100%)  styled 0 (0%)  wrapped 0 (0%)  forbidden 4
```

100% `raw` is the honest description of phase 1. Add a `btn-success` to
`index.html` and the check fails with the reason this product recorded.

## Decisions worth arguing with

These are the product's, not the tool's, and they are written down so they can
be challenged rather than inherited:

- **`quiet` is allowed**, on the condition that it appears inside table rows
  where the affordance is already established. The Cyberpunk example forbids the
  equivalent pattern. Both are defensible.
- **`btn-lg` is allowed**, because this product's landing pages are its front
  door. Cyberpunk forbids it as emphasis expressed twice.
- **Status-coloured buttons are refused** — `success`, `warning`, `info`. A
  button proposes an action that has not happened; status colour reports an
  outcome that has.
- **`destructive`, not `danger`.** The name says what the button does rather
  than which colour it borrows, so the colour can change and the name still
  holds.

## What phase 2 would change here

`secondary` is the first candidate: it already composes two classes and this
product wants a heavier border than Bootstrap draws. Promoting it means writing
`.ht-btn-secondary` in SCSS, setting `styled` in the ledger and changing
`state`. See the Cyberpunk example for the result.

<!-- example/ds-carmageddon-nescss-phase3/README.md -->

# DS Carmageddon with NES.css — phase 3

A third product on the same foundation: a race HUD in pixel art, built on
NES.css. Rust, blood and bone on scorched asphalt, one theme, no light
counterpart.

Open it with a **trailing slash**:
<http://localhost:4173/example/ds-carmageddon-nescss-phase3/>

The generated pattern documentation is at
[`docs.html`](http://localhost:4173/example/ds-carmageddon-nescss-phase3/docs.html).

## What phase 3 is

Phase 3 is **documentation**, and the two rules that make it phase 3 rather than
a second website to maintain were decided before the generator existed:

1. **The docs are a delta, never a catalogue.** They describe where this product
   diverges from NES.css and the components NES.css does not have. Everything
   used unchanged gets a name, an intent and a link to the library's own
   documentation — deliberately not enough to build from without opening it,
   because opening it is the right thing to do for a component nobody changed.
2. **They are generated from the ledger.** Every fact on the page comes from
   `patterns.json`, the same file the verifier enforces and an agent reads.
   Hand-writing the page would make it the third place a decision lives.

```bash
npm run docs:carmageddon
```

```
docs.html — 5 compositions, 1 overrides, 11 raw, 6 styled, 0 forbidden
```

Examples on that page are **rendered live** from the ledger's `example` field,
against this product's real stylesheet, beside their own source. A documentation
example that is a screenshot goes stale without anyone noticing.

## There is almost nothing to override, and that is the finding

NES.css is already most of a design system: one look, applied consistently,
variants named by intent rather than by colour. After the adapter re-pointed the
colours, exactly **one** override was left — and it exists for a structural
reason, not a cosmetic one:

| | |
|---|---|
| `cm-panel` | NES.css centres a container's title over its border, which is right for a dialogue and wrong inside a HUD grid, where the overhang breaks alignment with the panel beside it. |

Compare with the Cyberpunk example, where four of five button patterns had to be
promoted. The amount of work an adopting product does is a property of the
library it adopted, not of this foundation.

## What it DOES need is components the library has never heard of

A race HUD needs a labelled counter, an opponent entry and a damage meter.
NES.css is built for menus and dialogues and has none of them. These are the
five compositions, and they are the reason the documentation page is worth
generating at all — nobody can look them up in the library's docs, because they
are not there.

- `cm-stat` / `cm-stat--critical` — a labelled counter, and the same counter
  when its number is bad news
- `cm-driver` / `cm-driver.is-selected` — an opponent, and the one being hunted
- `cm-damage` — a labelled meter built **on** `.nes-progress`, so the pixel bar,
  its border and its three browser-specific pseudo-elements stay the library's
  problem

`cm-damage` is the shape to copy. A composition that reimplements the library's
component is a fork; one that wraps it adds only the label and the readout.

## This page writes layout CSS, and the other two do not

Bootstrap and Bulma both ship grid and spacing utilities, so the Hot Tone and
Cyberpunk pages have no stylesheet of their own. **NES.css ships none** — it is
a component library, not a framework, and has no opinion about how two panels
sit side by side.

So the layout lives in `patterns.scss`, built from layer 2's spacing scale so it
cannot drift away from the components. It is deliberately **not** in the ledger:
the ledger governs components, and a page skeleton is not one. Nobody reaches
for "the shell" the way they reach for "a button".

## Three things this example forced into the tool

1. **A ninth adapter, for a library with zero variables.** NES.css publishes no
   custom properties at all — Bulma has 1416, Bootstrap 446, Water.css 21. With
   nothing to point at tokens, the runtime half of the adapter has to write real
   declarations, and the build half has to set Sass variables before the import.
2. **The pixel border needed regenerating, not configuring.** NES.css draws it
   with an SVG data URI whose fill is written inside the asset, and the mixins
   that emit it use raw palette entries (`$color-black`) rather than the
   documented `$base-color` — which is also not declared `!default`, so it
   cannot be pre-assigned. The first reading concluded the border was
   unthemeable. It is not: `border-image-source` is an ordinary property and the
   adapter sits in a later layer, so it emits one static border image per theme.
   The cost is real and worth stating — roughly 400 bytes per component group
   per theme, where every other adapter here pays nothing per theme.
3. **The absolute-name trap, for the third time.** `.nes-container.is-dark` was
   first bound as "the inverted surface", with its background mapped to
   `fg-default`. That works on a light theme, where the foreground is dark — and
   on this dark theme it turned a black panel **white**. Bootstrap's
   `.btn-light` and Bulma's `.is-light` are the same trap: a name that describes
   a shade is a fixed palette entry, and a theme has nothing to say about it.

## Decisions worth arguing with

- **Every button is `raw`.** Nothing was promoted, because nothing earned it:
  no call site composes three classes, and nothing diverges structurally. A
  vocabulary at 100% `raw` is not a failure when the library already decided
  well — promoting for the sake of the metric produces classes with no
  declarations of their own, which is renaming, not maturing.
- **`is-selected` uses the `selected` role, not `action`.** Layer 2 draws that
  distinction and most products collapse it. Being hunted is a state the player
  is in, not an invitation to click.
- **`$border-size` stays at NES.css's four pixels**, unbound from
  `--app-border-width`. Four pixels is the grid this library draws on; a 1px
  "refinement" produces a broken pixel grid rather than a subtler NES.css.
- **The font is the library's.** "Press Start 2P" is not a choice this system
  has an opinion about — it is the entire point of the library.

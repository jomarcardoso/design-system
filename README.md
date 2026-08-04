# design-system

A framework-independent CSS token foundation, packaged as a Claude Code plugin.
It gives a project one set of design decisions that Bootstrap, Tailwind and
hand-written components all read from, and it ships the skill that teaches an
agent to apply those decisions instead of guessing.

The problem it solves: a product accumulates a design system, plus Bootstrap's
variables, plus whatever the last three developers hardcoded. Nothing agrees,
and changing a colour means finding every place it was spelled out. Here there
is exactly one place — the semantic layer — and everything else derives from it.

## Features

- **Four layers with a single public contract.** Application code reads layer 2
  and nothing else. Layer 1 never reaches the browser; adapters are leaves that
  nothing depends on.
- **Sass first.** A value becomes a CSS custom property only if it changes at
  runtime. Layer 1's 28 colour ramps cost **0 bytes**; the whole token layer is
  110 custom properties.
- **Theme and context switching** via `data-theme` and `data-surface`, with two
  build-time guarantees: a context cannot change a background without its
  foreground, and **every bg/fg pair in every theme is measured against WCAG** —
  error below 3:1, warning below 4.5:1. The pair list is generated, not curated:
  every surface against every foreground that can land on one, so it cannot
  quietly omit a combination. Both cost zero runtime bytes.
- **Eight adapters, one contract.** Bootstrap, daisyUI, Pico, Bulma, Flowbite,
  Preline, Water.css and MVP.css — from a 1416-variable library down to a
  21-variable one, all driven by the same 110 tokens. Plus a Tailwind bridge,
  which is not an adapter.
- **Verified, not asserted.** `npm run audit:contrast` drives every demo page in
  every theme through a real browser and measures what is actually rendered —
  both filled elements and coloured text on a transparent background, which is
  where outline, ghost and link variants live. It has caught seven bugs the
  build-time check structurally cannot see, including a Bootstrap link colour
  that never followed the theme because Bootstrap reads `--bs-link-color-rgb`
  and the adapter was setting `--bs-link-color`.
- **Every button each library documents, rendered from these tokens.** The demo
  pages carry the full button catalogue from all eight libraries' own docs —
  colours, styles, sizes, states and shapes — because a foundation that covers
  the common variants and quietly drops the rest is not a foundation. Adopting
  it should never cost you something the library gave you directly, so the
  demos are the check on that claim: daisyUI's own default theme renders four
  of its five `btn-soft` variants below 2.7:1, and through this foundation the
  same buttons clear 6:1.
- **Tailwind bridge** that publishes layer 2 as utilities through
  `@theme inline` — no extra custom properties, and utilities follow the theme.
- **Enforced, not just documented.** Stylelint fails the build on a literal
  colour or a reach past layer 2.

## Quick start

Install as a plugin, and the skill handles the rest:

```bash
claude plugin marketplace add /path/to/design-system
```

Then ask Claude to install it into a project. The skill runs a short interview —
foundation options, Tailwind bridge yes/no, which adapter — and copies in only
what you chose.

To work on the design system itself:

```bash
npm install && npm run demo && npx --yes serve -p 4173 .
```

Open <http://localhost:4173/example/coexistence.html>. It renders Bootstrap
markup and library-free markup side by side off the same tokens. Toggling the
theme, or rewriting a single token, moves both columns together. Serve it over
HTTP rather than opening the file directly — `@import` resolution and caching
both behave differently under `file://`.

> Requires Sass ≥ 1.79 — the colour-space API is what converts the oklch palette
> into Bootstrap's rgb triplets at build time.

## How it works

| Layer | Lives in | Ships as | Runtime cost |
|---|---|---|---|
| 1 — base | `src/_base.scss` | Sass maps | **0 bytes.** Only values read via `color()` / `scale()` are inlined as literals |
| 2 — semantic | `src/_semantic.scss` + `src/_themes.scss` | custom properties | 110, the public contract |
| 3 — component | `src/_component.scss` | reserved names | 0 by default |
| 3.5 — adapter | `src/adapters/*.scss` | custom properties | 28–64, whichever one is selected |

The rule that produces that table:

> A value becomes a CSS custom property **only** if it changes at runtime — a
> theme swap, a context, a per-instance override — or if it is a public
> extension point. Everything else resolves at compile time.

### Layer 3 ships no components

It does not define `.btn` or `.card` — that would be another Bootstrap forcing
its own anatomy. What it ships is a naming contract that adapters consult
through a fallback chain:

```
var(--app-button-bg,        /* component token — usually unset */
    var(--app-bg-action))   /* semantic token  — always defined */
```

Set nothing and the component themes from semantic, with zero component tokens
emitted. Set `--app-button-bg` on one instance and it wins there while
everything else still flows from semantic. That is the point: when a component
must diverge, you have a name to reach for instead of a fork, and the contract
never breaks.

### The `@layer` trap

Unlayered CSS beats *all* layered CSS, regardless of order or specificity. So
wrapping the design system in a layer makes it weaker against a legacy
stylesheet, not stronger. The way to overpower existing CSS is to pull **that**
code into an early layer:

```css
@import 'legacy/app.css' layer(legacy);
@import './ds/app.css';
```

`app.css` declares the full order in one statement, before any import, because a
layer's position is fixed by its first appearance.

## Usage

Write components against layer 2:

```css
.invoice-card {
  padding: var(--app-pad-surface);
  background: var(--app-bg-surface);
  color: var(--app-fg-default);
  border: var(--app-border);
  border-radius: var(--app-radius-surface);
  box-shadow: var(--app-shadow-raised);
}

.invoice-card--overdue {
  background: var(--app-bg-danger-subtle);
  color: var(--app-fg-danger);
  border-color: var(--app-border-danger);
}
```

Never a literal colour, never `var(--color-*)`, never `var(--bs-*)`, never
`var(--app-base-*)`. When layer 2 has no token for what you need, add one to
`src/_semantic.scss` — that is a two-line change, and it is the moment the
system learns something.

The full vocabulary is in
[skills/design-system/references/tokens.md](skills/design-system/references/tokens.md).

## Bootstrap

Two halves, split by when the value can change:

- **`bootstrap-entry.scss`** — build time. Set Bootstrap's Sass variables and
  import the library already configured. Setting `$primary` once generates
  `--bs-btn-bg`, `--bs-nav-link-color` and several hundred more, with nothing
  mapped by hand. Radii, border width, font stacks and focus-ring geometry live
  here; they never change between themes.
- **`src/adapters/_bootstrap.scss`** — runtime. Only what a theme swaps.

Two things that are easy to get wrong and are documented in the adapter:

**Feed Bootstrap sRGB.** Its `shade-color()` / `tint-color()` call the legacy
`mix()`, which hard-errors on oklch. Every colour goes through `srgb()` first.

**Bind variant-driven variables per variant.** Bootstrap expresses
`.btn-primary` vs `.btn-danger` by setting `--bs-btn-bg` per class. Overriding
that variable once on `.btn` collapses every button to one colour — and so does
the subtler `background-color: var(--app-button-bg, var(--app-bg-action, var(--bs-btn-bg)))`,
because layer 2 is always defined and resolution never reaches the variant
level. Each variant is bound to the semantic role it means.

## What eight adapters are for

Each library was picked because it breaks a different assumption, and together
they are the evidence that the layering holds:

| Library | The thing it tests | Adapter size |
|---|---|---|
| **Bootstrap** | Variants compiled to literals; needs a build-time half | ~440 lines |
| **daisyUI** | Variants kept as references; one variable moves everything | ~140 lines |
| **Pico CSS** | Classless — no variant classes exist at all | ~150 lines |
| **Bulma** | Refuses whole colours; wants HSL channels | ~200 lines |
| **Flowbite** | No component CSS; its surface *is* Tailwind's `@theme` | ~160 lines |
| **Preline UI** | Already had this architecture — semantic layer + inline bridge | ~170 lines |
| **Water.css** | The floor: 21 variables, no brand fill, no text-on-fill | ~100 lines |
| **MVP.css** | Derives interaction with a `filter`, not a colour | ~120 lines |

The generalisation worth keeping: **an adapter's cost is set by how a library is
organised, not by how much it ships.** Bulma exposes 1416 custom properties and
needs about thirty declarations, because every component family is
`var(--bulma-scheme-h)` under the hood. Bootstrap exposes fewer and needs more.

Three constraints fall out of the set:

- **A library that ships unlayered must be wrapped** in `@layer vendor` by its
  entry file. Unlayered CSS beats every cascade layer, so otherwise the library
  beats its own adapter. Pico, Bulma, Flowbite and Preline all need this.
- **A value the library decomposes cannot follow a runtime override.** Bulma's
  channels and Bootstrap's rgb triplets are computed per theme at build time, so
  they track `data-theme` but not a live `--app-*` rewrite. Everything a library
  exposes whole stays live.
- **Adapters can collide with each other.** daisyUI uses `--border` for a width;
  Preline uses it for a colour. Bundling both left daisyUI's inputs with no
  border, in valid CSS, with a silent build. `scripts/check-collisions.mjs` runs
  on every build and fails on it now. Namespaced libraries (`--bs-*`, `--pico-*`,
  `--bulma-*`) cannot collide; bare names can, and no adapter can prevent it.

Which is why **`dist/ds.css` ships tokens only** and each adapter compiles to
its own file from `src/adapter-<name>.scss`. Adapters are leaves — building them
separately is the honest shape, and it is what lets this repository demo six
libraries that could never share a page:

```html
<link rel="stylesheet" href="app.css">                 <!-- layer order + tokens -->
<link rel="stylesheet" href="dist/adapter-bulma.css">  <!-- one adapter -->
<link rel="stylesheet" href="dist/bulma.css">          <!-- the library -->
```

A project settled on one library can instead name it in `$adapters` and get it
bundled into `dist/ds.css`. Both routes emit the same declarations.

## daisyUI

The instructive contrast with Bootstrap. Both libraries express variants through
custom properties, but resolve them at opposite times:

```
Bootstrap  .btn-primary { --bs-btn-bg: #5f3212 }               compiled literal
daisyUI    .btn-primary { --btn-color: var(--color-primary) }   live reference
```

Because daisyUI keeps references, setting `--color-primary` once moves every
primary component — so its adapter is 28 declarations with no per-variant work,
while Bootstrap's has to re-bind each variant selector. Same architecture, very
different amount of code, for a reason that belongs to the libraries.

Compile `daisyui-entry.css`, which sets `themes: false`. Without that, daisyUI's
built-in themes declare the same variables the adapter drives and whichever
loads last wins.

## Pick one library, not two

`$adapters` accepts a list, but an application should name one. Bootstrap and
daisyUI collide on **158 class names** — `btn`, `btn-primary`, `card`,
`card-body`, `alert`, `badge`, `modal`, `table`, `navbar` among them — so
loading both means the later cascade layer silently wins and one library's
components become the other's.

That is a property of the libraries. This design system makes them agree on
colour, spacing and shape; it cannot make them agree on who owns `.btn`.

The failure is worth knowing because it is nearly invisible: with both loaded
`.btn-primary` still looks correct, since both resolve it to the action token.
Only a class one library lacks — `.btn-danger`, which daisyUI does not define —
exposes it.

## Tailwind

Optional, and a bridge rather than an adapter — it runs the other direction,
publishing layer 2 as utilities:

```css
@theme inline {
  --color-surface: var(--app-bg-surface);
}
```

The `inline` keyword is the whole point: it keeps the `var()` reference in the
generated utility, so `bg-surface` follows every theme and context at runtime
and publishes no additional variable. Layer 1 is deliberately **not** published
to `@theme` — that would cost ~260 custom properties and hand application code a
way around layer 2.

## Repository layout

```
.claude-plugin/         plugin + marketplace manifests
skills/design-system/   SKILL.md and references — what the agent reads
src/                    the design system itself
  _base.scss            layer 1, compile-time only
  _semantic.scss        layer 2, the public contract
  _themes.scss          theme choice maps and contexts
  _component.scss       layer 3 naming contract
  _core.scss            emission machinery, pair invariant
  _config.scss          prefix, themes, adapters, layer names
  adapters/                _bootstrap _daisyui _pico _bulma
app.css                 cascade layer order + token-driven baseline
reset-a11y.css          optional; restores the native focus outline
tailwind.css            optional Tailwind bridge
*-entry.{scss,css}      one optional build entry per library
example/
  coexistence.html      Bootstrap vs plain CSS, light/dark
  theme-brand.html      the brand theme across Bootstrap and plain CSS
  daisyui.html          daisyUI adapter
  pico.html             Pico adapter — classless, unlayered library
  bulma.html            Bulma adapter — HSL channels
  tailwind.html         the bridge, no adapter and no library
```

## Build and verify

```bash
npm run build      # compiles src/ds.scss to dist/ds.css, then lints
npm run demo       # also compiles Bootstrap for the example page
npm run lint       # stylelint on its own
```

After an adapter change, check in the browser that variants stay distinct, that
toggling `data-theme` moves both demo columns, and that setting
`--app-button-bg` on one button moves only that button.

## Enforcement

`stylelint.config.cjs` blocks reaching past layer 2 from application code — no
`var(--color-*)`, no `var(--bs-*)`, no literal colours outside `_base.scss`.
Adapters are exempted for third-party namespaces, since that is their job.

Without this, the layering degrades quietly. Someone writes `bg-indigo-600`
inside a component, it works, nobody notices, and six months later the
foundation is decoration.

## Open decisions

Deliberately left rather than guessed:

- **Typography.** `font-body` and `font-heading` both point at the system sans
  stack. Real faces are a brand decision.
- **`selected` vs `action`.** Currently the same hue. They are separate roles so
  they *can* diverge; if they never do, collapsing them removes six tokens.
- **Density.** `[data-density="compact"]` moves one variable. Whether that is
  enough depends on whether controls are sized from `space-unit` throughout.

## License

[Mozilla Public License 2.0](LICENSE).

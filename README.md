# design-system

A Claude Code plugin that conducts the creation of a design system end to end:
an interview that defines the design language, a framework-independent CSS token
foundation that turns those decisions into values, and a pattern ledger that
closes the component vocabulary. Bootstrap, Tailwind and hand-written components
all read from the same contract.

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
  126 custom properties.
- **px for the frame, rem for the words.** Spacing and radius are px, so turning
  up a phone's font size enlarges the text without inflating every gap until the
  layout stops fitting. Font sizes and breakpoints stay rem, so text still
  honours the reader's preference (WCAG 1.4.4).
- **One stylesheet per theme.** `npm run build:themes` writes `dist/theme-<name>.css`,
  each carrying the structural tokens, that theme's colours and every surface
  context. A page loads one. A theme a user defines cannot be pre-compiled into
  a shared file, so this is the shape that survives custom themes.
- **Exports to the W3C standard.** `npm run export:tokens` writes
  `dist/tokens.json` and `dist/resolver.json` against the Design Tokens CG-FINAL
  modules — the palette is already oklch, which the Colour Module defines.
- **Theme and context switching** via `data-theme` and `data-surface`, with two
  build-time guarantees: a context cannot change a background without its
  foreground, and **every bg/fg pair in every theme is measured against WCAG** —
  error below 3:1, warning below 4.5:1. The pair list is generated, not curated:
  every surface against every foreground that can land on one, so it cannot
  quietly omit a combination. Both cost zero runtime bytes.
- **Ten adapters, one contract.** Bootstrap, daisyUI, Pico, Bulma, Flowbite,
  Preline, Water.css, MVP.css, NES.css and CoreUI — from a 1416-variable library
  down to one with **zero**, all driven by the same 126 tokens. Plus a Tailwind
  bridge, which is not an adapter.
- **Verified, not asserted.** `npm run audit:contrast` drives every demo page in
  every theme through a real browser and measures what is actually rendered —
  both filled elements and coloured text on a transparent background, which is
  where outline, ghost and link variants live. It has caught seven bugs the
  build-time check structurally cannot see, including a Bootstrap link colour
  that never followed the theme because Bootstrap reads `--bs-link-color-rgb`
  and the adapter was setting `--bs-link-color`.
- **Every button each library documents, rendered from these tokens.** The demo
  pages carry the full button catalogue from the libraries' own docs —
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

Then ask Claude to start a design system in a project. It runs the discovery
interview first, writes `DESIGN_LANGUAGE.md`, and only then installs the token
layers and asks which library to adapt.

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
| 2 — semantic | `src/_semantic.scss` | custom properties | 126, the public contract. **No theme ships with the tool** — you supply the map |
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

## Supporting libraries is the easy half

Everything above is about making a library follow the project's decisions. That
is necessary and it is not the goal, because a foundation that supports every
library is an aggregator, not a design system.

**The goal is restriction.** Bootstrap ships several hundred usable button
combinations. A product needs three or four. The system's job is to make those
three easy and the rest unavailable — so the measure of a release is the allowed
list getting **shorter**, not the supported list getting longer.

The library is scaffolding. It holds the building up early, shows through
everywhere, and comes down as the structure sets. It is not hidden; it is
fenced.

The fence is a **pattern ledger** the project owns — this tool ships the schema,
the verifier and an empty template, never a vocabulary. What a product allows is
the product's decision. The ledger records what exists, what it means, and how
mature each piece is:

| State | Meaning | What an agent emits |
|---|---|---|
| `raw` | still using library classes | `btn btn-outline-secondary` |
| `styled` | a semantic class exists | `app-btn-secondary` |
| `wrapped` | a component exists | `<Button variant="secondary">` |
| `forbidden` | outside the vocabulary | a refusal, with the alternative |

Every entry also carries its **intent** in plain language — "a supporting action
next to a primary one; reads as outline so it never competes". The intent is the
part that must survive; the class names are the part expected to change. That is
what lets the mapping be rebuilt when the library updates or is replaced.

Progress becomes measurable — entries moving `raw` → `styled` → `wrapped`, and
the forbidden list growing:

```bash
npm run verify:examples
```

```
button     4 allowed  raw 4 (100%)  styled 0 (0%)  ...   # hot-tone, phase 1
button     4 allowed  raw 0 (0%)  styled 4 (100%)  ...   # cyberpunk, phase 2
```

Three worked examples live in `example/`, one per phase:

| Example | Phase | What it shows |
|---|---|---|
| **DS Hot Tone with Bootstrap** | 1 | vocabulary recorded and enforced, no abstraction written |
| **DS Cyberpunk with Bulma** | 2 | promoted to semantic classes, mixed maturity across components |
| **DS Carmageddon with NES.css** | 3 | documentation generated from the ledger as a delta |
| **DS Meu Caderninho with daisyUI** | 3 | built to match a supplied design — where tokens stop and the product's layer starts |

They are products built *with* the tool, and they disagree with each other — one
allows a borderless button, another forbids it; one allows status-coloured
buttons, another does not. That disagreement is the argument for keeping the
vocabulary out of the foundation.

The Meu Caderninho example is the one that pushed hardest on customisation. It
added two things to the tool — `emit-structure()` overrides, so a product can
set its own typography without editing a vendored file, and a `font-family-display`
layer 3 hook for brands with a signature typeface — and it established where a
product overrides a library that nests itself inside `utilities`: a sublayer at
`utilities.mc`, which beats the component library while a utility at the call
site still beats it.

Phase 3 adds `npm run docs:carmageddon`, which generates a documentation page
from the ledger. It documents in full only what a reader cannot look up — the
compositions the library does not have, and the overrides where the product
diverges — and links everything else to the library's own docs. Examples render
live against the product's real stylesheet, beside their own source.

Promotion order is fixed: **SCSS first, wrapper second**, so the wrapper consumes
the semantic class rather than the library composition, and projects with no
component framework are protected too. Dropping the library then changes one
SCSS body instead of every call site.

## What ten adapters are for

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
| **Water.css** | 21 variables, no brand fill, no text-on-fill | ~100 lines |
| **NES.css** | The floor: **zero** variables, and colour encoded inside an SVG asset | ~230 lines |
| **CoreUI** | Bootstrap's classes with a different prefix, and `!important` on its utilities | ~290 lines |
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
  border, in valid CSS, with a silent build. `scripts/
  build-themes.mjs      one stylesheet per theme, surfaces included
  export-tokens.mjs     DTCG + resolver export (additive; nothing reads it)
  check-collisions.mjs` runs
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

## Three skills, in order

The plugin conducts the creation of a design system rather than just supplying
parts. Each skill needs the previous one's output.

| | Skill | Produces | Question it answers |
|---|---|---|---|
| 1 | **design-language** | `DESIGN_LANGUAGE.md` at the project root | why does it look and sound like this |
| 2 | **design-system** | `src/`, the theme, `dist/theme-*.css` | what are the values |
| 3 | **design-patterns** | `patterns.json` | which components may be built |

**Start at 1.** A discovery interview — fourteen questions in six blocks — that
picks an archetype, settles density, geometry, elevation, colour rigour and
voice, and writes them down. Starting at 2 instead produces a palette nobody can
defend six months later; starting at 3 produces a vocabulary with no basis for
its refusals.

The rule that keeps the interview from becoming a form: **every question decides
something concrete** — a token value, a build threshold, or a rule the build can
check. A question whose answer changes nothing is dropped rather than kept for
symmetry.

The five archetypes are not moodboards. Each one lands on real values:

| | Tech Minimalist | Enterprise Solid | Playful | Editorial | Utilitarian |
|---|---|---|---|---|---|
| `radius-control` | 6px | 4px | 16px | 4px | 2px |
| `shadow-raised` | `xs` | `sm` | `lg` | `2xs` | `none` |
| `size-control` | 36px | 36px | 44px | 40px | 28px |
| `line-height` | 1.5 | 1.5 | 1.6–1.7 | 1.7 | 1.4 |
| heading face | geometric sans | humanist sans | rounded / display | **serif** | condensed sans |

Colour is deliberately absent from that table. An archetype suggests a mood; the
brand colour comes from the brand, and the interview asks for it directly.

**The strongest link between the interview and the build is block 6.** Every
restriction is followed by "how would we know it was broken?" — a restriction
with a detectable signature becomes a `forbidden` entry in `patterns.json` and
fails `npm run verify:patterns` with the alternative named. One without stays a
line in the document, marked as advice rather than a guarantee.

## Standards: the W3C Design Tokens format

The [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
published its Format, Colour and Resolver modules as **CG-FINAL on 2025-10-28**.
This project follows them where they apply and diverges in one place on purpose.

`npm run export:tokens` writes two additive artefacts — nothing in the CSS build
reads them, and deleting them changes nothing:

| File | What it is |
|---|---|
| `dist/tokens.json` | the token layer in the [Format Module](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/) |
| `dist/resolver.json` | themes and surfaces as modifiers, in the [Resolver Module](https://www.w3.org/community/reports/design-tokens/CG-FINAL-resolver-20251028/) |

They exist because the token layer is the part of this system other tools want:
Figma via Tokens Studio, a native app needing the same palette, a docs site
rendering swatches. None of those speak Sass; all of them speak DTCG.

### Where it lines up

**Colour was the decision most at risk, and it was already right.** The whole
palette is oklch, and `oklch` is one of the fourteen spaces the
[Colour Module](https://www.w3.org/community/reports/design-tokens/CG-FINAL-color-20251028/)
defines. Had this started in hex or HSL, the export would be lossy.

**Names are validated at build time, not by convention.** The spec forbids a
leading `# design-system

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
  126 custom properties.
- **Theme and context switching** via `data-theme` and `data-surface`, with two
  build-time guarantees: a context cannot change a background without its
  foreground, and **every bg/fg pair in every theme is measured against WCAG** —
  error below 3:1, warning below 4.5:1. The pair list is generated, not curated:
  every surface against every foreground that can land on one, so it cannot
  quietly omit a combination. Both cost zero runtime bytes.
- **Ten adapters, one contract.** Bootstrap, daisyUI, Pico, Bulma, Flowbite,
  Preline, Water.css, MVP.css, NES.css and CoreUI — from a 1416-variable library
  down to one with **zero**, all driven by the same 126 tokens. Plus a Tailwind
  bridge, which is not an adapter.
- **Verified, not asserted.** `npm run audit:contrast` drives every demo page in
  every theme through a real browser and measures what is actually rendered —
  both filled elements and coloured text on a transparent background, which is
  where outline, ghost and link variants live. It has caught seven bugs the
  build-time check structurally cannot see, including a Bootstrap link colour
  that never followed the theme because Bootstrap reads `--bs-link-color-rgb`
  and the adapter was setting `--bs-link-color`.
- **Every button each library documents, rendered from these tokens.** The demo
  pages carry the full button catalogue from the libraries' own docs —
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
| 2 — semantic | `src/_semantic.scss` | custom properties | 126, the public contract. **No theme ships with the tool** — you supply the map |
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

## Supporting libraries is the easy half

Everything above is about making a library follow the project's decisions. That
is necessary and it is not the goal, because a foundation that supports every
library is an aggregator, not a design system.

**The goal is restriction.** Bootstrap ships several hundred usable button
combinations. A product needs three or four. The system's job is to make those
three easy and the rest unavailable — so the measure of a release is the allowed
list getting **shorter**, not the supported list getting longer.

The library is scaffolding. It holds the building up early, shows through
everywhere, and comes down as the structure sets. It is not hidden; it is
fenced.

The fence is a **pattern ledger** the project owns — this tool ships the schema,
the verifier and an empty template, never a vocabulary. What a product allows is
the product's decision. The ledger records what exists, what it means, and how
mature each piece is:

| State | Meaning | What an agent emits |
|---|---|---|
| `raw` | still using library classes | `btn btn-outline-secondary` |
| `styled` | a semantic class exists | `app-btn-secondary` |
| `wrapped` | a component exists | `<Button variant="secondary">` |
| `forbidden` | outside the vocabulary | a refusal, with the alternative |

Every entry also carries its **intent** in plain language — "a supporting action
next to a primary one; reads as outline so it never competes". The intent is the
part that must survive; the class names are the part expected to change. That is
what lets the mapping be rebuilt when the library updates or is replaced.

Progress becomes measurable — entries moving `raw` → `styled` → `wrapped`, and
the forbidden list growing:

```bash
npm run verify:examples
```

```
button     4 allowed  raw 4 (100%)  styled 0 (0%)  ...   # hot-tone, phase 1
button     4 allowed  raw 0 (0%)  styled 4 (100%)  ...   # cyberpunk, phase 2
```

Three worked examples live in `example/`, one per phase:

| Example | Phase | What it shows |
|---|---|---|
| **DS Hot Tone with Bootstrap** | 1 | vocabulary recorded and enforced, no abstraction written |
| **DS Cyberpunk with Bulma** | 2 | promoted to semantic classes, mixed maturity across components |
| **DS Carmageddon with NES.css** | 3 | documentation generated from the ledger as a delta |
| **DS Meu Caderninho with daisyUI** | 3 | built to match a supplied design — where tokens stop and the product's layer starts |

They are products built *with* the tool, and they disagree with each other — one
allows a borderless button, another forbids it; one allows status-coloured
buttons, another does not. That disagreement is the argument for keeping the
vocabulary out of the foundation.

The Meu Caderninho example is the one that pushed hardest on customisation. It
added two things to the tool — `emit-structure()` overrides, so a product can
set its own typography without editing a vendored file, and a `font-family-display`
layer 3 hook for brands with a signature typeface — and it established where a
product overrides a library that nests itself inside `utilities`: a sublayer at
`utilities.mc`, which beats the component library while a utility at the call
site still beats it.

Phase 3 adds `npm run docs:carmageddon`, which generates a documentation page
from the ledger. It documents in full only what a reader cannot look up — the
compositions the library does not have, and the overrides where the product
diverges — and links everything else to the library's own docs. Examples render
live against the product's real stylesheet, beside their own source.

Promotion order is fixed: **SCSS first, wrapper second**, so the wrapper consumes
the semantic class rather than the library composition, and projects with no
component framework are protected too. Dropping the library then changes one
SCSS body instead of every call site.

## What ten adapters are for

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
| **Water.css** | 21 variables, no brand fill, no text-on-fill | ~100 lines |
| **NES.css** | The floor: **zero** variables, and colour encoded inside an SVG asset | ~230 lines |
| **CoreUI** | Bootstrap's classes with a different prefix, and `!important` on its utilities | ~290 lines |
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

 and the characters `{`, `}` and `.`. `core.var-name()` is the single
point where a token name becomes real, so the check lives there and a bad name
fails the Sass build:

```
Error: Token name "bg.action" contains ".", which the Design Tokens format
forbids — it is part of the {group.token} reference syntax.
```

A lint rule over the source would have missed it: most names here are built by
interpolation inside a loop, and the string only exists at compile time.

**Layer 1 → 2 is the spec's alias model.** `base.color(indigo, 600)` is
`{color.indigo.600}` with a different syntax.

**Themes and surfaces are resolver modifiers.** The set of themes a build emits
is a modifier — in this repository the demo's, whose
contexts are `light`/`dark`/`brand`; `data-surface` is a second one. Even the
word matches — the spec calls them contexts, and so did this project before
reading it.

**Shadows are stored as parts**, not as CSS strings, so they export as the
composite type with one entry per layer. That is why `$shadow-parts` in layer 1
holds `(x, y, blur, spread, color)` and a build-time function renders the CSS.

### Where it diverges, deliberately

**Layer 3 has no DTCG expression, and that is not a defect.** The spec requires
`$value` on every token. Layer 3's forty names exist precisely to have no value
— they are the intentionally-undefined first level of
`var(--app-button-bg, var(--app-bg-action))`, which is what makes the layer cost
zero bytes while still reserving the vocabulary. Exporting them as aliases would
give them values and destroy the property that makes them worth having.

They are exported with `$extensions` recording the divergence, which is the
mechanism the spec provides for exactly this.

**`calc()` spacing cannot be a `dimension`.** `--app-space-md` is
`calc(var(--app-space-unit) * 4)`; the `dimension` type is a static number and a
unit, with no reference and no arithmetic. Resolving it at export would produce
a number correct for one density and silently discard the mechanism that lets a
density context rescale the whole frame at runtime. Those tokens export verbatim
with the reason attached.

**The build does not resolve one permutation.** The Resolver's model is "give me
theme=dark, surface=inverted, receive one flat set". This project emits every
theme into one stylesheet and switches with an attribute, because **a surface
context has to nest inside a themed page** — an inverted band on a dark page
needs both sets present at once, which a single resolved permutation cannot
provide. `dist/resolver.json` describes the axes so a tool can enumerate the
nine permutations; a product that genuinely wants one flat set compiles with a
single theme, which the examples already do.

### One file per theme — the recommended shape

The token layer builds three ways. All three come out of `npm run demo`.

| | file(s) | gzip | theme switch | nested surfaces |
|---|---|---|---|---|
| **`dist/theme-<name>.css`** | **1 per theme** | **~1530 B** | server or stylesheet swap | **yes** |
| `dist/ds.css` | 1, all themes | 2356 B | attribute, instant | yes |
| one resolved permutation | 1 per theme x surface | smallest | stylesheet swap | **no** |

**Ship one file per theme.** A page has one theme, so the theme is resolved at
build time; surfaces stay at runtime, because a page really does have several at
once — a footer inverted against the body above it is ordinary, not an
exception. All four products in `example/` are built this way.

The deciding argument is not payload, and it is worth stating plainly because
the byte difference is under a kilobyte:

> **A theme a user defines cannot be pre-compiled into a shared file**, because
> it does not exist at build time. A product that lets people pick or author a
> theme has an unbounded set, and the only shape that survives is one file per
> theme, fetched by name.

Which theme to serve is the application's problem — a session, a preference row,
or the `Sec-CH-Prefers-Color-Scheme` client hint. The build's job is to make
every theme independently loadable.

**Why a theme file is self-contained.** The surface contexts declare eight
tokens, and they declare them as *references*:

```css
[data-surface="inverted"] {
  --app-bg-page: var(--app-bg-inverted-base);
  --app-fg-default: var(--app-fg-inverted-base);
  /* six more */
}
```

Each theme defines its own `*-inverted-base` anchors, so the same two context
blocks are correct inside every theme file and no permutation is needed to
combine them. Had contexts carried literal colours, this build would have to
emit theme x surface sets and would collapse into the Resolver's model — the one
that cannot nest.

**When the combined file is right instead.** A theme toggle that must not touch
the network, and demonstrations. The pages under `example/*.html` load
`dist/ds.css` precisely because they exist to switch themes and show the
difference; that is a demo requirement, not a product one.

One correction worth recording, because the first version of this section got it
backwards: two `<link media="(prefers-color-scheme: …)">` tags are **not** a
free way to get automatic dark mode from per-theme files — browsers fetch the
non-matching sheet too, at low priority. That is an argument against the
client-side link trick, not against per-theme files. Negotiating on the server
has no such cost.

### What this costs against the standard

The Resolver module resolves `{theme, surface}` to one flat set; this build
resolves the theme and leaves the surface axis live. So `dist/resolver.json`
describes nine permutations that the CSS build never emits as nine files.

A resolved permutation is the whole document, and a surface has to be a subtree.
Following the spec exactly here would remove a capability every product in
`example/` uses on every page.

### On vocabulary: "adapter", not "transform"

Style Dictionary calls part of its pipeline a *transform*, and the names look
interchangeable. They are not. Its
[documentation](https://styledictionary.com/reference/hooks/transforms/) is
explicit that transforms alter "the name, value, or attributes of a token" —
`color/hex`, `name/kebab`, `size/remToDp` — and that they **do not generate CSS
rules or bind third-party libraries**.

What `src/adapters/*.scss` does is bind one interface to another: this system's
token names to a library's variables and properties, including per-variant
property binding, cascade-layer placement and regenerated assets. That is the
adapter pattern under its usual name, and calling it a transform would describe
a different job.

## Repository layout

```
.claude-plugin/         plugin + marketplace manifests
skills/design-language/ SKILL.md — the discovery interview, run FIRST
  references/           the 14 questions and the 5 archetypes as token values
  templates/            the DESIGN_LANGUAGE.md a project ends up with
skills/design-system/   SKILL.md and references — the CSS token side
skills/design-patterns/ SKILL.md — the markup side: what may be built
patterns/
  patterns.template.json  empty starting point — the vocabulary is the product's
  patterns.schema.json    its schema, and the reasoning behind each field
src/                    the design system itself
  _base.scss            layer 1, compile-time only
  _semantic.scss        layer 2, the public contract
  _derive.scss          generates the opposite-scheme theme from yours
  _component.scss       layer 3 naming contract
  _core.scss            emission machinery, pair invariant
  _config.scss          prefix, adapters, contrast floor, layer names
  adapters/                _bootstrap _daisyui _pico _bulma
app.css                 cascade layer order + token-driven baseline
reset-a11y.css          optional; restores the native focus outline
tailwind.css            optional Tailwind bridge
*-entry.{scss,css}      one optional build entry per library
example/
  demo/                 the demonstration pages' own themes and contexts
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

- **Typography.** `font-family-body` and `font-family-heading` both point at the system sans
  stack. Real faces are a brand decision.
- **`selected` vs `action`.** Currently the same hue. They are separate roles so
  they *can* diverge; if they never do, collapsing them removes six tokens.
- **Density.** `[data-density="compact"]` moves one variable. Whether that is
  enough depends on whether controls are sized from `space-unit` throughout.

## License

[Mozilla Public License 2.0](LICENSE).

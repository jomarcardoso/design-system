---
name: design-system
description: A framework-independent CSS token foundation built on four layers, with adapters for Bootstrap, CoreUI, daisyUI, shadcn, Bulma, Pico, Flowbite, Preline, NES.css, water.css and MVP.css, plus an optional Tailwind bridge. Use this skill whenever styling work touches colours, spacing, radius, typography, elevation, focus rings, dark mode, or theming — writing or reviewing CSS/SCSS, picking a colour for a component, adding a theme or a `data-surface` context, wiring Bootstrap or Tailwind to design tokens, or installing the design system into a project. Trigger it even when the request never says "design system" or "tokens": "make this button green", "add dark mode", "why is my Bootstrap button the wrong colour", "our styles are inconsistent", "set up theming", and "--app-" all belong here. Also use it when reviewing a diff that introduces a hex colour, a `--bs-*` reference, or a hardcoded pixel value.
license: MPL-2.0
---

# Design System

**Second of three skills.** `design-language` decides why the system looks and
sounds the way it does and writes `DESIGN-LANGUAGE.md`; this skill turns those
decisions into values; `design-patterns` closes the component vocabulary. If
`DESIGN-LANGUAGE.md` exists at the project root, read it first — its front
matter fixes the archetype, density, radius, elevation strategy and the
accessibility level this build must satisfy. If it does not exist and the
project is starting fresh, run `design-language` before this one.

A four-layer CSS token foundation. Layer 1 compiles away, layer 2 is the only
public contract, layer 3 reserves names, and adapters are leaves that nothing
depends on.

The assets live in this plugin at `${CLAUDE_PLUGIN_ROOT}`. To put them into a
project, read `references/install.md` — it drives a short interview before
copying anything, because what a project needs varies.

## Adapters

Everything about wiring a third-party library — Bootstrap, CoreUI, daisyUI,
Pico, Bulma, Flowbite, Preline, NES.css, water.css, MVP.css — plus how to
write a new one, how two of them collide, and the Tailwind bridge, is in
`references/adapters.md`.

Read it when you are touching an adapter. Nothing in it changes how you write
ordinary product CSS, which is why it is not here: this file is the part you
need on every task, and that file is the part you need on one.

## The one rule

**Application and component code reads layer 2 and nothing else.**

```css
/* yes */
color: var(--app-fg-default);
background: var(--app-bg-surface);
padding: var(--app-pad-surface);

/* no — every one of these is a layering violation */
color: #1e1e2e;                    /* literal */
color: oklch(51% 0.26 277);        /* literal, just fancier */
background: var(--app-base-indigo-600);  /* layer 1 is private */
background: var(--color-indigo-600);     /* Tailwind's primitives */
border-color: var(--bs-border-color);    /* Bootstrap's namespace */
padding: 12px;                     /* off the spacing scale */
```

When layer 2 has no token for what you need, the fix is to **add a semantic
token**, not to reach around the layer. That is a two-line change in
`src/_semantic.scss` and it is the moment the system learns something. Reaching
around costs nothing today and quietly turns the foundation into decoration
within a few months — which is the failure mode the whole architecture exists to
prevent.

`stylelint.config.cjs` enforces this, so a violation fails the build rather than
surviving code review. If you find yourself wanting to add a stylelint exception,
that is the signal to add a token instead.

The full vocabulary is in `references/tokens.md` — read it before inventing a
name, because most things you need already have one. The common ones:

| Need | Token |
|---|---|
| Page / card / raised / inset background | `--app-bg-page` `--app-bg-surface` `--app-bg-raised` `--app-bg-sunken` |
| Body / secondary / heading text | `--app-fg-default` `--app-fg-muted` `--app-fg-heading` |
| Primary action, and text on it | `--app-bg-action` `--app-fg-on-action` |
| Status | `--app-bg-{success,warning,danger,info}` + `--app-fg-on-*` + `--app-bg-*-subtle` |
| Lines | `--app-border-color` `--app-border` (composed shorthand) |
| Spacing | `--app-space-{2xs..2xl}`, or the intent names `--app-pad-surface` `--app-pad-control-x` `--app-gap-stack` |
| Shape | `--app-radius-control` `--app-radius-surface` `--app-radius-pill` |
| Control height | `--app-size-control` |

Naming grammar: `--app-{property}-{role}[-{prominence}][-{state}]`. Roles carry
**intent, not appearance** — `bg-danger`, never `bg-red`. The test: if renaming a
colour family would force renaming the token, the token is misnamed.

Every `bg-X` has a matching `fg-on-X`. Use the pair. Contrast is then guaranteed
by construction rather than by review.

## `action`, `selected`, `link` and `neutral` are four different jobs

This is the system's main departure from Material and Atlassian, which ship one
brand slot with variants. Getting it wrong is easy, invisible, and the single
most common way a design system stops meaning anything to the person using it.

| role | means | belongs on |
|---|---|---|
| `action` | **an invitation.** Something will happen if you press it | primary buttons, CTAs, submit |
| `selected` | **a state the interface is currently in** | chips, checkboxes, radios, the active nav item, the current breadcrumb, a selected row or tab |
| `link` | **navigation.** You will go somewhere | anchors |
| `neutral` | **a filled control with no opinion attached** | cancel, secondary/grey buttons, `btn-secondary` |

**The rule: never reach for `selected` because nothing else was available.**

That is not hypothetical — it is what four adapters were doing. Bootstrap,
CoreUI, Pico and Preline all ship a **grey** secondary button, and all four were
bound to `selected`, so a cancel button rendered in exactly the colour of an
active menu entry. There was no neutral role, so `selected` got used as
"the other brand colour", and the reader learns that the colour means nothing.

`selected` is also the one role that is frequently **not a fill**. A checkbox is
an empty box that fills when chosen; the colour is the whole signal that
something changed. That only works if the colour is not already on half the
screen doing other jobs.

**Monochrome is fine; collapsing is not.** A single-brand product using three
steps of one hue for `action` / `selected` / `link` is a legitimate and common
choice. Two roles resolving to the *same value* is not, and `check-roles()`
warns at build time when it happens — it caught `action` and `link` sharing a
value in one of this repository's own example products the first time it ran.
The warning is not an error, because a deliberate monochrome is allowed. It just
has to be deliberate.

## The emission policy

This is the decision that shapes every other one, and it is easy to violate by
being helpful.

> A value becomes a CSS custom property **only** if it changes at runtime — a
> theme swap, a context, a per-instance override — or if it is a public
> extension point. Everything else resolves at compile time and ships as a
> literal, costing zero bytes.

| Layer | Ships as | Why |
|---|---|---|
| 1 — base primitives | **SCSS only, zero bytes** | Nothing may read `--app-base-*`. Layer 2 reads it through `color()` / `scale()` at build time and inlines the literal. |
| 2 — semantic | **Custom properties** (105) | The public contract, and the thing themes and contexts swap. Only a CSS variable can do that at runtime. |
| 3 — component | **Names reserved, emission off by default** | The fallback chain already delivers the benefit without emitting anything. See below. |
| 3.5 — adapter | **SCSS for what is fixed, custom properties only for what the theme swaps** | See the Bootstrap section. |

So: prefer Sass. Reach for a custom property when you can name the runtime event
that changes it. If you cannot name that event, it is a constant — inline it.

## Layer 3: how a component diverges without breaking the contract

Layer 3 ships **no components**. Building `.btn` and `.card` here would be
"another Bootstrap that forces its own anatomy", the opposite of a foundation.
Anatomy comes from whichever library the team already chose.

What it ships is a **naming contract** — `src/_component.scss` — that adapters
consult through a fallback chain:

```
var(--app-button-bg,        /* 1. component token — usually unset */
    var(--app-bg-action))   /* 2. semantic token — always defined */
```

This is what to reach for when one component must diverge from the semantic
default. Changing `--app-bg-action` would move every action surface in the
product; forking the component's CSS would strand it outside the system. Setting
`--app-button-bg` on that one instance moves exactly that one instance, and
everything else keeps flowing from semantic:

```html
<button class="btn btn-primary" style="--app-button-bg: var(--app-bg-success);">
  Confirm
</button>
```

Nothing had to be emitted for that to work, which is why
`$emit-component-vars` defaults to `false`. The value of the layer is the
**names it reserves**, so that a team customising a component reaches for a
variable instead of forking CSS. Turn emission on only when a hand-written
component outside any adapter needs the tokens to resolve on their own.

Before reserving a new name, it has to answer yes to one of these — otherwise
the component should read semantic directly:

1. Does a theme or context change it independently of its semantic source?
2. Will a consumer plausibly override it for one instance?
3. Does it encode component anatomy with no semantic equivalent?

## Writing a component variant by hand

The obvious way to write a variant is a trap, and it is the *same* trap the
Bootstrap adapter had to be restructured around — so it is worth recognising in
plain CSS too:

```css
/* broken, in two independent ways */
.btn        { background: var(--app-bg-action); color: var(--app-fg-on-action); }
.btn:hover  { background: var(--app-bg-action-hover); }
.btn--danger{ background: var(--app-bg-danger); color: var(--app-fg-on-danger); }
.btn--quiet { background: var(--app-bg-surface); color: var(--app-fg-default); }
```

1. `.btn:hover` is (0,2,0) and `.btn--danger` is (0,1,0), so hovering the danger
   button turns it the action colour.
2. `.btn--quiet` then gets the action background on hover while keeping its own
   dark text — the pair invariant broken by hand. `core.context()` catches this
   at build time for contexts; nothing catches it in your component CSS.

Re-point local variables per variant instead. The cascade resolves them before
any property reads them, so specificity stops mattering, and the foreground
travels with its background:

```css
.btn {
  --_bg: var(--app-button-bg, var(--app-bg-action));
  --_bg-hover: var(--app-button-bg-hover, var(--app-bg-action-hover));
  --_fg: var(--app-button-fg, var(--app-fg-on-action));
  background: var(--_bg);
  color: var(--_fg);
}
.btn:hover   { background: var(--_bg-hover); }
.btn--danger { --_bg: var(--app-bg-danger); --_bg-hover: var(--app-bg-danger-hover); --_fg: var(--app-fg-on-danger); }
.btn--quiet  { --_bg: var(--app-bg-surface); --_bg-hover: var(--app-bg-sunken);      --_fg: var(--app-fg-default); }
```

Keeping the layer 2 lookup only in the base rule also means the layer 3 hook
(`--app-button-bg`) applies to every variant automatically.

## Dark mode

A dark theme is a THEME — a second `emit-theme()` call with a second map. There
is no dark-mode switch in the foundation, no `.dark` class and no inverted
utility. If layer 2 is the only runtime surface, then swapping layer 2 is the
whole feature.

```scss
@include semantic.emit-theme('caderninho', theme.$caderninho, $default: true);
@include semantic.emit-theme('dark', theme.$caderninho-dark, $auto: true);
```

`$auto: true` also emits the theme under
`@media (prefers-color-scheme: dark) { :root:not([data-theme]) }`, so a visitor
who has never touched a toggle gets their OS setting, and an explicit
`data-theme` — including an explicit choice of the LIGHT theme on a dark
machine — always wins. Pass it to exactly one theme per scheme.

`color-scheme` is derived by MEASURING the theme's page colour, never from its
name. A theme called `midnight` is as dark as one called `dark`.

`accent-color: var(--app-bg-selected)` is emitted beside it, and it closes the
other half of the same hole. `color-scheme` tells the browser how to paint
scrollbars and the canvas; `accent-color` tells it how to paint the parts of a
native control you cannot style — a checkbox tick, a range thumb, a progress
bar, the highlighted row of an open `<select>`. Left at `auto`, those come from
the OPERATING SYSTEM's accent, which on Windows is blue: a warm brown interface
with a blue bar through the middle of its dropdown, in valid CSS, with nothing
reporting it. `bg-selected` is what an accent MEANS — the colour of a thing
chosen — so the native highlight and the product's own selected state answer to
one value per theme.

### Name the two themes `light` and `dark`

A two-theme product calls them `light` and `dark` — `data-bs-theme` in Bootstrap
5.3, `.dark` in Tailwind and shadcn, `data-theme` in Radix. Libraries that give
themes product names (daisyUI’s `cupcake`, `dracula`) are the multi-theme case,
and they pay for it by declaring separately which theme the OS maps to.

The MECHANISM still never reads the name. `:root:not([data-theme])` asks whether
a choice was MADE; the widely-copied `:root:not([data-theme="light"])` asks
whether the choice was one particular string. They behave identically for
exactly two themes named the conventional way, and the second breaks the moment
a third theme exists: pick `sepia` on a dark-OS machine and the dark tokens win
over it, 0,2,0 against 0,1,0. Adopt the convention for names; do not build the
convention into the selector.

### The dark theme can be derived

A product that has written a light theme already has a dark one:

```scss
@use 'derive';

@include semantic.emit-theme('caderninho', theme.$caderninho, $default: true);
@include semantic.emit-theme('night', derive.dark(theme.$caderninho), $auto: true);
```

`derive.dark()` works in OKLCH, preserves hue, and transforms by ROLE rather
than per colour — which is the whole difference between a usable generator and
the naive recipe. Inverting each colour's lightness independently preserves each
state's DIRECTION, so a fill that darkened on hover to move away from its white
label keeps darkening after it has become a light fill with a dark label. That
is the 2.39:1 bug, generated confidently and at scale.

Because every derived fill lands at the same lightness, every derived fill needs
a dark label, so every state brightens — one rule, no exceptions to forget.

The output goes through the same `check-contrast()` gate as a hand-written
theme. If a brand hue cannot reach its target lightness without dropping below
4.5:1, the build fails and names the pair. Offer generation only where it is
verified; a generated theme nobody measured is worse than no generated theme.

Hand-writing still wins where a product has a real palette with intent in it —
the derived ladder cannot know that a particular warm brown IS the brand. Derive
first, ship it, and replace it by hand later if it is worth the time.

### Writing the map by hand: every fill becomes an inverted pair

This is the part that is not a colour-picking exercise, and it is where a dark
theme written by eye fails the contrast gate.

On a light page, `action` is a dark fill carrying white. On a near-black page
that same dark fill is invisible, so it has to climb the ramp until it
separates from the page — and by the time it does, it is light enough that its
label must go DARK. Nearly every role ends up inverted this way: action,
selected, and all four statuses.

Which reverses the direction of interaction states:

> A fill moves AWAY from its own label on hover and further away when pressed.

Not "darker on light themes, lighter on dark ones" — the label decides, not the
theme. On the dark theme `bg-action` (light fill, dark label) brightens, while
`bg-neutral` (still a mid fill carrying light text) still darkens. Writing them
all the same direction is what produced `2.39:1` on a real hover state, caught
by the gate rather than by review.

Two more things the gate will teach you the hard way:

- **Tinted ink needs to go higher than neutral ink.** `danger-text` at step 200
  reads on the page and fails on `bg-surface-active`, the lightest thing on the
  theme. Choose the status text colours against the LIGHTEST surface, not the
  page.
- **`raised` lifts toward the lamp, it does not whiten.** A card on a dark theme
  is a lighter step of the same warm ramp. Switching to grey there is what makes
  a dark theme look like a different product.

## The `@layer` trap

Counter-intuitive and worth internalising, because the intuitive move makes
things worse:

**Unlayered CSS beats all layered CSS**, regardless of layer order and
regardless of specificity. Layers sit below unlayered styles, always.

So wrapping the design system in a cascade layer makes it **weaker** against a
messy legacy stylesheet, not stronger. The way to win is to pull the *other*
code into an early layer:

```css
@import 'legacy/app.css' layer(legacy);   /* now it can lose */
@import './ds/app.css';                   /* declares the full order */
```

`app.css` declares the whole order in one statement, up front, before any
`@import`. That matters because a layer's position is fixed by its **first**
appearance — declaring it once keeps later files from reordering it by accident:

```
legacy → theme → base → ds.base → ds.semantic → ds.component
       → vendor → vendor-config → components → ds.overrides → utilities
```

`vendor-config` (the adapter) sits after `vendor` (the library) on purpose —
that is what lets an adapter win over library defaults.

## Adding to the system

- **New colour, spacing or shape decision** → `src/_semantic.scss`, then let
  your theme supply the value. Give every `bg-X` its `fg-on-X`.
- **New theme** → write a choices map in YOUR OWN file and pass it to
  `semantic.emit-theme()`. The tool ships no theme and there is no registry to
  register in: a theme is a set of decisions belonging to whoever makes them,
  and the only one the tool generates is the opposite-scheme counterpart
  `derive.dark()` produces from yours. A theme is ~35 colour decisions, not ~110
  tokens. The build measures every bg/fg pair for contrast, so write the theme
  first and let it tell you which pairs need moving.
- **A section that overrides part of a theme** (inverted band, sunken well) →
  a **context**, not a theme. Contexts inherit everything they do not mention.
  `core.context()` refuses to compile a context that changes a background
  without its foreground. To say "checked, the inherited foreground is still
  right", give the key an explicit `null` — never point a token at itself.
- **New component hook** → `src/_component.scss`, only if it passes the
  admission test above.

## Verifying a change

**Run this. It is the whole check, and it needs no setup.**

```bash
npm run verify
```

That is `build:tokens` → `lint` → `verify:examples` → `audit:contrast`, and the
audit starts its own static server if nothing is listening, so there is no
two-step ritual to forget. Any failure exits non-zero.

What each link catches, so you know what a green run does and does not prove:

| | catches | cannot see |
|---|---|---|
| `build:tokens` | every bg/fg pair below AA, in every theme; a theme missing a key; a token name the W3C format forbids; two adapters colliding on a variable | anything about rendered markup |
| `lint` | a literal colour in product CSS; application code reaching past layer 2 into `--app-base-*`, `--color-*` or `--bs-*` | a token used with the wrong *meaning* |
| `verify:examples` | markup using a class combination the product's ledger does not allow | anything not in the ledger |
| `audit:contrast` | what the browser actually paints — a foreground the library baked in, a state rule the adapter clobbered, an outline variant | a page not listed in the script |

Then, for anything visual:

```bash
npm run demo      # compiles every library, for the example/ pages
```

Open `example/coexistence.html` over HTTP, not `file://`.

Open `example/coexistence.html` over HTTP, not `file://` — it renders Bootstrap
markup and library-free markup side by side off the same tokens. The things
worth checking after any adapter change:

- variants stay distinct (`.btn-primary` and `.btn-danger` are different colours)
- toggling `data-theme` moves both columns
- rewriting one layer 2 token on `:root` moves both columns
- setting `--app-button-bg` on one button moves only that button

When checking computed styles from a script right after mutating `data-theme`,
read the values in a **later** turn. Style resolution can lag a frame, and a
same-turn read reports the previous theme's value — which looks exactly like a
broken adapter.

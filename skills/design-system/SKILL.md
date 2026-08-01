---
name: design-system
description: A framework-independent CSS token foundation built on four layers, with a Bootstrap adapter and an optional Tailwind bridge. Use this skill whenever styling work touches colours, spacing, radius, typography, elevation, focus rings, dark mode, or theming — writing or reviewing CSS/SCSS, picking a colour for a component, adding a theme or a `data-surface` context, wiring Bootstrap or Tailwind to design tokens, or installing the design system into a project. Trigger it even when the request never says "design system" or "tokens": "make this button green", "add dark mode", "why is my Bootstrap button the wrong colour", "our styles are inconsistent", "set up theming", and "--app-" all belong here. Also use it when reviewing a diff that introduces a hex colour, a `--bs-*` reference, or a hardcoded pixel value.
license: MPL-2.0
---

# Design System

A four-layer CSS token foundation. Layer 1 compiles away, layer 2 is the only
public contract, layer 3 reserves names, and adapters are leaves that nothing
depends on.

The assets live in this plugin at `${CLAUDE_PLUGIN_ROOT}`. To put them into a
project, read `references/install.md` — it drives a short interview before
copying anything, because what a project needs varies.

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

## Bootstrap

Two halves, split by *when the value can change*:

- **`bootstrap-entry.scss` — build time.** Set Bootstrap's Sass variables and
  import the library already configured. Bootstrap derives ~400 component
  variables from them during compilation, so setting `$primary` once generates
  `--bs-btn-bg`, `--bs-nav-link-color` and hundreds more correctly with nothing
  mapped by hand. Radii, border width, font stacks and focus-ring geometry all
  belong here — they never change between themes.
- **`src/adapters/_bootstrap.scss` — runtime.** Only the ~45 root variables a
  theme must swap: surfaces, text, links, border colour, shadows, and the six
  theme colours.

Never hand-map `--bs-*` to `--app-*` variable by variable. That is the 957-line
mistake this replaced.

Two colour rules that are not obvious:

**Feed Bootstrap sRGB.** Its `shade-color()` / `tint-color()` call the legacy
`mix()`, which hard-errors on an oklch value. `bootstrap-entry.scss` wraps every
colour in `srgb()` for this reason. Nothing is lost — those values are only the
compiled fallback, and the adapter overwrites them with oklch at runtime.

**Never close a fallback chain on the property being declared.** A custom
property that references itself — even inside a `var()` fallback — is a cycle,
and the whole declaration is dropped as invalid:

```scss
// broken: --bs-btn-bg references itself
--bs-btn-bg: var(--app-button-bg, var(--app-bg-action, var(--bs-btn-bg)));
```

### Binding to a library that expresses variants through variables

Bootstrap says `.btn-primary` vs `.btn-danger` by setting `--bs-btn-bg` per
variant class. That makes the obvious bindings wrong in two different ways:

```scss
// collapses every button to one colour: this adapter is in `vendor-config`,
// declared after `vendor`, so a declaration on `.btn` beats every variant
.btn { --bs-btn-bg: #{...}; }

// collapses them too, and it is much harder to see. `--app-bg-action` is
// ALWAYS emitted, so resolution stops at level 2 every time and the
// `--bs-btn-bg` level is unreachable dead code.
.btn { background-color: var(--app-button-bg, var(--app-bg-action, var(--bs-btn-bg))); }
```

The fallback chain cannot carry the variant. **The variant selector has to**,
with each variant bound to the semantic role it means:

```scss
@each $bs, $role in $_map {          // primary→action, danger→danger, …
  .btn-#{$bs} {
    background-color: var(--app-button-bg, var(--app-bg-#{$role}));
    color: var(--app-button-fg, var(--app-fg-on-#{$role}));
  }
}
```

Generalising, when adapting any library: check whether the library variable is
**variant-driven**. If it is, bind per variant. If it is not (`--bs-card-bg`,
`--bs-modal-bg`), binding on the variable is fine — just terminate the chain on
a *different* property.

### Three more adapter rules learned the hard way

**If an adapter has to invent a value, layer 2 is missing a token.** An earlier
version computed button hover here with `color-mix(in oklab, … 85%, black)`,
because the status roles had no hover token. That reads as a small convenience
and is actually a design decision escaping into the adapter, where no theme can
override it and no hand-written component can match it. The fix was to add
`bg-{role}-hover` to layer 2. Treat `color-mix`, `lighten`, or any arithmetic on
a colour inside an adapter as a signal, not a solution.

**A library variable that exists is not necessarily read.** Bootstrap declares
`--bs-card-box-shadow` but only consumes it through its `box-shadow()` mixin,
which compiles to nothing while `$enable-shadows: false`. Setting the variable
looks right in devtools and renders nothing. When a binding has no visible
effect, check whether the library actually reads that variable in the build you
compiled — then bind on the property instead.

**Align where the design system has a token; leave the rest alone.** Card
padding differed from `--app-pad-surface`, so the adapter binds it — the system
has an opinion there. Bootstrap's bold badge and its `em`-based control padding
have no corresponding token, so they stay Bootstrap's own character. This keeps
adapters small and stops them from drifting into restyling the library.

**A contract entry nobody reads is worse than no entry**, because it reads as a
promise. `surface-pad` and `surface-shadow` sat in `_component.scss` unread, and
a Bootstrap card silently disagreed with a hand-written one about both. When
adding a name to the contract, wire it in the adapter in the same change.

## Tailwind

Optional, and a **bridge rather than an adapter** — it runs the other direction,
publishing layer 2 *as* Tailwind utilities:

```css
@theme inline {
  --color-surface: var(--app-bg-surface);
}
```

The `inline` keyword is the whole point. Plain `@theme` would resolve the value
at build time and also publish a second variable, so `[data-theme="dark"]`
would not move the utility. `@theme inline` keeps the `var()` reference in the
generated utility and publishes nothing — the utility follows every theme and
context at runtime, at zero extra bytes.

Do **not** publish layer 1 into `@theme` to get `bg-indigo-600`. It costs ~260
custom properties and hands application code a way around layer 2. Layer 1
borrows Tailwind's *naming*; it is not published to it.

## Adding to the system

- **New colour, spacing or shape decision** → `src/_semantic.scss`, then let
  themes supply the value in `src/_themes.scss`. Give every `bg-X` its `fg-on-X`.
- **New theme** → add a choices map to `src/_themes.scss` and list it in
  `$themes`. A theme is ~35 colour decisions, not ~103 tokens.
- **A section that overrides part of a theme** (inverted band, sunken well) →
  a **context**, not a theme. Contexts inherit everything they do not mention.
  `core.context()` refuses to compile a context that changes a background
  without its foreground. To say "checked, the inherited foreground is still
  right", give the key an explicit `null` — never point a token at itself.
- **New component hook** → `src/_component.scss`, only if it passes the
  admission test above.

## Verifying a change

```bash
npm run build     # compiles src/ds.scss and lints
npm run demo      # also compiles Bootstrap, for example/coexistence.html
```

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

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

## Compressing is fine. Compressing without a hook is not.

Layer 2 is deliberately smaller than most libraries: two brand roles, one
heading colour, no ramps. When a library offers more, the adapter maps the extra
onto the nearest semantic role. That is the right **default**.

It is only right as a default. If the adapter points straight at the semantic
token, the compression becomes a **limit** — and then using that library through
this foundation delivers less than using the library alone. For a base meant to
be universal that is disqualifying: adopting it must never take something away.

So every compression reads a **layer 3 hook** instead:

```scss
// wrong — the default is now the only option
--color-accent: #{core.ref('bg-selected')};

// right — same default, same zero bytes, one variable to diverge
--color-accent: #{component.ref-chain('accent-bg')};
```

Setting `--app-accent-bg` on `:root`, a section, or one element gives daisyUI a
genuine third brand colour without forking anything. The reserved names live in
`$contract` (`accent-*`, `heading-1-fg` … `heading-6-fg`, `action-50` …
`action-950`) and emit nothing until someone sets them.

**Where the line is.** The foundation may grow a name the ecosystem shares —
`accent` is a role Material, Radix and daisyUI all name; `heading-2-fg`
describes a document. It may not grow a name that only means something inside
one library. That distinction, not "never add anything", is what keeps the
vocabulary agnostic.

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

## Utility-based libraries — Flowbite and Preline

A library can have no vocabulary of its own to translate. Flowbite and Preline
ship **no component CSS at all**: their components are copy-paste markup made of
Tailwind utilities, so their theming surface *is* Tailwind's `@theme`.

Two consequences that do not arise anywhere else:

**Re-pointing works at runtime; ADDING does not.** A Tailwind utility only
exists if the token was visible at build time. Re-declaring `--color-brand` in
the adapter works, because Tailwind already generated `.bg-brand` holding a
`var()` reference. Declaring a *new* name like `--color-on-brand` at runtime
produces a variable no class reads — the background comes out right and the text
silently does not move. New names belong in the entry file under
`@theme inline`, which is why these adapters have a build-time half like
Bootstrap's.

**The pair invariant has to be exported.** Flowbite's own markup writes
`text-white` on filled components, putting the foreground half of the pair in
the markup where no adapter can reach it — and white on a mid-bright fill is
exactly what the contrast check rejects. The adapter publishes `--color-on-brand`
and friends so markup can name the paired foreground. Preline needs none of
this: it models `--primary-foreground` itself.

Preline is worth reading as a peer rather than a target. Its `theme.css` is a
semantic layer in `:root` plus an `@theme inline` bridge — the same split as
`src/_semantic.scss` plus `tailwind.css`, arrived at independently, `inline` and
all.

## Adapters can collide with each other

Two adapters can declare the same custom property with different meanings, and
nothing in either file shows it. daisyUI uses `--border` for a WIDTH; Preline
uses it for a COLOUR. Compiling both left daisyUI's inputs with
`border-width: 0` — valid CSS, silent build, visible only in a browser.

A library that namespaces its variables (`--bs-*`, `--pico-*`, `--bulma-*`)
cannot collide. One that uses bare names, or borrows a shared namespace like
Tailwind's `--color-*`, can — and no adapter can prevent it, because the names
belong to the library.

So: **`$adapters` should name at most one**, and `scripts/check-collisions.mjs`
fails the build if a bundled set disagrees about a name. To ship several (as
this repository does, to demonstrate six), compile each on its own from
`src/adapter-<name>.scss` and load it as a separate file next to the token
build. Adapters are leaves; building them separately is the honest shape.

### Writing a new adapter: what to work out first

Five questions, in this order. They decide the shape of the whole file, and each
has a worked example among the existing adapters.

1. **Does it ship layered?** If not, wrap it: `@import '…' layer(vendor)` in an
   entry file. Unlayered CSS beats every cascade layer, so an unwrapped library
   beats the adapter. (Pico, Bulma.)
2. **Does it accept whole colours, or channels?** Whole colours map as live
   references. Channels — or rgb triplets — must be computed per theme at build
   time and stop following runtime overrides. (Bulma, Bootstrap.)
3. **Are variants references or literals?** References mean setting one root
   variable moves everything (daisyUI, Bulma). Literals mean binding per variant
   selector (Bootstrap). Classless libraries have no variants at all (Pico).
4. **Where does it paint the page?** Most libraries conflate "page" with
   "surface" where layer 2 separates them. Look for a separate indirection —
   daisyUI's `--root-bg`, Bulma's `--bulma-body-background-color` — and point
   that at `bg-page` while the surface variable takes `bg-surface`.
5. **Does it namespace its variables?** If it uses bare names or a shared
   namespace, it can collide with another adapter and must not be bundled
   alongside one. Compile it standalone from `src/adapter-<name>.scss`.

And in every case, declare the mapping on `:root, [data-theme], [data-surface]`
rather than `:root` alone, or the library freezes at the root's theme.

### The pair invariant applies to adapters, and this is where it breaks

Every `bg-X` in layer 2 has a paired `fg-on-X`. `core.context()` enforces that
mechanically for contexts. **An adapter is the other place a background gets
assigned, and it is the easier place to forget** — with worse consequences,
because a library will not leave the foreground undefined. It derives one.

Bulma is the worked example. Given only a background it computes
`--bulma-primary-invert-l: var(--bulma-primary-05-l)`, a near-black tint of the
same hue. That reads well on the bright teal it ships with and is unreadable on
a dark brand colour — and because buttons, tags and notifications all read that
one variable, a single missing mapping broke three components at once.

So: **whenever an adapter assigns a background, map the paired foreground in the
same breath.** `core.fg-for('bg-action')` returns the token that belongs on top,
and errors if the role cannot legitimately be a background — which also catches
the related mistake of mapping a `fg-*` role into a fill slot, as the Bulma
adapter originally did with `link`.

### A baked foreground is the recurring adapter bug

Three libraries, three spellings of the same failure: a foreground fixed at
build time against a background that moves at runtime.

- **Bootstrap** compiles `.text-bg-primary { color: #fff }` via `color-contrast()`
  against the build-time `$primary`, while the background follows
  `--bs-primary-rgb` per theme. Dark theme brightens the fill and the baked
  white lands at 3.13:1.
- **Flowbite** writes `text-white` in its component markup.
- **Water** sets the button background and lets the text inherit `--text-main`,
  and compiles `mark { color: #000 }` — which under a dark theme puts black on a
  near-black amber highlight at 1.4:1.

In each case the fix is the same: bind the paired foreground from the token,
per variant if the library has variants. Ask `core.fg-for()` what belongs on
top. **Whenever an adapter moves a background, find where that thing's text
comes from** — if the answer is a literal, a markup class, or inheritance, it
will not follow the theme.

### An adapter binding a base selector overrides the library's state rules

Cascade layers beat specificity, and adapters live in a later layer. So
`button { color: … }` in the adapter beats `button:disabled { color: … }` in the
library, even though the library's selector is more specific. MVP models the
disabled pair correctly and still ended up with light text on a light disabled
fill at 1.19:1.

Exclude the states the library already handles — `button:not(:disabled)` — rather
than re-implementing them. Same shape as the Bootstrap variant collapse: a base
selector in a later layer silently swallowing a more specific rule.

### Contrast is checked at build time, not assumed

The pair invariant guarantees a foreground is *declared*. It cannot say whether
that foreground is *readable*, and the gap between those two is where
accessibility regressions live: every theme here had a complete, well-formed set
of pairs, and three of them were failing WCAG AA.

There are two checks, and they see different things. `npm run audit:contrast`
drives every demo page in every theme through a real browser and measures what
is actually rendered — the only way to catch a foreground the library baked, a
state rule the adapter clobbered, or a filter. It finds filled elements
**structurally** (an opaque background different from the parent's, plus text of
its own) rather than by class name, because a class-based scan measured five
elements on a utility-composed page and reported "all pass" on almost nothing.

The build-time check is the cheaper one. `base.contrast($fg, $bg)` returns the
WCAG ratio, and `_themes.scss` measures every pair of every theme on each build:

- below **3.0** → `@error`. Unreadable at any size.
- **3.0–4.5** → `@warn`. Large text only, which is a real choice for a badge.
- **4.5+** → silent.

It costs nothing at runtime — pure Sass arithmetic, no CSS emitted. When adding
or editing a theme, let the build tell you rather than eyeballing swatches. The
misses cluster in one place: **white text on a mid-bright fill.** Amber, teal,
green and sky all read lighter than their step number suggests and need one more
step down, or a dark foreground instead.

### A fill-shaped check cannot see an outline button

The rendered audit measured elements that paint an **opaque background** — and
for a long time only those. Every library also ships variants that colour the
*text* and leave the background transparent (`.btn-outline-*`, `.is-outlined`,
`.btn-ghost`, Pico's `.outline`, every link button). Those have no fill, so the
scan skipped them in silence and reported "all pass" on pages where five
buttons were failing. Widening the check to two cases — *paints a background
different from its parent's* **or** *paints a text colour different from its
parent's* — nearly doubled what gets measured and immediately found four
distinct bugs.

Two details make case 2 correct rather than noisy: measure against the nearest
**opaque ancestor** (an outline button's parent is usually a transparent
wrapper, and flattening onto transparent silently yields black — a bug that
made passing elements look like 2.6:1 failures), and skip disabled controls,
which WCAG exempts and every library deliberately dims.

### Generate the contrast matrix; do not curate it

The build-time check took a hand-written list of pairs, and a hand-written list
only ever covers what someone remembered. `text` was checked against all four
surfaces, but `text-muted` only against `surface` and `link` only against
`action-subtle` — so muted text on a sunken panel and a link on a raised card,
both everyday combinations, were never measured. Replace the list with a
generated matrix: every surface x every foreground that can legitimately land on
one. It is 48 pairs nobody would maintain by hand, and its value is that it
cannot silently omit one.

Building that matrix exposed a naming lie worth watching for. `fg-action` and
`fg-selected` were *aliases of the fill* — `map.get($c, action)` — while the
four status roles each had a real `{role}-text` tone. So two of the six roles
had no text colour at all, and anything reaching for "the action text colour"
silently got a colour chosen to sit **under** white text. Layer 2 now defines
`action-text` and `selected-text` like every other role. If a token named `fg-*`
resolves to the same value as its `bg-*`, that is not a shortcut, it is a
missing decision.

### Find the library's open seams before declaring a limit

A library often *derives* a variant instead of reading a token for it. daisyUI's
`.btn-outline`, `.btn-dash`, `.btn-ghost` and `.btn-soft` all draw the label in
the variant's **fill** colour. A fill is picked to carry white text, so reusing
it as text on a near-white background fails by construction — daisyUI's own
default theme renders `btn-warning btn-soft` at **1.69:1** and three of its
siblings under 2.7:1.

The first reading of this said the derivation was unreachable, because daisyUI
sits inside `utilities` and no adapter rule can beat it by property. That
conclusion was wrong, and the way it was wrong is the lesson: **"cannot override
by property" is not "cannot reach".** daisyUI publishes `--btn-rest-fg` for
exactly this purpose, and *nothing declares it* — it only ever appears inside a
`var(--btn-rest-fg, …)` fallback. A variable nobody declares has no cascade
fight to lose, so the adapter binds it per variant to `fg-{role}`, the tone
layer 2 already validates against a subtle background, and all four variants
clear 6:1 in every theme.

**So grep the built library CSS for `var(--x, …)` hooks it reads but never
sets.** Those are the seams the library deliberately left open. They are easy to
miss precisely because they never appear as a declaration.

**And beware the fix that bends layer 2 instead.** The wrong version of this
darkened `bg-success` and `bg-danger` a step so the derived text would pass.
That works, and it is contamination: layer 2 would have moved to accommodate one
library's arithmetic, changing every other library's buttons as a side effect.
When a library's derivation misbehaves, the adapter owns the problem. Moving a
semantic token is only correct when the token itself is wrong.

### Five more adapter rules learned the hard way

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

**An absolute colour name is a palette entry, not a theme role.** Bootstrap's
`.btn-light` and Bulma's `.is-light` look like they should map to `bg-sunken`,
and mapping them is a regression. `--bulma-light-l` is a *modifier*: Bulma
subtracts it from a variant's lightness to build `.button.is-primary.is-light`,
so an absolute lightness is load-bearing there. Binding it to a theme role
dropped seven variants to 1.06:1. If a library names a colour by how light it
is rather than by what it means, leave it alone — the theme has nothing to say
about it.

**Check where the library puts its own layers before designing the adapter.**
Wrapping a library in `layer(vendor)` only moves CSS that was unlayered to begin
with. daisyUI nests its components inside `utilities.daisyui.l1…`, inside the
*last* layer, so no adapter rule can beat a daisyUI declaration by property at
any specificity. Grep the built library CSS for `@layer` first — but read the
finding narrowly: it tells you property-level binding is unavailable, **not**
that the library is out of reach. Variables still work, and that is usually
enough (see "Find the library's open seams").

**A contract entry nobody reads is worse than no entry**, because it reads as a
promise. `surface-pad` and `surface-shadow` sat in `_component.scss` unread, and
a Bootstrap card silently disagreed with a hand-written one about both. When
adding a name to the contract, wire it in the adapter in the same change.

## daisyUI

The second adapter, and the useful contrast with Bootstrap. Both libraries
express variants through custom properties, but they resolve them at opposite
times, and that single difference explains most of the size gap between the two
adapter files:

```
Bootstrap  .btn-primary { --bs-btn-bg: #5f3212 }              <- compiled LITERAL
daisyUI    .btn-primary { --btn-color: var(--color-primary) }  <- REFERENCE
```

Because daisyUI keeps references, setting `--color-primary` once moves every
primary component and no per-variant binding is needed. Compile
`daisyui-entry.css` with `themes: false`, or daisyUI's built-in themes declare
the same variables and whichever loads last wins.

Two things to get right, both found by testing rather than by reading:

**`--size-field` and `--size-selector` are units, not heights.** daisyUI does
`--size: calc(var(--size-field) * 10)`. Mapping `--size-field` straight to
`--app-size-control` renders a 22.5rem button. Divide by the same factor:
`calc(var(--app-size-control) / 10)`.

**`--root-bg` is a separate indirection point.** daisyUI paints the document
from `--root-bg`, which defaults to `var(--color-base-100)` behind a `:where()`.
Re-pointing `--root-bg` at `bg-page` while `base-100` takes `bg-surface`
preserves the page/surface distinction that daisyUI's own model does not make.

## Pico CSS — the classless case

Pico styles `button`, `input` and `table` directly. There is no variant class to
enumerate, so none of the per-variant machinery applies and the whole adapter is
root variables.

Two things it teaches that generalise:

**A library that ships unlayered must be wrapped.** Unlayered CSS beats every
cascade layer, so Pico's own `[data-theme=dark]` block would beat the adapter
and dark mode would silently revert to Pico's blues. `pico-entry.css` exists
only to do `@import '…/pico.css' layer(vendor)`. This is the `@layer` trap met
from the other side: `app.css` says layer the *legacy* stylesheet, and the same
reasoning says layer the *library*.

**Pico owns `data-theme` too**, shipping its own `[data-theme=light|dark]`
blocks. That is an attribute collision rather than a class collision, and layer
order resolves it entirely — no theme-name special-casing needed. Under a third
theme like `brand`, neither of Pico's blocks matches and the adapter overrides
its `:root` defaults instead; same mechanism, same result.

Pico also splits each intent into a text colour and a background colour
(`--pico-primary` vs `--pico-primary-background`). Layer 2 already models that as
`fg-action` and `bg-action`, so it maps one-to-one.

## Bulma — the library that will not take a colour

Bulma decomposes colour into channels and derives everything from them:

```css
--bulma-primary-h: 25deg;  --bulma-primary-s: 69%;  --bulma-primary-l: 22%;
--bulma-primary: hsla(var(--bulma-primary-h), var(--bulma-primary-s), …);
```

CSS cannot take a `var()` apart, so the channels cannot be references. Compute
them from the theme's colour at **build time** and emit per theme — the same
answer `--bs-primary-rgb` needed, reached from a different direction.

**Gamut-map before reading channels.** oklch describes colours sRGB cannot show,
and their raw HSL channels come back invalid — `green-700` yields saturation
143%. Use `color.to-gamut($c, $space: rgb, $method: local-minde)`, which reduces
chroma while holding lightness and hue instead of clipping.

**State the cost.** A decomposed value follows a theme but *not* a runtime
override: rewriting `--app-bg-action` on `:root` moves Bootstrap, daisyUI and
Pico live, and does not move Bulma. Whatever the library exposes whole — radius,
fonts, the body background — stays a live reference; map those normally.

The payoff is that derivability beats surface size. Bulma ships 1416 custom
properties and needs ~30 declarations, because `--bulma-button-h` is just
`var(--bulma-scheme-h)`. **An adapter's cost is set by how a library is
organised, not by how much it ships.**

## Two libraries cannot share one page

Bootstrap and daisyUI collide on 158 class names — `btn`, `btn-primary`, `card`,
`card-body`, `alert`, `badge`, `modal`, `table`, `navbar` and more. On one page
the later cascade layer wins and one library's components silently become the
other's.

No adapter can fix this and it is not a design-system problem: the token layer
makes libraries agree on *colour*, not on who owns `.btn`. Pick one library per
application. If a page must demo both, give each its own page.

Worth knowing because the failure is nearly invisible: with both loaded,
`.btn-primary` still looks right, since both libraries resolve it to the action
token. Only a class one library lacks — `.btn-danger`, which daisyUI does not
define — exposes it.

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
  `$themes`. A theme is ~35 colour decisions, not ~110 tokens. The build
  measures every bg/fg pair for contrast, so add the theme first and let it tell
  you which pairs need moving.
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

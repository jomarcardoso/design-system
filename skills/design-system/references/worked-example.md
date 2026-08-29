<!-- skills/design-system/references/worked-example.md -->

# A worked example

What a finished theme looks like, taken from a product in this repository:
[`example/ds-caderno-accent-driven`](../../../example/ds-caderno-accent-driven).
Every value below is the one that actually compiles there — nothing here is
illustrative.

**Read this before writing a theme map.** It is the only place the shape is
visible end to end, and the shape is not guessable from `tokens.md`: that file
documents the names the build **emits**, and a theme map is written in a
different vocabulary, the one it **accepts**. Guessing from the emitted names
produces `'bg-page': …` where the map wants `page: …`, which is the commonest
way a first theme fails.

The product: a recipe notebook. `editorial-premium`, `monochrome`,
`elevation: borders`. Two pigments, and everything else is a ladder position.

---

## Three files, and the split matters

| file | layer | holds |
|---|---|---|
| `palette.scss` | 1 | the pigments, and the ramps derived from them |
| `theme.scss` | 2 | the assignment — which ladder position plays which role |
| `ds.scss` | — | the entry: configures the system and **emits** everything |

Layer 1 lives in the **project**, not in the vendored `src/`. Writing
`ramp.neutral()` into `src/_base.scss` puts a product's palette inside a file
the next upgrade overwrites.

**The third file is the one that is easy to forget, and without it the other two
do nothing.** `palette.scss` and `theme.scss` define Sass variables; a variable
that is never passed to `emit-theme()` produces no CSS at all. A build that
stops after the theme map looks finished and outputs an empty stylesheet.

## `palette.scss` — layer 1

The whole palette of the product is the two lines at the bottom.

```scss
// example/ds-caderno-accent-driven/palette.scss

@use '../../src/ramp';

// PAPER — the neutral. A warm ochre pigment held well back.
//
// `$pigment: 0.7` is `neutralPigment` from DESIGN_LANGUAGE.md. At 1 the
// mid-tones read as tea stain; at 0 this is an ordinary grey ramp and the
// product stops looking like paper. The visible difference is a few
// thousandths of chroma, and it is the difference between a notebook and a
// settings screen.
$paper: ramp.neutral(#8a7355, $pigment: 0.7);

// PEN — the accent. Ballpoint blue, the one live colour on the page.
$pen: ramp.chromatic(#005bac);
```

**The seed is the PIGMENT, not the lightest step.** The seed's own chroma is
the peak the curve multiplies, so handing `ramp.neutral()` a near-white paper
colour looks right and is not: `oklch(0.97 0.012 85)` has a chroma of 0.012,
which at `$pigment: 0.6` leaves a peak of 0.007 and produces an ordinary grey
ramp. Nothing errors — a grey ramp is a valid ramp — and the warmth the
interview asked for is simply absent. Two real runs made this exact mistake.

`ramp.neutral()` returns steps `0, 50, 100, 150, 200, 300 … 950`;
`ramp.chromatic()` returns `50, 100, 200 … 950`. Same step keys a hand-written
family uses, so `map.get($paper, 300)` works like any palette entry.

**This is `monochrome` only.** The `functional` school's layer 1 is several
independently chosen hues, and which hue plays which role is the product's
decision rather than a ladder position — generating those would be inventing
the palette instead of recording it.

## `theme.scss` — layer 2

Two local accessors, then one map. The accessors are the idiom: **there is no
`pal()` call that takes a ramp map** — `base.pal()` takes the *key* of a family
registered in the palette, which a generated ramp is not.

```scss
// example/ds-caderno-accent-driven/theme.scss

@use 'sass:map';
@use '../../src/base';
@use 'palette' as p;

@function paper($step) { @return map.get(p.$paper, $step); }
@function pen($step)   { @return map.get(p.$pen, $step); }

$caderno: (
  // --- Paper: the ladder ---------------------------------------------------
  //
  // The page is NOT the lightest step. Step 0 is pure white, reserved for
  // something lifted clear of the page. Putting the page at 100 leaves two
  // lighter steps above it, which is what lets a card read as resting ON the
  // sheet rather than as a hole cut in it.
  page: paper(100),
  surface: paper(50),
  raised: paper(0),
  sunken: paper(200),
  'surface-hover': paper(150),
  'surface-active': paper(200),
  overlay: rgba(40, 33, 28, 0.55),

  // --- Ink -----------------------------------------------------------------
  text: paper(900),
  'text-muted': paper(700),
  'text-subtlest': paper(600),
  heading: paper(950),

  // A neutral FILL — the secondary button. `secondaryAction: neutral`, and in
  // this school that is the default rather than a fallback: a supporting action
  // tinted with the accent puts two blues on a page whose premise is one.
  neutral: paper(700),
  'on-neutral': paper(0),
  'neutral-hover': paper(800),
  'neutral-active': paper(900),

  disabled: paper(200),
  'disabled-text': paper(500),

  // --- Pen: the one live colour --------------------------------------------
  //
  // ONE declaration, and the school is what makes that enough. `accent`
  // expands to what acts, what is chosen and where text goes. In the functional
  // school this same block is twenty-one entries.
  accent: pen(700),
  'on-accent': paper(0),
  'accent-hover': pen(800),
  'accent-active': pen(900),
  'accent-subtle': pen(50),
  'accent-text': pen(700),

  // Not aliased onto the accent, on purpose. The school says one HUE, not one
  // state, and a visited link that looks unvisited is an accessibility
  // regression dressed as minimalism.
  'link-visited': pen(900),

  // --- Structure -----------------------------------------------------------
  //
  // `elevation: borders` — a ruled page separates blocks with lines, and the
  // two shadows exist only for the two things that genuinely float.
  border: paper(300),
  'border-subtle': paper(200),
  'border-strong': paper(500),
  ring: pen(600),
  'shadow-raised': base.scale(shadow, '2xs'),
  'shadow-overlay': base.scale(shadow, sm),

  // --- Status: the four exceptions -----------------------------------------
  //
  // Straight from the tool's own primitives rather than from either pigment.
  // "One accent" governs the INTERFACE — what acts, what is chosen, where text
  // goes — not the four colours that carry meaning a shape cannot.
  success: base.color(green, 700),
  'on-success': paper(0),
  // …hover, active, subtle, text, border for each of success/warning/danger/info

  // The inverted pair. Dark ink on a light amber fill, so it BRIGHTENS as it is
  // pressed — darkening walks the fill toward its own label and the text
  // disappears exactly while the user is on it.
  warning: base.color(amber, 200),
  'on-warning': base.color(amber, 950),
  'warning-hover': base.color(amber, 100),
  'warning-active': base.color(amber, 50)
);

// Typography is where a monochrome product keeps its identity. With one accent
// and a grey ramp, the pairing is what separates a notebook from a dashboard.
$typography: (
  'font-family-body': (ui-sans-serif, system-ui, -apple-system, sans-serif),
  'font-family-heading': (ui-serif, Georgia, Cambria, serif)
);

// STRUCTURE — the archetype's numbers, and the half most often left out.
//
// Radius, control size, icon stroke and leading come from the archetype row in
// `archetypes.md`, plus whatever `overrides` the document records. They are
// theme-independent, so they go through `emit-structure()` beside the
// typography — NOT into the theme map, which is colour.
//
// A build that passes only `$typography` compiles, passes every gate, and
// quietly ships the tool's defaults for all of these while the document beside
// it says 4px and 44px. Nothing reports it, because a default is a valid value.
$structure: (
  'radius-control': 4px,
  'radius-surface': 6px,
  // `size-control` raised from the archetype's 40px by the multiplatform
  // override. Written against the unit so a density change carries it.
  'size-control': calc(var(--app-space-unit) * 11),
  'size-icon': 20px,
  'icon-stroke': 1.25px,
  'line-height': 1.7
);
```

**Omit a key here and you get the tool's default, silently.** That is the right
behaviour — most products should not restate every structural token — but it
means the check is: for each structural key `DESIGN_LANGUAGE.md` decided, is it
in this map? `radius`, `density`, `platform` and the three icon keys all land
here.

## `ds.scss` — the entry, where everything is emitted

**This is where configuration happens too.** `@use … with` on the vendored
config module, from the entry — not by editing `src/_config.scss`, which is the
module being configured and cannot configure itself.

```scss
// example/ds-caderno-accent-driven/ds.scss
//
//     sass --load-path=. example/ds-caderno-accent-driven/ds.scss ds.css

@use 'sass:map';
@use '../../src/config' with (
  $adapters: (),
  // The load-bearing line. It tells `check-roles()` that action, selected and
  // link all being the same pen is the design and not a collapse.
  $colour-strategy: 'monochrome'
);

@use '../../src/base';
@use '../../src/semantic';
@use '../../src/component';
@use '../../src/derive';
@use 'theme';

// Layer 1 — two pigments and a ladder. Emits nothing.
@include base.emit();

// Layer 2 — structure with this product's typefaces, then the day theme.
@include semantic.emit-structure(map.merge(theme.$structure, theme.$typography));
@include semantic.emit-theme('light', theme.$caderno, $default: true);

// Night, GENERATED. `derive.dark()` transforms by ROLE rather than per colour,
// so the pen comes up the ramp until it separates from a dark page and its
// label goes dark with it — and every interaction state then brightens, because
// a fill moves away from its own label. It goes through the same contrast gate
// as the hand-written theme above.
@include semantic.emit-theme('dark', derive.dark(theme.$caderno), $auto: true);

// Layer 3 — the naming contract, unemitted. Nothing here diverges from its
// defaults, which is the point of a school-aware layer 3: a monochrome product
// gets a neutral secondary action without writing a line.
```

**An adapter's `emit()` takes the theme MAPS**, not their names:

```scss
@use '../../src/adapters/coreui';

@include coreui.emit((
  'light': theme.$recepta,
  'dark': derive.dark(theme.$recepta)
));
```

CoreUI, Bootstrap and Bulma derive colour *channels* — rgb triplets, HSL
components — and a channel cannot be read out of a `var()`. `require-themes()`
errors with that explanation rather than compiling something half-bound. The
caderno above has no adapter and so no such call; every library build has one.

Five things worth taking from it:

- **Dark mode is one line**, and it is derived rather than written. A second
  hand-written theme is a second set of decisions to keep in sync; `derive.dark()`
  is one call that is re-checked by the same gate.
- **`emit-structure()` takes the typography map.** Radius, control size and
  icon stroke from `DESIGN_LANGUAGE.md` reach the build through this call and
  its structure map — not through the theme, which is colour.
- **`$adapters` is set here**, in the entry, from the install answer.
- **Layer 3 is `@use`d and not emitted.** Reserving the names costs nothing;
  emitting them is only needed where a component genuinely diverges.

## What to copy, and what not to

**Copy the shape**: two files, local step accessors, map keys in the school's
vocabulary, status straight from primitives, structure last.

**Do not copy the values.** They belong to a notebook. A different
`DESIGN_LANGUAGE.md` gives different pigments, a different ladder assignment and
possibly a different school, and a theme that reuses these numbers is this
product wearing another product's name.

**Notice what is absent.** No `bg-` or `fg-` prefixes, no `--app-*`, no
`base.pal($paper, …)`, no hex outside `palette.scss`, and no entry repeated
three times under three names. If a draft has any of those, it was written from
the emitted vocabulary rather than the accepted one.

**And notice what must be PRESENT.** A theme map with no `emit-theme()` call
behind it compiles to nothing. Before calling a build finished, find the entry
file and check that `emit-structure()` and `emit-theme()` are both there, once
per theme.

# Changelog

This tool is **vendored**: a project copies `src/` into its own tree rather than
resolving it from a package manager. So a project can sit several versions
behind and nothing will tell it — there is no dependency range to violate and no
install step to fail.

That is what this file is for. Every entry that requires action from a vendoring
project carries a **To upgrade** block with the concrete edit, so catching up is
reading this file top-down and applying the blocks newer than your copy.

Which version you have is in `package.json`. If your copy predates versioning,
start at 0.2.0 and apply everything.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning is [semantic](https://semver.org/spec/v2.0.0.html), where "public
API" means the layer 2 token contract, the layer 3 name contract, and the
signatures of `emit-theme()`, `core.context()` and each adapter's `emit()`.

---

## [Unreleased]

---

## [0.4.0]

**Layer 2 stops being one contract shared by three schools and becomes three
vocabularies.** The largest change in the tool so far, and the one that makes
the school a real architectural choice rather than a lint setting.

### Changed

- **BREAKING: each school emits its own layer 2 names.**

  | canonical            | `functional`   | `brand`               | `monochrome`   |
  | -------------------- | -------------- | --------------------- | -------------- |
  | `bg-action`          | `bg-action`    | `bg-primary`          | `bg-accent`    |
  | `fg-on-action`       | `fg-on-action` | `fg-on-primary`       | `fg-on-accent` |
  | `bg-action-subtle`   | (same)         | `bg-primary-container`| `bg-accent-subtle` |
  | `bg-selected`        | (same)         | (unchanged)           | `bg-accent`    |
  | `fg-link`            | (same)         | (unchanged)           | `fg-accent`    |

  Surfaces, ink, borders, shadows, disabled and the whole status family are
  common to all three and are **not** renamed. Renaming those would be
  vocabulary for its own sake.

  Measured on the accent-driven example: **8 interactive colour names against
  functional's 15**, and the three canonical families that collapse onto the
  accent are now one declaration in the theme map instead of three filled with
  the same value.

  **To upgrade:** if your project is `functional` — the default — nothing
  changes; that school IS the canonical vocabulary. Otherwise, rename the
  interactive tokens your product CSS reads by hand, per the table.
  `check-dangling-refs.mjs` names every one you miss, and it now runs over the
  examples in `npm run verify` so the same regression cannot come back.

- **Theme maps are written in their school's vocabulary.** A monochrome theme
  declares `accent` once rather than filling `action`, `selected` and `link`
  with the same value; a brand theme declares `primary`. The canonical keys
  still work and always win when both are present, so a monochrome product whose
  links really are a step lighter than its buttons writes `link` and keeps it.

- **BREAKING: layer 3 reads through `core.ref()` instead of writing `var()`.**
  All 289 entries. They spelled `var(--app-bg-action)` literally, which meant the
  entire layer bypassed the school resolver and a monochrome build would have
  emitted accent tokens that layer 3 never pointed at. Verified behaviour-
  preserving: `dist/ds.css` is byte-identical for the functional school.

  **To upgrade:** nothing, unless you override a layer 3 entry in your
  `tokens.scss`. Those still take a plain `var()` and are unaffected.

### Added

- `src/_roles.scss` — the canonical→school map, and one place where every
  collapse is written down. `core.ref('bg-action')` resolves through it at build
  time, so eleven adapters and 289 layer 3 entries keep a single code path and
  still produce school-correct CSS.

- **A collapse assertion.** Where a school maps several canonical roles onto one
  emitted name, their values must agree, and the build fails naming both if they
  do not. A "monochrome" theme whose action and selection are different colours
  is not monochrome, and the build says so instead of emitting whichever the map
  iterated last.

### Fixed

- `core.theme()` typed `var(--app-bg-selected)` by hand for `accent-color`, in
  the one file whose own header says nothing else in the codebase should. It was
  invisible until the vocabularies split, and then it was the single name
  leaking canonical spelling into a monochrome build.

- The brand map's first draft sent both `action-subtle` and `selected` to
  `primary-container`, on the reasoning that the brand school merges them. Itau
  — reconstructed here from 383 custom properties read off the live site — has a
  pale lilac selection and an orange action, and the new assertion refused to
  compile it. The school is that action and selection may share a HUE, not that
  they are one token. **Caught by a real system rather than by review.**

---

## [0.3.0]

Accent-driven becomes a school the tool actually supports, rather than a value
`check-roles()` recognises.

### Added

- **`src/_ramp.scss` — generated layer 1.** `ramp.neutral($seed, $pigment:)` and
  `ramp.chromatic($seed)` turn two pigments into two full palettes with the same
  step keys a hand-written family uses, so `pal(paper, 100)` keeps working and a
  project can swap a hand-tuned palette for a generated one without touching
  layer 2.

  Offered, not imposed. It is how the accent-driven school works — a neutral
  ramp plus one accent, mapped by ladder position — and it is the wrong tool for
  `functional`, whose layer 1 is several independently chosen hues where which
  hue plays which role IS the design.

  Chroma is a CURVE, not a constant: it peaks in the mid-tones and falls toward
  both ends. That was measured off a hand-tuned paper palette, not invented — a
  flat chroma gives the pale steps a cast that reads as a miscalibrated monitor.

- `example/ds-caderno-accent-driven/` — the school built from two pigments, no
  component library, with its `DESIGN-LANGUAGE.md`. Light theme written, dark
  generated by `derive.dark()`, both through the contrast gate.

- **`accent-driven` and `minimalist` accepted as aliases for `monochrome`.** The
  school has three names in the wild and a client sold one of the other two
  should not have to learn ours. Read through `config.strategy()`, so the
  aliases live in one place.

### Changed

- **BREAKING: layer 3 `$accent-*` renamed to `$tertiary-*`.**
  `$accent-bg`, `$accent-fg`, `$accent-bg-hover`, `$accent-bg-subtle`,
  `$accent-fg-on-subtle` → `$tertiary-*`.

  The entry is a second brand FILL — Material's tertiary, daisyUI's `accent`
  slot — and it defaults to neutral. In the accent-driven school "accent" means
  the opposite thing: the single live colour carrying every interactive job. A
  product in that school setting `$accent-bg` was reaching for its accent and
  getting a library's third brand slot, which is grey. The collision was
  guaranteed to bite the one school most likely to type the word.

  **To upgrade:** rename any override in your `tokens.scss`. If you have none —
  the common case, since it defaults to neutral precisely so that unset means
  "no second brand colour" — there is nothing to do.

- The colour-school question in the interview is now seven questions instead of
  two. The opener sorts by product priority and is explicitly **not** the
  decider; the appearance question still decides, and when the two disagree that
  disagreement is information worth naming to the client. Three of the new ones
  are asked only for accent-driven, and they are decisions the generator used to
  make silently: the accent's contrast profile, how much pigment is in the
  neutrals, and how one surface is told from the next.

### Not changed, and worth recording

**Layer 3 does not diverge by school, and it should not.** The obvious move —
different layer 3 defaults per school — was investigated and dropped, because
layer 2 already absorbs the difference. `$chip-bg-selected` points at
`--app-bg-selected` in all three schools; what changes is what the THEME points
`selected` at: its own hue in `functional`, the brand hue in `brand`, the accent
in `monochrome`. That is the design working, and adding a second mechanism on
top of it would give every school-dependent value two places to be decided.

The one case that genuinely cannot be expressed at layer 2 — a secondary action
that is a filled second brand colour — is exactly the `$tertiary-*` entry
renamed above.

---

## [0.2.0]

The first versioned release. Documented retroactively from git, because the
changes below all landed before this file existed and a project vendoring an
earlier copy still has to act on them.

### Removed

- **`src/_themes.scss` is gone, and with it the `light` / `dark` / `brand`
  themes the tool used to ship.** The tool builds design systems; it is not one.
  A theme is whatever the project defines. The only theme generated for you is
  the opposite-scheme counterpart of yours, via `derive.dark()`.
- `config.$themes` and `themes.emit-contexts()` removed. Contexts are written
  per project with `core.context()`, which enforces the background/foreground
  pair invariant at compile time — the hand-written form does not.

**To upgrade:**

```scss
// delete these
@use './src/themes';
@include themes.emit-contexts();

// and drop $themes from the config block
@use './src/config' with (
-  $themes: (),
   $adapters: (),
);
```

Then define your themes and emit them yourself:

```scss
@use './semantic/light';
@use './semantic/dark';

@include semantic.emit-theme('light', light.$tokens, $default: true);
@include semantic.emit-theme('dark', dark.$tokens, $auto: true);
```

### Changed

- **Every adapter's `emit()` now REQUIRES its `$themes` argument.** It used to
  fall back to a registry of themes that shipped with the tool; there is no
  registry. Without the argument an adapter emits references but no rgb
  triplets, so every opacity utility, focus ring and `.text-bg-*` silently keeps
  the library's own default.

  **To upgrade:** `@include coreui-adapter.emit((light: light.$tokens));`
  The adapter `@error`s with the exact call to write if you forget.

- **Vendor only the adapters you use.** `src/adapters/` holds one file per
  library; a project needs the one for its library. Copying the directory
  wholesale ships ten adapters that never compile to anything and makes every
  later sync a guess.

### Added

- `emit-theme($name, $choices, $default:, $auto:)` — `$auto: true` additionally
  emits the theme under
  `@media (prefers-color-scheme: dark) { :root:not([data-theme]) }`, so a
  visitor who has never touched a toggle gets their OS setting while an explicit
  `data-theme` still wins. Pass it to exactly one theme per scheme.
- `derive.dark($lightMap)` — generates a dark theme from a light one. Works in
  OKLCH, preserves hue, transforms by ROLE rather than per colour, and its
  output goes through the same contrast gate as a hand-written theme.
- `--app-blend-ink` — `multiply` on a light theme, `screen` on a dark one,
  derived from the theme's own page luminance. Products that blend ink into a
  paper texture write `mix-blend-mode: var(--app-blend-ink)` and are correct in
  themes that do not exist yet.
- Layer 3 grew from 187 to ~278 names, from an inventory of what one real
  product's components actually set. The layer previously had `offcanvas`,
  `pagination` and `toast` before it had `card`, because it had been written
  from what LIBRARIES expose.
- Four guards: `check-theme-proof`, `check-dumb-components`,
  `check-custom-prop-interpolation`, `check-token-grammar`.

  **To upgrade:** wire them into `build:tokens`.
  `check-dumb-components` takes `--allow=N` so it can be adopted mid-migration
  and ratcheted down.

### Fixed

- `color-scheme` is derived by MEASURING a theme's page luminance instead of
  matching the literal name `dark`. A night theme called anything else shipped
  light native scrollbars, `<select>` popups and form controls on a dark page.
  The same fix was applied to the CoreUI adapter's `[data-coreui-theme]` alias.
- Bulma declares `--bulma-background-l` on bare `:root`, at 96% normally and 14%
  under `prefers-color-scheme: dark`. On a dark-mode OS the dark value applied
  under every theme while `--bulma-code` kept the light theme's ink, rendering
  `<code>` near-black on near-black at 1.09:1. The adapter now emits that name
  per theme.

---

## [0.1.0]

Unversioned prehistory. If your vendored copy predates `CHANGELOG.md`, treat it
as 0.1.0 and apply 0.2.0 onward.

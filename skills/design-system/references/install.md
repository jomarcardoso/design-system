<!-- skills/design-system/references/install.md -->

# Installing the design system into a project

The files are **vendored**, not installed from a registry: copy them in, and the
project owns them from that point on — there is no package boundary to reach
across.

**Configuration happens in the project's ENTRY file, not by editing
`src/_config.scss`.** That file holds `!default` values and is the module being
configured; the entry does `@use '…/src/config' with (…)`, which is what every
example in `example/` does. Editing the vendored copy also works and is worse:
the next upgrade overwrites it.

Source: `${CLAUDE_PLUGIN_ROOT}`.

## Before this file

Installing is the SECOND step, not the first. The plugin ships three skills
and they run in order:

| | skill | produces | question it answers |
|---|---|---|---|
| 1 | `design-language` | `DESIGN_LANGUAGE.md` | why does it look and sound like this |
| 2 | `design-system` (this one) | `src/`, the theme, `dist/` | what are the values |
| 3 | `design-patterns` | `patterns.json` | which components may be built |

**If `DESIGN_LANGUAGE.md` does not exist at the project root, stop and run
`design-language` first.** Skipping it produces a palette nobody can defend six
months later — the values get chosen by whoever is typing, and the reasons
are never written down.

The one exception is a project that already has a design system and wants
only the token layer under it. Even then the interview is worth running as a
CONVERSION rather than a discovery: the answers are already in the code, and
the document is what stops them being re-litigated. See the note in the
`design-language` skill.

## Step 1 — Look before asking

Detection tells you what to *recommend*. It does not tell you what the person
wants, so it never replaces the questions in step 2. A project that has
Bootstrap today may be about to drop it; a project with nothing may be about to
add a framework.

Worth knowing before you ask:

```bash
# Which UI libraries are actually present?
cat package.json | grep -iE '"(bootstrap|tailwindcss|@tailwindcss/)"'

# Is there already a design system, and does its namespace collide?
grep -rn -- "--app-" src/ app/ styles/ --include=*.css --include=*.scss | head
grep -rln "@layer" src/ app/ styles/ --include=*.css | head

# Where is the CSS entry point?
ls -1 **/*.css **/*.scss 2>/dev/null | head -20
```

Report what you found in one or two sentences before asking. "You're on
Bootstrap 5.3 and there's an existing `--app-*` set in `styles/theme.css`" gives
the person the context to answer well.

## Step 2 — Ask six questions

**One number, one decision, and every option lettered.** They are genuinely
independent — declining Tailwind must not skip the adapter question, and the
prefix must not ride along inside "the foundation" as a sub-decision. A client
answers "C" in a second and composes the same answer in prose in a minute.

Ask them together, each with the detection from step 1 marked as the
recommendation. Carry the answers forward: **open every reply with what has
been answered so far**, so a long install cannot lose its place and restart.

```
Answered: 1 yes · 2 app · 3 light + dark
Remaining: 4, 5, 6
```

**1. Take `reset-a11y.css`?** The foundation itself — layers 1–3 (`src/`) plus
`app.css`, which declares the cascade layer order — is always installed. This is
the only part of it that is a choice.

- (A) Yes *(recommended)*
- (B) No

It restores the **native** focus outline after a reset removes it. The native
outline is forced-colors aware, never clipped by `overflow`, and never shifts
layout — none of which a token ring can match.

**2. Which token prefix?**

- (A) `app` *(default)*
- (B) `ds`
- (C) Something else

**Check for a collision before proposing (A).** If the project already has
`--app-*` from its own design system, two systems share a namespace silently,
whichever loads last wins, and neither team finds out. See below.

**3. Which themes to compile?**

- (A) `light` and `dark` *(recommended)*
- (B) `light` only
- (C) A named set — say which

Dark mode is one more `emit-theme()` call, and the dark theme can be derived
rather than written; see the dark mode section in `SKILL.md`. Adding it later is
cheap, but adding it later means every colour decision was made without it.

**4. The Tailwind bridge?** Independent of question 5.

- (A) Yes — the project already uses Tailwind v4
- (B) No

Adds `tailwind.css`, which publishes layer 2 as utilities (`bg-surface`,
`text-fg-muted`) through `@theme inline`. Zero extra custom properties. Only
meaningful if the project already uses Tailwind v4.

**5. Which adapter?** Independent of question 4. Pick **one** — lead with
whatever step 1 detected, marked as the recommendation.

- (A) None
- (B) Bootstrap
- (C) CoreUI
- (D) daisyUI *(needs Tailwind v4)*
- (E) Pico CSS
- (F) Bulma
- (G) Flowbite *(needs Tailwind v4)*
- (H) Preline UI *(needs Tailwind v4)*
- (I) NES.css
- (J) Water.css
- (K) MVP.css

**6. Where does `src/` go?**

- (A) `styles/ds/src/` *(default)*
- (B) Somewhere else — say where

Keep the internal structure intact wherever it lands; the `@use` paths are
relative.

What each adapter answer brings:

- **None** — plain CSS, or a framework with no adapter yet. Set
  `$adapters: ()`. Everything still works; components read layer 2 directly.
- **Bootstrap** — adds `bootstrap-entry.scss` and
  `src/adapters/_bootstrap.scss`, and changes how Bootstrap is imported:
  compile the entry instead of importing prebuilt CSS.
- **daisyUI** — adds `daisyui-entry.css` and `src/adapters/_daisyui.scss`.
  Requires Tailwind v4. The entry sets `themes: false`, without which daisyUI's
  built-in themes declare the same variables the adapter drives.
- **Pico CSS** — adds `pico-entry.css` and `src/adapters/_pico.scss`. Classless,
  so it suits projects writing semantic HTML. The entry wraps Pico in
  `@layer vendor`; loading the raw package instead means Pico's own
  `[data-theme=dark]` beats the adapter.
- **Bulma** — adds `bulma-entry.css` and `src/adapters/_bulma.scss`. Same
  layer-wrapping requirement. Note the one real limitation in the set: Bulma
  derives colour from HSL channels computed at build time, so its colours follow
  a theme but not a runtime `--app-*` override.
- **Flowbite** — adds `flowbite-entry.css` and `src/adapters/_flowbite.scss`.
  Requires Tailwind v4. Ships no component CSS; its components are markup made
  of utilities, so the entry file also registers the pair companions
  (`--color-on-brand`) that Flowbite omits.
- **Preline UI** — adds `preline-entry.css` and `src/adapters/_preline.scss`.
  Requires Tailwind v4. The least translation of any adapter here: Preline
  already splits a semantic layer from an `@theme inline` bridge, so the adapter
  just sets the semantic variables.
- **Water.css** — adds `water-entry.css` and `src/adapters/_water.scss`. The
  smallest surface here, 21 variables. Note it has no brand fill of its own: the
  adapter makes buttons carry the action colour, which changes how Water looks.
- **MVP.css** — adds `mvp-entry.css` and `src/adapters/_mvp.scss`. The adapter
  neutralises MVP's brightness filter and binds hover from the token instead,
  because a filter moves a background without its foreground.

**One, not several**, and for two independent reasons. Bootstrap and daisyUI
collide on 158 class names (`btn`, `card`, `alert`, `modal`, `table`…), so the
later cascade layer silently wins. And daisyUI and Preline collide on a
*variable* — `--border` is a width to one and a colour to the other — which
`scripts/check-collisions.mjs` now fails the build on. The design system makes
libraries agree on colour; it cannot make them agree on who owns `.btn` or
`--border`. If a project genuinely runs two libraries today, that is a migration
to finish, not a configuration to support.

**Where the adapter goes.** Either name it in `$adapters` so it bundles into
`dist/ds.css`, or compile `src/adapter-<name>.scss` on its own and load it as a
separate file after the token build. The second is what this repository does,
and it is the only option if several adapters have to coexist as builds (not as
pages).

If they want an adapter for a library that has none, say so plainly rather than
improvising one mid-install. The eight that exist are the templates, and one of
them is almost certainly the same shape — `_bootstrap.scss` for variants
compiled to literals, `_daisyui.scss` for variants kept as references,
`_pico.scss` for classless, `_bulma.scss` for decomposed channels,
`_flowbite.scss` for a Tailwind `@theme` surface, `_water.scss` for a library
with no brand fill. Writing a new one is its own task; see the five questions in
`SKILL.md`.

### Choosing the prefix

Default `app`. **Check for a collision first** — if the project already has
`--app-*` from its own design system, either pick a different prefix (`ds`) or
plan to converge deliberately. Two systems silently sharing a namespace is the
worst of the options, because whichever loads last wins and neither team knows.

Set it in the entry:

```scss
@use 'styles/ds/src/config' with ($prefix: 'ds');
```

## Step 3 — Read the answers back, then copy

**Do not copy a file in the same turn the last question is answered.** One
exchange sits between them: the six answers, plus what each one is about to do
to the project.

```
Taking reset-a11y.css · prefix `app` · light + dark · no Tailwind bridge ·
CoreUI adapter · src/ into styles/ds/src/

That writes: styles/ds/src/, app.css, reset-a11y.css, coreui-entry.css,
src/adapters/_coreui.scss, stylelint.config.cjs, and a ds.scss entry.
Proceed?
```

Cheap here, expensive afterwards: an install is files landing in someone's
repository, and a wrong prefix is a find-and-replace across everything that has
been written since.

**What is emitted is what was approved.** If filling the theme map makes you
want a different answer, that is a question, not an edit.

## Step 3b — Copy only what was chosen

| Always | `src/`, `app.css` |
| Q1 yes | `reset-a11y.css` |
| Q4 yes | `tailwind.css` |
| Q5 an adapter | `<name>-entry.*`, `src/adapters/_<name>.scss` |
| Always | `stylelint.config.cjs` — merge into the project's existing config if it has one |

If the adapter is **None**, delete `src/adapters/` and pass `$adapters: ()` in
the entry's `@use … with`.

Put `src/` where question 6 said. Keep the internal structure intact; the
`@use` paths are relative.

## Step 4 — Wire the cascade

This is the step that decides whether the design system can actually win against
what is already there, so it is worth doing deliberately. Read the `@layer` trap
section in `SKILL.md` first if it is not already in mind.

In the project's CSS entry, **before any other import**:

```css
@import 'legacy/app.css' layer(legacy);   /* existing CSS, so it can lose */
@import './ds/app.css';                   /* declares the full layer order */
@import './ds/reset-a11y.css';            /* if chosen */
@import './ds/tailwind.css';              /* if chosen */
```

Everything the project's existing stylesheets do outside a layer will beat the
design system. Pulling them into `layer(legacy)` is what makes the declared
order govern — without a single `!important` and without specificity
escalation. Anything that cannot be layered yet goes in `ds.overrides`, and the
count of declarations there is the honest measure of how much is left to do.

For **Bootstrap**, replace the prebuilt import with the compiled entry:

```jsonc
// package.json
"build:bootstrap": "sass --no-source-map --style=compressed --quiet-deps --silence-deprecation=import --load-path=node_modules bootstrap-entry.scss dist/bootstrap.css"
```

Then load `dist/bootstrap.css` **after** the entry that declares the layer
order. The entry wraps Bootstrap in `@layer vendor`, and `vendor-config` (the
adapter) is declared after it, which is what lets the adapter win over
Bootstrap's own defaults.

Add the token build and the lint:

```jsonc
"build:tokens": "sass --no-source-map --style=compressed src/ds.scss dist/ds.css",
"lint": "stylelint \"src/**/*.scss\" \"app.css\"",
"build": "npm run build:tokens && npm run lint"
```

`stylelint` needs `postcss-scss` — it parses `.scss` as plain CSS otherwise and
every `@use` reads as a syntax error.

## Step 5 — Verify before declaring done

```bash
npm run build
grep -c -- "--app-base-" dist/ds.css    # must be 0: layer 1 stays private
```

Then load a real page and check:

- text and surfaces pick up the tokens
- toggling `data-theme` moves the whole page
- if Bootstrap: `.btn-primary` and `.btn-danger` are still **different colours**
  (see the variant-binding section in `SKILL.md` — this is the failure mode that
  looks fine in the CSS and breaks in the browser)

When reading computed styles from a script right after flipping `data-theme`,
read them in a later turn — style resolution can lag a frame and report the
previous theme.

## Migrating a project that already has a design system

Do not attempt a big-bang swap. The tokens are a contract; contracts move one
clause at a time.

1. **Inventory.** List the existing tokens and how often each is used:
   `grep -rho -- "--old-prefix-[a-z0-9-]*" src/ | sort | uniq -c | sort -rn`
2. **Map by role, not by value.** `--brand-blue` maps to `--app-bg-action` if it
   is what buttons use. If two old tokens have the same value but different
   jobs, they map to two different semantic roles — that split is the point.
3. **Point the old names at the new ones** so nothing breaks while migrating:
   ```css
   :root { --brand-blue: var(--app-bg-action); }
   ```
   The old vocabulary keeps working, the new one is the source of truth, and the
   shim can be deleted a role at a time.
4. **Migrate one role per change**, and delete its shim line when the last
   reference is gone. When the shim block is empty, the migration is done.
5. **Turn on stylelint last**, once the count of violations is small enough to
   fix in one pass. Turning it on early just means everyone disables it.

Tokens with no semantic meaning — `--offcanvas-title-line-height` and its kind —
do not carry forward. They fail all three admission tests. If one is genuinely
being set somewhere, that is a real finding: promote it to a semantic token and
let the adapter read it.

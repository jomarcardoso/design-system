# Installing the design system into a project

The files are **vendored**, not installed from a registry: copy them in, and the
project owns them from that point on. Editing `src/_config.scss` in the target
project *is* the supported way to configure the system — there is no package
boundary to reach across.

Source: `${CLAUDE_PLUGIN_ROOT}`.

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

## Step 2 — Ask three independent questions

Ask all three together. They are genuinely independent — declining Tailwind must
not skip the adapter question.

**1. The foundation** — always installed; the choice is what comes with it.

- Layers 1–3 (`src/`), plus `app.css`, which declares the cascade layer order.
- `reset-a11y.css` — optional. Restores the **native** focus outline after a
  reset removes it. Worth taking: the native outline is forced-colors aware,
  never clipped by `overflow`, and never shifts layout, none of which a token
  ring can match.
- Sub-decisions: the token **prefix**, and which **themes** to compile.

**2. The Tailwind bridge** — yes or no, independent of question 3.

Adds `tailwind.css`, which publishes layer 2 as utilities (`bg-surface`,
`text-fg-muted`) through `@theme inline`. Zero extra custom properties. Only
meaningful if the project already uses Tailwind v4.

**3. An adapter** — independent of question 2. Pick **one**.

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

**One, not several.** Bootstrap and daisyUI collide on 158 class names (`btn`,
`btn-primary`, `card`, `alert`, `badge`, `modal`, `table`…), so loading both
means the later cascade layer silently wins. The design system makes libraries
agree on colour; it cannot make them agree on who owns `.btn`. If a project
genuinely runs two libraries today, that is a migration to finish, not a
configuration to support.

If they want an adapter for a library that has neither, say so plainly rather
than improvising one mid-install. The two existing adapters are the templates —
`_bootstrap.scss` for a library that compiles variants to literals,
`_daisyui.scss` for one that keeps them as references — and writing a new one is
its own task.

### Choosing the prefix

Default `app`. **Check for a collision first** — if the project already has
`--app-*` from its own design system, either pick a different prefix (`ds`) or
plan to converge deliberately. Two systems silently sharing a namespace is the
worst of the options, because whichever loads last wins and neither team knows.

Set it in `src/_config.scss`:

```scss
$prefix: 'ds' !default;
```

## Step 3 — Copy only what was chosen

| Always | `src/`, `app.css` |
| Q1 opt-in | `reset-a11y.css` |
| Q2 yes | `tailwind.css` |
| Q3 Bootstrap | `bootstrap-entry.scss`, `src/adapters/_bootstrap.scss` |
| Always | `stylelint.config.cjs` — merge into the project's existing config if it has one |

If the adapter is **None**, delete `src/adapters/` and set `$adapters: ()` in
`src/_config.scss`.

Put `src/` wherever the project keeps sources — `styles/ds/src/` is a reasonable
default. Keep the internal structure intact; the `@use` paths are relative.

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

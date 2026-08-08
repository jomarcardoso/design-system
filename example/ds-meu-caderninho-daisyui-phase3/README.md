# DS Meu Caderninho with daisyUI — phase 3

A recipe notebook, built to match a supplied design rather than to show off the
foundation. That was the point of the exercise: **find where a real design stops
being reachable from the tokens and starts needing the product's own layer.**

Open it with a **trailing slash**:
<http://localhost:4173/example/ds-meu-caderninho-daisyui-phase3/>
· generated docs at [`docs.html`](http://localhost:4173/example/ds-meu-caderninho-daisyui-phase3/docs.html)

## Where the layers held, and where they did not

The design needed paper-cream surfaces, cocoa type, a serif for headings and a
handwritten face for the wordmark. Two of those four were reachable; two were
not, and both gaps were fixed in the tool rather than worked around here.

| Wanted | Reached through | Verdict |
|---|---|---|
| Warm surfaces, cocoa action | the theme map | layer 2 held |
| Every daisyUI component recoloured | the adapter | layer 3.5 held |
| A serif heading face | **nothing** — `structure()` was hardcoded | tool changed |
| A handwritten display face | **nothing** — layer 2 models three faces | tool changed |

**`emit-structure()` now takes an overrides map.** Colour arrives as a theme
map a project writes; structure — spacing, radius, typography — was hardcoded,
so a serif heading meant editing `_semantic.scss` inside the vendored tool. That
is the fork the whole architecture exists to avoid, and it survived this long
because no example had ever wanted a different typeface.

**`font-family-display` is a new layer 3 hook.** Layer 2 models body, heading and mono.
A fourth face is a real gap for any brand with a signature typeface, and the fix
is the one already used for `accent`: reserve a name, default it to the heading
face, emit nothing. Token count is unchanged at 110.

## Overriding daisyUI, which was supposed to be impossible

The adapter documents that daisyUI nests its components inside Tailwind's
`utilities` layer, so nothing in `components` or `ds.overrides` can beat it by
property at any specificity. That is true, and it is why the adapter is
variable-only.

A **product** has a position the adapter does not. Measured, not assumed:

```
utilities.daisyui   <   utilities.mc   <   utilities (Tailwind's own)
```

A nested sublayer inside `utilities`, declared after `daisyui`, beats the
component library while a utility written at the call site still beats it.
`!important`, unlayered CSS or specificity escalation would all have won the
first half and lost the second.

The order needs no declaration: `daisyui.css` is imported before `ds.css`, so
`daisyui` registers first. **Swap those two `@import` lines in `app.css` and
every override silently stops winning**, with no error, because the CSS is still
valid.

## Three overrides, and none of them is a colour

That ratio is the measurement worth taking. A colour override here would have
meant the theme or the adapter had failed.

| | Kind | What |
|---|---|---|
| `card-side` figure | structural | images pinned to a column so a scanned list has a straight left edge |
| `tabs-border` | structural | the rule pulled away from the label — a printed index, not a browser tab |
| `menu-active` | **role** | daisyUI paints the active item `neutral`; this product's navigation carries its brand colour |

The third is a category the earlier examples had not produced. It is not that
the colour was wrong — the theme was right — but that the library decided
*which semantic role* the component reaches for. An adapter maps roles to
library variables; which variable a component uses is the library's anatomy, so
disagreeing with it is the product's call and belongs in the product's layer.

## Six compositions

What the product actually lacked was components daisyUI does not have:

- `mc-chip` / `mc-chip-group` — a selectable filter token. daisyUI has a button
  and a badge; it has nothing that is clickable, carries a selected state and
  reads as a label. Built from tokens rather than from `.btn`, because
  inheriting a button's height is what makes a filter row look like a toolbar.
- `mc-range-field` — a range with its scale written out. Wraps daisyUI's
  `range` rather than replacing it, so the track and the browser-specific
  pseudo-elements stay the library's problem.
- `mc-meta` — the icon-and-value strip under a recipe title.
- `mc-hand` — text in the product's script face; the reason `font-family-display` had
  to become a real hook.
- `mc-flourish` — the pen stroke under a section heading.
- `mc-rail` — the notebook's spiral binding, and the single most recognisable
  thing about the product.

## The check found gaps the design review did not

Running the verifier against finished markup rejected three things:

- a `btn-square btn-primary` — the vocabulary had `icon` but no way to say
  *which* icon button is active
- `btn-sm` in two places — size was never modelled as an axis
- a bare `range` inside `mc-range-field` — the composition was recorded, the
  thing it wraps was not

None of those are visible while writing the page. All three are now patterns,
which is the ledger doing the job it exists for.

```
button    5 allowed   card 1   nav 3   chip 2   range 2   meta 1   flourish 2   field 2   badge 1
6 compositions · 3 overrides · 13 raw · 6 styled · 0 forbidden
```

## Decisions worth arguing with

- **`action` and `selected` are the same hue**, one step apart. Every other
  example diverges them deliberately, because collapsing them hides a modelling
  error. A notebook genuinely has one colour, and saying so in the theme is the
  difference between a decision and an accident.
- **No forbidden entries yet.** The product is young; narrowing comes later, and
  a ledger that opens with refusals is guessing at mistakes nobody has made.
- **The page skeleton is not in the ledger.** Nobody reaches for "the shell" the
  way they reach for "a chip".
- **Tags are `badge`, filters are `mc-chip`.** They look similar and behave
  differently, and keeping them apart is what stops a tag from looking clickable.

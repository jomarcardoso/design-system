# Layer 2 vocabulary

Every token layer 2 emits, what it means, and when to reach for it. This is the
complete public contract — 126 names: 56 theme-independent structure tokens, 68
colour tokens per theme, and 2 anchors the inverted context leans on. If
something you need is not here, add it to `src/_semantic.scss` rather than
reaching past the layer.

**DTCG types.** Each section below names the
[W3C Design Tokens](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/)
`$type` its tokens carry when exported by `npm run export:tokens`. The mapping
is inferred from the value, so a token added to layer 2 exports correctly
without anyone updating a table by hand.

Names below use the default `app` prefix. A project that set `$prefix: 'ds'`
reads `--ds-bg-page` instead; the grammar is identical.

**Contents:** [Grammar](#grammar) · [Surfaces](#surfaces-and-backgrounds) ·
[Foregrounds](#foregrounds) · [Action & selection](#action-and-selection) ·
[Status](#status) · [Lines & focus](#lines-and-focus) · [Spacing](#spacing) ·
[Shape](#shape) · [Typography](#typography) · [Sizing](#control-sizing) ·
[Elevation](#elevation) · [Motion](#motion) · [Layering](#layering) ·
[Contexts](#contexts)

## Grammar

```
--app-{property}-{role}[-{prominence}][-{state}]
```

- **property** — `bg` `fg` `border` `ring` `shadow` `radius` `space` `pad` `gap`
  `size` `duration` `ease` `z` `opacity`, plus the typography group, which names
  itself after the CSS property it sets: `font-family` `font-size`
  `font-weight` `line-height` `letter-spacing`
- **role** — what it is *for*, never what it looks like
- **prominence** — `subtle` (one step below the default), `subtlest` (two), or
  omitted for the default, or `strong` (one above)
- **state** — `hover` `active` `visited`

Prominence and state are optional suffixes, which is what lets the system grow
without renaming: adding `--app-bg-action-hover` never disturbs
`--app-bg-action`.

**The pair invariant.** Every `bg-X` has a matching `fg-on-X`. Use them
together. A context that changes a background without its foreground fails to
compile, and an adapter should ask `core.fg-for()` rather than let the library
guess.

**Contrast is measured, not assumed.** Declaring a foreground is not the same as
declaring a readable one, so every pair of every theme is checked against WCAG
on each build — error below 3.0, warning below 4.5. The one role where the pair
inverts is `warning`: amber reads light enough that it takes dark text in every
theme — and because the pair inverts, so does the direction of its states. Every
other role darkens on interaction; warning BRIGHTENS, because darkening moves
the fill towards its own dark label. Measured on the stock ramp, the dark label
reads 6.99:1 on amber-500, 4.70:1 on amber-600 and 2.97:1 on amber-700.

## Surfaces and backgrounds

> **DTCG `$type`:** color

| Token | Use for |
|---|---|
| `--app-bg-page` | The document background. The furthest layer back. |
| `--app-bg-surface` | Cards, panels, inputs — anything sitting on the page. |
| `--app-bg-raised` | Popovers, dropdowns, modals — above the surface. |
| `--app-bg-sunken` | Wells, table headers, sidebars — inset below the surface. |
| `--app-bg-overlay` | The scrim behind a modal. Semi-transparent by design. |
| `--app-bg-surface-hover` | Hover on a neutral surface: a table row, a menu item, a list entry. |
| `--app-bg-surface-active` | The same surface while it is being pressed. |
| `--app-bg-disabled` / `--app-fg-disabled` | An inactive control. Exempt from the AA gate — WCAG excludes inactive components — but still visibly separated from its surface. |

The hierarchy exists because a single "background colour" makes a card on a
card impossible to express.

## Foregrounds

> **DTCG `$type`:** color

| Token | Use for |
|---|---|
| `--app-fg-default` | Body text. The default foreground for every surface. |
| `--app-fg-muted` | Captions, placeholders, secondary labels. |
| `--app-fg-subtlest` | Disabled text, watermarks. The quietest readable level. |
| `--app-fg-heading` | Headings. Often higher contrast than body text. |

## Action and selection

> **The four roles are four different jobs, and mixing them is the most common
> way a design system stops meaning anything.**
>
> - `action` — an INVITATION. Something happens when you press it.
> - `selected` — a STATE the interface is currently in.
> - `link` — NAVIGATION.
> - `neutral` — a filled control carrying no opinion.
>
> **Never reach for `selected` because nothing else was available.** Four
> adapters were doing exactly that with their libraries' grey secondary
> buttons, so a cancel button rendered in the colour of an active menu item.
>
> `selected` is also often NOT a fill — a checkbox is an empty box that fills
> when chosen, and that signal only works if the colour is not already on half
> the screen doing other jobs.
>
> A monochrome brand is fine: use two or three steps of one hue. Two roles
> resolving to the SAME value is not, and `check-roles()` warns on it.

> **DTCG `$type`:** color

`action` is an **invitation** — buttons, primary CTAs. `selected` is a
**persistent state** — chips, active menu items, current tab. They are separate
roles precisely so they can diverge; they currently share a hue.

| Token | Use for |
|---|---|
| `--app-bg-action` / `--app-fg-on-action` | Primary button fill and its label. |
| `--app-bg-action-hover` | Hover fill. |
| `--app-bg-action-active` | Pressed fill. |
| `--app-bg-action-subtle` | Tinted background for a quiet action. |
| `--app-fg-action` | Action colour used as *text* (a link-like button). |
| `--app-border-action` | Outlined action, and the focused field border. |
| `--app-bg-selected` / `--app-fg-on-selected` | Selected item fill and label. |
| `--app-bg-selected-hover` | Hover on a selected item. |
| `--app-bg-selected-subtle` | Tinted selected row. |
| `--app-bg-selected-active` | The same item while it is being pressed. |
| `--app-fg-selected` / `--app-border-selected` | Selected as text / as outline. |
| `--app-bg-neutral` / `--app-fg-on-neutral` | The filled **grey** control — a cancel button, a secondary action carrying no opinion. Not a third brand colour; that is `accent`, in layer 3. |
| `--app-bg-neutral-hover` | Hover on it. |

**Navigation** is modelled as a foreground role, because navigation is
overwhelmingly links:

| Token | Use for |
|---|---|
| `--app-fg-link` | Anchor colour. |
| `--app-fg-link-hover` | Anchor hover. |
| `--app-fg-link-visited` | Visited anchor. |

## Status

> **DTCG `$type`:** color

Four roles — `success` `warning` `danger` `info` — each with the same six
tokens, generated by a loop so none can drift out of shape:

| Pattern | Use for |
|---|---|
| `--app-bg-{role}` | Solid fill: a filled badge, a solid alert. |
| `--app-fg-on-{role}` | Text on that solid fill. |
| `--app-bg-{role}-hover` | Hover on that fill — a danger button, a dismiss action. |
| `--app-bg-{role}-active` | Pressed. |
| `--app-bg-{role}-subtle` | Tinted background: the usual alert body. |
| `--app-fg-{role}` | The role as text, on a normal surface. |
| `--app-border-{role}` | The role as an outline. |

A typical alert uses `bg-{role}-subtle` + `fg-{role}` + `border-{role}`. A
badge uses `bg-{role}` + `fg-on-{role}`.

## Lines and focus

> **DTCG `$type`:** color, dimension

| Token | Use for |
|---|---|
| `--app-border-color` | Default component outline. |
| `--app-border-color-subtle` | Dividers *inside* a card, table row rules. |
| `--app-border-color-strong` | Hover and emphasis outlines. |
| `--app-border-width` / `--app-border-style` | The atoms. |
| `--app-border` | Composed shorthand: `1px solid var(--app-border-color)`. |
| `--app-ring-width` / `--app-ring-offset` / `--app-ring-color` | Focus ring atoms. |
| `--app-ring` | Composed focus ring shorthand. |

Border is split into atoms because a context routinely changes the colour while
keeping the width, and a shorthand cannot be partially overridden. The composed
version is provided for the common case.

Prefer the **native** focus outline over a token ring — see `reset-a11y.css`.
The ring tokens exist for components that genuinely need a branded ring.

## Spacing

> **DTCG `$type`:** unrepresentable — calc() over `--app-space-unit`

`--app-space-unit` is the density knob. Every step is a `calc()` against it, so
setting it on a container rescales that whole subtree — which is how a
comfortable/compact toggle works without a second set of tokens.

| Token | Multiple of unit |
|---|---|
| `--app-space-unit` | the base (`0.25rem`) |
| `--app-space-2xs` … `--app-space-2xl` | 1, 2, 3, 4, 6, 8, 12 |

Prefer the **intent names** where one fits — they encode a decision instead of
a number:

| Token | Use for |
|---|---|
| `--app-pad-control-x` / `--app-pad-control-y` | Padding inside buttons and inputs. |
| `--app-pad-surface` | Padding inside a card or panel. |
| `--app-gap-inline` | Gap between items on one line. |
| `--app-gap-stack` | Gap between stacked blocks. |

## Shape

> **DTCG `$type`:** dimension

Named by **what they wrap**, not by size — `radius-md` forces every consumer to
re-decide which size a button is; `radius-control` decides once.

| Token | Use for |
|---|---|
| `--app-radius-control` | Buttons, inputs, small controls. |
| `--app-radius-control-sm` | Tight controls, nested elements. |
| `--app-radius-surface` | Cards and panels. |
| `--app-radius-surface-lg` | Modals, large sheets. |
| `--app-radius-pill` | Pills and badges. |

## Typography

> **DTCG `$type`:** fontFamily, dimension, number, fontWeight

| Token | Use for |
|---|---|
| `--app-font-family-body` / `--app-font-family-heading` / `--app-font-family-display` / `--app-font-family-mono` | Families. `display` is the voice face — a wordmark, a pull quote, a handwritten note — and defaults to the heading face. |
| `--app-font-size` | Body size. |
| `--app-font-size-sm` / `--app-font-size-lg` | Small print / lead text. |
| `--app-font-size-heading-sm` / `--app-font-size-heading` / `--app-font-size-heading-lg` / `--app-font-size-heading-xl` | The heading scale. Named by prominence, not by tag: an `h3` inside a card is often the `-sm` step. |
| `--app-line-height` / `--app-line-height-heading` | Line height. |
| `--app-letter-spacing-heading` | Heading letter-spacing. |
| `--app-font-weight-body` / `--app-font-weight-heading` | Weights. |

`font-family-body` and `font-family-heading` both point at the system sans stack today. Real
faces are a brand decision and are deliberately left unset.

## Control sizing

> **DTCG `$type`:** unrepresentable — calc() over `--app-space-unit`

| Token | Use for |
|---|---|
| `--app-size-control` | Standard button/input height. |
| `--app-size-control-sm` / `--app-size-control-lg` | Compact / prominent. |
| `--app-size-icon` | Icon box inside a control. |

Without these, an input and a button sitting next to each other are never the
same height, and every team rediscovers that independently.

## Elevation

> **DTCG `$type`:** shadow (composite)

| Token | Use for |
|---|---|
| `--app-shadow-raised` | Cards, subtle lift. |
| `--app-shadow-overlay` | Modals, dropdowns. |

Elevation is a colour-layer concern: shadows are nearly invisible in dark themes
and are usually replaced by a lighter raised surface, so these are theme tokens.

## Motion

> **DTCG `$type`:** duration, cubicBezier

| Token | Use for |
|---|---|
| `--app-duration-fast` / `-base` / `-slow` | Transition durations. |
| `--app-ease` | The standard easing curve. |
| `--app-opacity-disabled` | For fading a whole **composite** — a fieldset, a card mid-save. For a single control use the `bg-disabled` / `fg-disabled` pair instead: a multiplied alpha cannot be read back from a computed style, so an opacity-only disabled state is invisible to both contrast gates. |

## Layering

> **DTCG `$type`:** number

A scale, not arbitrary numbers — this is what prevents the z-index arms race.

`--app-z-base` `--app-z-dropdown` `--app-z-sticky` `--app-z-overlay`
`--app-z-modal` `--app-z-toast` `--app-z-tooltip`

## Contexts

Contexts are partial overrides that inherit everything they do not mention.
Set the attribute on any container:

| Attribute | Effect |
|---|---|
| `data-surface="inverted"` | Dark band on a light theme (heroes, footers). Names its own bg/fg pair, so it works under both themes. |
| `data-surface="sunken"` | Secondary surface — sidebars, wells, table headers. |
| `data-density="compact"` | Moves `--app-space-unit` alone; every spacing step follows. |

A context is the right tool when spacing, radius, typography and motion should
all stay put and only a few colours change. When every surface and foreground
changes, that is a **theme** wearing a disguise — promote it and stop paying the
inheritance cost.

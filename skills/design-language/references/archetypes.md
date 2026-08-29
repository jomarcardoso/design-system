# The five archetypes, as token values

An archetype is a **preset, not a cage**. It seeds the theme and the structural
scales so the first build already looks like something, and every value below is
a starting point the interview then adjusts.

The reason this file exists in this form: an archetype that stays a mood board
decides nothing. Each row here lands on a real value in
[`src/_base.scss`](../../../src/_base.scss) or a real argument to
`semantic.emit-structure()`, so choosing "Tech Minimalist" produces a build
rather than a feeling.

## The matrix

|                                   | Tech Minimalist                       | Enterprise Solid                  | Playful & Expressive                 | Editorial & Premium                    | Utilitarian & Technical          |
| --------------------------------- | ------------------------------------- | --------------------------------- | ------------------------------------ | -------------------------------------- | -------------------------------- |
| **Personality**                   | direct, inventive, productivity-first | conservative, institutional, safe | warm, encouraging, human             | elegant, restrained, considered        | precise, dense, data-first       |
| **`radius-control`**              | `scale(radius, md)` 6px               | `scale(radius, sm)` 4px           | `scale(radius, 2xl)` 16px            | `scale(radius, sm)` 4px                | `scale(radius, xs)` 2px          |
| **`radius-surface`**              | `lg` 8px                              | `md` 6px                          | `3xl` 24px                           | `md` 6px                               | `xs` 2px                         |
| **`radius-pill`**                 | pills for badges only                 | pills for badges only             | pills everywhere                     | pills for badges only                  | never                            |
| **`$spacing-unit`**               | `4px`                                 | `4px`                             | `4px`, but scales chosen one step up | `4px`, scales one step up              | `4px`, scales one step down      |
| **`shadow-raised`**               | `xs` — a hairline lift                | `sm` — soft, traditional          | `lg` — projected and visible         | `2xs` — barely there                   | `none` — borders only            |
| **`shadow-overlay`**              | `md`                                  | `lg`                              | `xl`                                 | `sm`                                   | `sm`                             |
| **Elevation strategy**            | thin borders carry hierarchy          | shadows carry hierarchy           | shadows are decorative too           | whitespace carries hierarchy           | borders only                     |
| **`font-family-heading`**         | geometric / neo-grotesque sans        | humanist sans                     | rounded or display                   | **serif**                              | condensed sans                   |
| **`font-family-body`**            | same sans                             | same humanist sans                | rounded sans                         | sans                                   | sans                             |
| **`font-family-display`**         | unset                                 | unset                             | display face                         | serif or a display serif               | `font-family-mono`               |
| **`font-family-mono` prominence** | code blocks                           | code blocks                       | rare                                 | rare                                   | **data tables and figures**      |
| **`line-height`**                 | `1.5`                                 | `1.5`                             | `1.6`–`1.7`                          | `1.7`                                  | `1.4`                            |
| **Heading step**                  | `2xl`→`4xl` — a clear jump            | `xl`→`3xl` — restrained           | `2xl`→`5xl` — headings shout         | `2xl`→`5xl`, with tighter tracking     | `lg`→`2xl` — headings are labels |
| **`size-control`**                | 36px (`unit * 9`)                     | 36px                              | 44px (`unit * 11`)                   | 40px                                   | 28px (`unit * 7`)                |
| **Contrast target**               | AA, high                              | AA                                | AA                                   | AA, subtle by design — watch the check | AA, very high                    |
| **Reference products**            | Vercel, Linear, Raycast               | IBM Carbon, Salesforce, SAP Fiori | Duolingo, Headspace, Mailchimp       | Stripe Press, Notion, Medium           | GitHub, AWS Console, Grafana     |

## What each choice actually does

**Radius** is the single most recognisable archetype signal and the cheapest to
change: it is two tokens. Do not let a project debate it for an hour — set the
preset, look at a real screen, adjust once.

**Elevation strategy is a decision, not a scale.** "Flat" is not
`shadow-raised: none` alone; it means hierarchy has to come from somewhere else,
and that somewhere is `border-color` doing more work. A project that picks flat
and keeps a weak border ends up with surfaces nobody can tell apart. Whichever
carries hierarchy must be the one that is strong.

**Density is spacing plus control height plus leading**, and the three have to
move together. Raising `size-control` while leaving `line-height` at 1.4 gives
tall buttons full of cramped text. The presets above move all three.

**Editorial is the one to watch on contrast.** "Subtle contrast" and "refined
grey on grey" are the archetype's own vocabulary, and they are also how a theme
fails the build-time WCAG check. The check is not negotiable — a muted palette
has to be muted in _chroma_, not in lightness distance. If the build errors here
the archetype is not wrong, the specific step is.

**Utilitarian earns monospace as a body-adjacent face**, which is the only
archetype where `font-family-mono` is a design decision rather than a code-block
default. That is what `font-family-display` is for: set it to the mono stack and the
figures in tables inherit it.

## Applying a preset

The archetype writes three things, and nothing else:

```scss
// 1. Structural scales — passed to emit-structure()
$typography: (
  'font-family-heading': (
    ui-serif,
    Georgia,
    serif,
  ),
  // Editorial
  'line-height': 1.7,
);

// 2. Radius and control size — edited in the project's copy of _base.scss,
//    or overridden through the same map
$structure: (
  'radius-control': 4px,
  'radius-surface': 6px,
  'size-control': calc(var(--app-space-unit) * 10),
);

// 3. Shadow choice — in the theme map, because elevation reads differently
//    on a dark surface than on a light one
'shadow-raised':base.scale(shadow,'2xs'),'shadow-overlay': base.scale(
  shadow,
  sm
);
```

Colour is **not** in that list. An archetype suggests a mood — sober blues for
Enterprise, vibrant for Playful — but the brand colour comes from the brand, and
the interview asks for it directly. An archetype that picks the primary colour
is guessing at the one thing the client already knows.

## When none of the five fits

Say so in `DESIGN-LANGUAGE.md` and write the values out by hand. The matrix
covers the common cases in the current market; it is not a taxonomy of every
product that can exist. A hybrid — "Editorial type on a Utilitarian density",
which is what most analytics products actually are — is a legitimate answer, and
recording it as a hybrid is more useful than forcing it into one column.

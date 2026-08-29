# **Preparação para Geração de Design System**

[https://gemini.google.com/app/d8ffa124afa57fd1](https://gemini.google.com/app/d8ffa124afa57fd1)

*User prompt: Geração do design system 3*

Response: Before I build anything I need these. Paths are from the repository root:

**From the project**

> 1. DESIGN\_LANGUAGE.md (já temos a versão anterior do histórico, mas envie se houver atualizações)

**From this plugin** 2\. skills/design-system/references/tokens.md 3\. skills/design-system/references/worked-example.md 4\. skills/design-system/references/install.md 5\. skills/design-system/references/adapters.md 6\. skills/design-system/references/review.md 7\. skills/design-language/references/archetypes.md 8\. skills/design-language/references/colour-strategies.md 9\. src/\_config.scss 10\. src/\_ramp.scss — only if the product is monochrome

Send what you have. I will tell you what is still blocking before I start.

---

Response: All 10 required input files have been received and verified against DESIGN\_LANGUAGE.md. Nothing structural remains blocking, so the project configuration and Layer 1/2 files for **Recepta** are authored below.

// src/\_config.scss

`// src/_config.scss`

`@use 'ds/src/config' with (`  
  `$prefix: 'app',`  
  `$colour-strategy: 'monochrome',`  
  `$contrast-min: 4.5,`  
  `$adapters: ('coreui')`  
`);`

// styles/ds/palette.scss

`// styles/ds/palette.scss`

`@use '../../src/ramp';`

`// PAPER — neutral ramp derived from fresh paper seed with neutralPigment: 0.6`  
`$paper: ramp.neutral(oklch(0.97 0.012 85), $pigment: 0.6);`

`// PEN — accent ramp derived from ballpoint blue (#1d51c4)`  
`$pen: ramp.chromatic(#1d51c4);`

// styles/ds/theme.scss

`// styles/ds/theme.scss`

`@use 'sass:map';`  
`@use '../../src/base';`  
`@use 'palette' as p;`

`@function paper($step) { @return map.get(p.$paper, $step); }`  
`@function pen($step)   { @return map.get(p.$pen, $step); }`

`$recepta: (`  
  `// --- Paper: Surface Ladder ------------------------------------------------`  
  `page: paper(100),`  
  `surface: paper(50),`  
  `raised: paper(0),`  
  `sunken: paper(200),`  
  `'surface-hover': paper(150),`  
  `'surface-active': paper(200),`  
  `overlay: rgba(40, 33, 28, 0.55),`

  `// --- Ink ------------------------------------------------------------------`  
  `text: paper(900),`  
  `'text-muted': paper(700),`  
  `'text-subtlest': paper(600),`  
  `heading: paper(950),`

  `// --- Neutral Actions ------------------------------------------------------`  
  `neutral: paper(700),`  
  `'on-neutral': paper(0),`  
  `'neutral-hover': paper(800),`  
  `'neutral-active': paper(900),`

  `disabled: paper(200),`  
  `'disabled-text': paper(500),`

  `// --- Accent (Monochrome School Vocabulary) --------------------------------`  
  `accent: pen(700),`  
  `'on-accent': paper(0),`  
  `'accent-hover': pen(800),`  
  `'accent-active': pen(900),`  
  `'accent-subtle': pen(50),`  
  `'accent-text': pen(700),`  
  `'link-visited': pen(900),`

  `// --- Structure ------------------------------------------------------------`  
  `border: paper(300),`  
  `'border-subtle': paper(200),`  
  `'border-strong': paper(500),`  
  `ring: pen(600),`  
  `'shadow-raised': base.scale(shadow, '2xs'),`  
  `'shadow-overlay': base.scale(shadow, sm),`

  `// --- Status: Adapted Brand Hues -------------------------------------------`  
  `success: base.color(green, 700),`  
  `'on-success': paper(0),`  
  `'success-hover': base.color(green, 800),`  
  `'success-active': base.color(green, 900),`  
  `'success-subtle': base.color(green, 50),`  
  `'success-text': base.color(green, 700),`  
  `'success-border': base.color(green, 300),`

  `warning: base.color(amber, 200),`  
  `'on-warning': base.color(amber, 950),`  
  `'warning-hover': base.color(amber, 100),`  
  `'warning-active': base.color(amber, 50),`  
  `'warning-subtle': base.color(amber, 50),`  
  `'warning-text': base.color(amber, 900),`  
  `'warning-border': base.color(amber, 400),`

  `danger: base.color(red, 700),`  
  `'on-danger': paper(0),`  
  `'danger-hover': base.color(red, 800),`  
  `'danger-active': base.color(red, 900),`  
  `'danger-subtle': base.color(red, 50),`  
  `'danger-text': base.color(red, 700),`  
  `'danger-border': base.color(red, 300),`

  `info: base.color(slate, 700),`  
  `'on-info': paper(0),`  
  `'info-hover': base.color(slate, 800),`  
  `'info-active': base.color(slate, 900),`  
  `'info-subtle': base.color(slate, 50),`  
  `'info-text': base.color(slate, 700),`  
  `'info-border': base.color(slate, 300)`  
`);`

`$typography: (`  
  `'font-family-body': (ui-sans-serif, system-ui, -apple-system, sans-serif),`  
  `'font-family-heading': (ui-serif, Georgia, Garamond, serif)`  
`);`

Execute npm run verify to test theme key integrity and run the contrast audit gate against WCAG AA.

---


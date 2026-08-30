---
# =============================================================================
# Machine-readable decisions. An agent reads THIS; a person reads the prose.
#
# Keep the two in agreement. If a decision changes, change it here and in the
# section that explains it — a front matter that disagrees with its own document
# is worse than no front matter, because tooling trusts it.
# =============================================================================
# Which version of this tool ran the interview. Read it from `package.json` at
# generation time — never guess it, and never leave it out.
#
# The tool is vendored, so nothing tells a project it has fallen behind. This
# line is where the next person starts reading CHANGELOG.md from: without it,
# catching up means diffing a document against a template of unknown vintage.
# Bump it when a later version's decisions are actually applied, not when the
# file is merely edited.
toolVersion: 0.7.0

archetype: tech-minimalist        # tech-minimalist | enterprise-solid | playful-expressive | editorial-premium | utilitarian-technical | hybrid
archetypeNote: ~                  # required when archetype is hybrid

density: comfortable              # dense | comfortable | generous
platform: desktop-first           # desktop-first | mobile-first | multiplatform

radius: subtle                    # square | subtle | rounded | pill
elevation: borders                # borders | soft-shadows | projected-shadows
elevationCarrier: border-color    # what carries hierarchy — required when elevation is `borders`

# Icons carry more archetype per pixel than anything except radius, and are the
# foundation most often left undecided — which is how a product ends up mixing
# two icon sets and reading as two products.
#
# `mixed` means filled marks the selected state and outlined everything else; it
# needs a set that ships both weights of the same glyph.
iconStyle: outline                # outline | filled | mixed
iconStroke: 1.5px                 # set against the BODY weight, not the icon set's default
iconSize: 20px
# Icons inherit `currentColor`. An icon set with its own palette fights every
# theme the product will have, and shows it first in dark mode.

# How loud this product is when something needs attention. The single most
# load-bearing key after the school: roughly eight component-level defaults are
# derived from it — badge fill and ink, the resting secondary action, whether a
# selected chip is tinted or filled, divider weight, the interactive edge,
# control font weight, how far the accent budget stretches, and accentContrast.
#
# See skills/design-language/references/derivations.md for the tables. A
# question that decides one token is a question badly asked; this one replaced
# `accentContrast`, which was exactly that.
posture: quiet                    # quiet | balanced | loud

# The page frame. The one structural answer in the file — a fact about the
# product rather than a preference about how it looks, and the only one of these
# that cannot be derived.
frame: single-column              # single-column | content-aside | app-frame

# DERIVED from question 5 and the archetype, not asked. How much of the
# interface is on screen at rest. See derivations.md §F.
disclosure: progressive           # progressive | exposed

# The ratio between type steps. DERIVED from the archetype and the density, and
# the single number that most changes how a page feels at a glance. Omit it to
# keep the foundation's hand-tuned scale — which is Tailwind's, and is therefore
# a signature the product did not choose.
typeScale: 1.25                   # 1.125 | 1.2 | 1.25 | 1.333 | 1.5

# DERIVED then confirmed. What an icon is USED for, which is a different
# decision from iconStyle above. See derivations.md §G.
iconPolicy: icon-leads            # label-always | icon-leads | icon-alone | icon-contained

accessibility: AA                 # AA | AAA — sets the threshold in themes.check-contrast()
statusColours: traditional        # traditional | brand-adapted

# Which school this product belongs to. Sets config.$colour-strategy, and so
# which role collapses check-roles() treats as mistakes. It does NOT change
# which interactive token NAMES exist: action/selected/link, primary/container,
# or accent. Surfaces, ink and status are common to all three.
#   functional  a colour per job (Atlassian, Polaris)
#   brand       the brand hue also marks what is chosen (Material, Itau)
#   monochrome  one accent, everything else grey (Apple, Vercel, Radix)
colourStrategy: functional

# --- Accent-driven only -----------------------------------------------------
# Delete these three when colourStrategy is functional or brand: they describe a
# generated ramp, and those schools are given their palette rather than deriving
# it. Leaving them behind is worse than omitting them, because the next reader
# cannot tell a stale answer from a live one.
#
# high | low. DERIVED, not asked: the accent is measured against the lightest
# and darkest ramp steps, and whichever wins becomes `fg-on-accent`. Recorded
# here because tooling reads it, but changing it by hand does not change the
# measurement — change the accent instead.
accentContrast: high
# 0 = true grey, 1 = the seed pigment at full strength. The smallest number in
# this file and the one that does the most visible work.
neutralPigment: 0.7
# lines | tones | shadows. Must agree with `elevation` above.
surfaceSeparation: lines

# outline | tinted | neutral | second-brand. Six of the seven treatments in
# use are the same tokens pointed elsewhere, so this changes theme.scss and
# never the product layer.
secondaryAction: outline

voice: action-oriented            # technical | action-oriented | warm
voiceExceptions:                  # contexts that drop to a stricter register
  - technical for payment and data-loss failures
ctaMood: infinitive               # infinitive | imperative

# Answers that went AGAINST the archetype. Recording them is what keeps the
# system coherent as it grows: a deviation nobody wrote down is
# indistinguishable from a mistake six months later, and the next person
# "corrects" it back.
#
# An empty list is the normal case. Three or more usually means the archetype
# was the wrong choice.
deviations:
  - decision: rounded 16px corners
    against: tech-minimalist
    reason: The consumer app shares a brand with a children's product.
    accepted: 2026-08-07

# Conflicts that were raised and RESOLVED. Not deviations — nothing here went
# against the archetype — but decisions that look arbitrary without their story.
#
# A conflict resolved in one exchange leaves no other trace: the front matter
# ends up holding the value that worked, and the next reader sees a number with
# no reason and "corrects" it back to the one that failed the build.
resolutions:
  - conflict: the accent could not reach AA against either ink
    chosen: moved its lightness two steps, kept the hue
    instead-of: a neutral primary fill, which the client rejected

# Ergonomics that outranked the archetype. Not a compromise — the system
# working as intended.
overrides:
  - decision: size-control raised to 44px
    because: mobile-first; 28px is a miss target on a phone

# Restrictions. `enforcement` is the honest part: `ledger` and `stylelint` fail
# a build, `document` is advice an agent reads.
#
# `instead` names what to use in place of the FORBIDDEN thing, so it only makes
# sense on a rule that forbids something. A rule that REQUIRES a pattern —
# "destructive actions must use a modal" — has nothing to redirect to; writing
# `instead: modal` there names the requirement as its own alternative.
#
# An empty list is normal on a first interview. Guardrails accumulate from
# reviews, so write it as `guardrails: []` rather than inventing entries to fill
# the section.
guardrails:
  - rule: Never use gradient fills
    enforcement: stylelint
    signature: linear-gradient|radial-gradient
  - rule: Confirmations use a toast, never a modal
    enforcement: ledger
    instead: toast
---

<!-- skills/design-language/templates/DESIGN_LANGUAGE.md -->

<!-- DESIGN_LANGUAGE.md -->

# Design language — {{PRODUCT}}

{{One paragraph: the sector, the promise, and who uses it. Written from the
answer to question 1, not from the archetype — the archetype describes how it
looks, this describes what it is.}}

**Archetype:** {{Archetype}}. {{One sentence on why, and on any tension the
interview surfaced between how the brand wants to feel and how the product needs
to work.}}

{{If there are deviations, one paragraph naming them and why they were taken.
This is the part a newcomer reads to understand why the product does not look
exactly like its archetype — without it, the next person to touch the system
will read the deviation as a bug and undo it.}}

---

## 1. Principles

Three to five. They are decision criteria, not slogans: each one has to be
capable of settling an argument about a real screen.

- **{{Principle}}** — {{what it means when two options are on the table}}
- **{{Principle}}** — {{…}}

> A principle nobody could ever violate is decoration. "Be accessible" is not a
> principle; "the reading path survives at 200% zoom" is, because a layout can
> fail it.

---

## 2. Visual foundations

The tokens live in `src/`. This section is the **rules for using them** — the
part a token file cannot express.

### Colour

- **Brand primary:** {{value}} — carried by `bg-action`.
- **Proportion:** roughly 60% surface, 30% supporting, 10% brand. Brand colour
  is an accent; a screen where it covers a third of the area has no emphasis
  left to give.
- **Status colours are reserved.** {{traditional | adapted, and how}}. A status
  colour reports an outcome; it never marks an action that has not happened yet.
- **Contrast:** WCAG {{AA|AAA}}, checked at build time by
  `themes.check-contrast()` and again in the browser by `npm run audit:contrast`.
  Both are hard gates, not advisories.

### Typography

- **Heading:** {{face}} · **Body:** {{face}} · **Display:** {{face or "unset —
  falls back to the heading face"}} · **Mono:** {{face}}

  > No question in the interview asks for these. All four come from the
  > archetype's row in `archetypes.md` — fill them from there and say so, rather
  > than inventing a stack that sounds right. If the client named faces, those
  > win and the difference from the preset is a deviation.
- **Measure:** 45–75 characters. Wider and the eye loses the line return.
- **Hierarchy comes from size and weight, not colour.** A heading tinted to
  stand out stops standing out the moment it sits next to a status colour.
- Font sizes are `rem` so they follow the reader's browser setting; spacing is
  `px` so raising that setting does not inflate the layout.

### Spacing and grid

- **Base unit:** `--app-space-unit`, {{4px}}. Every gap is a multiple.
- **Density:** {{dense | comfortable | generous}} — {{`size-control` and
  `line-height`, as numbers}}.

  > Also unasked, and also in `archetypes.md`: `$spacing-unit`, `size-control`
  > and `line-height` per archetype. This section is where `density` in the
  > front matter stops being a word — a document that declares a density and
  > never says what it costs in pixels has not decided anything.
- Space belongs to the **container**, not to the item. A component that carries
  its own outer margin cannot be reused in a tighter context.

### Shape

- **`radius-control`:** {{4px}} · **`radius-surface`:** {{6px}} · **Pills:**
  {{badges only | everywhere | never}} — from the archetype row in
  `archetypes.md`.
- Radius is the most recognisable archetype signal and the cheapest to change.
  {{One sentence on what this radius is saying — square reads as instrument,
  rounded reads as approachable, and the product has to mean one of them.}}
- **Surfaces are one step rounder than the controls inside them.** A control
  with the same radius as its container reads as stuck to it.

### Iconography

- **Style:** {{outline | filled | mixed}} · **Stroke:** {{1.5px}} ·
  **Size:** {{20px}} — from the archetype row in `archetypes.md`.
- **Icons inherit `currentColor`.** An icon never carries its own colour: it
  takes the colour of the text it sits beside, which is what keeps it correct in
  every theme and in dark mode.
- **The stroke answers to the type, not to the icon set.** A 2px stroke beside a
  light serif is a different product in the same screen.
- **Corner geometry matches `radius-control`.** Icons drawn square inside a
  rounded interface read as clip art.
- **Policy:** {{label-always | icon-leads | icon-alone | icon-contained}} — what
  an icon is USED for, which is a different decision from the style above.
  {{Where an icon may appear without its label, and where it may not.}}
- **Never an icon alone for something destructive.** The label is the
  confirmation the reader gets before the modal appears.
- **An icon takes the ink of the text it belongs to**, at the same step or a
  quieter one — never the accent, unless what it marks is selected.
- **One set.** Mixing two is the single most visible inconsistency a product can
  ship, and it is invisible in a token file.

### Elevation

- **Strategy:** {{borders | soft shadows | projected shadows}}.
- **Hierarchy is carried by:** {{elevationCarrier}}.
- `shadow-raised` for anything resting on the page; `shadow-overlay` for
  anything floating above it. Two steps, and no third — a system with five
  elevations has none, because nobody can tell them apart.

---

## 3. Voice

{{One paragraph on how the product sounds, from question 11.}}

| Situation | Register | Example |
|---|---|---|
| Field validation | {{…}} | {{…}} |
| System error | {{…}} | {{…}} |
| Empty state | {{…}} | {{…}} |
| Destructive confirmation | {{…}} | {{…}} |
| Success | {{…}} | {{…}} |

- **Action labels:** {{infinitive | imperative}} — *{{"Save changes"}}*.
- **Errors say what to do next.** A message that only names the failure leaves
  the reader where they were.
- **Never blame the user.** "That email is already registered" rather than "you
  entered an invalid email".

---

## 4. Interaction and motion

- **States.** Every interactive element has `default`, `hover`, `focus-visible`,
  `active` and `disabled`. `focus-visible` is not optional and is not a
  redundant `hover` — it is the only state a keyboard user has.
- **Focus ring:** the native outline, or `--app-ring-*`. Never `outline: none`
  without a replacement that is at least as visible.
- **Durations:** `--app-duration-fast` for micro-feedback, `--app-duration-base`
  for transitions, `--app-duration-slow` for anything entering the screen.
- **Easing:** `--app-ease-out` for entering, `--app-ease-in` for leaving.
  Something arriving should decelerate; something leaving should not linger.
- **`prefers-reduced-motion` is honoured**, and honouring it means removing the
  movement, not shortening it.

---

## 5. Composition — do and don't

The enforceable ones live in `patterns.json` and fail `npm run verify:patterns`.
The rest are here, and are advice.

### Do

- {{"Use a modal only for an action that cannot be undone and needs confirming."}}
- {{…}}

### Don't

- {{"Never stack two primary buttons side by side — a screen with two main
  actions has two jobs."}}
- {{…}}

### Enforced by the build

| Rule | Where | What fails |
|---|---|---|
| {{rule}} | `patterns.json` | `verify:patterns` names the alternative |
| {{rule}} | `stylelint.config.cjs` | `npm run lint` |

---

## 6. Composing a screen the system has no component for

Most screens are not built from the component list. Someone needs a page the
ledger has never heard of, reaches for raw markup, uses the right tokens, and
still ships something that does not look like the product — because tokens give
the paint and this section gives the grammar.

**Everything here is a RELATION, never a value.** A relation survives a change of
theme; a value does not. "A section title is two steps above body" holds in every
theme this language will ever have. "A section title is 24px" is true of one
theme and becomes a lie at the next one — that belongs in `patterns.json`, which
is allowed to know what this theme is.

- **The frame.** {{single column | content with an aside | application frame}}.
  {{Which regions exist, what separates them from the content, and what each one
  becomes on a phone. A frame region is separated by a rule or a rung — never by
  a shadow or a radius, because chrome that looks like content is the fastest way
  to make a product feel assembled from parts.}}
- **Measure.** {{45–75 characters | the region width}} — from the archetype and
  question 5.
- **Disclosure.** {{progressive | exposed}}. {{What is visible at rest and what
  waits to be asked for. Derived, and the trade is real in both directions: the
  quiet version costs a daily user clicks, the exposed version costs a first-time
  reader the ability to find anything.}}
- **Type roles.** Body is the baseline. {{Section title N steps above · caption
  one below · a page has exactly one title at the top step}}.
- **Vertical rhythm.** {{Related things one unit apart, unrelated things three.
  The gap says what belongs together, and it says it before anyone reads a word.}}
- **Surfaces.** {{Which level the page is, which level a raised block is, and how
  many levels this product allows before it has none — normally two.}}
- **Alignment.** {{One vertical edge per column of content. A screen with three
  left edges reads as three screens.}}
- **Where the accent may appear.** {{The one primary action, and what is
  currently chosen. Nowhere else.}}

> An agent asked for a screen reads this section and the tokens, and nothing
> else. If a rule here cannot be followed without knowing a pixel value, it is in
> the wrong file.

---

## How this file is used

**By an agent.** The front matter is read before generating any markup or CSS;
the guardrails are checked against what was produced. When this document and the
code disagree, the document is the intent and the code is the bug — unless the
decision has genuinely changed, in which case update this file in the same
commit.

**By a person.** It is the answer to "why is it like that", which is the
question a design system exists to stop re-litigating.

**What it is not.** It is not the token reference — that is
`skills/design-system/references/tokens.md` — and it is not the component
vocabulary, which is `patterns.json`. This file holds the decisions those two
express.

---

*Generated from the discovery interview on {{DATE}}, against version
{{toolVersion}} of the design system. Undecided answers are
marked `undecided` with the default that was applied, so a gap stays visible
rather than hardening into a fact nobody chose.*

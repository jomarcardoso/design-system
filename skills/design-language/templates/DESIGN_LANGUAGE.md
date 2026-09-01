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
toolVersion: 0.8.0

archetype: tech-minimalist        # tech-minimalist | enterprise-solid | playful-expressive | editorial-premium | utilitarian-technical | hybrid
archetypeNote: ~                  # required when archetype is hybrid

density: comfortable              # dense | comfortable | generous
platform: desktop-first           # desktop-first | mobile-first | multiplatform

# How long ONE SITTING lasts. Split out of the frequency question, which used to
# carry both and forced one letter to answer two things — a recipe notebook is
# opened now and then AND left open for an hour, and the fused version threw the
# second half away.
#
# It is the strongest single input to `posture`, and it is the counterpoint the
# interview needs: ten seconds rewards heavier elements because nobody is around
# long enough to tire of them; an hour punishes every one of them.
dwell: minutes                    # seconds | minutes | hours

# Who the screen is FOR. Not the colour school — that is an answer about token
# architecture, and this is an answer about who the surface belongs to. They
# correlate and are not the same: a bank can be monochrome, a reading app can be
# brand-led.
#
#   user-content     their notes, their photographs. The interface is the paper
#   product-content  a catalogue, a library, other people's work
#   brand            someone should know whose product this is from across the room
#   tools            the user is manipulating something and the controls are the product
protagonist: user-content         # user-content | product-content | brand | tools

# DERIVED from question 1, then confirmed. True only when the user JUDGES COLOUR
# on screen — photo and video editors, 3D tools, grading, print proofing. A
# product that merely displays images is not this; a recipe notebook shows
# photographs and nobody calibrates one.
#
# The reason is physiological rather than aesthetic, and that matters: as a
# preference it would be arguable. A bright interface beside the work changes the
# viewer's adaptation state and the image is judged wrong.
#
# It forces surfaceModel away from `elevated`, caps neutralPigment at 0.2, and
# shrinks the accent budget to its smallest. See derivations.md section S.
colorCriticalWorkspace: false

# DERIVED from the archetype, no longer asked. It was a question until its own
# text gave it away: "do not let it absorb an hour of debate — set the preset,
# look at a real screen, adjust once." That is a derivation describing itself as
# a question, and it is one of the two that most reliably collected taste from
# someone with no reason to have an opinion. `posture: loud` moves it one step
# up; `surfaceModel: recessed` moves it one step down. See derivations.md O.
radius: subtle                    # square | subtle | rounded | pill

# DERIVED from the archetype, then moved by `dwell` in one direction only: at
# `hours` it is `borders` whatever the archetype wanted, because every shadow is
# one more thing the eye reprocesses on a screen somebody sits in front of all
# day, and it is the cheapest thing to remove.
#
# It was a question — "how should depth and layering feel" — and a client caught
# what that was asking: what they WANT, at a point where the interview should
# still have been finding out what the product NEEDS. `projected-shadows` is
# never derived and stays reachable as a deviation. See derivations.md §W.
elevation: borders                # borders | soft-shadows | projected-shadows

# DERIVED from `surfaceModel`, which already answered it: `flat` leaves only a
# line or space, and `elevated`/`recessed` mean the tone IS the carrier. The one
# real choice is between a line and pure space inside `flat`, and it comes from
# `posture` with `density`.
elevationCarrier: border-color    # border-color | surface-tone | space

# The PHYSICS of light on the screen, and independent of the colour school. A
# product can be monochrome and elevated, monochrome and flat, functional and
# recessed. Treating this as part of the school is what makes generated systems
# converge: the school gets chosen and the surface model comes along for the ride.
#
#   flat      page and cards share one tone; hairlines and space separate
#   elevated  raised is LIGHTER than the page — sheets on a desk
#   recessed  grouped is DARKER than the page — niches cut into a surface
#
# It used to be two questions inside the accent-driven profile, asked only of
# monochrome products — so functional and brand products had the decision made by
# whichever example got copied.
#
# NOT dark mode. The word "inverted" is avoided for exactly that reason, and how
# each model behaves under the dark theme is derivations.md section T — where the
# finding is that `elevated` survives the flip unchanged and `recessed` inverts.
# DERIVED from `elevationCarrier`, not asked. It used to be a question in the
# accent-driven block and it was the elevation question asked a second time in
# different words — the two paired one to one, so the second could only confirm
# or contradict. It applies to every school; only the question was monochrome.
surfaceSeparation: lines          # lines | tones | shadows

surfaceModel: elevated            # flat | elevated | recessed
# DERIVED from the FRAME. It used to be asked in block 3 — before the question
# that answers it, which is worse than asking a preference at all. A single
# column or a content-and-aside layout needs two; an application frame whose
# navigation carries its own tone needs three.
#
# The rungs the layout does not spend are RESERVED, not saved: badges, chips,
# tags and resting secondary actions live one rung past the layout's last, so a
# layout that has spent every rung has nothing left that reads as an ELEMENT
# rather than a REGION.
ladderSpend: 2                    # 2 | 3

# DERIVED from the archetype and from `radius`, no longer asked. The old
# question's own table had exactly one ✅ in four of five rows, which means the
# archetype was answering it and the client was being asked to agree.
#
# The stroke is set against the BODY type weight, not against the icon set's
# default: a 2px stroke beside a light serif is a different product in the same
# screen, and a set ships one weight for every product that will ever use it.
#
# `mixed` — filled marks the selected state, outlined everything else — is the
# one value never derived, because it needs a set shipping both weights of the
# same glyph. Propose it only when the chosen set is known to have them.
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

# The page frame. One of the two structural answers in the file — facts about
# the product rather than preferences about how it looks, and the only two here
# that cannot be derived.
frame: single-column              # single-column | content-aside | app-frame

# What role imagery plays. The other structural answer, and the one most often
# left out — which is how a system ends up with an opinion about a button and
# none at all about the photograph beside it.
#
#   none        no photography, and none planned
#   supporting  images appear; a screen still reads without them
#   content     the image is what the user came for
#
# `content` makes the image a first-class surface: it spends a rung of the
# ladder, takes its own radius, and needs an answer for the empty and loading
# states. See derivations.md section K.
imagery: supporting               # none | supporting | content
# Unitless, feeding --app-ratio-media. `auto` means these images belong to
# someone else and are not this product to crop, which a grid does not survive
# — see conflicts.md.
imageRatio: 1.5                   # 1.7777 (16:9) | 1.5 (3:2) | 1 | 0.8 (4:5) | 0.75 (3:4) | auto
# Omit both when imagery is `none`, the same way the accent keys are omitted
# outside the monochrome school.

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
# Delete these two when colourStrategy is functional or brand: they describe a
# generated ramp, and those schools are given their palette rather than deriving
# it. Leaving them behind is worse than omitting them, because the next reader
# cannot tell a stale answer from a live one.
#
# high | low. DERIVED, not asked: the accent is measured against the lightest
# and darkest ramp steps, and whichever wins becomes `fg-on-accent`. Recorded
# here because tooling reads it, but changing it by hand does not change the
# measurement — change the accent instead.
accentContrast: high

# Which accent token a CHOSEN state reaches for — the decision the client
# describes as "sometimes saturated, sometimes washed". NOT accentContrast, which
# is the measurement above; the two look alike and are unrelated, and the
# distinction has to be restated wherever either appears.
#
#   saturated  bg-accent, ink inverts to fg-on-accent
#   washed     bg-accent-subtle, ink stays dark
#
# DERIVED from protagonist and dwell. Overruled by CARDINALITY, which the screen
# supplies rather than the interview: multi-select never takes a solid fill at
# any posture, because eight filled chips is a wall of colour with no hierarchy
# left for the action that acts on them. See derivations.md section V.
accentFill: washed                # saturated | washed
# 0 = true grey, 1 = the seed pigment at full strength. The smallest number in
# this file and the one that does the most visible work.
neutralPigment: 0.7

# DERIVED from `posture`, and derivations.md §A held the answer while this was
# still a question — the clearest of the four demotions. The remaining choice,
# quiet fill against outline at `quiet`, follows `elevationCarrier`: where the
# border carries hierarchy the outline is coherent, where tone carries it the
# quiet fill is.
#
# `tinted` and `second-brand` are never derived — both spend colour the accent
# budget has already allocated — and both stay reachable as deviations.
secondaryAction: outline          # outline | tinted | neutral | second-brand

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
- **Columns:** {{none, one measure centred | 12}} · **Gutter:** `--app-gap-grid`,
  {{token}} · **Measure:** `--app-size-measure`, {{68ch}}.

  > The measure is the constraint, not the column count. A twelve-column grid
  > whose content runs to 110 characters is a grid doing nothing.
- **Where the grid stops:** {{one sentence naming the breakpoint and what the
  layout becomes below it}}. The breakpoints themselves are the component
  library's and are set in `<library>-entry.scss` — there is no token for them,
  because they are compiled into generated rules before any custom property
  exists.
- **Density does not change per breakpoint** {{unless stated here, with the
  reason}}. A phone is not a denser device; it is a narrower one, and shrinking
  the unit on a touch screen fights the target size above.

### Shape

- **`radius-control`:** {{4px}} · **`radius-surface`:** {{6px}} · **Pills:**
  {{badges only | everywhere | never}} — from the archetype row in
  `archetypes.md`.
- Radius is the most recognisable archetype signal and the cheapest to change.
  {{One sentence on what this radius is saying — square reads as instrument,
  rounded reads as approachable, and the product has to mean one of them.}}
- **Surfaces are one step rounder than the controls inside them.** A control
  with the same radius as its container reads as stuck to it.

### Imagery

{{Delete this section only if `imagery: none`, and say so in one line rather
than removing the heading — a system with no images decided that, and the next
reader needs to know it was decided.}}

- **Role:** {{supporting | content}} — {{one sentence on what a screen loses
  without the image}}.
- **Proportion:** `--app-ratio-media`, {{3:2}} · **Thumbnails and avatars:**
  `--app-ratio-thumb`, always square.
- **Radius:** `--app-radius-image`, {{token}}. {{Whether it matches the surface
  it sits in, and why.}}
- **Edge:** {{an inset hairline | none}}. An image with a pale edge on a pale
  surface has no boundary, and the layout stops reading. Where a boundary is
  needed it is `box-shadow: inset 0 0 0 1px`, not a border — a photograph at a
  fixed ratio has no room to give up.
- **Decorative images:** {{allowed | not allowed}}. A decorative image is one a
  screen reader is told to skip; if it carries meaning it is not decorative, and
  calling it decorative to avoid writing alt text is how an audit fails for a
  reason nobody logged.
- **Before it loads:** the box is reserved with `aspect-ratio`, always, so
  nothing moves when the image arrives. A missing image shows
  {{`bg-neutral-subtle` and a centred icon}} — a state, not a spinner.

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

{{One paragraph on how the product sounds, from question 18.}}

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
- **What hover changes:** {{the background, one step}} — derived from
  `posture`. Hover never moves anything and never changes size: a control that
  grows under the cursor pushes its own neighbours, and on a list it slides the
  row away from the pointer aiming at it.
- **Every hover has a non-hover equivalent.** Touch has none, so an action
  revealed on hover is either always visible on touch or lives somewhere a
  finger can reach. `:active` is not optional — it is the only feedback a
  finger gets.
- **What moves:** {{colour and opacity only}} — derived from `posture`.
  **Layout does not animate**; height, width and position are what make an
  interface feel loose. **Nothing animates on page load.**
- **Durations:** `--app-duration-fast` for state feedback,
  `--app-duration-base` for disclosure, `--app-duration-slow` for anything
  entering the screen. Hover transitions in and out at the same duration; an
  asymmetric hover reads as lag.
- **Easing:** `--app-ease`, which decelerates. One curve, because a product
  with two easings has not decided on one.
- **Waiting:** {{a skeleton at `bg-neutral-subtle` | a spinner | neither}}.
  Nothing at all under ~300ms — a flash of a spinner is worse than a pause.
- **`prefers-reduced-motion` is honoured**, and honouring it means setting the
  duration tokens to `0s` inside the query. The state still changes; it changes
  at once. Removing the change instead is a different bug.

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

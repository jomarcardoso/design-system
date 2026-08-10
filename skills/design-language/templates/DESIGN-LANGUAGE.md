---
# =============================================================================
# Machine-readable decisions. An agent reads THIS; a person reads the prose.
#
# Keep the two in agreement. If a decision changes, change it here and in the
# section that explains it — a front matter that disagrees with its own document
# is worse than no front matter, because tooling trusts it.
# =============================================================================
archetype: tech-minimalist        # tech-minimalist | enterprise-solid | playful-expressive | editorial-premium | utilitarian-technical | hybrid
archetypeNote: ~                  # required when archetype is hybrid

density: comfortable              # dense | comfortable | generous
platform: desktop-first           # desktop-first | mobile-first | multiplatform

radius: subtle                    # square | subtle | rounded | pill
elevation: borders                # borders | soft-shadows | projected-shadows
elevationCarrier: border-color    # what carries hierarchy — required when elevation is `borders`

accessibility: AA                 # AA | AAA — sets the threshold in themes.check-contrast()
statusColours: traditional        # traditional | brand-adapted

# Which school this product belongs to. Sets config.$colour-strategy, and so
# which role collapses check-roles() treats as mistakes. It does NOT change
# which tokens exist — all three use one contract.
#   functional  a colour per job (Atlassian, Polaris)
#   brand       the brand hue also marks what is chosen (Material, Itau)
#   monochrome  one accent, everything else grey (Apple, Vercel, Radix)
colourStrategy: functional

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

# Ergonomics that outranked the archetype. Not a compromise — the system
# working as intended.
overrides:
  - decision: size-control raised to 44px
    because: mobile-first; 28px is a miss target on a phone

# Restrictions. `enforcement` is the honest part: `ledger` and `stylelint` fail
# a build, `document` is advice an agent reads.
guardrails:
  - rule: Never use gradient fills
    enforcement: stylelint
    signature: linear-gradient|radial-gradient
  - rule: Confirmations use a toast, never a modal
    enforcement: ledger
    instead: toast
---

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
- **Measure:** 45–75 characters. Wider and the eye loses the line return.
- **Hierarchy comes from size and weight, not colour.** A heading tinted to
  stand out stops standing out the moment it sits next to a status colour.
- Font sizes are `rem` so they follow the reader's browser setting; spacing is
  `px` so raising that setting does not inflate the layout.

### Spacing and grid

- **Base unit:** `--app-space-unit`, {{4px}}. Every gap is a multiple.
- **Density:** {{dense | comfortable | generous}} — {{what that means for
  control height and leading}}.
- Space belongs to the **container**, not to the item. A component that carries
  its own outer margin cannot be reused in a tighter context.

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

*Generated from the discovery interview on {{DATE}}. Undecided answers are
marked `undecided` with the default that was applied, so a gap stays visible
rather than hardening into a fact nobody chose.*

# The discovery interview

Fourteen questions in six blocks. Two rules govern the whole thing:

**Every question decides something concrete** — a token value, a build
threshold, or a rule the build can check. A question whose answer changes
nothing gets dropped rather than kept for symmetry.

**Block 1 chooses the archetype, and the archetype lights a path.** From then on
every question has a recommended answer, and the answers that fight the
archetype are marked. They are still available — a deliberate deviation is a
real design decision — but it has to be *deliberate*, and it gets written into
the document with its reason.

That is the point of running this before any code: the system starts with values
already decided and coherent, and six months later a new component is easy to
get right because the document already says what this product is.

---

## How to read the tables

| | ✅ | ⚠️ | ❌ |
|---|---|---|---|
| | the archetype's answer | works, but shifts the feel — note it | contradicts the archetype |

**❌ is not a refusal.** It means: choosing this stops the product being that
archetype in that respect. Ask why, accept the answer, and record it under
`deviations` in the generated document. A system whose deviations are written
down stays coherent; one whose deviations are forgotten drifts.

If three or more answers land on ❌, stop and revisit block 1 — the archetype is
probably wrong, and rewriting it now costs one question instead of a rebuild.

---

## How to run it

**Adaptively.** Ask a block, act, skip what is settled. "IBM Carbon but
friendlier" answers blocks 1 and 3 in one sentence.

**Confirm rather than enumerate.** After block 1: *"Enterprise suggests 4px
corners and soft shadows — keep those?"* is one exchange. Reading four options
aloud is four.

**Never invent an answer.** Write `undecided` with the default that was applied.
An assumption recorded as a fact is worse than a gap, because nobody revisits it.

**Interview in the client's language.** The generated file is English, like the
rest of the system.

---

## Block 1 — Positioning and archetype

> Decides the preset for every scale below, and the Principles section.

**1. What sector is this product in, and what does the brand promise?**

Free text. Opens the document, and gives the rest of the interview something to
test answers against.

**2. If the product were a person in a meeting, how would it behave?**

- (A) Serious, technical, straight to the point
- (B) Friendly, relaxed, encouraging
- (C) Elegant, reserved, sophisticated
- (D) Modern, dynamic, efficiency-focused

| answer | points to |
|---|---|
| A | Utilitarian & Technical, or Enterprise Solid |
| B | Playful & Expressive |
| C | Editorial & Premium |
| D | Tech Minimalist |

**3. Which archetype matches the vision?**

*Tech Minimalist · Enterprise Solid · Playful & Expressive · Editorial & Premium ·
Utilitarian & Technical · hybrid.*

**If 2 and 3 disagree, ask about it.** It usually means the brand aspires to one
thing and the product needs another — an analytics tool whose brand is playful,
say. That tension is the most useful thing the interview can surface, and the
resolution is normally "Utilitarian density, Playful voice", which is a hybrid
worth recording as one.

---

## Block 2 — Use context and ergonomics

> Decides `size-control`, `text-leading`, and which end of the spacing scale
> components reach for.

**4. How often is it used, and for what kind of task?**

- (A) Prolonged — a work tool, a dashboard, dense data
- (B) Occasional — checkout, self-service, short flows
- (C) Reading and continuous content

| | A · dense | B · comfortable | C · reading |
|---|---|---|---|
| Tech Minimalist | ✅ | ✅ | ⚠️ |
| Enterprise Solid | ✅ | ⚠️ | ❌ |
| Playful | ❌ | ✅ | ⚠️ |
| Editorial | ⚠️ | ⚠️ | ✅ |
| Utilitarian | ✅ | ❌ | ❌ |

**5. Which devices come first?**

*Desktop-first · Mobile-first · Equally multiplatform.*

No archetype forbids any of these, and one of them **overrides the archetype**:
mobile-first raises `size-control` to at least 44px regardless of what the
archetype wants. A 28px control is a miss target on a phone, and ergonomics
outranks personality. Record it as an override rather than a deviation — it is
the system working, not a compromise.

---

## Block 3 — Visual foundations and geometry

> Decides `radius-control`, `radius-surface`, `shadow-raised`, `shadow-overlay`.

**6. What shape should structures have — buttons, cards, inputs?**

| | square 0–2px | subtle 4–8px | rounded 12–16px | pill |
|---|---|---|---|---|
| Tech Minimalist | ⚠️ | ✅ | ⚠️ | ❌ |
| Enterprise Solid | ⚠️ | ✅ | ❌ | ❌ |
| Playful | ❌ | ⚠️ | ✅ | ✅ |
| Editorial | ⚠️ | ✅ | ❌ | ❌ |
| Utilitarian | ✅ | ⚠️ | ❌ | ❌ |

Radius is the most recognisable archetype signal and the cheapest to change —
two tokens. Do not let it absorb an hour of debate: set the preset, look at a
real screen, adjust once.

**7. How should depth and layering feel?**

| | flat, borders only | subtle shadows | projected shadows |
|---|---|---|---|
| Tech Minimalist | ✅ | ✅ | ❌ |
| Enterprise Solid | ⚠️ | ✅ | ❌ |
| Playful | ⚠️ | ✅ | ✅ |
| Editorial | ✅ | ⚠️ | ❌ |
| Utilitarian | ✅ | ⚠️ | ❌ |

**If flat, ask the follow-up: what carries hierarchy instead?**

Flat is not the absence of a decision — it moves the decision to
`border-color`. A flat system with a weak border produces surfaces nobody can
tell apart, **and it will pass the contrast check while doing it**, because that
check measures text against its background, not one surface against another.
Whatever carries hierarchy has to be the thing that is strong. The answer goes
into `elevationCarrier`, which the template requires when elevation is `borders`.

---

## Block 4 — Colour and accessibility

> Decides the theme map and the threshold in `themes.check-contrast()`.

**8. Is there a brand primary colour, or should one be generated?**

Free text. If it exists, ask for the exact value. If it is a hex, say up front
that it converts to oklch and may shift very slightly — that is gamut mapping,
not an error.

**No archetype answers this.** An archetype suggests a mood; the brand colour
comes from the brand, and guessing at the one thing the client already knows is
the fastest way to lose their confidence in everything else.

**9. What level of accessibility rigour?**

- (A) **WCAG AA** — 4.5:1 body text. The recommended default for every archetype.
- (B) **WCAG AAA** — 7:1. Government, health, anything with a legal requirement.

Not decoration: it sets the threshold the build enforces, and **AAA rejects
palettes AA accepts**. Settle it before colours are picked. Ask it early even
though it sits in block 4.

**10. How should success, warning, error and info behave?**

| | traditional green/amber/red/blue | adapted to the brand palette |
|---|---|---|
| Tech Minimalist | ✅ | ⚠️ |
| Enterprise Solid | ✅ | ❌ |
| Playful | ✅ | ⚠️ |
| Editorial | ⚠️ | ✅ |
| Utilitarian | ✅ | ❌ |

If adapted: adjust **chroma and temperature, not hue family**. A green that is
not green stops meaning "it worked", and that is the whole job of a status
colour.

---

## Block 5 — Voice and microcopy

> Decides the Voice section and the writing rules an agent follows.

**11. How should the system speak in its own messages?**

- (A) Direct and technical — *"Error 404: resource not found"*
- (B) Clear and action-oriented — *"We couldn't find that page. Back to start"*
- (C) Warm and light — *"That page went on holiday. Let's get you back"*

| | A · technical | B · action-oriented | C · warm |
|---|---|---|---|
| Tech Minimalist | ⚠️ | ✅ | ⚠️ |
| Enterprise Solid | ✅ | ✅ | ❌ |
| Playful | ❌ | ✅ | ✅ |
| Editorial | ⚠️ | ✅ | ⚠️ |
| Utilitarian | ✅ | ⚠️ | ❌ |

**Always ask where the boundary is.** Almost nobody wants (C) on a payment
failure. The usable answer is normally "B, dropping to A for anything involving
money or data loss", and that exception is what makes the rule enforceable —
it goes into `voiceExceptions`.

**12. Infinitive or imperative for action labels?**

*"Save changes" vs "Save your changes".*

No archetype prefers one. It sounds trivial and it is the most repeated string
pattern in a product — settling it once removes a recurring review comment
forever.

---

## Block 6 — Composition rules and guardrails

> Decides **checkable rules**. This block is what connects the interview to the
> build, and it is the reason the document is worth generating at all.

**13. Are there visual restrictions the system must NEVER apply?**

*Never gradients · never shadows · no filled icons · no full-bleed images · no
uppercase labels …*

Some come free with the archetype — Utilitarian already implies no decorative
effects — so read the implied ones back and ask what to add.

For each restriction, ask the question that makes it enforceable:

> **How would we know it was broken?**

A restriction with a detectable signature becomes a rule. One without stays
advice. *"Never gradients"* is detectable: `linear-gradient` in the product's own
CSS. *"Keep it elegant"* is not, and saying so honestly is better than pretending
it is a guardrail.

**14. What are the universal interaction patterns?**

Where confirmations live (modal or toast), whether destructive actions need a
typed confirmation, whether forms save on blur or on submit.

These become entries in `patterns.json`: the modal pattern either exists, or is
`forbidden` with the toast named as `instead`.

---

## Turning block 6 into something that fails a build

Three destinations, strongest first. **Say which one each rule got** — labelling
advice as enforcement is the one way the generated document can actively
mislead.

**1. A `forbidden` entry in `patterns.json`.** Best: `npm run verify:patterns`
fails and names the alternative.

```json
"gradient-button": {
  "intent": "A button with a gradient fill.",
  "state": "forbidden",
  "reason": "The brand is flat. A gradient reads as a different product.",
  "instead": "primary",
  "matches": { "bootstrap": ["btn-gradient"] }
}
```

**2. A stylelint rule**, for restrictions about CSS the ledger does not model.
`declaration-property-value-disallowed-list` catches
`background: linear-gradient` anywhere in the project's own styles.

**3. A line in `DESIGN-LANGUAGE.md`**, marked `enforcement: document`. An agent
reads it; no build checks it.

---

## Before writing the file

Read the answers back as a summary — archetype, density, geometry, colour
rigour, voice, and every deviation with its reason. Two things come out of that
reading:

- **Contradictions surface.** "Utilitarian" plus "generous spacing" plus "warm
  voice" is three ❌ in a row, and the archetype is the thing that is wrong.
- **The client hears their own product described.** If the summary sounds wrong
  to them, it is cheaper to fix now than after a theme and a component
  vocabulary have been built on it.

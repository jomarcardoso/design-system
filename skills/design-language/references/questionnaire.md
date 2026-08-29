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

> Decides `size-control`, `line-height`, and which end of the spacing scale
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

**8b (opener). Which of these is the priority — brand presence everywhere,
managing a dense operational workflow, or a clean page where the user's own
content is the only thing standing out?**

- Brand presence → probably `brand`
- Dense operational workflow, many states and alerts → probably `functional`
- Clean page, content is the protagonist → probably `monochrome`

Use it to open the topic, **not to decide**. It sorts fast because it is about
priority rather than pixels, and a client can answer it in one sentence. But it
sorts by product TYPE, and product type does not determine the school: Apple
Card is a bank and is monochrome; plenty of content apps are brand-led. Take the
answer as a hypothesis and confirm it with 8c.

**8c (decider). When something is CHOSEN — a selected tab, a ticked checkbox —
does it take your main brand colour, or a different one?**

- (A) A different colour → `$colour-strategy: 'functional'`
- (B) The main brand colour → `$colour-strategy: 'brand'`
- (C) There is only one colour; everything else is grey → `'monochrome'`

This is the decision. Phrased this way a client answers it without knowing any
vocabulary, and it is the most load-bearing line in the document — it is what a
new component six months later reads to find out whether "chosen" gets a colour
of its own.

**When 8b and 8c disagree, 8c wins, and say so out loud.** The disagreement is
information: a client who said "brand everywhere" and then described a grey
interface with one accent has a marketing site in mind and a product in front of
them. Naming that early is cheaper than discovering it in review.

It sets which collapses `check-roles()` treats as mistakes, and NOT which
tokens exist for SURFACES and STATUS — those are common — but it does decide the
names of the interactive roles. Read
[`references/colour-strategies.md`](colour-strategies.md) before asking, because
the follow-ups differ per answer.

**No archetype answers this one either.** Editorial products are as likely to
be monochrome as Tech Minimalist ones, and a Playful brand may well mark
selection with its own hue. The two axes are independent.

### 8d–8f — accent-driven only

Ask these **only when 8c answered (C)**. In the other two schools the palette is
given; in this one it is generated from two pigments, and these three answers
are what stop every monochrome product from looking like the same one. Skip them
elsewhere — a functional product has no single "accent" to profile.

**8d. Your highlight colour: strong enough that white text sits on it, or pale
enough that dark text stays?**

- (A) Strong — Spotify, iOS → `accentContrast: high`
- (B) Pale — a soft tinted fill → `accentContrast: low`

Both are the school. (A) fills the primary button and inverts its label; (B)
keeps a single ink colour throughout and leans harder on weight and space. The
generator needs to know because it decides whether `on-accent` is measured
against a light or a dark foreground, and getting it wrong fails the contrast
gate rather than shipping — but it fails at the end of the build, after the
whole palette has been derived from the wrong assumption.

**8e. Are your greys actually grey, or do they carry a tint?**

- Pure grey → `neutralPigment: 0`
- A hint — warm paper, cool slate → `0.5`–`0.8`
- Clearly tinted → `1`

This is the smallest number in the document and it does more visible work than
any other. It is a few thousandths of chroma in the mid-tones, and it is the
difference between a notebook and a settings screen. Ask for the FEELING —
"warm paper", "cold steel" — and pick the number; a client has no intuition for
chroma and every intuition for paper.

**8f. How is one surface told from the next — a line, a change of tone, or a
shadow?**

- (A) Lines → `surfaceSeparation: lines`
- (B) Tone → `tones`
- (C) Shadow → `shadows`

The school leans on this because it has no colour to spend on structure. It also
has to agree with `elevation` from block 2; if the client says "lines" here and
"soft shadows" there, resolve it now rather than emitting both.

**8g. Beside your main button, what does the supporting action look like?**


- (A) Outlined
- (B) A soft tint of the main colour
- (C) A plain grey
- (D) A second brand colour, filled

Seven treatments are in use and six of them are the same two or three tokens
pointed at different values — so the answer changes `theme.scss` and never the
product layer. Only (D) reaches for a layer 3 hook. The table of recipes is in
`colour-strategies.md`.

Ask it as an APPEARANCE question, as above, because that is how a client
thinks about it. Translating the answer into roles is this skill's job, not
theirs.

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

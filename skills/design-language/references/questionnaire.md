<!-- skills/design-language/references/questionnaire.md -->

# The discovery interview

Twenty-two questions in six blocks — four of them apply to one colour school
only, and one is skipped when the product is new. Two rules govern the whole thing:

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

**One number, one decision.** A question that carries three decisions collects
them positionally — "A, A" for three slots — and one disappears without anyone
noticing which. Split it into 22a, 22b, 22c and let each answer have a label to
land on.

**Confirming means proposing ONE option.** Compressing a question is allowed;
fusing its options is not. *"Hierarchy carried by whitespace and thin borders,
with imperceptible shadows — confirm?"* names three mutually exclusive answers
and takes a single "yes" for all of them. Whatever gets written down after that
is a guess, and it looks exactly like a decision. If a confirmation mentions two
options, it was not a confirmation — ask again with one.

**Every option gets a letter.** A client answers "C" in a second and composes
"preenchimento neutro sutil" in a minute, and the minute buys nothing — the two
answers carry the same information. Where this file writes options as a prose
list, that is shorthand for the reference, not the phrasing to use: letter them
before asking. The only free-text questions are 1 (sector and promise) and the
exact colour value in 12.

**A question with a known default is a confirmation, not a menu.** Once the
archetype and the school are set, most of what remains has a recommended answer
— propose it and let a "keep it" close the question. Reading four options to
someone with no reason to prefer one is asking them to do this skill's job.

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

- (A) Tech Minimalist
- (B) Enterprise Solid
- (C) Playful & Expressive
- (D) Editorial & Premium
- (E) Utilitarian & Technical
- (F) Hybrid — name the two

Lead with the one question 2 pointed at, marked as the suggestion.

**If 2 and 3 disagree, ask about it.** It usually means the brand aspires to one
thing and the product needs another — an analytics tool whose brand is playful,
say. That tension is the most useful thing the interview can surface, and the
resolution is normally "Utilitarian density, Playful voice", which is a hybrid
worth recording as one.

**4. Is this a break with the current product, or an evolution of it?**

Ask **only when a product already exists.** Skip it entirely for something new —
there is nothing to break with.

- (A) **A break.** The old interface is being replaced. Nothing about its
  contrast, its surfaces or its component shapes is binding.
- (B) **An evolution.** The new system dresses the existing product; today's
  layout, density and component behaviour survive.
- (C) **A break in look, an evolution in behaviour.** Colours, surfaces and
  weight are new; flows and component choices stay.

**This is the question whose absence caused the worst failure this interview has
produced.** With no answer on file, an agent looking at an existing product
treats what it sees as a constraint — and the result is the new palette applied
to the old contrast, which satisfies nobody: the client who wanted a redesign
gets their old interface in new colours, and nothing in the document says why.

It does not belong in `DESIGN_LANGUAGE.md`, because that file describes the
product being built rather than the one being left. It belongs in the interview
transcript and in the read-back, as a licence: **(A) authorises the agent to
ignore every legacy behaviour**, and without it the agent may not.

Note the asymmetry: (B) and (C) are constraints the client is choosing, so they
must be written down as such. (A) is the absence of a constraint, and it still
has to be said out loud, because silence reads as (B).

---

## Block 2 — Use context and ergonomics

> Decides `size-control`, `line-height`, and which end of the spacing scale
> components reach for.

**5. How often is it used, and for what kind of task?**

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

**6. Which devices come first?**

- (A) Desktop-first
- (B) Mobile-first
- (C) Equally multiplatform

No archetype forbids any of these, and one of them **overrides the archetype**:
mobile-first raises `size-control` to at least 44px regardless of what the
archetype wants. A 28px control is a miss target on a phone, and ergonomics
outranks personality. Record it as an override rather than a deviation — it is
the system working, not a compromise.

---

## Block 3 — Visual foundations and geometry

> Decides `radius-control`, `radius-surface`, `shadow-raised`, `shadow-overlay`,
> `icon-stroke` and `icon-size`.

**7. What shape should structures have — buttons, cards, inputs?**

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

**8. How should depth and layering feel?**

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

**9. What do the icons look like?**

- (A) Outlined, thin stroke
- (B) Outlined, medium stroke
- (C) Filled
- (D) Mixed — filled marks the selected state, outlined everything else

| | A · thin outline | B · medium outline | C · filled | D · mixed |
|---|---|---|---|---|
| Tech Minimalist | ✅ | ✅ | ⚠️ | ✅ |
| Enterprise Solid | ⚠️ | ✅ | ⚠️ | ✅ |
| Playful | ❌ | ⚠️ | ✅ | ✅ |
| Editorial | ✅ | ⚠️ | ❌ | ⚠️ |
| Utilitarian | ⚠️ | ✅ | ⚠️ | ⚠️ |

Icons carry more archetype signal per pixel than anything except radius, and
they are the foundation most often left undecided — which means a product ends
up mixing two icon sets and reading as two products.

Three consequences, and they are why this is a question rather than a preset:

- **Stroke weight has to agree with the type.** A 2px icon stroke beside a light
  serif is a different product in the same screen. Set `icon-stroke` against the
  body weight, not against the icon set's default.
- **Corner geometry follows question 6.** Icons drawn with square corners inside
  a 16px-rounded interface read as clip art. Whatever radius the interface took,
  the icon set has to be able to match it.
- **(D) is a behaviour, not a style**, and it is the one answer that needs the
  set to ship both weights of the same glyph. Confirm the set can before taking
  it.

**Colour is not an icon decision.** An icon inherits `currentColor` and takes
its meaning from the text beside it. An icon set with its own palette fights
every theme the product will ever have — including dark mode, which is where it
shows first.

**10. When something needs attention, does this product raise its voice or
lower everyone else's?**

- (A) **Quiet.** One thing stands out because everything around it recedes.
- (B) **Balanced.** Emphasis is stated plainly, and the rest is legible rather
  than hushed.
- (C) **Loud.** Emphasis is unmistakable and immediate.

| | A · quiet | B · balanced | C · loud |
|---|---|---|---|
| Tech Minimalist | ✅ | ✅ | ❌ |
| Enterprise Solid | ⚠️ | ✅ | ⚠️ |
| Playful | ❌ | ⚠️ | ✅ |
| Editorial | ✅ | ⚠️ | ❌ |
| Utilitarian | ⚠️ | ✅ | ⚠️ |

**This is the highest-leverage question in the interview**, and it is new
because the one it replaces was the opposite. `accentContrast` asked whether the
highlight was saturated enough to need light ink — a question about one token,
phrased in the token contract's own vocabulary, which a client cannot answer and
which left every other quiet element in the product at the library's default.

This one decides eight things: the fill and ink of every badge and tag, the
resting treatment of a secondary action, whether a chip is tinted or filled when
selected, divider weight, the interactive edge, control font weight, how far the
accent budget stretches, and `accentContrast` itself. The table is in
[`derivations.md`](derivations.md), and the values are **derived and shown**
rather than asked one at a time.

**Say the trade in plain words**, because a client hears "loud" as a compliment
and "quiet" as timid, and neither is true:

> *Quiet gets you a page where the content is the loudest thing, and the cost is
> that a hurried user has to look for the action. Loud gets you an action nobody
> can miss, and the cost is that everything else has to stay out of its way — a
> loud interface with three loud elements has none.*

**In `monochrome`, (C) is coherent but expensive.** Spotify is exactly that. It
puts the whole burden on one colour, so everything else must go quieter to
compensate, not louder. Worth saying when it comes up rather than treating it as
a contradiction.

---

## Block 4 — Colour and accessibility

> Decides the theme map and the threshold in `themes.check-contrast()`.

**11. Which colour school does this product belong to?**

Two phrasings of one decision: 9a opens the topic, 9b settles it. Ask 9a first
because it sorts fast, then confirm with 9b — 9a alone is never the answer.

**11a (opener). Which of these is the priority — brand presence everywhere,
managing a dense operational workflow, or a clean page where the user's own
content is the only thing standing out?**

- Brand presence → probably `brand`
- Dense operational workflow, many states and alerts → probably `functional`
- Clean page, content is the protagonist → probably `monochrome`

Use it to open the topic, **not to decide**. It sorts fast because it is about
priority rather than pixels, and a client can answer it in one sentence. But it
sorts by product TYPE, and product type does not determine the school: Apple
Card is a bank and is monochrome; plenty of content apps are brand-led. Take the
answer as a hypothesis and confirm it with 11b.

**11b (decider). When something is CHOSEN — a selected tab, a ticked checkbox —
does it take your main brand colour, or a different one?**

- (A) A different colour → `$colour-strategy: 'functional'`
- (B) The main brand colour → `$colour-strategy: 'brand'`
- (C) There is only one colour; everything else is grey → `'monochrome'`

This is the decision. Phrased this way a client answers it without knowing any
vocabulary, and it is the most load-bearing line in the document — it is what a
new component six months later reads to find out whether "chosen" gets a colour
of its own.

**When 11a and 11b disagree, 11b wins, and say so out loud.** The disagreement is
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

**12. Is there a brand primary colour, or should one be generated?**

**Asked after the school on purpose.** The school changes what this question is
even about: in `functional` it opens a palette of several roles, in `brand` it is
the one hue that does most of the work, and in `monochrome` it is the accent and
the ONLY chromatic decision in the product. Ask it first and the client is
choosing a colour without knowing what it will be used for.

- (A) There is one — give the exact value
- (B) There is none — generate it

If (A) and it is a hex, say up front that it converts to oklch and may shift very
slightly; that is gamut mapping, not an error.

**No archetype answers this.** An archetype suggests a mood; the brand colour
comes from the brand, and guessing at the one thing the client already knows is
the fastest way to lose their confidence in everything else.

**And the SCHOOL does not answer it either**, which is the trap in this block and
has already been walked into: a client who opens with "we are accent-driven" has
answered question 8, not this one. The school decides how many colours the system
spends and on what — it never chooses the hue. Naming a school and then skipping
the value produces *"a saturated blue ink tone"* in the finished document: a
sentence, where the build needs a number.

**A description is not an answer.** *"Ballpoint-pen blue on recycled paper"* is
the client doing their job well and this skill not doing its own. Convert it, on
the spot, to two values and read them back for confirmation — the accent and the
neutral seed — because the client can judge `oklch(0.45 0.19 258)` rendered next
to the words "ballpoint blue", and cannot judge it in the abstract six steps
later.

Leave the interview holding an `oklch()` or a hex. If there is none, say so,
generate one against the level chosen in question 15, and record in the document
that it was generated rather than given.

---

### 13 — the accent-driven profile

Ask these **only when 11b answered (C)**. In the other two schools the palette is
given; in this one it is generated from two pigments, and these three answers
are what stop every monochrome product from looking like the same one. Skip them
elsewhere — a functional product has no single "accent" to profile.

**`accentContrast` is NOT asked here any more.** It used to be: *"is your
highlight strong enough that white text sits on it, or pale enough that dark
text stays?"* — a question about `fg-on-accent`, answerable only by someone who
already knows the token contract, and deciding exactly one value while every
other quiet element in the product stayed at the library default.

It is now MEASURED from the accent that question 12 collected, and the posture
answer from question 10 decides the eight things it used to be standing in for.
See [`derivations.md`](derivations.md).

**13a. Are your greys actually grey, or do they carry a tint?**

- Pure grey → `neutralPigment: 0`
- A hint — warm paper, cool slate → `0.5`–`0.8`
- Clearly tinted → `1`

This is the smallest number in the document and it does more visible work than
any other. It is a few thousandths of chroma in the mid-tones, and it is the
difference between a notebook and a settings screen. Ask for the FEELING —
"warm paper", "cold steel" — and pick the number; a client has no intuition for
chroma and every intuition for paper.

**13b. How is one surface told from the next — a line, a change of tone, or a
shadow?**

- (A) Lines → `surfaceSeparation: lines`
- (B) Tone → `tones`
- (C) Shadow → `shadows`

The school leans on this because it has no colour to spend on structure.

**This answer and `elevation` from question 7 are the same decision asked twice,
so they pair one to one:**

| question 7 | 10c |
|---|---|
| `borders` | `lines` |
| `soft-shadows` | `shadows` |
| `projected-shadows` | `shadows` |
| — | `tones` → go back and set `elevation: borders`, because tone is not depth |

Any other combination is a contradiction, not a nuance. If the client said
"lines" there and "shadows" here, one of the two questions was heard wrong —
re-ask the one that was compressed, and do not emit both.

**13c. How much of the neutral ladder may the LAYOUT spend?**

- (A) One surface. Header, page and modal are all the canvas, separated by
  lines. The quietest, and the most editorial.
- (B) Two surfaces. The header and the modal sit one rung above the page.
- (C) Three or more. Distinct tones for header, sidebar, panel and page.

Asked because it is the difference a reader sees on every screen, and because it
is the question a client raises unprompted the moment they compare their current
product to this school: *"today my app uses a lot of tones — do I keep them?"*

**The rungs the layout does not spend are not saved, they are RESERVED.** This
school runs on a quiet neutral fill — badges, chips, tags, resting secondary
buttons, ghost hover — and those live at rung 3. A layout that has already spent
rungs 1, 2 and 3 on page, header and sidebar has nothing left that reads as an
ELEMENT rather than as a REGION, and every label then has to be either a
page-coloured rectangle with no edge or a dark solid that looks like a button.

So (C) is a deviation in this school rather than a preference, and it is worth
saying so out loud: it does not stop the product being accent-driven, it spends
the budget the school reserves for its most characteristic element. The rung
table in [`colour-strategies.md`](colour-strategies.md) says what each one is
for.

**13d. Which way does the ladder run?**

Ask only when 13c answered (B) or (C). With one surface there is no direction.

- (A) **Paper on a table.** The page sits a rung or two up the ladder and
  anything raised above it is LIGHTER — a card, a modal, a dropdown. The
  lightest step is reserved for what floats.
- (B) **Recessed containers.** The page is the lightest step, and anything
  grouped or contained is DARKER — a form panel, a data area, a sidebar.

Both are in shipped systems and neither is a default:

| | (A) lighter as it rises | (B) darker as it groups |
|---|---|---|
| documented in | Radix UI's 12-step scale; Apple HIG; editorial reading products | Material 3's `surface-container` / `-low` / `-high`; Atlassian's `color.background.neutral.subtle` |
| suits | reading, content the user owns, anything imitating a physical page | dense operational screens, forms, tables, dashboards |
| the metaphor | sheets stacked on a desk | wells cut into a surface |

**Two other answers already push at this and neither settles it**, which is why
it is its own question. `elevation: borders` means tone is the only thing left
that can lift something — but it does not say which way. And a product imitating
paper is not automatically (A): a recipe card sunk into the page is a perfectly
coherent design, it is just a different one.

**It has to be asked rather than inferred.** The first build of the
accent-driven example took (A) by copying another example's theme, and the
client liked the result — which is the worst way to be right, because nothing
recorded the decision and the next theme would have inherited it by accident
too.

Record it in section 2 under Elevation, in words rather than in step numbers:
*"anything raised is lighter than the page"* survives a change of palette;
*"cards are step 50"* does not.

---

**14. Beside your main button, what does the supporting action look like?**


- (A) Outlined
- (B) A soft tint of the main colour
- (C) A plain grey
- (D) A second brand colour, filled

**The school already has a favourite here — offer it as the default.** Question 8
narrows this one, so present the recommendation and take a "keep it" as the
answer rather than reading four options to a client who has no reason to prefer
one:

| school | default | why |
|---|---|---|
| `functional` | (A) outlined | the palette is already spending colour on roles |
| `brand` | (B) a soft tint | the brand hue is present anyway; the tint reads as the same family |
| `monochrome` | (C) plain grey | there is one accent and the secondary action is not it |

(D) is the only answer that reaches for a layer 3 hook, and in `monochrome` it
contradicts the school outright — take it, if taken, as a deviation.

Seven treatments are in use and six of them are the same two or three tokens
pointed at different values — so the answer changes `theme.scss` and never the
product layer. Only (D) reaches for a layer 3 hook. The table of recipes is in
`colour-strategies.md`.

Ask it as an APPEARANCE question, as above, because that is how a client
thinks about it. Translating the answer into roles is this skill's job, not
theirs.

**15. What level of accessibility rigour?**

- (A) **WCAG AA** — 4.5:1 body text. The recommended default for every archetype.
- (B) **WCAG AAA** — 7:1. Government, health, anything with a legal requirement.

Not decoration: it sets the threshold the build enforces, and **AAA rejects
palettes AA accepts**. Settle it before colours are picked. Ask it early even
though it sits in block 4.

**16. How should success, warning, error and info behave?**

- (A) Traditional — green, amber, red, blue
- (B) Adapted to the brand palette

The archetype has a ✅ in every row below, so **offer it as the default** instead
of asking cold: *"Editorial suggests adapted status colours — keep that?"*

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

**17. How should the system speak in its own messages?**

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

**18. Infinitive or imperative for action labels?**

- (A) Infinitive — *"Save changes"*
- (B) Imperative — *"Save your changes"*

No archetype prefers one. It sounds trivial and it is the most repeated string
pattern in a product — settling it once removes a recurring review comment
forever.

---

## Block 6 — Composition rules and guardrails

> Decides **checkable rules**. This block is what connects the interview to the
> build, and it is the reason the document is worth generating at all.

**19. What regions does a page have?**

- (A) **A single column.** A header, the content, a footer. Nothing beside it.
- (B) **Content with an aside.** A sidebar, filters, or a table of contents
  sitting alongside.
- (C) **An application frame.** Persistent navigation on one edge, a working
  area, and often a panel on the other.

One of the two structural questions in the interview — this and question 20 —
and they are here because they are facts about the PRODUCT rather than
preferences about how it looks. Everything else in this block can be derived;
these cannot. A recipe notebook and a recipe manager have the same archetype,
the same school and different frames.

**It spends the ladder.** Each persistent region that wants its own tone takes a
rung, and question 13c already fixed the budget. (C) with a two-surface budget
means the navigation and the working area share a tone and are separated by a
line; if the client wants them to differ, the budget has to move. Say that
rather than quietly spending a third rung.

**Everything else about the frame is derived** — the container measure, whether
the header is sticky or collapses, whether the aside is a rail or a panel, how
the frame degrades on a phone. Those follow from the archetype, question 5 and
the disclosure posture, and the tables are in
[`derivations.md`](derivations.md).

**20. What role does imagery play?**

- (A) **None.** The product has no photography, and none is planned. Illustration
  and icons are the only non-text elements.
- (B) **Supporting.** Images appear — an avatar, a thumbnail, a logo — but a
  screen still reads with every one of them missing.
- (C) **The content.** The image is what the user came for. A recipe photograph,
  a product shot, a portfolio piece. A screen without it is broken, not plainer.

The second fact about the product, and the one most often skipped — which is why
a generated system usually has an opinion about a button's border and none at all
about the photograph next to it. Nothing else in the interview implies it: the
same archetype, the same school and the same frame describe both a recipe
notebook where the photograph is the page and a recipe manager where it is a
32px thumbnail beside a title.

**(C) makes the image a first-class surface**, which is a real cost. It takes a
rung of the ladder for the frame around it, it needs its own radius decision
separate from the card's, and it needs an answer for what shows before the image
loads and when there is none — a hole the ledger otherwise fills at the first
bug report.

**20a. Ask only when the answer is (B) or (C) — what proportion?**

- (A) **Wide** — 16:9 or 3:2. Landscape, editorial, cinematic.
- (B) **Square** — 1:1. Grids, avatars, anything that has to tile.
- (C) **Tall** — 4:5 or 3:4. Phone-first, food, fashion.
- (D) **Whatever the image is.** No crop.

*Propose (A) for Editorial and Enterprise, (B) where the answer to 19 was (C),
(D) only when the client says the images are not theirs to crop.*

**(D) is not a free option.** An uncropped image makes every row a different
height, and a product that also asked for a dense grid is asking for two things
that do not hold together. That is a conflict, and
[`conflicts.md`](conflicts.md) has the softening move.

**Everything else about images is derived** — the border treatment, the radius,
whether they take a shadow, and what the system does with a decorative image.
The tables are in [`derivations.md`](derivations.md), section K.

**21. Are there visual restrictions the system must NEVER apply?**

**Do not ask this cold.** A client at this point in a first interview has no
restrictions in mind, and asking them to produce some invites either an invented
prohibition or an apologetic "I don't know" — both of which are the question
failing, not the client. Nobody arrives with a list of things a product they have
not built yet must never do. Restrictions come from having been burned, and this
client has not been burned yet.

Ask it in two parts instead.

**21a. Confirm what the archetype already forbids.** Present these as *already
held*, not as options to pick — the answer is a yes, or a correction:

| archetype | implied restrictions |
|---|---|
| Tech Minimalist | no gradients, no decorative shadows, no illustration as chrome |
| Enterprise Solid | no gradients, no pill buttons, no display faces in the UI |
| Playful & Expressive | no dense data tables, no uppercase-only labels |
| Editorial & Premium | no gradients, no heavy shadows, no coloured headings, no uppercase labels |
| Utilitarian & Technical | no decorative effects at all, no illustration, no rounded corners |

> *"Editorial already rules out gradients, heavy shadows and coloured headings.
> I have those. Anything to add?"*

**21b. Anything beyond that?**

- (A) Nothing for now
- (B) Yes — say it

**(A) is the expected answer and must be offered first**, not buried under five
inventions. It is a real, common, correct outcome for a first interview: the
guardrail list is the part of this document most designed to grow, and it grows
from the first review where someone shipped a gradient. Say so when recording it,
so an empty list reads as a stage rather than an oversight.

The list fills faster on the conversion path — a team with an existing product
has been burned already, and *"what keeps coming back in review?"* is the same
question with a memory to answer from.

For each restriction, ask the question that makes it enforceable:

> **How would we know it was broken?**

A restriction with a detectable signature becomes a rule. One without stays
advice. *"Never gradients"* is detectable: `linear-gradient` in the product's own
CSS. *"Keep it elegant"* is not, and saying so honestly is better than pretending
it is a guardrail.

**22. What are the universal interaction patterns?**

Three decisions, so **three labelled questions** — not one number carrying three
answers. Numbering them together produces "A, A" for three slots: one answer
silently dropped, and no way to tell which.

**22a. Where do confirmations live?**

- (A) A modal — blocks until answered
- (B) A toast with undo

*Propose (A) for anything that cannot be undone, (B) otherwise.*

**22b. How much friction does a destructive action need?**

- (A) One click
- (B) A confirmation step
- (C) Typing the name of the thing being deleted

*Propose (B), or (C) when the data is unrecoverable.*

**22c. When do forms save?**

- (A) On blur, field by field
- (B) On an explicit submit

*Propose (B).*

These become entries in `patterns.json`: the modal pattern either exists, or is
`forbidden` with the toast named as `instead`. **All three reach the document** —
an answer collected in the ledger and missing from the generated file is worse
than one never asked, because the client watched it being written down.

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

**3. A line in `DESIGN_LANGUAGE.md`**, marked `enforcement: document`. An agent
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

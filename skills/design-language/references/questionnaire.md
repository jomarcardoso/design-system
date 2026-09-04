<!-- skills/design-language/references/questionnaire.md -->

# The discovery interview

Eighteen questions in six blocks, and two of them are skipped for a product
that does not exist yet. Two rules govern the whole thing:

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
noticing which. Split it into 18a, 18b, 18c and let each answer have a label to
land on.

**Confirming means proposing ONE option.** Compressing a question is allowed;
fusing its options is not. *"Hierarchy carried by whitespace and thin borders,
with imperceptible shadows — confirm?"* names three mutually exclusive answers
and takes a single "yes" for all of them. Whatever gets written down after that
is a guess, and it looks exactly like a decision. If a confirmation mentions two
options, it was not a confirmation — ask again with one.

**Every question declares the key it fills**, as `→ \`key\`` after its
heading. It is what `npm run docs:decisions` reads to build `DECISIONS.md`, and
it is the only signal that generator accepts — inferring it from the nearest
heading above a mention produced a table that was confidently wrong, reading
`posture` as asked at question 6 because question 6 discusses it. A question
with no marker fills no key, which is true of questions 1, 2, 4, 11, 18 and of
every sub-question that shares its parent's.

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

**3. Which archetype matches the vision?** → `archetype`, `archetypeSecondary`

- (A) Tech Minimalist
- (B) Enterprise Solid
- (C) Playful & Expressive
- (D) Editorial & Premium
- (E) Utilitarian & Technical
- (F) Two of them — name which gives the STRUCTURE and which gives the SOUL

Lead with the one question 2 pointed at, marked as the suggestion.

**If 2 and 3 disagree, ask about it.** It usually means the brand aspires to one
thing and the product needs another — an analytics tool whose brand is playful,
say. That tension is the most useful thing the interview can surface, and the
resolution is normally "Utilitarian density, Playful voice" — and that is not a
hybrid, it is a PRIMARY and a SECONDARY. Record Utilitarian as the archetype and
Playful as `archetypeSecondary` governing `voice`. `hybrid` is retired: it named
two and never said which won where, so every later decision re-opened the
argument. See `derivations.md` §Y for the closed list of domains a secondary may
govern, and the longer list it may never touch.

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

## Block 2 — What the product is for

> Decides `density`, `size-control`, `line-height`, `posture` and
> `surfaceModel`. **This is the block that stops the interview collecting
> taste.**

Everything here is a fact about the product that its owner knows and a designer
would have to guess. Nothing here asks what anything should look like — and the
four visual decisions this block feeds are all the stronger for being derived
from it rather than asked.

**Why this block exists in this form.** Ask a client whether they want an
elegant interface and they say yes; nobody says no. A preference question with
no counterpoint collects a yes that means nothing, and worse, it invites someone
who is not a designer to make a designer's decision with ten seconds of
vocabulary. The counterpoint that works is never *ugly versus elegant* — it is
**what the product is for**, which has real trade-offs a client can weigh
because they are trade-offs about their own users.

**5. How often does someone open this, and for what?** → `density`

- (A) **Every working day.** It is the tool their job runs on.
- (B) **Some days.** A specific task, come back when it comes up again.
- (C) **Rarely, often once.** A sign-up, a purchase, a form.

| | A · daily | B · some days | C · rarely |
|---|---|---|---|
| Tech Minimalist | ✅ | ✅ | ✅ |
| Enterprise Solid | ✅ | ✅ | ⚠️ |
| Playful | ⚠️ | ✅ | ✅ |
| Editorial | ⚠️ | ✅ | ✅ |
| Utilitarian | ✅ | ⚠️ | ❌ |

**6. How long is one sitting?** → `dwell`

- (A) **Seconds to a couple of minutes.**
- (B) **Ten to thirty minutes.**
- (C) **An hour or more, continuously.**

**Frequency and dwell are different questions and used to be one.** They fused
into *"prolonged / occasional / reading"*, which forced a single letter to carry
both — and a recipe notebook is the case that breaks it: opened now and then
(B on question 5) and left open for an hour while someone cooks (C here). The
fused version collected `occasional` and threw away the answer that decides more.

**Dwell is the strongest single input to `posture`**, and it is the counterpoint
question in disguise:

> *Ten seconds gets you one chance to make an impression, and heavier elements
> pay off — nobody is around long enough to tire of them. An hour gets you the
> opposite problem: every extra border, every extra tone, every element with its
> own small claim on attention becomes something the eye has to process again
> and again, and the product that looked richest in the first minute is the one
> that is exhausting in the fortieth.*

That sentence is worth saying out loud, because it is the trade the client is
actually making and no amount of asking about elegance surfaces it.

| dwell | proposes |
|---|---|
| A · seconds | `posture: balanced` or `loud`; density can be generous with weight |
| B · minutes | **nothing — the archetype decides.** Ten to thirty minutes carries no signal either way, and a first draft that had it propose `balanced` manufactured a conflict with Editorial that the interview then put to the client as a menu |
| C · an hour or more | `posture: quiet`; every decorative element has to justify itself |

**7. Who is the screen for?** → `protagonist`, `colorCriticalWorkspace`

- (A) **The content the user puts there.** Their notes, their photographs, their
  documents. The interface is the paper.
- (B) **The content the product offers.** A catalogue, a library, other people's
  work presented well.
- (C) **The brand.** Someone should know whose product this is from across the
  room.
- (D) **The tools.** The user is manipulating something, and the controls are
  the product.

The question the colour-school block cannot ask, because the school is an answer
about *token architecture* and this is an answer about *who the screen belongs
to*. They correlate and they are not the same: a bank can be monochrome, and a
reading app can be brand-led.

| protagonist | proposes |
|---|---|
| A · the user's content | `surfaceModel: elevated`; the accent budget at its smallest |
| B · the product's content | `elevated` or `flat`; imagery is likely `content` |
| C · the brand | `flat` with brand-coloured blocks, or `recessed`; the accent budget widest |
| D · the tools | `recessed` or `flat`; see the colour-critical rule below |

**(D) has a follow-up that is DERIVED from question 1, not asked.** When the
product described there is one where the user judges colour — a photo or video
editor, a 3D tool, anything with a canvas being calibrated — set
`colorCriticalWorkspace: true` and say so:

> *"You described an image editor. That makes the interface a frame around a lit
> viewport rather than a surface in its own right: the chrome goes low-contrast
> and neutral so the user's iris stays adapted to the image and not to the
> toolbar. It is physiology, not taste. Confirm?"*

It is a flag any archetype may carry rather than a sixth archetype, because the
case is real, rare, and does not change anything else about the product's
personality. What it does change is written in `derivations.md`.

**8. Which devices come first?** → `platform`

- (A) Desktop-first
- (B) Mobile-first
- (C) Equally multiplatform

No archetype forbids any of these, and one of them **overrides the archetype**:
mobile-first raises `size-control` to at least 44px regardless of what the
archetype wants. A 28px control is a miss target on a phone, and ergonomics
outranks personality. Record it as an override rather than a deviation — it is
the system working, not a compromise.

---

## Block 3 — Depth and emphasis

> Decides `elevation`, `elevationCarrier`, `surfaceModel` and `posture`.

**Two questions moved out of this block and became derivations**, because they
were the two most likely to collect taste from someone with no reason to have an
opinion:

| what used to be asked | now |
|---|---|
| **the shape of things** — square, subtle, rounded, pill | DERIVED from the archetype. Its own text already said *"set the preset, look at a real screen, adjust once"*, which is a derivation describing itself as a question. See `derivations.md` §O. |
| **what the icons look like** — outline, filled, mixed | DERIVED from the archetype and the shape. The ✅ table had exactly one ✅ per archetype in four of five rows, which means the archetype was already answering it. See `derivations.md` §P. |

Both still reach the client — in the read-back, with their provenance, as
something to disagree with. **A derived default is not a decision taken away
from anyone.** It is a decision made by the thing that has the standing to make
it, and shown.

**9. → `posture`. When something needs attention, does this product raise its voice or
lower everyone else's?** — proposed from question 6, then confirmed.

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

**The highest-leverage question in the interview**, and the one most improved by
having block 2 in front of it. It decides eight things: the fill and ink of every
badge and tag, the resting treatment of a secondary action, whether a chip is
tinted or filled when selected, divider weight, the interactive edge, control
font weight, how far the accent budget stretches, and `accentContrast` itself.
The tables are in [`derivations.md`](derivations.md), and the values are
**derived and shown** rather than asked one at a time.

**Propose from dwell rather than asking cold.** *"An hour-long sitting proposes
quiet — the cost is that a hurried user has to look for the action, and the
benefit is that nobody is tired at minute forty. Keep it?"* is one exchange and
it carries the trade. Reading three options aloud is three exchanges and carries
none.

**In `monochrome`, (C) is coherent but expensive.** It puts the whole burden on
one colour, so everything else must go quieter to compensate, not louder. Worth
saying when it comes up rather than treating it as a contradiction.

---

## Block 4 — Colour and accessibility

> Decides the theme map and the threshold in `themes.check-contrast()`.

**10. → `colourStrategy`, asked ONLY on the conversion path. When something is CHOSEN today — a selected tab, a ticked checkbox —
does it take your main brand colour, or a different one?**

**Ask ONLY when a product already exists.** Then it is an observation, and the
client can walk to a screen and look:

- (A) A different colour → `colourStrategy: functional`
- (B) The main brand colour → `'brand'`
- (C) There is only one colour; everything else is grey → `'monochrome'`

**For a new product it is DERIVED and never asked**, because there is nothing to
observe and the question then asks a non-designer to invent a colour
architecture. It follows question 7, which already established who the screen
belongs to:

| `protagonist` | `colourStrategy` |
|---|---|
| the user's content | `monochrome` — the interface recedes so the content can be the only thing standing out |
| the product's content | `monochrome`, or `brand` where the catalogue IS the brand |
| the brand | `brand` |
| the tools | `functional` — many states and alerts, each needing to be told apart |

**This question used to have an opener asking which of brand presence, dense
operational workflow, or a clean page was the priority. That was question 7
asked a second time**, in the colour block, in different words — the same
duplication `surfaceSeparation` had, and the client caught it the same way. One
answer, one place.

It remains the most load-bearing line in the document: it is what a new
component six months later reads to find out whether "chosen" gets a colour of
its own. Deriving it does not make it less so. It makes it derived from the
answer that already contained it.

**11. Is there a brand primary colour, or should one be generated?**

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
answered question 10, not this one. The school decides how many colours the system
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
generate one against the level chosen in question 12, and record in the document
that it was generated rather than given.

---

### The viability gate — computed, not asked

**Run this the moment questions 11 and 11b have answers, and before asking
anything else.** It is not a question. It is arithmetic on the two pigments, and
its output decides which options the remaining questions are allowed to offer.

```
Δh          = hue distance between accent and neutral, in OKLCH
C_neutral   = chroma of the neutral
C_max(L, h) = the sRGB gamut ceiling for the accent's hue at the wash lightness

wash  viable when   C_wash >= 3 × C_neutral   AND   Δh <= 150
solid viable when   contrast(accent rung 9, surface) >= 3.0
ink   viable when   contrast(accent rung 11, wash)   >= 4.5
outlined            always viable — a border needs no chroma headroom
```

`node scripts/audit-wash.mjs <product-dir>` computes all of it and prints the
report. During the interview the palette is not built yet, so compute it by hand
from the two pigments; the numbers are the same.

**Why it has to happen here and not at build time.** A client whose palette
cannot hold a washed accent will, if asked, cheerfully choose "a soft tint of the
main colour" for the selected state — it is the nicest-sounding option — and the
build will then produce a pale patch of a near-opposite hue on warm paper, which
reads as a stain. Nobody involved will be able to say what went wrong, because
every individual decision was reasonable. The interview has to stop offering the
option, not the build has to reject it.

The reason is physical rather than aesthetic, and it is worth being able to say
out loud: sRGB does not allow a colour to be light and saturated at once, and how
much it disallows depends on hue. A pale blue is obligatorily low-chroma; a pale
amber is not. Mix either into a warm neutral and you get the same lightness back,
but only one of them is still recognisably coloured. See
[`monochrome.md`](monochrome.md) §12.

### What the gate changes downstream

| capability | what stops being offered |
|---|---|
| wash unavailable | question 14 drops "a soft tint of the main colour" for the secondary action. The derivation for a SELECTED state stops proposing washed accent and proposes neutral elevation, a solid indicator, or an outline instead. Chips, tabs and nav items all follow. |
| solid unavailable | the accent cannot be a primary button fill. Very rare, and usually means the accent is too pale — say so and offer to darken it. |
| ink unavailable | the accent cannot be used as text. Offer a dedicated rung 11 rather than deriving ink from the fill. |

### Presenting an unavailable wash to the client

Never as a refusal, and never in token vocabulary. Three routes, with the numbers
attached, in this order:

1. **Keep the colour and spend it differently.** The accent lives at the solid
   fill and at dark ink. For a near-complementary pair this is not a consolation
   prize — it is the pairing's best form, and navy-on-cream has been a good idea
   for four hundred years.
2. **Move the accent hue**, by the computed amount, and give BOTH directions with
   the resulting distance. The shorter arc is not automatically the better design:
   from a blue, one way lands in violet and keeps the coldness, the other lands in
   teal and gives some of it up. That is a product decision, not an arithmetic one.
3. **Move the neutral instead.** If the pigment is the brand, the paper is what
   should give ground — and a neutral carrying a little of the accent's hue is the
   school's default pairing precisely because it removes this whole problem.

If the client keeps the difficult pairing, record it as a `deviation` with the
reason and the date. They have the right to keep it; what they should not have is
an accident.

### The general rule this is an instance of

**Every pair of answers that produces an impossible capability deserves the same
treatment: compute early, warn before asking, and narrow the options rather than
letting the client choose something the build will later reject.**

That is the difference between an interview that collects and one that guides,
and colour is only the first place it showed up. When another such pair is found,
it belongs here, in the same shape.

---

### The accent-driven profile — question 13

Ask **only when 11b answered (C)**. In the other two schools the palette is
given; in this one it is generated from two pigments, and the pigment number is
what stops every monochrome product from looking like the same one. Skip it
elsewhere — a functional product has no single "accent" to profile.

It used to be four questions. Two of them — the ladder budget and its direction
— turned out to belong to every school and moved to block 3; one was the depth
question asked twice and was deleted. What is left is the one number no other
answer implies.

**`accentContrast` is NOT asked here any more.** It used to be: *"is your
highlight strong enough that white text sits on it, or pale enough that dark
text stays?"* — a question about `fg-on-accent`, answerable only by someone who
already knows the token contract, and deciding exactly one value while every
other quiet element in the product stayed at the library default.

It is now MEASURED from the accent that question 11 collected, and the posture
answer from question 9 decides the eight things it used to be standing in for.
See [`derivations.md`](derivations.md).

**12. What level of accessibility rigour?** → `accessibility`

- (A) **WCAG AA** — 4.5:1 body text. The recommended default for every archetype.
- (B) **WCAG AAA** — 7:1. Government, health, anything with a legal requirement.

Not decoration: it sets the threshold the build enforces, and **AAA rejects
palettes AA accepts**. Settle it before colours are picked. Ask it early even
though it sits in block 4.

## Block 5 — Voice and microcopy

> Decides the Voice section and the writing rules an agent follows.

**13. How should the system speak in its own messages?** → `voice`, `voiceExceptions`

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

**14. Infinitive or imperative for action labels?** → `ctaMood`

- (A) Infinitive — *"Save changes"*
- (B) Imperative — *"Save your changes"*

No archetype prefers one. It sounds trivial and it is the most repeated string
pattern in a product — settling it once removes a recurring review comment
forever.

---

## Block 6 — Composition rules and guardrails

> Decides **checkable rules**. This block is what connects the interview to the
> build, and it is the reason the document is worth generating at all.

**No archetype tables in this block, and that is deliberate.** Every other
block marks a recommended answer because the archetype has an opinion; here the
first two questions are FACTS about the product and the last two are the
clients own history. An archetype that recommended a frame would be
recommending what the product is, which it does not get to do. Say that when
the marks are noticed missing — an absent table reads as an oversight, and this
one is a position.

**15. What regions does a page have?** → `frame`

- (A) **A single column.** A header, the content, a footer. Nothing beside it.
- (B) **Content with an aside.** A sidebar, filters, or a table of contents
  sitting alongside.
- (C) **An application frame.** Persistent navigation on one edge, a working
  area, and often a panel on the other.

One of the two structural questions in the interview — this and question 16 —
and they are here because they are facts about the PRODUCT rather than
preferences about how it looks. Everything else in this block can be derived;
these cannot. A recipe notebook and a recipe manager have the same archetype,
the same school and different frames.

**It spends the ladder.** Each persistent region that wants its own tone takes a
rung, and `ladderSpend` — derived from this answer and the surface model — fixes
the budget. (C) with a two-surface budget
means the navigation and the working area share a tone and are separated by a
line; if the client wants them to differ, the budget has to move. Say that
rather than quietly spending a third rung.

**Everything else about the frame is derived** — the container measure, whether
the header is sticky or collapses, whether the aside is a rail or a panel, how
the frame degrades on a phone. Those follow from the archetype, question 5 and
the disclosure posture, and the tables are in
[`derivations.md`](derivations.md).

**16. What role does imagery play?** → `imagery`

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

**16a. Ask only when the answer is (B) or (C) — what proportion?** → `imageRatio`

- (A) **Wide** — 16:9 or 3:2. Landscape, editorial, cinematic.
- (B) **Square** — 1:1. Grids, avatars, anything that has to tile.
- (C) **Tall** — 4:5 or 3:4. Phone-first, food, fashion.
- (D) **Whatever the image is.** No crop.

*Propose (A) for Editorial and Enterprise, (B) where the answer to 15 was (C),
(D) only when the client says the images are not theirs to crop.*

**(D) is not a free option.** An uncropped image makes every row a different
height, and a product that also asked for a dense grid is asking for two things
that do not hold together. That is a conflict, and
[`conflicts.md`](conflicts.md) has the softening move.

**Everything else about images is derived** — the border treatment, the radius,
whether they take a shadow, and what the system does with a decorative image.
The tables are in [`derivations.md`](derivations.md), section K.

**17. Are there visual restrictions the system must NEVER apply?** → `guardrails`

**Do not ask this cold.** A client at this point in a first interview has no
restrictions in mind, and asking them to produce some invites either an invented
prohibition or an apologetic "I don't know" — both of which are the question
failing, not the client. Nobody arrives with a list of things a product they have
not built yet must never do. Restrictions come from having been burned, and this
client has not been burned yet.

Ask it in two parts instead.

**17a. Confirm what the archetype already forbids.** Present these as *already
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

**17b. Anything beyond that?**

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

**18. What are the universal interaction patterns?**

Three decisions, so **three labelled questions** — not one number carrying three
answers. Numbering them together produces "A, A" for three slots: one answer
silently dropped, and no way to tell which.

**18a. Where do confirmations live?**

- (A) A modal — blocks until answered
- (B) A toast with undo

*Propose (A) for anything that cannot be undone, (B) otherwise.*

**18b. How much friction does a destructive action need?**

- (A) One click
- (B) A confirmation step
- (C) Typing the name of the thing being deleted

*Propose (B), or (C) when the data is unrecoverable.*

**18c. When do forms save?**

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

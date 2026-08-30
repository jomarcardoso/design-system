<!-- skills/design-language/references/conflicts.md -->

# Conflicts, and how to soften them

Some answers cannot all be true at once. The interview's job when that happens
is **not to refuse and not to silently pick a winner** — it is to say what
breaks, offer the cheapest ways to keep the intent, and let the client choose.

A conflict handled well is the most useful moment in the interview: it is where
the client learns something about their own product. A conflict handled badly
produces a document that agrees with itself and disagrees with what was wanted.

---

## The four classes

| | what it is | what it costs | how it ends |
|---|---|---|---|
| **against the archetype** | an answer the archetype marks ⚠️ or ❌ | nothing, if recorded | a `deviation` with a reason |
| **against another answer** | two answers that cannot both be honoured | one of them is not going to happen | this file |
| **against physics** | contrast, gamut, a ratio that does not exist | the build fails, at the end | a softening plan, or a moved value |
| **against the library** | the shape cannot be expressed | product CSS, or a pending entry | `patterns.json`, as a pending implementation |

Only the second and third are here. The first is `deviations` and is already
routine; the fourth belongs to the ledger.

## How to raise one

**Name both answers and what each one buys.** Not "this is a problem" — say
which two decisions are in the room and what each was for. The client made both
for a reason and usually remembers only one of them.

**Bring the softening plan in the same breath.** A conflict raised without
options is a complaint. Two or three concrete moves, with what each costs,
turns it into a decision.

**Never soften silently.** Adjusting a value to make a conflict disappear, and
not saying so, is the worst available outcome: the client believes they got what
they asked for, the document records something else, and the next person reads
the adjustment as the original intent.

**Distinguish "different" from "conflicting".** Most answers that fight the
suggested one are simply another valid product, and those get recorded and left
alone. Only raise a conflict where the result would be visually incoherent or
would not build. Warning about mere difference teaches the client to ignore
warnings, and then the real one arrives in the same tone.

**Leave it open.** After the plan is on the table, the client may still choose
the thing that conflicts. That is allowed. It becomes a deviation with its
reason, and — where it costs something concrete — the cost is written down too.

---

## The recurring ones

### The accent cannot carry a solid fill

The commonest physical conflict, and it surfaces late: the palette derives, and
then `check-contrast()` fails at the end.

**Why it happens:** the colour a client hands over is very often a *print* or
*logo* colour that was never measured against text. Mid-lightness saturated hues
— many reds, greens and oranges — sit too dark for dark ink and too light for
white at AA.

| softening move | what it keeps | what it costs |
|---|---|---|
| move the accent's lightness, keep hue and chroma | the hue, which is what people recognise | the exact brand value; usually invisible side by side |
| use the accent as ink and border only; the action takes a neutral fill | the exact colour | the primary action stops being a colour, and the school leans on weight |
| two steps: a darker derived step fills, the true colour appears in bands and illustration | both | one more decision to keep straight |
| drop to AA from AAA | the colour | an accessibility commitment; only the client can spend that |

**Never lower the threshold quietly to make a colour fit.** If it is the right
move it is the client's to make, and it belongs in the document.

### Monochrome, and a palette of five colours

The conflict the notes singled out, and the interesting thing is that it is
usually a mislabelled school rather than a real contradiction.

**First, re-ask the decider from question 11b:** *"when something is CHOSEN — a
selected tab, a ticked checkbox — does it take one of these colours, or always
the same one?"* A client who answers "one of these, depending" described
`functional` and called it monochrome, because monochrome is the word in the
air. That is not a conflict; that is the school being wrong, and it is cheap to
fix now.

If the school really is monochrome:

| softening move | what it keeps |
|---|---|
| one colour becomes the accent; the rest live in layer 1 for illustration, charts and marketing surfaces — never as interface tokens | the palette exists, and the interface stays monochrome |
| the interface is monochrome; a marketing or hero surface gets a context that admits the others | both, with a boundary a reader can see |
| the extra colours become the status family, adapted | the colours do work, at the cost of them meaning something specific |

**The move that does not work** is spreading the palette across `action`,
`selected` and `link`. That is `functional` wearing monochrome's name, and
`check-roles()` will not warn, because the school told it not to.

### Loud, and monochrome

Coherent — Spotify is exactly this — and expensive. One colour carries all the
emphasis, so everything else has to go **quieter** to compensate, not louder.

Say it as a consequence rather than a problem: badges quiet, secondary neutral,
dividers subtle, and the accent reserved harder than in any other combination.
If the client also wants prominent badges, that is the real conflict.

### Loud, and functional

Harder than loud plus monochrome, and for the opposite reason. `functional`
puts several hues on one screen and only works because every one of them is
desaturated at rest — Atlassian and Polaris look restrained *because* they use
more colours, not despite it. `loud` raises them all, and several saturated hues
competing produces no focal point at all.

**Softening:** keep the status family at full strength, since an error that does
not alarm has failed at its one job, and derive everything else — badges,
selection, secondary actions, tinted rows — as if the posture were `quiet`. The
result still reads as loud, because the four colours that matter are loud and
nothing else competes with them.

### Loud, and exposed

The hardest pair in the system. A screen showing everything at once manages
noise by lowering the contrast of everything at rest; `loud` raises it. Together
they produce a screen with no focal point — the failure mode that reads as
"busy" and gets blamed on the amount of content.

**Softening:** keep `loud` for the single primary action per view and derive
everything else as if the posture were `balanced`. Record it, because it looks
like an inconsistency to anyone reading the front matter later.

### Monochrome, and categorical data

A chart comparing five categories needs five distinguishable hues. The school
has one. This is a real conflict rather than a preference, and it arrives late —
usually when the first dashboard is designed, long after the palette was agreed.

| softening move | what it keeps |
|---|---|
| a neutral ramp when the data is ORDERED — intensity, volume, time | the school intact; works for heatmaps and single series |
| one accent for the series that matters and neutrals for the rest | the school, and the chart says which series is the point |
| an admitted chart palette, held in layer 1 and never as interface tokens | real comparison, with a boundary a reader can see |
| the comparison happens in a table | the school, at the cost of the chart |

**The move that does not work** is generating five tints of the accent. They are
the same hue at different lightness, which is exactly what the eye reads as an
ordered scale — so a categorical chart drawn that way implies a ranking that is
not in the data.

### Generous density, and dense data

A table of twenty columns does not fit a generous scale. This one usually means
question 5 was answered for the marketing pages and the product is a tool.

**Softening:** density is per-region rather than global. `--app-space-unit` is a
custom property, so a data region can compact its own subtree without a second
set of tokens — that is what it was built for. Record which regions are dense.

### Borders elevation, and a request for shadows

`elevation: borders` says tone and line carry hierarchy. A later request for a
card shadow is spending the decision twice, and the result separates the same
page two ways.

**Softening:** shadows stay for what genuinely floats — a modal, a dropdown —
which `shadow-overlay` already covers. If the client wants resting cards to
lift, that is `elevation` changing, and it changes coherently everywhere rather
than on one component.

### AAA, and brand-adapted status colours

Adapted status colours lower chroma to stop them competing. At 7:1 there is
little room left: a muted amber cannot carry dark ink and a light fill at once.

**Softening:** keep AAA for body text and hold status *fills* to AA with AAA
ink, or keep the status family at traditional strength and adapt only where it
is decoration rather than a signal. Both are choices worth writing down.

### Mobile-first, and tabs

Tabs sit where the header already is. Not a contradiction, but it needs an
answer for the small viewport before it reaches the ledger — stacked sections,
an accordion, or a select.

---

## What goes in the read-back

Every conflict that was raised, with what was chosen and why. Even the ones
resolved in one exchange:

> `accentContrast` could not be measured at AA against either ink. Moved the
> accent's lightness two steps and kept the hue — the alternative was a neutral
> primary button, which you rejected.

A conflict that was raised and resolved leaves no trace in the front matter, and
without this line the next reader sees a value that looks arbitrary and
"corrects" it back to the one that fails.

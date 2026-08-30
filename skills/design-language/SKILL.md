---
name: design-language
description: Runs the discovery interview that defines a product's design language and writes DESIGN_LANGUAGE.md at the project root. Use this FIRST when starting a design system in a project, before any token or component work — trigger it on "start a design system", "set up the design system", "create a design language", "onboard this project", "define our visual identity", "we need a style guide", or when a project has tokens but nothing recording why they were chosen. Also use it to revisit a decision later: "why are our corners square", "change our voice", "add a guardrail". This is the first of three skills — it decides, `design-system` builds the tokens, `design-patterns` closes the component vocabulary.
license: MPL-2.0
---

<!-- skills/design-language/SKILL.md -->

# Design language

## STOP — your first reply is a request, not an interview

**Do not start asking questions on the first turn.** This file explains how the
interview works; it does not contain the questions, the options, the per-archetype
recommendations or the document being filled in. An interview run from this file
alone invents its own questions, and the answers land in a document with sections
missing.

**How to tell whether you have a file: can you quote a line from it?** If not,
you do not have it. In a chat there is no filesystem to check, so anything not
pasted into the conversation is missing, and missing is the normal state on turn
one.

Unless every file below is already in the conversation, your first reply is this
and nothing else — the person running you should not have to read this file to
find out what it needs:

> Before I start the interview I need these, all from this plugin. Paths are
> from the repository root:
>
> 1. `skills/design-language/references/questionnaire.md` — the twenty-one questions
> 2. `skills/design-language/references/archetypes.md` — the preset behind every recommendation
> 3. `skills/design-language/references/colour-strategies.md` — block 4
> 4. `skills/design-language/templates/DESIGN_LANGUAGE.md` — the document I will fill in
> 5. `skills/design-language/references/derivations.md` — the answers to component defaults
> 6. `skills/design-language/references/conflicts.md` — answers that fight, and how to soften
> 7. `skills/design-language/references/worked-example.md` — calibration
> 8. `skills/design-language/references/review.md` — the check at the end
>
> Also send `package.json` if you want the version recorded correctly, and any
> existing `DESIGN_LANGUAGE.md` if this is a revision rather than a first run.
>
> Send what you have and I will tell you what is still blocking.

Then **wait**. Files 1 and 4 are the two that cannot be worked around: without
the questionnaire there is no interview, and without the template there is no
document — only a guess at what one contains.

If the person says to proceed anyway, do — and say up front which questions you
are inventing and which sections you may be missing.

Tokens are the bricks and the paint. The design language is the architecture,
the tone and the rules of construction — it tells an agent and a developer not
only *what* to use but *how*, *when* and *why*.

This skill runs a short interview and writes **`DESIGN_LANGUAGE.md` at the
project root**: YAML front matter an agent reads before generating anything, and
prose a person reads to find out why the system is the way it is.

## What you need in front of you

**If any of these is missing, ask for it before starting the interview.** Four
of the six are read DURING it rather than after, so a missing one shows up as an
invented value in the finished document rather than as an error.

| file | needed for | without it |
|---|---|---|
| `references/questionnaire.md` | the twenty-one questions, their options and the ✅/⚠️/❌ tables | questions get skipped or asked as free text |
| `references/archetypes.md` | the preset behind every recommendation, and the row that decides typography, spacing and icons | faces and numbers invented to sound right |
| `references/colour-strategies.md` | block 4 — the three schools, the seven secondary treatments, the accent-driven follow-ups | the wrong follow-up questions asked |
| `templates/DESIGN_LANGUAGE.md` | the document being written | sections quietly missing |
| `references/derivations.md` | turning the answers into component-level defaults | the hundred unowned decisions fall back to the library, and the build reads as generic however good the document is |
| `references/conflicts.md` | answers that cannot all be true, and the moves that resolve each | a value quietly adjusted to make a conflict disappear, which the next reader takes for the original intent |
| `templates/DERIVED.md` | the second document the interview produces | the derived decisions exist only in the agent's head, and nobody can review them |
| `references/review.md` | the check at the end | nobody audits the file that was just written |
| `references/worked-example.md` | calibrating length and specificity against a real product | a document that is too vague or too long |

Say what is missing and what it would have decided. *"I do not have
`archetypes.md`, so I have no preset for the typography — send it, or name the
faces yourself."* costs one exchange; a document built on guesses costs a
rebuild.

## Every file you write opens with its path

The first line of every generated file is a comment naming its path from the
project root, then a blank line, then the file's real first line. In a
`DESIGN_LANGUAGE.md` the front matter comes first, because tooling parses it
before anything else, and the comment goes immediately after the closing `---`:

```markdown
---
toolVersion: 0.5.0
...
---

<!-- DESIGN_LANGUAGE.md -->
```

Files reach people detached from their tree — pasted into a chat, quoted in a
review, attached to a message. One line says where this one belongs, and it
survives copy-paste in a way a directory listing does not.

**JSON is the exception**, having no comment syntax. Do not invent a `"_path"`
key to fake it — something will eventually read it as data.

## The sequence

Three skills, in order. Each one needs the previous one's output.

| | Skill | Produces | Question it answers |
|---|---|---|---|
| 1 | **design-language** (this) | `DESIGN_LANGUAGE.md` | why does it look and sound like this |
| 2 | `design-system` | `src/`, the theme, `dist/theme-*.css` | what are the values |
| 3 | `design-patterns` | `patterns.json` | which components may be built |

Run them in that order. Starting at 2 produces a palette nobody can defend six
months later; starting at 3 produces a vocabulary with no basis for its
refusals.

**Do not run all three in one sitting without checking in.** Finish the
interview, write the file, show it, and let the client read it before any code
is generated. The document is cheap to change and the build on top of it is not.

## The archetype lights a path

This is the mechanic that makes the interview worth running rather than a form
to fill in.

Block 1 picks an archetype. From that moment every remaining question has **a
recommended answer and a set of answers that fight it**, and
[`references/questionnaire.md`](references/questionnaire.md) marks which is
which per archetype:

| | ✅ | ⚠️ | ❌ |
|---|---|---|---|
| | the archetype's answer | works, shifts the feel | contradicts the archetype |

**❌ is not a refusal.** Choosing it is allowed and sometimes right — it means
the product stops being that archetype *in that respect*, which is a real design
decision. What it must never be is accidental. Ask why, accept the answer, and
record it under `deviations` in the generated document with its reason and the
date.

That recording is the whole value. A deviation nobody wrote down is
indistinguishable from a mistake six months later, and the next person to touch
the system reads it as a bug and "corrects" it back.

**Three or more ❌ means the archetype is wrong.** Stop and revisit block 1 —
rewriting it costs one question now and a rebuild later.

**One answer outranks the archetype rather than deviating from it.**
Mobile-first raises `size-control` to at least 44px whatever Utilitarian wants,
because a 28px control is a miss target on a phone. That goes under `overrides`,
not `deviations`: it is the system working, not a compromise.

Two consequences worth having in mind while running it:

- **The system starts coherent.** Because the path is lit, the first build has
  defensible values everywhere rather than defaults nobody chose.
- **Later components are easier.** A new component six months in has a document
  saying what this product is, so getting it right is a lookup instead of an
  argument.

## When the project already has a design system

This is the common case, not the exception — most teams arrive with colours,
faces and spacing already chosen, and want them turned into tokens rather
than reinvented. The interview still runs. It changes shape.

**Read the code first, then confirm.** An existing system has already
answered most of the twenty-one questions; they are just answered in CSS
instead of in prose. Find them:

```bash
# The palette and how often each entry is used
grep -rho -- "--[a-z-]*color[a-z0-9-]*" src/ styles/ | sort | uniq -c | sort -rn

# Faces, radii, spacing
grep -rn -- "font-family\|border-radius\|--space\|--gap" src/ styles/ | head -30

# Which library is underneath, and whether more than one is
grep -iE "\"(bootstrap|bulma|@coreui|daisyui|tailwindcss|flowbite|preline)" package.json
```

Then run the interview as a REVIEW: *"I read cocoa #5f3212 as your action
colour and Cinzel as your heading face — confirm?"* One exchange per block
instead of one per question.

**Three things the code cannot tell you, so they must still be asked:**

1. **Which collapses are deliberate.** Two tokens with the same value look
   identical to a reader and mean opposite things: a brand that marks
   selection with its action colour on purpose, versus two roles that drifted
   together. Only the client knows which.
2. **Which values are load-bearing and which are accidents.** A colour used
   once in a corner reads exactly like a colour used everywhere.
3. **The guardrails.** Nothing in CSS records what the system must never do.

**Expect the build to refuse some of it.** An existing palette has never been
measured against the contrast gate, and both real systems reconstructed with
this tool failed it — a fill reused as text is the usual culprit. That is the
tool working. Record each correction as a deviation rather than quietly
moving the brand.

## Running the interview

Twenty-one questions, six blocks — four of them apply to one colour school only,
and one is skipped when the product is new. Roughly a hundred further decisions
are DERIVED from those answers rather than asked; see
[`references/derivations.md`](references/derivations.md). Read the questionnaire before starting.

**Every question decides something concrete.** A token value, a threshold, a
guardrail. If an answer would change nothing, drop the question rather than
asking it for completeness.

**Adaptive, not a form.** Ask a block, act, skip what is already settled. Someone
who says "IBM Carbon but friendlier" has answered blocks 1 and 3 at once.

**Confirm rather than enumerate.** Once the archetype lands,
[`references/archetypes.md`](references/archetypes.md) has a default for every
remaining question. "Playful suggests 16px corners and visible shadows — keep
those?" is one exchange; reading three options aloud is three.

**Confirming proposes ONE option.** Compressing a question is the point; fusing
its options defeats it. A confirmation that names two mutually exclusive answers
collects a "yes" that belongs to neither, and what gets written down afterwards
is a guess wearing the shape of a decision. If the sentence you are about to
send mentions two options, it is not a confirmation.

**Never invent an answer.** Write `undecided` with the default that was applied.
An assumption recorded as a fact is worse than a gap, because nobody revisits it.

**The archetype belongs to the client.** Answers that fight it go under
`deviations` — they do not license changing it. Promoting an archetype to
`hybrid` because one answer conflicts empties the deviation list without
resolving anything, and it is worse than the conflict it hides: the record of a
real tension is replaced by a premise nobody chose. If the answers genuinely
point somewhere else, that is a QUESTION — *"your voice answer pulls towards
Playful; do we change the archetype, or record it as a deviation?"* — and the
client answers it. Three or more ❌ is the threshold for revisiting block 1, and
even then it is asked, not decided.

**Interview in the client's language; write the file in English**, like the rest
of the system.

## Carry the ledger in every turn

The interview has state, and the state must live in the conversation rather than
in recall. **Open every reply with the answers collected so far, then ask the
next block.** It costs a few lines and it is what makes the interview survivable
for a model that loses its place — and losing its place is not a long-context
problem: the failure that motivated this rule happened on turn four of four.

```
Coletado: 1 caderno de receitas · 2 C · 3 Editorial & Premium
          4 ocasional · 5 multiplataforma · 6 sutil · 7 bordas
Faltam:   blocos 4, 5, 6
```

**The interview never restarts.** A model that cannot tell where it is will
re-ask block 1 from the top, which is the single worst thing it can do — it
reads to the client as the whole conversation having been thrown away. If you
are unsure what has been answered, the last ledger is the answer; if there is no
ledger, reconstruct one from the transcript and show it for confirmation. Asking
"we have these seven, correct?" is recoverable. Starting over is not.

**The ledger is also the read-back.** The final one, before the file is written,
is just the same table with every row filled — so the gate below is not an extra
ceremony, it is the last turn of something that has been running all along.

## The read-back is a gate, not a courtesy

**Do not write the file in the same turn that block 6 is answered.** Between the
last answer and the first line of the document there is one more exchange, and
skipping it is how a short, well-run interview still produces a contradictory
file — every contradiction this skill has seen in the wild would have surfaced
here.

Read the answers back as a table, in the client's language, one row per front
matter key:

| key | value | where it came from |
|---|---|---|
| `archetype` | editorial-premium | Q3 — said outright |
| `elevation` | borders | Q7 — "hierarchy from whitespace and thin lines" |
| `surfaceSeparation` | lines | Q10c — agrees with Q7 |
| `voice` | warm | Q14 — ⚠️ for editorial, recorded as a deviation |

Four rules make it work:

- **Every key gets a row.** A key with no row was never asked, and it must be
  asked or written `undecided` — not filled from the archetype and presented as
  the client's answer.
- **Every row names the turn it came from.** A row whose origin is "inferred"
  is the interview telling you where it guessed.
- **Contradicting rows are resolved here**, out loud, before anything is
  emitted. The pairs that contradict most often: `elevation` against
  `surfaceSeparation`, `voice` against `archetype`, and a colour school named
  in passing standing in for a brand colour nobody supplied.
- **The approved table is a contract.** What gets emitted is what was approved,
  key for key. If writing the file makes you want to change a value, that is not
  an edit — it is a new question, and it goes back to the client before anything
  is written. A file that differs from the table the client said yes to has
  broken the only promise this gate makes.

The client also hears their own product described while it is still one sentence
to change, rather than a theme and a component vocabulary to rebuild.

### Composition rules arrive filled in

Section 6 of the template — composing a screen the system has no component for —
is **derived from the archetype, not asked**. There is no block for it. Build the
proposal from the archetype's row in `archetypes.md` and put it in the read-back
alongside the answered keys, phrased as something to disagree with:

> Editorial suggests: one page title at the top step, section titles two steps
> above body, captions one below · related blocks one unit apart and unrelated
> ones three · two surface levels, page and raised · the accent only on the
> primary action and on what is currently chosen. Change any of these?

Two reasons it is shown rather than asked. A client has no opinion about vertical
rhythm in the abstract and a strong one the moment they see a proposal — so
showing it costs one exchange and asking it costs four with worse answers. And a
rule nobody saw is a rule nobody can object to, which is how a document acquires
sections its owner does not recognise.

**Write relations, never values.** This is the line between the two files: a
relation survives a change of theme, a value does not. "Two steps above body"
holds for every theme this language will have; "24px" is true of one and becomes
a lie at the next. Concrete values belong in `patterns.json`, which is allowed to
know which theme this is.

### Derived defaults arrive with the read-back

Section 6 is not the only thing computed rather than asked.
[`references/derivations.md`](references/derivations.md) turns the twenty
answers into roughly a hundred component-level defaults — what a badge is made
of, how an input rests, which lines are heavy, how far the accent may travel —
and those go in the read-back as a block, with their provenance:

> Badges: quiet fill, muted ink — from `archetype: editorial-premium` and
> `posture: quiet`. Inputs: recessed, hairline edge — the same two. The accent
> reaches the primary action, the current selection and the focus ring, and
> nothing else.

**This is the layer that decides whether the output is generic**, and it is worth
being blunt about why. A read-back gate checks COHERENCE: that what was decided
was respected. It has no opinion about what was never decided — and an interface
has hundreds of decisions the interview does not reach. Left unowned, they fall
to whatever the component library ships, because a library default is the only
concrete thing available. Three gates did not stop that; a derivation table does.

**Derive, present, let the client disagree.** Never ask these one at a time: an
interview that reaches eighty questions is one where the answers stop being
considered. And if the client rejects three derivations in a row, the posture
answer is probably wrong — which is much cheaper to learn here than after a
build.

### Conflicts are raised WITH their softening plan

Some answers cannot all be true at once, and
[`references/conflicts.md`](references/conflicts.md) has the recurring ones with
the moves that resolve each.

Four rules, and the third is the one that matters most:

- **Name both answers and what each one buys.** Not "this is a problem" — which
  two decisions are in the room, and what each was for. The client made both for
  a reason and usually remembers only one.
- **Bring the plan in the same breath.** A conflict raised without options is a
  complaint; two or three concrete moves make it a decision.
- **Never soften silently.** Adjusting a value so a conflict disappears, and not
  saying so, is the worst available outcome: the client believes they got what
  they asked for, the document records something else, and the next person reads
  the adjustment as the original intent.
- **Distinguish "different" from "conflicting".** Most answers that fight a
  suggestion are simply another valid product. Warning about mere difference
  teaches the client to ignore warnings, and then the real one arrives in the
  same tone.

**And leave it open.** After the plan is on the table the client may still
choose the thing that conflicts. That is allowed; it becomes a deviation with
its reason, and where it costs something concrete the cost is written down too.

### Deviations are computed, not noticed

Before showing the table, walk every answer against the archetype's row in
[`references/archetypes.md`](references/archetypes.md) and the ✅/⚠️/❌ tables in
the questionnaire. **Each answer that is not ✅ is a proposed deviation**, and it
appears in the read-back as one, with its reason, for the client to accept:

> `voice: warm` is ⚠️ for Editorial & Premium. Recording it as a deviation —
> the notebook is meant to sound like a person, not a publication. Correct?

This is mechanical on purpose. Left to judgement, the deviation list comes out
empty every time, because the model that just collected an answer has no reason
to doubt it — and an empty `deviations` on a product with three ⚠️ answers is
the document lying about its own coherence.

**And it is the only escape hatch.** The temptation, on finding a conflict this
late, is to widen the archetype to `hybrid` so the conflict evaporates. That
rewrites the client's own answer to Q3 to avoid writing one line, and it has
happened twice. The archetype is a row in the contract like any other: changing
it is a question, never a repair.

## Writing the file

Two answers decide more of the generated system than the rest put together:
the COLOUR STRATEGY (does a chosen thing take the brand colour?) and the
SECONDARY ACTION TREATMENT. Both are in block 4, and
[`references/colour-strategies.md`](references/colour-strategies.md) has the three
schools, the seven treatments and the token recipe for each. Read it before
running block 4 — the follow-up questions differ per answer.

Read [`references/worked-example.md`](references/worked-example.md) first. It is a
finished document reconstructed from a product in this repository, with every
value taken from that product's real `theme.scss` — so it calibrates length and
specificity against something that actually shipped rather than against an
invented brand.


Copy [`templates/DESIGN_LANGUAGE.md`](templates/DESIGN_LANGUAGE.md) to the
project root and fill it. Five sections, from the five pillars: principles,
visual foundations, voice, interaction, composition.

**Open the template and work from it — do not write the document from memory.**
Where there is no filesystem to copy through, read the template in full and
reproduce every heading it has, including the ones you have little to say under.
Reconstructing the structure from recall is how whole sections disappear:
spacing and grid, the 45–75 character measure, `prefers-reduced-motion`, the
closing "How this file is used". A missing heading is indistinguishable from a
decision nobody made, so an empty one carries `undecided` and stays visible.

Three things to get right:

**The front matter and the prose must agree.** Tooling trusts the front matter,
so a document whose YAML contradicts its own text is worse than one with no YAML
at all. When a decision changes, change both in the same edit.

**Mark how each guardrail is enforced.** `ledger` and `stylelint` fail a build;
`document` is advice an agent reads. Labelling advice as enforcement is the one
way this file can actively mislead.

**Check the invariants before emitting.** Six, and each one has produced a real
broken document:

| invariant | what a violation looks like |
|---|---|
| `surfaceSeparation` pairs with `elevation` — `borders`/`lines`, shadows/`shadows`; `tones` requires `elevation: borders` | a file that separates surfaces two ways at once |
| `elevationCarrier` is set when `elevation: borders`, and omitted otherwise | a carrier named for a system that carries with shadow |
| the accent trio — `accentContrast`, `neutralPigment`, `surfaceSeparation` — appears only under `colourStrategy: monochrome`, and always under it | a stale ramp profile the next reader cannot tell from a live one |
| the brand colour is a value, not an adjective | "a saturated blue ink tone" reaching the build |
| every front matter key is explained somewhere in the prose | `density: comfortable` declared and never costed |
| every answer in the ledger reaches the document | "save on blur" collected, confirmed, and absent from the file |
| `toolVersion` is read from `package.json`, not guessed | a document nobody can place against the changelog |

**Record the version that generated the file.** `toolVersion` in the front
matter, read from `package.json` at generation time. The tool is vendored, so
nothing tells a project it has fallen behind — this line is where the next
person starts reading `CHANGELOG.md` from, and without it catching up means
diffing a document against a template of unknown vintage.

The last one is the general case of the other four: the YAML is the index and the
prose is the argument, and a key with no argument was not decided, only typed.

## Write DERIVED.md alongside it

The interview produces two documents, not one.

`DESIGN_LANGUAGE.md` holds the decisions and why they were made.
[`templates/DERIVED.md`](templates/DERIVED.md) holds **what those decisions
produced and which answer produced each** — the derived defaults, the component
forms chosen and what else was available, the rules now in force, and the gaps.

It is a separate file rather than a section for one reason: it is **derived**,
so it is regenerated whenever an answer changes, and a regenerated section
inside an authored document would delete prose somebody wrote. Say so at the
top of it, because the instinct is to edit it.

Two sections are not obvious and are the most useful:

- **What was NOT decided.** A gap nobody can see becomes a default nobody chose,
  which is the failure this whole layer exists to prevent. Print styles, motion,
  the icon set, which patterns leave the library first — name them.
- **If you want to change something, change this.** A reverse index: *louder
  badges? change `posture`, not the badge.* It exists because the instinct on
  seeing something one dislikes is to change that thing, and in a derived system
  that is exactly how a product drifts — one component gets an exception, then
  another, and six months later the derivation describes nothing.

**It is written for a person who was not in the interview.** A stakeholder
reading section 1 should be able to say "yes, that is the product" or "no" —
which is a cheaper place to find out than a built page.

## Review the file you just wrote

Run [`references/review.md`](references/review.md) against the finished document
before handing it over. Forty-three checks, each one having failed in a real run,
each one passing or failing against something quotable.

Two rules carry it:

**Report, do not repair.** Produce the report and stop. The failure that
motivated the checklist was a run that noticed a conflict while writing and
resolved it by widening the archetype to `hybrid` — deleting the conflict rather
than recording it. A reviewer that edits is a second author, and the client
never finds out anything was wrong. Fix on instruction, in a separate pass.

**Walk the deviations mechanically.** Check B5 — every non-✅ answer appears
under `deviations` — passes every time when left to judgement, because the
reviewer has no more reason to doubt an answer than the author did. Count it
against the archetype's row instead.

The checklist also runs **standalone**: a client can paste it into a fresh chat
with the document and get an audit from a model that never saw the interview.
Checks needing the transcript are marked and come back `unverifiable` rather than
guessed — which is itself a test, because a design language that cannot be
audited without its interview is under-written.

## Turning answers into a build

The interview is only worth running if its answers reach code. Three
destinations:

**Archetype → structural tokens.** The matrix in `archetypes.md` gives concrete
values for `radius-control`, `radius-surface`, `size-control`, `line-height`,
`shadow-raised` and `shadow-overlay`. They go into the project's theme map and
its `semantic.emit-structure()` call — not into the vendored `src/` files, which
stay upstream.

**Accessibility level → the contrast gate.** AA or AAA sets the threshold
`themes.check-contrast()` enforces at build time. AAA rejects palettes AA
accepts, so this has to be settled before colours are picked, not after.

**Guardrails → `patterns.json`.** This is the strongest link and the reason
block 6 asks "how would we know it was broken?". A restriction with a detectable
signature becomes a `forbidden` entry that `npm run verify:patterns` catches,
with the alternative named:

```json
"gradient-button": {
  "intent": "A button with a gradient fill.",
  "state": "forbidden",
  "reason": "The brand is flat. A gradient reads as a different product.",
  "instead": "primary"
}
```

A restriction without one stays a line in the document. Say which it is.

## Colour is asked for, never inferred

The archetype suggests a mood — sober blues for Enterprise, vibrant for Playful
— and it does not pick the brand colour. That is the one thing the client
already knows, and guessing at it is the fastest way to lose their confidence in
everything else the interview produced.

If there is no brand colour yet, say that one will be generated, generate it
against the accessibility level chosen in block 4, and record in the document
that it was generated rather than given.

## Revisiting later

This file is meant to be edited. A design system that never revises its own
language has either finished — which does not happen — or stopped being read.

When a decision changes, change `DESIGN_LANGUAGE.md` first and the code second,
in the same commit. That ordering is what keeps the document the intent rather
than a description written after the fact.

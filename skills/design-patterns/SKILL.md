---
name: design-patterns
description: The pattern ledger that decides which component variants a project is allowed to use, and what markup to emit for each. Use this skill before writing or editing any component markup — a button, a card, a badge, a form control — in HTML, JSX, TSX, Vue, Svelte or any template. Trigger it when asked to "add a button", "make this a secondary action", "use the outline style", "add a green save button", "review this component", "why is this class not allowed", or whenever a diff introduces a library class like `btn-*`. Also use it to check existing code against the vocabulary, to promote a pattern from library classes to a semantic class or a component wrapper, and to report how mature the design system is. This is the markup-side companion to the `design-system` skill, which governs CSS tokens.
license: MPL-2.0
---

<!-- skills/design-patterns/SKILL.md -->

# Design Patterns

## STOP — the ledger is the project's, and you probably do not have it

**Do not emit markup, and do not invent a vocabulary.** This skill ships no
component list on purpose: which button variants a product allows is that
product's decision, and a tool that shipped an answer would be wrong for most of
them. Without the project's ledger there is nothing here to enforce.

**How to tell whether you have a file: can you quote a line from it?** If not,
you do not have it. In a chat there is no filesystem to check.

Unless these are already in the conversation, your first reply is this and
nothing else:

> Before I write any markup I need these. Paths are from the repository root:
>
> **From the project**
> 1. `patterns/patterns.json` — the ledger. If the project has none, say so and
>    I will start one from the template instead.
> 2. `DESIGN_LANGUAGE.md` — its `guardrails` are where several `forbidden`
>    entries come from
>
> **From this plugin**
> 3. `skills/design-patterns/references/worked-example.md` — a real ledger; the
>    template is empty on purpose and shows the shape of nothing
> 4. `skills/design-patterns/references/component-forms.md` — the shapes each
>    component can take, and the answers each one fits
> 5. `skills/design-patterns/references/layout-forms.md` — the same for pages
> 6. `skills/design-patterns/references/never-offered.md` — what this tool does
>    not propose, and what to reach for instead
> 7. `patterns/patterns.schema.json`
> 8. `patterns/patterns.template.json` — only if we are starting a ledger
> 9. `skills/design-patterns/references/review.md` — send it at the end
>
> Also tell me **which library the project uses**, if the ledger does not say —
> the design language does not record it.
>
> Send what you have and I will tell you what is still blocking.

Then **wait**. The ledger is the one that cannot be worked around: reconstructing
it from a library's documentation produces the opposite of this skill's purpose —
every variant the library offers, instead of the handful the product chose.

**Third of three skills**, after `design-language` and `design-system`. The
guardrails in `DESIGN_LANGUAGE.md` are where several `forbidden` entries come
from: a restriction the interview recorded with a detectable signature belongs
in the ledger, where the build catches it, rather than in a document nobody
runs.

The ledger lives **in the project**, normally at `patterns/patterns.json`. Read
it before emitting component markup. It is small, and reading it is not
optional: it is the only place that records what this project has decided to
allow.

This plugin ships no vocabulary — only `patterns/patterns.template.json`, which
is empty, plus the schema and the verifier. Which button variants a product
allows is the product's decision, and a tool that shipped an answer would be
wrong for most of them.

[`references/worked-example.md`](references/worked-example.md) is a real one,
commented, and reading it is the difference between a ledger with the right
shape and one invented from the schema. Two more live in `example/` —
`ds-hot-tone-bootstrap-phase1` and `ds-cyberpunk-bulma-phase2`. They disagree
with each other on purpose.

When the ledger is finished, check it against
[`references/review.md`](references/review.md): thirty-six checks the verifier
cannot make, because it reads markup and not the ledger as a document.

## The adequate present, and a mapped future

A ledger records two things about every pattern: `state` is where it is today,
and `trajectory` is where it is going and what moves it.

That second field exists because of a real misreading. A vocabulary at 100%
`raw` is, in that moment, a library theme — `raw` means emit the library's
classes, so the shape is the library's and only the colour is the product's.
The conclusion people draw is that promotion should be forced up front. It
should not: a first version that rewrites eight components has spent its budget
on shapes nobody has argued about yet.

**The difference between a starting point and a resting point is whether the
next move is written down.** A `raw` with a trajectory is the first; a `raw`
without one is the second, and it looks identical in the JSON.

```json
"trajectory": {
  "to": "own",
  "when": "the first filter chip — the moment a label has to become interactive",
  "why": "the library badge is a label and cannot carry a selected state",
  "form": "removable chip",
  "blocked": "no chip pattern exists yet; adding one is a ledger change"
}
```

Four things make it useful rather than aspirational:

- **`when` is a TRIGGER, not a date.** "The first screen that needs a filter
  chip" is something a person recognises when it arrives. A date is a wish.
- **`why` names what the current state COSTS.** If nothing is lost by staying
  where it is, the pattern does not need a trajectory — and recording that it
  was considered is worth more than an empty plan.
- **`blocked` admits a pending implementation** rather than omitting it. Silence
  looks like nobody thought of it.
- **`forbidden` is a legitimate destination.** A variant kept alive only until
  the thing replacing it exists is a plan, not a contradiction.

`npm run verify:patterns` prints these under **Planned**, beside the maturity
report, because a trajectory nobody sees is a comment.

**Two axes, and confusing them is how this field got proposed wrongly the first
time.** The VOCABULARY improves by getting shorter — fewer ways to say
"secondary". The FORM improves by climbing — raw to styled to own. They are
measured separately and a ledger can be excellent at one and poor at the other.

## What this exists to do

A component library offers hundreds of button variants. A design system is the
decision about which handful a product actually uses. Those are opposite jobs,
and the second one is the one that fails silently — nobody notices a vocabulary
growing until it has five ways to say "secondary".

So the measure of success here is **the allowed list getting shorter over
time**, not longer. When asked to add a pattern, the default answer is to point
at the existing one that covers it. Adding is the exception and needs a reason
recorded in `intent`.

The library is scaffolding. It holds the building up early, shows through
everywhere, and comes down as the structure sets. It is not hidden — it is
fenced.

## Emitting markup

Find the component, then the pattern, then read `state` and do exactly what it
says:

| `state` | Emit |
|---|---|
| `raw` | the library classes from `raw.<library>` |
| `styled` | the single class in `styled` — never the library classes as well |
| `wrapped` | the component in `wrapped`, with its props |
| `forbidden` | nothing. Refuse, give `reason`, offer `instead`. |

Modifiers combine with any pattern: append the classes from
`modifiers.<axis>.options.<option>.libraries.<library>`. An option whose class
list is empty is the default and adds nothing — do not invent a class for it.

Never compose a variant the ledger does not list. `btn-outline-danger` is not
"danger with outline"; it is a combination nobody decided on. If the request
genuinely needs it, that is a ledger change, discussed first.

**Read `dos`, `donts` and `responsive` before emitting, not after.** `state`
says what classes to write; these three say whether this pattern was the right
one at all — *"tabs only on desktop; below the tablet breakpoint this becomes an
accordion"* is the kind of rule no verifier can catch and every product has.

They live here rather than in a README beside the component for one reason:
**this is the file that gets read at the moment markup is written.** A markdown
file in the component's folder is a display case — real, useful for a person
browsing, and never open when it would have mattered. Generate that file from
this one if you want it; do not maintain it in parallel.

A `dont` with a detectable signature does not belong in `donts`. It belongs in a
`forbidden` pattern, or in stylelint — somewhere that fails a build instead of
waiting to be read. `donts` is for the rest.

## Composing a screen with no component

Most screens are not built from this list. Someone needs a page the ledger has
never heard of, reaches for raw markup, uses the correct tokens, and still ships
something that does not look like the product — because tokens are the paint and
this is the grammar.

The optional top-level **`composition`** block holds it: `typeRoles` mapping
content roles to type steps, `rhythm` for the gaps, `surfaces` for the levels
this product allows, `accentBudget` for where the accent may appear.

**The same subject is split across two files, and the split is the point.**

| | holds | example |
|---|---|---|
| `DESIGN_LANGUAGE.md` §6 | relations, which survive a change of theme | "a section title is two steps above body" |
| `composition` here | bindings, which are true of THIS theme | `sectionTitle: text-2xl` |

One design language can have several token themes. A value that is true of one
theme cannot live in the document that outlives it — that is what makes the
language reusable and this ledger specific. When the two disagree, the language
is the intent and this file is the thing to fix.

## Refusing

A refusal is only useful with an alternative, which is why the schema requires
`instead` on every forbidden entry. Say what was asked for, why it is not in the
vocabulary, and what to use — in one short paragraph, without lecturing:

> `btn-success` is not in this project's vocabulary. The ledger's reason: status
> colours report an outcome and a button proposes an action that has not
> happened yet, so a green Save reads as "saved". Use `primary`.

Quote the project's recorded `reason`. Do not invent one, and do not substitute
your own view of good practice — the ledger is the authority on this product,
and a refusal justified by something it does not say is unenforceable.

If the user reaffirms the request after hearing the reason, that is their
decision. Do not refuse twice. Make the change to `patterns.json` — moving the
entry out of `forbidden` with an honest `intent` — so the vocabulary and the
code stay in agreement. A rule that gets bypassed in markup is worse than no
rule, because the ledger then lies.

## Checking existing code

```bash
node scripts/verify-patterns.mjs <path> --ledger <path-to-patterns.json>
```

It reports violations with file and line, then vocabulary maturity and call-site
counts. It is an allowlist: any class in a component's namespace that no allowed
pattern produces is a violation, whether or not somebody predicted it.

Two limits worth knowing before trusting a clean run. It reads **literal**
class strings, so a class assembled from variables is invisible to it. And it
governs only components present in the ledger — anything else is unmanaged, not
approved.

Do not point it at demo pages or vendored library examples. Those exist to show
every variant on purpose and will report violations that are not bugs.

## Promoting a pattern

Promotion is what moves the system from "a library with rules" to a design
system. Do it when one of these is true, not on a schedule:

- the pattern composes **three or more** library classes at the call site
- the project needs it to diverge from the library **structurally**, not just in
  colour
- an agent or a developer has got it wrong more than once

Order matters and is not negotiable: **SCSS first, wrapper second.**

```scss
/* styled: a semantic class, so code with no component framework is protected */
.app-btn-secondary { @extend .btn, .btn-outline-secondary; }
```

```jsx
/* wrapped: thin, and consuming the semantic class — never the composition */
<Button variant="secondary" />  →  class="app-btn-secondary"
```

A wrapper that emits `btn btn-outline-secondary` directly has moved the coupling
rather than removed it. With the semantic class in between, dropping the library
is one SCSS edit.

Then update the ledger in the same change: fill the `styled` or `wrapped` slot
and set `state`. The ledger only stays honest if promotion and record happen
together — that is the whole reason `state` is a field and not a comment.

## Starting a ledger from nothing

Copy `patterns.template.json` into the project and add the library it builds
with. Then read [`references/worked-example.md`](references/worked-example.md),
because the template is empty on purpose and shows the shape of nothing.

Two situations, and they start from opposite ends.

### Choosing the FORM, not just the variant

`patterns.json` records which library variants are allowed. It does not, on its
own, record what SHAPE a component should have — whether a tab is underlined or
boxed, whether a photo bleeds or sits in a frame, whether a checkbox is a box or
a whole card. That is the gap a library fills with its own default, and it is
most of what makes a themed build still look like the library.

[`references/component-forms.md`](references/component-forms.md) holds those
shapes with the answers each one fits. Derive the fitting form, propose it, and
name what else was available — a client who wanted something else says so in one
exchange.

**Nothing there is banned.** The conditions describe fit, not permission: a form
marked "avoid when" is reachable by a client who wants it, as a deviation with a
reason. **And several forms of one family can coexist** — a plain checkbox in a
form and a selectable card in a chooser are two entries with two contexts, not a
contradiction.

**When the library cannot express the chosen form, record the pending
implementation** in the ledger with its reason. A pending entry is acceptable;
an omission is not, because silence looks like the form was never wanted.

### There is no markup yet

The common case when the design system comes first — a rebuild, a new app, a
product being repaginated. There is a `DESIGN_LANGUAGE.md` and a theme and no
screens. **This is a good position to be in**, not a missing input: the
vocabulary gets decided rather than inherited.

Three sources, in order:

1. **`DESIGN_LANGUAGE.md` decides more than it looks.** `secondaryAction` says
   what the supporting button is. `guardrails` with `enforcement: ledger` are
   already `forbidden` entries, with their `reason` written. §6 becomes the
   `composition` block. The voice table implies whether a destructive
   confirmation is a modal.
2. **The library offers a menu; take the smallest useful slice.** Bootstrap has
   nine button variants and most products use four. Name the four, and let the
   allowlist refuse the rest silently.
3. **The screens that are certainly coming.** A recipe app has a card and a
   form. It does not yet have a carousel, and adding one now is a decision
   nobody made that will be wrong when someone needs it.

**Start short and let it grow under pressure.** A ledger that begins with forty
components has pre-decided forty arguments without hearing any of them.

### There is existing markup

Reading it is worth doing — it shows what the product actually needed, which is
more honest than anyone's memory of it. But **what is in the code is evidence,
not authority, and nothing goes in without the client agreeing to it.**

The reason is the whole situation you are in: a design system is normally being
adopted *because* something needs to change. The incoherence in today's markup
is frequently the thing it was brought in to remove — five ways to say
"secondary", a button coloured by an absolute palette name, a card that is a
different card on every page. Importing that wholesale writes it into the
contract and hands it a justification. The ledger stops being what the product
chose and becomes a record of what nobody got round to fixing.

So present it as a list of candidates rather than filling the file:

> I found six button compositions in the markup. Four look like real patterns —
> primary, secondary, a destructive one, and a text-only one. The other two are
> `btn-light` and a `btn-primary` with an inline background override. Which of
> these belong in the vocabulary, and which are you adopting the system to get
> rid of?

Accepted, rejected and deferred are three different answers and all three are
useful. A rejected candidate is worth a `forbidden` entry with the reason —
that is precisely a thing people will reach for, and precisely where a good
refusal message pays for itself.

**Never infer consent from frequency.** The composition used on forty screens
may be the one being replaced; that is what a facelift is. Only the client knows
which, and it is one question.

### Both paths

Mark everything `raw` at first. Promotion is later and needs a trigger; setting
a pattern to `styled` before the class exists makes the ledger lie on day one.

Then record the refusals, and only the ones that matter: a `forbidden` entry
exists to give a good message for something people will genuinely reach for.
The allowlist already rejects everything else.

## Adding a library

Add its name to `libraries`, then add its key to every pattern's `raw` and to
each modifier option. Where a library cannot express a pattern, leave the
mapping out — an absent mapping is a finding, not a gap to paper over.

Use `intent`, never the existing class names, to decide what the new library's
mapping should be. That is what `intent` is for: the classes are the part
expected to change.

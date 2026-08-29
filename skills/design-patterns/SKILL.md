---
name: design-patterns
description: The pattern ledger that decides which component variants a project is allowed to use, and what markup to emit for each. Use this skill before writing or editing any component markup — a button, a card, a badge, a form control — in HTML, JSX, TSX, Vue, Svelte or any template. Trigger it when asked to "add a button", "make this a secondary action", "use the outline style", "add a green save button", "review this component", "why is this class not allowed", or whenever a diff introduces a library class like `btn-*`. Also use it to check existing code against the vocabulary, to promote a pattern from library classes to a semantic class or a component wrapper, and to report how mature the design system is. This is the markup-side companion to the `design-system` skill, which governs CSS tokens.
license: MPL-2.0
---

# Design Patterns

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
wrong for most of them. Two worked examples live in `example/`:
`ds-hot-tone-bootstrap-phase1` and `ds-cyberpunk-bulma-phase2`. They disagree
with each other on purpose.

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

Copy `patterns.template.json` into the project, add the library it builds with,
then fill the vocabulary from what the code ALREADY does — read the markup,
group the compositions actually in use, and name them. A vocabulary invented
before looking describes a product nobody built.

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

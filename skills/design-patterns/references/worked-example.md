<!-- skills/design-patterns/references/worked-example.md -->

# A worked example

A real ledger, from
[`example/ds-hot-tone-bootstrap-phase1`](../../../example/ds-hot-tone-bootstrap-phase1/patterns.json).
Every entry below is one that actually passes `npm run verify:patterns` there —
nothing here is illustrative.

**Read this before writing a ledger.** `patterns.template.json` is
`{"libraries": [], "components": {}}` on purpose, so copying it shows the shape
of nothing. The schema says what is *allowed*; this says what a good one looks
like.

The product: a food-delivery back office on Bootstrap, early in its life. Four
components, one refusal, everything still `raw`.

---

## The frame

```json
{
  "$schema": "../../patterns/patterns.schema.json",
  "version": 1,
  "libraries": ["bootstrap"],
  "components": { "button": { … }, "card": { … }, "nav": { … }, "field": { … } }
}
```

**Four components, not forty.** A first ledger covers what the product actually
puts on a screen. An entry for a component nobody has built is a decision nobody
made, and it will be wrong by the time someone needs it.

## A component

```json
"button": {
  "intent": "A control that performs an action. If it navigates, it is an anchor and nothing here applies.",

  "namespace": { "bootstrap": "^btn$|^btn-(?!group|toolbar|close)" },

  "namespaceNote": "Bootstrap keeps `btn-group`, `btn-toolbar` and `btn-close` behind the same prefix while they are container and icon components, so the lookahead marks where this component's authority ends. Everything else under `btn-` is claimed on purpose: an unrecognised variant is what the allowlist exists to catch."
}
```

Three things carry the weight here.

**`intent` draws the boundary, and the second sentence is doing the work.** *"If
it navigates, it is an anchor and nothing here applies"* settles an argument that
otherwise recurs on every review. An `intent` that only says "a button" settles
nothing.

**`namespace` is the hardest field to get right**, and the one worth spending
time on. It is a regex matching every class that belongs to this component —
which is how the verifier knows a class it has never seen is *this component's*
unknown variant rather than someone else's business. Too wide and the component
claims classes it does not own; too narrow and unknown variants slip through
unreported.

**`namespaceNote` explains the exclusions.** Anyone reading `(?!group|toolbar|close)`
six months later will otherwise assume it was a mistake and widen it.

Add **`root`** when the namespace alone is ambiguous — a regex for the class that
must be present for an element to *be* this component. daisyUI needs it, because
`join-item` sits on buttons inside a toggle group and would otherwise make every
one of them read as an unknown variant.

### The namespace claims VARIANTS, never anatomy

**This is the rule that decides whether a ledger works**, and the button above
is the misleading case: every `btn-*` class in Bootstrap and CoreUI genuinely is
a variant, so a wide lookahead is right there and nowhere else.

Most components are not like that. Under `card-`, `nav-` and `modal-` the same
prefix carries two different things:

| | |
|---|---|
| **variants** — claim them | `nav-tabs`, `nav-pills`, `card-header` when it is a *choice* |
| **anatomy** — never claim them | `card-body`, `card-title`, `nav-item`, `nav-link`, `modal-dialog`, `modal-content` |

Anatomy is the markup the library requires you to write. It is not a decision,
so there is no pattern that produces it — and a namespace that claims it makes
the verifier report every one as an unknown variant.

Measured, on seven lines of ordinary CoreUI markup:

```
"card":  "^card$|^card-(?!group|deck|columns)"     →  8 violations
"nav":   "^nav$|^nav-(?!bar)"                          card-body, card-title,
"modal": "^modal$|^modal-(?!backdrop)"                 nav-item, nav-link,
                                                       modal-dialog, modal-content,
                                                       modal-header, modal-body

"card":  "^card$"                                  →  0 violations
"nav":   "^nav$|^nav-(tabs|pills|underline)$"
"modal": "^modal$"
```

**Enumerate the variants rather than excluding the anatomy.** A lookahead has to
predict every structural class the library ships, now and in its next release. A
list of the variants this product allows is shorter, is the decision you were
making anyway, and cannot go stale in the wrong direction — a missed variant is
reported, a missed exclusion is a false alarm on working markup.

Both real ledgers do this: `ds-hot-tone-bootstrap-phase1` uses `^card$` and
`^navbar$|^nav$|^list-group$`, claiming no child class of either.

## Patterns

```json
"patterns": {
  "primary":   { "intent": "The main action on a screen.",
                 "state": "raw", "raw": { "bootstrap": ["btn", "btn-primary"] } },

  "secondary": { "intent": "A supporting action beside a primary one.",
                 "state": "raw", "raw": { "bootstrap": ["btn", "btn-secondary"] } },

  "danger":    { "intent": "An action that is hard to undo: delete, revoke, cancel an order.",
                 "state": "raw", "raw": { "bootstrap": ["btn", "btn-danger"] } },

  "primary-outline": {
    "intent": "Primary emphasis without a fill, for when several actions sit together and one filled button per group is enough.",
    "state": "raw",
    "raw": { "bootstrap": ["btn", "btn-outline-primary"] },
    "notes": "Outline is a separate PATTERN here, not a modifier, because Bootstrap renames the class rather than adding one."
  }
}
```

**Every `intent` is about WHEN, not what it looks like.** *"An action that is
hard to undo: delete, revoke, cancel an order"* tells a reader which button to
reach for. "A red button" tells them what they can already see.

**`state: raw` everywhere at first.** The library's own classes, emitted as-is.
Promotion to `styled` or `wrapped` comes later and needs a trigger; marking a
pattern `styled` before the class exists makes the ledger lie on day one.

**Outline is a pattern, not a modifier, and the `notes` field says why.** The
test is mechanical: if the library *adds* a class, it is a modifier; if it
*renames* the class, it is a separate pattern. Bootstrap renames
(`btn-outline-primary`), so it is a pattern. Recording the reason stops the next
person from "fixing" it.

## A refusal

```json
"neutral": {
  "intent": "A button coloured by an absolute palette name rather than a role.",
  "state": "forbidden",
  "reason": "`light` and `dark` are fixed palette entries, not theme roles. They do not invert, so a light button stays light on a dark theme — this is a measured fact about the library, not a matter of taste, which is why it is the one refusal recorded this early.",
  "instead": "secondary-outline",
  "matches": { "bootstrap": ["btn-light", "btn-dark", "btn-outline-light", "btn-outline-dark"] }
}
```

**One refusal, not twenty.** A `forbidden` entry exists to give a good message
for something people will genuinely reach for. The allowlist already rejects
everything else silently — adding entries for variants nobody wants is work that
buys nothing.

**`reason` is what the verifier prints**, so it has to be persuasive to someone
who was about to type `btn-light`. This one gives a measured fact about the
library rather than a preference, which is why it survives an argument.

**`instead` names a pattern that exists in this file.** A refusal with nowhere
to go gets overridden.

**`matches` lists the classes that trigger it.** Without it the verifier reports
"not in the vocabulary" and the good message never appears.

## When a utility class may appear in a pattern

Some libraries have no variant for a thing a product needs. Bootstrap and CoreUI
cards have no tonal variant — there is no `card-sunken` — so a recessed panel is
the base class plus a background utility:

```json
"sunken": {
  "intent": "A recessed block inside a recipe — the utensils list, the cook's notes.",
  "state": "raw",
  "raw": { "coreui": ["card", "bg-body-tertiary"] }
}
```

This is legitimate, and it is also the shape that quietly turns a component
vocabulary into a class recipe. Two tests decide it, and a pattern has to pass
both.

**1. Does the base class carry the component on its own?** `card` is a card
before the utility arrives; the utility changes one property of something
already complete. A "button" that needs five classes to read as a button has no
base — it has a recipe, and recipes get mistyped. If the component only makes
sense as a stack of classes, the problem is the base, and the fix is a `styled`
promotion rather than a longer list.

**2. Is the utility self-sufficient?** Applying it must not force a change
anywhere else — not to a child class, not to a sibling, not to another class on
the same element. If setting the card's background also means swapping
`card-body`, it is not an additive utility; it is a variant wearing one, and it
belongs in the ledger as a pattern of its own with the whole composition
written down.

**Then decide pattern or modifier.** If the utility is an axis that combines
sensibly with every pattern of the component, it is a modifier — surface level
usually is. If it only makes sense on one, it is a pattern. Both are better than
leaving it out, because the alternative is every author picking their own
background utility and the product acquiring four recessed panels that do not
match.

**The ledger's job here is to choose one and name it.** The library offers a
dozen background utilities and says nothing about which belongs on a card. That
silence is exactly the gap this file exists to close.

## Modifiers

```json
"modifiers": {
  "size": {
    "intent": "Physical size. Orthogonal to emphasis — a secondary button can be small without becoming a different pattern.",
    "options": {
      "medium": { "intent": "The default. Adds no class, so most call sites name no size at all.",
                  "libraries": { "bootstrap": [] } },
      "small":  { "intent": "Dense rows: the order table, inline actions.",
                  "libraries": { "bootstrap": ["btn-sm"] } },
      "large":  { "intent": "The single call to action on a marketing page.",
                  "libraries": { "bootstrap": ["btn-lg"] } }
    }
  }
}
```

**A modifier is an axis that is orthogonal to the pattern.** If every
combination makes sense, it is a modifier. If only some do, they are patterns.

**The default option has an empty class list**, and that is the correct value —
not an omission. It says "this option exists and adds nothing", which is what
stops someone inventing `btn-md`.

## Rules a verifier cannot check

```json
"tabs": {
  "state": "raw",
  "raw": { "bootstrap": ["nav", "nav-tabs"] },
  "dos": ["Section-level navigation within one page."],
  "donts": ["Not for switching between unrelated records — that is a route.",
            "Not on mobile: tabs sit at the top of the screen and compete with the header."],
  "responsive": "Below the tablet breakpoint this becomes an accordion."
}
```

These three fields hold what `state` cannot: whether this pattern was the right
one at all. They live here rather than in a README beside the component because
**this is the file read at the moment markup is written**.

A `dont` with a detectable signature does not belong here — it belongs in a
`forbidden` entry or in stylelint, where it fails a build instead of waiting to
be read.

## Composition — the screen with no component

```json
"composition": {
  "intent": "How to build a screen this ledger has no component for. Tokens are the paint; this is the grammar.",
  "typeRoles": { "pageTitle": "text-4xl", "sectionTitle": "text-2xl", "body": "text-base", "caption": "text-sm" },
  "rhythm": { "related": "space-xs", "unrelated": "space-lg", "section": "space-2xl" },
  "surfaces": ["bg-page", "bg-surface"],
  "accentBudget": "One primary action per screen, plus whatever is currently selected.",
  "donts": ["Never a third surface level — two is what this product allows."]
}
```

`DESIGN_LANGUAGE.md` §6 holds the same subject as **relations** that survive a
change of theme — *"a section title is two steps above body"*. This holds the
**bindings** for this theme — `sectionTitle: text-2xl`. One design language can
have several token themes, so a value true of one theme cannot live in the
document that outlives it.

---

## What to copy, and what not to

**Copy the shape**: intent that draws a boundary, a namespace with its note,
patterns named for when to use them, `raw` everywhere at first, few refusals and
each one persuasive.

**Do not copy the vocabulary.** These are a delivery back office's buttons.
`example/ds-cyberpunk-bulma-phase2` covers the same ground and disagrees on
almost every entry, which is the point: the vocabulary is the product's decision
and a tool that shipped one would be wrong for most of them.

**Notice how short it is.** Four components, eleven button patterns, one
refusal. The measure of a good ledger is the allowed list getting *shorter* over
time — when asked to add a pattern, the default answer is to point at the
existing one that covers it.

---
name: design-language
description: Runs the discovery interview that defines a product's design language and writes DESIGN-LANGUAGE.md at the project root. Use this FIRST when starting a design system in a project, before any token or component work — trigger it on "start a design system", "set up the design system", "create a design language", "onboard this project", "define our visual identity", "we need a style guide", or when a project has tokens but nothing recording why they were chosen. Also use it to revisit a decision later: "why are our corners square", "change our voice", "add a guardrail". This is the first of three skills — it decides, `design-system` builds the tokens, `design-patterns` closes the component vocabulary.
license: MPL-2.0
---

# Design language

Tokens are the bricks and the paint. The design language is the architecture,
the tone and the rules of construction — it tells an agent and a developer not
only *what* to use but *how*, *when* and *why*.

This skill runs a short interview and writes **`DESIGN-LANGUAGE.md` at the
project root**: YAML front matter an agent reads before generating anything, and
prose a person reads to find out why the system is the way it is.

## The sequence

Three skills, in order. Each one needs the previous one's output.

| | Skill | Produces | Question it answers |
|---|---|---|---|
| 1 | **design-language** (this) | `DESIGN-LANGUAGE.md` | why does it look and sound like this |
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

## Running the interview

Fourteen questions, six blocks. Read the questionnaire before starting.

**Every question decides something concrete.** A token value, a threshold, a
guardrail. If an answer would change nothing, drop the question rather than
asking it for completeness.

**Adaptive, not a form.** Ask a block, act, skip what is already settled. Someone
who says "IBM Carbon but friendlier" has answered blocks 1 and 3 at once.

**Confirm rather than enumerate.** Once the archetype lands,
[`references/archetypes.md`](references/archetypes.md) has a default for every
remaining question. "Playful suggests 16px corners and visible shadows — keep
those?" is one exchange; reading three options aloud is three.

**Never invent an answer.** Write `undecided` with the default that was applied.
An assumption recorded as a fact is worse than a gap, because nobody revisits it.

**Read the answers back before writing the file.** Archetype, density, geometry,
colour rigour, voice, and every deviation with its reason. Contradictions surface
in that summary, and the client hears their own product described while it is
still cheap to change.

**Interview in the client's language; write the file in English**, like the rest
of the system.

## Writing the file

Read [`references/worked-example.md`](references/worked-example.md) first. It is a
finished document reconstructed from a product in this repository, with every
value taken from that product's real `theme.scss` — so it calibrates length and
specificity against something that actually shipped rather than against an
invented brand.


Copy [`templates/DESIGN-LANGUAGE.md`](templates/DESIGN-LANGUAGE.md) to the
project root and fill it. Five sections, from the five pillars: principles,
visual foundations, voice, interaction, composition.

Two things to get right:

**The front matter and the prose must agree.** Tooling trusts the front matter,
so a document whose YAML contradicts its own text is worse than one with no YAML
at all. When a decision changes, change both in the same edit.

**Mark how each guardrail is enforced.** `ledger` and `stylelint` fail a build;
`document` is advice an agent reads. Labelling advice as enforcement is the one
way this file can actively mislead.

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

When a decision changes, change `DESIGN-LANGUAGE.md` first and the code second,
in the same commit. That ordering is what keeps the document the intent rather
than a description written after the fact.

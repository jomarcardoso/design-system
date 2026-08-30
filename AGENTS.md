<!-- AGENTS.md -->

# AGENTS.md

Conventions for any agent working in this repository. Read before writing a
file.

The three skills in `skills/` are the substance of this project and travel into
other repositories as a plugin, so their instructions live with them rather than
here. This file holds what applies to **this** repository regardless of which
skill is running.

---

## Every file opens with its own path

The first line of every file is a comment naming its path from the repository
root.

```scss
// src/_semantic.scss
```

```css
/* app.css */
```

```js
// scripts/audit-contrast.mjs
```

```markdown
<!-- skills/design-system/references/review.md -->
```

Then a blank line, then whatever the file already started with — the banner
comment, the front matter, the first import.

**Why.** Files reach agents detached from their tree: pasted into a chat,
quoted in a review, returned by a search, attached to a message. A `theme.scss`
with no path could be any of the six in `example/`, and the usual repair is
guessing — which produces an edit applied to the wrong copy, silently, because
both files exist and both look right. One line removes the whole class of
mistake, and it survives copy-paste in a way a directory listing does not.

It also makes a paste self-describing in the other direction: a file sent to a
model in a fresh session arrives knowing where it belongs, so what comes back
can say where to put it.

**The exception is JSON**, which has no comment syntax. `patterns.json`,
`package.json` and the schemas do not carry the line, and no `"_path"` key
should be invented to fake it — a fake comment is a data field, and something
will eventually read it. Where a JSON file needs identifying, its `$schema`
relative path already does most of the work.

**Front matter comes first in files that have it.** A skill's `SKILL.md` opens
with `---`, because the loader parses that before anything else. The path
comment goes immediately after the closing `---`.

---

## The document chooses the assets, not the library

Typefaces and icon sets follow `DESIGN_LANGUAGE.md`. A component library that
ships its own is making a suggestion; the document is the answer.

CoreUI ships icons that are mostly solid and thick. They fit CoreUI and fight a
document asking for outline at 1.25px, so a product with that document uses a
stroke-drawn set instead and loses nothing — the library styles components, not
glyphs.

**And put the intent in CSS, not in a presentation attribute.** An SVG arriving
with `fill="none"` loses to any CSS rule, and libraries have them: CoreUI sets
`fill: currentcolor` on a class called `.icon`, so every glyph rendered solid on
a page whose markup said otherwise. A presentation attribute is the weakest
thing in the cascade.

## Never override a library with CSS

When a third-party component looks wrong, the reflex is a stylesheet that beats
it. That reflex is wrong here, and it has cost this repository real time twice.

Work through the halves in order, and stop at the first one that can reach it:

1. **`<library>-entry.scss`** — the library's Sass `!default` variables, set
   before it compiles. Everything the library computes with or bakes into a
   generated utility rule lives only here: the spacing scale, leading, font
   weights, padding ratios, `$enable-*` flags. A `var()` is often allowed as the
   value, which keeps it theme-reactive.
2. **`src/adapters/_<library>.scss`** — the library's CSS custom properties,
   rebound at runtime. Everything that changes between themes lives here, and
   nothing that changes between themes may live in the entry.
3. **`patterns.json`** — if neither half reaches it, the class is a real limit of
   the library. Refuse it with a reason. CoreUI's `.text-bg-*` writes
   `color: #fff !important` inside the rule; that is a ceiling, not a puzzle.

**A `!important` or a hardcoded literal in the built CSS is not proof that a
value is unreachable.** `--cui-badge-color: #fff` looked like one and was a Sass
`!default` all along. Read the library's own `_variables.scss` before concluding
anything is fixed.

**The diagnostic:** a product writing CSS that overrides a library is evidence
that a Sass variable was not set. Find that variable rather than raising the
specificity — the override wins today and loses the next time the library moves
a selector.

## The chain

A finished product is five artefacts, each referring to the one before it:

```
DESIGN_LANGUAGE.md   the answers, and why
      ↓
DERIVED.md           what the answers produced, and which answer produced each
      ↓
theme.scss → ds.css  the values, and FOUNDATIONS.md reporting them
      ↓
patterns.json        which components exist, in which form, going where
      ↓
the markup           which the ledger verifies
```

They agree on the day they are written and drift afterwards, one edit at a
time: an answer changes and the derivation is not regenerated, a token is
renamed and `DERIVED.md` keeps citing the old name, a pattern is promoted and
the class it names is never written.

```bash
npm run verify:chain
```

Four links, all mechanical: every answer produced something, every derivation
names a real token, every composition binding resolves, every promoted pattern
has its class. It found three breaks the first time it ran.

**What it cannot check is the interesting half** — whether a derivation is the
RIGHT derivation for an answer. That is judgement, and it belongs to the review
checklists.

## Verifying

```bash
npm run verify
```

`build:tokens` → `lint` → `verify:examples` → `audit:contrast`. Any failure
exits non-zero, and the contrast audit starts its own server, so there is no
two-step ritual to forget.

A green run proves the build is well-formed. It does not prove the values are
the ones a `DESIGN_LANGUAGE.md` asked for — that is
`skills/design-system/references/review.md`, and it is a different claim.

**The dangling-reference check reads a product's `app.css` too, not only its
`ds.css`.** It used to read the generated file alone, which is the one place the
mistake cannot happen — every name in `ds.css` was emitted by the build. Product
CSS is where a token gets typed from memory, and `var(--app-fg-subtle)` for
`--app-fg-subtlest` voids the whole declaration silently: the element inherits,
the page still looks plausible, and nothing fails. Add both files for every new
example.

## Versioning

`CHANGELOG.md` explains the scheme and why every entry that needs action from a
vendoring project carries a **To upgrade** block. The version lives in
`package.json`, and a generated `DESIGN_LANGUAGE.md` records the version that
produced it in `toolVersion`.

## Where things live

| | |
|---|---|
| `src/` | the four layers; layer 2 is the only public contract |
| `src/adapters/` | one file per third-party library, leaves that nothing depends on |
| `skills/` | the three skills, in order: `design-language`, `design-system`, `design-patterns` |
| `patterns/` | the ledger schema and an empty template |
| `example/` | one folder per worked product; they disagree with each other on purpose |
| `scripts/` | the guards `npm run verify` chains together |
| `tasks/` | working notes and test transcripts, not shipped |

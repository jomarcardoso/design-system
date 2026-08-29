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

<!-- skills/design-patterns/references/layout-forms.md -->

# Layout forms — the shapes a page can take

`component-forms.md` decides what a card looks like. This decides **what the
page it sits on looks like**, and it was the larger of the two holes: question
20 collects a frame in three options, `derivations.md` §H and §L turn it into a
measure, a column count and a breakpoint — and between those two there was
nothing. No catalogue of page shapes, so every layout past the frame came from
whatever the component library's examples happened to do.

That is the same failure the component catalogue exists to prevent, one level
up and more visible: a reader forgives a card that looks like Bootstrap's and
does not forgive a page that does.

**Same tables, same vocabulary, same checker.** A backticked value is an answer
the interview holds; plain prose is a fact about the content that only whoever
builds the screen can supply. `npm run verify:forms` reads this file exactly as
it reads the component one.

---

## How this differs from the component catalogue

**A page has fewer legitimate variants than a component.** A product may have
three kinds of card and should not have three kinds of page frame — the frame is
what makes a product feel like one product, and varying it is how an application
comes to feel assembled from separately-designed screens.

So most families here are **one per product**. Where several coexist it is
because they serve different page KINDS — an index page and a detail page are
genuinely different jobs — and that is named in the family, not left to taste.

**The frame is decided; the rest is derived from it.** Question 20 already
chose single column, content with an aside, or an application frame. Nothing
here re-asks that. These are the shapes available WITHIN each, and the answer to
20 appears in the conditions as `frame: …`.

---

## Index — how a set of things is presented

**One per product.**

The first page of most products, and the one most often taken from a template.

| form | what it is | fits when | avoid when |
|---|---|---|---|
| feed | one column of full-width items, newest first | `single-column`; `user-content`; items with no natural order the user chooses | sets the user searches rather than browses |
| grid of cards | equal tiles, wrapping | `imagery: content`; `product-content`; browsing | items whose distinguishing information is text-heavy |
| list with a leading thumbnail | one row per item, image at the start | `imagery: supporting`; `dense`; phones | items whose image IS the decision |
| table | columns the user compares across | `tools`; `dense`; `exposed` | phones as the primary target; `imagery: content` |
| sectioned index | grouped under headings, no pagination | `editorial-premium`; a set with a real taxonomy | sets that grow without bound |
| plain list | one row per item, text only | anything — the shape a set takes when nothing about it argues for more | sets whose image or whose comparable columns are the reason to look |

**The grid is the default a library gives you and it is right less often than it
is used.** A grid says *these items are comparable and interchangeable*. A feed
says *these arrived in an order*. Choosing the grid for a feed is the commonest
layout error in this file.

## Detail — how one thing is opened

**One per product.**

| form | what it is | fits when | avoid when |
|---|---|---|---|
| its own page | the index is replaced | anything — the default, and the only form that always has a URL | comparing items side by side |
| master–detail | list stays on one side, detail on the other | `app-frame`; `content-aside`; `tools`; `exposed` | phones; long-form reading |
| side panel over the index | detail slides in, index stays visible | `content-aside`; `progressive`; triage and review work | content long enough to need its own scroll and header |
| inline expansion | the row opens in place | `dense`; `progressive`; short detail | detail with its own actions and sub-navigation |
| overlay | a modal or sheet | `progressive`; a quick look that returns | anything the user links to or shares |

**The test is whether the detail has a URL somebody would send.** If it does,
it is a page or a panel with a route; if it never would be, an overlay is
honest. An overlay holding something linkable is the decision that produces the
back-button bug in every product that makes it.

## Navigation placement

**One per product.**

| form | what it is | fits when | avoid when |
|---|---|---|---|
| top bar | one horizontal row of destinations | anything — the fallback, and the only form no frame rules out | deep hierarchies |
| side rail, labelled | a persistent vertical column | `app-frame`; `content-aside` | `single-column`; products with three destinations |
| side rail, icons only | collapsed to glyphs, labels on hover | `app-frame`; `dense`; `hours` | `mobile-first`; sets the user visits rarely |
| bottom bar | fixed to the bottom edge | `mobile-first`; three to five destinations | `desktop-first`; more than five |
| none — the content is the navigation | links inside the page, no chrome | `single-column`; `quiet`; `editorial-premium` | products with tasks rather than reading |

**Navigation is chrome and chrome does not float.** Whatever form, it belongs to
the page plane — separated by a rule or by one rung, never by a shadow. See
`derivations.md` §Q.

## Header behaviour

**One per product.**

**Never both:** sticky, full height and sticky, condensed after the first screen

**Never both:** sticky, full height and none

**Never both:** static, scrolls away and sticky, full height

One header behaviour per product, whatever the page.

| form | fits when | avoid when |
|---|---|---|
| static, scrolls away | anything — the default, and the cheapest | pages whose primary action lives in it |
| sticky, full height | headers carrying an action or a filter the user needs while scrolling; `exposed`; `tools` | `mobile-first` — it eats a phone's screen |
| sticky, condensed after the first screen | `hours`; long pages | short pages, where it never condenses and reads as a bug |
| none | `app-frame`, where the rail carries identity | products a user arrives at from outside |

## The aside

**One per product.**

**Only when `content-aside` or `app-frame`.**

A single-column page has no aside, and a catalogue reporting one as missing for
every product that correctly has none is a report nobody reads twice.

| form | what it is | fits when | avoid when |
|---|---|---|---|
| persistent panel | always there, always the same width | `content-aside`; `app-frame` | phones, where it has nowhere to go |
| collapsible rail | can be shrunk to icons or hidden | `app-frame`; `hours` | products where its content is needed continuously |
| a sheet on demand | absent until asked for | `progressive`; `mobile-first` | filters the user adjusts repeatedly |
| the aside becomes a section | on narrow screens it moves below the content | `multiplatform` | asides carrying navigation, which must stay reachable |

**An aside separated by a rule is not a lesser aside.** `ladderSpend` fixes how
many rungs the layout may spend — derived in `derivations.md` §W from the frame —
and an aside is the region most often given one it cannot afford. A hairline is
the answer at `ladderSpend: 2`.

## Form pages

**One per product.**

| form | what it is | fits when | avoid when |
|---|---|---|---|
| one column | every field stacked, one measure | `mobile-first`; `multiplatform`; anything a user completes once | long settings pages with many independent fields |
| two columns | paired fields side by side | `desktop-first`; `dense`; data entry by someone trained | anything a first-time user fills in |
| sectioned, one page | headed groups, one submit | `exposed`; forms of ten to forty fields | flows with branching |
| wizard | one step per screen, progress shown | `progressive`; branching; a user who does this once | anything the user returns to and edits |
| inline edit in place | the page IS the form | `user-content`; `progressive` | anything needing validation across several fields at once |

**One column is right far more often than it is used.** The two-column form
exists because a designer had horizontal room, and it costs a reading order
nobody can predict: the eye does not know whether to go right or down.

## Reading pages

**One per product.**

| form | what it is | fits when | avoid when |
|---|---|---|---|
| one measure, centred | the sheet | anything — the default for prose, at any archetype | reference material scanned rather than read |
| measure with a margin column | notes, figures and asides beside the text | `editorial-premium`; `content-aside`; `desktop-first` | `mobile-first`, where the margin has nowhere to be |
| measure with a table of contents | a sticky index beside long content | `hours`; `exposed`; documentation | anything under about two screens |
| full width, no measure | the text runs to the viewport | `tools`; `dense` | anything anyone reads in sentences |

**The last row is a form and almost always the wrong one.** It is included
because it is what a library gives you when nobody sets a measure, and naming it
is how it stops being an accident.

## Dashboard and overview pages

**One per product.**

| form | what it is | fits when | avoid when |
|---|---|---|---|
| one big, several small | a primary figure with supporting tiles | `tools`; `balanced`; a screen with one real question | screens where every metric matters equally |
| an even grid of tiles | equal weight throughout | anything — the fallback when no metric leads | when the user actually has a primary question |
| sections of related metrics | headed groups, each its own row | `hours`; many metrics | fewer than about six |
| a single number | one figure and its trend | `quiet`; `seconds`; a status screen | anything requiring a decision |

## Search and filter placement

**One per product.**

| form | fits when | avoid when |
|---|---|---|
| a field in the header | anything — the default, and the one every frame has room for | products where filters matter more than the query |
| a left rail of filters | `content-aside`; `exposed`; `desktop-first` | phones; three or fewer filters |
| chips above the results | `progressive`; `mobile-first`; few filters | more than about eight |
| a modal or sheet | `mobile-first`; `progressive`; many filters | filters the user adjusts repeatedly while reading results |
| none — the set is small enough | `quiet`; sets a person can see all of | anything that grows |

## Settings and account pages

**One per product.**

| form | fits when | avoid when |
|---|---|---|
| one long page with headings | anything — the default, and right far longer than teams expect | products with genuinely separate domains |
| tabs across the top | `balanced`; three to six groups | `mobile-first` |
| a side rail of sections | `app-frame`; `exposed`; many groups | `single-column` |
| search-first | `hours`; `tools`; very many settings | small products, where it reads as evasion |

## Workspace and canvas pages

**One per product.**

**Only when `tools`.**

The shape a product takes when the user is manipulating something rather than
reading it.

**Never both:** docked panels, resizable and floating panels

**Never both:** docked panels, resizable and tool bar plus full-bleed canvas

**Never both:** chrome around a lit viewport and docked panels, resizable

| form | what it is | fits when | avoid when |
|---|---|---|---|
| chrome around a lit viewport | panels frame a single work area | `colorCriticalWorkspace`; `tools` | anything where the chrome IS the product |
| docked panels, resizable | tools whose panels hold state the user reads while working in the canvas; `app-frame`; `hours`; `exposed` | `mobile-first` |
| floating panels | panels the user moves | `tools`; expert users who arrange once | first-time users; anything on a phone |
| tool bar plus full-bleed canvas | one bar, everything else is canvas | anything — the fallback, and the only one a phone can hold | tools with many simultaneous options |

**A colour-critical workspace has exactly one lit surface** and it is the
canvas. `derivations.md` §S forces the model away from `elevated` for the same
reason.

## First run and empty products

**One per product.**

The page nobody designs and every product has.

| form | fits when | avoid when |
|---|---|---|
| the empty state carries it | anything — the default, and the only form that costs no extra screen | products needing configuration before they work |
| a checklist of first steps | `exposed`; `tools`; setup with real prerequisites | products a user can simply start using |
| a tour over the real interface | `loud`; `balanced`; genuinely novel interactions | interfaces a user can work out by looking |
| sample content, marked as sample | `product-content`; `imagery: content` | anything where sample data could be mistaken for real |

**A tour is the form to reach for last.** It is what a product does instead of
being legible, and every one of them is skipped by most of the people who see
it.

## Error and offline pages

**One per product.**

| form | fits when | avoid when |
|---|---|---|
| in place, the rest of the page intact | `progressive`; a failure affecting one region | failures that make the whole page wrong |
| full page with a way back | `single-column`; routing and permission failures | recoverable failures, where it loses the user's context |
| a banner above the content | `exposed`; degraded but usable states | hard failures, where it understates |
| retry in place, no message | `quiet`; transient network failures | anything the user needs to know about |

---

## What this file does not decide

**The frame.** Question 20 does, and it is one of the two facts about a product
that the interview cannot derive.

**Breakpoints.** They are compiled into the component library's generated
utilities before any custom property exists, so they live in
`<library>-entry.scss`. `derivations.md` §L says what values, and no token can
carry them.

**Which pages a product has.** That is the product, and nothing in a design
system gets to decide it.

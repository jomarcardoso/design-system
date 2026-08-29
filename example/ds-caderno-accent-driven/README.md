<!-- example/ds-caderno-accent-driven/README.md -->

# DS Caderno — accent-driven, no library

The **monochrome / accent-driven** school, built from two pigments and nothing
else. Paper neutrals, pen accent, one theme written and its night counterpart
generated.

```
npm run demo:examples
# http://localhost:4173/example/ds-caderno-accent-driven/   (trailing slash)
```

## What this example is for

The other examples answer "can this foundation drive library X". This one
answers a different question: **what does a school actually change?**

| | |
| --- | --- |
| layer 1 | `palette.scss` — two `ramp.*` calls, 4 lines of decision |
| layer 2 | `theme.scss` — every value a ladder position on one of the two ramps |
| layer 3 | untouched. Defaults are correct for this school |
| adapter | none |

## No library, on purpose

The school's claim is that an interface reads through weight, shape and space
rather than through colour. The way to find out whether that is true is to build
it with one accent, a grey ramp, and nothing underneath holding it up — so
`app.css` styles plain markup and reads layer 2 exclusively. No hex, no pixel
that is not a token.

`recepta-book` runs this same design with the CoreUI adapter, which is what the
school looks like once a library is involved.

## What the contrast gate caught

`pen-600` on white measured **4.39:1** — six hundredths under the floor — so the
solid accent sits at `pen-700` and every interaction state moved up a step with
it. That is worth stating because it is invisible by eye: the two blues are
indistinguishable side by side, and one of them fails.

The dark theme was not written. `derive.dark()` generated it from the light map
and it passed the same gate on the first build, worst pair 7.57:1.

## The secondary button is grey, and that is the school

Not a fallback, not "we had no second colour". A supporting action tinted with
the accent puts two blues on a page whose entire premise is that there is one.
`secondaryAction: neutral` in `DESIGN_LANGUAGE.md`; layer 3 needs no override
because the school already implies it.

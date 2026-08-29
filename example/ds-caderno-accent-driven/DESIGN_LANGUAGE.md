---
toolVersion: 0.4.0

archetype: editorial-premium
archetypeNote: ~

density: comfortable
platform: mobile-first

radius: subtle
elevation: borders
elevationCarrier: border-color

accessibility: AA
statusColours: traditional

# The load-bearing line. One accent carries every interactive job; everything
# else is a position on the paper ramp.
colourStrategy: monochrome

# In this school it is the default rather than a choice: a supporting action
# tinted with the accent puts two blues on a page whose premise is that there
# is one.
secondaryAction: neutral

# --- Accent-driven follow-ups ------------------------------------------------
# Asked only when colourStrategy is monochrome. Both were decisions the
# generator used to make silently.

# high | low. Whether the solid accent is saturated enough to need light ink on
# it, or stays pale enough to keep dark ink.
accentContrast: high

# 0 = true grey, 1 = the seed pigment at full strength. How much colour is in
# the neutrals. This is the number that separates a notebook from a dashboard.
neutralPigment: 0.7

# lines | tones | shadows. How one surface is told from the next.
surfaceSeparation: lines

voice: warm
voiceExceptions:
  - technical for save failures and lost drafts
ctaMood: imperative

deviations: []

overrides:
  - decision: page sits at paper 100, not the lightest step
    because: two lighter steps have to stay above it, or a card reads as a hole cut in the sheet rather than as paper resting on paper
---

<!-- example/ds-caderno-accent-driven/DESIGN_LANGUAGE.md -->

# Caderno — design language

A recipe notebook. The user's own writing is the content and the interface is
the paper it sits on.

## The school

**Accent-driven** (also called monochrome, or minimalist). Two pigments in, and
everything else is computed:

```scss
$paper: ramp.neutral(#8a7355, $pigment: 0.7);
$pen:   ramp.chromatic(#005bac);
```

That is the whole palette. Layer 2 maps onto those two ramps by ladder position
— canvas takes a light step, body text a dark one, borders the middle — and
because the mapping is positional rather than a set of independent decisions,
changing a pigment moves the entire system without editing a semantic token.

The functional school cannot work this way and should not try: its layer 1 is
several independently chosen hues, and which hue plays which role IS the design.

## Why "minimalist" is about the tokens, not the interface

The term describes the token architecture — do not paint the screen with five
brand colours at once — and says nothing about personality. This product has
plenty: it comes from the pigment in the neutrals, the serif headings, and a
script face for the user's own notes. What the structure guarantees is that the
interface never competes with a recipe.

## The three exceptions to "one colour"

1. **Status.** A destructive confirmation is red in Vercel too. "One accent"
   governs the interface — what acts, what is chosen, where text goes — not the
   four colours that carry meaning a shape cannot.
2. **`info` is not one of them.** Informational is the interface talking, so it
   takes the interface's colour rather than a fifth hue nobody asked for.
3. **Photographs.** The colour on a recipe page comes from the food. That is
   the whole reason the interface stays out of the way.

## Elevation

Borders, not shadows. A ruled page separates blocks with lines. The two shadow
tokens exist for the two things that genuinely float above the sheet — a modal
and a dropdown — and nothing else uses them.

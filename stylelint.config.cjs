/**
 * Layer boundaries are a convention until something enforces them. Six months
 * in, someone writes `bg-indigo-600` inside a component and the foundation
 * quietly becomes decoration. These rules are the cheapest thing that prevents
 * that, and they are the reason the architecture survives contact with a team.
 */
module.exports = {
  rules: {
    /* No literal colours outside layer 1. Layer 1 is SCSS, so in practice this
     * bans literal colours from every CSS and SCSS file except _base.scss. */
    'color-no-hex': true,

    /* And no NAMED colours. `color-no-hex` only catches `#fff`, so
     * `color: white` sailed through every guard this system has — it was found
     * by reading a footer, not by any check. A keyword is a literal like any
     * other, and a white that cannot follow a theme is the same bug as a hex
     * one. */
    'color-named': 'never',
    'declaration-property-value-disallowed-list': {
      '/^(color|background|background-color|border-color|fill|stroke)$/': [
        /* `#` starts a hex colour AND a Sass interpolation. `(?!\{)` keeps the
         * rule pointed at `#fff` and off `#{component.ref-chain('chip-bg')}`,
         * which is the correct way to write a value in product SCSS.
         *
         * The bug was invisible while the lint glob only covered `src/` and
         * `app.css`: adapters interpolate constantly, but always into CUSTOM
         * PROPERTIES, and this rule only inspects real ones. The first product
         * stylesheet to set `color:` from a token tripped it — five false
         * positives, on the file that was doing it right. */
        /^#(?!\{)/,
        /^rgb/,
        /^hsl/,
        /^oklch/
      ]
    }
  },

  overrides: [
    {
      /* Stylelint 16 parses with plain CSS unless told otherwise, and every
       * `@use` and `//` comment then reads as a syntax error. */
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    },
    {
      /* Layer 1 is the only place literals are allowed. */
      /* A PRODUCT's layer 1 is its own file and gets the same exception the
       * tool's does. A brand hands over hex; the alternative was editing a
       * vendored dependency to say what your orange is. */
      files: ['src/_base.scss', 'example/**/palette.scss'],
      rules: {
        'color-no-hex': null,
        'declaration-property-value-disallowed-list': null
      }
    },
    {
      /* Application and component code may not reach past layer 2.
       *
       * Blocks:
       *   var(--app-base-*)  layer 1 primitives, if runtime emission is on
       *   var(--color-*)     Tailwind's primitive namespace — and, in practice,
       *                      every home-grown palette ever written, because
       *                      `--color-primary-main` and `--color-white` live
       *                      here too
       *   var(--bs-*)        Bootstrap's namespace
       *   var(--cui-*)       CoreUI's namespace
       *   var(--pico-*)      Pico's
       *   var(--bulma-*)     Bulma's
       *
       * The library namespaces are not decoration on this list. Application code
       * reading a library variable is backwards in two ways at once: it inverts
       * the direction the adapter exists to enforce, and it silently depends on
       * a name the library is free to rename or drop. A real case, caught in a
       * consuming product: a nav component read `--cui-nav-link-hover-bg`, a
       * variable CoreUI neither declares nor consumes, so it resolved to
       * whatever a stale theme file happened to set — the ACTION colour, on a
       * component whose chosen state was the SELECTED colour.
       *
       * If a value is needed that layer 2 does not expose, the correct move is
       * to add a semantic token, not to reach around it. That is a two-line
       * change and it is the moment the system learns something.
       */
      files: ['src/**/*.scss', 'app.css', 'components/**/*.{css,scss}'],
      excludedFiles: ['src/_base.scss', 'src/_semantic.scss', 'src/adapters/*.scss'],
      rules: {
        'declaration-property-value-disallowed-list': [
          {
            '/.*/': [
              /var\(\s*--app-base-/,
              /var\(\s*--color-/,
              /var\(\s*--bs-/,
              /var\(\s*--cui-/,
              /var\(\s*--pico-/,
              /var\(\s*--bulma-/
            ]
          },
          {
            message:
              'Reach only as far as layer 2. Use var(--app-<semantic-token>); ' +
              'if the token does not exist yet, add it to src/_semantic.scss.'
          }
        ]
      }
    },
    {
      /* Adapters are the one place third-party namespaces are legal — that is
       * their entire job. They may write --bs-*, --color-*, --primary, etc.,
       * and they may READ them as the last link of a fallback chain, but they
       * may never read layer 1. */
      files: ['src/adapters/*.scss'],
      rules: {
        'declaration-property-value-disallowed-list': [
          {
            '/.*/': [/var\(\s*--app-base-/]
          },
          {
            message: 'Adapters read layer 2 only, never layer 1 primitives.'
          }
        ]
      }
    }
  ]
};

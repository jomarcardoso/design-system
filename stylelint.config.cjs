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
    'declaration-property-value-disallowed-list': {
      '/^(color|background|background-color|border-color|fill|stroke)$/': [
        /^#/,
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
      files: ['src/_base.scss'],
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
       *   var(--color-*)     Tailwind's primitive namespace
       *   var(--bs-*)        Bootstrap's namespace
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
              /var\(\s*--bs-/
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

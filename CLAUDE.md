# @yokailabs/ui

A React component library: Base UI for behaviour, Tailwind v4 for the look, one neutral theme in
light and dark. New components follow the existing ones, so read Button, TextField and Dialog
before writing one, and match them.

## Layout

Each component is a folder under `src/components/`:

- `X.tsx` wraps a Base UI part, spreads the remaining props through, and takes `className` as a
  string that `cn` merges last, so the caller's class wins.
- `X.styles.ts` holds every class the component uses, in an `as const` object. No class is written
  inline in `X.tsx`; a test fails if one is.
- `X.stories.tsx` holds the stories, which are also the tests (see Testing).
- `X.test.tsx` exists only for logic a story cannot show. Most components have none.

Export the component from `src/index.ts`. Relative imports carry their extension
(`./Button.tsx`), which the build rewrites to `.js`.

## Colour

Use only the semantic tokens (`bg-surface`, `text-fg-muted`, `border-border-strong`), defined in
`src/styles/theme.css`, whose header explains the two layers. Tailwind's default palette is
removed, so `bg-gray-100` generates nothing and fails `test/classes.test.ts`.

- Never `dark:`. Every token already changes with the theme, so a component that needs another
  colour in dark mode needs a token.
- Never a literal colour (`bg-[#fff]`) or a primitive (`--yk-*`).
- A new token is registered in `@theme static`, reassigned under `.dark`, and added to a `PAIRS`
  row in `test/contrast.test.ts`, or to `EXEMPT` with its reason.

## Behaviour

Base UI is the only headless layer. Anything interactive (an overlay, menu, select, tabs, a
tooltip) starts from its Base UI part, which owns focus, keyboard handling and ARIA. Never
hand-roll those, and never add a second headless library. Style state through the attributes
Base UI sets: `data-disabled:`, `data-invalid:`, `data-open:`, `data-starting-style:`.

## Testing

Every story runs as a test in Chromium, once per theme, and axe fails it on any violation. A
story's `play` function tests behaviour the way a user meets it: find elements by role and name,
click or type, then assert what changed. Give each variant and state a story, and each
interaction a `play`.

## Seeing your work

A browser is out of reach, so look at screenshots instead. `npm run shots` saves each story,
after its `play` has run, to `shots/<theme>/<Component>--<Story>.png`. Before calling a component
done, read its PNGs in both themes and compare them with Button's and Dialog's: the same radius,
control heights, spacing and type scale, unless the task asks for something else.

## Gate

The pre-push hook runs the same checks as CI. The stories need Chromium, installed once with
`npx playwright install chromium`.

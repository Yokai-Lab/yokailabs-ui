# @yokailabs/ui

Yokai Labs' React component library: one neutral theme in light and dark, built with Tailwind v4 on
Base UI's unstyled, accessible parts. It is not published yet; `private` stays set in
`package.json` until it is.

## Use

It needs React 19 and Tailwind v4. Import the stylesheet right after Tailwind:

```css
@import 'tailwindcss';
@import '@yokailabs/ui/styles.css';
```

```tsx
import { Button } from '@yokailabs/ui';
```

The theme follows a `dark` class on `<html>`. Set it before the first paint, from an inline
script in `<head>`, or the page shows light for a frame first.

The stylesheet removes Tailwind's default palette, in the app that imports it as well as in the
library: only the semantic tokens exist (`bg-surface`, `text-fg-muted`, …). Storybook lists them
under Foundations/Colors.

## Develop

```bash
npm install
npx playwright install chromium
npm run storybook
```

Chromium is for the tests: `npm test` runs the unit tests, then every story as a test in both
themes with axe checking each one. `npm run shots` also saves a PNG of every story to `shots/`.
[CLAUDE.md](CLAUDE.md) holds the conventions.

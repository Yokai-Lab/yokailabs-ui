import { describe, expect, it } from 'vitest';

import { contrast, themes } from './theme.ts';

const TEXT = 4.5; // WCAG 1.4.3, for text at body size
const NON_TEXT = 3; // WCAG 1.4.11, for a control's boundary and the focus ring

// Which foregrounds may sit on which backgrounds. A new token joins a row here, or EXEMPT with its
// reason; the last test fails until it does one or the other.
const PAIRS: [foregrounds: string[], backgrounds: string[], minimum: number][] = [
  [['fg', 'fg-muted', 'danger-fg'], ['canvas', 'surface', 'surface-muted'], TEXT],
  [['on-primary'], ['primary', 'primary-hover'], TEXT],
  [['on-danger'], ['danger', 'danger-hover'], TEXT],
  [['border-strong', 'danger', 'focus'], ['canvas', 'surface'], NON_TEXT],
];

const EXEMPT = new Set([
  'border', // decorative: a divider or a card's edge, never a control's only boundary
  'overlay', // the scrim behind a dialog, which nothing is read against
]);

const cases = PAIRS.flatMap(([foregrounds, backgrounds, minimum]) =>
  foregrounds.flatMap((fg) => backgrounds.map((bg) => [fg, bg, minimum] as const)),
);

describe.each(Object.entries(themes()))('%s theme', (_, tokens) => {
  const colour = (name: string) => {
    const value = tokens.get(`--color-${name}`);
    if (value === undefined) throw new Error(`no --color-${name} token`);
    return value;
  };

  it.each(cases)('%s on %s reaches %d:1', (fg, bg, minimum) => {
    expect(contrast(colour(fg), colour(bg))).toBeGreaterThanOrEqual(minimum);
  });
});

it('checks or exempts every token', () => {
  const covered = new Set([...PAIRS.flatMap(([fgs, bgs]) => [...fgs, ...bgs]), ...EXEMPT]);
  const unchecked = [...themes().light.keys()]
    .map((name) => name.replace('--color-', ''))
    .filter((name) => !covered.has(name));
  expect(unchecked).toEqual([]);
});

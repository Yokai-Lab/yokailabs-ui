import { __unstable__loadDesignSystem } from '@tailwindcss/node';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// Tailwind v4 emits nothing for a class it does not know: a typo, a removed token, or a default
// palette colour such as `bg-slate-50`. Types, lint and a render all stay green while the colour
// silently disappears, so this asks Tailwind itself about every class a component uses.

const styles = import.meta.glob<Record<string, unknown>>('../src/**/*.styles.ts', { eager: true });
const components = import.meta.glob<string>(['../src/components/**/*.tsx', '!**/*.stories.tsx'], {
  eager: true,
  query: '?raw',
  import: 'default',
});

function classStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (typeof value === 'object' && value !== null) return Object.values(value).flatMap(classStrings);
  return [];
}

const classesByFile = Object.entries(styles).map(
  ([file, module]) =>
    [file, [...new Set(classStrings(module).flatMap((s) => s.split(/\s+/).filter(Boolean)))]] as const,
);

// Marked unstable, but it is the loader prettier-plugin-tailwindcss and Tailwind's editor extension
// build on. `candidatesToCss` answers null for a class that generates nothing.
const tailwind = await __unstable__loadDesignSystem(`@import 'tailwindcss';\n@import './src/styles/index.css';`, {
  base: resolve(import.meta.dirname, '..'),
});

describe.each(classesByFile)('%s', (_, classes) => {
  it('uses only classes Tailwind generates', () => {
    const css = tailwind.candidatesToCss([...classes]);
    expect(classes.filter((_, i) => css[i] === null)).toEqual([]);
  });

  it('takes colours only from semantic tokens', () => {
    const literal = /\[(#|rgb|hsl|oklch|oklab|lab\(|lch|color:)|--yk-/;
    expect(classes.filter((c) => literal.test(c))).toEqual([]);
  });

  it('leaves dark mode to the tokens', () => {
    expect(classes.filter((c) => c.includes('dark:'))).toEqual([]);
  });
});

// The checks above only see *.styles.ts, so a class written inline in a component escapes them.
it.each(Object.entries(components))('%s keeps its classes in its styles file', (_, source) => {
  expect(source).not.toMatch(/className=(["'`]|\{\s*["'`])/);
});

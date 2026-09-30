import type { Meta, StoryObj } from '@storybook/react-vite';

import theme from '../styles/theme.css?raw';

// Read from the stylesheet, so a new token shows up here without editing this file.
const tokens = [...new Set([...theme.matchAll(/^\s*(--color-[\w-]+):/gm)].map(([, name]) => name))];

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

export const Semantic: StoryObj = {
  render: () => (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4">
      {tokens.map((token) => (
        <li key={token} className="flex items-center gap-3">
          <span className="size-10 shrink-0 rounded-md border border-border" style={{ background: `var(${token})` }} />
          <code className="text-sm text-fg">{token.replace('--color-', '')}</code>
        </li>
      ))}
    </ul>
  ),
};

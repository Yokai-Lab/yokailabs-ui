import './preview.css';

import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: { title: 'Theme', icon: 'mirror', items: ['light', 'dark'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, { globals }) => {
      // On <html> rather than a wrapper: a Dialog portals out of any wrapper, and the tokens are
      // reassigned on `.dark`, so the page itself has to carry the class.
      document.documentElement.classList.toggle('dark', globals.theme === 'dark');
      return <Story />;
    },
  ],
  parameters: {
    layout: 'centered',
    // A violation fails the story's test instead of only showing in the panel. The whole body is
    // checked, because a Dialog renders outside the story's root.
    a11y: { test: 'error', context: 'body' },
  },
};

export default preview;

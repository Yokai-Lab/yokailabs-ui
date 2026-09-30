import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig, type TestProjectInlineConfiguration } from 'vitest/config';

import viteConfig from './vite.config.ts';

// Every story is a test, run in a real browser once per theme, so the a11y check sees each
// theme's actual colours.
function stories(theme: 'light' | 'dark'): TestProjectInlineConfiguration {
  return {
    extends: true,
    plugins: [storybookTest({ configDir: '.storybook', initialGlobals: { theme } })],
    test: {
      name: `storybook-${theme}`,
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' }],
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  };
}

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        { extends: true, test: { name: 'unit', include: ['test/**/*.test.ts', 'src/**/*.test.{ts,tsx}'] } },
        stories('light'),
        stories('dark'),
      ],
    },
  }),
);

import { afterEach } from 'vitest';
import { page, server } from 'vitest/browser';

// `npm run shots` saves every story as it looks once its play function has run, one folder per
// theme, so an agent that cannot open a browser can still look at what it built.
if (import.meta.env.VITE_SHOTS) {
  afterEach(async ({ task }) => {
    const theme = task.file.projectName?.match(/^storybook-(\w+)/)?.[1];
    const file = task.file.name.split('/').pop()?.replace('.stories.tsx', '');
    const story = task.name.replaceAll(/\W+/g, '-');
    await page.screenshot({ path: `${server.config.root}/shots/${theme}/${file}--${story}.png` });
  });
}

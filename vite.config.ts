import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Storybook's Vite builder loads this file too, so both it and the tests compile Tailwind.
export default defineConfig({
  plugins: [tailwindcss()],
});

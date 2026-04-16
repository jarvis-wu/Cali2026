// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Set site to your GitHub Pages URL: https://<your-username>.github.io/<repo-name>
// If deploying to Netlify/Vercel, you can remove the site and base fields.
export default defineConfig({
  site: 'https://jarvis-wu.github.io',
  base: '/Cali2026/',
  integrations: [mdx()],
});
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pkg from './package.json';

// https://astro.build/config
export default defineConfig({
  outDir: 'build/app',
  site: pkg.author.url,
  integrations: [mdx(), sitemap()],
});

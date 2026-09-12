// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';
import { safeSync } from './scripts/sync-substack.mjs';

// Pull Substack posts at build time, regardless of how astro is invoked (CI included)
const substackSync = {
  name: 'substack-sync',
  hooks: {
    'astro:config:setup': async () => {
      await safeSync();
    },
  },
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://zhumorui.github.io',
  // Legacy Jekyll URLs
  redirects: {
    '/repositories': '/projects',
    '/blog': '/posts',
    '/blog/2025/vggt-visual-geometry-grounded-transformer': '/posts/substack-vggt-visual-geometry-grounded-transformer',
  },
  integrations: [substackSync, mdx(), sitemap()],
});
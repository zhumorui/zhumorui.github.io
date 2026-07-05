// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

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
    '/blog/2025/vggt-visual-geometry-grounded-transformer': '/posts/vggt-visual-geometry-grounded-transformer',
  },
  integrations: [mdx(), sitemap()],
});
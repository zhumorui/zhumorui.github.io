# zhumorui.github.io

Personal academic homepage of Morui Zhu, built with [Astro](https://astro.build) on the [Academic Portfolio Astro](https://github.com/rubzip/academic-portfolio-astro) theme.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build to dist/
npm run preview
```

## Content

All content lives in `src/content/` as Markdown/MDX:

- `bio.md` — about page + news
- `cv.md` — CV
- `publications/*.md` — papers
- `projects/*.md` — repositories
- `posts/*.{md,mdx}` — blog posts (MDX posts can embed components)

Site-wide settings are in `src/config/` (navigation, socials, page titles).

## Interactive WebGPU/Three.js demos

Demos are standalone Vite apps built to static files and served from `public/demos/<name>/`, embedded in MDX posts via the lazy-loading `src/components/DemoEmbed.astro` component:

```mdx
import DemoEmbed from "../../components/DemoEmbed.astro";

<DemoEmbed src="/demos/aurora/" title="Aurora Simulation" />
```

To update the aurora demo after changing `../aurora_simulation`:

```bash
./scripts/update-demo.sh          # rebuilds with --base=./ and rsyncs dist/
```

## Deployment

Pushed to `master` → GitHub Actions (`.github/workflows/deploy.yml`, `withastro/action`) builds and deploys to GitHub Pages. The repo's Pages source must be set to "GitHub Actions".

Legacy static pages (e.g. `/m3cad/`) are kept verbatim under `public/` so their URLs never change.

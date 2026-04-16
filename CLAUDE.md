# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server at localhost:4321
npm run build     # Build static site to dist/
npm run preview   # Preview the built site locally
```

## Architecture

This is an **Astro v6** static site for a road trip journal, using **MDX** for content.

### Content authoring
Each day of the trip is a single `.mdx` file in `src/content/days/`. To add a new day, create `day-04.mdx` (etc.) with the required frontmatter:

```mdx
---
title: "Day 4: Joshua Tree"
date: "June 15, 2026"
miles: 180
heroImage: "/images/day4-hero.jpg"   # optional
summary: "Boulders, Joshua trees, and a starry night."
---

import YoutubeEmbed from '../../components/YoutubeEmbed.astro'
import MapEmbed from '../../components/MapEmbed.astro'
import ImageGrid from '../../components/ImageGrid.astro'

Your markdown content here...

<MapEmbed src="https://www.google.com/maps/embed?pb=..." />
<YoutubeEmbed id="YOUTUBE_VIDEO_ID" />
<ImageGrid columns={2} images={[{ src: "/images/...", alt: "...", caption: "..." }]} />
```

Days are sorted alphabetically by filename, so `day-01`, `day-02`, etc. determines order.

**MDX comment syntax:** Use `{/* comment */}` not `<!-- comment -->`.

### Content collection
`src/content.config.ts` — defines the `days` collection schema (Astro v6 format with `glob` loader).

### Routing
- `/` → `src/pages/index.astro` — overview/landing with a card grid of all days
- `/days/[slug]` → `src/pages/days/[slug].astro` — individual day pages (uses `render()` from `astro:content`)

### Layout & components
- `src/layouts/DayLayout.astro` — shared shell for all day pages (sidebar + hero + prose)
- `src/components/Sidebar.astro` — fixed left sidebar; highlights active day; mobile hamburger toggle
- `src/components/DayNav.astro` — ← prev / next → bottom navigation bar
- `src/components/YoutubeEmbed.astro` — responsive YouTube iframe, prop: `id` (video ID)
- `src/components/MapEmbed.astro` — Google Maps iframe, props: `src`, `height` (px, default 450)
- `src/components/ImageGrid.astro` — photo grid, props: `images[]`, `columns` (2 or 3)

### Styles
`src/styles/global.css` — imported by both layouts. Defines `.prose` typography, `.tip` callout box, and responsive breakpoints. Accent color is `#e35d2b`.

### Deployment (GitHub Pages)
1. Uncomment and fill in `site` and `base` in `astro.config.mjs` with your GitHub username and repo name.
2. Push to GitHub, enable Pages in repo Settings → Pages → Source: GitHub Actions.
3. `.github/workflows/deploy.yml` handles the rest automatically on every push to `main`.

For **Netlify**: connect the repo, set build command `npm run build`, publish directory `dist/`. No config changes needed.

### Images
Place images in `public/images/` and reference as `/images/filename.jpg` in frontmatter or ImageGrid props.

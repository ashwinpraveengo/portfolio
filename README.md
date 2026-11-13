# G O Ashwin Praveen — Portfolio

An immersive, animated Next.js portfolio: real-time WebGL hero, smooth scrolling,
scroll-driven storytelling and 3D interactions throughout.

## Tech Stack
- **Next.js 16** (static export, pages router)
- **three.js** — custom GLSL shaders for the hero orb, particles and orbit rings
- **GSAP + ScrollTrigger** — intro timelines, scroll reveals, pinned horizontal projects
- **Lenis** — smooth scrolling synced to GSAP
- **CSS Modules** with theme tokens (dark / light)
- **Google Fonts** — Syne, Instrument Serif, DM Sans, JetBrains Mono

## What's inside
- Preloader with counter and shutter reveal
- WebGL hero: noise-morphing iridescent orb, wireframe cage, orbit rings with satellites,
  particle belt and starfield, all reacting to the pointer and scroll
- Masked character reveals, scramble-text role rotator, count-up stats
- Holographic 3D-tilt photo card, scroll-scrubbed manifesto, rotating badge
- Velocity-reactive marquee bands
- Draggable 3D skills globe (canvas)
- Scroll-drawn experience timeline
- Pinned horizontal project gallery with 3D tilt cards and parallax
- Pointer spotlight cards, magnetic buttons, custom cursor
- Circular view-transition theme switch, live local clock, scroll progress bar
- Respects `prefers-reduced-motion`, falls back gracefully without WebGL

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Build

```bash
npm run build   # static site in /out
```

## Deploy

- **Vercel**: import the repo and deploy — zero config.
- **Netlify**: build command `npm run build`, publish directory `out`.
- **GitHub Pages**: push the contents of `/out` to a `gh-pages` branch.

## Customization

All content lives in `data/portfolio.config.js`:
- `personal` — name, hero lines (`displayName`), rotating `roles`, contact details
- `about`, `headings` (wrap a word in `*asterisks*` for the accent serif), `marquee`
- `skills`, `experience`, `projects`, `achievements`, `organizations`, `education`
- `sections` — toggle any section (including the preloader) on or off

Theme colors are CSS variables at the top of `styles/globals.css`
(`:root` for dark, `[data-theme='light']` for light). The 3D scene and skills
globe read the same variables, so changing `--accent` recolors everything.

Your photo is `public/photo.jpg`.

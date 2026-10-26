# ERIKA — PORTFOLIO

A cinematic, streaming-inspired portfolio for **Erika Fatimatul Hidayanti**: Data Analyst and Data Science undergraduate.
Every section is an episode, every project is an Original, and the whole site plays like a streaming show.

> A personal portfolio with a fictional streaming-platform look. It is not affiliated with Netflix or any other streaming service and uses none of their logos.

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Production build:

```bash
npm run build
npm run preview
```

The static site is written to `dist/` and can be deployed as-is to Vercel, Netlify, GitHub Pages or any static host.

## Updating the content

**All content lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).** It was generated from the CV and project portfolio, and every component reads from it.

| To change… | Edit |
| --- | --- |
| Name, intro, email, LinkedIn, Instagram | `profile` |
| A project, or a new one | `projects` (add an object; it appears in Originals, the overlay, the resume sheet and the counts) |
| Highlights section (numbered cards) | `topPicks` |
| Achievements list on the resume sheet | `achievements`, `certifications` |
| Skills and their "where it's used" notes | `skillCategories`, `skillEvidence` |
| My Journey chapters and their documentation photos | `journey` |
| ▶ Play Intro highlight reel | `introSlides` |
| Order of the sections | `sectionOrder` |
| Opening studio card text | `profile.originalLabel` |

**Resume:** replace `public/assets/Erika_Fatimatul_Hidayanti_CV.pdf`.

**Photo:** replace `pic1.jpeg` (high-res photo) and `pic.png` (background-removed cutout with the same framing), then run:

```bash
npm run images
```

This rebuilds the responsive WebP portraits and the social share image in `public/assets/`.

## What's inside

```
src/
  data/portfolio.ts        ← single source of truth (from the resume)
  App.tsx                  ← stages: opening → home; overlays
  components/
    OpeningSequence        ← black → studio card → ERIKA → PORTFOLIO → portrait → ▶ PLAY
    Navbar                 ← hide-on-scroll nav, mobile menu
    Hero                   ← billboard: parallax portrait, particles, light streaks, floating chips
    PlayIntro              ← ▶ Play Intro: zoom into portrait → highlight reel (pause, ← →, tap zones)
    ContinueWatching       ← cards with real "watched" progress bars
    About                  ← The Pilot
    Journey                ← My Journey: tabs + auto-scrolling documentation rail
    Originals / ProjectCard← pinned horizontal sequence on desktop, swipe rail on touch
    ProjectModal           ← full-screen project overlay with a shared-element transition
    Skills                 ← skill genres; each card shows where the skill appears
    TopPicks               ← Highlights: numbered, auto-scrolling cards (impact numbers + awards)
    ResumeViewer/ResumeModal ← designed resume sheet, PDF viewer, download
    FinalCTA               ← TO BE CONTINUED… + contact links
    CustomCursor, fx.tsx   ← cursor states, magnetic buttons, 3D tilt, text reveals, particles
  hooks/                   ← Lenis smooth scroll + scroll lock, media queries, watch progress
scripts/build-images.mjs   ← portrait/share-image pipeline (sharp)
```

**Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion 11, Lenis.

## Accessibility and performance

- `prefers-reduced-motion` is respected: smooth scroll, the custom cursor, tilt, particles, grain and the pinned horizontal scroll turn off, and the opening jumps straight to its final frame.
- Hover effects only run on devices with a precise pointer. Touch devices get tap interactions and native swipe rails.
- The custom cursor appears only with a mouse or trackpad.
- Overlays close with Esc, and the highlight reel supports Space and the ← → keys.
- Portraits are responsive WebP files (25–90 KB). Overlays are code-split, and particles pause when they're off screen.

## Keyboard shortcuts

- **Opening:** Enter or Esc skips it.
- **Play Intro:** Space pauses, ← and → change slides, Esc closes.
- **Project and resume overlays:** Esc closes.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Yashvi Bhatt — a static site built with pure HTML, CSS, and vanilla JavaScript (no frameworks, no build tools, no bundler).

## Development

No build step required. Open any `.html` file directly in a browser, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

There are no tests, linters, or CI pipelines configured.

## Architecture

**Pages** (all top-level HTML files sharing the same nav/footer):
- `index.html` — Home page with hero, career timeline, market ticker, and animated background chart
- `work.html` — Case studies (Before → After → What I Shipped format)
- `services.html` — Service tiles
- `writing.html` — Writing/artifacts gallery
- `about.html` — Bio + sidebar (education, certs, skills)
- `contact.html` — Contact form (job-seeking primary)
- `experience.html` — Work experience timeline

**Styles:** Single stylesheet at `css/style.css`. Uses CSS custom properties defined in `:root` for theming (dark mode only). No preprocessor.

**JavaScript** (all vanilla, no modules):
- `js/main.js` — Shared across all pages: mobile nav, active link detection, scroll animations (IntersectionObserver fade-ins), cursor spotlight effect, hero text scramble, live clock, CFA countdown, Finnhub market ticker, and hero background canvas chart
- `js/chatbot.js` — Portfolio chatbot that answers questions in first person as Yashvi. Routes queries through small talk, portfolio knowledge base, and general KB
- `js/portfolio-data.js` — Structured data (`PORTFOLIO` global object) used by the chatbot: bio, education, certifications, work experience, projects, skills

**Assets:** `assets/images/` for images, `assets/documents/` for resume PDF (placeholder).

## Design System

All design tokens live in `css/style.css` `:root`:
- Background: `#0F0F0F` / `#161616` / `#1E1E1E`
- Text: `#F0F0F0`, muted: `#8A8A8A`
- Accent: `#7EB8F7` (electric blue)
- Font: Space Grotesk (loaded from Google Fonts)
- Max content width: `1100px`

## Key Patterns

- Each page has page-specific `<style>` blocks in the `<head>` for layout unique to that page; shared styles are in `style.css`
- The Finnhub API key is hardcoded in `js/main.js` (line ~257) — treat as a free-tier public key
- The chatbot uses a global `PORTFOLIO` object from `portfolio-data.js` as its knowledge base; update that file when bio/project/experience data changes
- All animations use IntersectionObserver for scroll-triggered reveals; new sections should add the appropriate CSS classes (see `fade-in-section` pattern in `main.js`)

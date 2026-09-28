# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static single-page personal portfolio for Chandrasekar P. Plain HTML/CSS/vanilla JS — no build step, package manager, framework, linter, or tests. Original design: warm "paper" light theme with a dark-mode toggle, vermilion accent, bento-grid hero. Fonts from Google Fonts: Manrope (UI), Instrument Serif (italic accent words in `<em>`), JetBrains Mono (labels).

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```
python -m http.server 8000
```

Deployed on GitHub Pages at https://chandrasekar1996.github.io/portfolio/ (no custom domain — a `CNAME` was added and later deleted).

`README.md` repeats the section list, feature highlights and project structure, and shows light/dark screenshots from `images/readme/`. Update it when those change.

## Architecture

The live site is only three files:

- `index.html` — all content. Sections: `#top` (bento hero), `#services`, `#work`, `#experience`, `#skills`, `#education`, `#contact`. Nav links in `#nav-links` point at these ids and `js/site.js` highlights the one in view, so a new section needs both an id and a nav link.
- `css/site.css` — all styles. Theme tokens are CSS custom properties on `:root`; dark values are defined twice (under `@media (prefers-color-scheme: dark)` with `:root:not([data-theme='light'])`, and under `:root[data-theme='dark']`) — keep both blocks in sync when changing a colour. `--invert-*` tokens drive the always-inverted contact card. Breakpoints: 1024px, 860px (mobile menu, single-column cards), 560px. `prefers-reduced-motion` disables all animation.
- `js/site.js` — theme toggle (persists to `localStorage` key `theme`; an inline script in `<head>` applies it before paint), mobile menu, active-nav highlighting, IST live clock, scroll reveal, copy-email button, and the contact form.

Conventions that span files:
- The hero bento is laid out with `grid-template-areas` on `.bento`; each tile's `grid-area` is set by its class (`tile-intro`, `tile-badge`, `tile-time`, `tile-years`, `tile-accent`, `tile-stack`, `tile-social`). Areas are redefined per breakpoint.
- Add class `reveal` to anything that should fade up on scroll.
- Infinite marquees (`.chip-track`, `.marquee-track`) contain their items twice and animate to `translateX(-50%)`; keep the duplicated set identical.
- Project visuals in `#work` are CSS/inline-SVG mockups (no images).
- Experience entries are native `<details>` elements.

## Resume

`resume/Chandrasekar P.pdf` is the owner's own resume (supplied by them, not generated here). It is linked with the `download` attribute from the nav, hero, contact card and footer, and the contact card also has a "View" link. To update it, replace the file and keep the same name. Don't generate or rewrite the resume. Keep the experience, skills and certifications in `index.html` in sync with it, and update the "Updated <month>" text in `.cv-sub`.

## Contact

No backend. The form in `#contact` validates name/email/message, then builds a `mailto:chandrasekar1996@gmail.com` URL with the chosen topic in the subject and opens the visitor's email app. Change the recipient in `site.js` (`TO`) and in the `mailto:` links in `index.html`.

## Files

The repo is trimmed to only what the site uses — the original jQuery/Bootstrap template (its vendor `js/`, `css/`, `fonts/`, stock `images/`, `contact.php` and `thank-you.html`) has been removed. What remains: `index.html`, `css/site.css`, `js/site.js`, `resume/Chandrasekar P.pdf`, the three favicons in `images/` (`favicon.svg`, `favicon.png`, `apple-touch-icon.png`; the PNGs are exported from the SVG), `images/readme/` (README screenshots), and the two docs. Don't reintroduce vendor libraries — the site is dependency-free by design.

# Personal Portfolio

Petrus Handika’s developer portfolio at https://petrushandika.com, personalized from a static reproduction of Cartooneast. Original layout, fonts and animation bundles remain, with explicitly credited reference imagery. This replaces the previous Astro/Nest application; no old backend, database, CMS, or deployment workflow remains in the current tree. Git history is retained.

## Run

Requires Python 3.9+ (no Python packages).

```sh
PORT=18440 python3 server.py
```

Open http://localhost:18440. The preview binds to loopback only and supports video byte-range requests. For static hosting, serve `public/` with directory indexes and root-relative URLs. The production artifacts are already built: no Next server or compilation is required.

## Test

Requires Node 22+ and Python.

```sh
npm ci --include=dev
npx playwright install chromium
npm test
```

Tests start their own loopback server, exercise desktop/mobile layouts, menu, brief modal, project navigation/back link, draggable profile cards and PDF download; inspect all six pages for browser errors, missing resources, image decode failures and horizontal overflow. Artworks canvas initialization is checked. YouTube embeds are blocked in automated tests and are not claimed to work offline. Generated evidence is in `tests/output/` (gitignored).

## Pages and assets

Home, Redmi Note 12, DriveX Diwali, Marketplace Creatives, Banner Refresh and Artworks are included. Media, webfonts and paper texture are stored locally. Third-party analytics were removed. Social links point to Petrus’s publicly linked accounts. Two YouTube reference embeds retain their original destinations. Source host clean project URLs had routing problems; available public `.html` documents were used instead. Local full-page navigation avoids requiring a Next RSC backend.

## Important limitations and attribution

This is a reproduction of delivered production HTML/JavaScript, **not recovered original React/TypeScript source**. The minified Next/React/Framer/WebGL bundles are retained for visual fidelity; they are not a clean editable component implementation. No original backend has been recovered.

Original design, artwork, background video and embedded brand imagery belong to Anurag Bandyopadhyay / Cartooneast and their respective rights holders. The former owner’s resume, personal footage, career/client graphics and award badge have been removed; profile copy and downloadable PDF now describe Petrus. Five detail routes are attributed visual studies, not claims of Petrus client work. Public availability is not a reuse license. No blanket license is granted to those assets. Obtain appropriate permission or replace them before publishing this as a personal portfolio. Existing third-party license notices in bundles are retained. `noindex` is included but is not access control.

See `docs/personalization.md` for current content/sources and `docs/verification.md` for historical reproduction verification scope and `docs/routes.json` for asset provenance. No claim of pixel identity across every animation time, scroll state, browser or viewport is made.

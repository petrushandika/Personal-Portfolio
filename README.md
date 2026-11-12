# Personal Portfolio

A static reproduction of the publicly served Cartooneast portfolio, preserving its original layout, fonts, animation bundles and media. This replaces the previous Astro/Nest application; no old backend, database, CMS, or deployment workflow remains in the current tree. Git history is retained.

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

Tests start their own loopback server, exercise desktop/mobile layouts, menu, brief modal, project navigation/back link, draggable video cards and PDF download; inspect all six pages for browser errors, missing resources, image decode failures and horizontal overflow. Artworks canvas initialization is checked. YouTube embeds are blocked in automated tests and are not claimed to work offline. Generated evidence is in `tests/output/` (gitignored).

## Pages and assets

Home, Redmi Note 12, DriveX Diwali, Marketplace Creatives, Banner Refresh and Artworks are included. Media, webfonts and paper texture are stored locally. Third-party analytics were removed. External social links and two YouTube embeds retain their original destinations. Source host clean project URLs had routing problems; available public `.html` documents were used instead. Local full-page navigation avoids requiring a Next RSC backend.

## Important limitations and attribution

This is a reproduction of delivered production HTML/JavaScript, **not recovered original React/TypeScript source**. The minified Next/React/Framer/WebGL bundles are retained for visual fidelity; they are not a clean editable component implementation. No original backend has been recovered.

Original design, name, artwork, video, resume and branding belong to Anurag Bandyopadhyay / Cartooneast and their respective rights holders. Public availability is not a reuse license. No blanket license is granted to those assets. Obtain appropriate permission or replace them before publishing this as a personal portfolio. Existing third-party license notices in bundles are retained. `noindex` is included but is not access control.

See `docs/verification.md` for exact verification scope and `docs/routes.json` for asset provenance. No claim of pixel identity across every animation time, scroll state, browser or viewport is made.

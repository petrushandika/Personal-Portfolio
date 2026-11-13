# Petrus Handika Portfolio

Editable Next.js App Router + React + TypeScript implementation of the existing portfolio design. Layout, local fonts/media, text and the winding logo journey are retained. This is no longer a wrapper around the captured Next runtime: routes and interactions are React source under `app/` and `components/`.

## Development

Node >=20.9 required. Install development dependencies explicitly when the environment sets NODE_ENV=production.

```sh
npm ci --include=dev
npm run dev
npm run typecheck
npm run build
npm start
```

Production build is a Next static export in `out/`. Preview serves it on127.0.0.1:18440 with range support. No NestJS backend is needed: there are no application API, database, account or write operations in this portfolio. Add a backend only when actual product requirements need one.

## Verification

```sh
npm test
TEST_URL=https://petrushandika.com npm test
```

`npm test` starts an isolated preview18443 and checks five project pages on desktop/mobile, homepage folder/brief controls, screenshot lightboxes, assets/overflow and five legacy aliases. Original study-specific suites are historical; they are not current content acceptance tests.

`npm run build` writes `out/manifest.json` and compatible `.html` project aliases. `scripts/deploy.py` verifies clean and pushed HEAD, builds/tests, deploys static export to a new Nginx release, checks hashes/public routes. Previous release remains available for rollback.

## Content and rights

Profile sources and verified wording: `docs/personalization.md`. Five selected projects now use actual Mac-local screenshots and verified contribution commits; see `docs/projects.md` and `docs/captures.json`. Employer work is scoped team contribution, not sole authorship. Original third-party artwork/design rights are retained; public availability is not a licence. Existing third-party library notices remain. `noindex,nofollow` remains unchanged, not access control.

Historical `docs/evidence` and mirror manifest describe earlier releases, not the generated current Next build. Current artifact manifest is generated in `out/`.

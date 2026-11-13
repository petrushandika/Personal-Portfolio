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
TEST_URL=http://127.0.0.1:18440 npm run test:identity
TEST_URL=http://127.0.0.1:18440 node tests/interactions.mjs
TEST_URL=http://127.0.0.1:18440 node tests/details.mjs
TEST_URL=http://127.0.0.1:18440 node tests/export.mjs
PARITY_URL=http://127.0.0.1:18440 PARITY_LABEL=after node tests/parity.mjs
```

`npm test` starts its own isolated preview18441 and tests6routes ×2viewports. Identity suite requires an already running preview. Parity script captures20page/section states; compare same viewport and paused video frame to a separately captured baseline. Dynamic animation frames are not claimed universally pixel-identical. YouTube is externally dependent and blocked in automated runs.

`npm run build` writes `out/manifest.json` and compatible `.html` project aliases. `scripts/deploy.py` verifies clean and pushed HEAD, builds/tests, deploys static export to a new Nginx release, checks hashes/public routes. Previous release remains available for rollback.

## Content and rights

Profile sources and verified wording: `docs/personalization.md`. Five detail routes remain explicitly credited visual studies pending the separate real-project screenshot work. Original third-party artwork/design rights are retained; public availability is not a licence. Existing third-party library notices remain. `noindex,nofollow` remains unchanged, not access control.

Historical `docs/evidence` and mirror manifest describe earlier releases, not the generated current Next build. Current artifact manifest is generated in `out/`.

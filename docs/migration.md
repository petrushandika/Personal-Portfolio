# Next.js source migration

Baseline: personalized release `643ee045a4c3ac77e3217bb549a0dc510d4e82de`.

## Architecture

App Router renders genuine editable React/TypeScript components. Legacy captured public/_next runtime and captured HTML are removed; Next generates static HTML, chunks and five .html compatibility aliases into out. Original CSS, fonts and local artwork/video are retained for layout continuity. Build output is not source-controlled. No API, account, database or write requirement exists, so a Nest backend is deliberately not added.

Registry checked at implementation: Next16.4.6, React19.3.1, TypeScript7.0.2; exact dependencies are pinned in package-lock.json. These are verification-time versions, not a promise to remain latest forever.

## Verification scope

- Production build and strict TypeScript completed.
- Six routes on desktop/mobile: twelve behavior scenarios.
- Twelve identity scenarios.
- Separate interaction suite exercises carousel buttons/keyboard, workflow zoom-correct drag, pointer cleanup, portal dialog/Escape, actual WebGL draw/readPixels, wheel updates, and forced WebGL-unavailable image fallback.
- Detail suite exercises colour lightbox, exploration deck and both marketplace sliders on desktop/mobile.
- Export suite checks artifact hashes, five HTML aliases, noindex metadata and video range206.
- Paused-video baseline comparison: 18 of20 captured section/page-top screenshots equal at1440/390 widths. The2Artworks states differ; dynamic WebGL frames are not asserted pixel-identical. This is not a full-page or every-state pixel guarantee.
- Dependency audit reported zero vulnerabilities; app/components/scripts secret scans reported no leaks.

Engineering Journey keeps the winding original logo-route raster. Existing third-party visual studies retain credits; replacing these with actual contributed-project screenshots is separate unfinished work.

## Deployment

Commit/push exact reviewed source first. scripts/deploy.py rebuilds/tests, stages out as public below a new revision release, verifies hashes before atomic promotion, and validates six public HTML responses. Promotion/smoke failure attempts rollback to the previous symlink. Failed release directories are retained for inspection; retrying the same revision requires deliberate cleanup of that specific failed release, not a broad prune.

Separate identity/detail/interactions/export suites must be run against the final export and public site; npm test alone does not include them. Existing release643ee04 is the migration rollback target. Never deploy legacy static helpers against this source architecture.

## Nonblocking follow-ups

Modal focus trapping/restoration and tighter gallery keyboard focus scoping remain accessibility improvements. Third-party YouTube embeds depend on their upstream service and are blocked during automation; offline playback is not claimed.

# Ecosystem evidence

14DAYPILOT and Astronacci are distinct brand-level case studies. Module source references come from the bounded source audit; screenshot revisions are not automatically the same as every module head.

## Inputs
- Internal bounded audit: brand-breakdown.json (KB architecture references, matched authors, non-merge commits and changed paths).
- Internal supplemental audit: brand-extra-raw.json (Ashop child repositories, CRM and membership services).
- Stored Mac-local browser receipts: auth-capture.json / capture.json per app.
- Private image provenance manifest: ecosystem-image-provenance.json (source and published hashes, explicit account-redaction rectangles). Raw private KB and source diffs are not copied into the public site.

## Capture boundaries
Admin training-program, CMS role-management, e-learning chapter-management and Strapi article screens are actual local captures with sample data. Account areas are visibly redacted, not replaced with invented UI. Blank dashboards, CMS broken-thumbnail list and Strapi soft-404 builder are excluded. Public Ashop account pages are the only successful Ashop captures; admin RBAC repair is incomplete. No production-service end-to-end claim.

## Contributions
Core modules use bounded summaries from inspected changes, not commit counts as proof of full ownership. Applications without matching author evidence are excluded from the contribution selector. Existing personal-project routes and legacy aliases remain intact.

## Work-gallery attribution
The Work section filters personal projects and organization contributions. Each listed module links to inspected author-matched commits, separately from its audited repository revision. Each screenshot declares whether it shows a changed UI area or provides application context only; a static image never proves backend behavior or end-to-end success. Private repository URLs, raw diffs, credentials and account details are not published.

`tests/work-evidence.mjs` checks referential integrity and private-link boundaries. `tests/work-filters.mjs` verifies ownership filters and visible commit evidence on desktop/mobile. These run in the normal deployment test suite.

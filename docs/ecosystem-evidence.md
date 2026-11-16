# Ecosystem evidence

14DAYPILOT and Astronacci are distinct brand-level case studies. Module source references come from the bounded source audit; screenshot revisions are not automatically the same as every module head.

## Inputs
- Internal bounded audit: brand-breakdown.json (KB architecture references, matched authors, non-merge commits and changed paths).
- Internal supplemental audit: brand-extra-raw.json (Ashop child repositories, CRM and membership services).
- Stored Mac-local browser receipts: auth-capture.json / capture.json per app.
- Private image provenance manifest: ecosystem-image-provenance.json (source and published hashes, explicit account-redaction rectangles). Raw private KB and source diffs are not copied into the public site.

## Capture boundaries
Admin training-program, CMS role-management, e-learning chapter-management and Strapi article screens are actual local captures with sample data. Account areas are visibly redacted, not replaced with invented UI. Blank dashboards, CMS broken-thumbnail list and Strapi soft-404 builder are excluded. Public Ashop account pages are the only successful Ashop captures; admin RBAC repair is incomplete. No production-service end-to-end claim.

## Frontend requirement
Only applications with frontend source are listed. Standalone Auth Service, Supervisor CLI, Ashop API, payment/accounting integrations and membership backends are excluded. QA Automation remains because its inspected tree contains web pages; the selected contribution is explicitly backend integration within that application. CMS/admin interfaces qualify. `frontend` records identify inspected paths and revisions without treating frontend presence as proof of personal UI authorship. `tests/frontend-selection.mjs` checks this selection.

## Contributions
Core modules use bounded summaries from inspected changes, not commit counts as proof of full ownership. Applications without matching author evidence are excluded from the contribution selector. Existing personal-project routes and legacy aliases remain intact.

## Work-gallery attribution
The Work section has two expandable folders, Personal and Company, with project folders inside. Navigation uses /work/, /timeline/, /about/ and /contact/ rather than URL fragments. Each listed module links to inspected author-matched commits, separately from its audited repository revision. Each screenshot declares whether it shows a changed UI area or provides application context only; a static image never proves backend behavior or end-to-end success. Private repository URLs, raw diffs, credentials and account details are not published.

`tests/work-evidence.mjs` checks referential integrity and private-link boundaries. `tests/work-folders.mjs` verifies folder membership, project links, section routes, reload and browser history on desktop/mobile. `tests/export-routes.mjs` rejects fragment URLs in exported HTML. These run in the normal deployment test suite.

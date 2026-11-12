# Verification

## Replacement

Previous main: `155e590222e6323042be61df0c75310c922d2ab9`. The previous source tree is removed in this replacement, not history-rewritten. Astro frontend, Nest backend, CMS, database code and old deployment workflow are no longer present. The production public bundle is retained rather than reconstructed as original source.

## Executed checks

- `npm test`: 12/12 page/viewport cases passed (6 routes × desktop 1440×900 and mobile 390×844).
- No page JavaScript errors, HTTP >=400 responses, decoded-image failures, or horizontal overflow in those cases.
- Homepage menu, folder expansion, brief opening/Escape dismissal, project navigation, Back to Works, draggable card rotation and PDF download exercised at both viewports.
- Artworks WebGL canvas initialized on both viewports. This does not establish complete gallery behavioral equivalence.
- Homepage reference screenshots: RGB pixel-identical at both viewports after pausing visible videos at 1 second. `hero.json` records measured results. This is not a claim about all video frames or browser engines.
- 179 inventoried dependencies/media downloaded, including webfonts, background videos, project images and paper texture. Public tree includes HTML documents plus assets.
- Fresh original `.html` project comparisons: all 10 project/viewport text and heading-geometry comparisons match. Four non-WebGL project pages are pixel-identical at both sampled viewports (8 screenshots). Artworks screenshots differ because the gallery/background animate; measured mean per-channel RGB differences are 2.2845 desktop and 10.8848 mobile out of 255, not evidence of pixel identity. See `projectpixels.json`.
- Gitleaks directory scan: no leaks found. npm audit: 0 advisories for the installed test packages. Prebuilt vendor bundles are not fully audited by npm audit.
- Python syntax compilation and Node syntax checks passed.

## Remaining boundaries

YouTube embeds need internet and were deliberately blocked during automated tests. External social links retain original destinations. Full-page project screenshot comparisons are exploratory and do not prove every interactive state or animation identical. Original personal identity/branding remains unchanged. Rights are not conveyed by public asset availability.

## Adaptations that do not redesign the UI

Supabase asset URLs now resolve to local files; analytics scripts removed; project links use full document navigation instead of a server-dependent RSC transition; Back to Works uses a normal anchor, preventing unavailable RSC prefetch calls. No typography, layout CSS, original content or animation parameters were intentionally changed.

## Hosting

The included server is a loopback development preview, not a production hardened public service. No automatic deployment to GitHub Pages or another host is configured. Serve `public/` at a domain root; root-relative URLs require an explicit base-path adaptation for a GitHub project Pages subpath.

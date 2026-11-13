# Selected projects: contribution and capture evidence

Five projects replace the previous third-party Visual Studies. Ten screenshots were captured from actual applications run sequentially on the user's Mac, through a loopback SSH forward. Original working repositories were not installed into, reset, or edited. Each capture used a separate Git archive and the already installed local dependencies. Source data: data/projects.json; screenshot hashes, routes and capture timestamps: docs/captures.json.

GitHub authenticated readback verified that each representative commit has a single parent and author login petrushandika. Account organizations discovered: AlphaAlliance, The-Aesthetics-Skin, astronacci-intl. This is a curated selection, not an exhaustive audit of every organization repository.

| Project | Source | Capture routes | Capture revision |
|---|---|---|---|
| Danaku | Personal GitHub + Learning | /, /features | d8d434f1583021c30dbfa080090f31de0d58c450 |
| Reluv | Personal GitHub + Learning | /home, /login | 6fa583afb6e16cf7849d8f4631e6b89469ecaf01 plus existing local Footer fix |
| 14DAYPILOT | astronacci-intl + Job | /, /about-us | 982858d35e235d9aa6a3c136b9e341d6f5ab5461 |
| JETFLOW / A320 | astronacci-intl + Job | /, /a320-type-rating | dae2c6b32ceb9caf72acc115b44743761955df5f |
| Scalp Analytics | Personal GitHub + Learning | /login, /register | c458f720bcb3e94327860db5e8533cde7300c5f3 |

All ten routes returned200 with no captured JavaScript exceptions or HTTP errors. External non-allowlisted requests were blocked rather than mocked. Public static fonts/Unsplash imagery were allowed. Backend URLs were set to a closed loopback endpoint. Forms were not submitted. No payments, customer records, medical analysis or production writes were performed. Screenshots prove rendered frontend UI, not full-stack production operation.

Reluv's committed Footer imports removed brand icons from Lucide1.42.0 and initially returned500. The existing uncommitted local Footer correction was copied only into the disposable capture source (SHA256 dc379fd189034be9acd83b0a62d0719e93253cb78700480fab46f9addc47ee21). This exception is disclosed on the page. Next15 projects required Node's experimental Web Storage disabled to avoid localStorage.getItem server errors; app source was unchanged.

Employee projects are team work, with only scoped contributions claimed. Private repository URLs are omitted from public pages. Existing promotional user counts, sales statistics, medical accuracy and company claims visible inside screenshots are not validated portfolio achievements. Dev indicators and source UI imperfections are retained rather than falsifying captures.

Canonical routes: /danaku/, /reluv/, /14daypilot/, /jetflow/, /scalp/. Old study routes remain compatibility aliases rendering the appropriate real project. Homepage winding-logo journey, background media and profile remain unchanged. Third-party layout/background attribution remains in historical/source documentation; old artwork is no longer used as project evidence.

Current acceptance suite: npm test (tests/projects.mjs), 10 project viewport cases, 2 homepage cases,5legacy route checks. Original study-specific suites are historical and not current content acceptance tests.

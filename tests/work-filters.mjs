import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const projects = JSON.parse(await fs.readFile('data/projects.json', 'utf8'));
const origin = process.env.TEST_URL || 'http://127.0.0.1:18443';
const browser = await chromium.launch();
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(origin + '/');
    const work = page.locator('#works');
    await work.scrollIntoViewIfNeeded();
    const list = await work.locator('[data-work-list]').boundingBox();
    assert(list.height <= 500 && list.x >= 0 && list.x + list.width <= width, 'Work list must be bounded within viewport');
    for (const [filter, label] of [['personal', 'Personal'], ['organization', 'Organization'], ['all', 'All work']]) {
      const button = work.getByRole('button', { name: label, exact: true });
      await button.click();
      assert.equal(await button.getAttribute('aria-pressed'), 'true');
      const expected = projects.filter(p => filter === 'all' || p.workType === filter);
      assert.equal(await work.locator('[data-work-list] [aria-expanded]').count(), expected.length);
      for (const project of expected) assert.equal(await work.getByRole('button', { name: project.title, exact: true }).count(), 1);
      const last = work.getByRole('button', { name: expected.at(-1).title, exact: true });
      await last.click();
      assert.equal(await last.getAttribute('aria-expanded'), 'true');
      await last.click();
      await work.locator('[data-work-list]').evaluate(el => { el.scrollTop = 0; });
    }
    await page.screenshot({path: `tests/output/projects/work-filters-${width}.png`});
    for (const project of projects) {
      await page.goto(origin + '/' + project.slug + '/');
      if (project.images.length) {
      const attribution = page.locator('.project-screenshot--hero .project-image-evidence');
      await attribution.locator('summary').click();
      assert((await attribution.innerText()).includes(project.images[0].evidence.commitShas[0]));
      } else { assert.equal(await page.getByRole('region', {name: 'Source-reviewed contribution'}).count(), 1); }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      for (const module of project.modules ?? []) {
        await page.getByRole('tab', { name: new RegExp(module.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }).click();
        const source = page.locator('.project-module-source');
        await source.locator('summary').click();
        assert((await source.innerText()).includes(module.commitShas[0]));
      }
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('PASS personal/organization filters and visible commit evidence at desktop/mobile widths');
} finally { await browser.close(); }

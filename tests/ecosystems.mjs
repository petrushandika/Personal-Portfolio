import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const origin=process.env.TEST_URL || 'http://127.0.0.1:18444';
const projects=JSON.parse(await fs.readFile('data/projects.json','utf8'));
const browser=await chromium.launch(); const results=[];
try {
 for(const width of [1440,390]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  for(const slug of ['14daypilot','astronacci']) {
   const project=projects.find(p=>p.slug===slug);
   assert(project?.modules?.length,`No ecosystem data for ${slug}`);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   assert.equal((await page.goto(origin+'/'+slug+'/')).status(),200);
   const tabs=page.getByRole('tablist',{name:'Brand products'});
   await tabs.scrollIntoViewIfNeeded();
   assert.equal(await tabs.getByRole('tab').count(),project.modules.length);
   assert((await tabs.boundingBox()).height <= 500, 'Product picker must stay bounded, not push preview below a long list');
   for(let i=0;i<project.modules.length;i++) {
    const tab=tabs.getByRole('tab').nth(i);await tab.click();
    assert.equal(await tab.getAttribute('aria-selected'),'true');
    assert.equal(await page.getByRole('tabpanel').getByRole('heading',{name:project.modules[i].name,exact:true}).count(),1);
   }
   await tabs.getByRole('tab').last().press('Home');
   assert.equal(await tabs.getByRole('tab').first().getAttribute('aria-selected'),'true');
   await tabs.getByRole('tab').first().press('ArrowDown');
   assert.equal(await tabs.getByRole('tab').nth(1).getAttribute('aria-selected'),'true');
   await page.getByRole('button',{name:'Next gallery screenshot',exact:true}).click();
   await page.locator('.project-gallery-selected__button').click();
   const dialog=page.getByRole('dialog'); await dialog.waitFor();
   await dialog.getByRole('button',{name:'Next screenshot',exact:true}).click();
   await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);
   assert.deepEqual(errors,[]);
   await tabs.getByRole('tab').first().click(); await page.locator('.project-modules').scrollIntoViewIfNeeded();
   await fs.mkdir('tests/output/ecosystems',{recursive:true});
   await page.screenshot({path:`tests/output/ecosystems/${slug}-${width}.png`});
   results.push({slug,width,modules:project.modules.length,passed:true});
  }
  await page.close();
 }
 await fs.writeFile('tests/output/ecosystems/results.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results));
} finally {await browser.close();}

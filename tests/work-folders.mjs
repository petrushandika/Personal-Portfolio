import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const projects=JSON.parse(await fs.readFile('data/projects.json','utf8'));
const origin=process.env.TEST_URL||'http://127.0.0.1:18443';
const browser=await chromium.launch();
try {
 for(const width of [1440,390]) {
  const p=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(origin+'/');await p.locator('#works').scrollIntoViewIfNeeded();
  assert.equal(await p.locator('[data-work-list] > [data-work-folder]').count(),2);
  assert.equal(await p.getByRole('button',{name:'All work',exact:true}).count(),0);
  for(const [kind,name] of [['personal','Personal'],['organization','Company']]) {
   const group=p.locator(`[data-work-folder="${kind}"]`);
   const folder=group.getByRole('button',{name,exact:true});await folder.click();
   assert.equal(await folder.getAttribute('aria-expanded'),'true');
   for(const project of projects.filter(x=>x.workType===kind)) {
    const row=group.getByRole('button',{name:project.title,exact:true});await row.click();
    assert.equal(await group.getByRole('link',{name:'Project',exact:true}).getAttribute('href'),`/${project.slug}/`);
    await row.click();
   }
   await folder.click();
  }
  for(const route of ['work','timeline','about','contact']) {
   assert.equal((await p.goto(`${origin}/${route}/`)).status(),200);
   const id=route==='work'?'works':route;
   await p.waitForFunction(id=>Math.abs(document.getElementById(id).getBoundingClientRect().top)<5,id);
   await p.reload();await p.waitForFunction(id=>Math.abs(document.getElementById(id).getBoundingClientRect().top)<5,id);
   assert.equal(new URL(p.url()).hash,'');
   assert.equal(await p.locator('a[href*="#"]').count(),0);
  }
  await p.getByRole('button',{name:'Open menu'}).click();
  await p.getByRole('link',{name:'Works',exact:true}).click();await p.waitForURL('**/work/');
  await p.getByRole('button',{name:'Personal',exact:true}).click();
  await p.getByRole('button',{name:'Danaku',exact:true}).click();
  await p.getByRole('link',{name:'Project',exact:true}).click();await p.waitForURL('**/danaku/');
  await p.getByRole('link',{name:'Back to Projects',exact:true}).first().click();await p.waitForURL('**/work/');
  await p.goBack();await p.waitForURL('**/danaku/');await p.goForward();await p.waitForURL('**/work/');
  await p.screenshot({path:`tests/output/projects/folders-${width}.png`});
  assert.deepEqual(errors,[]);await p.close();
 }
 console.log('PASS Personal/Company folders, all project links, clean routes, reload and browser history');
} finally {await browser.close();}

import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const origin=process.env.TEST_URL||'http://127.0.0.1:18442';
const browser=await chromium.launch({headless:true});
try{for(const width of [1440,390]){
 const p=await browser.newPage({viewport:{width,height:900}});p.setDefaultTimeout(15000);const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://www.youtube.com/**',r=>r.abort());
 await p.goto(origin+'/redminote12/');
 const color=p.getByRole('button',{name:'White Finish Reference',exact:true});await color.scrollIntoViewIfNeeded();await p.waitForTimeout(800);await color.click();
 const dialog=p.getByRole('dialog',{name:'Colour reference'});await dialog.waitFor();await dialog.getByRole('button',{name:'Next colour'}).click();assert.equal(await dialog.locator('img').getAttribute('alt'),'Green Finish Reference');await p.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
 await p.getByRole('button',{name:'Go to Exploration 3',exact:true}).click();await p.waitForTimeout(800);assert.equal(await p.locator('[data-active="true"]').getAttribute('data-exploration'),'3');
 await p.locator('[aria-label="Exploration deck"]').focus();await p.keyboard.press('ArrowRight');await p.waitForTimeout(800);assert.equal(await p.locator('[data-active="true"]').getAttribute('data-exploration'),'4');
 await p.goto(origin+'/marketplacecreatives/');
 for(const label of ['Lumio reference slides','Pebble reference slides']){
 const region=p.getByRole('region',{name:label});await region.scrollIntoViewIfNeeded();await region.focus();await p.waitForTimeout(800);
 await region.getByRole('button',{name:'Go to slide 1',exact:true}).click();await region.getByRole('button',{name:'Next slide',exact:true}).click();await p.waitForTimeout(800);
 assert.equal(await region.locator('button[aria-current="true"]').getAttribute('aria-label'),'Go to slide 2');
 await region.getByRole('button',{name:'Previous slide',exact:true}).click();await p.waitForTimeout(800);assert(await region.getByRole('button',{name:'Previous slide',exact:true}).isDisabled());
 }
 assert.deepEqual(errors,[]);console.log('PASS detail controls',width);await p.close();
}}finally{await browser.close();}

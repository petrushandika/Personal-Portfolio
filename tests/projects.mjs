import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {spawn, spawnSync} from 'node:child_process';
const projects=JSON.parse(await fs.readFile('data/projects.json','utf8'));
const origin=process.env.TEST_URL||'http://127.0.0.1:18443';
const server=process.env.TEST_URL?null:spawn('python3',['server.py'],{env:{...process.env,PORT:'18443'},stdio:'ignore'});
const results=[];let browser;
try{
 for(let i=0;i<50;i++){try{if((await fetch(origin)).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch();await fs.mkdir('tests/output/projects',{recursive:true});
 for(const width of [1440,390]){
 const p=await browser.newPage({viewport:{width,height:900}});const errors=[],failed=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await p.goto(origin+'/');await p.locator('#works').scrollIntoViewIfNeeded();await p.waitForTimeout(1000);
 assert.equal(await p.getByRole('heading',{name:'Selected Projects'}).count(),1);
 await p.getByText('Danaku',{exact:true}).first().click();await p.getByText('brief',{exact:true}).click();await p.waitForTimeout(1000);assert(await p.getByText('Project notes',{exact:false}).count());await p.keyboard.press('Escape');await p.getByRole('dialog').waitFor({state:'detached'});
 await p.screenshot({path:`tests/output/projects/home-${width}.png`});
 for(const project of projects){
 assert.equal((await p.goto(origin+'/'+project.slug+'/')).status(),200);
 await p.evaluate(()=>document.fonts.ready);await p.locator('.project-screenshot img').first().evaluate(i=>i.decode());
 assert.equal(await p.getByRole('heading',{name:project.title+'.',exact:true}).count(),1);
 assert.equal(await p.locator('.project-screenshot').count(),project.images.length);
 await p.locator('.project-screenshot__button').first().click();await p.getByRole('dialog').waitFor();await p.keyboard.press('Escape');await p.getByRole('dialog').waitFor({state:'detached'});
 await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>null);}));});
 const state=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}));assert.equal(state.width,state.scroll);assert.deepEqual(state.broken,[]);
 assert(!/Cartooneast|Anurag|Visual-reference study/.test(await p.locator('main').innerText()));
 await p.screenshot({path:`tests/output/projects/${project.slug}-${width}.png`,fullPage:true});results.push({slug:project.slug,width,passed:true});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await p.close();
 }
 const aliases={redminote12:'danaku',drivexdiwali:'14daypilot',marketplacecreatives:'reluv',bannerrefresh:'jetflow',artworks:'scalp'};
 for(const [alias,target] of Object.entries(aliases)){const r=await fetch(origin+'/'+alias+'/');assert.equal(r.status,200);assert((await r.text()).includes(`data-project="${target}"`));}
 for(const suite of ['tests/ecosystems.mjs','tests/interaction-regressions.mjs']) {
  const run=spawnSync(process.execPath,[suite],{env:{...process.env,TEST_URL:origin},stdio:'inherit'});assert.equal(run.status,0,`${suite} failed`);
 }
 assert.equal(results.length,projects.length*2);await fs.writeFile('tests/output/projects/results.json',JSON.stringify(results,null,2));console.log(`PASS ${results.length} project cases, 2 homepage cases, ${Object.keys(aliases).length} legacy aliases`);
}finally{await browser?.close();server?.kill();}

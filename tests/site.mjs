import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const origin=process.env.TEST_URL||'http://127.0.0.1:18441';
await fs.mkdir('tests/output',{recursive:true});
const server=process.env.TEST_URL?null:spawn('python3',['server.py'],{env:{...process.env,PORT:'18441'},stdio:'ignore'});
const results=[];let browser;
try{
 for(let i=0;i<50;i++){if(server&&server.exitCode!==null)throw Error('Preview exited: '+server.exitCode);try{if((await fetch(origin,{signal:AbortSignal.timeout(1000)})).ok)break;}catch{}if(i===49)throw Error('Preview unavailable');await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
 for(const width of [1440,390]){
  const height=width===1440?900:844;
  for(const route of ['/','/redminote12/','/drivexdiwali/','/marketplacecreatives/','/bannerrefresh/','/artworks/']){
   const page=await browser.newPage({viewport:{width,height}});const errors=[],failed=[],external=[];
   page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});page.on('request',r=>{if(!r.url().startsWith(origin)&&!r.url().startsWith('data:')&&!r.url().startsWith('blob:'))external.push(r.url());});
   await page.route('https://www.youtube.com/**',r=>r.abort());
   assert.equal((await page.goto(origin+route,{waitUntil:'domcontentloaded'})).status(),200);
   await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(route==='/artworks/'?5000:1800);
   if(route==='/'){
    await page.evaluate(async()=>{await Promise.all([...document.querySelectorAll('video')].filter(v=>v.getBoundingClientRect().width).map(v=>new Promise(resolve=>{v.pause();const seek=()=>{v.pause();v.currentTime=1;v.addEventListener('seeked',resolve,{once:true});};if(v.readyState>=2)seek();else v.addEventListener('loadeddata',seek,{once:true});setTimeout(resolve,5000);})));});
    await page.screenshot({path:`tests/output/hero-${width}.png`});
    await page.locator('header button').click();await page.waitForTimeout(900);assert.equal(await page.getByRole('link',{name:'Timeline',exact:true}).count(),1);await page.getByRole('link',{name:'Works',exact:true}).click();await page.waitForTimeout(1200);
    await page.getByText('Product Systems',{exact:true}).click();await page.getByText('brief',{exact:true}).click();await page.waitForTimeout(1200);assert.equal(await page.getByText('Petrus’s study notes',{exact:false}).count(),1);await page.keyboard.press('Escape');await page.getByText('Petrus’s study notes',{exact:false}).waitFor({state:'detached',timeout:5000});
    await page.getByText('Project',{exact:true}).click();await page.waitForURL('**/redminote12/');await page.getByRole('link',{name:'Back to Studies'}).click();await page.waitForURL('**/#works');
    await page.locator('#about').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);const card=await page.locator('#about .cursor-grab').first().elementHandle();const before=await card.evaluate(e=>e.style.zIndex);const box=await card.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.waitForTimeout(100);for(let step=1;step<=10;step++){await page.mouse.move(box.x+box.width/2+step*12,box.y+box.height/2);await page.waitForTimeout(40);}await page.mouse.up();await page.waitForTimeout(800);assert.notEqual(await card.evaluate(e=>e.style.zIndex),before);
    await page.locator('#contact').scrollIntoViewIfNeeded();const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download Resume'}).click()]);assert.equal(await download.failure(),null);
   }else{
    await page.evaluate(()=>{for(const i of document.images)i.loading='eager';});
    for(let i=0;i<5;i++){await page.evaluate(n=>scrollTo(0,document.body.scrollHeight*n/4),i);await page.waitForTimeout(250);}
    await page.evaluate(()=>Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>i.decode().catch(()=>null))));
    await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(500);
    await page.screenshot({path:`tests/output/${route.replaceAll('/','')}-${width}.png`});
    if(route==='/artworks/')assert.equal(await page.locator('canvas').count(),1);
    assert.equal(await page.getByRole('link',{name:'Back to Studies'}).count(),1);
   }
   const state=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,width:innerWidth,broken:[...document.images].filter(i=>i.getAttribute('src')&&(!i.complete||!i.naturalWidth)).map(i=>i.src)}));
   results.push({route,width,errors,failed,external:[...new Set(external)],state});await fs.writeFile('tests/output/results.json',JSON.stringify(results,null,2));
   assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);assert.deepEqual(state.broken,[]);assert.equal(state.scrollWidth,width);assert.ok(external.every(u=>u.startsWith('https://www.youtube.com/')));
   console.log('PASS',route,width);await page.close();
  }
 }
}finally{try{await browser?.close();}finally{server?.kill();await fs.writeFile('tests/output/results.json',JSON.stringify(results,null,2));}}

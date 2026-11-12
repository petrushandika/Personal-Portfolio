import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const origin=process.env.TEST_URL||'http://127.0.0.1:18440';
const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
const results=[];
try {
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/redminote12/','/drivexdiwali/','/marketplacecreatives/','/bannerrefresh/','/artworks/']){
   await page.route('https://www.youtube.com/**',r=>r.abort());
   await page.goto(origin+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1800);
   assert.match(await page.title(),/^Petrus Handika/);
   const text=await page.locator('body').innerText();
   assert.doesNotMatch(text,/Senior Visual Designer|6 years|Bangalore|anujoy006|Hey Anurag|I worked on marketplace creatives/);
   assert.match(text,/Reference imagery|Design reference/);
   assert.equal(await page.locator('a[href*="anurag19"],a[href*="lucidgrapher"],a[href*="917890574459"],a[href*="anurag-bandyopadhyay"]').count(),0);
   if(route==='/'){
    assert.equal(await page.getByRole('link',{name:'Petrus Handika',exact:true}).count(),1);
    assert.equal(await page.locator('a[href="mailto:petrushandikasinaga@gmail.com"]').count(),1);
    assert.equal(await page.locator('a[href="https://github.com/petrushandika"]').count(),1);
    assert.equal(await page.locator('#awwwards').count(),0);
    assert.equal(await page.locator('#about video').count(),0);
    const mail=await page.locator('a[href^="mailto:"]').boundingBox();assert.ok(mail.x>=0 && mail.x+mail.width<=width);
    assert.equal(await page.locator('a[href="https://github.com/petrushandika/Danaku"]').count(),1);
    assert.match(await page.locator('#timeline').innerText(),/Engineering/);
   }
   results.push({route,width,errors:[...errors]});assert.deepEqual(errors,[]);
  }
  await page.close();
 }
 await fs.mkdir('tests/output',{recursive:true});await fs.writeFile('tests/output/identity.json',JSON.stringify(results,null,2));
 console.log('Identity checks PASS',results.length);
}finally{await browser.close();}

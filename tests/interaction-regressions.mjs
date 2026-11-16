import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch();
const origin=process.env.TEST_URL||'https://petrushandika.com';
try {
 const p=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 await p.goto(origin+'/14daypilot/');
 const next=p.getByRole('button',{name:'Next gallery screenshot',exact:true});
 await next.scrollIntoViewIfNeeded();
 await p.evaluate(()=>window.scrollBy(0,-160));
 const before=await p.evaluate(()=>scrollY);
 await next.click();await p.waitForTimeout(400);
 assert(Math.abs(await p.evaluate(()=>scrollY)-before)<3,'Gallery navigation moved page vertically');
 await p.goto(origin+'/');await p.locator('#works').scrollIntoViewIfNeeded();
 const folder=p.getByRole('button',{name:'Danaku',exact:true});
 await folder.click();
 await p.waitForTimeout(35);
 const brief=p.getByRole('button',{name:'brief',exact:true});
 assert.equal(await brief.evaluate(e=>getComputedStyle(e).opacity),'1','Reduced-motion tree still animates opacity');
 assert.equal(await brief.evaluate(e=>getComputedStyle(e).transform),'none','Reduced-motion tree still animates transform');
 console.log('PASS gallery viewport stability + reduced-motion home tree');
} finally {await browser.close();}

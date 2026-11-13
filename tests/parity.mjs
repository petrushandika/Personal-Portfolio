import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const origin=process.env.PARITY_URL||'https://petrushandika.com';
const label=process.env.PARITY_LABEL||'before';
const folder=`tests/output/${label}`;await fs.mkdir(folder,{recursive:true});
const b=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});const evidence=[];
try {for(const width of [1440,390]){
 const p=await b.newPage({viewport:{width,height:width===1440?900:844}});await p.route('https://www.youtube.com/**',r=>r.abort());
 for(const route of ['/','/redminote12/','/drivexdiwali/','/marketplacecreatives/','/bannerrefresh/','/artworks/']){
  await p.goto(origin+route,{waitUntil:'domcontentloaded'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2200);
  const states=route==='/'?['home','works','timeline','about','contact']:['top'];
  for(const state of states){
   if(state!=='top')await p.locator('#'+state).scrollIntoViewIfNeeded();else await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1200);
   await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('video')].filter(v=>v.getBoundingClientRect().width&&v.readyState>=2).map(v=>new Promise(resolve=>{v.pause();if(Math.abs(v.currentTime-1)<.01)return resolve();v.currentTime=1;v.addEventListener('seeked',resolve,{once:true});setTimeout(resolve,2000)})))});
   const key=route==='/'?state:route.replaceAll('/','');await p.screenshot({path:`${folder}/${key}-${width}.png`});
   evidence.push({route,state,width,title:await p.title(),headings:await p.locator('h1,h2').evaluateAll(nodes=>nodes.map(e=>{const r=e.getBoundingClientRect();return{text:e.textContent,x:r.x,y:r.y,w:r.width,h:r.height}}))});
  }
 }await p.close();
}await fs.writeFile(`${folder}/geometry.json`,JSON.stringify(evidence,null,2));}finally{await b.close();}
console.log('Parity capture',label,evidence.length);

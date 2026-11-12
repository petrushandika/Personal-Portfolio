import {chromium} from 'playwright';import fs from 'node:fs/promises';import {spawn} from 'node:child_process';
await fs.mkdir('tests/output',{recursive:true});
const server=spawn('python3',['server.py'],{env:{...process.env,PORT:'18442'},stdio:'ignore'});let browser;const results=[];
try{
 for(let i=0;i<50;i++){if(server.exitCode!==null)throw Error('Preview exited: '+server.exitCode);try{if((await fetch('http://127.0.0.1:18442',{signal:AbortSignal.timeout(1000)})).ok)break;}catch{}if(i===49)throw Error('Preview unavailable');await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
 for(const width of [1440,390])for(const name of ['redminote12','drivexdiwali','marketplacecreatives','bannerrefresh','artworks']){
  const pair=[];
  for(const [label,url] of [['source',`https://cartooneast.in/${name}.html`],['clone',`http://127.0.0.1:18442/${name}/`]]){
   const p=await browser.newPage({viewport:{width,height:width===1440?900:844}});await p.route('https://www.youtube.com/**',r=>r.abort());
   try{
    const r=await p.goto(url,{waitUntil:'domcontentloaded',timeout:45000});if(r.status()!==200)throw Error('HTTP '+r.status());await p.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,8000))]));await p.waitForTimeout(2500);
    await p.evaluate(()=>Promise.race([Promise.all([...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight&&i.getAttribute('src')).map(i=>i.decode().catch(()=>null))),new Promise(r=>setTimeout(r,10000))]));
    const state=await p.evaluate(()=>({text:document.body.innerText,geometry:[...document.querySelectorAll('h1,h2,h3')].map(e=>({text:e.innerText,x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height,font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize}))}));
    await p.screenshot({path:`tests/output/${label}-${name}-${width}.png`});pair.push({label,status:200,state});
   }catch(e){pair.push({label,error:e.message});}finally{await p.close();}
  }
  results.push({route:name,width,pair,textMatch:pair.length===2&&!!pair[0].state&&pair[0].state.text===pair[1].state?.text,headingGeometryMatch:pair.length===2&&!!pair[0].state&&JSON.stringify(pair[0].state.geometry)===JSON.stringify(pair[1].state?.geometry)});
  await fs.writeFile('tests/output/visual.json',JSON.stringify(results,null,2));console.log(name,width,results.at(-1).textMatch,results.at(-1).headingGeometryMatch);
 }
}finally{try{await browser?.close();}finally{server.kill();}}

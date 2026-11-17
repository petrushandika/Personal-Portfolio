import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const projects=JSON.parse(await fs.readFile('data/projects.json','utf8'));
const articles=JSON.parse(await fs.readFile('data/articles.json','utf8'));
const origin=process.env.TEST_URL||'http://127.0.0.1:18443';
const canonical='https://petrushandika.com';
const routes=['/','/petrus-handika/','/blog/',...projects.map(p=>`/${p.slug}/`),...articles.map(a=>`/blog/${a.slug}/`)];
const homeLike=new Set(['/']);
const browser=await chromium.launch();
try {
 const page=await browser.newPage({javaScriptEnabled:false});
 const titles=new Set();
 for(const route of routes){
  const r=await page.goto(origin+route);assert.equal(r.status(),200);
  assert(!/noindex/i.test(r.headers()['x-robots-tag']||''));
  const robots=await page.locator('meta[name="robots"]').getAttribute('content');assert(!robots.includes('noindex'),route);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical+route);
  const title=await page.title();assert(title.includes('Petrus Handika'));assert(!titles.has(title),`Duplicate title: ${route}`);titles.add(title);
  assert((await page.locator('meta[name="description"]').getAttribute('content')).length>40);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('a[href*="#"]').count(),0);
  assert(!(await page.locator('body').innerText()).includes('`'),`Raw backtick rendered on ${route}`);
  for(const script of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(script);
  assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'),canonical+route);
 }
 await page.goto(origin+'/');
 assert(await page.locator('a[href="/petrus-handika/"]').count(),'Home must link the profile in static HTML');
 assert(await page.locator('a[href="/blog/"]').count(),'Home must link the notes in static HTML');
 await page.goto(origin+'/petrus-handika/');
 for(const project of projects) assert(await page.locator(`a[href="/${project.slug}/"]`).count(),`No crawlable project link ${project.slug}`);
 for(const article of articles) assert(await page.locator(`a[href="/blog/${article.slug}/"]`).count(),`No crawlable article link ${article.slug}`);
 for(const article of articles){await page.goto(`${origin}/${article.project}/`);assert(await page.locator(`a[href="/blog/${article.slug}/"]`).count(),`Project page lacks note link ${article.slug}`);}
 for(const [alias,target] of Object.entries({redminote12:'danaku',drivexdiwali:'14daypilot',marketplacecreatives:'reluv',bannerrefresh:'jetflow',artworks:'scalp',work:'',about:'',timeline:'',contact:''})){
  await page.goto(`${origin}/${alias}/`);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical+(target?`/${target}/`:'/'));
 }
 const sitemap=await (await fetch(origin+'/sitemap.xml')).text();
 for(const route of routes)assert(sitemap.includes(`<loc>${canonical}${route}</loc>`),route);
 assert(!sitemap.includes('/auth-service/')&&!sitemap.includes('/redminote12/'));
 const robots=await (await fetch(origin+'/robots.txt')).text();assert(robots.includes('Sitemap: '+canonical+'/sitemap.xml'));assert(!/Disallow: \/\s/.test(robots));
 const image=await fetch(origin+'/og/petrus-handika.jpg');assert.equal(image.status,200);assert(image.headers.get('content-type').startsWith('image/'));
 await page.close();
 for(const width of [390,1440]){
  const p=await browser.newPage({viewport:{width,height:900}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/petrus-handika/','/blog/',...articles.map(a=>`/blog/${a.slug}/`)]){
   await p.goto(origin+route);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),width);
   await p.screenshot({path:`tests/output/projects/seo-${route.split('/').filter(Boolean).at(-1)}-${width}.png`,fullPage:true});
  }
  assert.deepEqual(errors,[]);await p.close();
 }
 console.log(`PASS SEO: ${routes.length} indexable pages, metadata, canonical aliases, crawler links, sitemap, robots, structured data and blog layouts`);
}finally{await browser.close();}

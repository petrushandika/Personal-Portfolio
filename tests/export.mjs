import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const origin=process.env.TEST_URL||'http://127.0.0.1:18442';
const routes=['redminote12','drivexdiwali','marketplacecreatives','bannerrefresh','artworks'];
const manifest=JSON.parse(await fs.readFile('out/manifest.json','utf8'));
for(const entry of manifest){
 const bytes=await fs.readFile('out/'+entry.path);
 assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256);
}
for(const slug of routes){
 const alias=await fetch(origin+'/'+slug+'.html');
 assert.equal(alias.status,200);
 assert.equal(await alias.text(),await fs.readFile('out/'+slug+'/index.html','utf8'));
}
const home=await fetch(origin+'/');const html=await home.text();
assert.match(html,/name="robots" content="index, follow/);
assert.doesNotMatch(html,/noindex/);
const video=manifest.find(item=>item.path.endsWith('/Video/1_optimized.mp4'));
assert.ok(video);
const range=await fetch(origin+'/'+video.path,{headers:{Range:'bytes=0-1023'}});
assert.equal(range.status,206);assert.equal((await range.arrayBuffer()).byteLength,1024);
console.log(JSON.stringify({manifest:manifest.length,aliases:routes.length,indexable:true,range:206}));

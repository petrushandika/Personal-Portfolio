import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const projects=JSON.parse(await fs.readFile('data/projects.json','utf8'));
const routes=[...new Set([...projects.map(p=>p.slug),'work','timeline','about','contact','redminote12','drivexdiwali','marketplacecreatives','bannerrefresh','artworks'])];
for(const route of routes)await fs.copyFile(`out/${route}/index.html`,`out/${route}.html`);
async function files(dir){const list=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())list.push(...await files(p));else list.push(p);}return list;}
const manifest=[];
for(const file of (await files('out')).sort()){const bytes=await fs.readFile(file);manifest.push({path:path.relative('out',file),bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
await fs.writeFile('out/manifest.json',JSON.stringify(manifest,null,2));
console.log('Verified build export manifest:',manifest.length,'files');

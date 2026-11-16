import assert from 'node:assert/strict';
import fs from 'node:fs';
const projects=JSON.parse(fs.readFileSync('data/projects.json','utf8'));
for(const p of projects){
 assert(fs.existsSync(`out/${p.slug}/index.html`),`Missing route ${p.slug}`);
 assert(fs.existsSync(`out/${p.slug}.html`),`Missing flat export ${p.slug}`);
}
console.log(`PASS ${projects.length} project routes + flat exports`);

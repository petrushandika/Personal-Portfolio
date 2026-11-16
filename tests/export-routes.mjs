import assert from 'node:assert/strict';
import fs from 'node:fs';
const projects=JSON.parse(fs.readFileSync('data/projects.json','utf8'));
for(const p of projects){
 assert(fs.existsSync(`out/${p.slug}/index.html`),`Missing route ${p.slug}`);
 assert(fs.existsSync(`out/${p.slug}.html`),`Missing flat export ${p.slug}`);
}
for(const route of ['work','timeline','about','contact']) {
 assert(fs.existsSync(`out/${route}/index.html`));
 assert(fs.existsSync(`out/${route}.html`));
}
function check(dir) {
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})) {
  const path=`${dir}/${entry.name}`;
  if(entry.isDirectory()) check(path);
  else if(path.endsWith('.html')) assert(!/(?:href|src|action)="[^"]*#[^"]*"/.test(fs.readFileSync(path,'utf8')),`Hash URL in ${path}`);
 }
}
check('out');
console.log(`PASS ${projects.length} project routes, four section routes, flat exports and no hash URLs`);

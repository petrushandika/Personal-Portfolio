import assert from 'node:assert/strict';
import fs from 'node:fs';
const projects=JSON.parse(fs.readFileSync('data/projects.json','utf8'));
for(const p of projects){
 assert(p.frontend?.paths?.length,`${p.slug}: no frontend evidence`);
 assert(/^[a-f0-9]{40}$/.test(p.frontend.revision));
 for(const m of p.modules??[]) assert(m.frontend?.paths?.length,`${m.name}: service-only module`);
}
assert(!projects.some(p=>['auth-service','supervisor-cli'].includes(p.slug)));
const removed=['ashop/api-ashop','astropay','accurate','crm-astronacci/backend','go-aclub','aclub_backend'];
assert(!projects.flatMap(p=>p.modules??[]).some(m=>removed.includes(m.name)));
console.log('PASS frontend-only project selection and no standalone service modules');

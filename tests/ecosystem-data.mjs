import assert from 'node:assert/strict';
import fs from 'node:fs';
const projects = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));
const pilot = projects.find(p => p.slug === '14daypilot');
for (const name of ['compro14day-fe','typerating-compro','cmscompro','admin-14daypilot','elearning14day','cms-14daypilotjet']) {
  assert(pilot.modules?.some(m => m.name.includes(name)), `14DAYPILOT missing ${name}`);
}
const astro = projects.find(p => p.slug === 'astronacci');
assert(astro, 'Missing Astronacci ecosystem');
for (const name of ['web-ashop','admin-ashop','crm-astronacci/frontend']) assert(astro.modules.some(m => m.name.includes(name)), `Astronacci missing ${name}`);
for (const project of projects) {
  for (const image of project.images) {
    assert(image.src.startsWith('/projects/') && !image.src.includes('..'));
    assert(fs.existsSync('public' + image.src), `Missing ${image.src}`);
    assert(image.alt && image.caption);
  }
  for (const module of project.modules || []) {
    assert(module.description && module.kind);
    if (module.image) assert(project.images.some(i => i.src === module.image), `Unregistered module screenshot ${module.name}`);
    if (module.sha) assert(/^[a-f0-9]{40}$/.test(module.sha), `Malformed source reference ${module.name}`);
  }
}
console.log('PASS ecosystem data, image references, and source-reference format');

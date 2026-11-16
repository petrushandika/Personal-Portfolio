import assert from 'node:assert/strict';
import fs from 'node:fs';
const projects = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));
for (const project of projects) {
  assert(['personal', 'organization'].includes(project.workType), `${project.slug}: missing ownership group`);
  const commits = new Set(project.commits.map(c => c.sha));
  for (const commit of project.commits) {
    assert(/^[a-f0-9]{40}$/.test(commit.sha));
    assert(commit.author === 'petrushandika', `${project.slug}: missing verified identity`);
    assert(commit.summary && commit.scope, `${project.slug}: missing changed-file scope`);
    if (project.workType === 'organization') assert(!commit.url, 'Private commit URLs must not be published');
  }
  for (const module of project.modules ?? []) {
    assert(module.commitShas?.length, `${module.name}: no contribution evidence`);
    for (const sha of module.commitShas) assert(commits.has(sha), `${module.name}: orphan commit`);
    assert(module.commitShas.includes(module.sha), `${module.name}: reference is not a contribution commit`);
  }
  for (const image of project.images) {
    assert(['contribution', 'context'].includes(image.evidence?.kind), `${image.src}: missing evidence relationship`);
    assert(image.evidence.note && image.evidence.commitShas.length);
    for (const sha of image.evidence.commitShas) assert(commits.has(sha), `${image.src}: orphan commit`);
  }
}
assert(!projects.flatMap(p => p.modules ?? []).some(m => ['Fourteen-Day-Pilot', 'aclub-superapp'].includes(m.name)));
console.log('PASS work groups, commit-backed modules, screenshot attribution and private-link boundaries');

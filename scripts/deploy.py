"""Deploy a tested Next export from clean, pushed HEAD; rollback on failure."""
from pathlib import Path
import hashlib
import json
import subprocess
import tarfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
SITE = Path('/var/www/petrushandika')

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT, text=True).strip()

def docker(script, archive=None):
    command = ['docker', 'run', '--rm', '-v', str(SITE) + ':/site']
    if archive:
        command += ['-v', str(archive) + ':/artifact.tar:ro']
    subprocess.run(command + ['alpine:latest', 'sh', '-c', script], check=True)

revision = git('rev-parse', 'HEAD')
assert not git('status', '--porcelain'), 'Commit all source changes first'
assert git('ls-remote', 'origin', 'refs/heads/main').split()[0] == revision, 'Push exact revision first'
subprocess.run(['npm', 'run', 'build'], cwd=ROOT, check=True)
subprocess.run(['npm', 'test'], cwd=ROOT, check=True)
assert not git('status', '--porcelain'), 'Build changed tracked source'
manifest = json.loads((ROOT / 'out/manifest.json').read_text())
for item in manifest:
    path = (ROOT / 'out' / item['path']).resolve()
    assert path.is_relative_to((ROOT / 'out').resolve())
    assert hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256']
archive = ROOT.parent / 'cartooneast/next-release.tar'
with tarfile.open(archive, 'w') as tar:
    tar.add(ROOT / 'out', arcname='public')
release = revision[:12]
previous = (SITE / 'current').readlink()
assert previous.parts[0] == 'releases' and len(previous.parts) == 2
assert all(c in '0123456789abcdef' for c in previous.parts[1])
docker(f'''set -eu
test ! -e /site/releases/{release}
mkdir /site/releases/{release}
tar -xf /artifact.tar -C /site/releases/{release}
chmod -R a+rX /site/releases/{release}
''', archive)
staged = SITE / 'releases' / release / 'public'
for item in manifest:
    assert hashlib.sha256((staged / item['path']).read_bytes()).hexdigest() == item['sha256'], item['path']

def switch(target):
    docker(f'''set -eu
ln -s {target} /site/current-next-{release}
mv -Tf /site/current-next-{release} /site/current
''')

try:
    switch('releases/' + release)
    for route in ['', 'redminote12', 'drivexdiwali', 'marketplacecreatives', 'bannerrefresh', 'artworks']:
        url = 'https://petrushandika.com/' + (route + '/' if route else '')
        with urllib.request.urlopen(url, timeout=30) as response:
            assert response.status == 200
            assert response.read() == (ROOT / 'out' / route / 'index.html').read_bytes()
except BaseException:
    switch(str(previous))
    assert (SITE / 'current').readlink() == previous
    raise
print(json.dumps({'revision': revision, 'files': len(manifest), 'framework': 'Next.js', 'routes': 6, 'verified': True, 'rollback': str(previous)}))

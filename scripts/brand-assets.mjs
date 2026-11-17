// Generates text-only social preview and icons. Run: node scripts/brand-assets.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';

const ink = '#1c1c1c', paper = '#f5f5f0', accent = '#354f78';
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${paper}"/>
<rect x="0" y="0" width="16" height="630" fill="${accent}"/>
<text x="96" y="150" fill="#66685f" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="6">PETRUSHANDIKA.COM</text>
<text x="92" y="300" fill="${ink}" font-family="DejaVu Sans, Arial, sans-serif" font-size="104" font-weight="700" letter-spacing="-4">Petrus Handika</text>
<text x="96" y="378" fill="#4a4c45" font-family="DejaVu Sans, Arial, sans-serif" font-size="44">Full Stack Developer (Web &amp; AI)</text>
<line x1="96" y1="450" x2="1104" y2="450" stroke="#d8d8cf" stroke-width="2"/>
<text x="96" y="512" fill="#66685f" font-family="DejaVu Sans, Arial, sans-serif" font-size="28">Projects · Case studies · Engineering notes · Indonesia</text>
</svg>`;
const icon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="${ink}"/>
<text x="32" y="43" text-anchor="middle" fill="${paper}" font-family="DejaVu Sans, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="-1">PH</text>
</svg>`;

await fs.mkdir('public/og', { recursive: true });
await sharp(Buffer.from(og)).jpeg({ quality: 88, mozjpeg: true }).toFile('public/og/petrus-handika.jpg');
await sharp(Buffer.from(icon(180))).resize(180, 180).png().toFile('app/apple-icon.png');
await fs.writeFile('app/icon.svg', icon(64));
console.log('Generated public/og/petrus-handika.jpg, app/icon.svg, app/apple-icon.png');

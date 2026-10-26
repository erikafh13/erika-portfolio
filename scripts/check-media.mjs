// Cek isian link dan gambar. Jalankan: npm run media
import fs from 'node:fs';
import path from 'node:path';
import { transformSync } from 'esbuild';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const img = /\.(jpe?g|png|webp|avif)$/i;
const list = (d) => (fs.existsSync(d) ? fs.readdirSync(d).filter((f) => img.test(f)) : []);
const has = (files, base) => files.some((f) => f.replace(img, '').toLowerCase() === base);

const src = fs.readFileSync(path.join(root, 'src/data/links.ts'), 'utf8');
const js = transformSync(src, { loader: 'ts', format: 'esm' }).code;
const { projectLinks, profileExtraLinks } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));

const ok = (b) => (b ? 'ada   ' : '-     ');
console.log('\nPROYEK                  link  card  light shots');
console.log('-'.repeat(58));
let nLink = 0, nCard = 0, total = 0;
for (const id of Object.keys(projectLinks)) {
  total++;
  const l = projectLinks[id];
  const links = [l.github, l.dashboard, l.demo, l.report].filter(Boolean).length;
  const files = list(path.join(root, 'src/images/projects', id));
  const shots = files.filter((f) => /^shot-\d+/i.test(f.replace(img, ''))).length;
  const card = has(files, 'card');
  if (links) nLink++;
  if (card) nCard++;
  console.log(id.padEnd(24) + String(links).padEnd(6) + ok(card) + ok(has(files, 'card-light')) + shots);
}
console.log('-'.repeat(58));
console.log(`Link terisi: ${nLink}/${total}   Kartu baru: ${nCard}/${total}`);

const certs = list(path.join(root, 'src/images/certificates')).length;
console.log(`\nSertifikat (gambar) : ${certs}`);
for (const j of ['db-klik', 'telkomsel', 'marketplace', 'student']) {
  console.log(`Journey ${j.padEnd(12)}: ${list(path.join(root, 'src/images/journey', j)).length} foto`);
}
const extra = Object.entries(profileExtraLinks).filter(([, v]) => v).map(([k]) => k);
console.log(`\nLink profil tambahan: ${extra.length ? extra.join(', ') : '(belum ada)'}\n`);

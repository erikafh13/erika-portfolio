// Olist, Airbnb and HR Analytics now use real screenshots (public/assets/projects/shots) and are no longer generated here.
// Generates PLACEHOLDER dashboard-style previews for a few projects.
// Replace each file in public/assets/projects/ with a real screenshot (same filename, or change `image` in src/data/portfolio.ts).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'public/assets/projects';
mkdirSync(OUT, { recursive: true });

const items = {
  'stock-optimization': ['#ffb547', '#1a0d02', 'Stock Optimization System'],
  'telkomsel-bi': ['#2ee6d6', '#031a1a', 'Telkomsel BI Dashboard'],
  'business-financial': ['#46e3a8', '#03150f', 'Business & Financial Dashboard'],
};

const bars = (c, seed) =>
  Array.from({ length: 9 }, (_, i) => {
    const h = 40 + ((i * 37 + seed * 53) % 110);
    return `<rect x="${40 + i * 38}" y="${210 - h}" width="24" height="${h}" rx="4" fill="${c}" fill-opacity="${0.35 + (i % 3) * 0.2}"/>`;
  }).join('');

const THEMES = {
  dark: { page: (bg) => bg, panel: '#0e0e14', tile: '#16161f', text: '#f4f1ec', dim: '#ffffff', file: (id) => id },
  light: { page: () => '#f1f3f9', panel: '#ffffff', tile: '#f5f6fb', text: '#16161b', dim: '#000000', file: (id) => `${id}-light` },
};

let n = 0;
for (const [id, [c, bg, title]] of Object.entries(items)) {
  n++;
  for (const T of Object.values(THEMES)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <rect width="1200" height="900" fill="${T.page(bg)}"/>
  <rect x="40" y="40" width="1120" height="820" rx="24" fill="${T.panel}" stroke="${c}" stroke-opacity="0.35" stroke-width="2"/>
  <rect x="40" y="40" width="1120" height="70" rx="24" fill="${c}" fill-opacity="0.12"/>
  <text x="80" y="86" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" fill="${T.text}">${title.replace('&', '&amp;')}</text>
  ${[0, 1, 2].map((k) => `<g transform="translate(${80 + k * 350} 140)"><rect width="320" height="120" rx="14" fill="${T.tile}" stroke="${c}" stroke-opacity="0.3"/><rect x="24" y="26" width="110" height="10" rx="5" fill="${T.dim}" fill-opacity="0.25"/><rect x="24" y="56" width="${150 + ((k + n) % 3) * 40}" height="30" rx="8" fill="${c}" fill-opacity="0.75"/></g>`).join('')}
  <g transform="translate(80 290)"><rect width="640" height="300" rx="14" fill="${T.tile}" stroke="${c}" stroke-opacity="0.3"/><g transform="translate(20 30)">${bars(c, n)}</g></g>
  <g transform="translate(750 290)"><rect width="330" height="300" rx="14" fill="${T.tile}" stroke="${c}" stroke-opacity="0.3"/><circle cx="165" cy="150" r="84" fill="none" stroke="${c}" stroke-opacity="0.25" stroke-width="34"/><circle cx="165" cy="150" r="84" fill="none" stroke="${c}" stroke-width="34" stroke-dasharray="${200 + n * 40} 600" transform="rotate(-90 165 150)"/></g>
  <g transform="translate(80 620)"><rect width="1000" height="200" rx="14" fill="${T.tile}" stroke="${c}" stroke-opacity="0.3"/><path d="M30 150 C150 90 220 170 340 110 S560 60 680 100 S880 40 970 70" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/></g>
  <text x="1140" y="884" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="16" letter-spacing="4" fill="${T.dim}" fill-opacity="0.35">PLACEHOLDER</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(`${OUT}/${T.file(id)}.jpg`);
  }
}
console.log('placeholders built');

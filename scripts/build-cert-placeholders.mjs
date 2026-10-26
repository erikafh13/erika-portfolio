// Generates SAMPLE certificate images for the Certifications section.
// Replace each file in public/assets/certificates/ with the real scan (same name, or change `image` in src/data/portfolio.ts).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'public/assets/certificates';
mkdirSync(OUT, { recursive: true });

const items = [
  ['Data Analysis with Python', '2025', '#ff3d5a'],
  ['SQL for Data Analysis', '2025', '#4cc9ff'],
  ['Business Intelligence with Power BI', '2024', '#ffb547'],
  ['Machine Learning Fundamentals', '2024', '#b98bff'],
  ['Excel for Data Analysis', '2023', '#46e3a8'],
  ['Data Visualization with Tableau', '2023', '#2ee6d6'],
  ['Statistics for Data Science', '2022', '#ff8a5c'],
  ['Looker Studio Essentials', '2022', '#7ee0ff'],
];

const esc = (t) => t.replace(/&/g, '&amp;');

for (const [i, [title, year, c]] of items.entries()) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1130" viewBox="0 0 1600 1130">
  <rect width="1600" height="1130" fill="#ffffff"/>
  <rect x="40" y="40" width="1520" height="1050" fill="none" stroke="${c}" stroke-width="10"/>
  <rect x="64" y="64" width="1472" height="1002" fill="none" stroke="#1a1a22" stroke-opacity="0.25" stroke-width="2"/>
  <text x="800" y="230" text-anchor="middle" font-family="Georgia, serif" font-size="30" letter-spacing="10" fill="#555">CERTIFICATE OF COMPLETION</text>
  <text x="800" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#777">This certifies that</text>
  <text x="800" y="430" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="78" fill="#1a1a22">Recipient Name</text>
  <line x1="420" x2="1180" y1="460" y2="460" stroke="#1a1a22" stroke-opacity="0.35"/>
  <text x="800" y="545" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#777">has successfully completed</text>
  <text x="800" y="640" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="54" fill="${c}">${esc(title)}</text>
  <text x="800" y="715" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#777">${year} · Issued by Issuer Name</text>
  <line x1="260" x2="620" y1="930" y2="930" stroke="#1a1a22" stroke-opacity="0.45"/>
  <text x="440" y="968" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#777">Signature</text>
  <line x1="980" x2="1340" y1="930" y2="930" stroke="#1a1a22" stroke-opacity="0.45"/>
  <text x="1160" y="968" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#777">Date</text>
  <text x="800" y="760" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="800" font-size="190" fill="#000" fill-opacity="0.05" transform="rotate(-18 800 760)" letter-spacing="14">SAMPLE</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(`${OUT}/sample-${i + 1}.jpg`);
}
console.log('certificate placeholders built');

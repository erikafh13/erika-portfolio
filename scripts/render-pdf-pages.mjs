// Renders PDF pages to JPG: node scripts/render-pdf-pages.mjs <pdf> <outPrefix> [scale] [pages e.g. 1,2,3]
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const [pdf, prefix, scale = '2', pagesArg] = process.argv.slice(2);
const doc = await getDocument({ data: new Uint8Array(readFileSync(pdf)) }).promise;
const pages = pagesArg ? pagesArg.split(',').map(Number) : Array.from({ length: doc.numPages }, (_, i) => i + 1);
for (const n of pages) {
  const page = await doc.getPage(n);
  const viewport = page.getViewport({ scale: Number(scale) });
  const { canvas, context } = doc.canvasFactory.create(viewport.width, viewport.height);
  await page.render({ canvasContext: context, viewport }).promise;
  await sharp(canvas.toBuffer('image/png')).flatten({ background: '#ffffff' }).jpeg({ quality: 90 }).toFile(`${prefix}-${n}.jpg`);
}
console.log(`${doc.numPages} pages in PDF; wrote ${pages.length}`);

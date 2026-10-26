// Renders every page of the CV PDF to an image (public/assets/cv/page-N.jpg) for the resume viewer.
// Images instead of an embedded PDF so browser plugins / download managers can't blank the viewer.
// Re-run `npm run cv` after replacing public/assets/Erika_Fatimatul_Hidayanti_CV.pdf, then update `resumePages` in src/data/portfolio.ts if the page count changed.
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';

const OUT = 'public/assets/cv';
mkdirSync(OUT, { recursive: true });

const doc = await getDocument({ data: new Uint8Array(readFileSync('public/assets/Erika_Fatimatul_Hidayanti_CV.pdf')) }).promise;
for (let n = 1; n <= doc.numPages; n++) {
  const page = await doc.getPage(n);
  const viewport = page.getViewport({ scale: 2.4 });
  const { canvas, context } = doc.canvasFactory.create(viewport.width, viewport.height);
  await page.render({ canvasContext: context, viewport }).promise;
  await sharp(canvas.toBuffer('image/png')).flatten({ background: '#ffffff' }).jpeg({ quality: 88 }).toFile(`${OUT}/page-${n}.jpg`);
}
console.log(`${doc.numPages} pages written to ${OUT}`);

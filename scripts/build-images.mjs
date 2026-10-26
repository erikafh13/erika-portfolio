// Builds optimized portrait assets from the original photos in the project root.
// pic1.jpeg = high-resolution source, pic.png = background-removed cutout (same framing).
// The cutout's alpha mask is upscaled and applied to the high-res photo so the face stays sharp.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

const hi = sharp('pic1.jpeg');
const { width, height } = await hi.metadata();

const alpha = await sharp('pic.png')
  .ensureAlpha()
  .extractChannel('alpha')
  .resize(width, height, { kernel: 'lanczos3' })
  .blur(0.8)
  .raw()
  .toBuffer();

const rgb = await sharp('pic1.jpeg').removeAlpha().raw().toBuffer();
const rgba = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  rgba[i * 4] = rgb[i * 3];
  rgba[i * 4 + 1] = rgb[i * 3 + 1];
  rgba[i * 4 + 2] = rgb[i * 3 + 2];
  rgba[i * 4 + 3] = alpha[i];
}
const cutout = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();

for (const w of [1100, 720, 420]) {
  await sharp(cutout).resize({ width: w }).webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/portrait-${w}.webp`);
}

// NOTE: public/assets/og-image.jpg (1200x630) is designed separately (scripts/og-image.source.html) and is no longer generated here.
console.log('images built');

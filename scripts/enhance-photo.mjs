// Cleans up a transparent portrait: removes compression noise/texture, upscales 2x and re-sharpens edges only.
// Face, clothes and colours are untouched (no retouching, no reshaping).
// Usage: node scripts/enhance-photo.mjs <input.webp|png> <output-base>
import sharp from 'sharp';

const [input, out] = process.argv.slice(2);
const meta = await sharp(input).metadata();
const W = meta.width * 2;
const H = meta.height * 2;

const alpha = await sharp(input).ensureAlpha().extractChannel('alpha').toBuffer();
const rgb = await sharp(input).removeAlpha().toBuffer();

// 1) denoise at native size: a tiny median removes block/ringing noise and fine grain
// 2) upscale with lanczos  3) gentle unsharp mask so edges stay crisp but flat areas stay smooth
const smooth = await sharp(rgb)
  .median(3)
  .resize(W, H, { kernel: 'lanczos3' })
  // crisp edges (m2) with almost no boost on flat skin/fabric (m1) so it stays smooth, not textured
  .sharpen({ sigma: 1.5, m1: 0.05, m2: 2.4, x1: 1.5, y2: 30, y3: 45 })
  .sharpen({ sigma: 0.6, m1: 0, m2: 0.8, x1: 3, y2: 15, y3: 25 })
  .toBuffer();

const alpha2 = await sharp(alpha).resize(W, H, { kernel: 'lanczos3' }).blur(0.8).toBuffer();

const final = sharp(smooth).joinChannel(alpha2);
await final.clone().png({ compressionLevel: 9 }).toFile(`${out}.png`);
await final.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(`${out}.webp`);
console.log(`${W}x${H} written to ${out}.png / .webp`);

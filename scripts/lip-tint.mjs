// Gives the lips a little more colour: builds a soft lip mask from the pixels that are redder than the surrounding skin,
// then raises saturation (and a touch of depth) only inside that mask. Nothing outside the lips changes.
// Usage: node scripts/lip-tint.mjs <in.png> <out-base> [strength 0..1] [--preview]
import sharp from 'sharp';

const [input, out, strengthArg = '0.8'] = process.argv.slice(2);
const preview = process.argv.includes('--preview');
const strength = Number(strengthArg);

// search box around the mouth (in the 2666x4000 output)
const BOX = { left: 1090, top: 1360, width: 350, height: 190 };

const img = sharp(input).ensureAlpha();
const { width, height } = await img.metadata();
const raw = await img.raw().toBuffer();
const C = 4;

const idx = (x, y) => (y * width + x) * C;
const redness = (i) => raw[i] - raw[i + 1]; // R - G: lips are redder than the skin around them

// reference skin value: median redness of the box border band (skin, not lips)
const ref = [];
for (let y = BOX.top; y < BOX.top + BOX.height; y++)
  for (let x = BOX.left; x < BOX.left + BOX.width; x++) {
    const edge = x < BOX.left + 25 || x > BOX.left + BOX.width - 25 || y < BOX.top + 15 || y > BOX.top + BOX.height - 15;
    if (edge) ref.push(redness(idx(x, y)));
  }
ref.sort((a, b) => a - b);
const skin = ref[Math.floor(ref.length / 2)];

// soft weight: 0 at skin level, 1 once clearly redder
const mask = Buffer.alloc(width * height);
for (let y = BOX.top; y < BOX.top + BOX.height; y++)
  for (let x = BOX.left; x < BOX.left + BOX.width; x++) {
    const d = redness(idx(x, y)) - skin;
    const t = Math.min(1, Math.max(0, (d - 1) / 14));
    mask[y * width + x] = Math.round(t * t * (3 - 2 * t) * 255);
  }
// feather the mask so there is no visible edge
const soft = await sharp(mask, { raw: { width, height, channels: 1 } }).blur(3).toColourspace("b-w").raw().toBuffer();

if (preview) {
  await sharp(soft, { raw: { width, height, channels: 1 } })
    .extract({ left: 1000, top: 1300, width: 500, height: 300 })
    .png()
    .toFile(`${out}-mask.png`);
  console.log('skin redness', skin, '-> mask preview written');
  process.exit(0);
}

// boosted copy of the whole image (more saturated, slightly deeper), blended in only where the mask is
const boosted = await sharp(input).ensureAlpha().modulate({ saturation: 1.28, brightness: 0.98 }).raw().toBuffer();
const result = Buffer.from(raw);
for (let i = 0, p = 0; p < width * height; i += C, p++) {
  const w = (soft[p] / 255) * strength;
  if (w <= 0) continue;
  for (let k = 0; k < 3; k++) result[i + k] = Math.round(raw[i + k] * (1 - w) + boosted[i + k] * w);
}
const final = sharp(result, { raw: { width, height, channels: 4 } });
await final.clone().png({ compressionLevel: 9 }).toFile(`${out}.png`);
await final.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(`${out}.webp`);
console.log('done', width, height);

/**
 * PEMBACA GAMBAR OTOMATIS
 * =======================
 * Semua gambar yang ditaruh di folder `src/images/` dibaca otomatis berdasarkan NAMA FILE-nya.
 * Tidak perlu mengubah kode. Lihat src/images/README.md untuk aturan nama file.
 * Slot yang tidak ada gambarnya tetap memakai tampilan bawaan (gambar hias / gradasi).
 */
const files = import.meta.glob('../images/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const entries = Object.entries(files).map(([path, url]) => ({ path: path.replace('../images/', ''), url }));

const stripExt = (p: string) => p.replace(/\.(jpe?g|png|webp|avif)$/i, '');

/** Satu gambar: folder + nama dasar (tanpa ekstensi). */
export function findImage(dir: string, base: string): string | undefined {
  const target = `${dir}/${base}`.toLowerCase();
  return entries.find((e) => stripExt(e.path).toLowerCase() === target)?.url;
}

/** Banyak gambar berurutan: shot-1, shot-2, ... atau 1, 2, 3 ... */
export function findNumbered(dir: string, prefix = ''): string[] {
  const re = new RegExp(`^${dir.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/${prefix}0*(\\d+)$`, 'i');
  return entries
    .map((e) => ({ m: stripExt(e.path).match(re), url: e.url }))
    .filter((x): x is { m: RegExpMatchArray; url: string } => !!x.m)
    .sort((a, b) => Number(a.m[1]) - Number(b.m[1]))
    .map((x) => x.url);
}

/** Satu gambar bernomor: certificates/1.jpg atau certificates/01.jpg */
export function findByNumber(dir: string, n: number): string | undefined {
  return findImage(dir, String(n)) ?? findImage(dir, String(n).padStart(2, '0'));
}

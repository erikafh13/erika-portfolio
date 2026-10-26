# Panduan singkat: mengisi link dan gambar

Ada 2 hal yang diisi sendiri. Kode lain tidak perlu disentuh.

## 1. Link proyek: tempel di `src/data/links.ts`

Buka file itu. Setiap proyek punya 4 isian:

| Isian | Tombol di situs | Cocok untuk |
| --- | --- | --- |
| `github` | GitHub | repository |
| `dashboard` | Live Dashboard | Looker Studio, Tableau Public, Power BI |
| `demo` | Live Demo | Streamlit, website, aplikasi |
| `report` | Report | PDF, Google Drive, Colab, Kaggle |

Tempel URL lengkap (diawali `https://`) di antara tanda kutip. Yang dikosongkan tidak menampilkan tombol.

```ts
'retail-sales': {
  github: 'https://github.com/username/retail-sales',
  dashboard: 'https://lookerstudio.google.com/reporting/abc123',
  demo: '',
  report: '',
  captions: ['Ringkasan penjualan per bulan', 'Performa per cabang'],  // opsional
},
```

Di bagian bawah file ada `profileExtraLinks` untuk GitHub / Tableau / Looker profil. Kalau diisi, muncul sebagai tombol di bagian paling bawah situs.

## 2. Gambar: taruh di folder `src/images/`

Folder sudah disiapkan. Setiap folder punya `_ISI-DISINI.txt` berisi nama file persis yang dibutuhkan. Ringkasnya:

- `projects/<kode-proyek>/card.jpg` untuk gambar kartu (4:3, min 1200x900)
- `projects/<kode-proyek>/card-light.jpg` opsional, untuk tema terang
- `projects/<kode-proyek>/shot-1.jpg`, `shot-2.jpg`, ... untuk screenshot (lebar min 1600)
- `certificates/1.jpg`, `2.jpg`, ... urut sesuai daftar sertifikat
- `journey/<db-klik|telkomsel|marketplace|student>/1.jpg`, `2.jpg`, ...

Slot yang kosong: kartu proyek memakai gambar hias bawaan, sedangkan foto Journey yang kosong tidak ditampilkan (kalau satu bab tidak punya foto, bagian fotonya disembunyikan).
Detail ada di `src/images/README.md`.

## 3. Cek hasilnya

```bash
npm run media   # tabel: link dan gambar mana yang sudah / belum terisi
npm run dev     # lihat situs di browser (http://localhost:5173)
```

## Sertifikat dan Reviews (disembunyikan sampai diisi)

Daftar sertifikat dan review di `src/data/portfolio.ts` sengaja dikosongkan, jadi dua bagian itu tidak tampil di situs.
Di dalam file ada contoh baris dalam komentar (`//`). Hapus tanda `//` lalu ganti isinya dengan data asli:

- Sertifikat: cari `export const certifications`. Gambarnya taruh di `src/images/certificates/1.jpg`, `2.jpg`, dst. (urut sesuai baris).
- Review: cari `export const testimonials`. Hanya isi review yang pemberinya sudah mengizinkan namanya dipakai.

## Teks lain yang diubah di `src/data/portfolio.ts`

- Keterangan foto Journey: bagian `docs` > `caption` pada tiap bab di `journey`.

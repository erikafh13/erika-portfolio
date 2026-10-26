# Panduan Mengedit Portfolio Erika

Panduan ini menjelaskan **apa yang harus dilakukan** dan **file mana yang harus dibuka** setiap kali kamu ingin mengganti teks, gambar, atau elemen lain di situs portfolio.

> Tips cepat: hampir semua isi situs (teks, angka, proyek, skill, sertifikat) ada di **satu file**:
> `src/data/portfolio.ts`. Gambar ada di folder `public/assets/`.

---

## Daftar isi

1. [Cara menjalankan dan melihat perubahan](#1-cara-menjalankan-dan-melihat-perubahan)
2. [Peta folder dan file](#2-peta-folder-dan-file)
3. [Dua tempat teks disimpan](#3-dua-tempat-teks-disimpan)
4. [Tabel cepat: "Mau ubah apa → buka mana"](#4-tabel-cepat-mau-ubah-apa--buka-mana)
5. [Panduan per bagian situs](#5-panduan-per-bagian-situs)
6. [Panduan gambar](#6-panduan-gambar)
7. [Menambah, mengurutkan, dan menghapus](#7-menambah-mengurutkan-dan-menghapus)
8. [Warna, mode terang/gelap, dan gaya](#8-warna-mode-teranggelap-dan-gaya)
9. [Skrip bantu (perintah `npm run`)](#9-skrip-bantu-perintah-npm-run)
10. [Masalah umum dan solusinya](#10-masalah-umum-dan-solusinya)
11. [Aturan penulisan agar tidak error](#11-aturan-penulisan-agar-tidak-error)
12. [Upload ke GitHub](#12-upload-ke-github)
13. [Publish ke Vercel](#13-publish-ke-vercel)

---

## 1. Cara menjalankan dan melihat perubahan

### Menjalankan situs di komputer

1. Buka terminal di folder proyek (`Portfolio_series-main`).
2. Jalankan:

```bash
npm run dev
```

3. Buka alamat yang muncul, biasanya **http://localhost:5173**.

Setiap kali kamu **menyimpan file** (Ctrl+S), tampilan di browser otomatis ikut berubah. Kalau tidak berubah, tekan **Ctrl+F5**.

### Memeriksa apakah ada kesalahan penulisan

```bash
npx tsc -b
```

Kalau tidak ada tulisan apa pun setelah perintah itu selesai, berarti aman. Kalau muncul pesan merah, baca nama file dan nomor barisnya, lalu perbaiki.

### Membuat versi final untuk di-upload

```bash
npm run build
```

Hasilnya ada di folder `dist/`. Isi folder itulah yang di-upload ke hosting (Netlify, Vercel, GitHub Pages, dan sebagainya).

### Layar pembuka (intro) tidak muncul lagi?

Layar pembuka hanya diputar **sekali per sesi browser**. Untuk melihatnya lagi: tutup tab lalu buka lagi, atau klik tombol **"Replay opening"** di bagian paling bawah halaman.

---

## 2. Peta folder dan file

```
Portfolio_series-main/
├── PANDUAN.md                  ← file ini
├── index.html                  ← judul tab, deskripsi, tag untuk media sosial, font
├── package.json                ← daftar perintah (npm run ...)
├── pic.png, pic1.jpeg          ← foto sumber lama (dipakai skrip build-images)
│
├── photo/                      ← foto HD hasil olahan (erika-hd.png, erika-hd-lips.png)
│
├── public/                     ← file yang diakses langsung lewat alamat /assets/...
│   ├── favicon.svg             ← ikon di tab browser
│   └── assets/
│       ├── Erika_Fatimatul_Hidayanti_CV.pdf   ← file CV yang bisa di-download
│       ├── og-image.jpg                       ← gambar saat tautan dibagikan (WhatsApp, LinkedIn)
│       ├── portrait-420/720/1100/1600/2000.webp ← foto profil dalam beberapa ukuran
│       ├── cv/page-1.jpg, page-2.jpg          ← halaman CV yang tampil di "View Resume"
│       ├── projects/                          ← gambar/screenshot proyek
│       └── certificates/                      ← gambar sertifikat
│
├── scripts/                    ← skrip bantu pembuat gambar (lihat bagian 9)
│
└── src/                        ← kode situs
    ├── data/
    │   └── portfolio.ts        ← ★ ISI UTAMA: hampir semua teks, angka, daftar
    ├── components/             ← tampilan tiap bagian (satu file per bagian)
    │   ├── OpeningSequence.tsx   layar pembuka (ERIKA / PORTFOLIO / PLAY)
    │   ├── Navbar.tsx            menu atas + tombol mode terang/gelap
    │   ├── Hero.tsx              bagian paling atas (nama, foto, 3 kotak kecil)
    │   ├── About.tsx             About Me
    │   ├── Journey.tsx           My Experience (tab DB Klik, Telkomsel, dst.)
    │   ├── Originals.tsx         Projects (3 baris geser)
    │   ├── ProjectCard.tsx       satu kartu proyek
    │   ├── ProjectModal.tsx      pop-up detail proyek
    │   ├── Skills.tsx            My Skill Universe
    │   ├── Certifications.tsx    Certifications + pemutar sertifikat
    │   ├── Testimonials.tsx      What People Say (review)
    │   ├── ResumeViewer.tsx      bagian The Full Story (Resume)
    │   ├── ResumeModal.tsx       pop-up "View Resume"
    │   ├── FinalCTA.tsx          bagian penutup (Thank you, tombol kontak, footer)
    │   ├── PlayIntro.tsx         tombol "Play Intro" (slide-slide ringkasan)
    │   ├── CustomCursor.tsx      titik kursor
    │   ├── Poster.tsx            latar warna kartu proyek
    │   ├── Scene.tsx             pembungkus tiap section (tinggi satu layar)
    │   └── fx.tsx                efek bersama (judul section, partikel, dll.)
    ├── hooks/theme.ts          ← logika mode terang/gelap
    ├── index.css               ← warna tema dan gaya global (mode terang juga di sini)
    └── App.tsx                 ← urutan section dan penyambungan semuanya
```

Folder yang **tidak perlu disentuh**: `node_modules/`, `dist/`, `.claude/`.

---

## 3. Dua tempat teks disimpan

Teks di situs berasal dari dua tempat. Ini kunci untuk tahu file mana yang harus dibuka:

| Jenis teks | Disimpan di | Contoh |
|---|---|---|
| **Data** (daftar, angka, isi kartu) | `src/data/portfolio.ts` | Nama, intro, pengalaman kerja, proyek, skill, sertifikat, review, slide Play Intro |
| **Teks tetap di tampilan** (judul section, tombol, kalimat kutipan) | File komponen di `src/components/` | "About Me", "Let's Connect", kutipan di About, 3 kotak kecil di Hero |

**Cara menemukan teks apa pun:** tekan **Ctrl+Shift+F** di VS Code, ketik kalimat yang ingin diubah (sebagian saja cukup), lalu klik hasilnya. Itu cara tercepat.

---

## 4. Tabel cepat: "Mau ubah apa → buka mana"

| Mau ubah | File | Bagian yang dicari |
|---|---|---|
| Nama, peran, intro singkat | `src/data/portfolio.ts` | `profile` → `fullName`, `displayName`, `firstName`, `role`, `intro` |
| Tiga tulisan di bawah nama (Data Analyst • BI • Data Scientist) | `src/data/portfolio.ts` | `profile.tagline` |
| Email, telepon, lokasi | `src/data/portfolio.ts` | `profile.email`, `phone`, `location` |
| Link LinkedIn / Instagram | `src/data/portfolio.ts` | `profile.links` |
| Tulisan kecil "AN ERIKA ORIGINAL" (layar pembuka) | `src/data/portfolio.ts` | `profile.originalLabel` |
| Foto profil | `public/assets/portrait-*.webp` | lihat [bagian 6](#foto-profil) |
| Tiga kotak kecil di sekitar foto (Hero) | `src/components/Hero.tsx` | `const floating` |
| Tulisan "13 Projects • 4 Work Experiences" | otomatis | dihitung dari jumlah proyek dan pekerjaan |
| Kutipan di About Me | `src/components/About.tsx` | cari "Data is just noise" |
| Empat kotak info di About (Studying, Work experience, dst.) | `src/components/About.tsx` | `const facts` |
| Tulisan di badge foto About ("DATA ANALYST") | `src/components/About.tsx` | `profile.role.toUpperCase()` |
| Minat (Interests) | `src/data/portfolio.ts` | `profile.interests` |
| Pendidikan | `src/data/portfolio.ts` | `education` |
| Pengalaman kerja dan organisasi (untuk CV) | `src/data/portfolio.ts` | `experience` |
| Tab dan kartu angka di "My Experience" | `src/data/portfolio.ts` | `journey` |
| Proyek | `src/data/portfolio.ts` | `projects` |
| Nama tiga baris proyek | `src/components/Originals.tsx` | `<ProjectRail label="..."` |
| Skill dan kategorinya | `src/data/portfolio.ts` | `skillCategories` |
| Keterangan saat skill di-hover | `src/data/portfolio.ts` | `skillEvidence` |
| Sertifikat | `src/data/portfolio.ts` | `certifications` |
| Review dari orang lain | `src/data/portfolio.ts` | `testimonials` |
| Slide "Play Intro" | `src/data/portfolio.ts` | `introSlides` |
| Pencapaian/penghargaan (untuk CV) | `src/data/portfolio.ts` | `achievements` |
| CV yang ditampilkan di "View Resume" | `public/assets/` + perintah `npm run cv` | lihat [bagian 6](#cv-resume) |
| Teks penutup ("Thank you", footer) | `src/components/FinalCTA.tsx` | cari "Thank you" dan "A personal" |
| Tombol kontak (Let's Connect, LinkedIn, Instagram, Email) | `src/components/FinalCTA.tsx` | `const ctas` |
| Tombol "LET'S CONNECT" di menu atas | `src/components/Navbar.tsx` | cari `LET&apos;S CONNECT` |
| Nama menu di navbar (About, Experience, dst.) | `src/data/portfolio.ts` | `sectionMeta` → `nav` |
| Urutan section / menyembunyikan section | `src/data/portfolio.ts` | `sectionOrder` |
| Judul dan keterangan tiap section | file komponen section itu | lihat [bagian 5](#5-panduan-per-bagian-situs) |
| Judul tab browser, deskripsi, gambar share | `index.html` | `<title>`, `<meta ...>` |
| Ikon tab browser | `public/favicon.svg` | ganti file |
| Warna utama | `src/index.css` | `@theme` |

---

## 5. Panduan per bagian situs

### 5.1 Layar pembuka (ERIKA / PORTFOLIO / PLAY)

File: `src/components/OpeningSequence.tsx`

- Tulisan **ERIKA** → `profile.firstName` di `portfolio.ts`.
- Tulisan **PORTFOLIO** → `profile.seriesTag`.
- Tulisan kecil **AN ERIKA ORIGINAL** → `profile.originalLabel`.
- Tulisan **DATA ANALYST • BUSINESS INTELLIGENCE • DATA SCIENTIST** → `profile.tagline`.
- Tombol **PLAY** dan **SKIP INTRO** → ada di file `OpeningSequence.tsx` (cari `PLAY` dan `SKIP INTRO`).
- Ukuran foto di layar ini: cari `h-[74vh]` (makin besar angkanya, makin besar fotonya).
- Foto yang dipakai sama dengan foto profil (lihat [Foto profil](#foto-profil)).

### 5.2 Menu atas (Navbar)

File: `src/components/Navbar.tsx`

- Nama tiap menu diambil dari `sectionMeta` di `portfolio.ts` (properti `nav`). Contoh: `journey: { nav: 'Experience', ... }`.
- Tombol **LET'S CONNECT** mengarah ke bagian paling bawah halaman. Teksnya ada di `Navbar.tsx`.
- Tombol matahari/bulan (mode terang/gelap) ada di file yang sama.

### 5.3 Hero (bagian paling atas)

File: `src/components/Hero.tsx` dan `src/data/portfolio.ts`

| Elemen | Cara mengubah |
|---|---|
| Tulisan besar **ERIKA** | `profile.firstName` |
| **PORTFOLIO** merah | `profile.seriesTag` |
| 13 Projects • 4 Work Experiences | otomatis dari data |
| Tiga tulisan tagline | `profile.tagline` |
| Paragraf intro | `profile.intro` |
| Tombol Play Intro / My Work | cari `Play Intro` dan `My Work` di `Hero.tsx` |
| **Tiga kotak kecil di sekitar foto** | `Hero.tsx`, cari `const floating` |

Contoh mengubah tiga kotak kecil:

```ts
const floating = [
  { text: '1M+ Rows', sub: 'Customer data analyzed', pos: 'left-[-9%] top-[32%]', depth: 1 },
  { text: '~100K / day scraping', sub: '50+ competitors · Shopee & Tokopedia', compact: true, pos: 'left-[50%] top-[14%]', depth: -1 },
  { text: '50+ Excel', sub: 'Analyses delivered', pos: 'left-[60%] top-[72%]', depth: 0.6 },
];
```

- `text` = tulisan tebal di atas, `sub` = tulisan kecil di bawahnya.
- `pos` = posisi kotak. `left-[...]` menggeser kiri-kanan (angka lebih kecil = lebih ke kiri), `top-[...]` menggeser atas-bawah.
- `compact: true` = huruf lebih kecil (pakai kalau tulisannya panjang).
- `depth` = seberapa banyak kotak bergerak mengikuti mouse. Biarkan saja.

### 5.4 About Me

File: `src/components/About.tsx`

- **Kutipan** besar → cari `Data is just noise` dan ganti kalimatnya.
- **Empat kotak info** → `const facts`:

```ts
const facts = [
  { k: 'Studying',        v: education[0].degree,        s: `${education[0].school}` },
  { k: 'Work experience', v: `${workExperience.length} Roles`, s: 'Sept 2024 – Oct 2026' },
  { k: 'Core toolkit',    v: 'Python, SQL & BI',          s: 'Power BI · Tableau · Looker Studio' },
  { k: 'Based in',        v: profile.location,            s: 'Indonesia' },
];
```

  `k` = judul kecil, `v` = tulisan utama, `s` = tulisan kecil di bawahnya.
- **Interests** → `profile.interests` di `portfolio.ts`.
- **Foto di kartu** → memakai foto profil yang sama, di-zoom supaya tangan tidak terlihat. Ukuran zoom: di `About.tsx` cari `h-[155%]` dan `top-[-13%]`.
- **Badge di pojok foto** (DATA ANALYST) → `profile.role`.

### 5.5 My Experience

File data: `src/data/portfolio.ts` → `journey`. Tampilan: `src/components/Journey.tsx`.

Satu "chapter" (satu tab) berbentuk:

```ts
{
  id: 'db-klik',                    // nama unik, huruf kecil tanpa spasi
  tab: 'DB Klik',                   // tulisan di tombol tab
  title: 'Data Analyst',            // judul besar
  org: 'CV. DB Klik',
  period: 'Jan 2025 – Oct 2026',
  summary: 'Ringkasan satu-dua kalimat tentang pekerjaannya.',
  stats: [                          // tiga kartu angka
    { value: 'IDR 31.9 bn', label: 'recoverable cash uncovered' },
    { value: '~100K / day', label: 'competitor data points scraped' },
    { value: '11 interns',  label: 'led as Person in Charge' },
  ],
  docs: [                           // kartu dokumentasi (foto)
    { caption: 'Team photo', palette: violet },                                  // belum ada foto: kartu warna
    { caption: 'Team meeting', src: '/assets/journey/db-klik-1.jpg', palette: amber }, // sudah ada foto
  ],
},
```

**Menambah foto dokumentasi:**

1. Buat folder `public/assets/journey/` (kalau belum ada) dan taruh fotonya, misalnya `db-klik-1.jpg`.
2. Di kartu `docs`, tambahkan `src: '/assets/journey/db-klik-1.jpg'`.
3. Selesai. Klik kartu di situs untuk melihat foto itu penuh.

Tulisan tetap di `Journey.tsx`: judul "My Experience", keterangan "Select a chapter…", dan "Chapters".

Pilihan warna kartu (`palette`): `teal`, `amber`, `violet`, `jade`, `ocean`.

### 5.6 Projects

File data: `src/data/portfolio.ts` → `projects`. Tampilan: `Originals.tsx`, `ProjectCard.tsx`, `ProjectModal.tsx`.

Satu proyek berbentuk:

```ts
{
  id: 'telkomsel-bi',               // unik, huruf kecil, tanpa spasi
  image: '/assets/projects/telkomsel-bi.jpg',        // gambar (boleh dihapus kalau belum ada)
  imageLight: '/assets/projects/telkomsel-bi-light.jpg', // gambar mode terang (boleh dihapus)
  title: 'Telkomsel BI Dashboard',
  tag: 'Looker Studio',             // kotak kecil di kanan bawah kartu
  genre: 'Business Intelligence • Telecom',
  logline: 'Satu kalimat ringkasan proyek.',
  stack: ['Looker Studio'],         // daftar tools (muncul di pop-up)
  build: ['Penjelasan kontribusi 1.', 'Penjelasan kontribusi 2.'],   // "My Contribution"
  features: ['Fitur 1', 'Fitur 2'],                                  // "Key Features"
  metrics: [                        // angka dampak di pop-up
    { value: '10+', label: 'interactive dashboards delivered' },
  ],
  github: 'https://github.com/...', // opsional; tombol GitHub muncul kalau diisi
  palette: tealP,                   // warna kartu: tealP, amberP, oceanP, violetP, jadeP
  motif: 'bars',                    // gambar ilustrasi jika tidak ada image
  group: 'dashboard',               // baris mana: 'dashboard' | 'ml' | 'excel'
},
```

- `motif` yang tersedia: `bars`, `line`, `cluster`, `route`, `stock`, `flow`, `sheet`.
- `group` menentukan proyek masuk **baris mana**:
  - `'dashboard'` → Dashboards & Business Intelligence
  - `'ml'` → Machine Learning & Systems
  - `'excel'` → Excel & Automation
- Kalau tidak ada `image`, kartu memakai ilustrasi `motif` dengan warna `palette`.
- **Nama baris** diubah di `Originals.tsx` (cari `<ProjectRail label=`).
- Urutan kartu = urutan proyek di daftar `projects`.
- Link tombol "More on LinkedIn" di `Originals.tsx` mengambil `profile.links.linkedin`.

### 5.7 Skills

File data: `src/data/portfolio.ts` → `skillCategories` dan `skillEvidence`. Tampilan: `Skills.tsx`.

```ts
{
  id: 'technical',                  // unik
  title: 'Technical',
  subtitle: 'Code, queries & statistics',
  skills: [
    { name: 'Python (Pandas, NumPy, Scikit-Learn)', mono: 'Py' },
    { name: 'MySQL', mono: 'My' },
  ],
},
```

- `mono` = dua huruf di kotak kecil kartu skill.
- `skillEvidence` = keterangan yang muncul saat kartu skill di-hover. Kuncinya harus **sama persis** dengan `name`:

```ts
export const skillEvidence = {
  'MySQL': ['Advanced Database (Basis Data Lanjut) coursework'],
};
```

- Judul "My Skill Universe" dan "Genres" ada di `Skills.tsx`.
- Warna ikon tiap kategori: `const HUES` di `Skills.tsx`.

### 5.8 Certifications

File data: `src/data/portfolio.ts` → `certifications`. Tampilan: `Certifications.tsx`.

```ts
{
  issuer: 'Nama Penerbit',
  name: 'Nama Sertifikat',
  year: '2025',
  image: '/assets/certificates/nama-file.jpg',   // gambar sertifikat (untuk tombol View)
  link: 'https://...',                           // opsional, dipakai kalau tidak ada image
  sample: true,                                  // HAPUS baris ini kalau sertifikatnya sudah asli
},
```

Langkah mengganti dengan sertifikat asli:

1. Simpan scan/foto sertifikat di `public/assets/certificates/` (JPG atau PNG, landscape, lebar 1600 px cukup).
2. Ganti `issuer`, `name`, `year`, dan `image` pada entri.
3. **Hapus** `sample: true` supaya sertifikat tampil juga di daftar CV (bagian Resume).
4. Tombol **View** membuka sertifikat ukuran penuh. Kalau yang diisi hanya `link` (tanpa `image`), tombolnya membuka tautan itu.

Perilaku otomatis:

- Tampil **2 baris** dulu; kalau lebih banyak, muncul tombol **View more** dan **Show less**.
- Kalau daftar `certifications` dikosongkan (`[]`), section dan menunya hilang sendiri.

### 5.9 Reviews (What People Say)

File data: `src/data/portfolio.ts` → `testimonials`. Tampilan: `Testimonials.tsx`.

```ts
{
  quote: 'Kutipan dari orang yang pernah bekerja denganmu.',
  name: 'Nama Lengkap',
  role: 'Supervisor',
  org: 'CV. DB Klik',
  sample: true,                     // HAPUS kalau sudah review asli (label SAMPLE ikut hilang)
},
```

- Pakai hanya kutipan **asli** dan minta izin orangnya.
- Tulis 2–4 kalimat. Kutipan lebih dari 5 baris akan dipotong dengan "…".
- Kalau daftar dikosongkan, section dan menunya hilang sendiri.

### 5.10 Resume (The Full Story)

File: `src/components/ResumeViewer.tsx` (kotak CV di halaman), `ResumeModal.tsx` (pop-up "View Resume").

- Kotak CV di halaman dibuat otomatis dari data: `education`, `experience`, `projects`, `skillCategories`, `achievements`, `certifications` (yang bukan sample).
- **Tiga angka kecil** (Roles / Years Exp. / Projects) ada di `ResumeViewer.tsx`, cari `Years Exp.`.
- Teks "Every episode, on one page." juga di file yang sama.
- **Pop-up "View Resume"** menampilkan gambar halaman CV dari `public/assets/cv/`. Cara memperbaruinya ada di [bagian 6](#cv-resume).
- Tombol **Download Resume** mengunduh file di `profile.resumePdf`.

### 5.11 Bagian penutup (Thank you)

File: `src/components/FinalCTA.tsx`

- Tulisan merah kecil **Thank you** → cari `Thank you`.
- Nama besar → `profile.displayName`.
- Tiga tulisan di bawah nama → `profile.tagline`.
- Tombol (Let's Connect, LinkedIn, Instagram, Email) → `const ctas`. Linknya otomatis dari `profile.links` dan `profile.email`.
- Tulisan footer "© … A personal, streaming-inspired portfolio…" → cari `A personal`.
- "Watch again" dan "Replay opening" → di file yang sama.

### 5.12 Play Intro (tombol Play Intro di Hero)

File data: `src/data/portfolio.ts` → `introSlides`.

```ts
{
  kicker: 'Education',              // label kecil di atas
  title: 'Data Science',            // judul besar
  lines: ['Universitas ...', 'August 2022 – Present'],   // baris keterangan
  chips: ['Python', 'Scikit-Learn'],                      // opsional: kotak kecil
},
```

Tiap entri = satu slide. Urutan slide = urutan di daftar.

---

## 6. Panduan gambar

### Foto profil

Foto profil dipakai di Hero, About, dan layar pembuka. File-nya:

```
public/assets/portrait-420.webp
public/assets/portrait-720.webp
public/assets/portrait-1100.webp
public/assets/portrait-1600.webp
public/assets/portrait-2000.webp
```

Browser memilih ukuran yang sesuai layar secara otomatis. Daftar ukuran ada di `profile.portrait.srcSet` di `portfolio.ts`.

**Cara mengganti foto:**

1. Siapkan foto dengan **latar transparan** (PNG, tanpa background), tinggi minimal 2000 px, rasio 2:3 (potret).
2. (Opsional) Perhalus dan pertajam dengan skrip:

```bash
node scripts/enhance-photo.mjs foto-asli.png photo/hasil
```

3. Buat kelima ukuran dari foto itu. Jalankan perintah ini (ganti `foto.png` dengan nama file-mu):

```bash
node -e "import('sharp').then(async ({default:s})=>{const fs=await import('node:fs');const src=fs.readFileSync('foto.png');for(const w of [420,720,1100,1600,2000]){await s(src).resize({width:w,kernel:'lanczos3'}).webp({quality:90,alphaQuality:95}).toFile('public/assets/portrait-'+w+'.webp')}})"
```

4. Muat ulang browser dengan **Ctrl+F5**.

> Nama file harus tetap `portrait-420.webp` dan seterusnya. Kalau mau nama lain, ubah juga `profile.portrait` di `portfolio.ts`.

**Mewarnai bibir / mempertajam:** lihat `scripts/lip-tint.mjs` dan `scripts/enhance-photo.mjs` (komentar di bagian atas tiap skrip menjelaskan cara pakainya).

### Gambar proyek

1. Simpan screenshot di `public/assets/projects/`, misalnya `nama-proyek.jpg`. Rasio terbaik **4:3** (misalnya 1200×900), format JPG.
2. Di data proyek (`portfolio.ts`) tambahkan:

```ts
image: '/assets/projects/nama-proyek.jpg',
```

3. (Opsional) kalau mau gambar berbeda untuk mode terang, tambahkan juga `imageLight: '/assets/projects/nama-proyek-light.jpg'`. Kalau tidak diisi, gambar yang sama dipakai di kedua mode.
4. Proyek tanpa `image` otomatis memakai ilustrasi.

5. (Opsional) untuk menampilkan screenshot dashboard **utuh** di jendela detail proyek (bagian "Preview", bisa diklik untuk ukuran penuh), tambahkan `screenshots`:

```ts
screenshots: [{ src: '/assets/projects/shots/nama-proyek.jpg', caption: 'Keterangan singkat gambar' }],
```

Gambar asli (bukan placeholder) sudah dipakai untuk **Olist, Airbnb, HR Analytics, Retail Sales, dan Surabaya Weather Dashboard** (folder `public/assets/projects/shots/`). Gambar di folder `public/assets/projects/` untuk **Stock Optimization, Telkomsel BI, dan Business & Financial** masih **placeholder** (ada tulisan "PLACEHOLDER" di sudutnya). Timpa dengan gambar asli (nama file sama, atau ubah `image`).

Dashboard Retail Sales berasal dari DB Klik (sebagian angka sudah diburamkan). Pastikan perusahaan mengizinkan sebelum website dipublikasikan.

### Foto dokumentasi (My Experience)

1. Taruh foto di `public/assets/journey/` (buat foldernya kalau belum ada).
2. Isi `src: '/assets/journey/nama-file.jpg'` pada kartu `docs` di `journey`.

### Gambar sertifikat

Lihat [5.8 Certifications](#58-certifications). Gambar di `public/assets/certificates/`.

### CV (Resume)

Ada **dua** hal yang harus sama:

| Yang | File |
|---|---|
| File untuk di-download | `public/assets/Erika_Fatimatul_Hidayanti_CV.pdf` |
| Gambar halaman untuk "View Resume" | `public/assets/cv/page-1.jpg`, `page-2.jpg`, ... |

**Cara memperbarui CV:**

1. Timpa file PDF di `public/assets/` (nama file tetap sama).
2. Jalankan perintah ini supaya gambar halaman dibuat ulang:

```bash
npm run cv
```

3. Perintah itu akan menampilkan jumlah halaman. Kalau jumlahnya berubah (misalnya jadi 3 halaman), ubah juga daftar `resumePages` di `profile`:

```ts
resumePages: ['/assets/cv/page-1.jpg', '/assets/cv/page-2.jpg', '/assets/cv/page-3.jpg'],
```

### Gambar saat tautan dibagikan (WhatsApp, LinkedIn)

File: `public/assets/og-image.jpg` (ukuran 1200×630). Teks yang menyertai ada di `index.html` (`og:title`, `og:description`). Untuk membuat ulang dari foto baru, gunakan skrip `scripts/build-images.mjs` sebagai contoh bahannya.

### Ikon tab browser

Ganti `public/favicon.svg` (ukuran persegi, format SVG).

---

## 7. Menambah, mengurutkan, dan menghapus

### Menambah item ke daftar

Semua daftar berbentuk `[ {...}, {...} ]`. Menambah item = salin satu blok `{ ... },` lalu tempel di bawahnya dan ubah isinya. **Jangan lupa koma** di akhir tiap blok.

Berlaku untuk: `projects`, `skillCategories`, `skills` di dalam kategori, `certifications`, `testimonials`, `journey`, `journey[].docs`, `introSlides`, `experience`, `education`.

### Mengurutkan

Urutan tampil = urutan di daftar. Cukup pindahkan blok ke atas atau ke bawah.

### Menghapus

Hapus satu blok `{ ... },` utuh (dari `{` sampai `},`). Untuk menyembunyikan satu section penuh dari situs, lihat di bawah.

### Mengatur urutan atau menyembunyikan section

File: `src/data/portfolio.ts` → `sectionOrder`.

```ts
export const sectionOrder: SectionId[] = [
  'about', 'journey', 'originals', 'skills',
  ...(certifications.length ? ['certifications'] : []),
  ...(testimonials.length ? ['reviews'] : []),
  'story',
];
```

- Menghapus satu kata dari daftar = section itu **hilang dari halaman dan dari menu**.
- Memindahkan kata = mengubah urutan section dan urutan menu.
- Section `certifications` dan `reviews` otomatis hilang kalau datanya kosong.
- Nama id: `about` (About Me), `journey` (My Experience), `originals` (Projects), `skills`, `certifications`, `reviews`, `story` (Resume).

### Mengganti nama menu

File: `src/data/portfolio.ts` → `sectionMeta`:

```ts
journey: { nav: 'Experience', card: 'My Experience', meta: '...', palette: amber },
```

`nav` adalah tulisan di menu atas.

---

## 8. Warna, mode terang/gelap, dan gaya

### Warna utama (merah, hitam, krem)

File: `src/index.css`, bagian `@theme` di paling atas:

```css
--color-ink: #07070a;       /* hitam latar */
--color-ink-2: #0e0e13;     /* latar kartu */
--color-ink-3: #16161d;
--color-crimson: #e5132b;   /* merah utama */
--color-crimson-2: #ff3d5a; /* merah terang (judul kecil, garis menu) */
--color-bone: #f4f1ec;      /* warna teks utama */
--color-mist: #a7a6ad;      /* teks sekunder */
--color-smoke: #6d6c75;     /* teks paling redup */
```

Ganti kode warna (heksadesimal) di sini dan seluruh situs ikut berubah. Beberapa efek cahaya (glow merah di Hero, layar pembuka, penutup) memakai angka `229,19,43` langsung di komponen. Cari `229,19,43` kalau mau mengubahnya juga.

### Mode terang

Di `src/index.css`, blok `:root[data-theme='light']` berisi warna versi terang:

```css
--color-ink: #fcebee;   /* latar halaman (pink lembut) */
--color-ink-2: #ffffff; /* latar kartu */
--color-bone: #16161b;  /* warna teks */
```

- **Mode gelap adalah bawaan.** Pilihan pengunjung tersimpan di browser mereka.
- Bagian yang selalu gelap di kedua mode memakai penanda `keep-dark` (layar pembuka, pemutar Play Intro).
- Latar kartu proyek versi terang diatur di `index.css` (cari `.poster:not(.keep-dark *)`).
- Latar kartu foto About versi terang: cari `.about-bg` di `index.css`.

### Palet warna kartu proyek

File: `src/data/portfolio.ts`, bagian atas daftar proyek:

```ts
const tealP:   Palette = { from: '#021a1c', via: '#0b6b73', to: '#04090a', accent: '#2ee6d6' };
const amberP:  Palette = { ... };
const oceanP:  Palette = { ... };
const violetP: Palette = { ... };
const jadeP:   Palette = { ... };
```

Untuk warna baru: salin satu baris, ganti nama dan keempat kode warnanya, lalu pakai namanya di `palette:` pada proyek.

### Kursor

File: `src/components/CustomCursor.tsx`. Titik kecil yang membesar saat klik. Ukuran titik: `h-3 w-3`; besar saat klik: `scale: down ? 2 : 1`.

---

## 9. Skrip bantu (perintah `npm run`)

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan situs untuk dilihat di komputer |
| `npm run build` | Membuat versi final di folder `dist/` |
| `npm run cv` | Membuat gambar halaman CV dari file PDF (`public/assets/cv/`) |
| `npm run placeholders` | Membuat ulang gambar **contoh** proyek (⚠ menimpa gambar contoh, jangan dijalankan jika sudah diganti gambar asli) |
| `node scripts/build-cert-placeholders.mjs` | Membuat ulang gambar **contoh** sertifikat (⚠ menimpa `sample-*.jpg`) |
| `node scripts/enhance-photo.mjs masuk.png keluar` | Memperhalus, memperbesar 2×, dan mempertajam foto transparan |
| `node scripts/lip-tint.mjs masuk.png keluar 0.7` | Mewarnai bibir sedikit (angka = kekuatan 0 sampai 1) |
| `npm run images` | ⚠ Skrip lama pembuat foto dari `pic.png` + `pic1.jpeg`. **Jangan dijalankan** kecuali ingin kembali ke foto lama (akan menimpa foto profil sekarang) |

---

## 10. Masalah umum dan solusinya

| Masalah | Penyebab / Solusi |
|---|---|
| Perubahan tidak muncul | Tekan **Ctrl+F5**. Pastikan `npm run dev` masih berjalan dan file sudah disimpan (Ctrl+S). |
| Halaman putih / error merah di browser | Ada salah ketik di file yang baru diedit. Jalankan `npx tsc -b` untuk melihat nama file dan baris yang salah. |
| Gambar tidak muncul | Cek penulisan jalur: harus diawali `/assets/...` (tanpa `public`). Cek nama file (huruf besar-kecil berpengaruh, ekstensi harus cocok). |
| Gambar lama masih tampil | Browser menyimpan cache. Tekan **Ctrl+F5**, atau ganti nama file gambar. |
| Layar pembuka tidak muncul | Hanya sekali per sesi. Tutup tab dan buka lagi, atau klik "Replay opening". |
| Section atau menu hilang | Daftar datanya kosong (`certifications` atau `testimonials`), atau namanya terhapus dari `sectionOrder`. |
| Kartu proyek tidak muncul di baris yang diharapkan | Cek `group` pada proyek: `'dashboard'`, `'ml'`, atau `'excel'`. |
| View Resume menampilkan CV lama | Jalankan `npm run cv` setelah mengganti PDF. |
| Teks di kartu terpotong "…" | Memang dibatasi (judul proyek 1 baris, kutipan review 5 baris, nama sertifikat 2 baris). Persingkat teksnya. |
| Tulisan di Download Resume diblokir IDM | Download manager (IDM) bisa menangkap tombol unduh. Itu normal dan tidak memengaruhi tampilan. |
| Layar terlalu sempit, tata letak berbeda | Tampilan dirancang pas satu layar untuk layar lebar (≥1024px). Di HP dan tablet tata letaknya memanjang ke bawah. |

---

## 11. Aturan penulisan agar tidak error

1. **Tanda kutip:** teks di dalam `' '` tidak boleh mengandung tanda `'` lagi. Kalau perlu apostrof, pakai tanda kutip ganda di luar: `"Let's Connect"`, atau pakai karakter ’ (kutip melengkung).
2. **Koma:** setiap blok `{ ... }` dan setiap isi daftar dipisah koma. Koma di akhir terakhir boleh ada.
3. **Teks dengan kurung `{}` atau `<`:** di file `.tsx` (komponen), hindari menulis `{`, `}` dan `<` langsung dalam teks biasa. Contoh di JSX: tulis `&apos;` untuk `'` pada teks langsung (seperti `LET&apos;S CONNECT`).
4. **Jangan ubah nama kunci** (kata sebelum titik dua), misalnya `title:`, `image:`, `group:`. Yang diubah hanya isi di sebelah kanannya.
5. **`id` harus unik** untuk setiap proyek, chapter, dan kategori skill.
6. **Nama file gambar:** gunakan huruf kecil, tanpa spasi (pakai tanda `-`). Contoh: `telkomsel-bi.jpg`.
7. **Selalu simpan cadangan** sebelum perubahan besar: salin seluruh folder proyek (tanpa `node_modules`) ke tempat lain.
8. Setelah selesai mengedit, jalankan `npx tsc -b`. Kalau tidak ada keluaran, berarti aman.

---

## 12. Upload ke GitHub

Bagian ini menjelaskan cara mengirim proyek ke GitHub. Repository yang dipakai di panduan ini:

```
https://github.com/erikafh13/portfolio-erika.git
```

> **Keadaan sekarang:** proyek di komputer sudah menjadi repository Git dan sudah punya **satu commit** ("Portfolio Erika: versi pertama"). Yang tersisa hanya menghubungkannya ke GitHub dan mengirimnya (push).

### 12.1 Yang perlu disiapkan

1. Akun GitHub (https://github.com).
2. Git terpasang di komputer. Cek dengan perintah ini, harus muncul nomor versi:

```bash
git --version
```

3. Repository kosong di GitHub. Kalau belum dibuat:
   1. Buka https://github.com/new.
   2. Isi **Repository name**: `portfolio-erika`.
   3. Pilih **Public** (siapa pun bisa lihat) atau **Private** (hanya kamu).
   4. **Jangan** centang "Add a README", "Add .gitignore", atau "Choose a license". Biarkan repository benar-benar kosong.
   5. Klik **Create repository**.

> Catatan Vercel: paket gratis Vercel bisa memakai repository **Private** milik akun pribadi. Kalau memilih Public, ingat bahwa semua isinya (termasuk data di `portfolio.ts`) bisa dibaca orang lain.

### 12.2 Push pertama kali (langkah demi langkah)

Buka terminal di folder proyek (folder yang berisi `package.json`).

**Langkah 1. Pastikan commit sudah ada:**

```bash
git log --oneline
```

Harus muncul satu baris: `Portfolio Erika: versi pertama`.

**Langkah 2. Hubungkan folder ini ke GitHub:**

```bash
git remote add origin https://github.com/erikafh13/portfolio-erika.git
```

Cek hasilnya (harus muncul dua baris `origin`):

```bash
git remote -v
```

**Langkah 3. Kirim ke GitHub:**

```bash
git push -u origin main
```

- Kalau muncul jendela login GitHub, masuk lewat browser seperti biasa, lalu izinkan.
- Kalau terminal meminta **password**, jangan masukkan password akun GitHub. Pakai **Personal Access Token** (lihat 12.3).

**Langkah 4. Cek hasilnya.** Buka https://github.com/erikafh13/portfolio-erika. Kalau folder `src`, `public`, dan file `PANDUAN.md` sudah terlihat, berarti berhasil.

### 12.3 Membuat Personal Access Token (kalau diminta password)

1. Di GitHub klik foto profil, lalu **Settings**.
2. Paling bawah menu kiri: **Developer settings**.
3. **Personal access tokens**, lalu **Tokens (classic)**, lalu **Generate new token (classic)**.
4. Isi **Note** (misalnya "laptop portfolio"), pilih masa berlaku, centang **repo**.
5. Klik **Generate token** dan **salin tokennya sekarang** (tidak akan ditampilkan lagi).
6. Saat terminal meminta password, **tempel token itu**. Tampilan tidak menampilkan apa pun saat menempel. Itu normal. Tekan Enter.

Windows biasanya menyimpan token itu, jadi push berikutnya tidak meminta lagi.

> Jangan pernah menaruh token di dalam file proyek atau membagikannya ke orang lain.

### 12.4 Kalau ada pesan error

| Pesan | Artinya dan solusi |
|---|---|
| `remote origin already exists` | Remote sudah terpasang. Perbarui alamatnya: `git remote set-url origin https://github.com/erikafh13/portfolio-erika.git`, lalu ulangi langkah 3. |
| `rejected ... fetch first` atau `non-fast-forward` | Repository di GitHub sudah berisi file (misalnya README yang dibuat otomatis). Jalankan `git pull origin main --rebase`, lalu `git push -u origin main`. |
| `Authentication failed` atau `Permission denied` | Login salah. Pakai Personal Access Token (12.3) dan pastikan kamu login sebagai pemilik repository (`erikafh13`). |
| `Repository not found` | Alamat salah atau repository belum dibuat, atau Private dan kamu login dengan akun lain. Cek ejaan alamat dan akunnya. |
| `src refspec main does not match any` | Belum ada commit, atau nama cabang bukan `main`. Cek dengan `git branch`. Kalau namanya `master`: `git branch -M main`, lalu push lagi. |
| `fatal: not a git repository` | Terminal tidak berada di folder proyek. Pindah ke folder yang berisi `package.json`. |
| Peringatan `LF will be replaced by CRLF` | Hanya peringatan soal akhir baris di Windows. Aman, abaikan. |

### 12.5 Memperbarui di kemudian hari

Setiap selesai mengubah sesuatu (teks, gambar, sertifikat, dan sebagainya), jalankan tiga perintah ini di folder proyek:

```bash
git add .
git commit -m "Tulis ringkas apa yang diubah"
git push
```

- `git add .` memasukkan semua perubahan.
- `git commit -m "..."` menyimpan perubahan itu sebagai satu catatan versi. Tulis pesan singkat, misalnya `"Update sertifikat dan foto"`.
- `git push` mengirimnya ke GitHub.

Kalau Vercel sudah terhubung ke repository ini, situsnya **otomatis diperbarui** dalam beberapa menit setelah `git push`.

Sebelum `git push`, biasakan menjalankan `npm run build` di komputer. Kalau ada error, perbaiki dulu supaya deploy di Vercel tidak gagal.

Melihat perubahan apa saja yang belum dikirim:

```bash
git status
```

### 12.6 File yang tidak ikut terkirim

Daftar ini ada di file `.gitignore`:

| Tidak dikirim | Alasan |
|---|---|
| `node_modules/` | Paket hasil `npm install`, ukurannya besar. Dibuat ulang otomatis oleh Vercel. |
| `dist/` | Hasil `npm run build`. Dibuat ulang otomatis oleh Vercel. |
| `photo/` | Foto olahan dan file perbandingan. Tidak dipakai situs (yang dipakai ada di `public/assets/`). |
| `.claude/` | Pengaturan alat bantu, tidak dibutuhkan. |

Kalau ingin foto di folder `photo/` ikut tersimpan di GitHub, hapus baris `/photo` di `.gitignore`.

### 12.7 Keamanan sebelum membuat repository Public

- Semua isi `src/data/portfolio.ts` akan terlihat orang lain: **nomor telepon, email, link**. Ini sama dengan yang tampil di situs, tapi pastikan memang boleh dipublikasikan.
- Jangan menaruh file pribadi (KTP, ijazah asli, dan sejenisnya) di folder proyek.
- Folder `public/` ikut terkirim, jadi file CV PDF-mu juga bisa diunduh siapa saja.


---

## 13. Publish ke Vercel

Situs ini adalah proyek **Vite + React**, jadi Vercel mengenalinya otomatis. Tidak perlu file konfigurasi tambahan. Saya sudah mencoba `npm run build` di proyek ini dan berhasil (hasilnya sekitar 3,5 MB di folder `dist/`).

### Pengaturan yang dipakai Vercel

| Pengaturan | Nilai |
|---|---|
| Framework Preset | **Vite** (terdeteksi otomatis) |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | 18 atau lebih baru (bawaan Vercel sudah cukup) |
| Environment Variables | tidak ada yang perlu diisi |

> `npm run build` menjalankan pemeriksaan TypeScript dulu (`tsc -b`). **Kalau ada salah ketik di kode, deploy akan gagal.** Karena itu selalu jalankan `npm run build` di komputer sebelum publish.

### Sebelum publish: checklist

1. Jalankan `npm run build` dan pastikan selesai tanpa error merah.
2. Ganti semua isi **contoh** dengan data asli: sertifikat (`sample: true`), review, gambar proyek placeholder. Setelah publish, pengunjung bisa melihat semuanya.
3. Cek `profile` di `src/data/portfolio.ts`: email, nomor telepon, dan link LinkedIn/Instagram sudah benar. Semuanya akan terlihat publik.
4. Ganti `public/assets/Erika_Fatimatul_Hidayanti_CV.pdf` dengan CV terbaru lalu jalankan `npm run cv`.
5. Periksa `index.html`: `<title>` dan deskripsi.

### Cara A (disarankan): lewat GitHub

Dengan cara ini, setiap kali kamu mengubah sesuatu dan mengunggahnya ke GitHub, **Vercel otomatis memperbarui situs**.

**1. Unggah proyek ke GitHub (sekali saja)**

Ikuti [bagian 12: Upload ke GitHub](#12-upload-ke-github), lalu lanjut ke langkah 2 di bawah.

**2. Hubungkan ke Vercel**

1. Buka https://vercel.com dan masuk (paling mudah dengan akun GitHub).
2. Klik **Add New… → Project**.
3. Pilih repository `portfolio`, klik **Import**.
4. Cek bahwa Framework Preset terbaca **Vite**, Build Command `npm run build`, Output Directory `dist`. Biasanya sudah benar tanpa diubah.
5. Klik **Deploy** dan tunggu sekitar 1–2 menit.
6. Vercel memberi alamat seperti `https://portfolio-xxxx.vercel.app`. Itulah situs kamu.

**3. Memperbarui situs di kemudian hari**

Setelah mengubah file di komputer, ikuti [12.5 Memperbarui di kemudian hari](#125-memperbarui-di-kemudian-hari). Vercel otomatis membuat versi baru dalam beberapa menit.

### Cara B: lewat Vercel CLI (tanpa GitHub)

Cocok kalau tidak ingin memakai GitHub.

```bash
npm install -g vercel
vercel login
vercel
```

- Jawab pertanyaan yang muncul (pilih akun, nama proyek, tekan Enter untuk pengaturan bawaan).
- Perintah `vercel` membuat versi **preview**. Untuk versi **resmi (production)**:

```bash
vercel --prod
```

Untuk memperbarui, jalankan `vercel --prod` lagi setelah perubahan.

### Memakai domain sendiri

1. Di dashboard Vercel, buka proyek → **Settings → Domains**.
2. Masukkan domain (misalnya `erikahidayanti.com`) lalu ikuti petunjuk mengisi catatan DNS di tempat kamu membeli domain.
3. Alamat `*.vercel.app` bisa diganti namanya di **Settings → Domains** (misalnya `erika-portfolio.vercel.app`).

### Setelah publish: yang perlu dirapikan

- **Gambar saat tautan dibagikan (WhatsApp, LinkedIn, Instagram):** buka `index.html` dan ubah alamat gambar menjadi alamat penuh agar lebih dikenali platform:

```html
<meta property="og:image" content="https://ALAMAT-SITUSMU.vercel.app/assets/og-image.jpg" />
<meta property="og:url" content="https://ALAMAT-SITUSMU.vercel.app" />
```

  Setelah itu `git push` (atau `vercel --prod`). Platform sosial menyimpan cache lama, jadi pratinjau tautan bisa baru berubah beberapa saat kemudian.
- **Uji di HP:** buka alamat Vercel di ponsel, lalu cek tampilan terang dan gelap, menu, dan tombol View di sertifikat.
- **Uji kecepatan:** situs memuat foto dalam ukuran yang sesuai layar, jadi seharusnya ringan. Kalau terasa lambat, periksa apakah ada gambar baru berukuran besar (di atas 1 MB) di `public/assets/`.

### Masalah umum saat publish

| Masalah | Solusi |
|---|---|
| Build gagal di Vercel | Buka log di halaman deploy. Hampir selalu karena kesalahan TypeScript. Jalankan `npm run build` di komputer, perbaiki error-nya, lalu `git push` lagi. |
| Gambar tidak muncul setelah publish | Cek nama file. Di Windows huruf besar-kecil tidak dibedakan, tapi di Vercel dibedakan. `Foto.JPG` berbeda dari `foto.jpg`. Samakan persis dengan yang tertulis di `portfolio.ts`. |
| Situs lama masih tampil | Tekan Ctrl+F5, atau tunggu deploy selesai (lihat status "Ready" di dashboard). |
| "Module not found" di log | Ada paket yang belum ada di `package.json`. Jalankan `npm install` di komputer, lalu `git add .`, `git commit`, `git push`. |
| Mau situs tidak bisa dibuka sembarang orang | Aktifkan Password Protection di **Settings → Deployment Protection** (fitur ini tergantung paket Vercel kamu). |


---

*Dibuat untuk portfolio Erika. Kalau ada bagian yang berubah (file dipindah, section baru), perbarui panduan ini supaya tetap sesuai.*

# Folder gambar portofolio

Taruh gambar di sini dengan nama dan folder yang sudah ditentukan. Situs membacanya otomatis, kode tidak perlu diubah.
Kalau slot kosong: kartu proyek memakai gambar hias bawaan, sedangkan foto Journey yang kosong tidak ditampilkan.

```
src/images/
├── projects/
│   ├── <kode-proyek>/        15 folder, satu per proyek
│   │   ├── card.jpg          gambar kartu (4:3, min 1200x900)
│   │   ├── card-light.jpg    opsional, untuk tema terang
│   │   ├── shot-1.jpg        screenshot (lebar min 1600)
│   │   └── shot-2.jpg ...    dan seterusnya
├── certificates/
│   └── 1.jpg, 2.jpg, ...     urut sesuai daftar sertifikat
└── journey/
    ├── db-klik/              1.jpg ... 5.jpg
    ├── telkomsel/            1.jpg ... 4.jpg
    ├── marketplace/          1.jpg ... 4.jpg
    └── student/              1.jpg ... 4.jpg
```

Kode proyek: stock-optimization, telkomsel-bi, olist-ecommerce, airbnb-nyc, hr-analytics, business-financial, retail-sales, coffee-shop, deforestation, ethereum-prophet, flood-relief-routes, fuzzy-temperature, weather-kafka, graph-friendship, excel-dimensions

Setiap folder punya file _ISI-DISINI.txt berisi nama file persis yang dibutuhkan.

Cek yang sudah dan belum terisi: jalankan `npm run media`.
Lalu `npm run dev` untuk melihat hasilnya di browser.

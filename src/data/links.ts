/**
 * TEMPAT MENEMPEL LINK
 * ====================
 * Cukup tempel URL lengkap (diawali https://) di antara tanda kutip.
 * Yang dibiarkan kosong ('') tidak akan menampilkan tombol apa pun.
 *
 *   github    -> tombol "GitHub"
 *   dashboard -> tombol "Live Dashboard"  (Looker Studio / Tableau Public / Power BI)
 *   demo      -> tombol "Live Demo"       (Streamlit / website / aplikasi)
 *   report    -> tombol "Report"          (PDF / Google Drive / Colab / Kaggle)
 *
 * captions (opsional): keterangan untuk screenshot, urut sesuai shot-1, shot-2, dst.
 * Contoh:
 *   'retail-sales': {
 *     github: 'https://github.com/username/retail-sales',
 *     dashboard: 'https://lookerstudio.google.com/reporting/abc123',
 *     demo: '', report: '',
 *     captions: ['Ringkasan penjualan per bulan', 'Performa per cabang'],
 *   },
 */
export type ProjectLinkFields = {
  github: string;
  dashboard: string;
  demo: string;
  report: string;
  captions?: string[];
};

export const projectLinks: Record<string, ProjectLinkFields> = {
  'stock-optimization':  { github: '', dashboard: '', demo: '', report: '' },
  'telkomsel-bi':        { github: '', dashboard: '', demo: '', report: '' },
  'olist-ecommerce':     { github: '', dashboard: '', demo: '', report: '' },
  'airbnb-nyc':          { github: '', dashboard: '', demo: '', report: '' },
  'hr-analytics':        { github: '', dashboard: '', demo: '', report: '' },
  'business-financial':  { github: '', dashboard: '', demo: '', report: '' },
  'retail-sales':        { github: '', dashboard: '', demo: '', report: '' },
  'coffee-shop':         { github: '', dashboard: '', demo: '', report: '' },
  'deforestation':       { github: '', dashboard: '', demo: '', report: '' },
  'ethereum-prophet':    { github: '', dashboard: '', demo: '', report: '' },
  'flood-relief-routes': { github: '', dashboard: '', demo: '', report: '' },
  'fuzzy-temperature':   { github: '', dashboard: '', demo: '', report: '' },
  'weather-kafka':       { github: '', dashboard: '', demo: '', report: '' },
  'graph-friendship':    { github: '', dashboard: '', demo: '', report: '' },
  'excel-dimensions':    { github: '', dashboard: '', demo: '', report: '' },
};

/** Link profil umum. Yang diisi akan muncul sebagai tombol di bagian paling bawah situs. */
export const profileExtraLinks = {
  github: '',
  tableau: '',
  looker: '',
};

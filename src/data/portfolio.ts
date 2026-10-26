/**
 * Central portfolio data - generated from Erika's CV and project portfolio
 * (CV_Erika_Fatimatul_Hidayanti_career_-_New.pdf, Portofolio_Erika_Fatimatul_Hidayanti.pdf).
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 * Nothing here should be added unless it appears on the CV or portfolio.
 */
import { projectLinks } from './links';
import { findByNumber, findImage, findNumbered } from './media';


export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Erika Fatimatul Hidayanti',
  displayName: 'Erika Hidayanti',
  firstName: 'ERIKA',
  seriesTag: 'PORTFOLIO',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'AN ERIKA ORIGINAL',
  role: 'Data Analyst',
  tagline: ['Data Analyst', 'Business Intelligence', 'Data Scientist'],
  intro:
    'Data Analyst with 2+ years of hands-on experience in data analysis, business intelligence, and prediction. I turn complex data into actionable business insights with Python, SQL, Power BI, Tableau and Looker Studio, building machine learning models and dashboards that support strategic decisions.',
  location: 'Surabaya, East Java',
  email: 'erikaftmtl13@gmail.com',
  phone: '+62 831-6409-0690',
  links: {
    linkedin: 'https://www.linkedin.com/in/erika-fatimatul',
    instagram: 'https://www.instagram.com/erika_fh13',
  },
  resumePdf: '/assets/Erika_Fatimatul_Hidayanti_CV.pdf',
  resumeFile: 'Erika_Fatimatul_Hidayanti_CV.pdf',
  /** The CV rendered to images by `npm run cv`, shown in the resume viewer. */
  resumePages: ['/assets/cv/page-1.jpg', '/assets/cv/page-2.jpg'],
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w, /assets/portrait-1600.webp 1600w, /assets/portrait-2000.webp 2000w',
    alt: 'Portrait of Erika Fatimatul Hidayanti',
  },
  interests: ['Business Intelligence', 'Supply Chain Analytics', 'Inventory Optimization', 'Forecasting', 'E-Commerce Analytics'],
};

export const education = [
  {
    school: 'Universitas Pembangunan Nasional Veteran Jawa Timur',
    place: 'Surabaya',
    degree: 'Undergraduate in Data Science',
    period: 'August 2022 – Present',
    note: 'Python & Scikit-Learn',
    coursework:
      'Exploratory Data Analysis, Data Mining, Machine Learning, Big Data, Cloud Computing, Advanced Programming Algorithms, Artificial Intelligence, Data Wrangling, Multivariate Statistics',
  },
];

export const experience = [
  {
    company: 'CV. DB Klik',
    role: 'Data Analyst',
    place: 'Surabaya, East Java',
    period: 'Jan 2025 – Oct 2026',
    points: [
      'Led a team of 11 data analyst interns as Person in Charge (PIC), coordinating analytical tasks, mentoring members and keeping deliverables aligned with company objectives.',
      'Engineered a daily Shopee and Tokopedia scraper tracking 50+ competitors (~100K data points per day) across product price, stock and monthly sales.',
      'Uncovered IDR 31.9 bn in recoverable cash through a Cash Conversion Cycle (CCC) analysis of inventory and receivables.',
      'Built an inventory forecasting system for 6 branches that automates min/max stock levels and purchase order recommendations, exposing IDR 16.8 bn of excess inventory and 708 SKUs with unmet demand.',
      'Analyzed 144,000+ transactions across ~2,500 products and deployed a Power BI dashboard tracking 10+ KPIs, enabling 15% faster identification of top products.',
      'Delivered 50+ Excel analyses using INDEX-MATCH, XLOOKUP, SUMIFS, nested IF and PivotTables.',
    ],
  },
  {
    company: 'Little Totler',
    role: 'Marketplace Operation',
    place: 'Singapore (Work From Home)',
    period: 'Aug 2025 – Feb 2026',
    points: [
      'Managed end-to-end operations across major marketplaces (Shopee, Shopify, Lazada, Tokopedia, TikTok), driving 30% growth in Gross Merchandise Volume within 6 months.',
      'Managed the Instagram and TikTok channels, creating and scheduling 30+ content pieces (posts, Reels, Stories) monthly.',
      'Created monthly sales and performance reports analyzing marketplace metrics, campaign results and product performance.',
    ],
  },
  {
    company: 'Boughtnex',
    role: 'Marketplace Operation',
    place: 'Singapore (Work From Home)',
    period: 'June 2025 – Aug 2025',
    points: [
      'Oversaw end-to-end operations for 6 stores on 3 key platforms (Shopee, Lazada, Tokopedia TikTok).',
      'Spearheaded major sales campaigns (9.9, 11.11, Payday Sales) and analyzed competitor marketing tactics and ad spending to develop counter-campaigns.',
    ],
  },
  {
    company: 'Telkomsel Branch Surabaya',
    role: 'Data Analyst',
    place: 'Surabaya, East Java',
    period: 'Sept 2024 – Dec 2024',
    points: [
      'Processed and analyzed 1M+ rows of customer data, finding that the top 10% of users contributed 40% of total revenue, which informed a new loyalty program.',
      'Developed 10+ interactive Looker Data Studio dashboards for sales, events and customer feedback.',
      'Provided data-driven recommendations that strengthened sales strategies and business growth initiatives.',
    ],
  },
  {
    company: 'UKKI · UPN “Veteran” Jawa Timur',
    role: 'General Secretary',
    kind: 'organization',
    place: 'Islamic student organization (±80 active members)',
    period: 'Jan 2024 – Dec 2025',
    points: [
      'Led and coordinated 6 department secretaries, keeping administration consistent and on schedule.',
      'Oversaw correspondence, minutes, archives and the annual work program: ±40 programs and ±60 official letters managed, numbered and tracked each year.',
      'Recorded, distributed and followed up minutes for ±20 board and organization meetings. Earlier served as Talent and Interest Department Secretary (Jan – Dec 2023).',
    ],
  },
];

/** Paid / professional roles only - student organization roles are excluded from the counts. */
export const workExperience = experience.filter((e) => e.kind !== 'organization');

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  /** Short badge shown on the card (tool or discipline). */
  tag: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Tombol link yang tampil. Diisi otomatis dari src/data/links.ts, jangan diisi manual di sini. */
  links?: { label: string; url: string }[];
  /** Optional public link. When omitted the link button is hidden. */
  github?: string;
  /** Optional screenshot, e.g. '/assets/projects/telkomsel-bi.jpg'. Falls back to the generated art. */
  image?: string;
  /** Optional version of the screenshot for the light theme; when omitted `image` is used in both themes. */
  imageLight?: string;
  /** Optional full-size dashboard / result screenshots, shown in the project modal under "Preview". */
  screenshots?: { src: string; caption: string }[];
  palette: Palette;
  motif: 'bars' | 'line' | 'cluster' | 'route' | 'stock' | 'flow' | 'sheet';
  /** Which rail the project sits in on the Projects section. */
  group: 'dashboard' | 'ml' | 'excel';
};

const tealP: Palette = { from: '#021a1c', via: '#0b6b73', to: '#04090a', accent: '#2ee6d6' };
const amberP: Palette = { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' };
const oceanP: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violetP: Palette = { from: '#150a26', via: '#46207a', to: '#07060c', accent: '#b98bff' };
const jadeP: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const projects: Project[] = [
  {
    id: 'stock-optimization',
    image: '/assets/projects/stock-optimization.jpg',
    imageLight: '/assets/projects/stock-optimization-light.jpg',
    title: 'Stock Optimization System',
    tag: 'Streamlit',
    genre: 'Machine Learning • Inventory',
    logline: 'An end-to-end stock analysis app that turns sales history into min/max stock levels and purchase orders for every branch.',
    stack: ['Python', 'Excel', 'Streamlit', 'WMA', 'ABC Analysis'],
    build: [
      'Integrates historical sales data, product reference data and current stock levels to generate stock recommendations: minimum stock, maximum stock, stock status and suggested purchase orders (PO) per branch.',
      'Deployed as an interactive Streamlit web app so operational teams can run the analysis on their own, without manual calculations.',
    ],
    features: [
      'Minimum and maximum stock per branch',
      'Stock status and suggested purchase orders',
      'Weighted Moving Average (WMA) demand forecasting',
      'ABC Analysis for prioritisation',
      'Interactive Streamlit web app',
    ],
    metrics: [
      { value: '6', label: 'branches covered' },
      { value: 'IDR 16.8 bn', label: 'excess inventory exposed' },
      { value: '708', label: 'SKUs with unmet demand' },
    ],
    palette: amberP,
    motif: 'stock',
    group: 'ml',
  },
  {
    id: 'telkomsel-bi',
    image: '/assets/projects/telkomsel-bi.jpg',
    imageLight: '/assets/projects/telkomsel-bi-light.jpg',
    title: 'Telkomsel BI Dashboard',
    tag: 'Looker Studio',
    genre: 'Business Intelligence • Telecom',
    logline: 'One integrated view of sales performance, event activation results and customer characteristics across Surabaya–Madura.',
    stack: ['Looker Studio'],
    build: [
      'Consolidates multiple data sources into a single dashboard so stakeholders can track performance, evaluate event effectiveness and understand customer behavior without fragmented or manual reports.',
      'Part of the Telkomsel Branch Surabaya internship, where 1M+ rows of customer data were analyzed and 10+ interactive dashboards delivered.',
    ],
    features: ['Sales performance tracking', 'Event activation results', 'Customer characteristics', 'Surabaya–Madura regional view'],
    metrics: [
      { value: '10+', label: 'interactive dashboards delivered' },
      { value: '1M+', label: 'customer rows analyzed' },
      { value: 'Top 10%', label: 'of users drove 40% of revenue' },
    ],
    palette: tealP,
    motif: 'bars',
    group: 'dashboard',
  },
  {
    id: 'olist-ecommerce',
    image: '/assets/projects/shots/olist-1.jpg',
    screenshots: [
      { src: '/assets/projects/shots/olist-1.jpg', caption: 'Orders: volume, revenue, product categories and customer geography' },
      { src: '/assets/projects/shots/olist-2.jpg', caption: 'Customer experience: ratings, Net Promoter Score and review comments' },
    ],
    title: 'Olist E-Commerce Dashboard',
    tag: 'Power BI',
    genre: 'E-Commerce Analytics',
    logline: 'Sales, customers, products and reviews joined into one view of business performance and customer experience across Brazil.',
    stack: ['Power BI'],
    build: [
      'Analyzes the Olist dataset to understand sales trends, customer distribution, product performance and customer satisfaction.',
      'Two report pages: an orders view (volume, revenue, product categories, customer city and state) and a customer-experience view (rating distribution, Net Promoter Score and a review-comment word cloud).',
      'Integrates transactional data with customer reviews for a holistic view across regions and product categories in Brazil.',
    ],
    features: ['Order and revenue trends 2016–2018', 'Customer distribution by city and state', 'Product category ranking', 'Rating distribution, NPS and review word cloud'],
    metrics: [
      { value: '97,916', label: 'orders analyzed' },
      { value: '$12.3M', label: 'revenue tracked' },
      { value: '4.1', label: 'average customer rating' },
      { value: '36%', label: 'Net Promoter Score' },
    ],
    palette: oceanP,
    motif: 'bars',
    group: 'dashboard',
  },
  {
    id: 'airbnb-nyc',
    image: '/assets/projects/shots/airbnb-1.jpg',
    screenshots: [
      { src: '/assets/projects/shots/airbnb-1.jpg', caption: 'Listings: districts, neighbourhoods, room and property types, price map' },
      { src: '/assets/projects/shots/airbnb-2.jpg', caption: 'Reviews: review volume, rating trend and scores by aspect' },
      { src: '/assets/projects/shots/airbnb-3.jpg', caption: 'Hosts: superhost share, response time, acceptance rate and verification' },
    ],
    title: 'Airbnb NYC Analytics',
    tag: 'Looker Studio',
    genre: 'Marketplace Analytics • Exploratory',
    logline: 'Listings, reviews and host data in one dashboard to explore pricing, geography and platform dynamics in New York City.',
    stack: ['Looker Studio'],
    build: [
      'Analyzes Airbnb marketplace data to understand supply characteristics, customer satisfaction and host behavior.',
      'Three connected dashboard pages (Listings, Reviews and Hosts) with filters for district, neighbourhood, room type, property type, price and instant booking.',
      'Integrates listing data, review metrics and host information into a single analytical view for exploring pricing patterns and geographic distribution.',
    ],
    features: ['Pricing patterns and listing map', 'Review volume and rating trend', 'Host response time and acceptance rate', 'Superhost and identity verification share'],
    metrics: [
      { value: '11,849', label: 'listings analyzed' },
      { value: '514K', label: 'reviews' },
      { value: '7,401', label: 'hosts' },
      { value: '94.6', label: 'average review rating' },
    ],
    palette: tealP,
    motif: 'bars',
    group: 'dashboard',
  },
  {
    id: 'hr-analytics',
    image: '/assets/projects/shots/hr-analytics.jpg',
    screenshots: [{ src: '/assets/projects/shots/hr-analytics.jpg', caption: 'Attrition by department, age group, gender, education field and job satisfaction' }],
    title: 'HR Analytics Dashboard',
    tag: 'Tableau',
    genre: 'People Analytics',
    logline: 'Workforce data turned into clear visibility on attrition, distribution and the factors behind employee turnover.',
    stack: ['Tableau'],
    build: [
      'Analyzes workforce data to understand employee attrition patterns and key workforce characteristics.',
      'Designed so HR stakeholders can see employee distribution, attrition trends and the factors that may influence turnover, by department, age group, gender, education field and job satisfaction by role.',
    ],
    features: ['Attrition by department, gender and age group', 'Workforce age distribution', 'Education-field attrition', 'Job satisfaction by role'],
    metrics: [
      { value: '1,470', label: 'employees analyzed' },
      { value: '16.12%', label: 'attrition rate' },
      { value: '237', label: 'employees who left' },
      { value: '1,233', label: 'active employees' },
    ],
    palette: violetP,
    motif: 'bars',
    group: 'dashboard',
  },
  {
    id: 'business-financial',
    image: '/assets/projects/business-financial.jpg',
    imageLight: '/assets/projects/business-financial-light.jpg',
    title: 'Business & Financial Dashboard',
    tag: 'Power BI',
    genre: 'Financial Analytics',
    logline: 'Portfolio metrics, financial statements and receivables aging in a single view for strategic and financial decisions.',
    stack: ['Power BI'],
    build: [
      'Monitors portfolio performance, financial health and receivables risk across multiple business units and entities.',
      'Consolidates business portfolio metrics, financial statements and receivables aging into one analytical view.',
    ],
    features: ['Portfolio performance', 'Financial statement metrics', 'Receivables aging and risk', 'Multiple business units'],
    metrics: [{ value: 'Power BI', label: 'built with' }],
    palette: jadeP,
    motif: 'bars',
    group: 'dashboard',
  },
  {
    id: 'retail-sales',
    image: '/assets/projects/shots/retail-sales.jpg',
    screenshots: [{ src: '/assets/projects/shots/retail-sales.jpg', caption: 'DB Klik sales-quantity analysis (some figures blurred for confidentiality)' }],
    title: 'Retail Sales Dashboard',
    tag: 'Power BI',
    genre: 'Retail Analytics',
    logline: 'Sales performance sliced by time, city, marketplace, category, brand and customer.',
    stack: ['Power BI'],
    build: [
      'Analyzes retail sales across time, city, marketplace, product category, brand and customer.',
      'Gives a comprehensive view of transaction volume, revenue and product movement to monitor sales trends and compare channels. Built at DB Klik, with confidential figures blurred.',
    ],
    features: ['Transaction volume and revenue', 'Marketplace comparison (Tokopedia, Shopee, website, offline)', 'Category, brand and department breakdown', 'Product movement and customer ranking'],
    metrics: [
      { value: '940K+', label: 'units in the product ranking' },
      { value: '3 yrs', label: 'monthly series, 2023–2025' },
    ],
    palette: oceanP,
    motif: 'bars',
    group: 'dashboard',
  },
  {
    id: 'coffee-shop',
    title: 'Coffee Shop Sales Performance',
    tag: 'Power BI',
    genre: 'Operational Dashboard',
    logline: 'An operational monitoring tool for daily revenue, order volume, products and peak sales patterns.',
    stack: ['Power BI'],
    build: [
      'Provides detailed visibility into revenue, order volume and quantity sold across time, products and store locations.',
      'Designed for daily performance tracking, comparison with previous periods and identification of peak sales patterns.',
    ],
    features: ['Daily revenue tracking', 'Comparison with previous periods', 'Product demand', 'Peak sales patterns by store'],
    metrics: [{ value: 'Power BI', label: 'built with' }],
    palette: amberP,
    motif: 'line',
    group: 'dashboard',
  },
  {
    id: 'deforestation',
    title: 'Indonesia Deforestation Analysis',
    tag: 'K-Means · OLS',
    genre: 'Machine Learning • Environment',
    logline: 'K-Means clustering and OLS regression reveal how land use drives deforestation across Indonesian provinces.',
    stack: ['Python', 'K-Means', 'OLS Regression'],
    build: [
      'Explores the relationship between land use activities and deforestation using K-Means clustering and OLS regression, with a correlation heatmap across plantations, mining, settlements and rehabilitation land.',
      'Results show mining and urbanization significantly drive deforestation. Provinces fall into two clusters: Papua and West Papua (high forest potential, high deforestation and fire risk) and the rest, such as Bengkulu, Jambi and South Sumatra (lower rates, but pressure from settlements and mining).',
      'Written up as a paper for an Academic Competition of Data Science, co-authored with two teammates, with recommendations on rehabilitation, spatial planning and satellite monitoring.',
    ],
    features: ['K-Means clustering of provinces', 'OLS regression on land use drivers', 'Correlation heatmap', 'Two risk clusters with policy recommendations'],
    metrics: [
      { value: '2', label: 'province risk clusters' },
      { value: 'Mining & urbanization', label: 'significant drivers' },
      { value: '3', label: 'authors, competition paper' },
    ],
    palette: jadeP,
    motif: 'cluster',
    group: 'ml',
  },
  {
    id: 'ethereum-prophet',
    title: 'Ethereum Price Forecasting',
    tag: 'Prophet',
    genre: 'Time Series • Cryptocurrency',
    logline: 'A Facebook Prophet model that captures trend and seasonality to forecast short-term Ethereum prices.',
    stack: ['Python', 'Facebook Prophet'],
    build: [
      'Led a team of three as group lead on a project-based-learning course in exploratory data analysis.',
      'Uses Facebook’s Prophet algorithm to forecast Ethereum price trends from historical time series data, capturing seasonality and trend components for short-term predictions.',
      'Evaluated the forecast with RMSE, MSE, MAE, R² and MAPE, and projected the trend through 2024.',
    ],
    features: ['Trend and seasonality decomposition', 'Short-term price forecasts', 'Model evaluation (RMSE, MAE, MAPE)', 'Cryptocurrency analytics'],
    metrics: [
      { value: '0.0857', label: 'RMSE reported' },
      { value: '0.0618', label: 'MAE reported' },
      { value: '3', label: 'team members, as group lead' },
    ],
    palette: violetP,
    motif: 'line',
    group: 'ml',
  },
  {
    id: 'flood-relief-routes',
    title: 'Flood Relief Routes',
    tag: 'Dijkstra · GIS',
    genre: 'Optimization • Social Impact',
    logline: 'Dijkstra’s algorithm finds the fastest routes to deliver aid to flood-affected residents in Cerme, Gresik.',
    stack: ['Python', 'NetworkX', 'Matplotlib', 'Tkinter', 'Dijkstra’s Algorithm'],
    build: [
      'Applies Dijkstra’s algorithm to determine the most efficient routes for distributing social aid to flood-affected residents in Cerme District, Gresik, where the Kali Lamong River regularly overflows.',
      'Models the district as a weighted graph of 25 villages (nodes) and roads with distance weights (edges), routing from the health center distribution point to any affected village.',
      'Built in object-oriented Python with a console version and a Tkinter GUI that takes a start and destination, then draws the shortest route and its total distance. Team project of five.',
    ],
    features: ['Shortest-path routing on a 25-village graph', 'Object-oriented implementation', 'GUI that visualizes the route and distance', 'Emergency aid logistics'],
    metrics: [
      { value: '25', label: 'villages in the road graph' },
      { value: 'Cerme, Gresik', label: 'study area' },
      { value: '5', label: 'team members' },
    ],
    palette: oceanP,
    motif: 'route',
    group: 'ml',
  },
  {
    id: 'fuzzy-temperature',
    title: 'Smart Temperature Control',
    tag: 'Fuzzy Logic',
    genre: 'Smart Systems • Control',
    logline: 'A Fuzzy Logic controller that adjusts fan or AC levels as the room environment changes.',
    stack: ['Fuzzy Logic', 'Sugeno Method'],
    build: [
      'Designed an automated room temperature control system using Fuzzy Logic (Sugeno method) to adjust AC temperature and fan speed based on changing environmental conditions.',
      'Two inputs, room temperature (four categories) and number of people (three categories), feed a rule base that recommends the optimal AC setting. Team project of six, written up as a journal paper.',
      'Improves comfort and energy efficiency through intelligent decision-making.',
    ],
    features: ['Fuzzy Sugeno rule base', 'Inputs: room temperature and number of people', 'Automatic fan / AC adjustment', 'Comfort and energy efficiency'],
    metrics: [
      { value: 'Sugeno', label: 'fuzzy inference method' },
      { value: '2', label: 'inputs (4 temperature + 3 occupancy levels)' },
      { value: '6', label: 'team members' },
    ],
    palette: tealP,
    motif: 'flow',
    group: 'ml',
  },
  {
    id: 'weather-kafka',
    image: '/assets/projects/shots/weather-tableau.jpg',
    screenshots: [{ src: '/assets/projects/shots/weather-tableau.jpg', caption: 'Tableau weather dashboard: temperature, humidity, wind direction, sunshine duration and rainfall' }],
    title: 'Surabaya Weather Dashboard',
    tag: 'Kafka · Tableau',
    genre: 'Big Data • Streaming Dashboard',
    logline: 'A streaming pipeline that moves BMKG weather data through Apache Kafka into MySQL and a Tableau dashboard for Surabaya.',
    stack: ['Apache Kafka', 'Python', 'MySQL', 'Tableau'],
    build: [
      'Built an end-to-end pipeline for a Big Data project-based-learning course: a Python Kafka producer publishes BMKG daily climate records to a topic, consumers clean the data and store it in MySQL, and Tableau reads from the database.',
      'The dashboard shows maximum, average and minimum temperature, humidity, wind direction by month, humidity against sunshine duration, wind speed and rainfall, revealing, for example, a positive link between sunshine duration and humidity.',
      'Team project of six, written up as a full final report.',
    ],
    features: ['Kafka producer and consumer pipeline', 'MySQL storage of cleaned weather data', 'Interactive Tableau dashboard', 'Temperature, humidity, wind and rainfall analysis'],
    metrics: [
      { value: '1,624', label: 'daily records, 2020–2024' },
      { value: '3', label: 'stages: Kafka → MySQL → Tableau' },
      { value: '6', label: 'team members' },
    ],
    palette: oceanP,
    motif: 'flow',
    group: 'dashboard',
  },
  {
    id: 'graph-friendship',
    title: 'Friendship Path Search',
    tag: 'Stack · BFS',
    genre: 'Algorithms • Graph Theory',
    logline: 'Graph traversal that traces friendship paths in a social network using a Stack (LIFO) and Breadth-First Search.',
    stack: ['Python', 'Graph', 'Stack (LIFO)', 'Breadth-First Search', 'collections.deque'],
    build: [
      'Models a friendship network as a graph where people are nodes and friendships are edges.',
      'Implements two traversals in Python with collections.deque: a Stack (LIFO) search that returns the first person whose name matches a condition, and a Breadth-First Search from the starting node that explores friends level by level.',
      'Compares how LIFO and FIFO structures behave on network-analysis questions such as the closest connections and shortest paths.',
    ],
    features: ['Graph of people and friendships', 'Stack (LIFO) search', 'Breadth-First Search by level', 'Shortest-path style connections'],
    metrics: [{ value: '2', label: 'traversal methods compared' }],
    palette: violetP,
    motif: 'route',
    group: 'ml',
  },
  {
    id: 'excel-dimensions',
    title: 'Dimension Adjustment Logic',
    tag: 'Excel',
    genre: 'Excel • E-Commerce Operations',
    logline: 'A custom Excel logic system that converts product dimensions to each client’s display requirements.',
    stack: ['Excel'],
    build: [
      'Developed a customized Excel logic system that automatically converts and adjusts product dimensions (Length × Width × Height) to meet client-specific display requirements on an e-commerce platform.',
      'Keeps dimension formatting consistent and accurate, with support for bulk data handling and validation with minimal manual input.',
    ],
    features: ['Automatic L × W × H conversion', 'Client-specific display rules', 'Bulk data handling and validation'],
    metrics: [{ value: '50+', label: 'Excel analyses delivered at DB Klik' }],
    palette: amberP,
    motif: 'sheet',
    group: 'excel',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'bsi-scholarship',
    title: 'Awardee',
    org: 'BSI Scholarship Batch 3',
    detail: 'Selected as a scholarship awardee in 2023.',
    laurel: 'Scholarship',
  },
  {
    id: 'pmw-funding',
    title: 'Awardee',
    org: 'Business Funding PMW',
    detail: 'Business funding awardee at UPN “Veteran” Jawa Timur in 2024.',
    laurel: 'Business Funding',
  },
  {
    id: 'team-lead',
    title: 'Team Lead',
    org: 'CV. DB Klik',
    detail: 'Person in Charge of 11 data analyst interns, coordinating tasks, mentoring members and aligning deliverables with company goals.',
    laurel: 'Leadership',
  },
  {
    id: 'ccc-impact',
    title: 'IDR 31.9 bn',
    org: 'Recoverable Cash Uncovered',
    detail: 'Found through a Cash Conversion Cycle analysis of inventory and receivables.',
    laurel: 'Business Impact',
  },
  {
    id: 'general-secretary',
    title: 'General Secretary',
    org: 'UKKI · UPN “Veteran” Jawa Timur',
    detail: 'Led 6 department secretaries across an organization of ±80 active members (2024 – 2025).',
    laurel: 'Organization',
  },
];

export type Certification = { issuer: string; name: string; year?: string; /** Image of the certificate shown full-size by the "View certificate" button. */ image?: string; /** Optional external credential page (used when there is no image). */ link?: string; /** Marks a placeholder: shows a SAMPLE badge and stays out of the resume sheet. Delete the flag once the entry is real. */ sample?: boolean };

/**
 * Certifications. The CV lists none, so the eight entries below are SAMPLES to be replaced with real ones
 * (issuer, certificate name, year, and the certificate image in public/assets/certificates/ or a link). If the list is emptied the section hides itself.
 */
export const certifications: Certification[] = [
  // Belum ada sertifikat asli, jadi bagian "Certifications" otomatis disembunyikan.
  // Untuk menampilkannya, tambah satu baris per sertifikat (hapus tanda // di depan contoh):
  // { issuer: 'Coursera', name: 'Google Data Analytics Certificate', year: '2024' },
  // Gambar sertifikat: taruh src/images/certificates/1.jpg (urut sesuai baris di sini), 2.jpg, dst.
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'technical',
    title: 'Technical',
    subtitle: 'Code, queries & statistics',
    skills: [
      { name: 'Python (Pandas, NumPy, Scikit-Learn)', mono: 'Py' },
      { name: 'Statsmodels & SciPy', mono: 'St' },
      { name: 'TensorFlow / Keras', mono: 'Tf' },
      { name: 'Streamlit', mono: 'Sl' },
      { name: 'MySQL', mono: 'My' },
      { name: 'Web Scraping', mono: 'Ws' },
      { name: 'SPSS', mono: 'Sp' },
      { name: 'Excel', mono: 'Xl' },
    ],
  },
  {
    id: 'visualization',
    title: 'Data Visualization',
    subtitle: 'Dashboards that tell the story',
    skills: [
      { name: 'Power BI', mono: 'Pb' },
      { name: 'Tableau', mono: 'Tb' },
      { name: 'Looker Studio', mono: 'Ls' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    subtitle: 'Forecasting & modelling',
    skills: [
      { name: 'Time Series Forecasting', mono: 'Ts' },
      { name: 'Intermittent Demand (SBC)', mono: 'Id' },
      { name: 'Machine Learning (LightGBM)', mono: 'Ml' },
      { name: 'Deep Learning (CNN)', mono: 'Dl' },
      { name: 'Inventory Analytics (WMA, ABC)', mono: 'Iv' },
      { name: 'Regression', mono: 'Rg' },
      { name: 'Clustering (K-Means, PCA)', mono: 'Cl' },
      { name: 'Exploratory Data Analysis', mono: 'Ed' },
    ],
  },
  {
    id: 'tools',
    title: 'Other Tools',
    subtitle: 'Presentation & content',
    skills: [
      { name: 'Microsoft Word & PowerPoint', mono: 'Ms' },
      { name: 'Canva', mono: 'Cv' },
      { name: 'CapCut', mono: 'Cc' },
      { name: 'Photography', mono: 'Ph' },
      { name: 'Social Media Content', mono: 'Sm' },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    subtitle: 'Working with people',
    skills: [
      { name: 'Public Speaking', mono: 'Ps' },
      { name: 'Teamwork', mono: 'Tw' },
      { name: 'Leadership', mono: 'Ld' },
      { name: 'Critical Thinking', mono: 'Ct' },
      { name: 'Problem Solving', mono: 'Pr' },
      { name: 'Time Management', mono: 'Tm' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Spoken & written',
    skills: [
      { name: 'Indonesian (Native)', mono: 'Id' },
      { name: 'English (Passive)', mono: 'En' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the experience or projects on the CV.
 */
export const skillEvidence: Record<string, string[]> = {
  'Python (Pandas, NumPy, Scikit-Learn)': ['Thesis forecasting pipeline', 'Stock Optimization System', 'Telkomsel customer clustering', 'Deforestation analysis', 'Ethereum forecasting'],
  'Statsmodels & SciPy': ['Thesis: statistical tests on forecast errors', 'Statistika Regresi coursework', 'Deforestation (OLS regression)'],
  'TensorFlow / Keras': ['Deep Learning II coursework (CNN)'],
  Streamlit: ['Stock Optimization System', 'Stock & ABC analysis app'],
  MySQL: ['Advanced Database (Basis Data Lanjut) coursework'],
  'Web Scraping': ['Daily Shopee & Tokopedia scraper at DB Klik (~100K data points/day)', 'Big Data coursework (scraping & crawling)'],
  Excel: ['50+ analyses at CV. DB Klik', 'Product Dimension Adjustment Logic'],
  'Power BI': ['Sales dashboard at DB Klik (10+ KPIs)', 'Olist', 'Retail Sales', 'Coffee Shop', 'Business & Financial'],
  Tableau: ['HR Analytics Dashboard'],
  'Looker Studio': ['10+ dashboards at Telkomsel', 'Airbnb Marketplace Analytics'],
  'Time Series Forecasting': ['Thesis: 30-day demand forecasting', 'Ethereum Price Forecasting', 'Inventory forecasting at DB Klik'],
  'Intermittent Demand (SBC)': ['Thesis: Syntetos-Boylan Classification of 3,271 product series'],
  'Machine Learning (LightGBM)': ['Thesis: Two-Part LightGBM with Optuna tuning', 'Deforestation (K-Means)', 'UPN Data Science coursework'],
  'Deep Learning (CNN)': ['Deep Learning II coursework'],
  'Inventory Analytics (WMA, ABC)': ['Stock Optimization System', 'IDR 16.8 bn excess inventory exposed', 'Thesis: ABC classification & WMA benchmark'],
  Regression: ['Deforestation (OLS regression)', 'Statistika Regresi coursework'],
  'Clustering (K-Means, PCA)': ['Deforestation (K-Means)', 'Telkomsel customer clustering'],
  'Exploratory Data Analysis': ['Analisis Data Eksplorasi coursework', 'Telkomsel 1M+ row analysis'],
  Leadership: ['PIC of 11 interns', 'General Secretary of UKKI'],
  'Social Media Content': ['Little Totler: 30+ pieces a month', 'UKKI Instagram @difaaul_balad'],
};

const teal = tealP;
const amber = amberP;
const violet = violetP;
const jade = jadeP;
const ocean = oceanP;

/**
 * My Experience: one chapter per part of the work history, each with a rail of documentation.
 * To use real photos, put the files in public/assets/journey/ and set `src`, e.g.
 * { caption: 'Team meeting', src: '/assets/journey/db-klik-1.jpg', palette: amber }.
 * Docs without a `src` show a placeholder card with the caption.
 */
export type JourneyDoc = { caption: string; src?: string; palette: Palette };

export type JourneyChapter = {
  id: string;
  tab: string;
  title: string;
  org: string;
  period: string;
  summary: string;
  /** Headline numbers for the chapter, taken from the CV. */
  stats: { value: string; label: string }[];
  docs: JourneyDoc[];
};

export const journey: JourneyChapter[] = [
  {
    id: 'db-klik',
    tab: 'DB Klik',
    title: 'Data Analyst',
    org: 'CV. DB Klik',
    period: 'Jan 2025 – Oct 2026',
    summary: 'Competitor monitoring, cash conversion analysis and inventory forecasting for 6 branches, turning raw business data into decisions, while leading a team of analyst interns.',
    stats: [
      { value: 'IDR 31.9 bn', label: 'recoverable cash uncovered' },
      { value: '~100K / day', label: 'competitor data points scraped' },
      { value: '11 interns', label: 'led as Person in Charge' },
    ],
    docs: [
      { caption: 'Team photo', palette: violet },
      { caption: 'Daily work at the office', palette: ocean },
      { caption: 'Team meeting', palette: teal },
      { caption: 'Mentoring the interns', palette: amber },
      { caption: 'Company moments', palette: jade },
    ],
  },
  {
    id: 'telkomsel',
    tab: 'Telkomsel',
    title: 'Data Analyst',
    org: 'Telkomsel Branch Surabaya',
    period: 'Sept 2024 – Dec 2024',
    summary: 'Customer, sales and event analysis at Telkomsel Branch Surabaya, delivered as interactive dashboards that informed a new loyalty program.',
    stats: [
      { value: '1M+', label: 'rows of customer data analyzed' },
      { value: 'Top 10% = 40%', label: 'of users drove revenue' },
      { value: '10+', label: 'Looker Studio dashboards' },
    ],
    docs: [
      { caption: 'Team photo', palette: teal },
      { caption: 'Daily work at the office', palette: ocean },
      { caption: 'Team meeting', palette: amber },
      { caption: 'Internship moments', palette: violet },
    ],
  },
  {
    id: 'marketplace',
    tab: 'Marketplace Operation',
    title: 'Marketplace Operation',
    org: 'Little Totler · Boughtnex',
    period: 'June 2025 – Feb 2026',
    summary: 'End-to-end marketplace operations, sales campaigns and monthly performance reporting across Shopee, Lazada, Tokopedia and TikTok.',
    stats: [
      { value: '+30% GMV', label: 'growth in 6 months' },
      { value: '6 stores', label: 'run across 3 key platforms' },
      { value: '30+ posts', label: 'of content created monthly' },
    ],
    docs: [
      { caption: 'Working from home', palette: jade },
      { caption: 'Online team call', palette: amber },
      { caption: 'Campaign day', palette: teal },
      { caption: 'Team moments', palette: ocean },
    ],
  },
  {
    id: 'student',
    tab: 'Student',
    title: 'Data Science Undergraduate',
    org: 'UPN “Veteran” Jawa Timur',
    period: 'Aug 2022 – Present',
    summary: 'Where it started: Data Science coursework, Business Funding PMW and the General Secretary role at UKKI.',
    stats: [
      { value: '2022', label: 'started Data Science at UPN' },
      { value: 'BSI Batch 3', label: 'scholarship awardee, 2023' },
      { value: '6 secretaries', label: 'led at UKKI (±80 members)' },
    ],
    docs: [
      { caption: 'Data Science coursework', palette: violet },
      { caption: 'BSI Scholarship Batch 3', palette: amber },
      { caption: 'Business Funding PMW', palette: jade },
      { caption: 'General Secretary of UKKI', palette: teal },
    ],
  },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'Data Science',
    lines: ['Universitas Pembangunan Nasional Veteran Jawa Timur', 'August 2022 – Present'],
    chips: ['Python', 'Scikit-Learn', 'Machine Learning'],
  },
  {
    kicker: 'Skills',
    title: 'Data first.',
    lines: ['Python, MySQL, SPSS, Excel', 'Power BI, Tableau, Looker Studio'],
    chips: ['Python', 'MySQL', 'Power BI', 'Tableau', 'Looker Studio', 'Excel'],
  },
  {
    kicker: 'Experience',
    title: 'Analyst at Scale',
    lines: ['Data Analyst · CV. DB Klik · 2025 – 2026', 'Led 11 interns · ~100K data points a day scraped', 'IDR 31.9 bn recoverable cash uncovered'],
  },
  {
    kicker: 'Telkomsel',
    title: 'Top 10% = 40%',
    lines: ['1M+ rows of customer data analyzed', 'Top 10% of users drove 40% of revenue', '10+ Looker Studio dashboards delivered'],
  },
  {
    kicker: 'Projects',
    title: `${projects.length} Originals`,
    lines: ['Dashboards in Power BI, Tableau and Looker Studio', 'Forecasting, clustering and routing models in Python', 'A multi-branch stock optimization app in Streamlit'],
  },
  {
    kicker: 'Awards',
    title: 'Top Moments',
    lines: ['BSI Scholarship Batch 3, Awardee (2023)', 'Business Funding PMW, Awardee (2024)', 'General Secretary of UKKI (2024 – 2025)'],
  },
  {
    kicker: 'Current mission',
    title: 'Now streaming',
    lines: ['Turning data into decisions', 'Open to data analyst opportunities'],
  },
];

export type Testimonial = { quote: string; name: string; role: string; org: string; /** Marks a placeholder: shows a SAMPLE badge. Delete the flag once the quote is real. */ sample?: boolean };

/**
 * Reviews from people Erika has worked with. Only add real quotes (with the person's permission).
 * The six entries below are SAMPLES to be replaced. If the list is emptied the "Reviews" section hides itself.
 * Example: { quote: '…', name: 'Full Name', role: 'Supervisor', org: 'CV. DB Klik' }
 */
export const testimonials: Testimonial[] = [
  // Belum ada review asli, jadi bagian "Reviews" otomatis disembunyikan.
  // Untuk menampilkannya, tambah satu blok per review (hapus tanda // di depan contoh), hanya dengan izin pemberinya:
  // { quote: 'Erika cepat memahami kebutuhan bisnis dan hasilnya langsung kami pakai.', name: 'Nama Lengkap', role: 'Supervisor', org: 'CV. DB Klik' },
];

export type SectionId = 'about' | 'journey' | 'originals' | 'skills' | 'certifications' | 'reviews' | 'story';

/**
 * Menghubungkan src/data/links.ts (link) dan src/images/ (gambar) ke data di atas.
 * Tidak perlu diubah. Yang kosong dibiarkan memakai tampilan bawaan.
 */
for (const p of projects) {
  const l = projectLinks[p.id];
  const links: { label: string; url: string }[] = [];
  if (p.github) links.push({ label: 'GitHub', url: p.github });
  if (l) {
    if (l.github) links.push({ label: 'GitHub', url: l.github });
    if (l.dashboard) links.push({ label: 'Live Dashboard', url: l.dashboard });
    if (l.demo) links.push({ label: 'Live Demo', url: l.demo });
    if (l.report) links.push({ label: 'Report', url: l.report });
  }
  const seen = new Set<string>();
  p.links = links.filter((x) => !seen.has(x.url) && seen.add(x.url));

  const dir = `projects/${p.id}`;
  const card = findImage(dir, 'card');
  if (card) {
    p.image = card;
    p.imageLight = findImage(dir, 'card-light');
  }
  const shots = findNumbered(dir, 'shot-');
  if (shots.length) {
    p.screenshots = shots.map((src, i) => ({ src, caption: l?.captions?.[i] || `${p.title} preview ${i + 1}` }));
  }
}

certifications.forEach((c, i) => {
  const img = findByNumber('certificates', i + 1);
  if (img) c.image = img;
});

for (const ch of journey) {
  ch.docs.forEach((d, i) => {
    const img = findByNumber(`journey/${ch.id}`, i + 1);
    if (img) d.src = img;
  });
}

/** One view for every visitor - sections play in this order. */
export const sectionOrder: SectionId[] = ['about', 'journey', 'originals', 'skills', ...(certifications.length ? (['certifications'] as const) : []), ...(testimonials.length ? (['reviews'] as const) : []), 'story'];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & experience', palette: violet },
  journey: { nav: 'Experience', card: 'My Experience', meta: `${journey.length} Chapters • Work & study`, palette: amber },
  originals: { nav: 'Projects', card: 'My Projects', meta: `${projects.length} Originals`, palette: teal },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  certifications: { nav: 'Certificates', card: 'Certifications', meta: `${certifications.length} credentials`, palette: jade },
  reviews: { nav: 'Reviews', card: 'Reviews', meta: `${testimonials.length} from colleagues`, palette: amber },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'CV • View & download', palette: violet },
};

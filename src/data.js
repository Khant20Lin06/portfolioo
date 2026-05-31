// ────────────────────────────────────────────────────────────
// Single source of truth for portfolio content.
// Edit values here — the editor renders them as TypeScript code.
// ────────────────────────────────────────────────────────────

export const me = {
  name: 'Khant Lin',
  title: 'Full Stack Developer',
  location: 'Surat Thani, Thailand',
  experience: '1.5+',
  shipped: '10+',
  clients: '10+',
  uptime: '99.98%',
  open: true,
}

// level: 1–5 (filled green segments)
export const frontend = [
  { name: 'React',        color: '#61dafb', level: 5 },
  { name: 'React Native', color: '#61dafb', level: 4 },
  { name: 'Next.js',      color: '#ffffff', level: 5 },
  { name: 'Tailwind',     color: '#38bdf8', level: 5 },
  { name: 'Flutter',      color: '#54c5f8', level: 5 },
]

export const backend = [
  { name: 'NestJS',     color: '#e0234e', level: 5 },
  { name: 'Express.js',    color: '#3fb950', level: 5 },
  { name: 'Django', color: '#3178c6', level: 5 },
  { name: 'PostgreSQL', color: '#336791', level: 4 },
  { name: 'Socket.io',  color: '#ffffff', level: 4 },
]

export const infra = [
  { name: 'Docker',          color: '#2496ed', level: 5 },
  { name: 'Vercel',          color: '#2088ff', level: 4 },
  { name: 'AWS',             color: '#ff9900', level: 4 },
  { name: 'cPanel',          color: '#ffffff', level: 4 },
  { name: 'CI/CD',           color: '#3fb950', level: 5 },
]

// border accent: 'blue' | 'orange' | 'purple' | 'green'
export const projects = [
  {
    name: 'werte-food-delivery',
    accent: 'blue',
    stars: 0,
    metric: '25 modules · 49 DB models',
    description:
      'Production-grade food delivery backend with real-time order tracking, WebSocket gateway, and BullMQ job queues.',
    tags: ['NestJS', 'PostgreSQL', 'Redis', 'BullMQ', 'WebSocket'],
  },
  {
    name: 'eco-market',
    accent: 'green',
    stars: 0,
    metric: 'Multi-vendor · RBAC',
    description:
      'Multi-vendor marketplace with RBAC + JWT auth, real-time buyer-seller messaging, and relational vendor-product schema.',
    tags: ['NestJS', 'Node.js', 'PostgreSQL', 'Socket.io', 'JWT'],
  },
  {
    name: 'fashion-ecommerce',
    accent: 'purple',
    stars: 0,
    metric: 'Product variants · OTP auth',
    description:
      'Full-stack e-commerce platform with product variants (size/color/SKU), warehouse management, and sales analytics dashboard.',
    tags: ['Django', 'Python', 'Next.js', 'PostgreSQL', 'OTP'],
  },
  {
    name: 'frappe-mobile-pos',
    accent: 'orange',
    stars: 0,
    metric: '10+ business reports',
    description:
      'Production Android POS app with full cart, barcode scanning, Excel/PDF export, and bilingual EN/MM UI.',
    tags: ['Flutter', 'SQLite', 'Socket.io', 'GitHub Actions', 'CI/CD'],
  },
]

export const contact = {
  email:    'khant20lin061@gmail.com',
  phone:    '+65 652 231 668',
  github:   'github.com/Khant20Lin06/',
  linkedin: 'in/khant-lin-08ba43345',
  telegram: '@khantlin0000',
  rate:     '$120/hr',
  availability: 'Q3 2026',
}

const CV_FILE_ID = '1Vi1oaLW5B2Hyc16oS4ml71lEQjT5kkMO'

export const cv = {
  preview:  `https://docs.google.com/viewer?url=https://drive.google.com/uc?id%3D${CV_FILE_ID}&embedded=true`,
  download: `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`,
  view:     `https://drive.google.com/file/d/${CV_FILE_ID}/view`,
}


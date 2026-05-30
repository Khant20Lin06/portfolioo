// ────────────────────────────────────────────────────────────
// Single source of truth for portfolio content.
// Edit values here — the editor renders them as TypeScript code.
// ────────────────────────────────────────────────────────────

export const me = {
  name: 'Mr.Khant Lin',
  title: 'Full-Stack Developer',
  location: 'SuratThani, THB',
  experience: '1.5+',
  shipped: '10+',
  clients: '10+',
  uptime: '99.98%',
  open: true,
}

// level: 1–5 (filled green segments)
export const frontend = [
  { name: 'React', color: '#3178c6', level: 5 },
  { name: 'React Native', color: '#61dafb', level: 4 },
  { name: 'Next.js', color: '#ffffff', level: 5 },
  { name: 'Tailwind', color: '#38bdf8', level: 5 },
  { name: 'Flutter', color: '#42b883', level: 5 },
]

export const backend = [
  { name: 'Express.js', color: '#3fb950', level: 5 },
  { name: 'Nest.js', color: '#f0883e', level: 5 },
  { name: 'Django', color: '#00add8', level: 5 },
  { name: 'PostgreSQL', color: '#336791', level: 4 },
  { name: 'SQLite', color: '#e535ab', level: 5 },
]

export const infra = [
  { name: 'Docker', color: '#2496ed', level: 5 },
  { name: 'cPanel', color: '#326ce5', level: 4 },
  { name: 'AWS', color: '#ff9900', level: 4 },
  { name: 'Terraform', color: '#7b42bc', level: 3 },
  { name: 'CI/CD', color: '#3fb950', level: 5 },
]

// border accent: 'blue' | 'orange' | 'purple' | 'green'
export const projects = [
  {
    name: 'orbit-analytics',
    accent: 'blue',
    stars: 1284,
    metric: '2.4M req/day',
    description: 'Real-time analytics platform processing event streams at scale.',
    tags: ['TypeScript', 'Kafka', 'ClickHouse'],
  },
  {
    name: 'forge-ci',
    accent: 'orange',
    stars: 842,
    metric: '14k builds/wk',
    description: 'Self-hosted CI runner with sub-second cold starts on bare metal.',
    tags: ['Go', 'Docker', 'gRPC'],
  },
  {
    name: 'atlas-design-system',
    accent: 'purple',
    stars: 3120,
    metric: '40+ teams',
    description: 'Accessible React component library adopted org-wide.',
    tags: ['React', 'Radix', 'Storybook'],
  },
  {
    name: 'sentinel-edge',
    accent: 'green',
    stars: 567,
    metric: '99.99% SLA',
    description: 'Edge gateway with WAF, rate-limiting, and global failover.',
    tags: ['Rust', 'WASM', 'Cloudflare'],
  },
]

export const contact = {
  email: 'khant20lin061@gmail.com',
  github: 'github.com/Khant20Lin06/',
  linkedin: 'in/khant-lin-08ba43345',
  telegram: '@khantlin0000',
  rate: '$120/hr',
  availability: 'Q3 2026',
}

const CV_FILE_ID = '19EMZYiTig-Epjo8SIwZVbgCNsvEENuxd'

export const cv = {
  // Google Docs Viewer — renders public PDFs without login
  preview:  `https://docs.google.com/viewer?url=https://drive.google.com/uc?id%3D${CV_FILE_ID}&embedded=true`,
  download: `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`,
  view:     `https://drive.google.com/file/d/${CV_FILE_ID}/view`,
}


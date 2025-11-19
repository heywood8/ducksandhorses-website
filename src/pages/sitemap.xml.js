import { siteConfig } from '../lib/siteConfig';

// Enhanced sitemap with lastmod, changefreq, and priority
export async function GET() {
  const base = siteConfig.url.replace(/\/$/, '');
  const lastmod = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

  const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' }, // Главная (Обо мне)
    { path: '/services/', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/individual/', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/couples/', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/telehealth/', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/modalities/', priority: '0.8', changefreq: 'monthly' },
    { path: '/conditions/', priority: '0.9', changefreq: 'monthly' },
    { path: '/conditions/anxiety/', priority: '0.8', changefreq: 'monthly' },
    { path: '/conditions/depression/', priority: '0.8', changefreq: 'monthly' },
    { path: '/conditions/burnout/', priority: '0.8', changefreq: 'monthly' },
    { path: '/schedule/', priority: '0.9', changefreq: 'weekly' },
    { path: '/privacy/', priority: '0.5', changefreq: 'yearly' },
    { path: '/emergency/', priority: '0.7', changefreq: 'monthly' }
  ];

  const urls = pages.map(({ path, priority, changefreq }) =>
    `<url><loc>${base}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

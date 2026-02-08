import { siteConfig } from '../lib/siteConfig';

export async function GET() {
  const base = siteConfig.url.replace(/\/$/, '');
  const staticPaths = [
    '/',
    '/schedule/',
    '/privacy/',
    '/emergency/'
  ];
  const urls = staticPaths.map(p => `<url><loc>${base}${p}</loc></url>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

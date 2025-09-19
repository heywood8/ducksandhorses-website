import { getCollection } from 'astro:content';
import { siteConfig, canonicalFor } from '../lib/siteConfig';

export async function get() {
  const posts = (await getCollection('blog'))
    .filter(p => !p.data.draft)
    .sort((a,b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
    .slice(0, 25);

  const items = posts.map(p => {
    const url = canonicalFor(`/blog/${p.slug}/`);
    return `<item><title>${p.data.title}</title><link>${url}</link><pubDate>${p.data.publishDate.toUTCString()}</pubDate><description><![CDATA[${p.data.description}]]></description></item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${siteConfig.title} Blog</title><link>${siteConfig.site}</link><description>${siteConfig.description}</description>${items}</channel></rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}

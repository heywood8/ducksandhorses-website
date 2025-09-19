import { getCollection } from 'astro:content';
import { siteConfig, canonicalFor } from '../lib/siteConfig';

export async function get() {
  return new Response('', { status: 404 });
}

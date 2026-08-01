import type { APIRoute } from 'astro';

// robots.txt генерируется на сборке, ссылка на sitemap берёт домен из site (SITE_URL).
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site ?? 'https://example.com').href;
  const body = ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};

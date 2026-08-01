import type { APIRoute } from 'astro';
import { OG_PAGES } from '../../lib/pages';
import { renderOg } from '../../lib/og';

// По одной картинке на страницу манифеста, генерируются на сборке (§8).
export function getStaticPaths() {
  return OG_PAGES.map((p) => ({
    params: { slug: p.slug },
    props: { kicker: p.kicker, title: p.title },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { kicker, title } = props as { kicker: string; title: string };
  const png = await renderOg(kicker, title);
  return new Response(new Uint8Array(png), {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  });
};

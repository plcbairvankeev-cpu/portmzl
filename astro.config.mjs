// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Страницы по умолчанию собираются заранее (prerender) — это даёт скорость,
// нужную для порогов Lighthouse из раздела 9 ТЗ.
// Серверным остаётся только то, что должно работать в рантайме:
// приёмник формы src/pages/api/lead.ts, где будет `export const prerender = false`.
export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  // Домен проекта. Переопределяется переменной окружения SITE_URL (стейджинг/смена домена).
  site: process.env.SITE_URL || 'https://kaskad03.online',
  trailingSlash: 'ignore',
  // Встроенный checkOrigin сравнивает Origin с ВНУТРЕННИМ origin запроса, а за nginx он http://
  // (HTTPS обрывается на прокси) → ложные 403 на всех отправках формы. Делаем свою proxy-aware
  // проверку в src/pages/api/lead.ts (плюс honeypot, проверка времени, rate limit).
  security: { checkOrigin: false },
  // Мультиязычность. Русский — основной, без префикса (/). Китайский — /zh/, английский — /en/.
  i18n: {
    locales: ['ru', 'zh', 'en'],
    defaultLocale: 'ru',
    // Непереведённые страницы доступны на /en, /zh — рендерят русский контент под
    // локализованной обвязкой (fallbackType: rewrite). Переводы подставляются постранично.
    routing: { prefixDefaultLocale: false, fallbackType: 'rewrite' },
    fallback: { en: 'ru', zh: 'ru' },
  },
  // sitemap-index.xml + sitemap-0.xml на сборке (§8). Служебные роуты исключены.
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.includes('/thanks'),
    }),
  ],
  vite: {
    // @ts-expect-error — расхождение типов Vite между @tailwindcss/vite и astro;
    // рантайм корректен, сборка и dev работают. Снять, когда версии Vite сойдутся.
    plugins: [tailwindcss()],
  },
});

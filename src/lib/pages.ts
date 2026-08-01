/**
 * Манифест страниц для генерации OG-картинок на сборке (§8).
 * slug 'index' — главная. Заголовки только на кириллице/латинице:
 * в satori нет CJK-шрифта, китайские подписи не рендерятся.
 */
export interface OgPage {
  slug: string;
  kicker: string;
  title: string;
}

export const OG_PAGES: OgPage[] = [
  { slug: 'index', kicker: 'ПОРТ МАНЬЧЖУРИЯ', title: 'Таможенная площадка в 200 м от перехода Маньчжурия' },
  { slug: 'site', kicker: 'ПЛОЩАДКА', title: 'Площадка таможенного контроля' },
  { slug: 'grain', kicker: 'ЗЕРНОВОЙ КОРИДОР', title: 'Назначенная площадка ввозного зерна' },
  { slug: 'tir', kicker: 'TIR', title: 'Автодоставка Москва — Маньчжурия по книжке TIR' },
  { slug: 'ved', kicker: 'ВЭД', title: 'Работа с Китаем без собственного ВЭД' },
  { slug: 'audit', kicker: 'ЭКСПОРТНЫЙ АУДИТ', title: 'Экспортный аудит товара' },
  { slug: 'faq', kicker: 'ВОПРОСЫ И ОТВЕТЫ', title: 'Как мы работаем и с чего начать' },
  { slug: 'about', kicker: 'О ГРУППЕ', title: 'Группа «Порт Маньчжурия»' },
  { slug: 'contacts', kicker: 'КОНТАКТЫ', title: 'Контакты' },
];

/** Путь → slug OG-картинки. Неизвестные страницы (legal, thanks) берут index. */
export function ogSlugForPath(pathname: string): string {
  const seg = pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || 'index';
  return OG_PAGES.some((p) => p.slug === seg) ? seg : 'index';
}

import { ui, defaultLang, locales, type Lang, type UiKey } from './ui';

/** Язык из URL: /zh/... → 'zh', /en/... → 'en', иначе основной 'ru'. */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  return locales.includes(seg as Lang) ? (seg as Lang) : defaultLang;
}

/** Переводчик строки обвязки с откатом на русский, если ключа нет. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/** Путь без языкового префикса: /zh/grain → /grain, /en → /, / → /. */
export function stripLang(pathname: string): string {
  const parts = pathname.split('/');
  if (locales.includes(parts[1] as Lang) && parts[1] !== defaultLang) {
    parts.splice(1, 1);
  }
  const rest = parts.join('/') || '/';
  return rest === '' ? '/' : rest;
}

/** Локализованный путь: ('/grain','zh') → /zh/grain; ('/grain','ru') → /grain. */
export function localizePath(pathname: string, lang: Lang): string {
  const base = stripLang(pathname);
  if (lang === defaultLang) return base;
  return base === '/' ? `/${lang}` : `/${lang}${base}`;
}

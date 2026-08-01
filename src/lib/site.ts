/**
 * Статус самоназвания. Запрет 6 CLAUDE.md и §6.7 ТЗ:
 * слово «представительство» допустимо только при REPRESENTATIVE_STATUS_CONFIRMED=true.
 * Иначе везде — «партнёр в России», а блок о представительстве на /about не выводится.
 *
 * Флаг читается из окружения на сборке. Пока файла .env нет (см. .env.example),
 * значение undefined → false → безопасная ветка «партнёр». Когда придёт документ о
 * статусе, выставить REPRESENTATIVE_STATUS_CONFIRMED=true в окружении хостинга.
 */
/**
 * Домен и контактный e-mail — конфигурируемые, не зашиты.
 * Сайт — переиспользуемая основа; финальный домен может отличаться.
 * Задаются в окружении: SITE_URL (напр. https://пример.рф) и CONTACT_EMAIL.
 * Пока не заданы — очевидные плейсхолдеры, которые видно и надо заменить перед запуском.
 * SITE_URL читается ещё и в astro.config.mjs (canonical, sitemap, абсолютные OG-URL).
 */
export const SITE_URL = process.env.SITE_URL ?? 'https://kaskad03.online';
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'info@kaskad03.online';
export const SITE_NAME = 'Порт Маньчжурия';

const raw = process.env.REPRESENTATIVE_STATUS_CONFIRMED;

export const REPRESENTATIVE_CONFIRMED = raw === 'true';

// Самоназвание в тексте
export const SELF_NOUN = REPRESENTATIVE_CONFIRMED ? 'представительство' : 'партнёр';
export const SELF_NOUN_CAP = REPRESENTATIVE_CONFIRMED ? 'Представительство' : 'Партнёр';

// Эйбрау в шапке героя (§6.1): «ПРЕДСТАВИТЕЛЬСТВО В РОССИИ» → «ПАРТНЁР В РОССИИ»
export const SELF_EYEBROW = REPRESENTATIVE_CONFIRMED
  ? 'ПРЕДСТАВИТЕЛЬСТВО В РОССИИ'
  : 'ПАРТНЁР В РОССИИ';

/**
 * Аналитика Яндекса. Задаётся в окружении хостинга. Пока пусто — код не подключается
 * (никаких внешних запросов). Как получите номер счётчика — задать YANDEX_METRIKA_ID.
 */
export const YANDEX_METRIKA_ID = process.env.YANDEX_METRIKA_ID ?? '';
export const YANDEX_VERIFICATION = process.env.YANDEX_VERIFICATION ?? '';

/**
 * Реквизиты юрлица для правовых страниц (/legal) и контактов. Единая точка правды.
 * Задаются в окружении или подставляются сюда перед запуском. Пока — видимые
 * плейсхолдеры, которые надо заменить.
 */
export const REQUISITES = {
  inn: process.env.COMPANY_INN ?? '[ИНН — указать]',
  ogrn: process.env.COMPANY_OGRN ?? '[ОГРН — указать]',
  address: process.env.COMPANY_ADDRESS ?? '[юридический адрес — указать]',
};

// Все реквизиты заданы (нет плейсхолдеров) — для условного текста.
export const REQUISITES_READY = !Object.values(REQUISITES).some((v) => v.startsWith('['));

# Передача проекта на деплой

Сайт «Порт Маньчжурия» (основной домен `portmzl.ru`, плюс `portmzl.com` → 301-редирект на него).
Этот файл — для программиста, который развернёт сайт.
Полная инструкция по деплою — в [`DEPLOY.md`](./DEPLOY.md).

## Стек

- **Astro 5** (`output: 'static'` + `@astrojs/node` standalone adapter).
- Мультиязычность: RU (основной, без префикса), `/zh`, `/en`.
- Статические страницы пререндерятся; серверным остаётся только приёмник формы
  `src/pages/api/lead.ts` (`prerender = false`) — Telegram + SMTP.
- Node 20. Сборка: `npm ci && npm run build`. Запуск: `node dist/server/entry.mjs`.
- В комплекте: `Dockerfile`, `docker-compose.yml`, `deploy/nginx.conf` (reverse-proxy + Let's Encrypt).

## Как получить код

Репозиторий приватный на GitHub. Владелец добавляет программиста в
**Settings → Collaborators** (по GitHub-логину), после чего:

```bash
git clone https://github.com/plcbairvankeev-cpu/portmzl.git
```

## Что НЕ в репозитории — взять у клиента

1. **Секреты формы** (в `.env.production`, см. DEPLOY.md §2): токен и chat_id Telegram-бота, доступы SMTP.
2. **Реквизиты юрлица** для `/legal` и `/contacts`: `COMPANY_INN`, `COMPANY_OGRN`, `COMPANY_ADDRESS`.
3. **Аналитика** (опционально): `YANDEX_METRIKA_ID`, `YANDEX_VERIFICATION`.
4. **Видео** `public/video/group.mp4` (~19 МБ) — вне git, клиент передаёт файлом; положить в `public/video/`.
   Без него блок «Видео о группе» на `/about` покажет только постер.
5. **Домены**: доступ к DNS `portmzl.ru` и `portmzl.com` (A-записи `@` и `www` обоих → IP сервера)
   + почта `info@portmzl.ru` для SMTP. portmzl.com редиректит на portmzl.ru (см. `deploy/nginx.conf`).

Флаг `REPRESENTATIVE_STATUS_CONFIRMED` оставить `false`, пока клиент не передаст документ о статусе
представителя (влияет на формулировки, см. `CLAUDE.md`).

## Проверки перед публикацией

- `npm run check` → 0 ошибок; `npm run build` собирается (падает, если добавить неподтверждённый факт —
  это by design, механизм фактов в `src/content/facts/`).
- После запуска: форма `/api/lead` шлёт в Telegram/SMTP; HTTPS; `/sitemap-index.xml`, `/robots.txt`.
- Прогнать Lighthouse (пороги — в ТЗ).

## Важное по контенту

- **Китайские тексты** — черновики на сверку носителем перед публикацией.
- **Правовые страницы** (`/legal`) — черновик по 152-ФЗ; проверить у юриста + подать уведомление в РКН.
- Числа на сайте — только через механизм фактов (подтверждённые); не хардкодить.

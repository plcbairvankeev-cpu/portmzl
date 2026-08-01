# Деплой — kaskad03.online (Docker на российском VPS)

Сайт: Astro (пре-рендер) + `@astrojs/node` standalone. Node-сервер отдаёт статические страницы
и серверный роут формы `/api/lead` (Telegram + SMTP). Данные — на территории РФ (152-ФЗ).

Я (ассистент) готовлю пакет; **разворачиваете вы** — нужны доступы к серверу и секреты, которых у меня нет.

---

## 0. Что нужно заранее

- VPS с Ubuntu 22.04+ (Selectel / Timeweb / любой), 1 vCPU / 1–2 ГБ RAM хватит.
- Установленные **Docker** и **docker compose** (`curl -fsSL https://get.docker.com | sh`).
- Домен **kaskad03.online**: A-запись (и `www`) → IP вашего VPS.
- Секреты для формы: токен Telegram-бота и chat_id, доступы SMTP.

---

## 1. Код на сервер

```bash
git clone <ваш-репозиторий> /opt/kaskad && cd /opt/kaskad
# либо scp/rsync каталога проекта
```

## 2. Секреты рантайма — `.env.production`

Создать рядом с `docker-compose.yml` (в репозиторий НЕ коммитить, он в `.gitignore`):

```dotenv
# Контактный e-mail (используется и в тексте ошибки формы)
CONTACT_EMAIL=info@kaskad03.online
# Telegram
TELEGRAM_BOT_TOKEN=123456:AA...
TELEGRAM_CHAT_ID=-1001234567890
# SMTP
SMTP_HOST=smtp.timeweb.ru
SMTP_PORT=465
SMTP_USER=info@kaskad03.online
SMTP_PASSWORD=********
SMTP_FROM=info@kaskad03.online
LEAD_EMAIL_TO=info@kaskad03.online
```

Домен и флаг статуса влияют на СБОРКУ (пекутся в страницы, sitemap, canonical, OG).
Их можно оставить дефолтными или переопределить в `.env` рядом с compose:

```dotenv
SITE_URL=https://kaskad03.online
REPRESENTATIVE_STATUS_CONFIRMED=false   # true только при документе о статусе (запрет 6)
```

## 3. Сборка и запуск

```bash
docker compose build       # соберёт статику + OG-картинки, поднимет прод-образ
docker compose up -d
docker compose logs -f web # ожидаем: Server listening on http://0.0.0.0:4321
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4321/   # 200
```

Контейнер слушает только `127.0.0.1:4321` — наружу отдаёт nginx.

## 4. nginx + HTTPS

```bash
apt install -y nginx certbot python3-certbot-nginx
cp deploy/nginx.conf /etc/nginx/sites-available/kaskad03.online
ln -s /etc/nginx/sites-available/kaskad03.online /etc/nginx/sites-enabled/
mkdir -p /var/www/certbot
nginx -t && systemctl reload nginx
# выпустить сертификат (DNS уже должен указывать на сервер):
certbot --nginx -d kaskad03.online -d www.kaskad03.online
```

Готово: https://kaskad03.online.

## 5. Проверка

- Страницы: `/`, `/zh`, `/en`, `/grain`, `/passport`, `sitemap-index.xml`, `robots.txt`.
- Форма на `/audit#form`: отправить тест — должно прийти в Telegram и на e-mail.
  Если каналы не настроены — форма честно вернёт «Не отправилось…».

## Обновление (передеплой)

```bash
git pull
docker compose build && docker compose up -d
```

---

## Альтернатива без Docker (bare Node + systemd)

```bash
# на сервере: node 20, затем в каталоге проекта
SITE_URL=https://kaskad03.online CONTACT_EMAIL=info@kaskad03.online \
  REPRESENTATIVE_STATUS_CONFIRMED=false npm ci && npm run build
```

`/etc/systemd/system/kaskad.service`:

```ini
[Unit]
Description=kaskad03.online (Astro node)
After=network.target
[Service]
WorkingDirectory=/opt/kaskad
Environment=NODE_ENV=production HOST=127.0.0.1 PORT=4321
EnvironmentFile=/opt/kaskad/.env.production
ExecStart=/usr/bin/node dist/server/entry.mjs
Restart=always
User=www-data
[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload && systemctl enable --now kaskad
```

nginx — тот же (шаг 4).

---

## Чек-лист перед боевым запуском

- [x] Шрифты в `public/fonts/` (в репозитории).
- [ ] Секреты Telegram/SMTP в `.env.production`.
- [ ] Юридические тексты `/legal/privacy` и `/legal/consent` — от юриста.
- [ ] Контакты `/contacts`: тел. КНР, WeChat, реквизиты (ИНН/ОГРН/адрес), ссылка на карту.
- [ ] `REPRESENTATIVE_STATUS_CONFIRMED=true` только при документе о статусе.
- [ ] Яндекс.Метрика с целью на форму; код `yandex-verification` в `Base.astro`.
- [ ] Прогнать Lighthouse на боевом (пороги §9 ТЗ).
- [ ] Уведомление в Роскомнадзор об обработке ПД (вне сайта, задача юриста).

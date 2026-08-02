# syntax=docker/dockerfile:1
# Порт Маньчжурия / portmzl.ru — Astro (static) + @astrojs/node standalone.
# Прод-сервер отдаёт пре-рендеренные страницы и серверный роут формы /api/lead.

# ─────────────────────────── build ───────────────────────────
FROM node:20-slim AS build
WORKDIR /app

# Конфиг, влияющий на СБОРКУ (пекётся в страницы): домен, e-mail, флаг статуса.
# Секреты (Telegram/SMTP) сюда НЕ передаём — они только в рантайме.
ARG SITE_URL=https://portmzl.ru
ARG CONTACT_EMAIL=info@portmzl.ru
ARG REPRESENTATIVE_STATUS_CONFIRMED=false
ENV SITE_URL=$SITE_URL \
    CONTACT_EMAIL=$CONTACT_EMAIL \
    REPRESENTATIVE_STATUS_CONFIRMED=$REPRESENTATIVE_STATUS_CONFIRMED

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ────────────────────────── runtime ──────────────────────────
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

# Только прод-зависимости (astro-рантайм, nodemailer, zod). satori/resvg/шрифты — build-only.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

# Непривилегированный пользователь
USER node

EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4321)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/server/entry.mjs"]

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { leadSchema, formatLead } from '../../lib/lead';
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from '../../lib/site';

// Серверный роут. Раздел 7.2 ТЗ. В сборке static остаётся динамическим.
export const prerender = false;

const ERROR_MESSAGE = `Не отправилось. Напишите на ${CONTACT_EMAIL} или в Telegram — заявку примем там.`;

// --- Простой rate limit по IP (in-memory). Сбрасывается при рестарте. ---
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function htmlResponse(status: number, title: string, body: string): Response {
  const page = `<!doctype html><html lang="ru"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title>
<style>body{font-family:system-ui,sans-serif;background:#F6F5F2;color:#0E1419;margin:0;
padding:3rem 1.5rem;line-height:1.55}main{max-width:34rem;margin-inline:auto}
a{color:#14459E}h1{font-size:1.5rem}</style></head><body><main>
<h1>${title}</h1><p>${body}</p><p><a href="/">← На главную</a></p></main></body></html>`;
  return new Response(page, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendEmail(text: string): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, LEAD_EMAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM || !LEAD_EMAIL_TO) return false;
  try {
    const port = Number(SMTP_PORT ?? 465);
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
    await transport.sendMail({
      from: SMTP_FROM,
      to: LEAD_EMAIL_TO,
      subject: `Новая заявка на расчёт — ${SITE_NAME}`,
      text,
    });
    return true;
  } catch {
    return false;
  }
}

// Proxy-aware защита от межсайтовых POST: Origin (если есть) должен совпадать
// с хостом сайта (SITE_URL) или с X-Forwarded-Host/Host. Пустой Origin не блокируем
// (его нет у части легитимных клиентов; остаются honeypot, проверка времени, rate limit).
function crossSite(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    const originHost = new URL(origin).host;
    const expected = new Set<string>();
    try {
      expected.add(new URL(SITE_URL).host);
    } catch {}
    const fwd = request.headers.get('x-forwarded-host');
    if (fwd) expected.add(fwd.split(',')[0].trim());
    try {
      expected.add(new URL(request.url).host);
    } catch {}
    return !expected.has(originHost);
  } catch {
    return true;
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (crossSite(request)) {
    return htmlResponse(403, 'Запрос отклонён', ERROR_MESSAGE);
  }
  const now = Date.now();
  // За обратным прокси (nginx) clientAddress = 127.0.0.1 для всех — берём реальный IP из заголовка.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    clientAddress ||
    'unknown';

  if (rateLimited(ip, now)) {
    return htmlResponse(429, 'Слишком много заявок', ERROR_MESSAGE);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return htmlResponse(400, 'Не отправилось', ERROR_MESSAGE);
  }

  // Honeypot: скрытое поле заполнено — это бот. Делаем вид, что всё хорошо. (§7.2)
  if (String(form.get('website') ?? '').trim() !== '') {
    return Response.redirect(new URL('/thanks', request.url), 303);
  }

  // Проверка времени заполнения: <2 c = бот. Без JS поле пустое — проверку пропускаем.
  const ts = Number(form.get('ts'));
  if (Number.isFinite(ts) && ts > 0 && now - ts < 2000) {
    return Response.redirect(new URL('/thanks', request.url), 303);
  }

  const parsed = leadSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Проверьте поля формы';
    return htmlResponse(400, 'Проверьте форму', `${first}. Затем отправьте ещё раз.`);
  }

  const text = formatLead(parsed.data);
  const [tg, mail] = await Promise.all([sendTelegram(text), sendEmail(text)]);

  if (!tg && !mail) {
    // Ни один канал не настроен или не доставил — честная ошибка с запасным путём.
    return htmlResponse(502, 'Не отправилось', ERROR_MESSAGE);
  }

  return Response.redirect(new URL('/thanks', request.url), 303);
};

// GET на этот адрес — отправляем на форму, а не показываем пустоту.
export const GET: APIRoute = ({ request }) =>
  Response.redirect(new URL('/audit#form', request.url), 302);

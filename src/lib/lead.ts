import { z } from 'zod';
import { SITE_NAME } from './site';

/**
 * Схема заявки. Серверная валидация — основная, клиентская лишь дополняет (§7.2 ТЗ).
 * Три поля о грузе обязательны и идут первыми: форма отсеивает нецелевые заявки (§7.1).
 */
export const leadSchema = z.object({
  product: z.string().trim().min(1, 'Укажите товар и позицию').max(2000),
  volume: z.string().trim().min(1, 'Укажите объём и периодичность').max(2000),
  route: z.string().trim().min(1, 'Укажите, откуда и куда').max(2000),
  company: z.string().trim().min(1, 'Укажите компанию').max(500),
  name: z.string().trim().min(1, 'Укажите имя').max(300),
  contact: z.string().trim().min(1, 'Укажите телефон или e-mail').max(300),
  comment: z.string().trim().max(4000).optional().default(''),
  consent: z.literal('yes', { message: 'Нужно согласие на обработку данных' }),
  source: z.string().trim().max(300).optional().default(''),
});

export type Lead = z.infer<typeof leadSchema>;

/** Текст сообщения для Telegram и e-mail. */
export function formatLead(lead: Lead): string {
  const lines = [
    `Новая заявка на расчёт — ${SITE_NAME}`,
    '',
    `Товар и позиция: ${lead.product}`,
    `Объём и периодичность: ${lead.volume}`,
    `Откуда → куда: ${lead.route}`,
    `Компания: ${lead.company}`,
    `Имя: ${lead.name}`,
    `Контакт: ${lead.contact}`,
  ];
  if (lead.comment) lines.push(`Комментарий: ${lead.comment}`);
  if (lead.source) lines.push('', `Страница: ${lead.source}`);
  return lines.join('\n');
}

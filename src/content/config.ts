import { defineCollection, z } from 'astro:content';

/**
 * Коллекция фактов — единственный источник всех измеримых величин на сайте.
 * Раздел 4.1 ТЗ, «Главное правило: числа» в CLAUDE.md.
 * Схема воспроизведена дословно по разделу 4.1.
 */
const facts = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    value: z.string(),                 // "95 600" — строка, чтобы сохранить форматирование
    unit: z.string().optional(),       // "м³"
    label_ru: z.string(),
    label_zh: z.string().optional(),
    label_en: z.string().optional(), // англ. подпись; при отсутствии — откат на label_ru
    source: z.string(),                // "进境粮食指定监管场地简介"
    registry: z.string().optional(),   // публичный реестр, где факт проверяется
    status: z.enum(['confirmed', 'pending', 'disputed']),
    note: z.string().optional(),
  }),
});

export const collections = { facts };

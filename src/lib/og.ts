import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE_NAME } from './site';

// Бренд-палитра, продублирована для satori (satori не читает CSS-переменные).
const INK = '#1A1A1A';
const STEEL = '#4A5567';
const SEAL = '#B3202C';
const PAPER = '#F5F2EC';

// OG-роуты пре-рендерятся на сборке, поэтому шрифты берём из node_modules в корне проекта.
function fontPath(pkg: string, file: string): string {
  return join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file);
}

// satori не делает fallback между шрифтами с ОДНИМ именем (cyrillic vs latin),
// поэтому у каждого subset уникальное имя, а в стилях — список семейств через запятую.
export const F_DISPLAY = 'OnestCyr, OnestLat';
export const F_MONO = 'JbCyr, JbLat';
export const F_BODY = 'GolosCyr, GolosLat';

// Шрифты грузятся один раз на сборку. satori понимает woff (не woff2), берём woff из Fontsource.
let fontsPromise: Promise<Array<{ name: string; data: Buffer; weight: 500 | 800; style: 'normal' }>> | null =
  null;

function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      readFile(fontPath('onest', 'onest-cyrillic-800-normal.woff')),
      readFile(fontPath('onest', 'onest-latin-800-normal.woff')),
      readFile(fontPath('golos-text', 'golos-text-cyrillic-500-normal.woff')),
      readFile(fontPath('golos-text', 'golos-text-latin-500-normal.woff')),
      readFile(fontPath('jetbrains-mono', 'jetbrains-mono-cyrillic-500-normal.woff')),
      readFile(fontPath('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff')),
    ]).then(([oc, ol, gc, gl, jc, jl]) => [
      { name: 'OnestCyr', data: oc, weight: 800 as const, style: 'normal' as const },
      { name: 'OnestLat', data: ol, weight: 800 as const, style: 'normal' as const },
      { name: 'GolosCyr', data: gc, weight: 500 as const, style: 'normal' as const },
      { name: 'GolosLat', data: gl, weight: 500 as const, style: 'normal' as const },
      { name: 'JbCyr', data: jc, weight: 500 as const, style: 'normal' as const },
      { name: 'JbLat', data: jl, weight: 500 as const, style: 'normal' as const },
    ]);
  }
  return fontsPromise;
}

// satori принимает React-подобный объект; строим руками, без JSX.
// display:flex по умолчанию — satori требует его у любого div с детьми.
const el = (type: string, style: Record<string, unknown>, children: unknown) => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
});

export async function renderOg(kicker: string, title: string): Promise<Buffer> {
  const fonts = await loadFonts();

  const tree = el(
    'div',
    {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px',
      backgroundColor: PAPER,
      color: INK,
      fontFamily: F_BODY,
    },
    [
      // Верх: пломба-линия + кикер
      el('div', { flexDirection: 'column' }, [
        el('div', { width: '96px', height: '8px', backgroundColor: SEAL, marginBottom: '40px' }, []),
        el(
          'div',
          { fontFamily: F_MONO, fontSize: '30px', color: STEEL, letterSpacing: '2px' },
          kicker
        ),
      ]),
      // Заголовок
      el(
        'div',
        { fontFamily: F_DISPLAY, fontWeight: 800, fontSize: '76px', lineHeight: 1.05, maxWidth: '1000px' },
        title
      ),
      // Низ: домен + маршрут
      el(
        'div',
        {
          justifyContent: 'space-between',
          fontFamily: F_MONO,
          fontSize: '26px',
          color: STEEL,
        },
        [el('div', {}, SITE_NAME), el('div', {}, 'Забайкальск — Маньчжурия')]
      ),
    ]
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts,
  });

  return Buffer.from(new Resvg(svg).render().asPng());
}

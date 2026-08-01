import type { Lang } from '../ui';

/**
 * Кейс: первая трансграничная отправка по TIR.
 * Источник: внутренний бюллетень (简报) от 04.03.2026. ZH — из первоисточника.
 * Только факты бюллетеня, без домыслов (тоннаж/объём не указаны — не выдумываем).
 */
export interface TirCaseContent {
  eyebrow: string;
  title: string;
  date: string;
  lead: string;
  points: { k: string; v: string }[];
  significance: string;
  source: string;
}

const ru: TirCaseContent = {
  eyebrow: 'Кейс',
  title: 'Первая трансграничная отправка по TIR',
  date: '4 марта 2026',
  lead: 'На площадке таможенного контроля автоперевозок логистического центра автомобиль трансграничной перевозки по TIR, гружённый товарами лёгкой промышленности, завершил оформление по принципу «одного окна» — декларирование и досмотр — и выехал с площадки в Москву.',
  points: [
    { k: 'Груз', v: 'товары лёгкой промышленности' },
    { k: 'Оформление', v: 'декларирование и досмотр в режиме одного окна, на площадке' },
    { k: 'Маршрут', v: 'площадка → Москва' },
  ],
  significance:
    'Официальный старт первой на переходе Маньчжурия трансграничной автоперевозки с декларированием по книжке TIR — новый прорыв для перехода.',
  source: 'Внутренний бюллетень компании, 04.03.2026',
};

const en: TirCaseContent = {
  eyebrow: 'Case',
  title: 'The first cross-border TIR shipment',
  date: '4 March 2026',
  lead: 'At the road-transport customs supervision site of the logistics centre, a TIR cross-border vehicle loaded with light-industry goods completed one-window clearance — declaration and inspection — and departed the site for Moscow.',
  points: [
    { k: 'Cargo', v: 'light-industry goods' },
    { k: 'Clearance', v: 'declaration and inspection in one window, on site' },
    { k: 'Route', v: 'the site → Moscow' },
  ],
  significance:
    'The official launch of the first cross-border road transport under a TIR declaration at the Manzhouli crossing — a new breakthrough for the crossing.',
  source: 'Company internal bulletin, 4 March 2026',
};

// ZH — из первоисточника (简报).
const zh: TirCaseContent = {
  eyebrow: '案例',
  title: '首批 TIR 申报跨境首发',
  date: '2026 年 3 月 4 日',
  lead: '满载轻工产品的 TIR 跨境运输车辆，在陆港国际物流中心公路运输类海关监管作业场所办结「一站式」报关、查验等通关手续后，顺利驶出监管作业场所前往俄罗斯莫斯科。',
  points: [
    { k: '货物', v: '轻工产品' },
    { k: '通关', v: '场地内「一站式」报关、查验' },
    { k: '路线', v: '场地 → 莫斯科' },
  ],
  significance: '满洲里口岸首批 TIR 申报跨境公路运输正式启动，实现口岸跨境公路运输发展的新突破。',
  source: '公司内部简报，2026.03.04',
};

const dict: Partial<Record<Lang, TirCaseContent>> = { ru, en, zh };

export function getTirCase(lang: Lang): TirCaseContent {
  return dict[lang] ?? ru;
}

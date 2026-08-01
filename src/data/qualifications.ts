import type { Lang } from '../i18n/ui';

/**
 * Официальные статусы площадки на автопереходе Маньчжурия.
 * Источник: «陆港国际物流中心基本情况» (满洲里陆港国际物流有限责任公司, 23.06.2026).
 * ZH — из первоисточника (не машинный перевод). RU/EN — перевод.
 * «only» = «满洲里唯一 / единственная на переходе» по этому документу.
 */
type L = Record<Lang, string>;

export interface Qualification {
  title: L;
  only: boolean; // единственная в Маньчжурии по источнику
  note?: L;
}

export const qualifications: Qualification[] = [
  {
    only: true,
    title: {
      ru: 'Назначенная площадка ввозного зерна',
      en: 'Designated imported-grain supervision site',
      zh: '进境粮食指定监管场地',
    },
  },
  {
    only: true,
    title: {
      ru: 'Пункт таможенного оформления автоперевозок — старт TIR (декларирование и пломбирование)',
      en: 'Road-transport customs supervision site — TIR start (declaration and sealing)',
      zh: '公路运输类海关监管作业场所（TIR 报关封签起运）',
    },
  },
  {
    only: false,
    title: {
      ru: 'Пункт таможенного оформления экспресс-грузов (трансграничная электронная торговля, режим 9610)',
      en: 'Express-cargo customs supervision site (cross-border e-commerce, mode 9610)',
      zh: '快递类海关监管作业场所（跨境电商 9610）',
    },
  },
  {
    only: true,
    title: {
      ru: 'Ввоз и вывоз опасных химических грузов классов 2–9, с досмотровым складом',
      en: 'Import/export of hazardous chemicals, classes 2–9, with an inspection warehouse',
      zh: '危化品 2—9 类进出口资质及查验库房',
    },
  },
  {
    only: true,
    title: {
      ru: 'Назначенная площадка ввозного мяса',
      en: 'Designated imported-meat supervision site',
      zh: '进境肉类指定监管场地',
    },
    note: {
      ru: 'эксплуатация планируется с сентября 2026',
      en: 'operation planned from September 2026',
      zh: '计划 2026 年 9 月运营',
    },
  },
];

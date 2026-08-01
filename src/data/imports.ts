import type { Lang } from '../i18n/ui';

/**
 * Категории российских товаров под ввоз в КНР — спрос китайской стороны.
 * Источник: «陆港国际物流中心基本情况» (满洲里陆港国际物流有限责任公司, 23.06.2026),
 * раздел «需进口俄罗斯商品品类». ZH — из первоисточника. RU/EN — перевод.
 */
type L = Record<Lang, string>;

export const importCategories: L[] = [
  { ru: 'Уголь (высококалорийный)', en: 'Coal (high calorific value)', zh: '煤炭（高卡值）' },
  { ru: 'Рудный концентрат', en: 'Ore concentrate', zh: '矿粉' },
  { ru: 'Нефтяной битум', en: 'Petroleum bitumen', zh: '石油沥青' },
  { ru: 'Целлюлоза', en: 'Wood pulp', zh: '纸浆' },
  { ru: 'Минеральные удобрения', en: 'Mineral fertilizers', zh: '化肥' },
  { ru: 'Сжиженный газ', en: 'Liquefied gas', zh: '液化气' },
  { ru: 'Карбамид', en: 'Urea', zh: '尿素' },
  { ru: 'Медь, алюминий', en: 'Copper, aluminium', zh: '铜、铝' },
  { ru: 'Титан', en: 'Titanium', zh: '钛' },
  { ru: 'Полиэтилен', en: 'Polyethylene', zh: '聚乙烯' },
  { ru: 'Зерно (лён, рапс)', en: 'Grain (flax, rapeseed)', zh: '粮食（亚麻籽、油菜籽）' },
  { ru: 'Продукты питания', en: 'Food products', zh: '食品' },
  { ru: 'Мороженое мясо (птица, говядина)', en: 'Frozen meat (poultry, beef)', zh: '冷冻肉类（禽肉、牛肉）' },
  { ru: 'Охлаждённая и мороженая рыба', en: 'Chilled and frozen fish', zh: '冰鲜（冷冻鱼）' },
  { ru: 'Морепродукты (краб)', en: 'Seafood (king crab)', zh: '水产品（帝王蟹）' },
];

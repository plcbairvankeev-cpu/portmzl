import type { Lang } from '../ui';

/**
 * Контент главной. RU — источник (дословно §6.1 ТЗ). EN — черновой перевод (нужна вычитка).
 * ZH отсутствует намеренно: китайская проза не переводится машинно (правило проекта) —
 * до выверенного текста zh-страница показывает русский с уведомлением.
 * Эйбрау — версия «партнёр» (REPRESENTATIVE_STATUS_CONFIRMED=false).
 */
export interface HomeContent {
  meta: { title: string; description: string };
  eyebrow: string;
  h1Before: string;
  h1After: string;
  sub: string;
  btnPrimary: string;
  btnSecondary: string;
  directionsHead: string;
  directions: { title: string; text: string; href: string }[];
  more: string;
  processHead: string;
  process: { title: string; text: string }[];
  notDoHead: string;
  notDoing: string[];
  notDoClose: string;
  notDoCloseLink: string;
  whoHead: string;
  whoBefore: string;
  whoAfter: string;
  whoMore: string;
  ctaTitle: string;
  ctaText: string;
  ctaBtn: string;
}

const ru: HomeContent = {
  meta: {
    title: 'Порт Маньчжурия — площадка таможенного контроля у перехода',
    description:
      'Экспорт и импорт через собственную таможенную площадку в 200 м от автомобильного перехода Маньчжурия. Единое окно ВЭД по договору в рублях.',
  },
  eyebrow: 'ПАРТНЁР В РОССИИ',
  h1Before: 'Экспорт и импорт через собственную таможенную площадку в',
  h1After: 'от перехода Маньчжурия',
  sub: 'Единое окно ВЭД по договору в рублях. Клиент не открывает валютный счёт, не встаёт на валютный контроль, не держит брокера в штате — и видит, где физически стоит его груз.',
  btnPrimary: 'Рассчитать слот и срок',
  btnSecondary: 'Посмотреть площадку',
  directionsHead: 'Что проходит через площадку',
  directions: [
    {
      title: 'Зерно и масличные',
      text: 'Назначенная площадка ввозного зерна: выделенный коридор от перехода, фумигация и техническая доработка на месте, ISO 9001. Рапс, лён, гречиха, овёс, подсолнечник, кукуруза, соя, рис.',
      href: '/grain',
    },
    {
      title: 'TIR Москва — Маньчжурия',
      text: 'Автодоставка по книжке TIR без перегрузки на границе. Оформление на площадке в режиме одного окна. Работает в обе стороны.',
      href: '/tir',
    },
    {
      title: 'Опасные грузы, классы 2–9',
      text: 'Единственная на переходе площадка с квалификацией на ввоз и вывоз опасных химических грузов классов 2–9 и с досмотровым складом.',
      href: '/site',
    },
    {
      title: 'Оформление и хранение',
      text: 'Таможенное оформление, СВХ, перецепка полуприцепов, контейнерная перевалка, склады обычные и с контролируемой температурой.',
      href: '/site',
    },
  ],
  more: 'Подробнее',
  processHead: 'Как это работает',
  process: [
    {
      title: 'Аудит',
      text: 'Считаем по вашей позиции: проходит ли товар, режим на китайской стороне, срок и вилка стоимости.',
    },
    {
      title: 'Договор',
      text: 'С российским юридическим лицом, в рублях. Без валютного счёта и валютного контроля на вашей стороне.',
    },
    {
      title: 'Приёмка на площадке',
      text: 'Груз поступает на собственную площадку в 200 метрах от автоперехода Маньчжурия.',
    },
    {
      title: 'Оформление',
      text: 'Таможня, сертификаты и требования китайской стороны — в режиме одного окна.',
    },
    {
      title: 'Отправка',
      text: 'TIR без перегрузки на границе или перевалка через переход. Работает в обе стороны.',
    },
    {
      title: 'Выдача',
      text: 'Груз у получателя. Вы видите, где физически стоит ваша партия.',
    },
  ],
  notDoHead: 'Что вам не придётся делать',
  notDoing: [
    'открывать валютный счёт',
    'вставать на валютный контроль',
    'вести ВЭД-бухучёт',
    'держать таможенного брокера в штате',
    'общаться с таможенными органами',
    'самостоятельно получать фитосанитарные, ветеринарные и технические сертификаты',
  ],
  notDoClose: 'Договор — с российским юридическим лицом, в рублях.',
  notDoCloseLink: 'Как это работает',
  whoHead: 'Кто мы',
  whoBefore:
    'Мы партнёр группы компаний «ПОРТ» в России. Группа основана в 1993 году, работает на российском направлении более тридцати лет, включает',
  whoAfter:
    'филиалов и публичную компанию на бирже NEEQ. С 2022 года развивает логистическое направление на автомобильном переходе Маньчжурия.',
  whoMore: 'О группе и партнёре в России',
  ctaTitle: 'Начните с расчёта, а не с договора',
  ctaText:
    'Присылаете товар, объём, откуда и куда. В течение трёх рабочих дней получаете код ТН ВЭД, применимый режим, требования китайской стороны по этой позиции, срок и вилку стоимости. Это платный этап — мы не работаем с неоплачиваемыми ожиданиями.',
  ctaBtn: 'Заказать расчёт',
};

const en: HomeContent = {
  meta: {
    title: 'Port Manzhouli — customs control site at the crossing',
    description:
      'Export and import through an own customs control site 200 m from the Manzhouli road crossing. A single foreign-trade window under a rouble contract.',
  },
  eyebrow: 'PARTNER IN RUSSIA',
  h1Before: 'Export and import through an own customs control site',
  h1After: 'from the Manzhouli crossing',
  sub: "A single foreign-trade window under a rouble contract. You don't open a foreign-currency account, don't register for currency control, don't keep a broker on staff — and you see where your cargo physically stands.",
  btnPrimary: 'Calculate a slot and lead time',
  btnSecondary: 'See the site',
  directionsHead: 'What passes through the site',
  directions: [
    {
      title: 'Grain and oilseeds',
      text: 'A designated imported-grain site: a dedicated corridor from the crossing, on-site fumigation and reconditioning, ISO 9001. Rapeseed, flax, buckwheat, oats, sunflower, corn, soybean, rice.',
      href: '/grain',
    },
    {
      title: 'TIR Moscow — Manzhouli',
      text: 'Road delivery under a TIR carnet, no reloading at the border. One-window clearance on site. Works both ways.',
      href: '/tir',
    },
    {
      title: 'Hazardous cargo, classes 2–9',
      text: 'The only site at the crossing qualified to import and export hazardous chemicals of classes 2–9, with an inspection warehouse.',
      href: '/site',
    },
    {
      title: 'Clearance and storage',
      text: 'Customs clearance, bonded warehouse, semi-trailer swapping, container transshipment, ambient and temperature-controlled warehouses.',
      href: '/site',
    },
  ],
  more: 'Learn more',
  processHead: 'How it works',
  process: [
    {
      title: 'Audit',
      text: 'We calculate for your item: whether the goods pass, the regime on the Chinese side, the lead time and a price range.',
    },
    {
      title: 'Contract',
      text: 'With a Russian legal entity, in roubles. No foreign-currency account or currency control on your side.',
    },
    {
      title: 'Intake at the site',
      text: 'The cargo arrives at our own site 200 metres from the Manzhouli road crossing.',
    },
    {
      title: 'Clearance',
      text: 'Customs, certificates and Chinese-side requirements — all in one window.',
    },
    {
      title: 'Dispatch',
      text: 'TIR with no reloading at the border, or transshipment through the crossing. Works both ways.',
    },
    {
      title: 'Handover',
      text: 'The cargo reaches the consignee. You can see where your shipment physically stands.',
    },
  ],
  notDoHead: "What you won't have to do",
  notDoing: [
    'open a foreign-currency account',
    'register for currency control',
    'keep foreign-trade accounting',
    'keep a customs broker on staff',
    'deal with customs authorities',
    'obtain phytosanitary, veterinary and technical certificates yourself',
  ],
  notDoClose: 'The contract is with a Russian legal entity, in roubles.',
  notDoCloseLink: 'How it works',
  whoHead: 'Who we are',
  whoBefore:
    'We are a partner of the PORT group of companies in Russia. The group was founded in 1993, has worked the Russian market for over thirty years, and includes',
  whoAfter:
    'branches and a public company on the NEEQ exchange. Since 2022 it has been developing logistics at the Manzhouli road crossing.',
  whoMore: 'About the group and its partner in Russia',
  ctaTitle: 'Start with a calculation, not a contract',
  ctaText:
    "Send the product, volume, origin and destination. Within three business days you get the HS/commodity code, the applicable regime, the Chinese-side requirements for that item, the lead time and a price range. This is a paid stage — we don't work on unpaid expectations.",
  ctaBtn: 'Request a calculation',
};

// ZH — черновик для сверки носителем. Факты и термины — из источников A/B/H/I;
// оффер и связки переведены. «Партнёр» = 合作伙伴 (не 代表处, запрет 6).
const zh: HomeContent = {
  meta: {
    title: '满洲里陆港国际物流中心 — 口岸海关监管场地',
    description:
      '经由距满洲里公路口岸200米的自有海关监管场地进出口。以卢布合同提供一站式外贸窗口。',
  },
  eyebrow: '俄罗斯合作伙伴',
  h1Before: '经由距满洲里公路口岸',
  h1After: '处的自有海关监管场地进出口',
  sub: '以卢布合同提供一站式外贸窗口。客户无需开立外汇账户、无需办理外汇管制、无需自聘报关经纪人，并可随时掌握货物的实际位置。',
  btnPrimary: '核算时段与时间',
  btnSecondary: '查看场地',
  directionsHead: '场地承载的业务',
  directions: [
    {
      title: '粮食与油料',
      text: '进境粮食指定监管场地：从口岸延伸的专用通道，就地熏蒸与技术整改，ISO9001。油菜籽、亚麻籽、荞麦、燕麦、葵花籽、玉米、大豆、水稻。',
      href: '/grain',
    },
    {
      title: 'TIR 莫斯科—满洲里',
      text: '凭TIR证册公路直达，边境无需换装。场地一站式办理，双向通行。',
      href: '/tir',
    },
    {
      title: '危化品（2—9类）',
      text: '口岸唯一具备危化品2—9类进出口资质及查验库房的场地。',
      href: '/site',
    },
    {
      title: '通关与仓储',
      text: '海关报关报检、监管仓储、甩挂、集装箱吊装，普通与恒温仓储库房。',
      href: '/site',
    },
  ],
  more: '详情',
  processHead: '运作方式',
  process: [
    {
      title: '审核',
      text: '针对您的品目核算：商品能否通过、中方监管方式、时限与费用区间。',
    },
    {
      title: '签约',
      text: '由俄罗斯法人主体签署，以卢布结算。您无需开立外汇账户或办理外汇管制。',
    },
    {
      title: '场地收货',
      text: '货物运抵距满洲里公路口岸200米的自有场地。',
    },
    {
      title: '通关办理',
      text: '海关、证书及中方要求——一站式办理。',
    },
    {
      title: '发运',
      text: '凭TIR证册边境无需换装，或经口岸转运。双向通行。',
    },
    {
      title: '交货',
      text: '货物送达收货人。您可随时掌握货物的实际位置。',
    },
  ],
  notDoHead: '您无需操心的事',
  notDoing: [
    '开立外汇账户',
    '办理外汇管制',
    '处理外贸会计核算',
    '自聘报关经纪人',
    '与海关直接对接',
    '自行办理植检、动检与技术证书',
  ],
  notDoClose: '合同由俄罗斯法人主体签署，以卢布结算。',
  notDoCloseLink: '了解运作方式',
  whoHead: '关于我们',
  whoBefore: '我们是满洲里口岸集团在俄罗斯的合作伙伴。集团始创于1993年，深耕俄罗斯方向三十余年，旗下拥有',
  whoAfter: '家分公司及一家新三板挂牌公司。自2022年起在满洲里公路口岸发展物流业务。',
  whoMore: '关于集团与俄罗斯合作伙伴',
  ctaTitle: '先核算，再签约',
  ctaText:
    '提供商品、数量、起止地。三个工作日内，您将获得商品HS编码、适用监管方式、中方对该品类的要求、时限与费用区间。此为付费环节——我们不做无偿等待。',
  ctaBtn: '索取核算',
};

const dict: Partial<Record<Lang, HomeContent>> = { ru, en, zh };

/** Возвращает контент на языке страницы; если перевода нет — русский + флаг untranslated. */
export function getHome(lang: Lang): { c: HomeContent; translated: boolean } {
  return { c: dict[lang] ?? ru, translated: Boolean(dict[lang]) };
}

import type { Lang } from '../ui';

/**
 * Контент FAQ. RU — источник. EN — черновой перевод (нужна вычитка).
 * ZH — черновик для сверки носителем (правило проекта: китайская проза не публикуется
 * без выверки). Ответы объяснительные, без выдуманных цифр: только то, что уже есть
 * на сайте (аудит, коридор, «партнёр», договор в рублях).
 */
export interface FaqItem {
  q: string;
  a: string;
}
export interface FaqContent {
  meta: { title: string; description: string };
  title: string;
  intro: string;
  items: FaqItem[];
  ctaText: string;
  ctaLink: string;
}

const ru: FaqContent = {
  meta: {
    title: 'Вопросы и ответы — Порт Маньчжурия',
    description:
      'Частые вопросы: чем отличаемся от экспедитора, с чего начать, экспортный аудит, TIR, валютный контроль, сроки и стоимость.',
  },
  title: 'Вопросы и ответы',
  intro: 'Коротко о том, как мы работаем и с чего начать. Если вопроса нет в списке — напишите, ответим.',
  items: [
    {
      q: 'Чем вы отличаетесь от обычного экспедитора?',
      a: 'Мы партнёр терминала категории «А» в 200 метрах от автомобильного перехода Маньчжурия. Оформление и перевалка идут через собственную площадку, а не арендованные мощности. Договор — с российским юридическим лицом, в рублях.',
    },
    {
      q: 'С чего начать работу?',
      a: 'С экспортного аудита товара. Это платный этап в три рабочих дня: код ТН ВЭД, применимый режим на китайской стороне, требования по категории, ориентир цены и логистики, вилка маржи — до того, как вы что-то подписываете.',
    },
    {
      q: 'Почему аудит платный?',
      a: 'Предварительная аналитика и расчёты — это работа. Мы не работаем с неоплачиваемыми ожиданиями. Зато вы получаете конкретный ответ «проходит или нет и сколько стоит», а не общее «поможем».',
    },
    {
      q: 'Какие товары проходят через площадку?',
      a: 'Зерно и масличные — на назначенной площадке ввозного зерна, а также генеральные и сборные грузы, контейнеры. Подробнее — в разделах «Зерно» и «Площадка».',
    },
    {
      q: 'Что такое доставка по TIR?',
      a: 'Автодоставка по книжке TIR без перегрузки на границе, с оформлением на площадке в режиме одного окна. Работает в обе стороны, Москва — Маньчжурия.',
    },
    {
      q: 'Мне нужно открывать валютный счёт и вставать на валютный контроль?',
      a: 'Нет. Договор — с российским юридическим лицом, в рублях. Валютный контроль, ВЭД-бухучёт и общение с таможней остаются не на вашей стороне.',
    },
    {
      q: 'Вы гарантируете, что мой товар пройдёт?',
      a: 'Гарантию прохождения мы не даём — это было бы нечестно. Аудит показывает, проходит ли товар и на каких условиях, ещё до подписания договора.',
    },
    {
      q: 'В какие сроки и сколько это стоит?',
      a: 'Аудит — три рабочих дня. Его стоимость зависит от категории, называем в ответ на заявку. Сроки и стоимость перевозки — в результате аудита по вашей позиции.',
    },
    {
      q: 'Вы работаете с импортом из Китая или только с экспортом?',
      a: 'В обе стороны: экспорт из России и импорт из КНР через тот же переход и ту же площадку.',
    },
    {
      q: 'Как связаться и что прислать?',
      a: 'Пришлите товар, объём, откуда и куда через форму заявки. Этого достаточно, чтобы посчитать слот, срок и вилку стоимости.',
    },
  ],
  ctaText: 'Не нашли ответ — начните с расчёта.',
  ctaLink: 'Заказать расчёт',
};

const en: FaqContent = {
  meta: {
    title: 'FAQ — Port Manzhouli',
    description:
      'Common questions: how we differ from a forwarder, where to start, the export audit, TIR, currency control, timing and cost.',
  },
  title: 'Questions and answers',
  intro: 'A short guide to how we work and where to start. If your question is not here, write to us — we will answer.',
  items: [
    {
      q: 'How do you differ from an ordinary freight forwarder?',
      a: 'We are a partner of a category “A” terminal 200 metres from the Manzhouli road crossing. Clearance and transshipment go through our own site, not rented capacity. The contract is with a Russian legal entity, in roubles.',
    },
    {
      q: 'How do we start?',
      a: 'With an export audit of your goods. It is a paid, three-business-day stage: the HS/commodity code, the applicable regime on the Chinese side, category requirements, price and logistics benchmarks and a margin range — before you sign anything.',
    },
    {
      q: 'Why is the audit paid?',
      a: 'Preliminary analysis and calculations are work. We do not work on unpaid expectations. In return you get a concrete answer — “it passes or not, and how much it costs” — not a vague “we’ll help”.',
    },
    {
      q: 'What goods pass through the site?',
      a: 'Grain and oilseeds at the designated imported-grain site, as well as general and groupage cargo and containers. See the “Grain” and “Terminal” sections for details.',
    },
    {
      q: 'What is TIR delivery?',
      a: 'Road delivery under a TIR carnet with no reloading at the border and one-window clearance on site. It works both ways, Moscow — Manzhouli.',
    },
    {
      q: 'Do I need to open a foreign-currency account and register for currency control?',
      a: 'No. The contract is with a Russian legal entity, in roubles. Currency control, foreign-trade accounting and dealing with customs stay off your side.',
    },
    {
      q: 'Do you guarantee my goods will pass?',
      a: 'We do not guarantee passage — that would be dishonest. The audit shows whether the goods pass and on what terms, before any contract is signed.',
    },
    {
      q: 'How long does it take and how much does it cost?',
      a: 'The audit takes three business days. Its price depends on the category and is quoted in response to your request. Shipping time and cost come out of the audit for your specific item.',
    },
    {
      q: 'Do you work with imports from China or only exports?',
      a: 'Both ways: exports from Russia and imports from China through the same crossing and the same site.',
    },
    {
      q: 'How do I get in touch and what should I send?',
      a: 'Send the product, volume, origin and destination through the request form. That is enough to calculate a slot, lead time and price range.',
    },
  ],
  ctaText: 'Didn’t find an answer — start with a calculation.',
  ctaLink: 'Request a calculation',
};

// ZH — черновик для сверки носителем. Термины согласованы с остальными zh-страницами.
const zh: FaqContent = {
  meta: {
    title: '常见问题 — 满洲里陆港国际物流中心',
    description: '常见问题：与货代有何不同、如何开始、出口审核、TIR、外汇管制、时限与费用。',
  },
  title: '常见问题',
  intro: '简要说明我们的运作方式及如何开始。若列表中没有您的问题，请来信，我们会解答。',
  items: [
    {
      q: '你们与普通货代有何不同？',
      a: '我们是距满洲里公路口岸200米的A级陆港的合作伙伴。报关与转运经由自有场地，而非租用的场地。合同由俄罗斯法人主体签署，以卢布结算。',
    },
    {
      q: '如何开始合作？',
      a: '从商品出口审核开始。这是三个工作日的付费环节：商品HS/税则编码、中方适用监管方式、品类要求、价格与物流参考、毛利区间——在您签署任何文件之前完成。',
    },
    {
      q: '为什么审核要收费？',
      a: '前期分析与核算是实实在在的工作。我们不做无偿等待。作为回报，您得到的是“能否通过、成本几何”的明确答复，而非笼统的“我们来帮忙”。',
    },
    {
      q: '哪些商品经由场地？',
      a: '在进境粮食指定监管场地办理的粮食与油料，以及普货、拼箱货物与集装箱。详见“粮食”与“场地”栏目。',
    },
    {
      q: '什么是TIR运输？',
      a: '凭TIR证册公路运输，边境无需换装，场地一站式办理。双向通行，莫斯科—满洲里。',
    },
    {
      q: '我需要开立外汇账户并办理外汇管制吗？',
      a: '不需要。合同由俄罗斯法人主体签署，以卢布结算。外汇管制、外贸会计核算及与海关的对接均不在您这一侧。',
    },
    {
      q: '你们能保证我的商品一定通过吗？',
      a: '我们不作通关担保——那样并不诚实。审核会在签约之前说明商品能否通过及在何种条件下通过。',
    },
    {
      q: '时限与费用如何？',
      a: '审核为三个工作日。审核费用取决于品类，应询报价。运输的时限与费用由针对您具体品目的审核结果给出。',
    },
    {
      q: '你们做从中国进口，还是只做出口？',
      a: '双向：经由同一口岸与同一场地，办理从俄罗斯出口与从中国进口。',
    },
    {
      q: '如何联系、需要提供什么？',
      a: '通过申请表提供商品、数量、起止地。据此即可核算时段、时限与费用区间。',
    },
  ],
  ctaText: '未找到答案——先从核算开始。',
  ctaLink: '索取核算',
};

const dict: Partial<Record<Lang, FaqContent>> = { ru, en, zh };

/** Контент FAQ на языке страницы; если перевода нет — русский + флаг untranslated. */
export function getFaq(lang: Lang): { c: FaqContent; translated: boolean } {
  return { c: dict[lang] ?? ru, translated: Boolean(dict[lang]) };
}

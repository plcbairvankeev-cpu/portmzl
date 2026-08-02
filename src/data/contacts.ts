import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;

export interface Person {
  name: string;
  nameZh?: string;
  role: L;
  phone?: string;
  tel?: string;
  photo?: string;
}

// Руководство группы (китайская сторона). Имя владельца — по документу H (王泽军).
export const leadership: Person[] = [
  {
    name: 'Ван Цзэцзюнь',
    nameZh: '王泽军',
    role: {
      ru: 'Владелец группы компаний ПОРТ',
      en: 'Owner of the PORT group',
      zh: 'ПОРТ 集团所有人',
    },
    photo: '/people/van.png',
  },
  {
    name: 'Ян Дзи Янь',
    nameZh: '杨继燕',
    role: {
      ru: 'Исполнительный вице-президент группы; курирует компанию сухого порта',
      en: 'Group Executive Vice-President; oversees the dry-port logistics company',
      zh: '满洲里口岸集团常务副总，统筹管理满洲里陆港国际物流有限责任公司',
    },
    photo: '/people/yan.png',
  },
];

// Команда в России.
export const russia: Person[] = [
  {
    name: 'Буянто Очиров',
    role: { ru: 'Руководитель по России', en: 'Head of Russia', zh: '俄罗斯业务负责人' },
    phone: '+7 924 770-04-28',
    tel: '+79247700428',
    photo: '/people/ochirov.png',
  },
  {
    name: 'Баир Ванкеев',
    role: { ru: 'Директор по развитию', en: 'Development Director', zh: '发展总监' },
    phone: '+7 977 541-20-34',
    tel: '+79775412034',
    photo: '/people/vankeev.png',
  },
];

// Юрлицо — официальное название, не переводится.
export const company = 'ООО «Порт Маньчжурия»';

// Китайское юрлицо — оператор терминала, дочерняя компания группы компаний «ПОРТ».
export const companyCn = '满洲里陆港国际物流有限责任公司';

// Офис/площадка в КНР. Адрес и телефоны — предоставлены компанией (не плейсхолдеры).
// Телефоны — стационарные, код города 0470 (Маньчжурия). tel: в международном формате.
export const cnOffice = {
  addressZh: '满洲里市绥满高速北侧、口岸路东侧、宝利路西侧陆港国际物流中心',
  addressRu:
    'г. Маньчжурия: к северу от автомагистрали Суймань (绥满), к востоку от ул. Коубань (口岸路), к западу от ул. Баоли (宝利路) — Международный логистический центр сухого порта',
  addressEn:
    'Manzhouli: north of the Suiman Expressway, east of Kou’an Road, west of Baoli Road — Lu Gang International Logistics Center',
  postcode: '021400',
  phones: [
    { display: '0470-6667788', tel: '+864706667788' },
    { display: '0470-6661188', tel: '+864706661188' },
  ],
};

// Мессенджеры. href добавляется перед запуском (пока pending — чип без ссылки).
// Примеры при заполнении: Telegram 'https://t.me/username', WhatsApp 'https://wa.me/79990000000'.
export interface Messenger {
  label: string;
  href?: string;
}
export const messengers: Messenger[] = [
  { label: 'WeChat' },
  { label: 'Telegram' },
  { label: 'WhatsApp' },
];

// Телефон в России. Заполнить: { display: '+7 900 000-00-00', tel: '+79000000000' }.
export const ruPhone: { display: string; tel: string } | null = null;

// QR-код WeChat: путь к картинке в public (напр. '/people/wechat.png'). Пусто — показываем «добавляется».
export const wechatQr = '';

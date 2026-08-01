import type { Lang } from '../i18n/ui';

/**
 * Лицензии и сертификаты. Держатель — компания группы (满洲里口岸进出口有限公司),
 * см. скан. Публикуется по решению компании. Данные — со скана лицензии.
 */
type L = Record<Lang, string>;

export interface License {
  name: L;
  number: string;
  holder: string;
  authority: L;
  issued: string;
  image: string;
}

export const licenses: License[] = [
  {
    name: {
      ru: 'Лицензия на деятельность с опасными химическими веществами (классы 2–9)',
      en: 'Hazardous chemicals operating licence (classes 2–9)',
      zh: '危险化学品经营许可证',
    },
    number: '15078113202500006',
    holder: '满洲里口岸进出口有限公司',
    authority: {
      ru: 'Управление по чрезвычайным ситуациям г. Маньчжурия',
      en: 'Manzhouli Emergency Management Bureau',
      zh: '满洲里市应急管理局',
    },
    issued: '06.05.2025',
    image: '/licenses/hazchem.jpg',
  },
];

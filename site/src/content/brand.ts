/**
 * Brand constants — single source of truth for company info, contacts, legal data.
 * Текущие значения — DEMO. Заменить перед запуском.
 */

export const brand = {
  name: "Финансовый партнёр",
  shortName: "ФП",
  domain: "finpartner.ru",
  tagline: "Бухгалтер, который знает ваш бизнес",
  description:
    "Персональный бухгалтер с офисом в Екатеринбурге. Один специалист на ваш бизнес, не колл-центр. Ведём ИП и ООО по всей России.",
} as const;

export const contacts = {
  phone: "+7 (343) 290-12-34", // demo, заменить перед запуском
  phoneRaw: "+73432901234", // demo, заменить перед запуском
  email: "hello@finpartner.ru", // demo, заменить перед запуском
  telegram: "https://t.me/finpartner_office", // demo, заменить перед запуском
  whatsapp: "https://wa.me/73432901234", // demo, заменить перед запуском
  address: {
    city: "Екатеринбург",
    street: "ул. Толмачёва, 33, оф. 412", // demo, заменить перед запуском
    zip: "620075", // demo, заменить перед запуском
    full: "г. Екатеринбург, ул. Толмачёва, 33, оф. 412", // demo, заменить перед запуском
  },
  workingHours: "Пн–Пт: 9:00–19:00",
  // Координаты центра Екатеринбурга — для iframe Яндекс.Карты, заменить на реальные
  yandexMapUrl:
    "https://yandex.ru/maps/54/yekaterinburg/?text=%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%2C%20%D1%83%D0%BB.%20%D0%A2%D0%BE%D0%BB%D0%BC%D0%B0%D1%87%D1%91%D0%B2%D0%B0%2C%2033",
  yandexMapEmbed:
    "https://yandex.ru/map-widget/v1/?ll=60.604%2C56.836&z=16&pt=60.604,56.836,pm2rdm",
} as const;

export const legal = {
  entityType: "ООО" as "ООО" | "ИП",
  entityName: "ООО «Финансовый партнёр»",
  inn: "6671234567", // demo, заменить перед запуском
  ogrn: "1216600012345", // demo, заменить перед запуском
  kpp: "667101001", // demo, заменить перед запуском
  legalAddress: "г. Екатеринбург, ул. Толмачёва, 33, оф. 412", // demo, заменить перед запуском
} as const;

export const social = {
  vk: "https://vk.com/finpartner_ekb", // demo, заменить перед запуском
  telegram_channel: "https://t.me/finpartner_news", // demo, заменить перед запуском
} as const;

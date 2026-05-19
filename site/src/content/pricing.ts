export interface PricingTier {
  slug: "start" | "business" | "premium";
  name: string;
  audience: string;
  priceFrom: number;
  priceUnit: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    slug: "start",
    name: "СТАРТ",
    audience: "ИП без сотрудников · НПД / УСН «Доходы» / ПСН · до 30 операций в месяц",
    priceFrom: 2000,
    priceUnit: "₽/мес",
    features: [
      "Ведение КУДиР",
      "Расчёт налогов и страховых взносов",
      "Сдача декларации и отчётности",
      "Консультации в мессенджере",
      "Напоминания о дедлайнах",
    ],
    cta: "Подключить «Старт»",
  },
  {
    slug: "business",
    name: "БИЗНЕС",
    audience: "ИП с сотрудниками · ООО на УСН · до 100 операций в месяц",
    priceFrom: 9000,
    priceUnit: "₽/мес",
    features: [
      "Всё из тарифа «Старт»",
      "Кадровый учёт (до 5 человек)",
      "Расчёт зарплаты, страховых, НДФЛ",
      "Кадровые документы и приказы",
      "Приоритет в ответах",
      "Именной бухгалтер закреплён за вами",
    ],
    highlighted: true,
    cta: "Подключить «Бизнес»",
  },
  {
    slug: "premium",
    name: "ПРЕМИУМ",
    audience: "ООО на ОСНО · крупный ИП · ВЭД · маркетплейсы · производство",
    priceFrom: 25000,
    priceUnit: "₽/мес",
    features: [
      "Всё из тарифа «Бизнес»",
      "Налоговое планирование и оптимизация",
      "Сопровождение запросов ФНС",
      "Управленческая отчётность",
      "Ежемесячная встреча (онлайн или в офисе)",
      "Закреплён старший бухгалтер с опытом 10+ лет",
    ],
    cta: "Обсудить «Премиум»",
  },
];

export interface SurchargeItem {
  label: string;
  delta: string;
}

export const surcharges: SurchargeItem[] = [
  { label: "Каждый дополнительный сотрудник", delta: "+800 ₽/мес" },
  { label: "Кассы и эквайринг", delta: "+1 500 ₽/мес" },
  { label: "Маркировка / прослеживаемость", delta: "+2 000 ₽/мес" },
  { label: "ВЭД-операции", delta: "коэф. ×1.3" },
  { label: "Маркетплейсы (WB, Ozon)", delta: "+2 000–4 000 ₽/мес" },
];

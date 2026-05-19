import type { LucideIcon } from "lucide-react";
import {
  User,
  Building2,
  ShoppingBag,
  Cpu,
  UtensilsCrossed,
  Store,
} from "lucide-react";

export interface Audience {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export const audiences: Audience[] = [
  {
    slug: "ip",
    icon: User,
    title: "Для ИП",
    description: "УСН, ПСН, АУСН, НПД. С сотрудниками и без. Прозрачные тарифы от 2 000 ₽/мес.",
    href: "/uslugi/buhgalter-dlya-ip",
  },
  {
    slug: "ooo",
    icon: Building2,
    title: "Для ООО",
    description: "УСН, ОСНО. Кадры, зарплата, налоговое планирование, сопровождение проверок.",
    href: "/uslugi/buhgalter-dlya-ooo",
  },
  {
    slug: "marketplaces",
    icon: ShoppingBag,
    title: "Маркетплейсы",
    description: "Wildberries, Ozon, Яндекс.Маркет. Знаем агентские отношения и НДС с 60 млн.",
    href: "/uslugi/marketplaces",
  },
  {
    slug: "it",
    icon: Cpu,
    title: "IT-компании",
    description: "Аккредитация, IT-льготы, валютные контракты, НИОКР. Понимаем специфику отрасли.",
    href: "/uslugi/it",
  },
  {
    slug: "horeca",
    icon: UtensilsCrossed,
    title: "Общепит и HoReCa",
    description: "ЕГАИС, кассы, маркировка, расчёт себестоимости блюд. Отраслевая экспертиза.",
    href: "/uslugi/obschepit",
  },
  {
    slug: "retail",
    icon: Store,
    title: "Торговля и розница",
    description: "Маркировка, прослеживаемость, эквайринг, ОФД. Учёт от 30 до 1000+ операций в месяц.",
    href: "/uslugi/torgovlya",
  },
];

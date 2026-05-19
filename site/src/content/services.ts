import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Users,
  FileCheck,
  FilePlus,
  FileX,
  RefreshCw,
  Calculator,
  Search,
  Globe,
  ShoppingCart,
  Truck,
  FileText,
  HelpCircle,
} from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  href: string;
}

export const services: Service[] = [
  {
    slug: "vedenie",
    icon: BookOpen,
    title: "Ведение бухгалтерии",
    short: "Полный учёт ИП и ООО на УСН, ОСНО, ПСН, АУСН",
    href: "/tarify",
  },
  {
    slug: "kadry",
    icon: Users,
    title: "Кадры и зарплата",
    short: "Трудовые договоры, расчёт зарплаты, КЭДО, отчётность",
    href: "/tarify",
  },
  {
    slug: "otchetnost",
    icon: FileCheck,
    title: "Сдача отчётности",
    short: "ФНС, СФР, Росстат. Декларации, РСВ, 6-НДФЛ, ЕФС-1",
    href: "/tarify",
  },
  {
    slug: "registratsiya",
    icon: FilePlus,
    title: "Регистрация ИП / ООО",
    short: "Под ключ, без поездок в налоговую",
    href: "/tarify",
  },
  {
    slug: "likvidatsiya",
    icon: FileX,
    title: "Ликвидация ИП / ООО",
    short: "Полное сопровождение от заявления до исключения из ЕГРЮЛ",
    href: "/tarify",
  },
  {
    slug: "nulevaya",
    icon: FileText,
    title: "Нулевая отчётность",
    short: "Для приостановленной деятельности — от 2 000 ₽/квартал",
    href: "/uslugi/nulevaya-otchetnost",
  },
  {
    slug: "vosstanovlenie",
    icon: RefreshCw,
    title: "Восстановление учёта",
    short: "Если бухгалтер ушёл, ФНС блокирует, истёк период",
    href: "/tarify",
  },
  {
    slug: "planirovanie",
    icon: Calculator,
    title: "Налоговое планирование",
    short: "Законная оптимизация: УСН, льготы, переходы между режимами",
    href: "/tarify",
  },
  {
    slug: "proverki",
    icon: Search,
    title: "Сопровождение проверок",
    short: "Подготовка документов, представление интересов, переписка с ФНС",
    href: "/tarify",
  },
  {
    slug: "ved",
    icon: Globe,
    title: "ВЭД и валютный контроль",
    short: "Импорт, экспорт, агентские договоры, валютные операции",
    href: "/tarify",
  },
  {
    slug: "marketplaces",
    icon: ShoppingCart,
    title: "Маркетплейсы",
    short: "Wildberries, Ozon, Яндекс.Маркет — со знанием агентских отчётов",
    href: "/tarify",
  },
  {
    slug: "markirovka",
    icon: Truck,
    title: "Маркировка и ЭДО",
    short: "Подключение, ведение, обучение сотрудников",
    href: "/tarify",
  },
  {
    slug: "konsultatsii",
    icon: HelpCircle,
    title: "Консультации",
    short: "Часовые или письменные. По налогам, кадрам, договорам",
    href: "/tarify",
  },
];

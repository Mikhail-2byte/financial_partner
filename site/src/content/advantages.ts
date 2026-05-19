import type { LucideIcon } from "lucide-react";
import { UserCheck, Shield, MessageCircle, MapPin, Clock, Receipt } from "lucide-react";

export interface Advantage {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const advantages: Advantage[] = [
  {
    icon: UserCheck,
    title: "Именной бухгалтер",
    description:
      "Один специалист на ваш бизнес. Знает вас по имени, понимает специфику, не передаёт от менеджера к менеджеру.",
  },
  {
    icon: MessageCircle,
    title: "Отвечаем в течение часа",
    description:
      "Telegram, WhatsApp, телефон — выбираете удобный канал. Не «в течение 3 рабочих дней», а сегодня.",
  },
  {
    icon: Shield,
    title: "Гарантия и ответственность",
    description:
      "Договор с юридической ответственностью. Если допустили ошибку — штраф ФНС покрываем мы.",
  },
  {
    icon: MapPin,
    title: "Офис + онлайн",
    description:
      "Приедете в офис в Екатеринбурге или работаете удалённо. Подходит и местным, и клиентам из любого города.",
  },
  {
    icon: Receipt,
    title: "Цена не растёт «с бумажки»",
    description:
      "Фиксированный тариф по операциям. Никаких надбавок за каждый запрос в чате или дополнительный документ.",
  },
  {
    icon: Clock,
    title: "Предупреждаем о дедлайнах",
    description:
      "Сами следим за датами сдачи отчётности, изменениями в законах и переходными периодами по налогам.",
  },
];

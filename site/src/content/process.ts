import type { LucideIcon } from "lucide-react";
import { MessageSquare, Calendar, FileSignature, Play } from "lucide-react";

export interface ProcessStep {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Заявка",
    description:
      "Оставляете заявку или пишете в мессенджер. Отвечаем в течение часа.",
  },
  {
    num: "02",
    icon: Calendar,
    title: "Консультация",
    description:
      "Бесплатно: разбираем ваш бизнес, текущий учёт, подбираем тариф и закрепляем бухгалтера.",
  },
  {
    num: "03",
    icon: FileSignature,
    title: "Договор",
    description:
      "Подписываем договор: ответственность, NDA, регламент работы. Можно онлайн через ЭДО.",
  },
  {
    num: "04",
    icon: Play,
    title: "Начинаем работать",
    description:
      "Принимаем дела, настраиваем доступы, готовим первый отчёт. Вы — сосредотачиваетесь на бизнесе.",
  },
];

export interface CompanyStat {
  value: string;
  label: string;
}

export const companyStats: CompanyStat[] = [
  { value: "5+", label: "лет на рынке" }, // demo, заменить перед запуском
  { value: "200+", label: "клиентов" }, // demo, заменить перед запуском
  { value: "40+", label: "городов России" }, // demo, заменить перед запуском
  { value: "12", label: "специалистов в команде" }, // demo, заменить перед запуском
];

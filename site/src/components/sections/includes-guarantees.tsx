import {
  UserCheck,
  Shield,
  MessageCircle,
  Clock,
  FileCheck,
  Receipt,
} from "lucide-react";
import { Container, Section } from "@/components/ui/container";

const includes = [
  {
    icon: UserCheck,
    title: "Именной бухгалтер",
    text: "Один специалист на ваш бизнес — независимо от тарифа",
  },
  {
    icon: FileCheck,
    title: "Вся обязательная отчётность",
    text: "ФНС, СФР, Росстат — в срок и без штрафов",
  },
  {
    icon: MessageCircle,
    title: "Консультации в мессенджере",
    text: "Telegram, WhatsApp, email — без лимита по количеству",
  },
  {
    icon: Clock,
    title: "Напоминания о дедлайнах",
    text: "Сами следим за датами и изменениями в законах",
  },
  {
    icon: Shield,
    title: "Гарантия от штрафов",
    text: "Если штраф ФНС возник по нашей вине — компенсируем",
  },
  {
    icon: Receipt,
    title: "Прозрачная цена",
    text: "Фиксированный тариф, без надбавок «за каждый запрос»",
  },
];

export function IncludesGuaranteesSection() {
  return (
    <Section className="bg-brand-50 border-t border-line">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Что входит в любой тариф
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Шесть пунктов, которые работают даже в самом базовом
            пакете «Старт» — это наш минимум по любому договору.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {includes.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex gap-4 p-6 rounded-2xl bg-white border border-line"
            >
              <div className="size-11 shrink-0 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base mb-1">
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { contacts } from "@/content/brand";

export function ContactBlockSection() {
  return (
    <Section
      id="kontakty"
      className="bg-white border-t border-line scroll-mt-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Офис в Екатеринбурге
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-10">
              Приезжайте лично, чтобы обсудить дела за чашкой кофе.
              Или работайте онлайн из любого города — для большинства
              клиентов мы так и работаем.
            </p>

            <ul className="flex flex-col gap-5">
              <ContactRow
                icon={MapPin}
                label="Адрес"
                value={contacts.address.full}
              />
              <ContactRow icon={Phone} label="Телефон">
                <a
                  href={`tel:${contacts.phoneRaw}`}
                  className="text-ink font-semibold hover:text-brand-700 transition-colors"
                >
                  {contacts.phone}
                </a>
              </ContactRow>
              <ContactRow icon={Mail} label="Email">
                <a
                  href={`mailto:${contacts.email}`}
                  className="text-ink font-semibold hover:text-brand-700 transition-colors"
                >
                  {contacts.email}
                </a>
              </ContactRow>
              <ContactRow
                icon={Navigation}
                label="Режим работы"
                value={contacts.workingHours}
              />
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="outline" size="md" asChild>
                <a
                  href={contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Написать в Telegram
                </a>
              </Button>
              <Button variant="ghost" size="md" asChild>
                <a
                  href={contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="aspect-[4/3] rounded-2xl bg-brand-50 border-2 border-dashed border-line flex flex-col items-center justify-center text-center p-8">
              <div className="size-14 rounded-full bg-white text-brand-700 flex items-center justify-center mb-4 shadow-sm">
                <MapPin className="size-7" />
              </div>
              <div className="font-display font-bold text-lg mb-1">
                Здесь будет Яндекс.Карта
              </div>
              <p className="text-sm text-muted max-w-xs">
                Карту подключим, когда получим финальные координаты офиса.
                Сейчас можно построить маршрут по адресу.
              </p>
            </div>
            <Button variant="primary" size="md" asChild className="self-start">
              <a
                href={contacts.yandexMapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="size-4" />
                Построить маршрут
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <div className="size-11 shrink-0 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
        <Icon className="size-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </span>
        {value ? <span className="text-ink">{value}</span> : children}
      </div>
    </li>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { brand, contacts, legal, social } from "@/content/brand";

const columns = [
  {
    title: "Услуги",
    links: [
      { href: "/uslugi/buhgalter-dlya-ip", label: "Бухгалтер для ИП" },
      { href: "/uslugi/buhgalter-dlya-ooo", label: "Бухгалтер для ООО" },
      { href: "/uslugi/nulevaya-otchetnost", label: "Нулевая отчётность" },
      { href: "/uslugi/vosstanovlenie-ucheta", label: "Восстановление учёта" },
      { href: "/uslugi/marketplaces", label: "Маркетплейсы" },
      { href: "/uslugi/registratsiya", label: "Регистрация ИП/ООО" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/o-kompanii", label: "О нас" },
      { href: "/tarify", label: "Тарифы" },
      { href: "/keysy", label: "Кейсы" },
      { href: "/blog", label: "Блог" },
      { href: "/kontakty", label: "Контакты" },
    ],
  },
  {
    title: "Документы",
    links: [
      { href: "/policy", label: "Политика конфиденциальности" },
      { href: "/consent", label: "Согласие на обработку ПД" },
      { href: "/offer", label: "Публичная оферта" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-800 text-cream/90 mt-auto">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)] mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="size-10 rounded-lg bg-accent-400 text-brand-900 flex items-center justify-center font-extrabold">
                ФП
              </div>
              <span className="font-display font-extrabold text-lg">{brand.name}</span>
            </Link>
            <p className="text-sm text-cream/70 leading-relaxed mb-4 max-w-xs">
              {brand.description}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`tel:${contacts.phoneRaw}`}
                className="hover:text-accent-400 transition-colors"
              >
                {contacts.phone}
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="hover:text-accent-400 transition-colors"
              >
                {contacts.email}
              </a>
              <span className="text-cream/60">{contacts.workingHours}</span>
            </div>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-cream mb-4 text-base">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/70 hover:text-accent-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + messengers */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-t border-cream/10">
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors"
            >
              Telegram
            </a>
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={social.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors"
            >
              ВКонтакте
            </a>
          </div>
          <div className="text-sm text-cream/60">{contacts.address.full}</div>
        </div>

        {/* Legal */}
        <div className="pt-6 border-t border-cream/10 text-xs text-cream/60 leading-relaxed flex flex-col gap-2">
          <div>
            {legal.entityName} · ИНН {legal.inn} · ОГРН {legal.ogrn}
          </div>
          <div>
            © {new Date().getFullYear()} {brand.name}. Информация на сайте не является
            публичной офертой. Все цены ориентировочны.
          </div>
        </div>
      </Container>
    </footer>
  );
}

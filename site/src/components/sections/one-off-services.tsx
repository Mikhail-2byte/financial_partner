import { Container, Section } from "@/components/ui/container";
import { oneOffCategories } from "@/content/one-off-services";

export function OneOffServicesSection() {
  return (
    <Section className="bg-white border-t border-line">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Разовые услуги
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Если не нужно ежемесячное обслуживание — сделаем разовую задачу
            по фиксированной цене. Без обязательств подписывать договор
            на абонентку.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {oneOffCategories.map((cat) => (
            <article
              key={cat.slug}
              className="p-7 rounded-2xl bg-cream border border-line"
            >
              <h3 className="font-display font-bold text-xl mb-1">
                {cat.title}
              </h3>
              <p className="text-sm text-muted mb-5">{cat.description}</p>
              <ul className="flex flex-col">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start justify-between gap-4 py-3 border-t border-line"
                  >
                    <div className="min-w-0">
                      <div className="text-ink">{item.name}</div>
                      {item.note && (
                        <div className="text-xs text-muted mt-0.5">
                          {item.note}
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-brand-700 whitespace-nowrap">
                      {item.price}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Цены ориентировочные. Точную стоимость согласуем после короткого
          разговора — она зависит от объёма и срочности.
        </p>
      </Container>
    </Section>
  );
}

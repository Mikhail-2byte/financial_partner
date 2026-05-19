import { Container, Section } from "@/components/ui/container";
import { aboutStory, aboutValues } from "@/content/about";

export function AboutStorySection() {
  return (
    <Section className="bg-cream border-t border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16 items-start mb-16 md:mb-20">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              {aboutStory.title}
            </h2>
            <p className="text-lg text-ink leading-relaxed mb-6">
              {aboutStory.intro}
            </p>
            <div className="flex flex-col gap-5">
              {aboutStory.paragraphs.map((p, i) => (
                <p key={i} className="text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <aside className="p-7 md:p-8 rounded-2xl bg-brand-700 text-cream lg:sticky lg:top-24">
            <div className="text-cream/80 text-sm font-semibold uppercase tracking-wider mb-4">
              Коротко о нас
            </div>
            <dl className="flex flex-col gap-5">
              <Fact label="Основаны" value="2020" />
              <Fact label="Офис" value="Екатеринбург" />
              <Fact label="Команда" value="12 специалистов" />
              <Fact label="География" value="40+ городов России" />
              <Fact label="Формат" value="Онлайн + офис" />
            </dl>
          </aside>
        </div>

        <div className="mb-12 md:mb-14">
          <h3 className="font-display font-bold text-2xl md:text-3xl">
            Что для нас важно
          </h3>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {aboutValues.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex gap-5 p-6 md:p-7 rounded-2xl bg-white border border-line"
            >
              <div className="size-12 shrink-0 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                <Icon className="size-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg mb-2">{title}</h4>
                <p className="text-muted leading-relaxed">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-3 border-b border-cream/15 last:border-b-0">
      <dt className="text-cream/70 text-sm">{label}</dt>
      <dd className="font-display font-bold text-cream text-right">{value}</dd>
    </div>
  );
}

import { Container, Section } from "@/components/ui/container";
import { processSteps } from "@/content/process";

export function ProcessSection() {
  return (
    <Section className="bg-white border-t border-line">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Как мы начинаем работать
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            От первого сообщения до первого отчёта — обычно неделя.
            Никаких многостраничных опросников и звонков «уточнить детали».
          </p>
        </div>

        <ol className="grid gap-10 md:gap-0 md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {processSteps.map(({ num, icon: Icon, title, description }) => (
            <li key={num} className="relative lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <div className="flex items-start gap-4 lg:flex-col lg:gap-5">
                <span
                  aria-hidden
                  className="font-display font-extrabold text-6xl md:text-7xl text-brand-100 leading-none shrink-0"
                >
                  {num}
                </span>
                <div className="lg:order-first">
                  <div className="size-12 rounded-xl bg-brand-700 text-cream flex items-center justify-center">
                    <Icon className="size-6" />
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-6">
                <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
                <p className="text-muted leading-relaxed">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

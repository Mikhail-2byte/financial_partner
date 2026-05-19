import { Container, Section } from "@/components/ui/container";
import { advantages } from "@/content/advantages";

export function AdvantagesSection() {
  return (
    <Section className="bg-cream border-t border-line">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Шесть конкретных принципов работы, которые отличают нас от
            «оптовых» бухгалтерских компаний и одиночных фрилансеров.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="group p-7 rounded-2xl bg-white border border-line transition-all duration-200 hover:border-brand-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="size-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center mb-5 transition-colors group-hover:bg-brand-100">
                <Icon className="size-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
              <p className="text-muted leading-relaxed">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

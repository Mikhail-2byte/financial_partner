import { Container, Section } from "@/components/ui/container";
import { companyStats } from "@/content/process";

export function StatsSection() {
  return (
    <Section className="bg-brand-50 border-t border-line py-12 md:py-16">
      <Container>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {companyStats.map(({ value, label }) => (
            <li
              key={label}
              className="text-center lg:text-left lg:px-6 lg:border-l lg:border-line lg:first:border-l-0"
            >
              <div className="font-display font-extrabold text-5xl md:text-6xl text-brand-700 leading-none mb-3">
                {value}
              </div>
              <div className="text-sm md:text-base text-muted leading-snug">
                {label}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

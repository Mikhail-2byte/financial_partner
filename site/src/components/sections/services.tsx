import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <Section className="bg-cream border-t border-line">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Что мы делаем
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Полный спектр бухгалтерских услуг — от постоянного ведения
              до разовых задач: восстановление учёта, нулевая отчётность,
              сопровождение проверок.
            </p>
          </div>
          <Button variant="outline" size="md" asChild className="self-start md:self-end">
            <Link href="/uslugi">
              Все услуги
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map(({ slug, icon: Icon, title, short, href }) => (
            <li key={slug}>
              <Link
                href={href}
                className="group h-full flex flex-col gap-3 p-6 rounded-2xl bg-white border border-line transition-all duration-200 hover:border-brand-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="size-10 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center transition-colors group-hover:bg-brand-100">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display font-bold text-base leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{short}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

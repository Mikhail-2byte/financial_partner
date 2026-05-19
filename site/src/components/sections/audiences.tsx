import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { audiences } from "@/content/audiences";

export function AudiencesSection() {
  return (
    <Section className="bg-white border-t border-line">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Кому подходим
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Шесть направлений бизнеса, в которых у нас есть отраслевая
            экспертиза. Выберите своё — расскажем подробнее.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map(({ slug, icon: Icon, title, description, href }) => (
            <li key={slug}>
              <Link
                href={href}
                className="group relative h-full flex flex-col p-7 rounded-2xl bg-cream border border-line transition-all duration-200 hover:border-brand-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="size-12 rounded-xl bg-brand-700 text-cream flex items-center justify-center mb-5">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
                <p className="text-muted leading-relaxed mb-6">{description}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-700 group-hover:gap-3 transition-all">
                  Подробнее
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cases } from "@/content/cases";

export function CasesSection() {
  return (
    <Section id="cases" className="bg-white border-t border-line scroll-mt-24">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Кейсы клиентов
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Три истории — что пришло, что сделали, какой результат
            в цифрах. Не маркетинговые сторителлинги, а конкретные ситуации.
          </p>
        </div>

        <ul className="grid gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <li
              key={c.slug}
              className="h-full flex flex-col p-7 rounded-2xl bg-cream border border-line"
            >
              <div className="flex items-center gap-3 mb-5">
                <ImagePlaceholder
                  ratio="square"
                  shape="rect"
                  size="sm"
                  label={`Лого клиента: ${c.industry}`}
                  className="size-14 shrink-0 rounded-xl bg-white"
                />
                <Badge variant="brand">{c.industry}</Badge>
              </div>

              <div className="mb-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Ситуация
                </div>
                <p className="text-ink leading-relaxed">{c.situation}</p>
              </div>

              <div className="mb-6 flex-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Что сделали
                </div>
                <p className="text-ink leading-relaxed">{c.result}</p>
              </div>

              <div className="pt-5 border-t border-line">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  Результат
                </div>
                <div className="font-display font-extrabold text-2xl md:text-3xl text-brand-700 leading-tight">
                  {c.metric}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

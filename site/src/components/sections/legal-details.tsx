import { FileText } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { legal } from "@/content/brand";

export function LegalDetailsSection() {
  const rows = [
    { label: "Юридическое наименование", value: legal.entityName },
    { label: "ИНН", value: legal.inn },
    { label: "КПП", value: legal.kpp },
    { label: "ОГРН", value: legal.ogrn },
    { label: "Юридический адрес", value: legal.legalAddress },
  ];

  return (
    <Section className="bg-brand-50 border-t border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-brand-700 text-cream mb-5">
              <FileText className="size-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Реквизиты
            </h2>
            <p className="text-muted leading-relaxed">
              Используйте эти данные для договоров, актов сверки и проверки
              в открытых реестрах ФНС. Все реквизиты актуальны на текущую дату.
            </p>
          </div>

          <dl className="rounded-2xl bg-white border border-line overflow-hidden">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={
                  "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 md:px-7 py-4 " +
                  (i < rows.length - 1 ? "border-b border-line" : "")
                }
              >
                <dt className="text-sm text-muted sm:w-56 shrink-0">
                  {row.label}
                </dt>
                <dd className="font-display font-semibold text-ink break-all">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}

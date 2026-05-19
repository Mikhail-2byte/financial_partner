import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { pricingTiers, surcharges } from "@/content/pricing";
import { formatPrice, cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <Section
      id="packages"
      className="bg-brand-50 border-t border-line scroll-mt-24"
    >
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Прозрачные тарифы
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Фиксированная стоимость в месяц. Без скрытых надбавок «по бумажке».
            Доплаты возможны только за специфику — они описаны ниже.
          </p>
        </div>

        <ul className="grid gap-6 lg:grid-cols-3 items-start mb-10">
          {pricingTiers.map((tier) => (
            <li
              key={tier.slug}
              className={cn(
                "relative h-full flex flex-col p-7 md:p-8 rounded-2xl bg-white border transition-shadow duration-200",
                tier.highlighted
                  ? "border-accent-500 border-2 shadow-lg lg:-mt-4 lg:scale-[1.02]"
                  : "border-line shadow-sm hover:shadow-md",
              )}
            >
              {tier.highlighted && (
                <Badge
                  variant="accent"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5"
                >
                  Чаще всего выбирают
                </Badge>
              )}

              <div className="mb-6">
                <div className="font-display font-extrabold text-2xl text-brand-700 mb-2">
                  {tier.name}
                </div>
                <p className="text-sm text-muted leading-relaxed min-h-[3rem]">
                  {tier.audience}
                </p>
              </div>

              <div className="mb-6 pb-6 border-b border-line">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm text-muted">от</span>
                  <span className="font-display font-extrabold text-4xl text-ink">
                    {formatPrice(tier.priceFrom)}
                  </span>
                </div>
                <div className="text-sm text-muted mt-1">{tier.priceUnit}</div>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 items-start text-sm">
                    <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? "primary" : "outline"}
                size="md"
                asChild
                className="w-full"
              >
                <Link href="#lead-form">{tier.cta}</Link>
              </Button>
            </li>
          ))}
        </ul>

        <div className="p-6 md:p-8 rounded-2xl bg-white border border-line">
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
            <div className="md:w-64 shrink-0">
              <h3 className="font-display font-bold text-lg mb-2">
                Возможные надбавки
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Зависят от специфики бизнеса. Обсуждаются и фиксируются
                до подписания договора.
              </p>
            </div>
            <ul className="flex-1 grid gap-3 sm:grid-cols-2">
              {surcharges.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 py-2 border-b border-line last:border-b-0 sm:border-b sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <span className="text-sm text-ink">{item.label}</span>
                  <span className="text-sm font-semibold text-brand-700 whitespace-nowrap">
                    {item.delta}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

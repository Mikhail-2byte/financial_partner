import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingTiers } from "@/content/pricing";
import { formatPrice } from "@/lib/utils";
import type {
  LandingFaqItem,
  LandingHero,
  LandingPriceHook,
  LandingSuitsBlock,
} from "@/content/landings";

export function LandingHeroSection({ hero }: { hero: LandingHero }) {
  return (
    <Section className="relative overflow-hidden pt-12 md:pt-20 pb-10 md:pb-12">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 size-96 rounded-full bg-accent-100/50 blur-3xl"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          <Badge variant="brand" className="mb-6">
            {hero.eyebrow}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mb-10">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="primary" asChild>
              <Link href="#lead-form">
                {hero.primaryCta}
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={hero.secondaryHref}>{hero.secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function LandingSuitsSection({ block }: { block: LandingSuitsBlock }) {
  return (
    <Section className="bg-cream border-t border-line">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="p-7 md:p-9 rounded-2xl bg-white border border-line">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                <Check className="size-5" strokeWidth={2.5} />
              </div>
              <h2 className="font-display font-bold text-xl md:text-2xl">
                Подходит вам, если
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {block.suits.map((item) => (
                <li key={item} className="flex gap-3 text-ink leading-relaxed">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7 md:p-9 rounded-2xl bg-white border border-line">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-line text-muted flex items-center justify-center">
                <X className="size-5" strokeWidth={2.5} />
              </div>
              <h2 className="font-display font-bold text-xl md:text-2xl">
                {block.notSuitsTitle ?? "Не подходит"}
              </h2>
            </div>
            <ul className="flex flex-col gap-3 mb-6">
              {block.notSuits.map((item) => (
                <li key={item} className="flex gap-3 text-muted leading-relaxed">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-line" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {block.notSuitsHref && block.notSuitsLinkText && (
              <Link
                href={block.notSuitsHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                {block.notSuitsLinkText}
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function LandingWhatsIncludedSection({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <Section className="bg-white border-t border-line">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted leading-relaxed">{description}</p>
        </div>

        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <span className="mt-0.5 size-6 shrink-0 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <span className="text-ink leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function LandingPriceHookSection({
  priceHook,
}: {
  priceHook: LandingPriceHook;
}) {
  const tier = priceHook.tierSlug
    ? pricingTiers.find((t) => t.slug === priceHook.tierSlug)
    : undefined;

  return (
    <Section className="bg-brand-50 border-t border-line">
      <Container>
        <div className="max-w-3xl mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Сколько это стоит
          </h2>
          <p className="text-lg text-muted leading-relaxed">{priceHook.leadIn}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] items-stretch">
          {tier ? (
            <article className="p-7 md:p-9 rounded-2xl bg-white border-2 border-brand-700 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="font-display font-extrabold text-2xl text-brand-700">
                  Тариф «{tier.name.charAt(0)}{tier.name.slice(1).toLowerCase()}»
                </div>
                <Badge variant="brand">Рекомендуем</Badge>
              </div>
              <p className="text-sm text-muted mb-6 leading-relaxed">
                {tier.audience}
              </p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-sm text-muted">от</span>
                <span className="font-display font-extrabold text-4xl text-ink">
                  {formatPrice(tier.priceFrom)}
                </span>
              </div>
              <div className="text-sm text-muted mb-7">{tier.priceUnit}</div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="md" asChild className="flex-1">
                  <Link href="#lead-form">{tier.cta}</Link>
                </Button>
                <Button variant="outline" size="md" asChild className="flex-1">
                  <Link href="/tarify#packages">Сравнить тарифы</Link>
                </Button>
              </div>
            </article>
          ) : priceHook.oneOff ? (
            <article className="p-7 md:p-9 rounded-2xl bg-white border-2 border-brand-700 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="font-display font-extrabold text-2xl text-brand-700">
                  Разовая услуга
                </div>
                <Badge variant="brand">Без абонентки</Badge>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display font-extrabold text-4xl text-ink">
                  {priceHook.oneOff.price}
                </span>
              </div>
              <div className="text-sm text-muted mb-7">{priceHook.oneOff.unit}</div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="md" asChild className="flex-1">
                  <Link href="#lead-form">Заказать сдачу</Link>
                </Button>
                <Button variant="outline" size="md" asChild className="flex-1">
                  <Link href="/tarify">Все цены</Link>
                </Button>
              </div>
            </article>
          ) : null}

          <aside className="p-7 md:p-9 rounded-2xl bg-brand-700 text-cream">
            <h3 className="font-display font-bold text-lg mb-5">
              Что важно знать
            </h3>
            <ul className="flex flex-col gap-3">
              {priceHook.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-cream/90 leading-relaxed">
                  <Check
                    className="size-5 shrink-0 text-accent-400 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

export function LandingFaqSection({ items }: { items: LandingFaqItem[] }) {
  return (
    <Section className="bg-cream border-t border-line">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 md:mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Частые вопросы
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Если вашего вопроса здесь нет — задайте его в Telegram,
              отвечаем в течение часа.
            </p>
          </div>

          <Accordion type="single" collapsible className="border-t border-line">
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
}

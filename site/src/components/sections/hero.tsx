import Link from "next/link";
import { ArrowRight, Calculator, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { brand } from "@/content/brand";

const trustItems = [
  { icon: MapPin, label: "Офис в Екатеринбурге" },
  { icon: Users, label: "200+ клиентов" },
  { icon: Clock, label: "Отвечаем за час" },
];

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 size-96 rounded-full bg-accent-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-100/60 blur-3xl"
      />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 items-center">
          <div>
            <Badge variant="accent" className="mb-6">
              <span className="size-1.5 rounded-full bg-accent-500" />
              Офис в Екатеринбурге · работаем по всей России
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              {brand.name}: ведём ИП и ООО{" "}
              <span className="relative inline-block">
                <span className="relative z-10">по всей России</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 h-3 bg-accent-300/70 -z-0"
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mb-8 md:mb-10">
              Персональный бухгалтер с офисом в Екатеринбурге.
              Один специалист на ваш бизнес, не колл-центр.
              Отвечаем в мессенджере в течение часа.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-10">
              <Button size="lg" variant="primary" asChild>
                <Link href="#lead-form">
                  Получить консультацию
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tarify">
                  <Calculator className="size-5" />
                  Рассчитать стоимость
                </Link>
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              {trustItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="size-4 text-brand-600" aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <ImagePlaceholder
              ratio="portrait"
              size="lg"
              label="Главный визуал Hero"
              hint="Фото бухгалтера за работой, тёплый кабинет, ноутбук, чай — атмосфера «партнёр, а не корпорация»"
              dimensions="~720×900 px · 4:5"
              className="shadow-sm rounded-[var(--radius-hero)]"
            />
            <div
              aria-hidden
              className="absolute -bottom-4 -left-4 hidden lg:block size-24 rounded-2xl bg-accent-400/20 -z-0"
            />
            <div
              aria-hidden
              className="absolute -top-4 -right-4 hidden lg:block size-20 rounded-2xl bg-brand-200/40 -z-0"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

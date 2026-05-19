"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator as CalculatorIcon, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { calculatorSteps } from "@/content/calculator";
import { cn } from "@/lib/utils";

type Answers = Record<string, string | string[] | undefined>;

export function CalculatorSection() {
  const [answers, setAnswers] = useState<Answers>({});

  const filledCount = useMemo(
    () =>
      calculatorSteps.filter((step) => {
        const v = answers[step.slug];
        return Array.isArray(v) ? v.length > 0 : Boolean(v);
      }).length,
    [answers],
  );

  function toggle(stepSlug: string, value: string, multi: boolean) {
    setAnswers((prev) => {
      if (!multi) return { ...prev, [stepSlug]: value };
      const current = (prev[stepSlug] as string[] | undefined) ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [stepSlug]: next };
    });
  }

  function reset() {
    setAnswers({});
  }

  return (
    <Section
      id="calculator"
      className="bg-cream border-t border-line scroll-mt-24"
    >
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <Badge variant="accent" className="mb-5">
            <Sparkles className="size-3" />
            Калькулятор стоимости
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Подберём тариф под ваш бизнес
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Ответьте на 6 коротких вопросов — мы пришлём точный расчёт
            с расшифровкой по статьям за 10 минут в рабочее время.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">
          <div className="p-7 md:p-9 rounded-2xl bg-white border border-line">
            <ol className="flex flex-col gap-9">
              {calculatorSteps.map((step, index) => {
                const value = answers[step.slug];
                const multi = step.multi ?? false;
                return (
                  <li key={step.slug}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="size-8 rounded-full bg-brand-700 text-cream flex items-center justify-center font-display font-bold text-sm">
                        {index + 1}
                      </span>
                      <h3 className="font-display font-bold text-lg md:text-xl">
                        {step.question}
                      </h3>
                    </div>
                    {step.hint && (
                      <p className="text-sm text-muted mb-4 ml-11">{step.hint}</p>
                    )}
                    <div className="flex flex-wrap gap-2 ml-11">
                      {step.options.map((option) => {
                        const selected = multi
                          ? Array.isArray(value) && value.includes(option.value)
                          : value === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => toggle(step.slug, option.value, multi)}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2",
                              selected
                                ? "bg-brand-700 text-cream border-brand-700"
                                : "bg-cream text-ink border-line hover:border-brand-300 hover:bg-white",
                            )}
                            aria-pressed={selected}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ol>

            {filledCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="mt-8 text-sm text-muted hover:text-brand-700 underline underline-offset-4"
              >
                Сбросить выбор
              </button>
            )}
          </div>

          <aside className="sticky top-24 p-7 md:p-8 rounded-2xl bg-brand-700 text-cream">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-xl bg-accent-400 text-brand-900 flex items-center justify-center">
                <CalculatorIcon className="size-5" />
              </div>
              <div className="text-sm text-cream/80">
                Заполнено {filledCount} из {calculatorSteps.length}
              </div>
            </div>

            <div className="font-display font-extrabold text-2xl md:text-3xl leading-tight mb-3">
              Точный расчёт пришлём за 10 минут
            </div>
            <p className="text-cream/80 leading-relaxed mb-6">
              Автоматический калькулятор сейчас в разработке. Пока
              отправляйте параметры — расчёт сделаем вручную,
              учитывая специфику вашего бизнеса.
            </p>

            <div className="h-px bg-cream/15 mb-6" />

            <ul className="flex flex-col gap-3 mb-7 text-sm">
              <li className="flex gap-2">
                <span className="text-accent-400">✓</span>
                <span className="text-cream/90">Без скрытых надбавок</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-400">✓</span>
                <span className="text-cream/90">С разбивкой по статьям</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-400">✓</span>
                <span className="text-cream/90">Без обязательств</span>
              </li>
            </ul>

            <Button variant="accent" size="lg" asChild className="w-full">
              <Link href="#lead-form">
                Получить расчёт
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

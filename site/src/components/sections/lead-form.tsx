"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Clock, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { cn, formatPhone } from "@/lib/utils";

const businessTypes = [
  { value: "ip", label: "ИП" },
  { value: "ooo", label: "ООО" },
  { value: "samozanyaty", label: "Самозанятый (НПД)" },
  { value: "planiruyu", label: "Планирую открыть" },
] as const;

const leadSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z
    .string()
    .regex(/^[\d\s+()-]+$/u, "Только цифры и символы +()-")
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "Введите телефон полностью",
    }),
  business: z.enum(["ip", "ooo", "samozanyaty", "planiruyu"], {
    message: "Выберите тип бизнеса",
  }),
  message: z.string().max(500, "Не больше 500 символов").optional().or(z.literal("")),
  consent: z.literal(true, { message: "Без согласия мы не сможем перезвонить" }),
  // honeypot: скрытое поле, заполняется только ботами
  website: z.string().max(0).optional().or(z.literal("")),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const bullets = [
  {
    icon: Clock,
    title: "Перезвоним в течение часа",
    text: "В рабочее время (пн–пт 9:00–19:00). Срочно — пишите в Telegram, ответим за 30 минут.",
  },
  {
    icon: MessageCircle,
    title: "Разберём вашу ситуацию",
    text: "Бесплатно. Подберём тариф, обсудим переход, ответим на все вопросы по налогам и кадрам.",
  },
  {
    icon: Shield,
    title: "Без обязательств и спама",
    text: "Никаких звонков «через неделю узнать, не передумали ли вы». Один разговор — и тишина, если решите подумать.",
  },
];

export function LeadFormSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      business: undefined,
      message: "",
      consent: false as unknown as true,
      website: "",
    },
  });

  const phoneRegister = register("phone");
  const handlePhoneBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    phoneRegister.onBlur(event);
    const raw = event.target.value;
    const formatted = formatPhone(raw);
    if (formatted !== raw) {
      setValue("phone", formatted, { shouldValidate: true });
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    // honeypot — тихо «принимаем», но никуда не отправляем
    if (data.website && data.website.length > 0) {
      setSubmitted(true);
      return;
    }
    if (isSubmitting) return;
    await new Promise((resolve) => setTimeout(resolve, 400));
    // TODO: интеграция с CRM/email
    setSubmitted(true);
  });

  return (
    <Section id="lead-form" className="bg-brand-50 border-t border-line scroll-mt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Получить бесплатную консультацию
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-10">
              Заполните форму — расскажем, как мы будем работать именно
              с вашим бизнесом. Без шаблонных коммерческих предложений.
            </p>

            <ul className="flex flex-col gap-6">
              {bullets.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <div className="size-11 shrink-0 rounded-xl bg-brand-700 text-cream flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg mb-1">
                      {title}
                    </div>
                    <p className="text-muted leading-relaxed">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7 md:p-9 rounded-2xl bg-white border border-line shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10">
                <div className="size-16 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center mb-5">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="font-display font-extrabold text-2xl mb-3">
                  Спасибо, заявка принята
                </h3>
                <p className="text-muted leading-relaxed max-w-sm">
                  Свяжемся с вами в течение часа в рабочее время.
                  Если срочно — пишите в Telegram.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                {/* Honeypot: скрытое поле для ловли ботов. Реальный пользователь его не видит */}
                <div aria-hidden className="absolute -left-[9999px] size-0 overflow-hidden">
                  <label htmlFor="lead-website">Website (оставьте пустым)</label>
                  <input
                    id="lead-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                  />
                </div>
                <Field
                  label="Как к вам обращаться"
                  htmlFor="lead-name"
                  error={errors.name?.message}
                >
                  <input
                    id="lead-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Имя"
                    {...register("name")}
                    className={inputClass(!!errors.name)}
                  />
                </Field>

                <Field
                  label="Телефон"
                  htmlFor="lead-phone"
                  error={errors.phone?.message}
                >
                  <input
                    id="lead-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+7 (___) ___-__-__"
                    {...phoneRegister}
                    onBlur={handlePhoneBlur}
                    className={inputClass(!!errors.phone)}
                  />
                </Field>

                <Field
                  label="Тип бизнеса"
                  htmlFor="lead-business"
                  error={errors.business?.message}
                >
                  <select
                    id="lead-business"
                    {...register("business")}
                    defaultValue=""
                    className={cn(inputClass(!!errors.business), "appearance-none bg-white")}
                  >
                    <option value="" disabled>
                      Выберите
                    </option>
                    {businessTypes.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Кратко о задаче"
                  htmlFor="lead-message"
                  error={errors.message?.message}
                  hint="необязательно"
                >
                  <textarea
                    id="lead-message"
                    rows={3}
                    placeholder="Например: ищу бухгалтера для нового ИП на УСН"
                    {...register("message")}
                    className={cn(inputClass(!!errors.message), "h-auto py-3 resize-none")}
                  />
                </Field>

                <label className="flex gap-3 items-start cursor-pointer select-none text-sm text-muted leading-relaxed">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-0.5 size-4 rounded border-line text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-700"
                  />
                  <span>
                    Согласен с обработкой персональных данных в соответствии с{" "}
                    <a
                      href="/policy"
                      className="text-brand-700 underline underline-offset-2 hover:text-brand-800"
                    >
                      политикой конфиденциальности
                    </a>
                    .
                  </span>
                </label>
                {errors.consent?.message && (
                  <p className="-mt-3 text-xs text-danger">{errors.consent.message}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full mt-2"
                >
                  {isSubmitting ? "Отправляем…" : "Получить консультацию"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-ink flex items-center justify-between"
      >
        <span>{label}</span>
        {hint && <span className="font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full h-11 px-4 rounded-xl border bg-cream text-ink placeholder:text-muted/70",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "transition-colors",
    hasError ? "border-danger" : "border-line hover:border-brand-200",
  );
}

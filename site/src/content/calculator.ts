/**
 * Шаги и опции калькулятора стоимости (research §9.2).
 * Сейчас используется только для UI-плейсхолдера, без расчёта.
 * При реализации расчёта добавить базовые цены и коэффициенты.
 */

export interface CalculatorOption {
  value: string;
  label: string;
}

export interface CalculatorStep {
  slug: string;
  question: string;
  hint?: string;
  multi?: boolean;
  options: CalculatorOption[];
}

export const calculatorSteps: CalculatorStep[] = [
  {
    slug: "form",
    question: "Форма бизнеса",
    options: [
      { value: "ip", label: "ИП" },
      { value: "ooo", label: "ООО" },
      { value: "samozanyaty", label: "Самозанятый" },
    ],
  },
  {
    slug: "sno",
    question: "Система налогообложения",
    options: [
      { value: "usn-d", label: "УСН «Доходы»" },
      { value: "usn-dr", label: "УСН «Доходы минус расходы»" },
      { value: "osno", label: "ОСНО" },
      { value: "psn", label: "ПСН" },
      { value: "ausn", label: "АУСН" },
      { value: "esxn", label: "ЕСХН" },
    ],
  },
  {
    slug: "operations",
    question: "Операций в месяц",
    hint: "Платёжки, акты, накладные — всё движение по счёту и кассе",
    options: [
      { value: "0-10", label: "До 10" },
      { value: "10-30", label: "10–30" },
      { value: "30-60", label: "30–60" },
      { value: "60-100", label: "60–100" },
      { value: "100-200", label: "100–200" },
      { value: "200+", label: "Более 200" },
    ],
  },
  {
    slug: "employees",
    question: "Сотрудников в штате",
    options: [
      { value: "0", label: "Нет сотрудников" },
      { value: "1-5", label: "1–5" },
      { value: "5-15", label: "5–15" },
      { value: "15-30", label: "15–30" },
      { value: "30+", label: "Более 30" },
    ],
  },
  {
    slug: "industry",
    question: "Отрасль",
    options: [
      { value: "uslugi", label: "Услуги" },
      { value: "torgovlya", label: "Торговля" },
      { value: "proizvodstvo", label: "Производство" },
      { value: "it", label: "IT" },
      { value: "horeca", label: "Общепит" },
      { value: "marketplaces", label: "Маркетплейсы" },
      { value: "stroitelstvo", label: "Строительство" },
    ],
  },
  {
    slug: "extras",
    question: "Что ещё есть в бизнесе",
    hint: "Можно выбрать несколько",
    multi: true,
    options: [
      { value: "ved", label: "ВЭД" },
      { value: "markirovka", label: "Маркировка" },
      { value: "kassy", label: "Кассы и эквайринг" },
      { value: "edo", label: "ЭДО" },
    ],
  },
];

/**
 * Одноразовые услуги. Цены — диапазоны Екб из research §3.2.
 * Цены ориентировочные, окончательная стоимость согласуется до договора.
 */

export interface OneOffService {
  name: string;
  price: string;
  note?: string;
}

export interface OneOffCategory {
  slug: string;
  title: string;
  description: string;
  items: OneOffService[];
}

export const oneOffCategories: OneOffCategory[] = [
  {
    slug: "registration",
    title: "Регистрация и ликвидация",
    description: "Под ключ, без поездок в налоговую",
    items: [
      { name: "Регистрация ИП", price: "от 3 000 ₽" },
      { name: "Регистрация ООО", price: "от 8 000 ₽" },
      { name: "Ликвидация ИП", price: "от 4 000 ₽" },
      { name: "Ликвидация ООО", price: "от 25 000 ₽", note: "от 2 месяцев" },
    ],
  },
  {
    slug: "nulevaya",
    title: "Нулевая отчётность",
    description: "Для приостановленной деятельности",
    items: [
      { name: "Нулевая отчётность ИП", price: "от 2 000 ₽", note: "за квартал" },
      { name: "Нулевая отчётность ООО", price: "от 2 500 ₽", note: "за квартал" },
      { name: "Нулевая отчётность за год", price: "от 5 000 ₽", note: "ИП или ООО" },
    ],
  },
  {
    slug: "vosstanovlenie",
    title: "Восстановление учёта",
    description: "Если бухгалтер ушёл, ФНС блокирует, истёк период",
    items: [
      { name: "Восстановление за 1 месяц", price: "от 8 000 ₽" },
      { name: "Восстановление за 1 квартал", price: "от 20 000 ₽" },
      { name: "Восстановление за 1 год", price: "от 60 000 ₽" },
      { name: "Постановка учёта с нуля", price: "от 15 000 ₽" },
    ],
  },
  {
    slug: "deklaratsii",
    title: "Декларации и отчёты",
    description: "Разовая сдача без абонентского обслуживания",
    items: [
      { name: "Декларация УСН (годовая)", price: "от 2 500 ₽" },
      { name: "Декларация 3-НДФЛ", price: "от 1 500 ₽" },
      { name: "РСВ", price: "от 2 500 ₽" },
      { name: "6-НДФЛ", price: "от 2 000 ₽" },
      { name: "ЕФС-1", price: "от 2 000 ₽" },
    ],
  },
  {
    slug: "kadry",
    title: "Кадры и зарплата",
    description: "Разовые задачи или подключение к тарифу",
    items: [
      { name: "Расчёт зарплаты", price: "от 700 ₽", note: "за сотрудника" },
      { name: "Кадровый учёт", price: "от 700 ₽", note: "за сотрудника / мес" },
    ],
  },
  {
    slug: "konsultatsii",
    title: "Консультации и сопровождение",
    description: "Часовые консультации и помощь с проверками",
    items: [
      { name: "Консультация бухгалтера", price: "от 2 000 ₽", note: "за час" },
      { name: "Сопровождение налоговой проверки", price: "от 4 000 ₽", note: "за час" },
      { name: "Маркировка / прослеживаемость", price: "от 5 000 ₽", note: "разово" },
    ],
  },
];

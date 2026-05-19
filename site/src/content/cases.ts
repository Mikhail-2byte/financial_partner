/**
 * Cases — PLACEHOLDER data. Replace with real client stories (with consent) before launch.
 */

export interface CaseStudy {
  slug: string;
  industry: string;
  situation: string;
  result: string;
  metric: string;
}

export const cases: CaseStudy[] = [
  {
    slug: "wb-seller",
    industry: "Селлер Wildberries · ИП на УСН",
    situation:
      "Самостоятельно вёл учёт, путал агентскую выручку с собственной. Не успел перейти на НДС при превышении 60 млн.",
    result:
      "Восстановили учёт за 4 месяца, грамотно перешли на НДС, защитили от доначислений при камералке.",
    metric: "−340 000 ₽ переплаты по налогам",
  },
  {
    slug: "it-company",
    industry: "IT-компания · ООО на УСН",
    situation:
      "Бухгалтер уволился перед сдачей квартала. Параллельно подавали на IT-аккредитацию.",
    result:
      "Подхватили дела за 5 рабочих дней, сдали квартал в срок, помогли пройти аккредитацию.",
    metric: "0 штрафов за квартал",
  },
  {
    slug: "horeca",
    industry: "Сеть кофеен · ООО на ОСНО",
    situation:
      "Пришло требование ФНС по НДС за прошлый год — старый бухгалтер не отвечал на запросы.",
    result:
      "Сопроводили проверку, подготовили возражения, согласовали корректировки без штрафа.",
    metric: "Проверка закрыта без доначислений",
  },
];

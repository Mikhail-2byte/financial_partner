/**
 * Team members — DEMO. Заменить на реальные имена и фото перед запуском.
 * Фото класть в /public/team/{slug}.jpg (рекомендуется 400×400, square).
 */

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  photo?: string;
}

export const team: TeamMember[] = [
  {
    slug: "founder",
    name: "Елена Сорокина", // demo, заменить перед запуском
    role: "Руководитель, главный бухгалтер",
    experience: "18+ лет",
    specialization: "ОСНО, ВЭД, налоговые проверки",
  },
  {
    slug: "senior-ooo",
    name: "Ольга Радченко", // demo, заменить перед запуском
    role: "Старший бухгалтер",
    experience: "12+ лет",
    specialization: "УСН, ООО, маркетплейсы",
  },
  {
    slug: "senior-hr",
    name: "Марина Гилёва", // demo, заменить перед запуском
    role: "Бухгалтер-кадровик",
    experience: "9+ лет",
    specialization: "Кадры, зарплата, КЭДО",
  },
  {
    slug: "specialist-ip",
    name: "Анна Кочергина", // demo, заменить перед запуском
    role: "Бухгалтер",
    experience: "6+ лет",
    specialization: "ИП на УСН, ПСН, НПД",
  },
];

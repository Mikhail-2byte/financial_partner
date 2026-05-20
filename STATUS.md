# STATUS — «Финансовый партнёр»

*Последнее обновление: 2026-05-18*

Точка входа для новой сессии. Открой первым, потом — `brand-kit.md` и план в `~/.claude/plans/golden-frolicking-firefly.md`.

> Доп. файлы: `PROMPTS.md` — плейбук задач с готовыми промтами для доработки сайта · `SITE-OVERVIEW.md` — полное текстовое «зеркало» сайта для заказчика (что написано на каждой странице + поля для правок и реальных данных).

---

## Где что лежит

```
Financial_partner/
├── STATUS.md                          ← ты здесь
├── CLAUDE.md                          инструкции для Claude (архитектура, ограничения)
├── brand-kit.md                       палитра, шрифты, H1, tone of voice
├── finansovy_partner_research.md      исследование рынка/ЦА/цен
└── site/                              Next.js 16 проект (единственный git-репозиторий)
    ├── next.config.ts                 редирект /uslugi → /tarify
    ├── package.json                   Next.js 16.2.6, React 19.2.4, Tailwind 4
    └── src/
        ├── app/                       App Router (11 маршрутов, см. ниже)
        ├── components/
        │   ├── ui/                    Button · Card · Container · Section · Badge · Accordion
        │   ├── layout/                Header · Footer · CookieBanner
        │   └── sections/              24 серверные секции + LeadForm/Calculator/CookieBanner (client)
        ├── content/                   14 типизированных контент-файлов (см. ниже)
        └── lib/utils.ts               cn(), formatPrice(), formatPhone()
```

### Маршруты (11)

| URL | Назначение |
|-----|------------|
| `/` | Главная — 13 секций |
| `/tarify` | Тарифы + калькулятор (UI без расчёта) + разовые услуги + гарантии |
| `/o-kompanii` | История + ценности + команда + процесс |
| `/kontakty` | Контактный блок + реквизиты |
| `/uslugi/buhgalter-dlya-ip` | Посадочная |
| `/uslugi/buhgalter-dlya-ooo` | Посадочная |
| `/uslugi/nulevaya-otchetnost` | Посадочная |
| `/policy` | Политика конфиденциальности (152-ФЗ) |
| `/consent` | Согласие на обработку ПД |
| `/offer` | Публичная оферта |
| `/uslugi` | → редирект 301 на `/tarify` |

Все 10 страниц пререндерятся статически (`○ Static`).

### Контент-файлы (`src/content/`)

| Файл | Что внутри | Статус |
|------|-----------|--------|
| `brand.ts` | название, домен, контакты, реквизиты | контакты и реквизиты — PLACEHOLDER |
| `advantages.ts` | 6 преимуществ для главной | готово |
| `audiences.ts` | 6 сегментов «для кого» | готово |
| `services.ts` | 13 услуг для главной (компактные карточки) | готово |
| `pricing.ts` | 3 пакета + надбавки | готово |
| `process.ts` | 4 шага + 4 цифры компании | цифры — PLACEHOLDER |
| `team.ts` | 4 сотрудника | имена — PLACEHOLDER |
| `cases.ts` | 3 кейса | PLACEHOLDER |
| `testimonials.ts` | 3 отзыва | PLACEHOLDER |
| `faq.ts` | 7 вопросов | готово |
| `about.ts` | история компании + 4 ценности | текст истории — PLACEHOLDER |
| `landings.ts` | данные 3 посадочных (hero, suits, includes, price, faq) | готово |
| `calculator.ts` | 6 шагов калькулятора (только UI) | готово |
| `one-off-services.ts` | 6 категорий разовых услуг с ценами | цены — ориентировочные из research |
| `legal.ts` | тексты политики, согласия, оферты | шаблон 152-ФЗ, проверить юристом |

---

## ✅ Сделано

### Фаза 0–3 — фундамент
- Палитра «Тёплый профессионализм» (зелёный #1A4731 + золото #F5A623)
- H1 главной: «Финансовый партнёр: ведём ИП и ООО по всей России»
- Домен: finpartner.ru (нужно купить на reg.ru)
- `brand-kit.md` — палитра, типографика, dos/don'ts
- Tailwind 4 через `@theme` в `globals.css`
- Шрифты Manrope + Inter (cyrillic subset) через `next/font/google`
- UI-примитивы: Button (5×3), Card, Container, Section, Badge, Accordion
- Утилиты: `cn()`, `formatPrice()`, `formatPhone()`
- Next.js 16.2.6 + TypeScript + App Router + src/-структура
- Зависимости: framer-motion, lucide-react, react-hook-form, zod, @hookform/resolvers, @radix-ui/*, clsx, tailwind-merge, class-variance-authority
- Метатеги в layout: title template, OG, robots, viewport, themeColor
- Cookie-баннер на всех страницах (`useSyncExternalStore` + localStorage)

### Фаза 4 — страницы (задачи #6, #7, #8, #9, #11)
- **Главная** — 13 секций по структуре research §6.2: Hero · Advantages · Audiences · Services · Pricing · Process · Stats · Team · Cases · Testimonials · LeadForm · ContactBlock · FAQ. Header/Footer подключены в `layout.tsx`.
- **`/tarify`** — TariffsPageHero · Pricing · Calculator (UI-плейсхолдер) · OneOffServices · IncludesGuarantees · LeadForm
- **`/o-kompanii`** — PageHero · AboutStory · Stats · Team · Process · LeadForm
- **`/kontakty`** — PageHero · ContactBlock · LegalDetails · LeadForm
- **3 посадочные услуг** через универсальный шаблон `landing.tsx` (LandingHero · LandingSuits · LandingWhatsIncluded · LandingPriceHook · LandingFaq)
- **3 юр.страницы** через `legal-document.tsx`

---

## 🔄 Что осталось

| # | Задача | Зависимости |
|---|--------|-------------|
| 10 | Реальная отправка лид-формы (Telegram-webhook) + сохранение факта 152-ФЗ согласия | RHF и zod установлены, нужен bot token |
| 12 | SEO, sitemap.ts, robots.ts, Яндекс.Метрика, подготовка к деплою | Метатеги частично есть |
| — | Допилить расчёт в `calculator.tsx` | Нужны базовые цены и коэффициенты |
| — | Заменить PLACEHOLDER-данные | По мере получения реальной информации |
| — | Юр.тексты в `legal.ts` дать на проверку юристу | — |
| — | Заменить плейсхолдер карты на Яндекс iframe | Нужны координаты офиса |

Деплой — на TimeWeb Cloud или Selectel (РФ-хостинг для 152-ФЗ), **не Vercel**.

---

## 🛑 PLACEHOLDER-чек-лист перед публикацией

Все помечены `// PLACEHOLDER` в коде. Найти:
```bash
cd site && grep -rn "PLACEHOLDER" src/
```

- [ ] `content/brand.ts` — телефон, email, Telegram, WhatsApp, адрес офиса, координаты для Яндекс.Карты
- [ ] `content/brand.ts → legal` — ИНН, ОГРН, КПП, юр.адрес (после регистрации юрлица)
- [ ] `content/team.ts` — реальные имена и специализации (4 человека)
- [ ] `content/cases.ts` — реальные кейсы клиентов с их согласия (3 шт)
- [ ] `content/testimonials.ts` — реальные цитаты клиентов с подписями (3 шт)
- [ ] `content/process.ts → companyStats` — реальные цифры (лет на рынке, клиентов, городов, специалистов)
- [ ] `content/about.ts` — реальная история компании
- [ ] Фото команды в `public/team/{slug}.jpg` (400×400, квадрат) + отрисовать `<Image>` в `sections/team.tsx`
- [ ] Фото офиса (для будущего блока «Офис изнутри» и заглушки карты)
- [ ] Юр.тексты в `content/legal.ts` — проверка юриста

---

## ⚙️ Технический контекст (важно для новой сессии)

- **Next.js 16** — это не та версия, которую модель «помнит». Breaking changes описаны в локальной доке: `site/node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`. Главное:
  - `params`, `searchParams`, `cookies`, `headers` — асинхронные, обязательно `await`
  - `middleware.ts` → `proxy.ts` (новый файл и имя функции)
  - `next lint` удалён — ESLint напрямую (`npx eslint .`)
  - Turbopack по умолчанию для `dev` и `build`
  - Parallel routes требуют `default.js`
  - `revalidateTag` требует второй аргумент: `revalidateTag('posts', 'max')`
- **Tailwind 4** — токены через `@theme` в `globals.css`, **не** через `tailwind.config.ts` (его нет, не создавать)
- **Анимации accordion** в Tailwind 4 не «из коробки» — keyframes объявлены прямо в `@theme` блоке `globals.css` (`accordion-down/up`)
- **shadcn/ui CLI не используется** — компоненты пишем вручную на основе `@radix-ui/*` + `cva`
- **ESLint правило `react-hooks/set-state-in-effect`** — не вызывать `setState` синхронно в `useEffect`. Для синхронизации с localStorage/window — `useSyncExternalStore` (см. `cookie-banner.tsx`)
- **Redirects** — заведены через `next.config.ts → redirects()`, не через middleware

---

## 🚀 Команды

```bash
cd site

npm run dev                # http://localhost:3000
npm run build              # production build (Turbopack)
npm start                  # запуск production
npx eslint .               # линт (вместо удалённого `next lint`)
```

Готовность к продакшну: Lighthouse Performance >85, Accessibility >90, SEO 100.

---

## 📚 Источники правды по контенту и решениям

| Что искать | Где смотреть |
|------------|-------------|
| Структура главной (14 блоков) | `finansovy_partner_research.md` §6.2 |
| Структура тарифов | research §6.3, §12.5 |
| Перечень услуг | research §7 |
| Параметры калькулятора (6 шагов) | research §9.2 |
| ЦА и портреты | research §4 |
| Цены и надбавки | research §3 |
| УТП и отстройка | research §5 |
| SEO-запросы | research §10 |
| Юридические требования (152-ФЗ) | research §11 |
| MVP чек-лист | research §12.1 |
| Палитра, шрифты, dos/don'ts | `brand-kit.md` |
| План работ по фазам | `~/.claude/plans/golden-frolicking-firefly.md` |
| Решения по бренду (H1, домен, палитра) | `brand-kit.md` §1, §4, §5 |

---

## 🧭 Как продолжить в новой сессии

1. Открой эту папку в Claude Code — `STATUS.md`, `CLAUDE.md`, `brand-kit.md` подгрузятся в контекст автоматически
2. **`PROMPTS.md`** — плейбук с 15 готовыми «копировать-вставить» промтами, чтобы доводить сайт до запуска и красоты силами подключённого тулинга (frontend-design, ui-ux-pro-max, chrome-devtools, magic, context7). Выбери задачу → вставь её промт.
3. Либо скажи: *«Продолжаем сайт. Прочитай STATUS.md и берись за задачу #10 (Telegram webhook) или #12 (SEO + деплой)»*
4. Скилл `ui-ux-pro-max` подключён глобально — можно использовать для проектирования секций
5. Если нужны новые посадочные услуг — расширяй `content/landings.ts` и создавай `app/uslugi/{slug}/page.tsx` по шаблону существующих (12 строк)

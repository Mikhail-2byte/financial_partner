# Картинки и логотип для «Финансового партнёра»

## Context

Сайт визуально готов, 10 страниц пререндерятся статически. Но на прод-фронте сейчас нет ни одной картинки:
- В `site/public/` только дефолтные Next.js SVG-мусор (`next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg`)
- В коде **ноль** упоминаний `<Image>` или `<img>` — везде только иконки `lucide-react`
- Лого в `header.tsx` (строки 26–33) и `footer.tsx` (строки 43–49) — текстовый блок: квадрат с буквами «ФП»
- В `team.tsx` — кружки с инициалами вместо фото (по выбору пользователя оставляем так до фотосессии)
- В `contact-block.tsx` — пунктирный плейсхолдер карты офиса
- В `app/layout.tsx → metadata.openGraph` есть title/description, но нет `images` — при шеринге в Telegram/WhatsApp/VK ссылка будет голым текстом

Цель этого плана — три самодостаточных гайда: (1) production-стандарт для картинок, (2) концепция + промты для логотипа, (3) OG-картинка для соцсетей. Внедрение по пунктам, без затрат на дизайнера.

По договорённости с пользователем:
- Промт логотипа — **универсальный** (подойдёт ChatGPT/DALL-E, Midjourney, Recraft/Ideogram)
- Стиль логотипа — **combination mark** (символ + название), как рекомендует brand-kit.md §8
- Фото команды/офиса пока оставляем **инициалы и плейсхолдеры** (brand-kit.md §9 запрещает сток-бизнесменов, AI-портреты подрывают доверие)
- OG-картинку **делаем** — для красивого превью при шеринге

---

# Часть A. Картинки на сайте — production-стандарт

## A.1. Структура `public/`

Удалить старое, создать структуру:

```
site/public/
├── logo/
│   ├── logo-horizontal.svg          основной (символ + название)
│   ├── logo-horizontal-light.svg    инверсия для тёмного фона (footer)
│   ├── logo-mark.svg                только символ (favicon-источник)
│   └── logo-mark.png                фолбэк 512×512
├── team/                            (пусто пока — добавится при фотосессии)
│   └── .gitkeep
├── office/                          (пусто пока)
│   └── .gitkeep
├── og-image.png                     1200×630, для соцсетей
├── apple-touch-icon.png             180×180
├── favicon.ico                      multi-resolution (16/32/48)
└── favicon-32.png · favicon-16.png
```

Удалить: `next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg`.

## A.2. Правила для всех картинок

- **Всегда `next/image`**, никогда `<img>`. Авто-оптимизация в AVIF/WebP, lazy-loading, responsive `srcset`, размеры в HTTP-заголовках для CLS.
- **Атрибут `alt` обязателен** — описывает картинку для скринридеров и SEO. Декоративные — `alt=""`.
- **`priority` только для above-the-fold** (логотип в header, hero-картинка). Всё остальное — lazy по умолчанию.
- **Конкретные размеры через `width`/`height`** (px) — не растягивать без явных размеров, иначе CLS.
- **`placeholder="blur"` для фото** — используем `import` локального файла, Next сам сделает blurDataURL.
- **Иконки UI — оставляем `lucide-react`** (это не картинки, это SVG-компоненты, оптимально для маленьких знаков).

## A.3. Целевые размеры

| Назначение | Размер | Формат |
|-----------|--------|--------|
| Логотип в Header (десктоп) | высота 32–40px (SVG масштабируется) | SVG |
| Логотип в Footer | высота 36–48px | SVG (inverse) |
| Фото команды | 400×400 (квадрат) | JPG/WebP, ~50KB |
| Фото офиса (hero-блок «офис изнутри») | 1200×800 | JPG/WebP, ~120KB |
| OG-картинка | 1200×630 | PNG, ~200KB |
| Favicon | 32×32, 16×16, 48×48 | ICO multi-res |
| Apple touch | 180×180 | PNG |

## A.4. Конкретные точки внедрения в коде

### A.4.1. Лого в Header — `src/components/layout/header.tsx` строки 26–33

Сейчас:
```tsx
<Link href="/" className="flex items-center gap-2 group" aria-label={brand.name}>
  <div className="size-9 md:size-10 rounded-lg bg-brand-700 text-cream flex items-center justify-center font-extrabold tracking-tight">
    ФП
  </div>
  <span className="hidden sm:block font-display font-extrabold text-lg leading-none">
    {brand.name}
  </span>
</Link>
```

Заменить на:
```tsx
import Image from "next/image";

<Link href="/" className="flex items-center group" aria-label={brand.name}>
  <Image
    src="/logo/logo-horizontal.svg"
    alt={brand.name}
    width={180}
    height={36}
    priority
    className="h-9 md:h-10 w-auto"
  />
</Link>
```

### A.4.2. Лого в Footer — `src/components/layout/footer.tsx` строки 43–49

Аналогично, но с light-версией для тёмного фона:
```tsx
<Image
  src="/logo/logo-horizontal-light.svg"
  alt={brand.name}
  width={200}
  height={40}
  className="h-10 w-auto"
/>
```

### A.4.3. Favicon и apple-touch — `src/app/layout.tsx`

В `metadata` добавить:
```tsx
icons: {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
  ],
  apple: "/apple-touch-icon.png",
},
```

(Существующий `src/app/favicon.ico` нужно заменить на сгенерированный из лого.)

### A.4.4. OG-картинка — `src/app/layout.tsx → metadata.openGraph`

В существующий блок `openGraph` добавить:
```tsx
images: [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: brand.name,
  },
],
```

И продублировать для Twitter:
```tsx
twitter: {
  card: "summary_large_image",
  title: brand.name,
  description: brand.description,
  images: ["/og-image.png"],
},
```

### A.4.5. Фото команды (на будущее) — `src/components/sections/team.tsx`

Сейчас рендерится `getInitials(name)` в круге. Когда появятся фото, обернуть в условный рендер:
```tsx
{member.photo ? (
  <Image
    src={member.photo}
    alt={member.name}
    width={112}
    height={112}
    className="size-28 mx-auto rounded-full object-cover mb-5"
  />
) : (
  <div aria-hidden className="size-28 mx-auto rounded-full bg-brand-100 ...">
    {getInitials(member.name)}
  </div>
)}
```

В `team.ts` поле `photo` уже опционально (`photo?: string`) — заполнять путями вида `/team/founder.jpg`.

### A.4.6. Фото офиса (на будущее) — `src/components/sections/contact-block.tsx`

Плейсхолдер карты на месте до получения координат Яндекса. Когда появится фото офиса — можно вставить его рядом или вместо плейсхолдера как «офис изнутри».

---

# Часть B. Логотип — концепция и промты

## B.1. Концепция

**Тип:** combination mark (символ + название).

**Символ:** две слегка перекрывающиеся геометрические формы — визуальная метафора партнёрства «бухгалтер + клиент». Одна форма залита тёмно-зелёным (#1A4731), вторая — обведена янтарно-золотой (#F5A623). Простые формы: скруглённые квадраты, круги или арки. Никаких листочков, шестерёнок, глобусов, гроссбухов, монет, рукопожатий — это все клише бухгалтерских лого.

**Название:** «Финансовый партнёр» в `Manrope ExtraBold`, тёмно-зелёный для слова «Финансовый», янтарно-золотой для «партнёр» — подчёркивает суть бренда.

**Композиция:** горизонтальная — символ слева, название справа, минимальный отступ. Должна остаться компактной (не шире 240×40px при отображении в Header).

**Что обязательно избегаем:**
- Любые градиенты, 3D, тени
- Засечки, рукописные шрифты, курсив
- Корпоративная сине-голубая палитра
- Сток-символы (листочки, шестерёнки, монеты)
- Текст в плотной обводке — теряется на маленьких размерах

## B.2. Альтернативные направления символа (план Б)

Если основная концепция (две формы) не «зайдёт» — попробовать в той же стилистике:
- **Монограмма ФП/FP** в круге или квадрате (буквы выровнены так, чтобы стилизованно соединяться)
- **Стилизованная буква П** как мост или крыша — отсылает к слову «партнёр» и «надёжность»
- **Две соединённые арки** (как Mastercard, но не круги, а с угловатыми гранями)
- **Восходящий минималистичный график** — три-четыре строгие линии, без подписей

## B.3. Универсальный промт

Работает в ChatGPT (DALL-E 3), Midjourney, Recraft, Ideogram, FLUX. Текст английский — модели лучше его понимают.

```
Minimalist combination logo for "Финансовый партнёр" (Financial Partner in Russian),
an accounting outsourcing firm.

Symbol: two slightly overlapping rounded geometric shapes representing partnership.
One shape solid dark forest green (#1A4731), the other outlined in warm amber
gold (#F5A623), overlap area shows interaction. Strict geometric construction,
no organic curves, no decorative elements.

Wordmark: "Финансовый партнёр" in Manrope ExtraBold, lowercase Russian text,
tight letter-spacing (-0.02em). Word "Финансовый" in dark green (#1A4731),
word "партнёр" in amber gold (#F5A623).

Layout: horizontal composition, symbol on the left, wordmark on the right,
balanced spacing. Pure white background.

Style: flat 2D vector, no gradients, no shadows, no 3D, no glow, no swooshes,
no leaves, no gears, no coins, no globe, no handshake. Professional, friendly,
modern fintech / financial services brand mark.

Output: clean SVG-style asset, sharp edges, high contrast.
```

## B.4. Варианты под конкретные генераторы

### B.4.1. ChatGPT (DALL-E 3)

Кириллицу DALL-E 3 рисует криво. Используем русский для брифа, но просим сгенерировать **только символ** — wordmark соберём вручную в Figma/Canva.

```
Сгенерируй минималистичный логотип-символ (только знак, без текста) для
бухгалтерской компании. Концепция: две слегка перекрывающиеся скруглённые
геометрические формы как метафора партнёрства. Одна форма залита
тёмно-зелёным #1A4731, вторая обведена янтарно-золотым #F5A623, перекрытие
показывает взаимодействие.

Стиль: плоский 2D векторный, чистые линии, без градиентов, без теней,
без 3D, без декоративных элементов. Строгая геометрия, не органика.
Никаких листочков, шестерёнок, глобусов, рукопожатий, монет.

Фон: чисто белый. Композиция: квадрат, символ по центру с отступами.
Профессиональный, дружелюбный, современный fintech-стиль.
```

После получения символа — собрать с wordmark в Figma:
1. Создать кадр 280×60
2. Слева символ (квадрат 48×48)
3. Справа текст `Финансовый партнёр` шрифтом Manrope ExtraBold 22pt, tracking -0.02em
4. «Финансовый» цвет `#1A4731`, «партнёр» цвет `#F5A623`
5. Экспорт SVG (`File → Export → SVG`)

### B.4.2. Midjourney v6

MJ плохо с кириллицей — генерируем только символ. Промт:

```
minimalist geometric logo symbol, two interlocking rounded rectangles
representing partnership, one solid dark forest green hex 1A4731,
one outlined amber gold hex F5A623, overlapping 30 percent, flat 2D
vector design, no gradients, no shadows, no 3D, clean professional
accounting brand mark, no text, no leaves, no gears, no coins,
white background, centered composition, sharp edges
--ar 1:1 --v 6 --style raw --stylize 100 --no text watermark signature
```

После генерации — собрать combination mark в Figma как в B.4.1.

### B.4.3. Recraft / Ideogram (лучшие для лого с текстом)

Эти генераторы умеют кириллицу и сразу выдают SVG (Recraft).

```
Combination logo for "Финансовый партнёр" accounting firm.

Mark on the left: two interlocking rounded squares, one solid #1A4731
dark green, one outlined in #F5A623 amber gold, overlapping by 30 percent.

Wordmark on the right: "Финансовый партнёр" in Manrope ExtraBold,
lowercase Russian text. "Финансовый" in #1A4731, "партнёр" in #F5A623.
Letter spacing -2%.

Flat vector, no gradients, no 3D, white background, balanced spacing,
horizontal layout. Sharp clean geometric design.
```

В Recraft выбрать стиль **Brand → Logo**. В Ideogram выбрать стиль **Design**.

## B.5. После получения логотипа

1. **Конвертация в SVG** (если генератор отдал PNG):
   - Загрузить PNG в [vectorizer.ai](https://vectorizer.ai) или [vectormagic.com](https://vectormagic.com)
   - Или открыть PNG в Figma и обвести вручную геометрическими формами (символ простой — займёт 20 минут)
2. **Очистка SVG** через [svgomg.net](https://svgomg.net) — выкинуть мусор (XML-комментарии, лишние группы, метаданные), цель: <2KB
3. **Создать варианты:**
   - `logo-horizontal.svg` — основной (символ + название)
   - `logo-horizontal-light.svg` — инверсия: символ обведён `#FAFAF7`, текст `#FAFAF7` для footer (бренд `bg-brand-800`)
   - `logo-mark.svg` — только символ, для favicon
4. **Favicon** — сгенерировать на [realfavicongenerator.net](https://realfavicongenerator.net), загрузить `logo-mark.png` 512×512:
   - На выходе ZIP со всеми форматами (`favicon.ico`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`, manifest)
   - Распаковать в `site/public/`
   - Прежний `site/src/app/favicon.ico` удалить (он перекрывает `public/favicon.ico`)

---

# Часть C. OG-картинка

## C.1. Концепция

1200×630px. На картинке должно быть видно при превью:
- Большой текст с ключевым посылом
- Лого
- Цветовой акцент бренда

## C.2. Структура

```
+--------------------------------------------------+
|                                                  |
|   [лого]                                         |
|                                                  |
|   Бухгалтер для ИП и ООО                         |
|   по всей России — от 2 000 ₽/мес                |
|                                                  |
|   • офис в Екатеринбурге  • ответ за час         |
|                                                  |
|                            [декор-круги]         |
+--------------------------------------------------+
       фон: cream #FAFAF7
       заголовок: Manrope ExtraBold 64pt, #1A4731
       подзаголовок: Inter 28pt, #6B6B70
       пункты: Inter 22pt, #1A4731
       декор: круги brand-100/accent-100 с blur (как в Hero)
```

## C.3. Способы создания

### Самый быстрый (15 мин):
1. Открыть [Canva](https://canva.com), создать дизайн 1200×630
2. Залить фон `#FAFAF7`
3. Вставить лого (полученный в части B)
4. Текст шрифтом Manrope (есть в Canva как Google Font)
5. Скачать как PNG
6. Положить в `site/public/og-image.png`

### Через Figma:
1. Frame 1200×630, fill `#FAFAF7`
2. Текст и декор по схеме выше
3. Export PNG @1x (избегать ретина — соцсети показывают строго 1200×630)

### Промт для AI (если нужен фон/иллюстрация):
Если хочется красивый абстрактный фон вместо просто кремового:
```
Abstract minimalist background, soft geometric shapes, blurred circles
in warm gold #F5A623 at 40% opacity and forest green #1A4731 at 30% opacity,
on cream #FAFAF7 base. Subtle, professional, lots of empty space on the left
side for text overlay. 1200x630 aspect ratio. Flat vector style, no photo
realism, no gradients between colors, just soft blurs.
```

Текст потом наложить в Figma/Canva — AI кириллицу испортит.

## C.4. Динамическая OG (опционально, для разных страниц)

Next.js 16 умеет автогенерировать OG-картинки для каждой страницы через файлы `app/opengraph-image.tsx`. Это полезно когда заголовок страницы должен попасть в картинку (например, для /tarify — «Тарифы и стоимость», для /uslugi/buhgalter-dlya-ip — «Бухгалтер для ИП от 2 000 ₽»).

Но для MVP **достаточно одной статической** `og-image.png` в `public/` — реализовать динамику можно в задаче #12 (SEO).

---

# Файлы, которые будут изменены при внедрении

| Файл | Изменение |
|------|-----------|
| `site/public/*.svg` | Удалить дефолтные Next-SVG (5 файлов) |
| `site/public/logo/` | Создать, положить 3 SVG логотипа |
| `site/public/favicon.ico` + 4 файла | Заменить на сгенерированные из лого |
| `site/public/og-image.png` | Добавить (1200×630) |
| `site/src/app/favicon.ico` | Удалить (перекрывает public/) |
| `site/src/app/layout.tsx` | Добавить `metadata.icons` + `openGraph.images` + `twitter` |
| `site/src/components/layout/header.tsx` | Заменить текстовый лого на `<Image>` |
| `site/src/components/layout/footer.tsx` | Заменить текстовый лого на `<Image>` (light) |
| `site/src/components/sections/team.tsx` | Условный рендер `<Image>` если `photo` задано (на будущее, когда появятся фото) |

---

# Verification (как убедиться что всё работает)

1. **Лого в Header/Footer:** открыть `http://localhost:3000` — увидеть свежий лого вместо текстового «ФП» в шапке и подвале. На моб — размер не больше 40px высоты.
2. **Favicon:** очистить кэш браузера, перезагрузить — иконка в табе обновилась. Проверить на [realfavicongenerator.net/favicon_checker](https://realfavicongenerator.net/favicon_checker).
3. **OG-картинка:** прогнать прод-URL через [opengraph.xyz](https://www.opengraph.xyz) или просто скопировать ссылку в Telegram и посмотреть превью.
4. **Lighthouse:** Performance не должен упасть после картинок — `next/image` оптимизирует автоматически, но убедись что нет огромных PNG (`logo-mark.png` должен быть <30KB, `og-image.png` <250KB).
5. **`npm run build`:** должна пройти без warnings про неоптимизированные изображения. Если есть `<img>` где-то — Next предупредит.

---

# Что НЕ делаем в этом заходе

- Реальная фотосессия команды и офиса — оставлены инициалы по выбору пользователя
- Динамическая OG-картинка через `app/opengraph-image.tsx` — это задача #12 (SEO)
- Замена плейсхолдера карты на Яндекс iframe — нужны реальные координаты офиса
- Хостинг лого на CDN — `public/` отдаётся из Next с правильными кэш-заголовками



Шаг 1 — Сгенерировать логотип

  Открой Recraft (https://recraft.ai) — он лучше всех для лого с русским текстом и сразу выдаёт SVG. Стиль выбери Brand → Logo. Промт:

  Combination logo for "Финансовый партнёр" accounting firm.

  Mark on the left: two interlocking rounded squares, one solid #1A4731
  dark green, one outlined in #F5A623 amber gold, overlapping by 30 percent.

  Wordmark on the right: "Финансовый партнёр" in Manrope ExtraBold,
  lowercase Russian text. "Финансовый" in #1A4731, "партнёр" in #F5A623.
  Letter spacing -2%.

  Flat vector, no gradients, no 3D, white background, balanced spacing,
  horizontal layout. Sharp clean geometric design.

  Если Recraft не зайдёт — попробуй Ideogram (тот же промт) или ChatGPT/DALL-E 3 (промт под него лежит в plan-файле, раздел B.4.1).

  Шаг 2 — Подготовить файлы

  Положи в public/logo/:
  - logo-horizontal.svg — основной
  - logo-horizontal-light.svg — версия для тёмного фона (тот же лого, но текст и обводки в #FAFAF7)
  - logo-mark.svg — только символ

  Если генератор отдал PNG — прогони через https://vectorizer.ai → потом через https://svgomg.net для очистки.

  Шаг 3 — Favicon

  Сделай 512×512 PNG только из символа, загрузи на https://realfavicongenerator.net — он сам соберёт пакет. Распакуй в public/ (там окажутся favicon.ico, favicon-32.png, favicon-16.png, apple-touch-icon.png).

  Старый site/src/app/favicon.ico после этого удали — он перекрывает public/favicon.ico.

  Шаг 4 — OG-картинка

  Открой Canva (https://canva.com), создай дизайн 1200×630, фон #FAFAF7, вставь свой лого + текст «Бухгалтер для ИП и ООО по всей России — от 2 000 ₽/мес» (Manrope ExtraBold 64pt, цвет #1A4731). Скачай PNG → положи как
  public/og-image.png.

  - logo-horizontal.svg — основной
  - logo-horizontal-light.svg — версия для тёмного фона (тот же лого, но текст и обводки в #FAFAF7)
  - logo-mark.svg — только символ

  Если генератор отдал PNG — прогони через https://vectorizer.ai → потом через https://svgomg.net для очистки.

  Шаг 3 — Favicon

  Сделай 512×512 PNG только из символа, загрузи на https://realfavicongenerator.net — он сам соберёт пакет. Распакуй в public/ (там окажутся favicon.ico, favicon-32.png, favicon-16.png, apple-touch-icon.png).

  Старый site/src/app/favicon.ico после этого удали — он перекрывает public/favicon.ico.

  Шаг 4 — OG-картинка

  Открой Canva (https://canva.com), создай дизайн 1200×630, фон #FAFAF7, вставь свой лого + текст «Бухгалтер для ИП и ООО по всей России — от 2 000 ₽/мес» (Manrope ExtraBold 64pt, цвет #1A4731). Скачай PNG → положи как
  public/og-image.png.

  Шаг 5 — Скажи мне

  Когда всё будет в public/ — скажи «логотип готов» или просто «давай внедряй». Я одним коммитом:
  - Заменю текстовый «ФП» на <Image> в Header и Footer
  - Добавлю metadata.icons и openGraph.images в layout.tsx
  Шаг 2 — Подготовить файлы

  Положи в public/logo/:
  - logo-horizontal.svg — основной
  - logo-horizontal-light.svg — версия для тёмного фона (тот же лого, но текст и обводки в #FAFAF7)
  - logo-mark.svg — только символ

  Если генератор отдал PNG — прогони через https://vectorizer.ai → потом через https://svgomg.net для очистки.

  Шаг 3 — Favicon

  Сделай 512×512 PNG только из символа, загрузи на https://realfavicongenerator.net — он сам соберёт пакет. Распакуй в public/ (там окажутся favicon.ico, favicon-32.png, favicon-16.png, apple-touch-icon.png).

  Старый site/src/app/favicon.ico после этого удали — он перекрывает public/favicon.ico.

  Шаг 4 — OG-картинка

  Открой Canva (https://canva.com), создай дизайн 1200×630, фон #FAFAF7, вставь свой лого + текст «Бухгалтер для ИП и ООО по всей России — от 2 000 ₽/мес» (Manrope ExtraBold 64pt, цвет #1A4731). Скачай PNG → положи как
  public/og-image.png.

  Шаг 5 — Скажи мне

  Когда всё будет в public/ — скажи «логотип готов» или просто «давай внедряй». Я одним коммитом:
  - Заменю текстовый «ФП» на <Image> в Header и Footer
  - logo-mark.svg — только символ

  Если генератор отдал PNG — прогони через https://vectorizer.ai → потом через https://svgomg.net для очистки.

  Шаг 3 — Favicon

  Сделай 512×512 PNG только из символа, загрузи на https://realfavicongenerator.net — он сам соберёт пакет. Распакуй в public/ (там окажутся favicon.ico, favicon-32.png, favicon-16.png, apple-touch-icon.png).

  Старый site/src/app/favicon.ico после этого удали — он перекрывает public/favicon.ico.

  Шаг 4 — OG-картинка

  Открой Canva (https://canva.com), создай дизайн 1200×630, фон #FAFAF7, вставь свой лого + текст «Бухгалтер для ИП и ООО по всей России — от 2 000 ₽/мес» (Manrope ExtraBold 64pt, цвет #1A4731). Скачай PNG → положи как
  public/og-image.png.

  Шаг 5 — Скажи мне

  Когда всё будет в public/ — скажи «логотип готов» или просто «давай внедряй». Я одним коммитом:
  - Заменю текстовый «ФП» на <Image> в Header и Footer
  - Добавлю metadata.icons и openGraph.images в layout.tsx
  - Проверю build и Lighthouse

  Полный гайд с промтами под все генераторы и подробные технические нюансы — в plan-файле C:\Users\vlasov\.claude\plans\c-users-vlasov-desktop-financial-partner-wobbly-graham.md.


  Если генератор отдал PNG — прогони через https://vectorizer.ai → потом через https://svgomg.net для очистки.

  Шаг 3 — Favicon

  Сделай 512×512 PNG только из символа, загрузи на https://realfavicongenerator.net — он сам соберёт пакет. Распакуй в public/ (там окажутся favicon.ico, favicon-32.png, favicon-16.png, apple-touch-icon.png).

  Старый site/src/app/favicon.ico после этого удали — он перекрывает public/favicon.ico.

  Шаг 4 — OG-картинка

  Открой Canva (https://canva.com), создай дизайн 1200×630, фон #FAFAF7, вставь свой лого + текст «Бухгалтер для ИП и ООО по всей России — от 2 000 ₽/мес» (Manrope ExtraBold 64pt, цвет #1A4731). Скачай PNG → положи как
  public/og-image.png.

  Шаг 5 — Скажи мне

  Когда всё будет в public/ — скажи «логотип готов» или просто «давай внедряй». Я одним коммитом:
  - Заменю текстовый «ФП» на <Image> в Header и Footer
  - Добавлю metadata.icons и openGraph.images в layout.tsx
  - Проверю build и Lighthouse

  Полный гайд с промтами под все генераторы и подробные технические нюансы — в plan-файле C:\Users\vlasov\.claude\plans\c-users-vlasov-desktop-financial-partner-wobbly-graham.md.

✻ Cogitated for 14m 53s

※ recap: Цель — маркетинговый сайт «Финансовый партнёр»; сейчас нужен логотип и OG-картинка. Следующий шаг: сгенерируй лого в Recraft по промту из плана, положи файлы в site/public/logo/ и скажи «внедряй». (disable recaps in
  - logo-horizontal.svg — основной
  - logo-horizontal-light.svg — версия для тёмного фона (тот же лого, но текст и обводки в #FAFAF7)
  - logo-mark.svg — только символ

  Если генератор отдал PNG — прогони через https://vectorizer.ai → потом через https://svgomg.net для очистки.

  Шаг 3 — Favicon

  Сделай 512×512 PNG только из символа, загрузи на https://realfavicongenerator.net — он сам соберёт пакет. Распакуй в public/ (там окажутся favicon.ico, favicon-32.png, favicon-16.png, apple-touch-icon.png).

  Старый site/src/app/favicon.ico после этого удали — он перекрывает public/favicon.ico.

  Шаг 4 — OG-картинка

  Открой Canva (https://canva.com), создай дизайн 1200×630, фон #FAFAF7, вставь свой лого + текст «Бухгалтер для ИП и ООО по всей России — от 2 000 ₽/мес» (Manrope ExtraBold 64pt, цвет #1A4731). Скачай PNG → положи как
  public/og-image.png.

  Шаг 5 — Скажи мне

  Когда всё будет в public/ — скажи «логотип готов» или просто «давай внедряй». Я одним коммитом:
  - Заменю текстовый «ФП» на <Image> в Header и Footer
  - Добавлю metadata.icons и openGraph.images в layout.tsx
  - Проверю build и Lighthouse
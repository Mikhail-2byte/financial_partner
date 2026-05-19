import { Container, Section } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  return (
    <Section id="otzyvy" className="bg-cream border-t border-line scroll-mt-24">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Что говорят клиенты
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Короткие отзывы тех, кто работает с нами больше года.
            Полные истории — в разделе «Кейсы».
          </p>
        </div>

        <ul className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.slug}
              className="relative h-full flex flex-col p-8 rounded-2xl bg-white border border-line"
            >
              <span
                aria-hidden
                className="font-display text-7xl text-accent-400 leading-none mb-2 -mt-2"
              >
                &ldquo;
              </span>
              <blockquote className="text-ink leading-relaxed mb-6 flex-1">
                {t.quote}
              </blockquote>
              <div className="pt-5 border-t border-line flex items-center gap-4">
                <ImagePlaceholder
                  ratio="square"
                  shape="circle"
                  size="sm"
                  label={`Фото: ${t.author}`}
                  className="size-14 shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-display font-bold text-base truncate">
                    {t.author}
                  </div>
                  <div className="text-sm text-muted">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

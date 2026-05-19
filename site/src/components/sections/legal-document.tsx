import { Container, Section } from "@/components/ui/container";
import type { LegalDocument } from "@/content/legal";

export function LegalDocumentSection({ doc }: { doc: LegalDocument }) {
  return (
    <Section className="bg-cream border-t border-line">
      <Container>
        <article className="max-w-3xl mx-auto">
          <p className="text-lg text-ink leading-relaxed mb-12 pb-8 border-b border-line">
            {doc.intro}
          </p>

          <div className="flex flex-col gap-12">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display font-bold text-xl md:text-2xl mb-5">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {section.blocks.map((block, index) => {
                    if (block.type === "paragraph") {
                      return (
                        <p
                          key={index}
                          className="text-ink leading-relaxed"
                        >
                          {block.text}
                        </p>
                      );
                    }
                    return (
                      <ul
                        key={index}
                        className="flex flex-col gap-2 pl-1"
                      >
                        {block.items?.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-ink leading-relaxed"
                          >
                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-700" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-line text-sm text-muted">
            Редакция от {doc.updatedAt}
          </div>
        </article>
      </Container>
    </Section>
  );
}

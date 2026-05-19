import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/container";
import { faqItems } from "@/content/faq";

export function FaqSection() {
  return (
    <Section className="bg-cream border-t border-line">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 md:mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Частые вопросы
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Если ответа на ваш вопрос нет — напишите в Telegram,
              отвечаем в течение часа в рабочее время.
            </p>
          </div>

          <Accordion type="single" collapsible className="border-t border-line">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
}

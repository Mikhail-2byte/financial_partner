import Link from "next/link";
import { ArrowDown, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";

export function TariffsPageHero() {
  return (
    <Section className="relative overflow-hidden pt-12 md:pt-20 pb-10 md:pb-12">
      <div
        aria-hidden
        className="absolute -top-32 -right-40 size-96 rounded-full bg-accent-100/50 blur-3xl"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          <Badge variant="brand" className="mb-6">
            Тарифы
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Прозрачные цены без сюрпризов
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mb-10">
            Три фиксированных пакета на все случаи: от самозанятого
            до ООО на ОСНО. Доплаты — только за реальную специфику
            бизнеса, и все они описаны открытым прайсом.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="primary" asChild>
              <Link href="#packages">
                Смотреть пакеты
                <ArrowDown className="size-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#calculator">
                <Calculator className="size-5" />
                Калькулятор
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

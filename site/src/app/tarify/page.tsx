import type { Metadata } from "next";
import { TariffsPageHero } from "@/components/sections/tariffs-page-hero";
import { PricingSection } from "@/components/sections/pricing";
import { CalculatorSection } from "@/components/sections/calculator";
import { OneOffServicesSection } from "@/components/sections/one-off-services";
import { IncludesGuaranteesSection } from "@/components/sections/includes-guarantees";
import { LeadFormSection } from "@/components/sections/lead-form";

export const metadata: Metadata = {
  title: "Тарифы и стоимость бухгалтерского обслуживания",
  description:
    "Три прозрачных пакета для ИП и ООО — от 2 000 ₽/мес. Калькулятор стоимости, разовые услуги и гарантии, которые входят в любой тариф.",
};

export default function TariffsPage() {
  return (
    <>
      <TariffsPageHero />
      <PricingSection />
      <CalculatorSection />
      <OneOffServicesSection />
      <IncludesGuaranteesSection />
      <LeadFormSection />
    </>
  );
}

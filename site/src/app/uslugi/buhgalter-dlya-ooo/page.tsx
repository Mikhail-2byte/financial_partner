import type { Metadata } from "next";
import {
  LandingFaqSection,
  LandingHeroSection,
  LandingPriceHookSection,
  LandingSuitsSection,
  LandingWhatsIncludedSection,
} from "@/components/sections/landing";
import { LeadFormSection } from "@/components/sections/lead-form";
import { landings } from "@/content/landings";

const page = landings["buhgalter-dlya-ooo"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function BuhgalterDlyaOooPage() {
  return (
    <>
      <LandingHeroSection hero={page.hero} />
      <LandingSuitsSection block={page.suitsBlock} />
      <LandingWhatsIncludedSection {...page.whatsIncluded} />
      <LandingPriceHookSection priceHook={page.priceHook} />
      <LandingFaqSection items={page.faq} />
      <LeadFormSection />
    </>
  );
}

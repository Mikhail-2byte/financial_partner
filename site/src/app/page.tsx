import { HeroSection } from "@/components/sections/hero";
import { AdvantagesSection } from "@/components/sections/advantages";
import { AudiencesSection } from "@/components/sections/audiences";
import { ServicesSection } from "@/components/sections/services";
import { PricingSection } from "@/components/sections/pricing";
import { ProcessSection } from "@/components/sections/process";
import { StatsSection } from "@/components/sections/stats";
import { TeamSection } from "@/components/sections/team";
import { CasesSection } from "@/components/sections/cases";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { LeadFormSection } from "@/components/sections/lead-form";
import { ContactBlockSection } from "@/components/sections/contact-block";
import { FaqSection } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AdvantagesSection />
      <AudiencesSection />
      <ServicesSection />
      <PricingSection />
      <ProcessSection />
      <StatsSection />
      <TeamSection />
      <CasesSection />
      <TestimonialsSection />
      <LeadFormSection />
      <ContactBlockSection />
      <FaqSection />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ContactBlockSection } from "@/components/sections/contact-block";
import { LegalDetailsSection } from "@/components/sections/legal-details";
import { LeadFormSection } from "@/components/sections/lead-form";

export const metadata: Metadata = {
  title: "Контакты — офис в Екатеринбурге, работаем по всей России",
  description:
    "Адрес офиса, телефон, email и мессенджеры для связи с командой «Финансового партнёра». Реквизиты для договоров и оплат.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Как с нами связаться"
        subtitle="Приезжайте в офис в Екатеринбурге или пишите в мессенджер — отвечаем в течение часа в рабочее время."
      />
      <ContactBlockSection />
      <LegalDetailsSection />
      <LeadFormSection />
    </>
  );
}

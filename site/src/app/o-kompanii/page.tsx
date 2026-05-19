import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { AboutStorySection } from "@/components/sections/about-story";
import { StatsSection } from "@/components/sections/stats";
import { TeamSection } from "@/components/sections/team";
import { ProcessSection } from "@/components/sections/process";
import { LeadFormSection } from "@/components/sections/lead-form";
import { aboutStory } from "@/content/about";

export const metadata: Metadata = {
  title: "О компании — Финансовый партнёр",
  description:
    "Бухгалтерская компания из Екатеринбурга. Работаем с малым и средним бизнесом по всей России. Команда из 12 специалистов с опытом 5+ лет.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutStory.eyebrow}
        title="Команда, которая разговаривает с вами лично"
        subtitle="Небольшая бухгалтерская компания из Екатеринбурга. Работаем с малым и средним бизнесом по всей России, и сознательно остаёмся компактными — чтобы каждому клиенту хватало внимания."
      />
      <AboutStorySection />
      <StatsSection />
      <TeamSection />
      <ProcessSection />
      <LeadFormSection />
    </>
  );
}

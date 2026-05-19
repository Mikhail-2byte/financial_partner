import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { LegalDocumentSection } from "@/components/sections/legal-document";
import { legalDocuments } from "@/content/legal";

const doc = legalDocuments.policy;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
};

export default function PolicyPage() {
  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} />
      <LegalDocumentSection doc={doc} />
    </>
  );
}

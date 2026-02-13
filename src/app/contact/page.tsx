import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milemendContent } from "@/content/milemend";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Milemend to discuss street maintenance workflows, platform demos, and implementation options.",
};

export default function ContactPage() {
  const { contactPage } = milemendContent;

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow={contactPage.hero.eyebrow}
          title={contactPage.hero.title}
          description={contactPage.hero.description}
          titleAs="h1"
        />
        <ContactForm />
      </Container>
    </section>
  );
}

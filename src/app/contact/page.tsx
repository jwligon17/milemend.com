import type { Metadata } from "next";

import { PageTitle } from "@/components/PageTitle";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Milemend to discuss street maintenance workflows, platform demos, and implementation options.",
};

export default function ContactPage() {
  return (
    <section className="pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-12 lg:pb-16">
      <Container className="max-w-5xl">
        <header className="mx-auto max-w-[960px] text-center">
          <PageTitle as="h1" variant="default">
            Let&apos;s Chat.
          </PageTitle>
          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:text-xl">
            If you&apos;d like more information about our <strong className="font-bold">Pilot Program</strong>{" "}
            (while available) or general information about onboarding, please fill out the information below.
          </p>
        </header>
        <div className="mx-auto w-full md:max-w-3xl">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

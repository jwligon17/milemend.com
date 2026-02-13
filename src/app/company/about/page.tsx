import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milemendContent } from "@/content/milemend";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Milemend mission, values, implementation approach, and why we focus on public works operations.",
};

export default function AboutPage() {
  const { companyAboutPage } = milemendContent;

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow={companyAboutPage.hero.eyebrow}
          title={companyAboutPage.hero.title}
          description={companyAboutPage.hero.description}
          titleAs="h1"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold text-slate-900">{companyAboutPage.mission.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{companyAboutPage.mission.body}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold text-slate-900">{companyAboutPage.whyMileMend.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{companyAboutPage.whyMileMend.body}</p>
          </Card>
        </div>

        <div className="mt-10">
          <SectionHeading title={companyAboutPage.values.title} />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {companyAboutPage.values.items.map((value) => (
              <Card key={value.title}>
                <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10" id="careers">
          <SectionHeading title={companyAboutPage.howItWorks.title} />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {companyAboutPage.howItWorks.steps.map((step) => (
              <Card key={step.title}>
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milemendContent } from "@/content/milemend";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Explore Milemend core capabilities, integrations, and security controls for public works operations.",
};

export default function PlatformPage() {
  const { platformPage, homePage } = milemendContent;

  return (
    <>
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow={platformPage.overview.eyebrow}
            title={platformPage.overview.title}
            description={platformPage.overview.description}
            titleAs="h1"
          />
        </Container>
      </section>

      <section className="border-y border-slate-200/80 bg-white py-16" id="capabilities">
        <Container>
          <SectionHeading title={platformPage.modules.title} description={platformPage.modules.description} />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {homePage.coreCapabilities.cards.map((card) => (
              <Card key={card.title}>
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{card.description}</p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">{homePage.coreCapabilities.roadmapNote}</p>
        </Container>
      </section>

      <section className="py-16" id="integrations">
        <Container>
          <SectionHeading
            title={platformPage.integrationsTeaser.title}
            description={platformPage.integrationsTeaser.description}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {platformPage.integrationsTeaser.links.map((link) => (
              <Card key={link.label}>
                <h3 className="text-lg font-bold text-slate-900">{link.label}</h3>
                <p className="mt-2 text-sm text-slate-600">{link.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/80 bg-slate-950 py-16 text-white" id="security">
        <Container>
          <SectionHeading
            title={platformPage.securityTeaser.title}
            description={platformPage.securityTeaser.description}
            className="[&_*]:text-inherit [&_p]:text-slate-300"
          />
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {platformPage.securityTeaser.bullets.map((item) => (
              <li key={item} className="rounded-xl border border-white/20 bg-white/5 p-4 text-sm text-slate-100">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

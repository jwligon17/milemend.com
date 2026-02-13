import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MilemendContent } from "@/content/milemend";

type CoreCapabilitiesSectionProps = {
  coreCapabilities: MilemendContent["homePage"]["coreCapabilities"];
};

export function CoreCapabilitiesSection({ coreCapabilities }: CoreCapabilitiesSectionProps) {
  return (
    <section className="border-y border-slate-200/70 bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={coreCapabilities.eyebrow}
          title={coreCapabilities.title}
          description={coreCapabilities.description}
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {coreCapabilities.cards.map((card) => (
            <Card
              key={card.title}
              className="border-slate-200/80 bg-white shadow-sm transition-none hover:translate-y-0 hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">{coreCapabilities.roadmapNote}</p>
      </Container>
    </section>
  );
}

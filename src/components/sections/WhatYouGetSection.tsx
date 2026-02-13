import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MilemendContent } from "@/content/milemend";

type WhatYouGetSectionProps = {
  whatYouGet: MilemendContent["homePage"]["whatYouGet"];
};

export function WhatYouGetSection({ whatYouGet }: WhatYouGetSectionProps) {
  return (
    <section className="bg-gradient-to-b from-emerald-50 via-amber-50 to-rose-50 py-16 sm:py-20">
      <Container>
        <SectionHeading title={whatYouGet.title} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {whatYouGet.items.map((item) => (
            <Card
              key={item.title}
              className="border-slate-200/80 bg-white/90 shadow-sm transition-none hover:translate-y-0 hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
              {item.description ? (
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.description}</p>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

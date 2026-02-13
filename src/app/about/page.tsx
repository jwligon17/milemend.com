import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "About Milemend mission, values, and product focus.",
};

export default function AboutPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="About Milemend"
          description="Milemend is focused on practical software for infrastructure and operations teams."
          titleAs="h1"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold text-slate-900">Mission</h2>
            <p className="mt-3 text-sm text-slate-600">
              Build useful tools that help teams plan work clearly, coordinate responsibilities, and communicate progress.
            </p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold text-slate-900">Values</h2>
            <p className="mt-3 text-sm text-slate-600">
              Clarity, accountability, and steady iteration guide how the product and customer workflows evolve.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              The team emphasizes practical delivery, transparent communication, and long-term reliability.
            </p>
          </Card>
        </div>

        <div className="mt-10">
          <Card>
            <h2 className="text-xl font-semibold text-slate-900">Our story</h2>
            <p className="mt-3 text-sm text-slate-600">
              Milemend started from a simple need: reduce friction between incoming requests, field execution, and reporting.
              The team continues to refine the product with implementation feedback and practical constraints in mind.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Additional company milestones and timeline details are published as they are finalized.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

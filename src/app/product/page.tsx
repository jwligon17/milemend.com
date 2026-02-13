import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Product",
  description: "Overview of the Milemend product and implementation approach.",
};

export default function ProductPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Product"
          title="Milemend Product"
          description="A practical overview of how teams can evaluate and adopt Milemend."
          titleAs="h1"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card>
            <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
            <p className="mt-2 text-sm text-slate-600">
              Milemend provides workflow components for planning, tracking, and reporting maintenance activities.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Scope details are tailored during evaluation based on team workflows and implementation priorities.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
            <p className="mt-2 text-sm text-slate-600">
              Teams configure intake, triage, field updates, and reporting views based on local process needs.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Implementation follows a phased rollout with configuration, onboarding, and operating review checkpoints.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-slate-900">What you get</h2>
            <p className="mt-2 text-sm text-slate-600">
              Shared visibility across stakeholders, structured records, and export-ready reporting outputs.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Feature details are documented for each deployment during implementation planning.
            </p>
          </Card>
        </div>

        <div className="mt-10">
          <Button href="/contact" variant="ink" size="md">
            Request a demo
          </Button>
        </div>
      </Container>
    </section>
  );
}

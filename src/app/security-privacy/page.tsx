import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Security & Privacy",
  description: "Security and privacy overview for Milemend.",
};

export default function SecurityPrivacyPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Security"
          title="Security & Privacy"
          description="This page outlines current security and privacy practices at a high level."
          titleAs="h1"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold text-slate-900">Data handling</h2>
            <p className="mt-2 text-sm text-slate-600">
              Data flows and retention are designed to support operational use while limiting unnecessary exposure.
            </p>
            <p className="mt-2 text-sm text-slate-500">Detailed policy documents are available during security review.</p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-slate-900">Access controls</h2>
            <p className="mt-2 text-sm text-slate-600">
              Role-based access patterns are used to align account permissions with job responsibilities.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Authentication and account lifecycle controls are shared as part of implementation planning.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-slate-900">Hosting</h2>
            <p className="mt-2 text-sm text-slate-600">
              Hosting is selected to balance reliability, operational visibility, and maintainability.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Environment and backup practices are reviewed with each customer deployment.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-slate-900">Support</h2>
            <p className="mt-2 text-sm text-slate-600">
              Support workflows cover issue intake, triage, and follow-up communication.
            </p>
            <p className="mt-2 text-sm text-slate-500">Support channels and escalation paths are defined at onboarding.</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

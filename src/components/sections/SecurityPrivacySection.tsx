import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export function SecurityPrivacySection() {
  return (
    <section className="py-14 md:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">SECURITY</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Security &amp; Privacy</h1>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            This page outlines current security and privacy practices at a high level.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:gap-8">
          <Card className="rounded-2xl border-slate-200 p-7 shadow-sm ring-1 ring-slate-200/70 hover:translate-y-0 hover:shadow-sm lg:p-8">
            <h2 className="text-lg font-bold text-slate-900">Data handling</h2>
            <div className="mt-3 space-y-4 text-sm leading-7 text-slate-600">
              <p>Data flows and retention are designed to support operational use while limiting unnecessary exposure.</p>
              <p>Detailed policy documents are available during security review.</p>
            </div>
          </Card>
          <Card className="rounded-2xl border-slate-200 p-7 shadow-sm ring-1 ring-slate-200/70 hover:translate-y-0 hover:shadow-sm lg:p-8">
            <h2 className="text-lg font-bold text-slate-900">Access controls</h2>
            <div className="mt-3 space-y-4 text-sm leading-7 text-slate-600">
              <p>Role-based access patterns are used to align account permissions with job responsibilities.</p>
              <p>Authentication and account lifecycle controls are shared as part of implementation planning.</p>
            </div>
          </Card>
          <Card className="rounded-2xl border-slate-200 p-7 shadow-sm ring-1 ring-slate-200/70 hover:translate-y-0 hover:shadow-sm lg:p-8">
            <h2 className="text-lg font-bold text-slate-900">Hosting</h2>
            <div className="mt-3 space-y-4 text-sm leading-7 text-slate-600">
              <p>Hosting is selected to balance reliability, operational visibility, and maintainability.</p>
              <p>Environment and backup practices are reviewed with each customer deployment.</p>
            </div>
          </Card>
          <Card className="rounded-2xl border-slate-200 p-7 shadow-sm ring-1 ring-slate-200/70 hover:translate-y-0 hover:shadow-sm lg:p-8">
            <h2 className="text-lg font-bold text-slate-900">Support</h2>
            <div className="mt-3 space-y-4 text-sm leading-7 text-slate-600">
              <p>Support workflows cover issue intake, triage, and follow-up communication.</p>
              <p>Support channels and escalation paths are defined at onboarding.</p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

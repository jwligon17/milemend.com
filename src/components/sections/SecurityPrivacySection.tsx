import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function SecurityPrivacySection() {
  return (
    <section className="overflow-x-hidden lg:overflow-visible py-10 sm:py-12 lg:py-20">
      <Container className="overflow-x-hidden lg:overflow-visible">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="page-title text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text">
            Compliance Centered
          </h1>
          <p className="mx-auto mt-3 max-w-4xl text-base leading-7 text-slate-600 md:text-lg">
            There is no workaround for security and privacy compliance.{" "}
            <span className="lg:whitespace-nowrap">Defensible data starts here.</span>
          </p>
        </div>

        <div className="complianceBox relative z-0 mx-auto mt-6 w-full overflow-visible px-4 pt-6 pb-8 sm:mt-8 sm:px-6 sm:pt-8 sm:pb-10 md:px-8 md:pt-10 md:pb-12 lg:mt-3 lg:px-10">
          <div className="pointer-events-none absolute left-0 top-0 z-0 h-[2px] w-full bg-[linear-gradient(90deg,#ff674d_0%,#ff674d_52%,rgba(255,103,77,0.42)_74%,transparent_100%)]" />
          <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-[2px] bg-gradient-to-b from-[#ff382e] to-transparent" />

          <div className="relative z-10 flex flex-col space-y-12">
            <div className="space-y-3">
              <h3 className="m-0 text-lg font-bold leading-tight text-slate-900">Data Handling</h3>
              <p className="m-0 text-sm leading-normal text-slate-600">
                Data flows and retention are designed to support operational use while limiting unnecessary exposure and
                liability.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="m-0 text-lg font-bold leading-tight text-slate-900">Access Controls</h3>
              <p className="m-0 text-sm leading-normal text-slate-600">
                Role-based access patterns are used to align account permissions with job responsibilities.
                Authentication and account lifecycle controls are shared as a part of implementation planning.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="m-0 text-lg font-bold leading-tight text-slate-900">Hosting</h3>
              <p className="m-0 text-sm leading-normal text-slate-600">
                Hosting is selected to balance reliability, operational visibility, and maintainability. Environment and
                backup practices are reviewed with each customer deployment.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="m-0 text-lg font-bold leading-tight text-slate-900">Support</h3>
              <p className="m-0 text-sm leading-normal text-slate-600">
                Support workflows cover issue intake, triage, and follow-up communication. Support channels and escalation
                paths are defined at onboarding.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-20 mt-10 flex justify-center overflow-visible sm:mt-12 lg:mt-16">
          <Button href="/contact" size="lg" variant="ink" className="bg-black hover:bg-black">
            Request a demo
          </Button>
        </div>
      </Container>
    </section>
  );
}

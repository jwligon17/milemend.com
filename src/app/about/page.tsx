import type { Metadata } from "next";
import Image from "next/image";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
  description: "About Milemend mission, values, and product focus.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-[calc(100svh-64px)] flex-col">
      <section className="flex flex-1 items-center bg-white py-6 sm:py-8">
        <Container>
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
            <p className="inline-flex max-w-full items-center justify-center gap-2 whitespace-nowrap px-2 text-sm sm:text-base">
              <span className="whitespace-nowrap font-medium text-slate-400">Incubated at</span>
              <span className="inline-flex items-center">
                <Image
                  src="/rice.png"
                  alt="Rice University"
                  width={140}
                  height={24}
                  className="w-auto shrink-0"
                  style={{ height: "3.8em", width: "auto" }}
                />
              </span>
            </p>

            <PageTitle
              as="h1"
              variant="default"
              className="mt-4 max-w-[1200px] overflow-visible pb-[0.12em] sm:mt-5"
            >
              <span className="block md:whitespace-nowrap">Turn Road Liability into Actionable</span>
              <span className="block">Intelligence.</span>
            </PageTitle>

            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              Our Mission is for Milemend to bridge the gap between raw data and repair crews. To give municipalities
              the defensible insights needed to prioritize high-risk defects, justify maintenance budgets, and protect
              your community from liability with near-term and long-term financial considerations.
            </p>

            <div className="mt-6 flex w-full justify-center px-2 sm:mt-7">
              <Button
                href="/contact"
                variant="primary"
                className="h-14 w-full max-w-md rounded-2xl bg-black px-8 text-base font-semibold text-white hover:bg-zinc-800 sm:w-auto"
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative w-full flex-none overflow-hidden border-t-[6px] border-[#0A2A78] bg-[#041B4D] py-10 sm:py-12 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,87,195,0.38)_0%,rgba(10,42,120,0.2)_38%,rgba(4,27,77,0)_72%)]"
        />
        <Container>
          <div className="relative mx-auto max-w-[900px] text-center">
            <h2 className="mx-auto mb-6 text-[clamp(40px,4.2vw,72px)] font-bold leading-[1.05] tracking-tight text-white">
              Built on Business Strategy, Not Just Code.
            </h2>
            <p className="mx-auto max-w-[960px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              The Milemend framework was developed and rigorously stress-tested through the Rice University MBA
              program. We didn&apos;t just build an app; we built a <strong>financial and operational model</strong>{" "}
              designed specifically for the long-term budgetary success of U.S. municipalities.
            </p>
          </div>
        </Container>
      </section>

      <section id="million-miles" className="w-full bg-white py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-slate-900">
            <span className="text-gradient-dark">A Million Miles, Daily.</span>
          </h2>

          <div className="mt-8 md:mt-10 grid items-center gap-10 md:gap-12 md:grid-cols-2">
            <div className="max-w-[520px] space-y-6 text-lg leading-relaxed text-slate-800">
              <p>
                Our Goal is for a Network-wide visibility that never sleeps. Our high-frequency scanning model
                eliminates data decay, ensuring your liability risk assessments and maintenance decisions are based on
                today&apos;s reality, not last year&apos;s survey.
              </p>
              <p>
                Volume creates precision. By aggregating millions of data points every 24 hours, Milemend filters out
                noise to deliver the most accurate, validated, and defensible road condition ratings in the industry.
              </p>
            </div>

            <div className="w-full justify-self-center md:justify-self-end">
              {/* TODO: Add /public/about-million-miles.png asset. */}
              <Image
                src="/about-million-miles.png"
                alt="A Million Miles Daily"
                width={700}
                height={506}
                className="w-full h-auto max-w-[460px] md:max-w-[500px] rounded-2xl object-cover md:ml-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

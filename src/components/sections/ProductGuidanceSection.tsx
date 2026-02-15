import Image from "next/image";

import { Container } from "@/components/ui/Container";

export function ProductGuidanceSection() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-start lg:gap-20">
          <div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              <span className="block">Guidance where</span>
              <span className="block">you need it</span>
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Overview</h3>
                <p className="mt-2 text-base text-slate-600">
                  Our data collection process gets timely information that your municipality can use to make the right
                  decision at the right time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900">How it works</h3>
                <p className="mt-2 text-base text-slate-600">
                  Our team believes the best decisions are derived from a few characteristics of data: density,
                  quality, and timeliness.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900">What you get</h3>
                <p className="mt-2 text-base text-slate-600">
                  Our system is designed to give your municipality access to the data you need in a constituent
                  supportive, and action defensible process.
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full lg:min-h-[40rem] lg:justify-self-end lg:-mt-10">
            <div className="flex justify-center lg:absolute lg:right-[-24rem] lg:top-1/2 lg:w-[67.2rem] lg:max-w-none lg:-translate-y-1/2 lg:justify-end">
              <Image
                src="/productlaptop.png"
                alt="MileMend dashboard on a laptop"
                width={1600}
                height={1000}
                className="h-auto w-[min(900px,92vw)] max-w-none object-contain drop-shadow-[0_24px_40px_rgba(15,23,42,0.18)] lg:w-full"
                sizes="(min-width: 1024px) 65vw, 100vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

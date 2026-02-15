import type { Metadata } from "next";
import Image from "next/image";

import { EKGLine } from "@/components/ekg/EKGLine";
import { ProductGuidanceSection } from "@/components/sections/ProductGuidanceSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Product",
  description: "Overview of the Milemend product and implementation approach.",
};

export default function ProductPage() {
  return (
    <section className="py-16">
      <Container>
        <header className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, #0B0F19 0%, #6B7280 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Road Health Matters
            </span>
          </h1>
          <p className="mt-3 text-pretty text-base text-slate-600">
            Our data collection process gets timely information that your municipality can use to make the right
            decision at the right time.
          </p>
        </header>
      </Container>

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-x-hidden">
        <EKGLine />
      </div>

      <Container>
        <div className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <div className="grid items-center gap-y-12 md:grid-cols-2 md:gap-x-16 lg:gap-x-20">
              <div className="flex justify-center md:justify-end w-[220px] sm:w-[240px] md:w-[280px] lg:w-[300px]">
                <Image
                  src="/productphone.png"
                  alt="Milemend product interface on mobile"
                  width={520}
                  height={940}
                  className="w-full h-auto object-contain"
                  sizes="(min-width: 1024px) 300px, (min-width: 768px) 280px, 240px"
                  priority
                />
              </div>
              <div className="w-full text-right md:justify-self-end">
                <div className="ml-auto max-w-[640px]">
                  <h2 className="font-bold tracking-tight leading-[1.05] text-5xl md:text-6xl lg:text-6xl text-black">
                    Better Data,<br className="hidden md:block" /> Better Decisions
                  </h2>
                  <div className="ml-auto mt-8 max-w-[560px] space-y-6 text-base md:text-lg text-slate-600">
                    <p>Our team believes the best decisions are derived from a few characteristics of data.</p>
                    <p className="font-semibold text-slate-800">Density, quality, and timeliness.</p>
                    <p>
                      Our system is designed to give your municipality access to the data you need in a constituent
                      supportive, and action defensible process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Button href="/contact" variant="ink" size="md">
            Request a demo
          </Button>
        </div>
      </Container>

      <ProductGuidanceSection />
    </section>
  );
}

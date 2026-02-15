import Image from "next/image";

import { Container } from "@/components/ui/Container";
import type { MilemendContent } from "@/content/milemend";

type WhatYouGetSectionProps = {
  whatYouGet: MilemendContent["homePage"]["whatYouGet"];
};

export function WhatYouGetSection({ whatYouGet }: WhatYouGetSectionProps) {
  return (
    <section className="relative overflow-hidden border-b-0 ring-0 shadow-none bg-gradient-to-b from-emerald-50 via-amber-50 to-rose-50 pt-6 pb-0 sm:pt-8 lg:pt-10">
      <Container>
        <header className="mx-auto mb-3 max-w-4xl text-center sm:mb-4 lg:mb-4">
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, #0B0F19 0%, #6B7280 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {whatYouGet.title}
            </span>
          </h2>
          <p className="mt-2 text-lg leading-7 text-slate-600 sm:mt-3 sm:text-xl sm:leading-8">
            The essentials: visibility, prioritization, and outputs you can share
          </p>
        </header>
      </Container>
      <div className="mt-0 mb-0 pb-0">
        <Image
          src="/laptop.png"
          alt="Milemend product on a laptop"
          width={1100}
          height={618}
          className="mx-auto mb-0 block h-auto w-full max-w-[1100px]"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-2px] z-30 h-32 bg-gradient-to-b from-slate-50/0 via-slate-50/60 to-slate-50 sm:h-40 lg:h-48"
        aria-hidden="true"
      />
    </section>
  );
}

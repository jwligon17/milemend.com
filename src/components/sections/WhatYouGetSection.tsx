import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MilemendContent } from "@/content/milemend";

type WhatYouGetSectionProps = {
  whatYouGet: MilemendContent["homePage"]["whatYouGet"];
};

export function WhatYouGetSection({ whatYouGet }: WhatYouGetSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-amber-50 to-rose-50 pt-12 pb-0 sm:pt-16">
      <Container>
        <SectionHeading title={whatYouGet.title} />
      </Container>
      <div className="mt-6 mb-0 pb-0 sm:mt-8">
        <Image
          src="/laptop.png"
          alt="Milemend product on a laptop"
          width={1100}
          height={618}
          className="mx-auto mb-0 block h-auto w-full max-w-[1100px]"
        />
      </div>
    </section>
  );
}

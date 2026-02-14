import type { Metadata } from "next";

import { CoreCapabilitiesSection } from "@/components/sections/CoreCapabilitiesSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatYouGetSection } from "@/components/sections/WhatYouGetSection";
import { milemendContent } from "@/content/milemend";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Milemend is a street maintenance operations platform for public works teams managing intake, dispatch, and performance reporting.",
};

export default function Home() {
  const { homePage } = milemendContent;

  return (
    <>
      <HeroSection hero={homePage.hero} />
      <WhatYouGetSection whatYouGet={homePage.whatYouGet} />
      <CoreCapabilitiesSection coreCapabilities={homePage.coreCapabilities} />
      <FinalCtaSection finalCta={homePage.finalCTA} />
    </>
  );
}

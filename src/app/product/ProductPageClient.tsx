"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { EKGMonitor, type EKGMonitorHandle } from "@/components/ekg/EKGMonitor";
import { ProductGuidanceSection } from "@/components/sections/ProductGuidanceSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function intensityFromWheel(event: WheelEvent) {
  const magnitude = Math.abs(event.deltaY) + Math.abs(event.deltaX) * 0.5;
  return clamp(0.75 + magnitude / 320, 0.6, 1.5);
}

export default function ProductPageClient() {
  const ekgRef = useRef<EKGMonitorHandle | null>(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTsRef = useRef(0);
  const lastTouchTsRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    lastScrollTsRef.current = performance.now();

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" && performance.now() - lastTouchTsRef.current < 450) {
        return;
      }
      ekgRef.current?.triggerSpike(1);
    };

    const onTouchStart = () => {
      lastTouchTsRef.current = performance.now();
      ekgRef.current?.triggerSpike(1);
    };

    const onWheel = (event: WheelEvent) => {
      ekgRef.current?.triggerSpike(intensityFromWheel(event));
    };

    const onScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollYRef.current);
      const elapsed = Math.max(16, now - lastScrollTsRef.current);
      const velocity = delta / elapsed;
      const intensity = clamp(0.72 + velocity * 2.8, 0.6, 1.5);

      ekgRef.current?.triggerSpike(intensity);
      lastScrollYRef.current = currentY;
      lastScrollTsRef.current = now;
    };

    const options: AddEventListenerOptions = { passive: true, capture: true };

    window.addEventListener("pointerdown", onPointerDown, options);
    window.addEventListener("touchstart", onTouchStart, options);
    window.addEventListener("wheel", onWheel, options);
    window.addEventListener("scroll", onScroll, options);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown, options);
      window.removeEventListener("touchstart", onTouchStart, options);
      window.removeEventListener("wheel", onWheel, options);
      window.removeEventListener("scroll", onScroll, options);
    };
  }, []);

  return (
    <section className="pt-16">
      <Container>
        <header className="max-w-3xl">
          <h1 className="section-h1">
            Road Health Matters
          </h1>
          <p className="mt-3 text-pretty text-base text-slate-600">
            Our data collection process gets timely information that your municipality can use to make the right
            decision at the right time.
          </p>
        </header>
      </Container>

      <div className="pointer-events-none relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-x-hidden">
        <EKGMonitor ref={ekgRef} className="pointer-events-none" height={152} />
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
                  <h2 className="section-h1">
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

      </Container>

      <ProductGuidanceSection />

      <Container>
        <div className="py-10 flex justify-center sm:py-12">
          <Button href="/contact" variant="ink" size="md" className="w-full sm:w-auto">
            Request a demo
          </Button>
        </div>
      </Container>
    </section>
  );
}

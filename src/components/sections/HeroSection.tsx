"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { MilemendContent } from "@/content/milemend";

type HeroSectionProps = {
  hero: MilemendContent["homePage"]["hero"];
};

export function HeroSection({ hero }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mpciWrapRef = useRef<HTMLDivElement | null>(null);
  const tableWrapRef = useRef<HTMLDivElement | null>(null);

  const heroImageSrc = hero.image?.src ?? "/hero-laptop.svg";
  const heroImageAlt = hero.image?.alt ?? hero.illustrationLabel ?? "Milemend dashboard";
  const isPhone = hero.image?.variant === "phone";

  useEffect(() => {
    if (!isPhone) return;

    let rafId: number | null = null;

    const updateParallax = () => {
      rafId = null;

      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const parallaxY = scrolled * 0.1;

      [mpciWrapRef.current, tableWrapRef.current].forEach((el) => {
        if (!el) return;
        el.style.willChange = "transform";
        el.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
      });
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);

      [mpciWrapRef.current, tableWrapRef.current].forEach((el) => {
        if (!el) return;
        el.style.willChange = "";
        el.style.transform = "";
      });
    };
  }, [isPhone]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden lg:overflow-x-visible border-b border-slate-200/80 bg-white pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-2 lg:pb-3"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-[45%] right-0 hidden bg-gradient-to-r from-mint via-cream to-blush opacity-55 blur-2xl lg:block"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:translate-x-10 xl:translate-x-12">
          <div className="mb-6 max-w-xl lg:mb-0 lg:max-w-2xl">
            <h1 className="text-shadow-soft text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl lg:whitespace-nowrap">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #30ff05 0%, #fffc00 50%, #ff0000 75%, #ff0000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {hero.headline}
              </span>
            </h1>
            {hero.supportingLine ? (
              <p className="mt-3 max-w-xl text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:text-xl lg:leading-8">
                {hero.supportingLine}
              </p>
            ) : null}

            <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-slate-900 marker:text-slate-900 sm:text-sm lg:text-sm">
              {hero.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-3 lg:mt-5">
              <Button href="/contact" size="lg" variant="ink">
                Request a demo
              </Button>
            </div>
          </div>

          <div className="relative mx-auto mt-8 w-full max-w-xl overflow-x-hidden pt-0 pb-2 lg:mt-0 lg:overflow-x-visible">
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-blush via-cream to-transparent opacity-70"
              aria-hidden
            />

            {isPhone ? (
              <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:max-w-xs">
                <Image
                  src={heroImageSrc}
                  alt={heroImageAlt}
                  width={900}
                  height={1200}
                  className="h-auto w-full object-contain drop-shadow-xl sm:drop-shadow-2xl lg:drop-shadow-2xl"
                  priority
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 28rem, 90vw"
                />

                <div
                  ref={mpciWrapRef}
                  className="absolute right-0 top-0 z-20 lg:absolute lg:-top-6 lg:-right-6 lg:mt-0"
                >
                  <article className="translate-y-0 w-40 rounded-xl border border-slate-200 bg-white p-3 shadow-md sm:w-44 lg:translate-y-full lg:w-48 lg:p-4 lg:shadow-lg">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {hero.heroVisual.metricCard.label}
                    </p>
                    <div className="mt-1 flex items-end justify-between gap-3">
                      <p className="text-2xl font-bold leading-none text-slate-900 sm:text-3xl lg:text-3xl">
                        {hero.heroVisual.metricCard.value}
                      </p>
                      <p className="mt-2 flex items-center gap-1 text-xs font-normal text-forest opacity-100 blur-0 filter-none">
                        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
                          <path
                            d="M3 13l5-5 4 4 5-6M14 6h3v3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>
                          {hero.heroVisual.metricCard.delta} {hero.heroVisual.metricCard.deltaLabel}
                        </span>
                      </p>
                    </div>
                  </article>
                </div>

                <div
                  ref={tableWrapRef}
                  className="absolute left-0 -bottom-12 z-20 lg:absolute lg:-bottom-6 lg:-left-6 lg:mt-0"
                >
                  <article className="translate-y-0 w-[92%] max-w-[320px] lg:pointer-events-none rounded-xl border border-slate-200 bg-white p-3 shadow-md sm:max-w-[360px] lg:-translate-y-1/2 lg:w-[92%] lg:max-w-xs lg:p-4 lg:shadow-lg">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      {hero.heroVisual.miniTable.title}
                    </p>
                    <div className="mt-3 overflow-hidden lg:overflow-x-auto lg:overflow-y-hidden">
                      <table className="table-fixed w-full text-left text-[9px] leading-tight text-slate-700 sm:text-[10px] lg:text-[10px]">
                        <thead>
                          <tr>
                            {hero.heroVisual.miniTable.columns.map((column) => (
                              <th
                                key={column}
                                className="truncate whitespace-nowrap border-b border-slate-200 pb-1 pr-2 font-bold"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {hero.heroVisual.miniTable.rows.map((row, index) => (
                            <tr key={`${row.join("-")}-${index}`}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={`${cell}-${cellIndex}`}
                                  className="truncate whitespace-nowrap border-b border-slate-200 py-1.5 pr-2 last:pr-0"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </article>
                </div>
              </div>
            ) : (
              <>
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl ring-1 ring-slate-200/60">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={heroImageSrc}
                      alt={heroImageAlt}
                      fill
                      className="object-cover"
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </div>

                <article className="relative z-20 mt-4 ml-auto w-44 rounded-xl bg-white p-3.5 shadow-lg ring-1 ring-slate-200/70 sm:w-48 lg:absolute lg:-top-6 lg:right-0 lg:mt-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {hero.heroVisual.metricCard.label}
                  </p>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    <p className="text-3xl font-bold leading-none text-slate-900">{hero.heroVisual.metricCard.value}</p>
                    <p className="mt-2 flex items-center gap-1 text-xs font-normal text-forest opacity-100 blur-0 filter-none">
                      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
                        <path
                          d="M3 13l5-5 4 4 5-6M14 6h3v3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>
                        {hero.heroVisual.metricCard.delta} {hero.heroVisual.metricCard.deltaLabel}
                      </span>
                    </p>
                  </div>
                </article>

                <article className="relative z-20 mt-4 w-72 pointer-events-none rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-200/70 lg:absolute lg:-bottom-6 lg:left-6 lg:-translate-y-1/2 lg:mt-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    {hero.heroVisual.miniTable.title}
                  </p>
                  <div className="mt-3 overflow-x-auto overflow-y-hidden">
                    <table className="table-fixed w-full text-left text-[10px] leading-tight text-slate-700">
                      <thead>
                        <tr>
                          {hero.heroVisual.miniTable.columns.map((column) => (
                            <th
                              key={column}
                              className="truncate whitespace-nowrap border-b border-slate-200 pb-1 pr-2 font-bold"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {hero.heroVisual.miniTable.rows.map((row, index) => (
                          <tr key={`${row.join("-")}-${index}`}>
                            {row.map((cell, cellIndex) => (
                              <td
                                key={`${cell}-${cellIndex}`}
                                className="truncate whitespace-nowrap border-b border-slate-200 py-1.5 pr-2 last:pr-0"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

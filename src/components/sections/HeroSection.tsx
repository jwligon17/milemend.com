import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { MilemendContent } from "@/content/milemend";

type HeroSectionProps = {
  hero: MilemendContent["homePage"]["hero"];
};

export function HeroSection({ hero }: HeroSectionProps) {
  const heroImageSrc = hero.image?.src ?? "/hero-laptop.svg";
  const heroImageAlt = hero.image?.alt ?? hero.illustrationLabel ?? "Milemend dashboard";

  return (
    <section className="relative border-b border-slate-200/80 bg-white py-20 sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-y-0 left-[45%] right-0 hidden bg-gradient-to-r from-mint via-cream to-blush opacity-55 blur-2xl lg:block"
        aria-hidden
      />
      <Container className="relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="max-w-xl">
          <h1 className="text-shadow-soft text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
            {hero.headline}
          </h1>

          <div className="mt-8 flex flex-wrap gap-3" id="demo">
            <Button href={hero.primaryCta.href} size="md" variant="ink">
              {hero.primaryCta.label}
            </Button>
            {hero.secondaryCta ? (
              <Button href={hero.secondaryCta.href} size="md" variant="forest">
                {hero.secondaryCta.label}
              </Button>
            ) : null}
          </div>

          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-slate-900 marker:text-slate-900">
            {hero.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="relative pb-16 pt-6 lg:pt-2">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-blush via-cream to-transparent opacity-70"
            aria-hidden
          />

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

          <article className="absolute -top-6 right-0 w-44 rounded-xl bg-white p-3.5 shadow-lg ring-1 ring-slate-200/70 sm:w-48">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {hero.heroVisual.metricCard.label}
            </p>
            <div className="mt-1 flex items-end justify-between gap-3">
              <p className="text-3xl font-semibold leading-none text-slate-900">{hero.heroVisual.metricCard.value}</p>
              <p className="flex items-center gap-1 text-xs font-medium text-forest">
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

          <article className="absolute -bottom-10 left-6 w-72 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-200/70">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              {hero.heroVisual.miniTable.title}
            </p>
            <div className="no-scrollbar mt-3 overflow-x-auto">
              <table className="table-fixed w-full text-left text-[10px] leading-tight text-slate-700">
                <thead>
                  <tr>
                    {hero.heroVisual.miniTable.columns.map((column) => (
                      <th
                        key={column}
                        className="truncate whitespace-nowrap border-b border-slate-200 pb-1 pr-2 font-semibold"
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
      </Container>
    </section>
  );
}

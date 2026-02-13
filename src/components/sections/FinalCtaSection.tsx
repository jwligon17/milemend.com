import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { MilemendContent } from "@/content/milemend";

type FinalCtaSectionProps = {
  finalCta: MilemendContent["homePage"]["finalCTA"];
};

export function FinalCtaSection({ finalCta }: FinalCtaSectionProps) {
  const secondaryIsPdf = finalCta.secondaryCta.href.toLowerCase().endsWith(".pdf");

  return (
    <section className="py-16" id="platform-overview">
      <Container>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {finalCta.headline}
          </h2>
          <p className="mt-4 text-slate-600">{finalCta.supportingText}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={finalCta.primaryCta.href} size="lg">
              {finalCta.primaryCta.label}
            </Button>
            <Button
              href={finalCta.secondaryCta.href}
              size="lg"
              variant="secondary"
              aria-label="Download Capabilities Statement PDF"
              download={secondaryIsPdf ? "Milemend-Capabilities-Statement.pdf" : undefined}
            >
              <svg
                aria-hidden="true"
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4V14M12 14L8 10M12 14L16 10M5 18H19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {finalCta.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

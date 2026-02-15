import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { milemendContent, type MilemendContent } from "@/content/milemend";

type FinalCtaSectionProps = {
  finalCta: MilemendContent["homePage"]["finalCTA"];
};

export function FinalCtaSection({ finalCta }: FinalCtaSectionProps) {
  const contactHref =
    milemendContent.mainNav.find((item) => item.label === "Contact")?.href ?? finalCta.primaryCta.href;

  return (
    <section className="flex min-h-[35vh] items-start justify-center pt-[2.75rem] pb-16" id="platform-overview">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Ready to modernize roadway operations?
          </h2>
          <div className="mt-2 md:mt-4">
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-base font-bold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

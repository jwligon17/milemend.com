import { Container } from "@/components/ui/Container";
import type { MilemendContent } from "@/content/milemend";

type CoreCapabilitiesSectionProps = {
  coreCapabilities: MilemendContent["homePage"]["coreCapabilities"];
};

export function CoreCapabilitiesSection({ coreCapabilities }: CoreCapabilitiesSectionProps) {
  return (
    <section className="relative overflow-x-clip bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, #0B0F19 0%, #6B7280 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A Focused Toolkit
            </span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            supporting your municipalities core capabilities for street condition decisions
          </p>
        </div>

        <div className="relative mt-12 sm:mt-14">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-3 w-screen -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-lime-400 via-yellow-300 to-red-500" />
          <div className="relative z-10 mx-auto max-w-6xl rounded-3xl bg-black px-8 py-14 shadow-2xl sm:px-10 lg:px-14 lg:py-16">
            <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-8">
              {coreCapabilities.cards.map((card, index) => {
                const headingGradient =
                  index === 0
                    ? "bg-gradient-to-r from-lime-300 to-green-500 bg-clip-text text-transparent"
                    : index === 1
                      ? "bg-gradient-to-r from-yellow-200 to-amber-500 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-orange-300 to-red-500 bg-clip-text text-transparent";

                return (
                  <div key={card.title}>
                    <h3 className={`text-xl font-bold tracking-tight ${headingGradient}`}>{card.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-white/90">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

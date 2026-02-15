import { Container } from "@/components/ui/Container";
import type { MilemendContent } from "@/content/milemend";

type StatsStripProps = {
  stats: MilemendContent["homePage"]["stats"];
};

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <section className="border-b border-slate-200/80 bg-slate-950 py-12 text-white">
      <Container>
        <h2 className="text-balance text-2xl font-bold md:text-3xl">{stats.heading}</h2>
        <p className="mt-3 text-slate-300">{stats.description}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((item) => (
            <article key={item.label} className="rounded-xl border border-white/20 bg-white/5 p-5">
              <p className="text-3xl font-bold text-cyan-300">{item.value}</p>
              <p className="mt-2 text-sm text-slate-100">{item.label}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


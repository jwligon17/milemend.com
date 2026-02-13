import { Container } from "@/components/ui/Container";
import type { MilemendContent } from "@/content/milemend";

type LeadershipSectionProps = {
  leadershipSection: MilemendContent["homePage"]["leadershipSection"];
};

export function LeadershipSection({ leadershipSection }: LeadershipSectionProps) {
  const bullets =
    leadershipSection.includeFinanceGrants === false
      ? leadershipSection.bullets.filter((bullet) => !bullet.toLowerCase().includes("finance/grants"))
      : leadershipSection.bullets;

  return (
    <section className="bg-slate-50 py-12 sm:py-14">
      <Container>
        <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          {leadershipSection.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800">
              {leadershipSection.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {leadershipSection.title}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 sm:text-base">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

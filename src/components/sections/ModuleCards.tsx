import Link from "next/link";

import { Card } from "@/components/ui/Card";

type ModuleCardsProps = {
  cards: {
    title: string;
    description: string;
    href: string;
  }[];
  linkLabel: string;
};

export function ModuleCards({ cards, linkLabel }: ModuleCardsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="flex h-full flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-3 text-sm text-slate-600">{card.description}</p>
          </div>
          <Link
            href={card.href}
            className="mt-6 inline-flex text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900"
          >
            {linkLabel}
          </Link>
        </Card>
      ))}
    </div>
  );
}


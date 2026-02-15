"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Card } from "@/components/ui/Card";
import type { MilemendContent } from "@/content/milemend";

type ResourcesLibraryProps = {
  resources: MilemendContent["resourcesPage"];
  initialCategory?: string;
};

export function ResourcesLibrary({ resources, initialCategory }: ResourcesLibraryProps) {
  const initial =
    initialCategory && resources.categories.includes(initialCategory as (typeof resources.categories)[number])
      ? initialCategory
      : resources.allFilterLabel;
  const [activeCategory, setActiveCategory] = useState<string>(initial);

  const filteredResources = useMemo(() => {
    if (activeCategory === resources.allFilterLabel) return resources.items;
    return resources.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, resources]);

  return (
    <>
      <div className="mt-8">
        <p className="mb-3 text-sm font-bold text-slate-700">{resources.filterLabel}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(resources.allFilterLabel)}
            className={
              activeCategory === resources.allFilterLabel
                ? "rounded-md bg-slate-900 px-3 py-1.5 text-sm font-bold text-white"
                : "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700"
            }
          >
            {resources.allFilterLabel}
          </button>
          {resources.categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "rounded-md bg-slate-900 px-3 py-1.5 text-sm font-bold text-white"
                  : "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700"
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredResources.map((resource) => (
          <Card key={resource.slug} className="flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-800">
                {resource.category}
              </p>
              <h2 className="mt-2 text-lg font-bold text-slate-900">{resource.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{resource.summary}</p>
            </div>
            <Link
              href={resource.href}
              className="mt-6 inline-flex text-sm font-bold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900"
            >
              {resources.cardLinkLabel}
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}


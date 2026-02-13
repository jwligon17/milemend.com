import type { Metadata } from "next";

import { ResourcesLibrary } from "@/components/sections/ResourcesLibrary";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milemendContent } from "@/content/milemend";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Browse Milemend resources including case studies, guides, webinars, blog articles, and downloads.",
};

type ResourcesPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const { category } = await searchParams;
  const { resourcesPage } = milemendContent;

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow={resourcesPage.heading.eyebrow}
          title={resourcesPage.heading.title}
          description={resourcesPage.heading.description}
          titleAs="h1"
        />
        <ResourcesLibrary resources={resourcesPage} initialCategory={category} />
      </Container>
    </section>
  );
}

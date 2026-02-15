import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milemendContent } from "@/content/milemend";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "See Milemend solutions for cities, counties, and transportation agencies.",
};

export default function SolutionsPage() {
  const { solutionsPage } = milemendContent;

  return (
    <>
      <section className="border-t border-slate-200/80 bg-white py-16" id="by-organization">
        <Container>
          <SectionHeading
            eyebrow={solutionsPage.byOrganization.eyebrow}
            title={solutionsPage.byOrganization.title}
            description={solutionsPage.byOrganization.description}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {solutionsPage.byOrganization.organizations.map((organization) => (
              <Card key={organization.name}>
                <h3 className="text-lg font-bold text-slate-900">{organization.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{organization.summary}</p>
                <ul className="mt-4 space-y-2">
                  {organization.focusAreas.map((item) => (
                    <li key={item} className="text-sm text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

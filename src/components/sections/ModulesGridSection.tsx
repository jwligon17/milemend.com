import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MilemendContent } from "@/content/milemend";
import { ModuleCards } from "@/components/sections/ModuleCards";

type ModulesGridSectionProps = {
  modules: MilemendContent["homePage"]["modules"];
};

export function ModulesGridSection({ modules }: ModulesGridSectionProps) {
  return (
    <section className="py-16" id="modules">
      <Container>
        <SectionHeading eyebrow={modules.eyebrow} title={modules.title} description={modules.description} />
        <div className="mt-8">
          <ModuleCards cards={modules.cards} linkLabel={modules.cardLinkLabel} />
        </div>
      </Container>
    </section>
  );
}

import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { DetailSection } from "../DetailSection";

type DescriptionSectionProps = {
  accommodation: Accommodation;
};

export function DescriptionSection({ accommodation }: DescriptionSectionProps) {
  return (
    <DetailSection title="Sobre esta hospedagem">
      <div className="max-w-prose space-y-4 text-base leading-relaxed text-blue-950/75">
        {accommodation.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </DetailSection>
  );
}

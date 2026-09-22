import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import { DetailSection } from "../DetailSection";

type DescriptionSectionProps = {
  accommodation: Accommodation;
};

export function DescriptionSection({ accommodation }: DescriptionSectionProps) {
  return (
    <DetailSection title="Sobre esta hospedagem">
      <div className="max-w-prose space-y-4 text-sm leading-relaxed text-blue-950/70">
        <p>
          {accommodation.name} fica em uma rua tranquila do centro de Aparecida,{" "}
          {accommodation.distanceFromSanctuary}. A recepção funciona 24 horas e
          a equipe conhece os horários das celebrações.
        </p>
        <p>
          Os quartos são arrumados diariamente e têm ar-condicionado. O café da
          manhã começa às 6h, antes da primeira missa, e o restaurante serve
          almoço para quem fica o dia inteiro na cidade.
        </p>
        <p>
          Grupos e romarias têm atendimento próprio: a chegada pode ser
          organizada por lista de quartos e há vaga para van e ônibus no
          estacionamento.
        </p>
      </div>
    </DetailSection>
  );
}

import { BadgeCheck, Clock, MessageCircle } from "lucide-react";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import { DetailSection } from "../DetailSection";

const RESPONSE_RATE_PERCENT = 97;

type PartnerSectionProps = {
  accommodation: Accommodation;
};

export function PartnerSection({ accommodation }: PartnerSectionProps) {
  return (
    <DetailSection title="Sobre o parceiro">
      <div className="rounded-2xl bg-white p-6 ring-1 ring-blue-950/10">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-950 text-base font-semibold text-white">
            {accommodation.name.charAt(0)}
          </span>

          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-blue-950">
              {accommodation.name}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
              Parceiro verificado
            </p>
          </div>
        </div>

        <p className="mt-5 max-w-prose text-sm leading-relaxed text-blue-950/70">
          A equipe atende romarias, excursões e famílias que voltam a Aparecida
          todos os anos. A recepção ajuda a organizar horários de chegada,
          refeições e traslados do grupo.
        </p>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-blue-950/10 pt-5 text-xs text-blue-950/60">
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4 text-blue-900/70" />
            Responde {RESPONSE_RATE_PERCENT}% das mensagens
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-blue-900/70" />
            Tempo médio de resposta: 1 hora
          </span>
        </div>
      </div>
    </DetailSection>
  );
}

import { BadgeCheck, Clock, MessageCircle } from "lucide-react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { DetailSection } from "../DetailSection";

type PartnerSectionProps = {
  accommodation: Accommodation;
};

export function PartnerSection({ accommodation }: PartnerSectionProps) {
  const { partner } = accommodation;

  return (
    <DetailSection title="Sobre o parceiro">
      <div className="rounded-3xl bg-white p-6 ring-1 ring-blue-950/10">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-950 text-base font-semibold text-white">
            {partner.name.charAt(0)}
          </span>

          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-blue-950">
              {partner.name}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <BadgeCheck className="h-4 w-4" aria-hidden />
              Parceiro verificado desde {partner.partnerSince}
            </p>
          </div>
        </div>

        <p className="mt-5 max-w-prose text-sm leading-relaxed text-blue-950/70">
          {partner.about}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-blue-950/10 pt-5 text-xs text-blue-950/60">
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4 text-blue-900/70" aria-hidden />
            Responde {partner.responseRatePercent}% das mensagens
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-blue-900/70" aria-hidden />
            Tempo de resposta: {partner.responseTimeLabel}
          </span>
        </div>

        <p className="mt-4 text-xs text-blue-950/55">
          Dúvidas antes de reservar? Fale com o suporte da plataforma. A reserva
          e o pagamento acontecem sempre aqui dentro.
        </p>
      </div>
    </DetailSection>
  );
}

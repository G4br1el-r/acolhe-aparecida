import { CalendarCheck, Clock, CreditCard, ShieldCheck } from "lucide-react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { DetailSection } from "../DetailSection";

type RulesSectionProps = {
  accommodation: Accommodation;
};

export function RulesSection({ accommodation }: RulesSectionProps) {
  const { cancellationPolicy } = accommodation;

  const policyItems = [
    {
      icon: CalendarCheck,
      title: "Cancelamento",
      text: `Grátis até ${cancellationPolicy.freeUntilDaysBefore} dias antes do check-in, com devolução integral. Depois disso, ${cancellationPolicy.partialRefundPercent}% do valor é devolvido até a véspera.`,
    },
    {
      icon: CreditCard,
      title: "Pagamento pela plataforma",
      text: "PIX com desconto ou cartão parcelado sem juros. Nada é cobrado fora da plataforma.",
    },
    {
      icon: ShieldCheck,
      title: "Confirmação imediata",
      text: "O comprovante chega por e-mail e fica salvo em Minha Viagem assim que o pagamento é aprovado.",
    },
  ];

  return (
    <DetailSection title="Regras e políticas" hasDivider={false}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-blue-950">
            Informações da estadia
          </h3>

          <ul className="mt-4 space-y-3">
            <li className="flex items-baseline justify-between gap-4 border-b border-blue-950/10 pb-3 text-sm">
              <span className="flex items-center gap-2 text-blue-950/70">
                <Clock
                  className="h-4 w-4 shrink-0 text-blue-900/70"
                  aria-hidden
                />
                Check-in
              </span>
              <span className="text-right text-blue-950">
                A partir das {accommodation.checkInTime}
              </span>
            </li>
            <li className="flex items-baseline justify-between gap-4 border-b border-blue-950/10 pb-3 text-sm">
              <span className="flex items-center gap-2 text-blue-950/70">
                <Clock
                  className="h-4 w-4 shrink-0 text-blue-900/70"
                  aria-hidden
                />
                Check-out
              </span>
              <span className="text-right text-blue-950">
                Até as {accommodation.checkOutTime}
              </span>
            </li>
            {accommodation.houseRules.map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-2 border-b border-blue-950/10 pb-3 text-sm text-blue-950/80 last:border-none"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-900/50"
                />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-blue-950">
            Reserva e cancelamento
          </h3>

          <ul className="mt-4 space-y-4">
            {policyItems.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <item.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-900/70"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-medium text-blue-950">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm text-blue-950/65">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DetailSection>
  );
}

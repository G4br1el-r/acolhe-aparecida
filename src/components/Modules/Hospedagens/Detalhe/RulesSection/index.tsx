import { CalendarCheck, CreditCard, ShieldCheck } from "lucide-react";
import {
  FREE_CANCELLATION_DAYS,
  HOUSE_RULES,
} from "@/constants/Modules/Hospedagens/Detalhe/details";
import { DetailSection } from "../DetailSection";

const POLICY_ITEMS = [
  {
    icon: CalendarCheck,
    title: "Cancelamento gratuito",
    text: `Cancele até ${FREE_CANCELLATION_DAYS} dias antes do check-in e receba o valor pago de volta.`,
  },
  {
    icon: CreditCard,
    title: "Pagamento pela plataforma",
    text: "PIX ou cartão, com parcelamento. Nada é cobrado fora da plataforma.",
  },
  {
    icon: ShieldCheck,
    title: "Reserva confirmada na hora",
    text: "A confirmação chega por e-mail assim que o pagamento é aprovado.",
  },
];

export function RulesSection() {
  return (
    <DetailSection title="Regras e políticas" hasDivider={false}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-blue-950">
            Informações da estadia
          </h3>

          <ul className="mt-4 space-y-3">
            {HOUSE_RULES.map((rule) => (
              <li
                key={rule.label}
                className="flex items-baseline justify-between gap-4 border-b border-blue-950/10 pb-3 text-sm last:border-none"
              >
                <span className="flex items-center gap-2 text-blue-950/70">
                  <rule.icon className="h-4 w-4 shrink-0 text-blue-900/70" />
                  {rule.label}
                </span>
                <span className="text-right text-blue-950">{rule.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-blue-950">
            Reserva e cancelamento
          </h3>

          <ul className="mt-4 space-y-4">
            {POLICY_ITEMS.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-900/70" />
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

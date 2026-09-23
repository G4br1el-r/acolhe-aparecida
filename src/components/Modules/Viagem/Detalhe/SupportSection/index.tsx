import { MessageCircle } from "lucide-react";
import { BrandButton } from "@/components/ui/brand-button";
import {
  SUPPORT_HOURS_LABEL,
  SUPPORT_RESPONSE_TIME_LABEL,
} from "@/constants/Modules/Viagem/support";

type SupportSectionProps = {
  onOpenSupport: () => void;
};

export function SupportSection({ onOpenSupport }: SupportSectionProps) {
  return (
    <section
      aria-labelledby="suporte-titulo"
      className="flex flex-col gap-4 rounded-3xl bg-blue-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7"
    >
      <div>
        <h2
          id="suporte-titulo"
          className="text-xl font-semibold tracking-tight"
        >
          Precisa de ajuda com a viagem?
        </h2>
        <p className="mt-1 text-sm text-white/70">
          {SUPPORT_RESPONSE_TIME_LABEL.toLowerCase()}. {SUPPORT_HOURS_LABEL}.
        </p>
      </div>
      <BrandButton
        variant="outline"
        onClick={onOpenSupport}
        className="shrink-0 ring-0 hover:bg-blue-50"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Falar com o suporte
      </BrandButton>
    </section>
  );
}

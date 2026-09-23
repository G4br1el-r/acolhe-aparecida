import { SearchX } from "lucide-react";
import { BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";

export function TripNotFound() {
  return (
    <EmptyState
      icon={SearchX}
      title="Reserva não encontrada"
      description="Confira se você está na conta certa. Se a reserva foi feita com outro e-mail, entre com ele para ver os detalhes."
      action={
        <BrandLink href="/minha-viagem" variant="primary">
          Ver minhas viagens
        </BrandLink>
      }
    />
  );
}

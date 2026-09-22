import { BedDouble, Users } from "lucide-react";
import { ROOM_OPTIONS } from "@/constants/Modules/Hospedagens/Detalhe/details";
import { formatCurrency } from "@/lib/Modules/Hospedagens/Detalhe/booking-price";
import { DetailSection } from "../DetailSection";

export function RoomsSection() {
  return (
    <DetailSection
      title="Quartos disponíveis"
      description="Escolha o quarto na etapa da reserva. Os valores mudam conforme as datas."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {ROOM_OPTIONS.map((room) => (
          <li
            key={room.id}
            className="flex flex-col justify-between rounded-2xl bg-white p-5 ring-1 ring-blue-950/10 transition-shadow duration-300 hover:shadow-lg"
          >
            <div>
              <h3 className="text-base font-semibold text-blue-950">
                {room.name}
              </h3>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-blue-950/60">
                <span className="flex items-center gap-1.5">
                  <BedDouble className="h-4 w-4 text-blue-900/70" />
                  {room.bedDescription}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-blue-900/70" />
                  Até {room.maxGuests}{" "}
                  {room.maxGuests === 1 ? "hóspede" : "hóspedes"}
                </span>
              </div>
            </div>

            <p className="mt-5 border-t border-blue-950/10 pt-4 text-sm text-blue-950/60">
              A partir de{" "}
              <span className="font-semibold text-blue-950">
                {formatCurrency(room.priceFrom)}
              </span>{" "}
              / noite
            </p>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

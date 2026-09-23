import type { ReservationStatus } from "@/@types/Modules/Reserva/reservation";
import { cn } from "@/lib/utils";

export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  "aguardando-pagamento": "Aguardando pagamento",
  confirmada: "Confirmada",
  concluida: "Concluída",
  cancelada: "Cancelada",
  reembolsada: "Reembolsada",
};

const STATUS_CLASSES: Record<ReservationStatus, string> = {
  "aguardando-pagamento": "bg-amber-50 text-amber-800 ring-amber-600/20",
  confirmada: "bg-blue-50 text-blue-900 ring-blue-900/15",
  concluida: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  cancelada: "bg-red-50 text-red-700 ring-red-600/15",
  reembolsada: "bg-blue-950/5 text-blue-950/70 ring-blue-950/10",
};

const DOT_CLASSES: Record<ReservationStatus, string> = {
  "aguardando-pagamento": "bg-amber-500",
  confirmada: "bg-blue-900",
  concluida: "bg-emerald-600",
  cancelada: "bg-red-600",
  reembolsada: "bg-blue-950/40",
};

const SIZE_CLASSES = {
  sm: "h-6 px-2.5 text-[11px]",
  md: "h-8 px-3 text-xs",
} as const;

type ReservationStatusBadgeProps = {
  status: ReservationStatus;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
};

export function ReservationStatusBadge({
  status,
  size = "md",
  className,
}: ReservationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold whitespace-nowrap ring-1",
        STATUS_CLASSES[status],
        SIZE_CLASSES[size],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-1.5 w-1.5 rounded-full", DOT_CLASSES[status])}
      />
      {RESERVATION_STATUS_LABELS[status]}
    </span>
  );
}

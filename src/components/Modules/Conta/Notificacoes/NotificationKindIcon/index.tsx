import {
  Ban,
  CalendarCheck,
  CalendarDays,
  CircleCheck,
  CircleX,
  Clock,
  DoorClosed,
  DoorOpen,
  type LucideIcon,
  Star,
  Wallet,
} from "lucide-react";
import type { NotificationKind } from "@/@types/Modules/Conta/user";
import { cn } from "@/lib/utils";

const KIND_ICONS: Record<NotificationKind, LucideIcon> = {
  "reserva-confirmada": CalendarCheck,
  "pagamento-aprovado": CircleCheck,
  "pagamento-recusado": CircleX,
  "viagem-proxima": Clock,
  "check-in": DoorOpen,
  "check-out": DoorClosed,
  avaliacao: Star,
  cancelamento: Ban,
  reembolso: Wallet,
  evento: CalendarDays,
};

const KIND_TONES: Partial<Record<NotificationKind, string>> = {
  "pagamento-aprovado": "bg-emerald-50 text-emerald-700",
  "reserva-confirmada": "bg-emerald-50 text-emerald-700",
  "pagamento-recusado": "bg-red-50 text-red-700",
  cancelamento: "bg-red-50 text-red-700",
  avaliacao: "bg-amber-50 text-amber-600",
};

const DEFAULT_TONE = "bg-blue-50 text-blue-900";

type NotificationKindIconProps = {
  kind: NotificationKind;
};

export function NotificationKindIcon({ kind }: NotificationKindIconProps) {
  const Icon = KIND_ICONS[kind];

  return (
    <span
      aria-hidden
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        KIND_TONES[kind] ?? DEFAULT_TONE,
      )}
    >
      <Icon className="h-4.5 w-4.5" />
    </span>
  );
}

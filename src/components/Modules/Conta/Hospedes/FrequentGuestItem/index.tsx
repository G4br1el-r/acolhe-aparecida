"use client";

import { Accessibility, Pencil, Trash2 } from "lucide-react";
import type { FrequentGuest } from "@/@types/Modules/Conta/user";
import { GUEST_AGE_GROUP_LABELS } from "@/schemas/Modules/Conta/frequent-guest";

type FrequentGuestItemProps = {
  guest: FrequentGuest;
  onEdit: (guest: FrequentGuest) => void;
  onRemove: (guest: FrequentGuest) => void;
  isDisabled: boolean;
};

export function FrequentGuestItem({
  guest,
  onEdit,
  onRemove,
  isDisabled,
}: FrequentGuestItemProps) {
  const details = [
    guest.relationship,
    guest.age === undefined
      ? GUEST_AGE_GROUP_LABELS[guest.ageGroup]
      : `${GUEST_AGE_GROUP_LABELS[guest.ageGroup]}, ${guest.age} anos`,
    guest.document ? `CPF ${guest.document}` : null,
  ].filter(Boolean);

  return (
    <li className="flex items-start justify-between gap-4 py-5">
      <div className="min-w-0">
        <p className="font-semibold text-blue-950">{guest.fullName}</p>
        <p className="mt-0.5 text-sm text-blue-950/60">{details.join(" · ")}</p>
        {guest.needsAccessibility && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-blue-900">
            <Accessibility className="h-3.5 w-3.5" aria-hidden />
            Precisa de acessibilidade
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => onEdit(guest)}
          disabled={isDisabled}
          aria-label={`Editar ${guest.fullName}`}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-blue-950/60 transition-colors hover:bg-blue-50 hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Pencil className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => onRemove(guest)}
          disabled={isDisabled}
          aria-label={`Remover ${guest.fullName}`}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-blue-950/60 transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </li>
  );
}

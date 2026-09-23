"use client";

import type { FrequentGuest } from "@/@types/Modules/Conta/user";
import {
  useCurrentUser,
  useUpdateUser,
} from "@/hooks/Modules/Conta/use-session";
import { createMockId } from "@/mocks/storage";

export type FrequentGuestInput = Omit<FrequentGuest, "id">;

export function useFrequentGuests() {
  const { user } = useCurrentUser();
  const updateUser = useUpdateUser();
  const guests = user?.frequentGuests ?? [];

  function persist(frequentGuests: FrequentGuest[]) {
    return updateUser.mutateAsync({ frequentGuests });
  }

  function addGuest(input: FrequentGuestInput) {
    return persist([...guests, { ...input, id: createMockId("fg") }]);
  }

  function editGuest(guestId: string, input: FrequentGuestInput) {
    return persist(
      guests.map((guest) =>
        guest.id === guestId ? { ...input, id: guestId } : guest,
      ),
    );
  }

  function removeGuest(guestId: string) {
    return persist(guests.filter((guest) => guest.id !== guestId));
  }

  return {
    guests,
    isSaving: updateUser.isPending,
    addGuest,
    editGuest,
    removeGuest,
  };
}

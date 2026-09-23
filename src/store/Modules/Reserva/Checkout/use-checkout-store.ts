import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  PaymentMethod,
  ReservationExtraId,
  ReservationGuest,
} from "@/@types/Modules/Reserva/reservation";

export type CheckoutStepId =
  | "hospedes"
  | "responsavel"
  | "solicitacoes"
  | "pagamento";

export const CHECKOUT_STEPS: { id: CheckoutStepId; label: string }[] = [
  { id: "hospedes", label: "Quarto e hóspedes" },
  { id: "responsavel", label: "Responsável" },
  { id: "solicitacoes", label: "Detalhes da estadia" },
  { id: "pagamento", label: "Pagamento" },
];

export type CheckoutDraft = {
  accommodationSlug: string;
  roomTypeId: string;
  roomCount: number;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  seniors: number;
  guests: ReservationGuest[];
  responsible: {
    fullName: string;
    email: string;
    phone: string;
    document: string;
  };
  extras: Partial<Record<ReservationExtraId, number>>;
  specialRequests: string;
  arrivalTime: string;
  acceptedPolicy: boolean;
  couponCode: string | null;
  paymentMethod: PaymentMethod;
  installmentCount: number;
  step: CheckoutStepId;
};

type CheckoutState = {
  draft: CheckoutDraft | null;
  startCheckout: (draft: CheckoutDraft) => void;
  updateDraft: (changes: Partial<CheckoutDraft>) => void;
  goToStep: (step: CheckoutStepId) => void;
  clearCheckout: () => void;
};

export const CHECKOUT_STORAGE_KEY = "acolher-aparecida:checkout";

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      draft: null,
      startCheckout: (draft) => set({ draft }),
      updateDraft: (changes) =>
        set((state) =>
          state.draft ? { draft: { ...state.draft, ...changes } } : state,
        ),
      goToStep: (step) =>
        set((state) =>
          state.draft ? { draft: { ...state.draft, step } } : state,
        ),
      clearCheckout: () => set({ draft: null }),
    }),
    {
      name: CHECKOUT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

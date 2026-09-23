"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useLogout } from "@/hooks/Modules/Conta/use-session";
import { resetMockCollections } from "@/mocks/storage";
import { useSavedPlacesStore } from "@/store/Modules/Cidade/use-saved-places-store";
import { useSearchStore } from "@/store/Modules/Hospedagens/Busca/use-search-store";
import { useCompareStore } from "@/store/Modules/Hospedagens/Comparacao/use-compare-store";
import { useFavoritesStore } from "@/store/Modules/Hospedagens/Favoritos/use-favorites-store";
import { useCheckoutStore } from "@/store/Modules/Reserva/Checkout/use-checkout-store";

export function useResetDemo() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const logout = useLogout();
  const [isResetting, setIsResetting] = useState(false);

  function resetDemo() {
    setIsResetting(true);

    resetMockCollections();
    useFavoritesStore.getState().clearFavorites();
    useCompareStore.getState().clearCompare();
    useCheckoutStore.getState().clearCheckout();
    useSavedPlacesStore.getState().clearSaved();
    useSearchStore.getState().clearRecentSearches();
    useSearchStore.getState().resetDraft();

    logout();
    queryClient.clear();

    toast.success("Demonstração reiniciada", {
      description:
        "Reservas, avaliações, favoritos e notificações voltaram ao estado inicial. Entre de novo com qualquer perfil.",
    });

    router.push("/entrar");
  }

  return { resetDemo, isResetting };
}

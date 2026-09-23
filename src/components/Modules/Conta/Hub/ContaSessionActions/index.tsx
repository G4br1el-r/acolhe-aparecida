"use client";

import { LogOut, RotateCcw } from "lucide-react";
import { useState } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import { Dialog } from "@/components/ui/dialog";
import { useResetDemo } from "@/hooks/Modules/Conta/use-reset-demo";
import { useLogout } from "@/hooks/Modules/Conta/use-session";

const HOME_PATH = "/";

export function ContaSessionActions() {
  const logout = useLogout();
  const { resetDemo, isResetting } = useResetDemo();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleLogout() {
    logout();
    window.location.assign(HOME_PATH);
  }

  function handleConfirmReset() {
    setIsConfirmOpen(false);
    resetDemo();
  }

  return (
    <>
      <div className="mt-16 flex flex-col gap-2 border-t border-blue-950/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <BrandButton variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" aria-hidden />
          Sair da conta
        </BrandButton>

        <BrandButton
          variant="ghost"
          size="sm"
          onClick={() => setIsConfirmOpen(true)}
          isLoading={isResetting}
          loadingLabel="Reiniciando"
          className="text-blue-950/60"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Recomeçar demonstração
        </BrandButton>
      </div>

      <Dialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Recomeçar a demonstração?"
        description="Reservas, avaliações, notificações, favoritos, comparações e o checkout em andamento voltam ao estado inicial. Você será desconectado."
        size="sm"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <BrandButton
              variant="ghost"
              onClick={() => setIsConfirmOpen(false)}
            >
              Cancelar
            </BrandButton>
            <BrandButton variant="danger" onClick={handleConfirmReset}>
              Recomeçar
            </BrandButton>
          </div>
        }
      >
        <p className="text-sm text-blue-950/70">
          Os perfis de demonstração continuam disponíveis na tela de entrada.
        </p>
      </Dialog>
    </>
  );
}
